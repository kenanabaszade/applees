import Link from "next/link";

const concepts = [
  {
    title: "App Lifecycle",
    subtitle: "Scenes, state transitions, and where logic belongs",
    href: "/docs/ios-fundamentals/001-app-lifecycle",
    icon: "lifecycle",
  },
  {
    title: "ARC Memory Graph",
    subtitle: "Strong/weak references and why cycles happen",
    href: "/docs/swift-language/002-arc/retain-cycles-in-arc",
    icon: "arc",
  },
  {
    title: "Auto Layout",
    subtitle: "Constraints, priorities, and layout solving",
    href: "#",
    icon: "autolayout",
  },
  {
    title: "View Hierarchy",
    subtitle: "Parent-child relationships and rendering",
    href: "#",
    icon: "hierarchy",
  },
  {
    title: "Delegation Pattern",
    subtitle: "Communication between objects",
    href: "#",
    icon: "delegation",
  },
  {
    title: "Protocols",
    subtitle: "Contracts and polymorphism in Swift",
    href: "#",
    icon: "protocols",
  },
  {
    title: "Closures",
    subtitle: "Capturing values and escaping functions",
    href: "#",
    icon: "closures",
  },
  {
    title: "Optionals",
    subtitle: "Safe unwrapping and nil handling",
    href: "#",
    icon: "optionals",
  },
  {
    title: "Memory Management",
    subtitle: "Reference counting and weak references",
    href: "#",
    icon: "memory",
  },
];

