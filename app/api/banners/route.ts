import { NextResponse } from "next/server";
import Banner from "@/lib/models/Banner";
import { connectDB } from "@/lib/db";

export async function GET() {
  await connectDB();

  const banners = await Banner.find().sort({
    createdAt: -1,
  });

  return NextResponse.json({
    success: true,
    data: banners,
  });
}

export async function POST(request: Request) {
  await connectDB();

  const body = await request.json();

  const banner = await Banner.create({
    image: body.image,
    active: body.active ?? true,
  });

  return NextResponse.json({
    success: true,
    data: banner,
  });
}
