import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";

export async function GET(request) {
  try {
    const token = request.cookies.get("token")?.value;

    if (!token) {
      return NextResponse.json({ error: "No token" }, { status: 401 });
    }

    const decoded = verifyToken(token);

    if (!decoded) {
      const response = NextResponse.json(
        { error: "Invalid or expired token" },
        { status: 401 }
      );
      response.cookies.set("token", "", { maxAge: 0, path: "/" });
      return response;
    }

    return NextResponse.json({ user: decoded }, { status: 200 });
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }
}

export async function POST(request) {
  try {
    const response = NextResponse.json(
      { message: "Logged out successfully" },
      { status: 200 }
    );
    response.cookies.set("token", "", { maxAge: 0, path: "/" });
    return response;
  } catch {
    return NextResponse.json({ error: "Logout failed" }, { status: 500 });
  }
}
