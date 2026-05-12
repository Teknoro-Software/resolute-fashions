import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Category from "@/lib/models/Category";

export async function handleGetCategories() {
  try {
    await connectDB();
    const categories = await Category.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: categories });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function handleCreateCategory(request: NextRequest) {
  try {
    await connectDB();

    const formData = await request.formData();
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const file = formData.get("image") as File;

    if (!name || !description || !file) {
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

    const slug = name.toLowerCase().replace(/\s+/g, "-");

    const category = await Category.create({
      name,
      description,
      image: `/uploads/${filename}`,
      slug,
    });

    return NextResponse.json({ success: true, data: category }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function handleGetCategory(id: string) {
  try {
    await connectDB();
    const category = await Category.findById(id);

    if (!category) {
      return NextResponse.json(
        { success: false, error: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: category });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function handleUpdateCategory(id: string, request: NextRequest) {
  try {
    await connectDB();

    const formData = await request.formData();
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const file = formData.get("image") as File | null;

    const updateData: any = {};
    if (name) updateData.name = name;
    if (description) updateData.description = description;
    if (name) updateData.slug = name.toLowerCase().replace(/\s+/g, "-");

    // Handle image upload if provided
    if (file) {
      const buffer = await file.arrayBuffer();
      const filename = `${Date.now()}-${file.name}`;
      const filepath = `${process.cwd()}/public/uploads/${filename}`;
      
      const fs = require("fs").promises;
      await fs.writeFile(filepath, Buffer.from(buffer));
      updateData.image = `/uploads/${filename}`;
    }

    const category = await Category.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!category) {
      return NextResponse.json(
        { success: false, error: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: category });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function handleDeleteCategory(id: string) {
  try {
    await connectDB();

    const category = await Category.findByIdAndDelete(id);

    if (!category) {
      return NextResponse.json(
        { success: false, error: "Category not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Category deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
