import { NextRequest } from "next/server";
import { handleGetCart, handleUpdateCartItem, handleRemoveFromCart } from "@/api/handlers/cart/handlers";

interface Params {
  params: Promise<{
    itemId: string;
  }>;
}

// PUT /api/cart/[itemId] - Update cart item quantity
export async function PUT(request: NextRequest, context: Params) {
  const { itemId } = await context.params;
  return handleUpdateCartItem(request, itemId);
}

// GET /api/cart/[itemId] - Get cart by session ID
export async function GET(request: NextRequest, context: Params) {
  const { itemId } = await context.params;
  return handleGetCart(request, itemId);
}

// DELETE /api/cart/[itemId] - Remove item from cart
export async function DELETE(request: NextRequest, context: Params) {
  const { itemId } = await context.params;
  return handleRemoveFromCart(request, itemId);
}
