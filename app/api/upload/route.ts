import { writeFile, mkdir } from "fs/promises";
import { existsSync } from "fs";
import { NextResponse } from "next/server";
import path from "path";

export async function POST(request: Request) {
  try {
    const formData = await request.formData();

    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json(
        {
          success: false,
          error: "No file uploaded",
        },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadsDir = path.join(
      process.cwd(),
      "public",
      "uploads",
      "categories"
    );

    if (!existsSync(uploadsDir)) {
      await mkdir(uploadsDir, {
        recursive: true,
      });
    }

    const fileName = `${Date.now()}-${file.name.replaceAll(
      " ",
      "-"
    )}`;

    const filePath = path.join(
      uploadsDir,
      fileName
    );

    await writeFile(filePath, buffer);

    return NextResponse.json({
      success: true,
      path: `/uploads/categories/${fileName}`,
    });
  } catch (error) {
    console.error("UPLOAD ERROR:", error);

    return NextResponse.json(
      {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "Upload failed",
      },
      { status: 500 }
    );
  }
}