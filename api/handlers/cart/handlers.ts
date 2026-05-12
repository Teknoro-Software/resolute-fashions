import { NextRequest, NextResponse } from "next/server";
import { Types } from "mongoose";
import { connectDB } from "@/lib/db";
import Cart from "@/lib/models/Cart";
import Product from "@/lib/models/Product";

type CartItemData = {
  _id?: { toString: () => string };
  cartItemId?: string;
  productId: string;
  name?: string;
  price: number;
  originalPrice?: number;
  image?: string;
  quantity: number;
  size: string;
  addedAt?: Date;
};

type CartDocumentData = {
  _id?: { toString: () => string };
  sessionId: string;
  items: CartItemData[];
  total: number;
  createdAt?: Date;
  updatedAt?: Date;
  markModified?: (path: string) => void;
  save: () => Promise<unknown>;
};

type AddToCartBody = {
  productId?: string;
  size?: string;
  quantity?: number;
};

type UpdateCartItemBody = {
  quantity?: number;
};

function cleanSessionId(value?: string | null): string | null {
  const sessionId = value?.trim();
  return sessionId || null;
}

function getSessionIdFromRequest(request: NextRequest): string | null {
  const params = request.nextUrl.searchParams;
  const querySessionId =
    cleanSessionId(params.get("sessionId")) ||
    cleanSessionId(params.get("sessionid")) ||
    cleanSessionId(params.get("session_id")) ||
    cleanSessionId(params.get("cart_session"));

  if (querySessionId) return querySessionId;

  const headerSessionId =
    cleanSessionId(request.headers.get("x-cart-session-id")) ||
    cleanSessionId(request.headers.get("cart-session-id"));

  if (headerSessionId) return headerSessionId;

  return cleanSessionId(request.cookies.get("cart_session")?.value);
}

