import { ScrapedContent } from "./swift-docs-scraper";
import * as fs from "fs/promises";
import * as path from "path";

export async function getScrapedContent(lessonKey: string): Promise<ScrapedContent | null> {
  try {
    const filePath = path.join(process.cwd(), "scraped-content", `${lessonKey}.json`);
    const fileContents = await fs.readFile(filePath, "utf-8");
    return JSON.parse(fileContents) as ScrapedContent;
  } catch (error) {
    console.error(`Failed to load scraped content for ${lessonKey}:`, error);
    return null;
  }
}

export function findSectionByHeading(
  content: ScrapedContent | null,
  heading: string
): ScrapedContent["sections"][0] | null {
  if (!content) return null;
  return content.sections.find((s) => 
    s.heading.toLowerCase().includes(heading.toLowerCase())
  ) || null;
}

export function getAllCodeExamples(content: ScrapedContent | null): Array<{ code: string; language?: string }> {
  if (!content) return [];
  return content.sections.flatMap((s) => s.codeExamples);
}

/**
 * Gets sections by level (e.g., all h2 sections)
 * @param content - The scraped content
 * @param level - The heading level (2-6)
 * @returns Array of sections at that level
 */
export function getSectionsByLevel(
  content: ScrapedContent | null,
  level: number
): ScrapedContent["sections"] {
  if (!content) return [];
  return content.sections.filter((s) => s.level === level);
}
