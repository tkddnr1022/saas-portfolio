"use client";

import { usePathname } from "next/navigation";
import { useLayoutEffect } from "react";

/** Soft navigation 시 이전 스크롤 위치가 유지되지 않도록 상단으로 이동한다. */
export function ScrollToTop() {
  const pathname = usePathname();

  useLayoutEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return null;
}
