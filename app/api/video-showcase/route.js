import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import { apiLimiter, getClientIp } from "@/lib/rateLimit";
import { getActiveVideos, createVideo, getAllVideos } from "@/services/videoShowcaseServices";

export async function GET(request) {
  try {
    const token = request.cookies.get("token")?.value;
    if (token && verifyToken(token)) {
      const videos = await getAllVideos();
      return NextResponse.json(videos, {
        headers: {
          "Cache-Control": "private, no-cache",
        },
      });
    }
    const videos = await getActiveVideos();
    return NextResponse.json(videos, {
      headers: {
        "Cache-Control": "public, s-maxage=120, stale-while-revalidate=300",
      },
    });
  } catch (error) {
    const message = error.message?.includes("MONGODB_URI")
      ? "Database not configured. Please set MONGODB_URI in your .env file."
      : "Failed to fetch videos";
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
    if (!data.title || !data.videoUrl) {
      return NextResponse.json(
        { error: "Title and video URL are required" },
        { status: 400 }
      );
    }

    const video = await createVideo(data);
    return NextResponse.json(video, { status: 201 });
  } catch (error) {
    const message = error.message?.includes("MONGODB_URI")
      ? "Database not configured. Please set MONGODB_URI in your .env file."
      : "Failed to create video";
    const errorResponse = process.env.NODE_ENV === "development" ? error.message || message : message;
    return NextResponse.json({ error: errorResponse }, { status: 503 });
  }
}
