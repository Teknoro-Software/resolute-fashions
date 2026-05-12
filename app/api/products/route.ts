import { NextRequest } from "next/server";
import { handleGetProducts, handleCreateProduct } from "@/api/handlers/products/handlers";

// GET all products or CREATE new product
export async function GET(request: NextRequest) {
  const category = request.nextUrl.searchParams.get("category");
  return handleGetProducts(category || undefined);
}

export async function POST(request: NextRequest) {
  return handleCreateProduct(request);
}
