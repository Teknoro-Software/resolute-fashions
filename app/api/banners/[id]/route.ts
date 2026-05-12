import { NextRequest } from "next/server";
import {
  handleGetBanner,
  handleUpdateBanner,
  handleDeleteBanner,
} from "@/api/handlers/banners/handlers";

// GET single banner, UPDATE banner, or DELETE banner
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  return handleGetBanner(id);
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  return handleUpdateBanner(id, request);
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  return handleDeleteBanner(id);
}
