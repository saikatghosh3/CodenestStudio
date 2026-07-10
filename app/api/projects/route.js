import { NextResponse } from "next/server";
import { verifyToken } from "@/lib/auth";
import { apiLimiter, getClientIp } from "@/lib/rateLimit";
import { getAllProjects, createProject } from "@/services/projectServices";

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const filters = {};
    if (searchParams.get("category")) filters.category = searchParams.get("category");
    if (searchParams.get("featured")) filters.featured = searchParams.get("featured");

    const projects = await getAllProjects(filters);
    return NextResponse.json(projects, {
      headers: {
        "Cache-Control": "public, s-maxage=30, stale-while-revalidate=60",
      },
    });
  } catch (error) {
    const message = error.message?.includes("MONGODB_URI")
      ? "Database not configured. Please set MONGODB_URI in your .env file."
      : "Failed to fetch projects";
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
    if (!data.title || !data.description || !data.thumbnail) {
      return NextResponse.json(
        { error: "Title, description and thumbnail are required" },
        { status: 400 }
      );
    }

    const project = await createProject(data);
    return NextResponse.json(project, { status: 201 });
  } catch (error) {
    const message = error.message?.includes("MONGODB_URI")
      ? "Database not configured. Please set MONGODB_URI in your .env file."
      : error.code === 11000
      ? "A project with this slug already exists"
      : "Failed to create project";
    const errorResponse = process.env.NODE_ENV === "development" ? error.message || message : message;
    return NextResponse.json({ error: errorResponse }, { status: 503 });
  }
}
