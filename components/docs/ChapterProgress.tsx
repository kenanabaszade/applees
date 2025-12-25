export function ChapterProgress({ value }: { value: number }) {
  const v = Number.isFinite(value) ? Math.max(0, Math.min(1, value)) : 0;
  return (
    <div className="relative h-1 w-full overflow-hidden rounded-full bg-surface-elevated">
      <div
        className="h-full rounded-full bg-accent transition-all duration-300"
        style={{ width: `${v * 100}%` }}
        aria-valuenow={v * 100}
        aria-valuemin={0}
        aria-valuemax={100}
        role="progressbar"
      />
    </div>
  );
}
