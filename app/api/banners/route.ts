import { NextRequest } from "next/server";
import { handleGetBanners, handleCreateBanner } from "@/api/handlers/banners/handlers";

// GET all banners or CREATE new banner
export async function GET(request: NextRequest) {
  return handleGetBanners();
}

export async function POST(request: NextRequest) {
  return handleCreateBanner(request);
}
