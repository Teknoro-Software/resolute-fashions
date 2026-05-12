import { NextRequest } from "next/server";
import { handleGetCategories, handleCreateCategory } from "@/api/handlers/categories/handlers";

// GET all categories or CREATE new category
export async function GET(request: NextRequest) {
  return handleGetCategories();
}

export async function POST(request: NextRequest) {
  return handleCreateCategory(request);
}
