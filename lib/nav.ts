export type NavItem = {
  title: string;
  href: string;
  free?: boolean;
  freeWithLogin?: boolean;
};

export type NavChapter = {
  chapter: string; // e.g. "002"
  title: string; // e.g. "ARC"
  pages: NavItem[];
};

export type NavCategory = {
  title: string; // e.g. "Swift Language"
  chapters: NavChapter[];
};

export const NAV: NavCategory[] = [
  {
    title: "iOS Fundamentals",
    chapters: [
      {
        chapter: "000",
        title: "Welcome",
        pages: [
          { title: "Welcome to This Book", href: "/", free: true },
        ],
      },
      {
        chapter: "001",
        title: "App Lifecycle",
        pages: [
          { title: "Overview", href: "/docs/ios-fundamentals/001-app-lifecycle", free: true },
        ],
      },
    ],
  },
  {
    title: "Swift Language",
    chapters: [
      {
        chapter: "001",
        title: "Swift Fundamentals",
        pages: [
          {
            title: "Introduction to Swift",
            href: "/docs/swift-language/001-swift-fundamentals/introduction-to-swift",
            free: true,
          },
          {
            title: "Swift Data Types",
            href: "/docs/swift-language/001-swift-fundamentals/swift-data-types",
            free: true,
          },
          {
            title: "Control Flow",
            href: "/docs/swift-language/001-swift-fundamentals/control-flow",
            free: true,
          },
          {
            title: "Functions and Enums",
            href: "/docs/swift-language/001-swift-fundamentals/functions-and-enums",
            free: true,
          },
          {
            title: "Object-Oriented Programming",
            href: "/docs/swift-language/001-swift-fundamentals/object-oriented-programming",
            free: true,
          },
        ],
      },
      {
        chapter: "002",
        title: "ARC",
        pages: [
          {
            title: "Retain Cycles in ARC",
            href: "/docs/swift-language/002-arc/retain-cycles-in-arc",
            free: true,
          },
        ],
      },
    ],
  },
  { title: "UIKit Core", chapters: [] },
  { title: "Architecture", chapters: [] },
  { title: "SwiftUI", chapters: [] },
];
