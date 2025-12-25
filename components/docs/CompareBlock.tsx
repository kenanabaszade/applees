import type { ReactNode } from "react";

export function CompareBlock({
  badTitle = "Bad example",
  goodTitle = "Correct example",
  bad,
  good,
}: {
  badTitle?: string;
  goodTitle?: string;
  bad: ReactNode;
  good: ReactNode;
}) {
  return (
    <section
      className="my-8 grid gap-4 md:grid-cols-2"
      aria-label="Comparison of incorrect and correct examples"
    >
      <div className="rounded-lg border border-warning/20 bg-warning-bg p-5">
        <div className="mb-3 flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-warning" aria-hidden="true" />
          <div className="text-sm font-semibold text-fg">{badTitle}</div>
        </div>
        <div className="text-sm leading-relaxed text-fg-muted">{bad}</div>
      </div>

      <div className="rounded-lg border border-success/20 bg-success-bg p-5">
        <div className="mb-3 flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-success" aria-hidden="true" />
          <div className="text-sm font-semibold text-fg">{goodTitle}</div>
        </div>
        <div className="text-sm leading-relaxed text-fg-muted">{good}</div>
      </div>
    </section>
  );
}
