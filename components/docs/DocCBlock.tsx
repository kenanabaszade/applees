import { CodeBlock } from "./CodeBlock";
import { Callout } from "./Callout";
import { extractDocCComments, formatDocCComment, type DocCComment } from "@/lib/docc-parser";

interface DocCBlockProps {
  code: string;
  lang?: string;
  filename?: string;
  showLineNumbers?: boolean;
  showDocumentation?: boolean;
  theme?: "light" | "dark";
}

/**
 * Code block component that displays DocC-style documentation
 * Extracts and displays documentation comments from Swift code
 */
export async function DocCBlock({
  code,
  lang = "swift",
  filename,
  showLineNumbers = false,
  showDocumentation = true,
  theme,
}: DocCBlockProps) {
  const comments = extractDocCComments(code);
  
  // Determine card style based on content type and name patterns
  const getCardStyle = (name: string, doc: DocCComment) => {
    const nameLower = name.toLowerCase();
    const summaryLower = doc.summary?.toLowerCase() || "";
    
    // Function detection: has parameters, returns, or function-like name
    if (doc.parameters && doc.parameters.length > 0 || doc.returns || 
        nameLower.includes("func") || summaryLower.includes("function")) {
      return {
        border: "border-[#60A5FA]/50",
        bg: "bg-[#1e3a5f]/25",
        accent: "text-[#60A5FA]",
        badge: "Function",
        badgeBg: "bg-[#60A5FA]/25",
        icon: "⚡",
      };
    }
    
    // Type/Class detection
    if (summaryLower.includes("type") || summaryLower.includes("class") || 
        summaryLower.includes("struct") || summaryLower.includes("enum") ||
        name.match(/^[A-Z]/)) {
      return {
        border: "border-[#9CDCFE]/50",
        bg: "bg-[#1e3a5f]/20",
        accent: "text-[#9CDCFE]",
        badge: "Type",
        badgeBg: "bg-[#9CDCFE]/25",
        icon: "📦",
      };
    }
    
    // Variable/Property detection (lowercase, no parameters)
    if (name.match(/^[a-z]/) && !doc.parameters && !doc.returns) {
      // Check for specific types
      if (summaryLower.includes("string") || summaryLower.includes("text")) {
        return {
          border: "border-[#CE9178]/50",
          bg: "bg-[#4a2e1f]/20",
          accent: "text-[#CE9178]",
          badge: "String",
          badgeBg: "bg-[#CE9178]/25",
          icon: "📝",
        };
      }
      if (summaryLower.includes("int") || summaryLower.includes("number") || summaryLower.includes("integer")) {
        return {
          border: "border-[#4EC9B0]/50",
          bg: "bg-[#1e3a3a]/20",
          accent: "text-[#4EC9B0]",
          badge: "Number",
          badgeBg: "bg-[#4EC9B0]/25",
          icon: "🔢",
        };
      }
      if (summaryLower.includes("bool") || summaryLower.includes("boolean") || summaryLower.includes("true") || summaryLower.includes("false")) {
        return {
          border: "border-[#C586C0]/50",
          bg: "bg-[#3d2a4a]/25",
          accent: "text-[#C586C0]",
          badge: "Boolean",
          badgeBg: "bg-[#C586C0]/25",
          icon: "✓",
        };
      }
      // Generic variable
      return {
        border: "border-[#C586C0]/50",
        bg: "bg-[#3d2a4a]/20",
        accent: "text-[#C586C0]",
        badge: "Variable",
        badgeBg: "bg-[#C586C0]/25",
        icon: "📌",
      };
    }
    
    // Default: documentation/example
    return {
      border: "border-[#a855f7]/50",
      bg: "bg-[#2a1b3e]/25",
      accent: "text-[#a855f7]",
      badge: "Documentation",
      badgeBg: "bg-[#a855f7]/25",
      icon: "📚",
    };
  };
  
  return (
    <div className="space-y-4">
      {/* Display documentation comments as individual cards */}
      {showDocumentation && comments.size > 0 && (
        <div className="grid grid-cols-1 gap-3">
          {Array.from(comments.entries()).map(([name, doc]) => {
            const style = getCardStyle(name, doc);
            return (
              <div
                key={name}
                className={`rounded-lg border-2 ${style.border} ${style.bg} p-3.5 shadow-sm hover:shadow-md transition-all`}
              >
                {/* Header with name and badge */}
                <div className="flex items-center justify-between mb-2.5">
                  <div className="flex items-center gap-2">
                    <span className={`text-lg ${style.accent}`} aria-hidden="true">
                      {style.icon}
                    </span>
                    <h4 className={`text-base font-bold ${style.accent} font-mono`}>
                      {name}
                    </h4>
                  </div>
                  <span className={`text-[10px] font-semibold px-2 py-1 rounded-md ${style.badgeBg} ${style.accent} uppercase tracking-wide border ${style.border}`}>
                    {style.badge}
                  </span>
                </div>
                
                {/* Content */}
                <div className="text-sm text-fg space-y-2">
                  {doc.summary && (
                    <p className="leading-relaxed">{doc.summary}</p>
                  )}
                  
                  {doc.parameters && doc.parameters.length > 0 && (
                    <div className="mt-2 pt-2 border-t border-border/50">
                      <p className="font-semibold text-fg mb-1.5 text-xs uppercase tracking-wide">Parameters</p>
                      <ul className="space-y-1.5">
                        {doc.parameters.map((param, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <code className={`text-xs font-mono ${style.accent} bg-surface px-1.5 py-0.5 rounded`}>
                              {param.name}
                            </code>
                            <span className="text-xs text-fg-muted flex-1">{param.description}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                  
                  {doc.returns && (
                    <div className="mt-2 pt-2 border-t border-border/50">
                      <p className="font-semibold text-fg mb-1 text-xs uppercase tracking-wide">Returns</p>
                      <p className="text-xs text-fg-muted">{doc.returns}</p>
                    </div>
                  )}
                  
                  {doc.throws && (
                    <div className="mt-2 pt-2 border-t border-border/50">
                      <p className="font-semibold text-warning mb-1 text-xs uppercase tracking-wide">Throws</p>
                      <p className="text-xs text-fg-muted">{doc.throws}</p>
                    </div>
                  )}
                  
                  {doc.discussion && (
                    <div className="mt-2 pt-2 border-t border-border/50">
                      <p className="text-xs text-fg-muted leading-relaxed">{doc.discussion}</p>
                    </div>
                  )}
                  
                  {/* Inline notes/warnings - more compact */}
                  {doc.note && doc.note.map((note, idx) => (
                    <div key={idx} className="mt-2 rounded border border-warning/30 bg-warning-bg/50 p-2">
                      <p className="text-[10px] font-semibold text-warning mb-0.5">Note</p>
                      <p className="text-xs text-fg leading-relaxed">{note}</p>
                    </div>
                  ))}
                  
                  {doc.warning && doc.warning.map((warning, idx) => (
                    <div key={idx} className="mt-2 rounded border border-warning/40 bg-warning-bg p-2">
                      <p className="text-[10px] font-semibold text-warning mb-0.5">⚠ Warning</p>
                      <p className="text-xs text-fg leading-relaxed">{warning}</p>
                    </div>
                  ))}
                  
                  {doc.important && doc.important.map((important, idx) => (
                    <div key={idx} className="mt-2 rounded border border-warning/40 bg-warning-bg p-2">
                      <p className="text-[10px] font-semibold text-warning mb-0.5">⚠ Important</p>
                      <p className="text-xs text-fg leading-relaxed">{important}</p>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
      
      {/* Display code block */}
      <CodeBlock
        code={code}
        lang={lang}
        filename={filename}
        showLineNumbers={showLineNumbers}
        theme={theme}
      />
    </div>
  );
}

