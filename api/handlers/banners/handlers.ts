import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Banner from "@/lib/models/Banner";

function parseProductIds(value: FormDataEntryValue | null): string[] {
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

export async function handleGetBanners() {
  try {
    await connectDB();
    const banners = await Banner.find().sort({ order: 1, createdAt: -1 }).populate("products");
    return NextResponse.json({ success: true, data: banners });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function handleCreateBanner(request: NextRequest) {
  try {
    await connectDB();

    const formData = await request.formData();
    const title = formData.get("title") as string;
    const subtitle = formData.get("subtitle") as string;
    const link = formData.get("link") as string;
    const order = formData.get("order") as string;
    const file = formData.get("image") as File | null;
    const products = parseProductIds(formData.get("products"));

    if (!title) {
      return NextResponse.json(
        { success: false, error: "Missing required fields" },
        { status: 400 }
      );
    }

    const bannerData: any = {
      title,
      link: link || "/",
      order: order ? parseInt(order) : 0,
    };

    if (subtitle) bannerData.subtitle = subtitle;

    if (file) {
      const buffer = await file.arrayBuffer();
      const filename = `${Date.now()}-${file.name}`;
      const filepath = `${process.cwd()}/public/uploads/${filename}`;
      
      const fs = require("fs").promises;
      await fs.writeFile(filepath, Buffer.from(buffer));
      bannerData.image = `/uploads/${filename}`;
    }

    if (products.length) bannerData.products = products;

    const banner = await Banner.create(bannerData);

    return NextResponse.json({ success: true, data: banner }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function handleGetBanner(id: string) {
  try {
    await connectDB();
    const banner = await Banner.findById(id).populate("products");

    if (!banner) {
      return NextResponse.json(
        { success: false, error: "Banner not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: banner });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function handleUpdateBanner(id: string, request: NextRequest) {
  try {
    await connectDB();

    const formData = await request.formData();
    const title = formData.get("title") as string;
    const subtitle = formData.get("subtitle") as string;
    const link = formData.get("link") as string;
    const order = formData.get("order") as string;
    const isActive = formData.get("isActive") as string;
    const file = formData.get("image") as File | null;
    const products = parseProductIds(formData.get("products"));

    const updateData: any = {};
    if (title) updateData.title = title;
    if (subtitle) updateData.subtitle = subtitle;
    if (link) updateData.link = link;
    if (order) updateData.order = parseInt(order);
    if (isActive !== null) updateData.isActive = isActive === "true";
    if (products.length) updateData.products = products;

    // Handle image upload if provided
    if (file) {
      const buffer = await file.arrayBuffer();
      const filename = `${Date.now()}-${file.name}`;
      const filepath = `${process.cwd()}/public/uploads/${filename}`;
      
      const fs = require("fs").promises;
      await fs.writeFile(filepath, Buffer.from(buffer));
      updateData.image = `/uploads/${filename}`;
    }

    const banner = await Banner.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!banner) {
      return NextResponse.json(
        { success: false, error: "Banner not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: banner });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function handleDeleteBanner(id: string) {
  try {
    await connectDB();

    const banner = await Banner.findByIdAndDelete(id);

    if (!banner) {
      return NextResponse.json(
        { success: false, error: "Banner not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Banner deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
