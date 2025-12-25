"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo, useState, useEffect } from "react";
import { NAV } from "@/lib/nav";
import { useTheme } from "@/lib/theme";

function cx(...parts: Array<string | false | null | undefined>) {
  return parts.filter(Boolean).join(" ");
}

export function Sidebar() {
  const pathname = usePathname();
  const [collapsed, setCollapsed] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Set<string>>(
    new Set(["iOS Fundamentals", "Swift Language"])
  );
  const { theme, toggleTheme } = useTheme();
  const categories = useMemo(() => NAV, []);

  useEffect(() => {
    const saved = localStorage.getItem("sidebar-collapsed");
    if (saved === "true") setCollapsed(true);
  }, []);
  
  const handleToggle = () => {
    const newState = !collapsed;
    setCollapsed(newState);
    localStorage.setItem("sidebar-collapsed", String(newState));
    window.dispatchEvent(new CustomEvent("sidebar-toggle"));
  };

  const toggleSection = (title: string) => {
    setExpandedSections((prev) => {
      const next = new Set(prev);
      if (next.has(title)) {
        next.delete(title);
      } else {
        next.add(title);
      }
      return next;
    });
  };

  return (
    <aside
      className={cx(
        "fixed inset-y-0 left-0 z-50 hidden lg:flex flex-col bg-surface border-r border-border transition-all duration-300",
        collapsed ? "w-[64px]" : "w-[260px]",
      )}
      aria-label="Main navigation"
      style={{paddingTop: '30px'}}
    >
      {/* Top Bar with Icons */}
      <div className="flex h-14 items-center border-b border-border shrink-0 px-3" style={{paddingBottom: '30px'}}>
        {collapsed ? (
          <div className="flex flex-col items-center w-full gap-2 py-2">
            <button
              onClick={handleToggle}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-fg-muted hover:bg-surface-hover hover:text-fg transition-colors"
              title="Expand sidebar"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M3 4h10M3 8h10M3 12h10"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
            <button
              onClick={toggleTheme}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-fg-muted hover:bg-surface-hover hover:text-fg transition-colors"
              title={theme === "dark" ? "Light mode" : "Dark mode"}
            >
              {theme === "dark" ? (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M8 2C8 2 10 4.5 10 8C10 11.5 8 14 8 14M8 2C8 2 6 4.5 6 8C6 11.5 8 14 8 14M8 2V1M8 14V15M2 8H1M14 8H15"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.5" />
                </svg>
              ) : (
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M8 2V4M8 12V14M2 8H4M12 8H14M3.757 3.757L5.172 5.172M10.828 10.828L12.243 12.243M3.757 12.243L5.172 10.828M10.828 5.172L12.243 3.757M11 8C11 9.65685 9.65685 11 8 11C6.34315 11 5 9.65685 5 8C5 6.34315 6.34315 5 8 5C9.65685 5 11 6.34315 11 8Z"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              )}
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between w-full px-3 gap-2">
            <button
              onClick={handleToggle}
              className="flex h-8 w-8 items-center justify-center rounded-lg text-fg-muted hover:bg-surface-hover hover:text-fg transition-colors"
              title="Collapse sidebar"
            >
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path
                  d="M3 4h10M3 8h10M3 12h10"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                />
              </svg>
            </button>
            <div className="flex items-center gap-1 flex-1 justify-end">
              <button
                onClick={toggleTheme}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-fg-muted hover:bg-surface-hover hover:text-fg transition-colors"
                title={theme === "dark" ? "Light mode" : "Dark mode"}
              >
                {theme === "dark" ? (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M8 2C8 2 10 4.5 10 8C10 11.5 8 14 8 14M8 2C8 2 6 4.5 6 8C6 11.5 8 14 8 14M8 2V1M8 14V15M2 8H1M14 8H15"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                    <circle cx="8" cy="8" r="3" stroke="currentColor" strokeWidth="1.5" />
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path
                      d="M8 2V4M8 12V14M2 8H4M12 8H14M3.757 3.757L5.172 5.172M10.828 10.828L12.243 12.243M3.757 12.243L5.172 10.828M10.828 5.172L12.243 3.757M11 8C11 9.65685 9.65685 11 8 11C6.34315 11 5 9.65685 5 8C5 6.34315 6.34315 5 8 5C9.65685 5 11 6.34315 11 8Z"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                    />
                  </svg>
                )}
              </button>
              <button
                onClick={handleToggle}
                className="flex h-8 w-8 items-center justify-center rounded-lg text-fg-muted hover:bg-surface-hover hover:text-fg transition-colors"
                title="Collapse sidebar"
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M10 4L6 8L10 12"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Book Title */}
      {!collapsed && (
        <div className="px-4 py-2.5 border-b border-border">
          <div className="text-xs font-semibold text-fg">iOS Fundamentals Intro</div>
        </div>
      )}

      {/* Navigation */}
      <nav className="flex-1 overflow-y-auto overflow-x-hidden px-2 py-3">
        {categories.map((cat) => {
          const isExpanded = expandedSections.has(cat.title);
          const hasContent = cat.chapters.length > 0;

          return (
            <div key={cat.title} className="mb-2">
              {!collapsed ? (
                <>
                  <button
                    onClick={() => hasContent && toggleSection(cat.title)}
                    className="w-full flex items-center justify-between px-2 py-1.5 text-[10px] font-semibold uppercase tracking-wider text-fg-subtle hover:text-fg transition-colors rounded"
                  >
                    <span>{cat.title}</span>
                    {hasContent && (
                      <svg
                        width="10"
                        height="10"
                        viewBox="0 0 16 16"
                        fill="none"
                        className={cx(
                          "transition-transform duration-200",
                          isExpanded ? "rotate-180" : ""
                        )}
                      >
                        <path
                          d="M4 6L8 10L12 6"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    )}
                  </button>

                  {isExpanded && hasContent && (
                    <div className="mt-1 space-y-0.5 pl-1">
                      {cat.chapters.map((ch) => (
                        <div key={ch.chapter} className="space-y-0.5">
                          {ch.pages.map((p) => {
                            const active =
                              pathname === p.href ||
                              (pathname === "/" && p.href === "/");
                            return (
                              <Link
                                key={p.href}
                                href={p.href}
                                className={cx(
                                  "relative flex items-center gap-2.5 px-2.5 py-2 text-sm rounded transition-all",
                                  active
                                    ? "bg-accent text-white font-medium"
                                    : "text-fg-muted hover:text-fg hover:bg-surface-hover"
                                )}
                              >
                                {active && (
                                  <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-accent-hover rounded-r" />
                                )}
                                <span className={cx(
                                  "font-mono text-[10px] tabular-nums min-w-[32px] shrink-0",
                                  active ? "text-white/70" : "text-fg-subtle"
                                )}>
                                  {ch.chapter}
                                </span>
                                <span className="flex-1 truncate">{p.title}</span>
                              </Link>
                            );
                          })}
                        </div>
                      ))}
                    </div>
                  )}

                  {cat.chapters.length === 0 && (
                    <div className="px-2 py-1 text-xs text-fg-subtle italic">
                      Coming soon
                    </div>
                  )}
                </>
              ) : (
                <div className="flex flex-col items-center gap-1.5">
                  {cat.chapters.map((ch) =>
                    ch.pages.map((p) => {
                      const active =
                        pathname === p.href ||
                        (pathname === "/" && p.href === "/");
                      return (
                        <Link
                          key={p.href}
                          href={p.href}
                          className={cx(
                            "flex h-10 w-10 items-center justify-center rounded-lg transition-all relative group",
                            active
                              ? "bg-accent text-white"
                              : "text-fg-muted hover:bg-surface-hover hover:text-fg"
                          )}
                          title={p.title}
                        >
                          <span className="text-[10px] font-mono font-medium">{ch.chapter}</span>
                          {active && (
                            <div className="absolute -right-0.5 top-1/2 -translate-y-1/2 w-0.5 h-6 bg-accent rounded-l" />
                          )}
                        </Link>
                      );
                    })
                  )}
                </div>
              )}
            </div>
          );
        })}
      </nav>
    </aside>
  );
}
