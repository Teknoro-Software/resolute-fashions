import { NextRequest } from "next/server";
import {
  handleGetCategory,
  handleUpdateCategory,
  handleDeleteCategory,
} from "@/api/handlers/categories/handlers";

// GET single category, UPDATE category, or DELETE category
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  return handleGetCategory(id);
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  return handleUpdateCategory(id, request);
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  return handleDeleteCategory(id);
}
