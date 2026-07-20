import type { Transition, Variants } from "framer-motion";

/** Shared ease — matches skill bars & timeline. */
export const EASE_OUT_EXPO: [number, number, number, number] = [0.22, 1, 0.36, 1];

export const VIEWPORT = { once: true, amount: 0.25 } as const;

export const FADE_UP_Y = 16;

export function fadeUpTransition(prefersReducedMotion: boolean, delay = 0): Transition {
  if (prefersReducedMotion) {
    return { duration: 0 };
  }

  return {
    duration: 0.5,
    delay,
    ease: EASE_OUT_EXPO,
  };
}

export function fadeUpVariants(prefersReducedMotion: boolean): Variants {
  return {
    hidden: {
      opacity: prefersReducedMotion ? 1 : 0,
      y: prefersReducedMotion ? 0 : FADE_UP_Y,
    },
    visible: {
      opacity: 1,
      y: 0,
    },
  };
}

/** Stagger delay capped for mobile feel — max ~0.24s total. */
export function staggerDelay(index: number, step = 0.08): number {
  return Math.min(index, 3) * step;
}
