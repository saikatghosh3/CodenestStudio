import { NextResponse } from "next/server";
import { getFrontendDesignBySlug } from "@/services/frontendDesignServices";

export async function GET(request, { params }) {
  try {
    const design = await getFrontendDesignBySlug(params.slug);
    if (!design) {
      return NextResponse.json({ error: "Frontend design not found" }, { status: 404 });
    }
    return NextResponse.json(design, {
      headers: {
        "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600",
      },
    });
  } catch (error) {
    const message = error.message?.includes("MONGODB_URI")
      ? "Database not configured. Please set MONGODB_URI in your .env file."
      : "Failed to fetch frontend design";
    return NextResponse.json({ error: message }, { status: 503 });
  }
}
