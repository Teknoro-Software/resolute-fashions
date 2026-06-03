import { NextResponse } from "next/server";
import {connectDB} from "@/lib/db";
import Banner from "@/lib/models/Banner";

export async function DELETE(
  request: Request,
  {
    params,
  }: {
    params: Promise<{
      id: string;
    }>;
  },
) {
  await connectDB();

  const { id } = await params;

  await Banner.findByIdAndDelete(id);

  return NextResponse.json({
    success: true,
  });
}
