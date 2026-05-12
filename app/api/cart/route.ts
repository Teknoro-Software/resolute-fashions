import { NextRequest } from "next/server";
import {
  handleGetCart,
  handleAddToCart,
  handleClearCart,
} from "@/api/handlers/cart/handlers";

// GET /api/cart - Get cart
export async function GET(request: NextRequest) {
  return handleGetCart(request);
}

// POST /api/cart - Add item to cart
export async function POST(request: NextRequest) {
  return handleAddToCart(request);
}

// DELETE /api/cart - Clear cart
export async function DELETE(request: NextRequest) {
  return handleClearCart(request);
}
