import { NextResponse } from "next/server";
import {connectDB} from "@/lib/db";
import Banner from "@/lib/models/Banner";

export async function GET() {
  await connectDB();

  const banners = await Banner.find({
    active: true,
  });

  return NextResponse.json({
    success: true,
    data: banners,
  });
}
