import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import { apiLimiter, getClientIp } from "@/lib/rateLimit";
import { getAboutUs, updateAboutUs } from "@/services/aboutUsServices";

export async function GET() {
  try {
    const about = await getAboutUs();
    return NextResponse.json(about, {
      headers: {
        "Cache-Control": "no-store, no-cache, must-revalidate",
      },
    });
  } catch (error) {
    const message = error.message?.includes("MONGODB_URI")
      ? "Database not configured. Please set MONGODB_URI in your .env file."
      : "Failed to fetch about us data";
    return NextResponse.json({ error: message }, { status: 503 });
  }
}

export async function PUT(request) {
  try {
    const ip = getClientIp(request);
    const { success } = apiLimiter(ip);
    if (!success) {
      return NextResponse.json({ error: "Too many requests. Please slow down." }, { status: 429 });
    }

    const token = request.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
    }

    const data = await request.json();
    const about = await updateAboutUs(data);
    return NextResponse.json(about);
  } catch (error) {
    const message = error.message?.includes("MONGODB_URI")
      ? "Database not configured. Please set MONGODB_URI in your .env file."
      : "Failed to update about us data";
    const errorResponse =
      process.env.NODE_ENV === "development" ? error.message || message : message;
    return NextResponse.json({ error: errorResponse }, { status: 503 });
  }
}
