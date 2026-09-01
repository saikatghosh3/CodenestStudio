import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import { apiLimiter, getClientIp } from "@/lib/rateLimit";
import { updateFrontendDesign, deleteFrontendDesign, toggleFeaturedFrontendDesign } from "@/services/frontendDesignServices";

export async function PUT(request, { params }) {
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

    if (data._toggleFeatured) {
      const design = await toggleFeaturedFrontendDesign(params.id);
      if (!design) {
        return NextResponse.json({ error: "Frontend design not found" }, { status: 404 });
      }
      return NextResponse.json(design);
    }

    const design = await updateFrontendDesign(params.id, data);
    if (!design) {
      return NextResponse.json({ error: "Frontend design not found" }, { status: 404 });
    }
    return NextResponse.json(design);
  } catch (error) {
    const message = error.message?.includes("MONGODB_URI")
      ? "Database not configured. Please set MONGODB_URI in your .env file."
      : error.code === 11000
      ? "A frontend design with this slug already exists"
      : "Failed to update frontend design";
    const errorResponse = process.env.NODE_ENV === "development" ? error.message || message : message;
    return NextResponse.json({ error: errorResponse }, { status: 503 });
  }
}

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

    const design = await deleteFrontendDesign(params.id);
    if (!design) {
      return NextResponse.json({ error: "Frontend design not found" }, { status: 404 });
    }
    return NextResponse.json({ message: "Frontend design deleted successfully" });
  } catch (error) {
    const message = error.message?.includes("MONGODB_URI")
      ? "Database not configured. Please set MONGODB_URI in your .env file."
      : "Failed to delete frontend design";
    return NextResponse.json({ error: message }, { status: 503 });
  }
}
