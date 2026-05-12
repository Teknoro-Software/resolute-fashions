import { NextRequest } from "next/server";
import {
  handleGetProduct,
  handleUpdateProduct,
  handleDeleteProduct,
} from "@/api/handlers/products/handlers";

// GET single product, UPDATE product, or DELETE product
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  return handleGetProduct(id);
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  return handleUpdateProduct(id, request);
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  return handleDeleteProduct(id);
}
