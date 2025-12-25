import { NAV, type NavItem } from "./nav";

export function findCurrentPage(href: string): {
  current: NavItem;
  previous?: NavItem;
  next?: NavItem;
} | null {
  // Flatten all pages from all categories
  const allPages: Array<{ item: NavItem; categoryIndex: number; chapterIndex: number; pageIndex: number }> = [];

  NAV.forEach((category, catIdx) => {
    category.chapters.forEach((chapter, chIdx) => {
      chapter.pages.forEach((page, pIdx) => {
        allPages.push({
          item: page,
          categoryIndex: catIdx,
          chapterIndex: chIdx,
          pageIndex: pIdx,
        });
      });
    });
  });

  // Find current page
  const currentIndex = allPages.findIndex((p) => p.item.href === href);
  if (currentIndex === -1) return null;

  const current = allPages[currentIndex].item;
  const previous = currentIndex > 0 ? allPages[currentIndex - 1].item : undefined;
  const next = currentIndex < allPages.length - 1 ? allPages[currentIndex + 1].item : undefined;

  return { current, previous, next };
}

