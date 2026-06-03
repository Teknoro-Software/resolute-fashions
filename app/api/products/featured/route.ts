import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Product from "@/lib/models/Product";

export async function GET() {
  await connectDB();

  const products = await Product.find({
    featured: true,
  })
    .populate("category")
    .sort({ createdAt: -1 });

  return NextResponse.json({
    success: true,
    data: products,
  });
}
