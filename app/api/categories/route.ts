import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Category from "@/lib/models/Category";

export async function GET() {
  await connectDB();

  const categories = await Category.find();

  return NextResponse.json({
    success: true,
    data: categories,
  });
}

export async function POST(request: Request) {
  await connectDB();

  const body = await request.json();

  const category = await Category.create(body);

  return NextResponse.json({
    success: true,
    data: category,
  });
}