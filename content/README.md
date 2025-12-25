## Content authoring (MDX) — handoff notes

This repo is set up for **Next.js App Router + MDX** with a small set of
book-specific components to keep pages consistent and “chapter-like.”

### Recommended frontmatter schema

For each page, include:

```yaml
---
title: "Retain Cycles in ARC"
description: "Why cycles happen and how to break them safely."
category: "Swift Language"
chapter: "002"
chapterTitle: "ARC"
order: 10
---
```

### Component set (MDX)

Available MDX components (see `mdx-components.tsx`):

- `Callout` (`kind`: `info` | `warning` | `note`)
- `DiagramCard` (diagram container with dot-grid + caption)
- `CompareBlock` (two-column bad vs correct)
- `KeyTakeaways` (bullets + mental model summary)

Code fences render via a custom `pre` mapping to `CodeBlock`:

```md
```swift filename=RetainCycle.swift linenos
// ...
```
```

Supported meta:
- `filename=Foo.swift` (renders in the header)
- `linenos` (enables line numbers)

### URL + navigation mapping (Hybrid book TOC)

The sidebar is intentionally **hybrid**:

- Categories: iOS Fundamentals, Swift Language, UIKit Core, Architecture, SwiftUI
- Inside each category: numbered chapters (`001`, `002`, …) and pages

In v1, navigation is defined in `lib/nav.ts`. In a more content-driven setup,
the sidebar can be generated from frontmatter + folder structure under
`content/docs/**`.


