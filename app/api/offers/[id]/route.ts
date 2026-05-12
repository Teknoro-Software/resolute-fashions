import { NextRequest } from "next/server";
import {
  handleGetOffer,
  handleUpdateOffer,
  handleDeleteOffer,
} from "@/api/handlers/offers/handlers";

// GET single offer, UPDATE offer, or DELETE offer
export async function GET(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  return handleGetOffer(id);
}

export async function PUT(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  return handleUpdateOffer(id, request);
}

export async function DELETE(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params;
  return handleDeleteOffer(id);
}
