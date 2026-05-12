import { NextRequest } from "next/server";
import { handleGetOffers, handleCreateOffer } from "@/api/handlers/offers/handlers";

// GET all offers or CREATE new offer
export async function GET(request: NextRequest) {
  return handleGetOffers();
}

export async function POST(request: NextRequest) {
  return handleCreateOffer(request);
}
