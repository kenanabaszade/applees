import type { ReactNode } from "react";

interface ComparisonRow {
  feature: string;
  option1: ReactNode;
  option2?: ReactNode;
  option3?: ReactNode;
}

export function ComparisonTable({
  title,
  headers,
  rows,
  caption,
}: {
  title?: string;
  headers: string[];
  rows: ComparisonRow[];
  caption?: string;
}) {
  return (
    <section className="my-5">
      {title && (
        <h3 className="text-lg font-semibold text-fg mb-3">{title}</h3>
      )}
      <div className="overflow-x-auto rounded-lg border border-border bg-surface-elevated">
        <table className="w-full border-collapse">
          <thead>
            <tr className="border-b border-border bg-surface">
              <th className="px-3 py-2 text-left text-sm font-semibold text-fg">
                Feature
              </th>
              {headers.map((header, idx) => (
                <th
                  key={idx}
                  className="px-3 py-2 text-left text-sm font-semibold text-fg"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr
                key={idx}
                className="border-b border-border last:border-b-0 hover:bg-surface-hover transition-colors"
              >
                <td className="px-3 py-2.5 text-sm font-medium text-fg">
                  {row.feature}
                </td>
                <td className="px-3 py-2.5 text-sm text-fg-muted">
                  {row.option1}
                </td>
                {row.option2 && (
                  <td className="px-3 py-2.5 text-sm text-fg-muted">
                    {row.option2}
                  </td>
                )}
                {row.option3 && (
                  <td className="px-3 py-2.5 text-sm text-fg-muted">
                    {row.option3}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        {caption && (
          <div className="px-3 py-2 text-xs text-fg-subtle border-t border-border bg-surface">
            {caption}
          </div>
        )}
      </div>
    </section>
  );
}

