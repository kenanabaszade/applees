import type { MDXComponents } from "mdx/types";
import { Callout } from "@/components/docs/Callout";
import { CompareBlock } from "@/components/docs/CompareBlock";
import { DiagramCard } from "@/components/docs/DiagramCard";
import { KeyTakeaways } from "@/components/docs/KeyTakeaways";
import { CodeBlock } from "@/components/docs/CodeBlock";

function getText(child: unknown): string {
  if (typeof child === "string") return child;
  if (Array.isArray(child)) return child.map(getText).join("");
  return "";
}

function Pre(props: any) {
  const codeEl = props?.children;
  const className = codeEl?.props?.className as string | undefined;
  const lang = className?.replace(/^language-/, "") || "swift";
  const code = getText(codeEl?.props?.children ?? "");
  const meta = codeEl?.props?.meta as string | undefined;

  // Optional: ```swift filename=Foo.swift linenos
  const filename = meta?.match(/filename=([^\s]+)/)?.[1];
  const showLineNumbers = Boolean(meta?.match(/\blinenos\b/));

  return (
    <CodeBlock
      code={code}
      lang={lang}
      filename={filename}
      showLineNumbers={showLineNumbers}
    />
  );
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    ...components,
    pre: Pre as any,
    Callout,
    CompareBlock,
    DiagramCard,
    KeyTakeaways,
  };
}