export default function Home() {
  return (
    <div className="space-y-16 pb-16">
      {/* Hero Section */}
      <header className="space-y-4 pt-8">
        <h1 className="text-4xl lg:text-5xl font-semibold leading-tight text-fg">
          iOS Fundamentals
          <br />
          <span className="text-fg-muted">The Book</span>
        </h1>
        <p className="max-w-2xl text-lg leading-relaxed text-fg-muted">
          Calm, structured chapters that explain the mental models behind Swift,
          UIKit, SwiftUI, ARC, Auto Layout, and app architecture—using diagrams
          and precise code.
        </p>
      </header>

      {/* Concept Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {concepts.map((concept, i) => (
          <ConceptCard key={concept.title} concept={concept} index={i} />
        ))}
      </section>

      {/* Welcome Section */}
      <section className="space-y-6 pt-8 border-t border-border">
        <div className="space-y-4">
          <h2 className="text-2xl font-semibold text-fg">Welcome!</h2>
          <p className="text-base leading-relaxed text-fg-muted max-w-3xl">
            Hey, thanks for stopping by! 👋 This book will help you build and express your ideas more clearly both in code and in words with confidence as an engineer.
          </p>
        </div>

        <div className="space-y-6 pt-4">
          <h3 className="text-xl font-semibold text-fg">Who is This Book For?</h3>

          <div className="rounded-lg border border-border bg-surface-elevated p-5">
            <h4 className="text-lg font-semibold text-fg mb-2">Junior Engineers</h4>
            <p className="text-sm leading-relaxed text-fg-muted">
              When you are just starting out, you don't know what you don't know. This book gives you a{" "}
              <span className="text-accent font-medium">curated list of concepts</span> that I personally found useful to know. And it explains them in a unified way, with{" "}
              <span className="text-accent font-medium">very practical examples</span>, and as little theory as possible.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

function ConceptCard({ concept, index }: { concept: typeof concepts[0]; index: number }) {
  return (
    <Link
      href={concept.href}
      className="group relative overflow-hidden rounded-lg border border-border bg-surface-elevated p-5 transition-all hover:border-border-strong hover:bg-surface-hover"
    >
      <div className="space-y-3">
        {/* Icon/Diagram */}
        <div className="h-24 w-full rounded border border-border/50 bg-code-bg flex items-center justify-center">
          <ConceptDiagram type={concept.icon} />
        </div>

        {/* Content */}
        <div className="space-y-1.5">
          <h3 className="text-base font-semibold text-fg group-hover:text-accent transition-colors">
            {concept.title}
          </h3>
          <p className="text-sm leading-relaxed text-fg-muted">
            {concept.subtitle}
          </p>
        </div>
      </div>
    </Link>
  );
}

function ConceptDiagram({ type }: { type: string }) {
  const diagrams: Record<string, React.ReactElement> = {
    lifecycle: (
      <svg viewBox="0 0 120 80" className="w-full h-full">
        <circle cx="20" cy="40" r="6" fill="none" stroke="#0a84ff" strokeWidth="1.5" />
        <path d="M26 40 L54 40" stroke="#0a84ff" strokeWidth="1.5" fill="none" />
        <circle cx="60" cy="40" r="6" fill="none" stroke="#0a84ff" strokeWidth="1.5" />
        <path d="M66 40 L94 40" stroke="#0a84ff" strokeWidth="1.5" fill="none" />
        <circle cx="100" cy="40" r="6" fill="none" stroke="#0a84ff" strokeWidth="1.5" />
      </svg>
    ),
    arc: (
      <svg viewBox="0 0 120 80" className="w-full h-full">
        <circle cx="30" cy="40" r="10" fill="none" stroke="#0a84ff" strokeWidth="1.5" />
        <circle cx="90" cy="40" r="10" fill="none" stroke="#0a84ff" strokeWidth="1.5" />
        <path d="M40 40 Q60 25, 80 40" stroke="#0a84ff" strokeWidth="1.5" fill="none" />
        <path d="M80 40 Q60 55, 40 40" stroke="#0a84ff" strokeWidth="1.5" fill="none" />
        <circle cx="30" cy="40" r="3" fill="#0a84ff" />
        <circle cx="90" cy="40" r="3" fill="#0a84ff" />
      </svg>
    ),
    autolayout: (
      <svg viewBox="0 0 120 80" className="w-full h-full">
        <rect x="20" y="25" width="25" height="25" fill="none" stroke="#0a84ff" strokeWidth="1.5" />
        <rect x="75" y="25" width="25" height="25" fill="none" stroke="#0a84ff" strokeWidth="1.5" />
        <path d="M45 37.5 L75 37.5" stroke="#0a84ff" strokeWidth="1.5" markerEnd="url(#arrow)" />
        <defs>
          <marker id="arrow" markerWidth="8" markerHeight="8" refX="7" refY="2.5" orient="auto">
            <path d="M0,0 L0,5 L7,2.5 z" fill="#0a84ff" />
          </marker>
        </defs>
      </svg>
    ),
    hierarchy: (
      <svg viewBox="0 0 120 80" className="w-full h-full">
        <circle cx="60" cy="15" r="6" fill="#0a84ff" fillOpacity="0.3" />
        <path d="M60 21 L40 45" stroke="#0a84ff" strokeWidth="1.5" />
        <path d="M60 21 L80 45" stroke="#0a84ff" strokeWidth="1.5" />
        <circle cx="40" cy="45" r="5" fill="#0a84ff" fillOpacity="0.2" />
        <circle cx="80" cy="45" r="5" fill="#0a84ff" fillOpacity="0.2" />
      </svg>
    ),
    delegation: (
      <svg viewBox="0 0 120 80" className="w-full h-full">
        <rect x="15" y="30" width="20" height="18" fill="none" stroke="#0a84ff" strokeWidth="1.5" />
        <rect x="85" y="30" width="20" height="18" fill="none" stroke="#0a84ff" strokeWidth="1.5" />
        <path d="M35 39 L85 39" stroke="#0a84ff" strokeWidth="1.5" markerEnd="url(#arrow2)" />
        <defs>
          <marker id="arrow2" markerWidth="8" markerHeight="8" refX="7" refY="2.5" orient="auto">
            <path d="M0,0 L0,5 L7,2.5 z" fill="#0a84ff" />
          </marker>
        </defs>
      </svg>
    ),
    protocols: (
      <svg viewBox="0 0 120 80" className="w-full h-full">
        <rect x="20" y="25" width="30" height="25" rx="3" fill="none" stroke="#0a84ff" strokeWidth="1.5" strokeDasharray="3,2" />
        <rect x="70" y="25" width="30" height="25" rx="3" fill="#0a84ff" fillOpacity="0.15" stroke="#0a84ff" strokeWidth="1.5" />
        <path d="M50 37.5 L70 37.5" stroke="#0a84ff" strokeWidth="1.5" />
      </svg>
    ),
    closures: (
      <svg viewBox="0 0 120 80" className="w-full h-full">
        <path d="M30 35 Q50 25, 70 35 Q50 45, 30 35" stroke="#0a84ff" strokeWidth="1.5" fill="none" />
        <circle cx="50" cy="35" r="2.5" fill="#0a84ff" />
      </svg>
    ),
    optionals: (
      <svg viewBox="0 0 120 80" className="w-full h-full">
        <rect x="30" y="30" width="20" height="18" fill="none" stroke="#0a84ff" strokeWidth="1.5" />
        <text x="40" y="42" fontSize="10" fill="#0a84ff" textAnchor="middle">T?</text>
        <path d="M50 39 L70 39" stroke="#0a84ff" strokeWidth="1.5" />
        <rect x="70" y="30" width="20" height="18" fill="#0a84ff" fillOpacity="0.15" stroke="#0a84ff" strokeWidth="1.5" />
        <text x="80" y="42" fontSize="10" fill="#0a84ff" textAnchor="middle">T</text>
      </svg>
    ),
    memory: (
      <svg viewBox="0 0 120 80" className="w-full h-full">
        <rect x="20" y="25" width="18" height="18" fill="#0a84ff" fillOpacity="0.2" stroke="#0a84ff" strokeWidth="1.5" />
        <rect x="42" y="25" width="18" height="18" fill="#0a84ff" fillOpacity="0.4" stroke="#0a84ff" strokeWidth="1.5" />
        <rect x="64" y="25" width="18" height="18" fill="#0a84ff" fillOpacity="0.6" stroke="#0a84ff" strokeWidth="1.5" />
        <text x="29" y="37" fontSize="8" fill="#0a84ff" textAnchor="middle">RC:1</text>
        <text x="51" y="37" fontSize="8" fill="#0a84ff" textAnchor="middle">RC:2</text>
        <text x="73" y="37" fontSize="8" fill="#0a84ff" textAnchor="middle">RC:3</text>
      </svg>
    ),
  };

  return diagrams[type] || (
    <svg viewBox="0 0 120 80" className="w-full h-full">
      <circle cx="60" cy="40" r="12" fill="none" stroke="#0a84ff" strokeWidth="1.5" />
      <circle cx="60" cy="40" r="4" fill="#0a84ff" fillOpacity="0.4" />
    </svg>
  );
}
