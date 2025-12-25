import { NextResponse } from "next/server";
import { scrapeSwiftDocs } from "@/lib/swift-docs-scraper";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const url = searchParams.get("url");

  if (!url) {
    return NextResponse.json({ error: "URL parameter is required" }, { status: 400 });
  }

  try {
    const content = await scrapeSwiftDocs(url);
    
    if (!content) {
      return NextResponse.json({ error: "Failed to scrape content" }, { status: 500 });
    }

    return NextResponse.json(content);
  } catch (error) {
    console.error("Scraping error:", error);
    return NextResponse.json(
      { error: "Internal server error", details: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

