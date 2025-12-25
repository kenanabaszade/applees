import { scrapeSwiftDocs, SWIFT_DOCS_PATHS } from "../lib/swift-docs-scraper";
import * as fs from "fs/promises";
import * as path from "path";

async function main() {
  console.log("Scraping all Swift documentation topics...\n");

  const scrapedContentDir = path.join(process.cwd(), "scraped-content");
  await fs.mkdir(scrapedContentDir, { recursive: true });

  const topics = Object.keys(SWIFT_DOCS_PATHS);
  let successCount = 0;
  let failCount = 0;

  for (const topicKey of topics) {
    const url = SWIFT_DOCS_PATHS[topicKey];
    console.log(`\n[${topics.indexOf(topicKey) + 1}/${topics.length}] Scraping: ${topicKey}`);
    console.log(`URL: ${url}`);

    try {
      const content = await scrapeSwiftDocs(url);

      if (content && content.sections.length > 0) {
        const filePath = path.join(scrapedContentDir, `${topicKey}.json`);
        await fs.writeFile(filePath, JSON.stringify(content, null, 2));
        
        const codeExamplesCount = content.sections.reduce(
          (acc, s) => acc + s.codeExamples.length,
          0
        );
        
        console.log(`✓ Title: ${content.title}`);
        console.log(`✓ Sections: ${content.sections.length}`);
        console.log(`✓ Code examples: ${codeExamplesCount}`);
        console.log(`✓ Saved to: ${filePath}`);
        successCount++;
      } else {
        console.log(`✗ No content found`);
        failCount++;
      }
    } catch (error) {
      console.error(`✗ Error:`, error instanceof Error ? error.message : String(error));
      failCount++;
    }

    // Add a small delay to avoid overwhelming the server
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }

  console.log(`\n\n=== Scraping Complete ===`);
  console.log(`✓ Success: ${successCount}`);
  console.log(`✗ Failed: ${failCount}`);
  console.log(`\nCheck the scraped-content directory for results.`);
}

main().catch(console.error);

