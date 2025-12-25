import { scrapeSwiftDocs } from "../lib/swift-docs-scraper";

// Swift documentation base URLs
const SWIFT_DOCS_BASE = "https://docs.swift.org/swift-book/documentation/the-swift-programming-language/";

const sectionsToScrape = [
  {
    path: "thebasics",
    title: "The Basics",
    pages: [
      "constantsandvariables",
      "typesafetyandtypeinference",
      "basicoperators",
      "stringsandcharacters",
      "collectiontypes",
    ],
  },
  {
    path: "controlflow",
    title: "Control Flow",
    pages: [
      "controlflow",
      "conditionalstatements",
      "switch",
      "controltransferstatements",
    ],
  },
  {
    path: "functions",
    title: "Functions",
    pages: [
      "functions",
      "functionparametersandreturnvalues",
      "functiontypes",
    ],
  },
  {
    path: "closures",
    title: "Closures",
    pages: ["closures"],
  },
  {
    path: "enumerations",
    title: "Enumerations",
    pages: ["enumerations"],
  },
  {
    path: "structuresandclasses",
    title: "Structures and Classes",
    pages: ["structuresandclasses"],
  },
];

async function main() {
  console.log("Starting Swift documentation scraping...\n");

  for (const section of sectionsToScrape) {
    console.log(`\n=== ${section.title} ===`);
    
    for (const page of section.pages) {
      const url = `${SWIFT_DOCS_BASE}${section.path}/${page}`;
      console.log(`\nScraping: ${url}`);
      
      const content = await scrapeSwiftDocs(url);
      
      if (content) {
        console.log(`Title: ${content.title}`);
        console.log(`Sections found: ${content.sections.length}`);
        console.log(`Code examples: ${content.sections.reduce((sum, s) => sum + s.codeExamples.length, 0)}`);
        
        // Save to file for review
        const fs = await import("fs/promises");
        const outputDir = "./scraped-content";
        await fs.mkdir(outputDir, { recursive: true });
        await fs.writeFile(
          `${outputDir}/${page}.json`,
          JSON.stringify(content, null, 2)
        );
      } else {
        console.log("Failed to scrape content");
      }
      
      // Be respectful - add delay between requests
      await new Promise((resolve) => setTimeout(resolve, 1000));
    }
  }

  console.log("\n\nScraping complete!");
}

main().catch(console.error);

