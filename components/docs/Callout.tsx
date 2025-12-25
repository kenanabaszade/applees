import type { ReactNode } from "react";

export function Callout({
  kind = "info",
  title,
  children,
}: {
  kind?: "info" | "warning" | "note";
  title?: string;
  children: ReactNode;
}) {
  const styles = {
    info: {
      border: "border-accent/30",
      bg: "bg-accent-light",
      icon: "⚡",
      iconBg: "bg-accent",
    },
    warning: {
      border: "border-warning/30",
      bg: "bg-warning-bg",
      icon: "⚠",
      iconBg: "bg-warning",
    },
    note: {
      border: "border-accent/30",
      bg: "bg-accent-light",
      icon: "⚡",
      iconBg: "bg-accent",
    },
  };

  const style = styles[kind];

  return (
    <aside
      className={`my-6 rounded-lg border ${style.border} ${style.bg} p-4`}
      role="note"
      aria-label={title || `${kind} callout`}
    >
      <div className="flex items-start gap-3">
        <div
          className={`flex h-5 w-5 shrink-0 items-center justify-center rounded ${style.iconBg} text-xs font-semibold text-white`}
          aria-hidden="true"
        >
          {style.icon}
        </div>
        <div className="min-w-0 flex-1 space-y-1.5">
          {title && (
            <div className="text-sm font-semibold text-fg">{title}</div>
          )}
          <div className="text-sm leading-relaxed text-fg-muted">{children}</div>
        </div>
      </div>
    </aside>
  );
}
