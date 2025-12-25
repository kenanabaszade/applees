import type { ReactNode } from "react";
import { BookShell } from "@/components/layout/BookShell";

export default function BookLayout({ children }: { children: ReactNode }) {
  return <BookShell>{children}</BookShell>;
}


