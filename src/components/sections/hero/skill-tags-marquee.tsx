"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

import { cn } from "@/lib/utils";

const SKILL_KEYWORDS = ["Frontend", "Backend", "DevOps", "Design", "PM"] as const;

function SkillTag({ label }: { label: string }) {
  return (
    <span className="inline-flex shrink-0 items-center rounded-lg border border-border bg-background/60 px-4 py-1.5 text-sm font-medium text-foreground backdrop-blur-sm">
      {label}
    </span>
  );
}

function MarqueeTrack({ className }: { className?: string }) {
  return (
    <div className={cn("flex shrink-0 items-center gap-3", className)}>
      {SKILL_KEYWORDS.map((keyword) => (
        <SkillTag key={keyword} label={keyword} />
      ))}
    </div>
  );
}

export function SkillTagsMarquee() {
  const prefersReducedMotion = useReducedMotion();
  const [isReducedMotion, setIsReducedMotion] = useState(false);

  useEffect(() => {
    setIsReducedMotion(prefersReducedMotion ?? false);
  }, [prefersReducedMotion]);

  if (isReducedMotion) {
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

  return (
    <div
      aria-label="Skill categories"
      className="relative w-full overflow-hidden mask-[linear-gradient(to_right,transparent,black_10%,black_90%,transparent)]"
    >
      <motion.div
        className="flex w-max items-center gap-3"
        animate={{ x: ["0%", "-50%"] }}
        transition={{
          x: {
            repeat: Infinity,
            repeatType: "loop",
            duration: 20,
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
