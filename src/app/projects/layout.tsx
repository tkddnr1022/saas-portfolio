import type { ReactNode } from "react";

import { ScrollToTop } from "@/components/layout/scroll-to-top";

export default function ProjectsLayout({ children }: { children: ReactNode }) {
  return (
    <>
      <ScrollToTop />
      {children}
    </>
  );
}
