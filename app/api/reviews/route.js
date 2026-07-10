import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import { apiLimiter, getClientIp } from "@/lib/rateLimit";
import { getAllReviews, createReview, getAllReviewsAdmin } from "@/services/reviewServices";

export async function GET(request) {
  try {
    const token = request.cookies.get("token")?.value;
    if (token && verifyToken(token)) {
      const reviews = await getAllReviewsAdmin();
      return NextResponse.json(reviews, {
        headers: {
          "Cache-Control": "private, no-cache",
        },
      });
    }
    const reviews = await getAllReviews();
    return NextResponse.json(reviews, {
      headers: {
        "Cache-Control": "public, s-maxage=120, stale-while-revalidate=300",
      },
    });
  } catch (error) {
    const message = error.message?.includes("MONGODB_URI")
      ? "Database not configured. Please set MONGODB_URI in your .env file."
      : "Failed to fetch reviews";
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

    const token = request.cookies.get("token")?.value;
    if (!token) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }
    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ error: "Invalid or expired token" }, { status: 401 });
    }

    const data = await request.json();
    if (!data.name || !data.company || !data.text) {
      return NextResponse.json(
        { error: "Name, company, and text are required" },
        { status: 400 }
      );
    }

    const review = await createReview(data);
    return NextResponse.json(review, { status: 201 });
  } catch (error) {
    const message = error.message?.includes("MONGODB_URI")
      ? "Database not configured. Please set MONGODB_URI in your .env file."
      : "Failed to create review";
    const errorResponse = process.env.NODE_ENV === "development" ? error.message || message : message;
    return NextResponse.json({ error: errorResponse }, { status: 503 });
  }
}
