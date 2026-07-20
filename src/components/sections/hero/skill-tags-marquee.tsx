"use client";

import { useRef } from "react";
import { useInView, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

const SKILL_KEYWORDS = ["Frontend", "Backend", "DevOps", "Design"] as const;

function SkillTag({ label }: { label: string }) {
  return (
    <span className="inline-flex shrink-0 items-center rounded-lg border border-border bg-background/60 px-4 pt-2 pb-1.5 text-sm font-medium text-foreground backdrop-blur-sm">
      {label}
    </span>
  );
}

function MarqueeTrack({
  "aria-hidden": ariaHidden,
}: {
  "aria-hidden"?: boolean | "true" | "false";
}) {
  return (
    <div aria-hidden={ariaHidden} className="flex shrink-0 items-center gap-3 pr-3">
      {SKILL_KEYWORDS.map((keyword) => (
        <SkillTag key={keyword} label={keyword} />
      ))}
    </div>
  );
}

function StaticSkillTags() {
  return (
    <div aria-label="스킬 카테고리" className="flex flex-wrap items-center justify-center gap-3">
      {SKILL_KEYWORDS.map((keyword) => (
        <SkillTag key={keyword} label={keyword} />
      ))}
    </div>
  );
}

export function SkillTagsMarquee() {
  const prefersReducedMotion = useReducedMotion();
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.2 });

  if (prefersReducedMotion) {
    return <StaticSkillTags />;
  }

  return (
    <div
      ref={containerRef}
      aria-label="스킬 카테고리"
      className="relative w-full overflow-hidden mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
    >
      <div
        className={cn(
          "flex w-max items-center will-change-transform animate-marquee",
          !isInView && "[animation-play-state:paused]",
        )}
      >
        <MarqueeTrack />
        <MarqueeTrack aria-hidden="true" />
      </div>
    </div>
  );
}
