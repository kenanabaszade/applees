import type { ReactNode } from "react";

export function DiagramCard({
  title,
  caption,
  children,
}: {
  title: string;
  caption?: string;
  children: ReactNode;
}) {
  return (
    <section
      className="my-8 rounded-lg border border-border bg-surface-elevated overflow-hidden"
      aria-labelledby="diagram-title"
    >
      <div className="border-b border-border bg-surface-elevated px-5 py-3">
        <div id="diagram-title" className="text-base font-semibold text-fg">
          {title}
        </div>
        {caption && (
          <div className="mt-1.5 text-sm leading-relaxed text-fg-muted">{caption}</div>
        )}
      </div>
        
      <div className="relative w-full overflow-hidden p-6 bg-gradient-to-br from-[#1a1b2e] to-[#25293a]">
        <div className="relative w-full flex items-center justify-center">{children}</div>
      </div>
    </section>
  );
}
