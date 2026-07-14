"use client";

import { useRef, useSyncExternalStore } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

const SKILL_KEYWORDS = ["Frontend", "Backend", "DevOps", "Design"] as const;

function subscribe() {
  return () => {};
}

function useIsClient() {
  return useSyncExternalStore(subscribe, () => true, () => false);
}

function SkillTag({ label }: { label: string }) {
  return (
    <span className="inline-flex shrink-0 items-center rounded-lg border border-border bg-background/60 px-4 py-1.5 text-sm font-medium text-foreground backdrop-blur-sm">
      {label}
    </span>
  );
}

function MarqueeTrack({
  className,
  "aria-hidden": ariaHidden,
}: {
  className?: string;
  "aria-hidden"?: boolean | "true" | "false";
}) {
  return (
    <div
      aria-hidden={ariaHidden}
      className={cn("flex shrink-0 items-center gap-3", className)}
    >
      {SKILL_KEYWORDS.map((keyword) => (
        <SkillTag key={keyword} label={keyword} />
      ))}
    </div>
  );
}

function StaticSkillTags() {
  return (
    <div
      aria-label="Skill categories"
      className="flex flex-wrap items-center justify-center gap-3"
    >
      {SKILL_KEYWORDS.map((keyword) => (
        <SkillTag key={keyword} label={keyword} />
      ))}
    </div>
  );
}

export function SkillTagsMarquee() {
  const prefersReducedMotion = useReducedMotion();
  const isClient = useIsClient();
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.2 });

  if (!isClient || prefersReducedMotion) {
    return <StaticSkillTags />;
  }

  return (
    <div
      ref={containerRef}
      aria-label="Skill categories"
      className="relative w-full overflow-hidden mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
    >
      <motion.div
        className="flex w-max items-center gap-3 will-change-transform"
        animate={isInView ? { x: ["0%", "-50%"] } : { x: "0%" }}
        transition={{
          x: {
            repeat: isInView ? Infinity : 0,
            repeatType: "loop",
            duration: 24,
            ease: "linear",
          },
        }}
      >
        <MarqueeTrack />
        <MarqueeTrack aria-hidden="true" />
      </motion.div>
    </div>
  );
}
