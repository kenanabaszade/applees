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
  // Use one-dark-pro theme - we'll override colors with CSS
  const shikiTheme = theme === "light" ? "github-light" : "one-dark-pro";
  
  return await codeToHtml(code, {
    lang,
    theme: shikiTheme,
  });
}
