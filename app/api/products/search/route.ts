import {
  NextRequest,
  NextResponse,
} from "next/server";

import { connectDB } from "@/lib/db";
import Product from "@/lib/models/Product";

export async function GET(
  request: NextRequest
) {
  await connectDB();

  const query =
    request.nextUrl.searchParams.get(
      "q"
    );

  if (!query) {
    return NextResponse.json({
      success: true,
      data: [],
    });
  }

  const products =
    await Product.find({
      $or: [
        {
          name: {
            $regex: query,
            $options: "i",
          },
        },
        {
          description: {
            $regex: query,
            $options: "i",
          },
        },
        {
          subCategory: {
            $regex: query,
            $options: "i",
          },
        },
      ],
    }).limit(8);

  return NextResponse.json({
    success: true,
    data: products,
  });
}