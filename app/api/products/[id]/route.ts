import { NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import "@/lib/models/Category";
import Product from "@/lib/models/Product";


export async function GET(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  await connectDB();

  const { id } = await context.params;

  const product = await Product.findById(id).populate("category");

  return NextResponse.json({
    success: true,
    data: product,
  });
}

export async function DELETE(
  request: Request,
  context: { params: Promise<{ id: string }> }
) {
  await connectDB();

  const { id } = await context.params;

  await Product.findByIdAndDelete(id);

  return NextResponse.json({
    success: true,
  });
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await params;

    const body = await request.json();

    const product =
      await Product.findByIdAndUpdate(
        id,
        body,
        {
          new: true,
          runValidators: true,
        }
      );

    if (!product) {
      return NextResponse.json(
        {
          success: false,
          error: "Product not found",
        },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      data: product,
    });
  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Update failed",
      },
      { status: 500 }
    );
  }
}