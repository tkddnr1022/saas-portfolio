"use client";

import type { ReactNode } from "react";

import { Reveal } from "@/components/motion/reveal";

type SectionHeaderProps = {
  sectionId: string;
  eyebrow: string;
  title: string;
  description: string;
};

export function SectionHeader({
  sectionId,
  eyebrow,
  title,
  description,
}: SectionHeaderProps) {
  return (
    <Reveal as="header" className="mx-auto max-w-2xl space-y-3 text-center">
      <p className="font-mono text-sm font-medium tracking-widest text-primary uppercase">
        {eyebrow}
      </p>
      <h2
        id={`${sectionId}-heading`}
        className="font-heading text-h2 font-semibold tracking-tight"
      >
        {title}
      </h2>
      <p className="text-muted-foreground text-body leading-relaxed">
        {description}
      </p>
    </Reveal>
  );
}

type SectionShellProps = {
  id: string;
  children: ReactNode;
};

export function SectionShell({ id, children }: SectionShellProps) {
  return (
    <section
      id={id}
      aria-labelledby={`${id}-heading`}
      className="scroll-mt-20 border-t border-border px-6 py-16"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        {children}
      </div>
    </section>
  );
}
