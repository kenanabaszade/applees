import { scrapeSwiftDocs, SWIFT_DOCS_PATHS } from "../lib/swift-docs-scraper";
import * as fs from "fs/promises";
import * as path from "path";

async function main() {
  console.log("Scraping Swift documentation...\n");

  const outputDir = path.join(process.cwd(), "scraped-content");
  await fs.mkdir(outputDir, { recursive: true });

  for (const [key, url] of Object.entries(SWIFT_DOCS_PATHS)) {
    console.log(`\nScraping: ${key}`);
    console.log(`URL: ${url}`);
    
    const content = await scrapeSwiftDocs(url);
    
    if (content) {
      console.log(`✓ Title: ${content.title}`);
      console.log(`✓ Sections: ${content.sections.length}`);
      console.log(`✓ Code examples: ${content.sections.reduce((sum, s) => sum + s.codeExamples.length, 0)}`);
      
      // Save to JSON file
      const outputPath = path.join(outputDir, `${key}.json`);
      await fs.writeFile(outputPath, JSON.stringify(content, null, 2));
      console.log(`✓ Saved to: ${outputPath}`);
    } else {
      console.log("✗ Failed to scrape");
    }
    
    // Be respectful - add delay between requests
    await new Promise((resolve) => setTimeout(resolve, 2000));
  }

  console.log("\n\n✓ Scraping complete! Check the scraped-content directory.");
}

main().catch(console.error);

