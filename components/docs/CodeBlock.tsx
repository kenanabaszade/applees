import { highlightCode } from "@/lib/shiki";
import { CopyButton } from "./CopyButton";

function normalizeLang(lang?: string) {
  const l = (lang || "").toLowerCase();
  if (!l) return "swift";
  if (l === "js") return "javascript";
  if (l === "ts") return "typescript";
  return l;
}

function addLineNumbers(html: string) {
  const lines = html.split("\n");
  return lines
    .map((line, i) => {
      if (line.includes("</code>") || line.includes("<pre")) return line;
      return line.replace(
        /^(\s*)(.*)$/,
        (_m, ws, content) =>
          `${ws}<span class="code-line" data-line="${i + 1}">${content}</span>`,
      );
    })
    .join("\n");
}

export async function CodeBlock({
  code,
  lang,
  filename,
  showLineNumbers = false,
  theme,
}: {
  code: string;
  lang?: string;
  filename?: string;
  showLineNumbers?: boolean;
  theme?: "light" | "dark";
}) {
  const language = normalizeLang(lang);
  // Default to dark theme if not provided
  const codeTheme = theme || "dark";
  let html = await highlightCode({ code, lang: language, theme: codeTheme });
  
  // Post-processing to match EXACT Xcode-style syntax highlighting from the image
  // Based on the image description:
  // - Keywords (struct, var, mutating, func, return, typealias, subscript): MAGENTA
  // - Types/Classes (IntStack, Container): LIGHT BLUE
  // - Built-in types (Int): MAGENTA (same as keywords)
  // - Functions/Variables (items, push, pop, append, count, i, self): LIGHT BLUE
  // - Comments: MUTED GRAY (not green!)
  // - Strings: Orange
  // - Default: White
  
  // Process in order: strings first, then comments, then functions/variables, then types, then keywords
  
  // 1. Strings: Orange/brown #CE9178 (must be first to avoid being overwritten)
  html = html.replace(/color:\s*#d7ba7d/gi, 'color: #CE9178'); // Beige -> Orange for strings
  html = html.replace(/color:\s*rgb\(215,\s*186,\s*125\)/gi, 'color: #CE9178'); // Beige -> Orange
  html = html.replace(/color:\s*#ce9178/gi, 'color: #CE9178'); // Ensure consistency
  
  // 2. Comments: Muted gray #808080 or #6A6A6A (NOT green!)
  html = html.replace(/color:\s*#6a9955/gi, 'color: #808080'); // Green comments -> Muted gray
  html = html.replace(/color:\s*rgb\(106,\s*153,\s*85\)/gi, 'color: #808080'); // Green -> Gray
  html = html.replace(/color:\s*#808080/gi, 'color: #808080'); // Ensure consistency
  
  // 3. Function names and Variables/Properties: push, pop, append, items, item, self, i, count
  // Light blue: #9CDCFE or #60A5FA (same as types)
  html = html.replace(/color:\s*#dcdcaa/gi, 'color: #9CDCFE'); // Yellow functions -> Light blue
  html = html.replace(/color:\s*#fde047/gi, 'color: #9CDCFE'); // Yellow -> Light blue
  html = html.replace(/color:\s*#facc15/gi, 'color: #9CDCFE'); // Gold -> Light blue
  html = html.replace(/color:\s*#d4d4d4/gi, 'color: #9CDCFE'); // Light gray -> Light blue (for variables)
  html = html.replace(/color:\s*rgb\(220,\s*220,\s*170\)/gi, 'color: #9CDCFE');
  html = html.replace(/color:\s*rgb\(250,\s*204,\s*21\)/gi, 'color: #9CDCFE');
  html = html.replace(/color:\s*rgb\(212,\s*212,\s*212\)/gi, 'color: #9CDCFE');
  
  // 4. Types/Classes: IntStack, Container (but NOT built-in types like Int)
  // Light blue: #9CDCFE (same as functions/variables)
  html = html.replace(/color:\s*#4ec9b0/gi, 'color: #9CDCFE'); // Cyan types -> Light blue
  html = html.replace(/color:\s*#2dd4bf/gi, 'color: #9CDCFE'); // Teal -> Light blue
  html = html.replace(/color:\s*#5eead4/gi, 'color: #9CDCFE'); // Light cyan -> Light blue
  html = html.replace(/color:\s*rgb\(78,\s*201,\s*176\)/gi, 'color: #9CDCFE');
  html = html.replace(/color:\s*rgb\(45,\s*212,\s*191\)/gi, 'color: #9CDCFE');
  html = html.replace(/color:\s*rgb\(94,\s*234,\s*212\)/gi, 'color: #9CDCFE');
  
  // 5. Keywords: struct, var, mutating, func, return, typealias, subscript, let, if, for, while, etc.
  // MAGENTA: #C586C0 (this is the key difference - keywords are magenta, not blue!)
  html = html.replace(/color:\s*#c586c0/gi, 'color: #C586C0'); // Keep magenta for keywords
  html = html.replace(/color:\s*#d4a5ff/gi, 'color: #C586C0'); // Purple -> Magenta
  html = html.replace(/color:\s*#60a5fa/gi, 'color: #C586C0'); // Blue keywords -> Magenta
  html = html.replace(/color:\s*#569cd6/gi, 'color: #C586C0'); // Blue -> Magenta
  html = html.replace(/color:\s*#4fc1ff/gi, 'color: #C586C0'); // Another blue -> Magenta
  html = html.replace(/color:\s*#7dd3fc/gi, 'color: #C586C0'); // Light blue -> Magenta
  html = html.replace(/color:\s*rgb\(197,\s*134,\s*192\)/gi, 'color: #C586C0');
  html = html.replace(/color:\s*rgb\(212,\s*165,\s*255\)/gi, 'color: #C586C0');
  html = html.replace(/color:\s*rgb\(96,\s*165,\s*250\)/gi, 'color: #C586C0');
  html = html.replace(/color:\s*rgb\(86,\s*156,\s*214\)/gi, 'color: #C586C0');
  html = html.replace(/color:\s*rgb\(79,\s*193,\s*255\)/gi, 'color: #C586C0');
  html = html.replace(/color:\s*rgb\(125,\s*211,\s*252\)/gi, 'color: #C586C0');
  
  // 6. Built-in types (Int, String, Bool, etc.) should also be magenta like keywords
  // This is handled by Shiki's tokenization, but we ensure Int is magenta
  
  // 7. Default text, operators, punctuation, numbers: White #FFFFFF
  html = html.replace(/color:\s*#cccccc/gi, 'color: #FFFFFF');
  html = html.replace(/color:\s*#e0e0e0/gi, 'color: #FFFFFF');
  html = html.replace(/color:\s*rgb\(204,\s*204,\s*204\)/gi, 'color: #FFFFFF');
  html = html.replace(/color:\s*rgb\(224,\s*224,\s*224\)/gi, 'color: #FFFFFF');
  
  // 8. Ensure code element has white as default
  html = html.replace(/<code([^>]*?)>/gi, (match, attrs) => {
    if (!attrs.includes('style=')) {
      return `<code${attrs} style="color: #FFFFFF;">`;
    }
    return match;
  });
  
  if (showLineNumbers) html = addLineNumbers(html);

        return (
          <figure
            className="my-4 overflow-hidden rounded-lg border border-code-border"
            style={{
              background: '#1e1e1e', // Very dark gray/near-black background like Xcode
            }}
            aria-label={`Code example${filename ? `: ${filename}` : ` in ${language}`}`}
          >
            <div
              className={[
                "relative overflow-x-auto p-3 text-[14px] leading-relaxed",
                " [&_.shiki]:bg-transparent [&_.shiki]:m-0",
                " [&_pre]:bg-transparent [&_pre]:m-0 [&_pre]:p-0 [&_pre]:leading-relaxed",
                " [&_code]:text-[14px] [&_code]:leading-relaxed [&_code]:text-white [&_code]:block",
          showLineNumbers
            ? " [&_.code-line]:relative [&_.code-line]:block [&_.code-line]:pl-12 [&_.code-line]:before:absolute [&_.code-line]:before:left-0 [&_.code-line]:before:w-10 [&_.code-line]:before:text-right [&_.code-line]:before:pr-3 [&_.code-line]:before:text-fg-subtle [&_.code-line]:before:content-[attr(data-line)] [&_.code-line]:before:text-xs [&_.code-line]:before:select-none"
            : "",
        ].join("")}
        style={{
          fontFamily: 'ui-monospace, SFMono-Regular, "SF Mono", Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace',
        }}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </figure>
  );
}
