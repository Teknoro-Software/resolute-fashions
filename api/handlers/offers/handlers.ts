import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/lib/db";
import Offer from "@/lib/models/Offer";

export async function handleGetOffers() {
  try {
    await connectDB();
    const offers = await Offer.find().sort({ createdAt: -1 });
    return NextResponse.json({ success: true, data: offers });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function handleCreateOffer(request: NextRequest) {
  try {
    await connectDB();

    const formData = await request.formData();
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const code = formData.get("code") as string;
    const discountPercentage = parseFloat(formData.get("discountPercentage") as string);
    const startDate = formData.get("startDate") as string;
    const endDate = formData.get("endDate") as string;
    const applicableTo = formData.get("applicableTo") as string;
    const applicableCategory = formData.get("applicableCategory") as string;
    const applicableProduct = formData.get("applicableProduct") as string;
    const file = formData.get("image") as File;

    if (!title || !code || !discountPercentage || !startDate || !endDate || !file) {
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

    const offerData: any = {
      title,
      code,
      discountPercentage,
      startDate: new Date(startDate),
      endDate: new Date(endDate),
      image: `/uploads/${filename}`,
      applicableTo: applicableTo || "all",
    };

    if (description) offerData.description = description;

    if (applicableCategory) offerData.applicableCategory = applicableCategory;
    if (applicableProduct) offerData.applicableProduct = applicableProduct;

    const offer = await Offer.create(offerData);

    return NextResponse.json({ success: true, data: offer }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function handleGetOffer(id: string) {
  try {
    await connectDB();
    const offer = await Offer.findById(id);

    if (!offer) {
      return NextResponse.json(
        { success: false, error: "Offer not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: offer });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function handleUpdateOffer(id: string, request: NextRequest) {
  try {
    await connectDB();

    const formData = await request.formData();
    const title = formData.get("title") as string;
    const description = formData.get("description") as string;
    const code = formData.get("code") as string;
    const discountPercentage = formData.get("discountPercentage") as string;
    const startDate = formData.get("startDate") as string;
    const endDate = formData.get("endDate") as string;
    const applicableTo = formData.get("applicableTo") as string;
    const applicableCategory = formData.get("applicableCategory") as string;
    const applicableProduct = formData.get("applicableProduct") as string;
    const isActive = formData.get("isActive") as string;
    const file = formData.get("image") as File | null;

    const updateData: any = {};
    if (title) updateData.title = title;
    if (description) updateData.description = description;
    if (code) updateData.code = code;
    if (discountPercentage) updateData.discountPercentage = parseFloat(discountPercentage);
    if (startDate) updateData.startDate = new Date(startDate);
    if (endDate) updateData.endDate = new Date(endDate);
    if (applicableTo) updateData.applicableTo = applicableTo;
    if (applicableCategory) updateData.applicableCategory = applicableCategory;
    if (applicableProduct) updateData.applicableProduct = applicableProduct;
    if (isActive !== null) updateData.isActive = isActive === "true";

    // Handle image upload if provided
    if (file) {
      const buffer = await file.arrayBuffer();
      const filename = `${Date.now()}-${file.name}`;
      const filepath = `${process.cwd()}/public/uploads/${filename}`;
      
      const fs = require("fs").promises;
      await fs.writeFile(filepath, Buffer.from(buffer));
      updateData.image = `/uploads/${filename}`;
    }

    const offer = await Offer.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
    });

    if (!offer) {
      return NextResponse.json(
        { success: false, error: "Offer not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: offer });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}

export async function handleDeleteOffer(id: string) {
  try {
    await connectDB();

    const offer = await Offer.findByIdAndDelete(id);

    if (!offer) {
      return NextResponse.json(
        { success: false, error: "Offer not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      message: "Offer deleted successfully",
    });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: (error as Error).message },
      { status: 500 }
    );
  }
}
