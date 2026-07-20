"use client";

import { useState } from "react";

import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import type { Skill } from "@/data/skills";

type SkillTagProps = {
  skill: Skill;
};

function formatYears(years: number): string {
  return years >= 1 ? `${years}년 경험` : `${Math.round(years * 12)}개월 경험`;
}

export function SkillTag({ skill }: SkillTagProps) {
  const [open, setOpen] = useState(false);

  return (
    <Tooltip open={open} onOpenChange={setOpen}>
      <TooltipTrigger
        closeOnClick={false}
        onClick={() => setOpen((prev) => !prev)}
        render={
          <button
            type="button"
            aria-expanded={open}
            className="inline-flex shrink-0 items-center rounded-lg border border-border bg-background/60 px-3 py-1 text-sm font-medium text-foreground transition-colors hover:border-primary/40 hover:bg-accent/50 focus-visible:outline-none focus-visible:ring-3 focus-visible:ring-ring/50"
          />
        }
      >
        <span>{skill.name}</span>
      </TooltipTrigger>
      <TooltipContent side="top" className="max-w-xs text-center">
        <p>
          {formatYears(skill.years)} · {skill.context}
        </p>
      </TooltipContent>
    </Tooltip>
  );
}
