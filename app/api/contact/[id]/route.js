import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import { apiLimiter, getClientIp } from "@/lib/rateLimit";
import { deleteMessage } from "@/services/contactMessageServices";

export async function DELETE(request, { params }) {
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

    const message = await deleteMessage(params.id);
    if (!message) {
      return NextResponse.json({ error: "Message not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Message deleted successfully" });
  } catch (error) {
    const msg = error.message?.includes("MONGODB_URI")
      ? "Database not configured. Please set MONGODB_URI in your .env file."
      : "Failed to delete message";
    return NextResponse.json({ error: msg }, { status: 503 });
  }
}
