import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";

import Category from "@/lib/models/Category"; // IMPORTANT
import Product from "@/lib/models/Product";

export async function GET() {
  await connectDB();

  const products = await Product.find().sort({
    createdAt: -1,
  });

  console.log(
    JSON.stringify(products, null, 2)
  );

  return NextResponse.json({
    success: true,
    data: products,
  });
}

export async function POST(request: Request) {
  await connectDB();

  const body = await request.json();

  console.log("PRODUCT BODY:", body);

  const product = await Product.create(body);

  return NextResponse.json({
    success: true,
    data: product,
  });
}