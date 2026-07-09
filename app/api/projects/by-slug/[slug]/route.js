import { NextResponse } from "next/server";
import { getProjectBySlug } from "@/services/projectServices";

export async function GET(request, { params }) {
  try {
    const project = await getProjectBySlug(params.slug);
    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 });
    }
    return NextResponse.json(project);
  } catch (error) {
    const message = error.message?.includes("MONGODB_URI")
      ? "Database not configured. Please set MONGODB_URI in your .env file."
      : "Failed to fetch project";
    return NextResponse.json({ error: message }, { status: 503 });
  }
}
