import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
  const body = await request.json();

  const email = process.env.ADMIN_EMAIL;

  const password = process.env.ADMIN_PASSWORD;

  if (body.email !== email || body.password !== password) {
    return NextResponse.json({
      success: false,
      message: "Invalid credentials",
    });
  }

  const cookieStore = await cookies();

  cookieStore.set("admin-token", "logged-in", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: 60 * 60 * 24,
  });

  return NextResponse.json({
    success: true,
  });
}
