"use client";

import { motion, useReducedMotion } from "framer-motion";

import { SkillTag } from "@/components/sections/skills/skill-tag";
import type { Skill } from "@/data/skills";
import { EASE_OUT_EXPO, VIEWPORT } from "@/lib/motion";
import { cn } from "@/lib/utils";

type SkillProficiencyBarProps = {
  skill: Skill;
  className?: string;
};

export function SkillProficiencyBar({ skill, className }: SkillProficiencyBarProps) {
  const prefersReducedMotion = useReducedMotion() ?? false;

  return (
    <div className={cn("space-y-2", className)}>
      <div className="flex items-center justify-between gap-4">
        <SkillTag skill={skill} />
        <span className="font-mono text-sm tabular-nums text-muted-foreground">{skill.level}%</span>
      </div>

      <div
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={skill.level}
        aria-label={`${skill.name} 숙련도 ${skill.level}%`}
        className="h-2 overflow-hidden rounded-full bg-muted"
      >
        <motion.div
          className="h-full rounded-full bg-primary"
          initial={{ width: prefersReducedMotion ? `${skill.level}%` : "0%" }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={VIEWPORT}
          transition={
            prefersReducedMotion ? { duration: 0 } : { duration: 0.8, ease: EASE_OUT_EXPO }
          }
        />
      </div>
    </div>
  );
}
