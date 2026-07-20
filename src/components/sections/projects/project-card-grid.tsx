"use client";

import Image from "next/image";
import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";
import { PROJECT_DETAILS } from "@/data/projects";
import { cn } from "@/lib/utils";

type ProjectCardGridProps = {
  className?: string;
};

export function ProjectCardGrid({ className }: ProjectCardGridProps) {
  return (
    <ul className={cn("grid w-full grid-cols-1 gap-6 md:grid-cols-2", className)}>
      {PROJECT_DETAILS.map((project, index) => (
        <Reveal key={project.slug} as="li" index={index}>
          <Link
            href={`/projects/${project.slug}`}
            className="group flex h-full flex-col overflow-hidden rounded-xl border border-border bg-card transition-colors duration-300 hover:border-primary/40 focus-visible:border-primary/40 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
          >
            <div className="relative aspect-video overflow-hidden bg-muted">
              {project.banner ? (
                <Image
                  src={project.banner}
                  alt={`${project.name} 배너`}
                  fill
                  sizes="(max-width: 768px) 100vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                />
              ) : (
                <div
                  aria-hidden="true"
                  className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_20%,color-mix(in_oklch,var(--primary)_22%,transparent),transparent),linear-gradient(to_bottom,color-mix(in_oklch,var(--primary)_8%,var(--muted)),var(--muted))]"
                />
              )}
            </div>

            <div className="flex flex-1 flex-col gap-2 p-5 sm:p-6">
              <h3 className="font-heading text-h3 font-semibold tracking-tight transition-colors group-hover:text-primary">
                {project.name}
              </h3>
              <p className="text-muted-foreground text-body leading-relaxed">{project.tagline}</p>
            </div>
          </Link>
        </Reveal>
      ))}
    </ul>
  );
}
