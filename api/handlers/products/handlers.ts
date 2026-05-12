import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Product from "@/lib/models/Product";

function parseSizes(value: FormDataEntryValue | null): string[] {
  if (!value || typeof value !== "string") return [];
  const text = value.trim();
  if (!text) return [];

  try {
    if (text.startsWith("[")) {
      const parsed = JSON.parse(text);
      if (Array.isArray(parsed)) return parsed.map((item) => String(item).trim()).filter(Boolean);
    }
  } catch {
    // fall back to comma-separated parsing
  }

  return text.split(",").map((item) => item.trim()).filter(Boolean);
}

export async function handleGetProducts(category?: string) {
  try {
    await connectDB();

    const query = category ? { category } : {};

    const products = await Product.find(query)
      .populate("category")
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: products,
    });

  } catch (error) {
    return NextResponse.json(
      {
        success: false,
        error: (error as Error).message,
      },
      { status: 500 }
    );
  }
}

export async function handleCreateProduct(request: NextRequest) {
  try {
    await connectDB();

    const formData = await request.formData();
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = parseFloat(formData.get("price") as string);
    const originalPrice = parseFloat(formData.get("originalPrice") as string);
    const category = formData.get("category") as string;
    const stock = parseInt(formData.get("stock") as string);
    const sizes = parseSizes(formData.get("sizes"));
    const file = formData.get("image") as File;

    if (!name || !description || !price || !originalPrice || !category || sizes.length === 0 || !file) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    // Save file
    const buffer = await file.arrayBuffer();
    const filename = `${Date.now()}-${file.name}`;
    const filepath = `${process.cwd()}/public/uploads/${filename}`;
    
    const fs = require("fs").promises;
    await fs.writeFile(filepath, Buffer.from(buffer));

    const product = await Product.create({
      name,
      description,
      price,
      originalPrice,
      category,
      stock: stock || 0,
      sizes,
      image: `/uploads/${filename}`,
      images: [],
    });

    return NextResponse.json({ success: true, data: product }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function handleGetProduct(id: string) {
  try {
    await connectDB();
    const product = await Product.findById(id);

    if (!product) {
      return NextResponse.json(
        { success: false, error: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: product });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function handleUpdateProduct(id: string, request: NextRequest) {
  try {
    await connectDB();

    const formData = await request.formData();
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const price = formData.get("price") as string;
    const originalPrice = formData.get("originalPrice") as string;
    const category = formData.get("category") as string;
    const stock = formData.get("stock") as string;
    const sizes = parseSizes(formData.get("sizes"));
    const file = formData.get("image") as File | null;

    const updateData: any = {};
    if (name) updateData.name = name;
    if (description) updateData.description = description;
    if (price) updateData.price = parseFloat(price);
    if (originalPrice) updateData.originalPrice = parseFloat(originalPrice);
    if (category) updateData.category = category;
    if (stock) updateData.stock = parseInt(stock);
    if (sizes.length > 0) updateData.sizes = sizes;

    // Handle image upload if provided
    if (file) {
      const buffer = await file.arrayBuffer();
      const filename = `${Date.now()}-${file.name}`;
      const filepath = `${process.cwd()}/public/uploads/${filename}`;
      
      const fs = require("fs").promises;
      await fs.writeFile(filepath, Buffer.from(buffer));
      updateData.image = `/uploads/${filename}`;
    }

    const product = await Product.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return NextResponse.json(
        { success: false, error: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: product });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function handleDeleteProduct(id: string) {
  try {
    await connectDB();

    const product = await Product.findByIdAndDelete(id);

    if (!product) {
      return NextResponse.json(
        { success: false, error: "Product not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Product deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
