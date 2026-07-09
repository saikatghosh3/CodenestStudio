import { NextResponse } from "next/server";
import { generateToken, ADMIN_CREDENTIALS } from "@/lib/auth";
import { loginLimiter, getClientIp } from "@/lib/rateLimit";

export async function POST(request) {
  try {
    const ip = getClientIp(request);
    const { success, remaining, retryAfter } = loginLimiter(ip);

    if (!success) {
      return NextResponse.json(
        { error: `Too many login attempts. Try again in ${retryAfter} seconds.` },
        { status: 429 }
      );
    }

    const body = await request.json();
    const { email, password } = body;

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required" },
        { status: 400 }
      );
    }

    if (
      email !== ADMIN_CREDENTIALS.email ||
      password !== ADMIN_CREDENTIALS.password
    ) {
      return NextResponse.json(
        { error: "Invalid email or password" },
        { status: 401 }
      );
    }

    const token = generateToken({ email, role: "admin" });

    const response = NextResponse.json(
      {
        message: "Login successful",
        token,
        user: { email, role: "admin" },
      },
      { status: 200 }
    );

    response.cookies.set("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7, // 7 days
      path: "/",
    });

    return response;
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
