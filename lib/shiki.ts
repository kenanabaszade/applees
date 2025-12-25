import { codeToHtml } from "shiki";

export async function highlightCode({
  code,
  lang,
  theme = "dark",
}: {
  code: string;
  lang: string;
  theme?: "light" | "dark";
}) {
  // Use ayu-dark for dark mode and min-light for light mode
  const shikiTheme = theme === "light" ? "min-light" : "ayu-dark";
  
  return await codeToHtml(code, {
    lang: lang || "swift",
    theme: shikiTheme,
  });
}
