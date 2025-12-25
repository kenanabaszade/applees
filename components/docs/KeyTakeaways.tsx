export function KeyTakeaways({
  title = "Key takeaways",
  items,
  mentalModel,
}: {
  title?: string;
  items: string[];
  mentalModel?: string;
}) {
  return (
    <section
      className="my-8 rounded-lg border border-border bg-surface-elevated p-5"
      aria-labelledby="takeaways-title"
    >
      <div className="mb-4 flex items-center gap-2">
        <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
        <h2 id="takeaways-title" className="text-base font-semibold text-fg">
          {title}
        </h2>
      </div>

      <ul className="space-y-2.5 text-sm leading-relaxed text-fg-muted">
        {items.map((it, idx) => (
          <li key={idx} className="flex gap-3">
            <span
              className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-accent"
              aria-hidden="true"
            />
            <span>{it}</span>
          </li>
        ))}
      </ul>

      {mentalModel && (
        <div className="mt-5 rounded border border-border bg-surface p-4 text-sm leading-relaxed text-fg-muted">
          <span className="font-semibold text-fg">Mental model:</span> {mentalModel}
        </div>
      )}
    </section>
  );
}
