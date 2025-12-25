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
}: {
  code: string;
  lang?: string;
  filename?: string;
  showLineNumbers?: boolean;
}) {
  const language = normalizeLang(lang);
  let html = await highlightCode({ code, lang: language, theme: "dark" });
  
  // Post-processing to match the exact color scheme from the image
  // Keywords: Light blue (#7dd3fc or #60a5fa)
  // Types/Classes: Light cyan/teal (#5eead4 or #2dd4bf)
  // Functions/Variables: Light yellow/gold (#fde047 or #facc15)
  // Operators/Punctuation: White (#ffffff)
  // Numbers: Light blue/cyan
  
  // 1. Keywords (light blue): abstract, class, extends, const, if, return, for, let, this, super
  html = html.replace(/color:\s*#c586c0/gi, 'color: #7dd3fc'); // Purple -> Light blue
  html = html.replace(/color:\s*#569cd6/gi, 'color: #7dd3fc'); // Blue -> Light blue
  html = html.replace(/color:\s*#d4a5ff/gi, 'color: #7dd3fc'); // Purple -> Light blue
  html = html.replace(/color:\s*rgb\(197,\s*134,\s*192\)/gi, 'color: #7dd3fc');
  html = html.replace(/color:\s*rgb\(86,\s*156,\s*214\)/gi, 'color: #7dd3fc');
  html = html.replace(/color:\s*rgb\(212,\s*165,\s*255\)/gi, 'color: #7dd3fc');
  
  // 2. Types/Classes/Constants (light cyan/teal): ShootingStrategy, Vec2, PooledItem, etc.
  html = html.replace(/color:\s*#4ec9b0/gi, 'color: #5eead4'); // Cyan -> Light cyan
  html = html.replace(/color:\s*#9cdcfe/gi, 'color: #5eead4'); // Light blue -> Light cyan
  html = html.replace(/color:\s*rgb\(78,\s*201,\s*176\)/gi, 'color: #5eead4');
  html = html.replace(/color:\s*rgb\(156,\s*220,\s*254\)/gi, 'color: #5eead4');
  
  // 3. Function names/Variables/Properties (light yellow/gold): shoot, position, lasers, etc.
  html = html.replace(/color:\s*#dcdcaa/gi, 'color: #fde047'); // Yellow -> Light yellow
  html = html.replace(/color:\s*#d4d4d4/gi, 'color: #fde047'); // Light gray -> Light yellow
  html = html.replace(/color:\s*rgb\(220,\s*220,\s*170\)/gi, 'color: #fde047');
  html = html.replace(/color:\s*rgb\(212,\s*212,\s*212\)/gi, 'color: #fde047');
  
  // 4. Strings (keep orange or adjust to match)
  html = html.replace(/color:\s*#d7ba7d/gi, 'color: #ce9178');
  html = html.replace(/color:\s*rgb\(215,\s*186,\s*125\)/gi, 'color: #ce9178');
  
  // 5. Comments (green-gray)
  html = html.replace(/color:\s*rgb\(106,\s*153,\s*85\)/gi, 'color: #6a9955');
  
  // 6. Numbers (light blue/cyan)
  // Numbers often use the same color as types
  
  // 7. Default text and operators (white)
  html = html.replace(/color:\s*#cccccc/gi, 'color: #ffffff');
  html = html.replace(/color:\s*#e0e0e0/gi, 'color: #ffffff');
  html = html.replace(/color:\s*rgb\(204,\s*204,\s*204\)/gi, 'color: #ffffff');
  html = html.replace(/color:\s*rgb\(224,\s*224,\s*224\)/gi, 'color: #ffffff');
  
  // 8. Ensure code element has white as default
  html = html.replace(/<code([^>]*?)>/gi, (match, attrs) => {
    if (!attrs.includes('style=')) {
      return `<code${attrs} style="color: #ffffff;">`;
    }
    return match;
  });
  
  if (showLineNumbers) html = addLineNumbers(html);

  return (
    <figure
      className="my-8 overflow-hidden rounded-xl border border-code-border bg-code-bg shadow-lg"
      style={{
        background: 'linear-gradient(180deg, #1e1e1e 0%, #252525 100%)',
      }}
      aria-label={`Code example${filename ? `: ${filename}` : ` in ${language}`}`}
    >
      <div
        className={[
          "relative overflow-x-auto p-6 text-sm leading-relaxed font-mono",
          " [&_.shiki]:bg-transparent [&_.shiki]:m-0",
          " [&_pre]:bg-transparent [&_pre]:m-0 [&_pre]:p-0 [&_pre]:font-mono [&_pre]:leading-relaxed",
          " [&_code]:font-mono [&_code]:text-sm [&_code]:leading-relaxed [&_code]:text-white [&_code]:block",
          showLineNumbers
            ? " [&_.code-line]:relative [&_.code-line]:block [&_.code-line]:pl-14 [&_.code-line]:before:absolute [&_.code-line]:before:left-0 [&_.code-line]:before:w-12 [&_.code-line]:before:text-right [&_.code-line]:before:pr-4 [&_.code-line]:before:text-fg-subtle [&_.code-line]:before:content-[attr(data-line)] [&_.code-line]:before:text-xs [&_.code-line]:before:font-mono [&_.code-line]:before:select-none"
            : "",
        ].join("")}
        dangerouslySetInnerHTML={{ __html: html }}
      />
    </figure>
  );
}
