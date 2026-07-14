"use client";

import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";

import {
  fadeUpTransition,
  fadeUpVariants,
  staggerDelay,
  VIEWPORT,
} from "@/lib/motion";
import { cn } from "@/lib/utils";

type RevealTag = "div" | "li" | "article" | "header";

type RevealProps = {
  children: ReactNode;
  className?: string;
  index?: number;
  as?: RevealTag;
};

const motionTags = {
  div: motion.div,
  li: motion.li,
  article: motion.article,
  header: motion.header,
} as const;

export function Reveal({
  children,
  className,
  index = 0,
  as = "div",
}: RevealProps) {
  const prefersReducedMotion = useReducedMotion() ?? false;
  const Component = motionTags[as];

  return (
    <Component
      className={cn(className)}
      initial="hidden"
      whileInView="visible"
      viewport={VIEWPORT}
      variants={fadeUpVariants(prefersReducedMotion)}
      transition={fadeUpTransition(prefersReducedMotion, staggerDelay(index))}
    >
      {children}
    </Component>
  );
}
