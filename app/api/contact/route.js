import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import { apiLimiter, getClientIp } from "@/lib/rateLimit";
import { getAllMessages, createMessage } from "@/services/contactMessageServices";

export async function GET(request) {
  try {
    const token = request.cookies.get("token")?.value;
    if (!token && !verifyToken(token)) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
    }
    const messages = await getAllMessages();
    return NextResponse.json(messages, {
      headers: { "Cache-Control": "private, no-cache" },
    });
  } catch (error) {
    const message = error.message?.includes("MONGODB_URI")
      ? "Database not configured. Please set MONGODB_URI in your .env file."
      : "Failed to fetch messages";
    return NextResponse.json({ error: message }, { status: 503 });
  }
}

export async function POST(request) {
  try {
    const ip = getClientIp(request);
    const { success } = apiLimiter(ip);
    if (!success) {
      return NextResponse.json({ error: "Too many requests. Please slow down." }, { status: 429 });
    }

    const data = await request.json();
    if (!data.name || !data.email || !data.message) {
      return NextResponse.json(
        { error: "Name, email, and message are required" },
        { status: 400 }
      );
    }

    const message = await createMessage(data);
    return NextResponse.json(message, { status: 201 });
  } catch (error) {
    const message = error.message?.includes("MONGODB_URI")
      ? "Database not configured. Please set MONGODB_URI in your .env file."
      : "Failed to send message";
    return NextResponse.json({ error: message }, { status: 503 });
  }
}
