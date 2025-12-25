import { ChapterProgress } from "./ChapterProgress";

export function DocHeader({
  title,
  subtitle,
  chapter,
  readingTime,
  progress,
}: {
  title: string;
  subtitle: string;
  chapter?: string;
  readingTime?: string;
  progress?: number;
}) {
  return (
    <header className="mb-12 space-y-6 pb-8 border-b border-border">
      {(chapter || readingTime) && (
        <div className="flex flex-wrap items-center gap-2">
          {chapter && (
            <span className="inline-flex items-center rounded border border-border bg-surface-elevated px-2.5 py-1 font-mono text-xs text-fg-muted">
              {chapter}
            </span>
          )}
          {readingTime && (
            <span className="inline-flex items-center rounded border border-border bg-surface-elevated px-2.5 py-1 text-xs text-fg-muted">
              {readingTime}
            </span>
          )}
        </div>
      )}

      <div className="space-y-3">
        <h1 className="text-4xl font-semibold leading-tight text-fg">
          {title}
        </h1>
        <p className="text-lg leading-relaxed text-fg-muted max-w-3xl">
          {subtitle}
        </p>
      </div>

      {typeof progress === "number" && (
        <div className="pt-2">
          <ChapterProgress value={progress} />
        </div>
      )}
    </header>
  );
}
