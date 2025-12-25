import * as cheerio from "cheerio";
import puppeteer from "puppeteer";

interface ScrapedContent {
  title: string;
  sections: Array<{
    heading: string;
    level: number;
    content: string;
    codeExamples: Array<{ code: string; language?: string }>;
  }>;
}

export async function scrapeSwiftDocs(url: string): Promise<ScrapedContent | null> {
  let browser;
  try {
    // Use Puppeteer to handle JavaScript-rendered content
    browser = await puppeteer.launch({
      headless: true,
      args: ["--no-sandbox", "--disable-setuid-sandbox"],
    });
    
    const page = await browser.newPage();
    await page.setViewport({ width: 1920, height: 1080 });
    await page.goto(url, { waitUntil: "networkidle2", timeout: 30000 });
    
    // Wait for content to load
    await page.waitForSelector("main, article, h1, h2", { timeout: 10000 }).catch(() => {});
    
    // Get the HTML content
    const html = await page.content();
    await browser.close();
    
    const $ = cheerio.load(html);

    // Extract title
    const title = $("h1").first().text().trim() || $("title").text().trim().replace(" | Apple Developer Documentation", "");

    const sections: Array<{
      heading: string;
      level: number;
      content: string;
      codeExamples: Array<{ code: string; language?: string }>;
    }> = [];

    // Find main content area - Swift docs use specific structure
    // Try multiple selectors for Swift documentation
    let contentElement = $("main").first();
    if (contentElement.length === 0) {
      contentElement = $("article").first();
    }
    if (contentElement.length === 0) {
      contentElement = $(".documentation-content, .content, #content").first();
    }
    if (contentElement.length === 0) {
      contentElement = $("body");
    }

    // Extract all headings and their content
    let currentSection: {
      heading: string;
      level: number;
      content: string;
      codeExamples: Array<{ code: string; language?: string }>;
    } | null = null;

    contentElement.find("*").each((_, element) => {
      const $el = $(element);
      const tagName = element.tagName?.toLowerCase();

      // Check if it's a heading
      if (tagName && /^h[1-6]$/.test(tagName)) {
        // Save previous section if exists
        if (currentSection && (currentSection.content.trim() || currentSection.codeExamples.length > 0)) {
          sections.push(currentSection);
        }

        const heading = $el.text().trim();
        const level = parseInt(tagName.charAt(1));
        
        if (heading && level >= 2) {
          currentSection = {
            heading,
            level,
            content: "",
            codeExamples: [],
          };
        }
      } else if (currentSection) {
        // Collect content
        if (tagName === "p") {
          const text = $el.text().trim();
          if (text) {
            currentSection.content += text + "\n\n";
          }
        }

        // Extract code blocks
        if (tagName === "pre" || $el.find("pre").length > 0) {
          const $code = $el.find("code").first().length > 0 
            ? $el.find("code").first() 
            : $el;
          
          const code = $code.text().trim();
          if (code && code.length > 5) {
            // Detect language from class or parent
            const language = $code.attr("class")?.match(/language-(\w+)/)?.[1] || "swift";
            
            // Avoid duplicates
            const exists = currentSection.codeExamples.some(ex => ex.code === code);
            if (!exists) {
              currentSection.codeExamples.push({ code, language });
            }
          }
        }
      }
    });

    // Add last section
    if (currentSection && (currentSection.content.trim() || currentSection.codeExamples.length > 0)) {
      sections.push(currentSection);
    }

    return {
      title,
      sections: sections.filter(s => s.heading && s.heading.length > 0),
    };
  } catch (error) {
    console.error(`Error scraping ${url}:`, error);
    if (browser) {
      await browser.close().catch(() => {});
    }
    return null;
  }
}

// Swift documentation URL mappings - using direct page URLs
const SWIFT_DOCS_BASE = "https://docs.swift.org/swift-book/documentation/the-swift-programming-language/";

export const SWIFT_DOCS_PATHS: Record<string, string> = {
  // Basics
  "introduction-to-swift": `${SWIFT_DOCS_BASE}thebasics/`,
  "swift-data-types": `${SWIFT_DOCS_BASE}thebasics/`,
  "control-flow": `${SWIFT_DOCS_BASE}controlflow/`,
  "functions-and-enums": `${SWIFT_DOCS_BASE}functions/`,
  "object-oriented-programming": `${SWIFT_DOCS_BASE}structuresandclasses/`,
  
  // Core Concepts
  "closures": `${SWIFT_DOCS_BASE}closures/`,
  "enumerations": `${SWIFT_DOCS_BASE}enumerations/`,
  "structures-and-classes": `${SWIFT_DOCS_BASE}structuresandclasses/`,
  "properties": `${SWIFT_DOCS_BASE}properties/`,
  "methods": `${SWIFT_DOCS_BASE}methods/`,
  "subscripts": `${SWIFT_DOCS_BASE}subscripts/`,
  "inheritance": `${SWIFT_DOCS_BASE}inheritance/`,
  "initialization": `${SWIFT_DOCS_BASE}initialization/`,
  "deinitialization": `${SWIFT_DOCS_BASE}deinitialization/`,
  "optional-chaining": `${SWIFT_DOCS_BASE}optionalchaining/`,
  "error-handling": `${SWIFT_DOCS_BASE}errorhandling/`,
  "concurrency": `${SWIFT_DOCS_BASE}concurrency/`,
  "macros": `${SWIFT_DOCS_BASE}macros/`,
  "type-casting": `${SWIFT_DOCS_BASE}typecasting/`,
  "nested-types": `${SWIFT_DOCS_BASE}nestedtypes/`,
  "extensions": `${SWIFT_DOCS_BASE}extensions/`,
  "protocols": `${SWIFT_DOCS_BASE}protocols/`,
  "generics": `${SWIFT_DOCS_BASE}generics/`,
  "opaque-and-boxed-protocol-types": `${SWIFT_DOCS_BASE}opaquetypes/`,
  "automatic-reference-counting": `${SWIFT_DOCS_BASE}automaticreferencecounting/`,
  "memory-safety": `${SWIFT_DOCS_BASE}memorysafety/`,
  "access-control": `${SWIFT_DOCS_BASE}accesscontrol/`,
  "advanced-operators": `${SWIFT_DOCS_BASE}advancedoperators/`,
};

// Alternative: Try the actual Swift book pages
export const SWIFT_BOOK_PATHS: Record<string, string[]> = {
  "introduction-to-swift": [
    "https://docs.swift.org/swift-book/documentation/the-swift-programming-language/thebasics/",
    "https://docs.swift.org/swift-book/documentation/the-swift-programming-language/thebasics/#Constants-and-Variables",
  ],
  "swift-data-types": [
    "https://docs.swift.org/swift-book/documentation/the-swift-programming-language/thebasics/#Collection-Types",
    "https://docs.swift.org/swift-book/documentation/the-swift-programming-language/thebasics/#Strings-and-Characters",
  ],
  "control-flow": [
    "https://docs.swift.org/swift-book/documentation/the-swift-programming-language/controlflow/",
  ],
  "functions-and-enums": [
    "https://docs.swift.org/swift-book/documentation/the-swift-programming-language/functions/",
    "https://docs.swift.org/swift-book/documentation/the-swift-programming-language/enumerations/",
  ],
  "object-oriented-programming": [
    "https://docs.swift.org/swift-book/documentation/the-swift-programming-language/structuresandclasses/",
  ],
};

export async function getSwiftDocsContent(lessonKey: string): Promise<ScrapedContent | null> {
  const url = SWIFT_DOCS_PATHS[lessonKey];
  if (!url) return null;
  
  return scrapeSwiftDocs(url);
}

