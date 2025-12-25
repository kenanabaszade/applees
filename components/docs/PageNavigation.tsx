import Link from "next/link";

export function PageNavigation({
  previous,
  next,
}: {
  previous?: { title: string; href: string };
  next?: { title: string; href: string };
}) {
  return (
    <nav
      className="mt-16 pt-8 border-t border-border flex items-center justify-between"
      aria-label="Page navigation"
    >
      {previous ? (
        <Link
          href={previous.href}
          className="group flex items-center gap-2 text-fg-muted hover:text-fg transition-colors"
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="transition-transform group-hover:-translate-x-1"
          >
            <path
              d="M10 12L6 8L10 4"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="flex flex-col">
            <span className="text-xs text-fg-subtle">Previous</span>
            <span className="text-sm font-medium">{previous.title}</span>
          </div>
        </Link>
      ) : (
        <div />
      )}

      {next ? (
        <Link
          href={next.href}
          className="group flex items-center gap-2 text-fg-muted hover:text-fg transition-colors ml-auto"
        >
          <div className="flex flex-col items-end">
            <span className="text-xs text-fg-subtle">Next</span>
            <span className="text-sm font-medium">{next.title}</span>
          </div>
          <svg
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="none"
            className="transition-transform group-hover:translate-x-1"
          >
            <path
              d="M6 4L10 8L6 12"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </Link>
      ) : (
        <div />
      )}
    </nav>
  );
}