// Helper function to get or create session ID
function getSessionId(request: NextRequest, explicitSessionId?: string): string {
  const explicit = cleanSessionId(explicitSessionId);
  if (explicit) return explicit;

  const sessionId = getSessionIdFromRequest(request);
  if (sessionId) return sessionId;

  // Generate a new session ID
  const newSessionId = `cart_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  return newSessionId;
}

function getExistingSessionId(request: NextRequest): string | null {
  return getSessionIdFromRequest(request);
}

function sessionIdRequiredResponse() {
  return NextResponse.json(
    {
      success: false,
      error: "sessionId is required. Pass it as ?sessionId=YOUR_SESSION_ID or use the cart_session cookie.",
    },
    { status: 400 }
  );
}

function jsonWithSessionCookie(body: unknown, sessionId: string, init?: ResponseInit) {
  const response = NextResponse.json(body, init);
  response.cookies.set("cart_session", sessionId, {
    httpOnly: true,
    sameSite: "lax",
    path: "/",
    maxAge: 60 * 60 * 24 * 30,
  });
  return response;
}

function stableLegacyCartItemId(item: CartItemData) {
  const parts = [item.productId, item.size, item.addedAt?.toString(), item.name]
    .filter(Boolean)
    .join("_")
    .replace(/[^a-zA-Z0-9_-]/g, "_");

  return `legacy_${parts || "cart_item"}`;
}

function formatCartItem(item: CartItemData) {
  const cartItemId = item.cartItemId || item._id?.toString() || stableLegacyCartItemId(item);

  return {
    cartItemId,
    productId: item.productId,
    name: item.name,
    price: item.price,
    originalPrice: item.originalPrice,
    image: item.image,
    size: item.size,
    quantity: item.quantity,
    subtotal: item.price * item.quantity,
    addedAt: item.addedAt,
  };
}

function formatCart(cart: CartDocumentData) {
  return {
    cartId: cart._id?.toString(),
    sessionId: cart.sessionId,
    items: cart.items.map(formatCartItem),
    total: cart.total,
    createdAt: cart.createdAt,
    updatedAt: cart.updatedAt,
  };
}

async function ensureCartItemIds(cart: CartDocumentData) {
  let changed = false;

  cart.items.forEach((item) => {
    if (!item.cartItemId) {
      item.cartItemId = item._id?.toString() || stableLegacyCartItemId(item);
      changed = true;
    }

    if (!item._id) {
      item._id = new Types.ObjectId();
      changed = true;
    }
  });

  if (changed) {
    cart.markModified?.("items");
    await cart.save();
  }
}

// Helper function to calculate cart total
function calculateTotal(items: CartItemData[]): number {
  return items.reduce((total, item) => total + (item.price * item.quantity), 0);
}

export async function handleGetCart(request: NextRequest, explicitSessionId?: string) {
  try {
    await connectDB();
    const sessionId = getSessionId(request, explicitSessionId);

    let cart = await Cart.findOne({ sessionId });

    if (!cart) {
      // Create empty cart if none exists
      cart = await Cart.create({
        sessionId,
        items: [],
        total: 0,
      });
    }

    await ensureCartItemIds(cart);

    return jsonWithSessionCookie({ success: true, data: formatCart(cart) }, sessionId);
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function handleAddToCart(request: NextRequest) {
  try {
    await connectDB();
    const sessionId = getSessionId(request);

    const { productId, size, quantity = 1 } = (await request.json()) as AddToCartBody;

    if (!productId || !size) {
      return NextResponse.json(
        { success: false, error: "Product ID and size are required" },
        { status: 400 }
      );
    }

    // Get product details
    const product = await Product.findById(productId);
    if (!product) {
      return NextResponse.json(
        { success: false, error: "Product not found" },
        { status: 404 }
      );
    }

    // Check if size is available
    if (!product.sizes.includes(size)) {
      return NextResponse.json(
        { success: false, error: "Selected size not available" },
        { status: 400 }
      );
    }

    // Find or create cart
    let cart = await Cart.findOne({ sessionId });
    if (!cart) {
      cart = await Cart.create({
        sessionId,
        items: [],
        total: 0,
      });
    }

    // Check if item already exists in cart
    const existingItemIndex = cart.items.findIndex(
      (item: CartItemData) => item.productId === productId && item.size === size
    );

    if (existingItemIndex > -1) {
      // Update quantity
      cart.items[existingItemIndex].quantity += quantity;
    } else {
      // Add new item
      cart.items.push({
        cartItemId: new Types.ObjectId().toString(),
        productId,
        name: product.name,
        price: product.price,
        originalPrice: product.originalPrice,
        image: product.image,
        size,
        quantity,
        addedAt: new Date(),
      });
    }

    // Recalculate total
    cart.total = calculateTotal(cart.items);

    await cart.save();

    return jsonWithSessionCookie({ success: true, data: formatCart(cart) }, sessionId);
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function handleUpdateCartItem(request: NextRequest, itemId: string) {
  try {
    await connectDB();
    const sessionId = getExistingSessionId(request);

    if (!sessionId) {
      return sessionIdRequiredResponse();
    }

    const { quantity } = (await request.json()) as UpdateCartItemBody;

    if (!quantity || quantity < 1) {
      return NextResponse.json(
        { success: false, error: "Quantity must be at least 1" },
        { status: 400 }
      );
    }

    const cart = await Cart.findOne({ sessionId });
    if (!cart) {
      return NextResponse.json(
        { success: false, error: "Cart not found" },
        { status: 404 }
      );
    }

    await ensureCartItemIds(cart);

    const itemIndex = cart.items.findIndex(
      (item: CartItemData) => item.cartItemId === itemId || item._id?.toString() === itemId
    );
    if (itemIndex === -1) {
      return NextResponse.json(
        { success: false, error: "Item not found in cart" },
        { status: 404 }
      );
    }

    cart.items[itemIndex].quantity = quantity;
    cart.total = calculateTotal(cart.items);

    await cart.save();

    const updatedItem = formatCartItem(cart.items[itemIndex]);

    return jsonWithSessionCookie(
      {
        success: true,
        message: "Cart item quantity updated",
        cartItemId: updatedItem.cartItemId,
        updatedItem,
        data: formatCart(cart),
      },
      sessionId
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function handleRemoveFromCart(request: NextRequest, itemId: string) {
  try {
    await connectDB();
    const sessionId = getExistingSessionId(request);

    if (!sessionId) {
      return sessionIdRequiredResponse();
    }

    const cart = await Cart.findOne({ sessionId });
    if (!cart) {
      return NextResponse.json(
        { success: false, error: "Cart not found" },
        { status: 404 }
      );
    }

    await ensureCartItemIds(cart);

    const removedItem = cart.items.find(
      (item: CartItemData) => item.cartItemId === itemId || item._id?.toString() === itemId
    );

    if (!removedItem) {
      return NextResponse.json(
        { success: false, error: "Item not found in cart" },
        { status: 404 }
      );
    }

    cart.items = cart.items.filter(
      (item: CartItemData) => item.cartItemId !== itemId && item._id?.toString() !== itemId
    );
    cart.total = calculateTotal(cart.items);

    await cart.save();

    return jsonWithSessionCookie(
      {
        success: true,
        message: "Cart item removed",
        removedCartItemId: itemId,
        removedItem: formatCartItem(removedItem),
        data: formatCart(cart),
      },
      sessionId
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function handleClearCart(request: NextRequest) {
  try {
    await connectDB();
    const sessionId = getExistingSessionId(request);

    if (!sessionId) {
      return sessionIdRequiredResponse();
    }

    const cart = await Cart.findOne({ sessionId });
    if (!cart) {
      return NextResponse.json(
        { success: false, error: "Cart not found" },
        { status: 404 }
      );
    }

    cart.items = [];
    cart.total = 0;

    await cart.save();

    return jsonWithSessionCookie({ success: true, data: formatCart(cart) }, sessionId);
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
