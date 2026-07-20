"use client";

import { motion, useReducedMotion } from "framer-motion";

import { EXPERIENCES, formatExperiencePeriod, type Experience } from "@/data/career";
import { fadeUpTransition, fadeUpVariants, staggerDelay, VIEWPORT } from "@/lib/motion";
import { cn } from "@/lib/utils";

type CareerTimelineProps = {
  className?: string;
};

type TimelineItemProps = {
  experience: Experience;
  isLast: boolean;
  index: number;
};

function TimelineItem({ experience, isLast, index }: TimelineItemProps) {
  const prefersReducedMotion = useReducedMotion() ?? false;

  return (
    <motion.li
      className="relative grid grid-cols-[auto_1fr] gap-x-4 gap-y-1 pb-10 last:pb-0"
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={fadeUpVariants(prefersReducedMotion)}
      transition={fadeUpTransition(prefersReducedMotion, staggerDelay(index))}
    >
      <div className="flex flex-col items-center">
        <span
          aria-hidden="true"
          className="mt-1.5 size-3 shrink-0 rounded-full border-2 border-primary bg-background"
        />
        {!isLast && <span aria-hidden="true" className="mt-1 w-px flex-1 bg-border" />}
      </div>

      <div className="space-y-3 pb-2">
        <div className="space-y-1">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
            <h3 className="font-heading text-h3 font-semibold tracking-tight">
              {experience.company}
            </h3>
            <span className="font-mono text-sm tabular-nums text-muted-foreground">
              {formatExperiencePeriod(experience.startDate, experience.endDate)}
            </span>
          </div>
          <p className="text-muted-foreground text-body">{experience.role}</p>
        </div>

        <ul className="space-y-2">
          {experience.achievements.map((achievement) => (
            <li
              key={achievement.text}
              className="grid grid-cols-[auto_minmax(0,1fr)] gap-x-2 text-body leading-relaxed"
            >
              <span className="text-muted-foreground" aria-hidden="true">
                ·
              </span>
              <span className="min-w-0 break-words">
                {achievement.text}
                {achievement.metric && (
                  <span className="ml-2 inline-block font-mono text-sm font-medium tabular-nums text-primary">
                    {achievement.metric}
                  </span>
                )}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </motion.li>
  );
}

export function CareerTimeline({ className }: CareerTimelineProps) {
  return (
    <div className={cn("w-full", className)}>
      <h3 className="mb-6 font-heading text-h3 font-semibold tracking-tight">경력</h3>
      <ol className="relative">
        {EXPERIENCES.map((experience, index) => (
          <TimelineItem
            key={experience.id}
            experience={experience}
            isLast={index === EXPERIENCES.length - 1}
            index={index}
          />
        ))}
      </ol>
    </div>
  );
}
