// API helper functions for frontend consumption

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

// ============ CATEGORIES ============

export async function getCategories() {
  const res = await fetch(`${API_BASE}/api/categories`);
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
}

export async function getCategory(id: string) {
  const res = await fetch(`${API_BASE}/api/categories/${id}`);
  if (!res.ok) throw new Error("Failed to fetch category");
  return res.json();
}

export async function createCategory(
  name: string,
  description: string,
  image: File
) {
  const formData = new FormData();
  formData.append("name", name);
  formData.append("description", description);
  formData.append("image", image);

  const res = await fetch(`${API_BASE}/api/categories`, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) throw new Error("Failed to create category");
  return res.json();
}

export async function updateCategory(
  id: string,
  data: { name?: string; description?: string; image?: File }
) {
  const formData = new FormData();
  if (data.name) formData.append("name", data.name);
  if (data.description) formData.append("description", data.description);
  if (data.image) formData.append("image", data.image);

  const res = await fetch(`${API_BASE}/api/categories/${id}`, {
    method: "PUT",
    body: formData,
  });
  if (!res.ok) throw new Error("Failed to update category");
  return res.json();
}

export async function deleteCategory(id: string) {
  const res = await fetch(`${API_BASE}/api/categories/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete category");
  return res.json();
}

// ============ PRODUCTS ============

export async function getProducts(category?: string) {
  const url = category
    ? `${API_BASE}/api/products?category=${category}`
    : `${API_BASE}/api/products`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
}

export async function getProduct(id: string) {
  const res = await fetch(`${API_BASE}/api/products/${id}`);
  if (!res.ok) throw new Error("Failed to fetch product");
  return res.json();
}

export async function createProduct(data: {
  name: string;
  description: string;
  price: number;
  originalPrice: number;
  category: string;
  stock: number;
  image: File;
}) {
  const formData = new FormData();
  formData.append("name", data.name);
  formData.append("description", data.description);
  formData.append("price", data.price.toString());
  formData.append("originalPrice", data.originalPrice.toString());
  formData.append("category", data.category);
  formData.append("stock", data.stock.toString());
  formData.append("image", data.image);

  const res = await fetch(`${API_BASE}/api/products`, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) throw new Error("Failed to create product");
  return res.json();
}

export async function updateProduct(
  id: string,
  data: {
    name?: string;
    description?: string;
    price?: number;
    originalPrice?: number;
    category?: string;
    stock?: number;
    image?: File;
  }
) {
  const formData = new FormData();
  if (data.name) formData.append("name", data.name);
  if (data.description) formData.append("description", data.description);
  if (data.price) formData.append("price", data.price.toString());
  if (data.originalPrice) formData.append("originalPrice", data.originalPrice.toString());
  if (data.category) formData.append("category", data.category);
  if (data.stock !== undefined) formData.append("stock", data.stock.toString());
  if (data.image) formData.append("image", data.image);

  const res = await fetch(`${API_BASE}/api/products/${id}`, {
    method: "PUT",
    body: formData,
  });
  if (!res.ok) throw new Error("Failed to update product");
  return res.json();
}

export async function deleteProduct(id: string) {
  const res = await fetch(`${API_BASE}/api/products/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete product");
  return res.json();
}

// ============ BANNERS ============

export async function getBanners() {
  const res = await fetch(`${API_BASE}/api/banners`);
  if (!res.ok) throw new Error("Failed to fetch banners");
  return res.json();
}

export async function getBanner(id: string) {
  const res = await fetch(`${API_BASE}/api/banners/${id}`);
  if (!res.ok) throw new Error("Failed to fetch banner");
  return res.json();
}

export async function createBanner(data: {
  title: string;
  subtitle: string;
  link?: string;
  order?: number;
  image: File;
  productIds?: string[];
}) {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("subtitle", data.subtitle);
  if (data.link) formData.append("link", data.link);
  if (data.order !== undefined) formData.append("order", data.order.toString());
  if (data.productIds?.length) formData.append("products", JSON.stringify(data.productIds));
  formData.append("image", data.image);

  const res = await fetch(`${API_BASE}/api/banners`, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) throw new Error("Failed to create banner");
  return res.json();
}

export async function updateBanner(
  id: string,
  data: {
    title?: string;
    subtitle?: string;
    link?: string;
    order?: number;
    isActive?: boolean;
    image?: File;
    productIds?: string[];
  }
) {
  const formData = new FormData();
  if (data.title) formData.append("title", data.title);
  if (data.subtitle) formData.append("subtitle", data.subtitle);
  if (data.link) formData.append("link", data.link);
  if (data.order !== undefined) formData.append("order", data.order.toString());
  if (data.isActive !== undefined) formData.append("isActive", data.isActive.toString());
  if (data.productIds?.length) formData.append("products", JSON.stringify(data.productIds));
  if (data.image) formData.append("image", data.image);

  const res = await fetch(`${API_BASE}/api/banners/${id}`, {
    method: "PUT",
    body: formData,
  });
  if (!res.ok) throw new Error("Failed to update banner");
  return res.json();
}

export async function deleteBanner(id: string) {
  const res = await fetch(`${API_BASE}/api/banners/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete banner");
  return res.json();
}

// ============ OFFERS ============

export async function getOffers() {
  const res = await fetch(`${API_BASE}/api/offers`);
  if (!res.ok) throw new Error("Failed to fetch offers");
  return res.json();
}

export async function getOffer(id: string) {
  const res = await fetch(`${API_BASE}/api/offers/${id}`);
  if (!res.ok) throw new Error("Failed to fetch offer");
  return res.json();
}

export async function createOffer(data: {
  title: string;
  description: string;
  code: string;
  discountPercentage: number;
  startDate: Date;
  endDate: Date;
  applicableTo?: "all" | "category" | "product";
  applicableCategory?: string;
  applicableProduct?: string;
  image: File;
}) {
  const formData = new FormData();
  formData.append("title", data.title);
  formData.append("description", data.description);
  formData.append("code", data.code);
  formData.append("discountPercentage", data.discountPercentage.toString());
  formData.append("startDate", data.startDate.toISOString());
  formData.append("endDate", data.endDate.toISOString());
  formData.append("applicableTo", data.applicableTo || "all");
  if (data.applicableCategory) formData.append("applicableCategory", data.applicableCategory);
  if (data.applicableProduct) formData.append("applicableProduct", data.applicableProduct);
  formData.append("image", data.image);

  const res = await fetch(`${API_BASE}/api/offers`, {
    method: "POST",
    body: formData,
  });
  if (!res.ok) throw new Error("Failed to create offer");
  return res.json();
}

export async function updateOffer(
  id: string,
  data: {
    title?: string;
    description?: string;
    code?: string;
    discountPercentage?: number;
    startDate?: Date;
    endDate?: Date;
    applicableTo?: "all" | "category" | "product";
    applicableCategory?: string;
    applicableProduct?: string;
    isActive?: boolean;
    image?: File;
  }
) {
  const formData = new FormData();
  if (data.title) formData.append("title", data.title);
  if (data.description) formData.append("description", data.description);
  if (data.code) formData.append("code", data.code);
  if (data.discountPercentage !== undefined)
    formData.append("discountPercentage", data.discountPercentage.toString());
  if (data.startDate) formData.append("startDate", data.startDate.toISOString());
  if (data.endDate) formData.append("endDate", data.endDate.toISOString());
  if (data.applicableTo) formData.append("applicableTo", data.applicableTo);
  if (data.applicableCategory) formData.append("applicableCategory", data.applicableCategory);
  if (data.applicableProduct) formData.append("applicableProduct", data.applicableProduct);
  if (data.isActive !== undefined) formData.append("isActive", data.isActive.toString());
  if (data.image) formData.append("image", data.image);

  const res = await fetch(`${API_BASE}/api/offers/${id}`, {
    method: "PUT",
    body: formData,
  });
  if (!res.ok) throw new Error("Failed to update offer");
  return res.json();
}

export async function deleteOffer(id: string) {
  const res = await fetch(`${API_BASE}/api/offers/${id}`, {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to delete offer");
  return res.json();
}

// ============ CART ============

export async function getCart(sessionId?: string) {
  const url = sessionId
    ? `${API_BASE}/api/cart/${encodeURIComponent(sessionId)}`
    : `${API_BASE}/api/cart`;
  const res = await fetch(url);
  if (!res.ok) throw new Error("Failed to fetch cart");
  return res.json();
}

function withSessionId(url: string, sessionId?: string) {
  if (!sessionId) return url;
  const separator = url.includes("?") ? "&" : "?";
  return `${url}${separator}sessionId=${encodeURIComponent(sessionId)}`;
}

export async function addToCart(data: { productId: string; size: string; quantity?: number }) {
  const res = await fetch(`${API_BASE}/api/cart`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  if (!res.ok) throw new Error("Failed to add to cart");
  return res.json();
}

export async function updateCartItem(itemId: string, quantity: number, sessionId?: string) {
  const res = await fetch(withSessionId(`${API_BASE}/api/cart/${itemId}`, sessionId), {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ quantity }),
  });
  if (!res.ok) throw new Error("Failed to update cart item");
  return res.json();
}

export async function removeFromCart(itemId: string, sessionId?: string) {
  const res = await fetch(withSessionId(`${API_BASE}/api/cart/${itemId}`, sessionId), {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to remove from cart");
  return res.json();
}

export async function clearCart(sessionId?: string) {
  const res = await fetch(withSessionId(`${API_BASE}/api/cart`, sessionId), {
    method: "DELETE",
  });
  if (!res.ok) throw new Error("Failed to clear cart");
  return res.json();
}
