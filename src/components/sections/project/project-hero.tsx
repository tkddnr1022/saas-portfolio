"use client";

import { ArrowLeft, ArrowUpRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";

import { GithubIcon } from "@/components/icons/github-icon";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ImageLightbox } from "@/components/ui/image-lightbox";
import type { ProjectDetail } from "@/data/projects";
import {
  fadeUpTransition,
  fadeUpVariants,
  staggerDelay,
} from "@/lib/motion";

type ProjectHeroProps = {
  project: ProjectDetail;
};

export function ProjectHero({ project }: ProjectHeroProps) {
  const prefersReducedMotion = useReducedMotion() ?? false;
  const variants = fadeUpVariants(prefersReducedMotion);

  return (
    <section
      aria-labelledby="project-heading"
      className="relative scroll-mt-20 flex flex-col items-center overflow-hidden pt-28 pb-16"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,color-mix(in_oklch,var(--primary)_18%,transparent),transparent)] dark:bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,color-mix(in_oklch,var(--primary)_22%,transparent),transparent)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_80%_100%,color-mix(in_oklch,var(--primary)_8%,transparent),transparent)] dark:bg-[radial-gradient(ellipse_60%_40%_at_80%_100%,color-mix(in_oklch,var(--primary)_12%,transparent),transparent)]"
      />

      <div className="relative z-10 flex w-full max-w-3xl flex-col gap-8 px-6">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={variants}
          transition={fadeUpTransition(prefersReducedMotion, staggerDelay(0))}
        >
          <Button
            nativeButton={false}
            render={<Link href="/#projects" />}
            variant="ghost"
            size="sm"
            className="-ml-2 text-muted-foreground"
          >
            <ArrowLeft aria-hidden="true" />
            <span>Projects로 돌아가기</span>
          </Button>
        </motion.div>

        <motion.div
          className="space-y-4 text-center sm:text-left"
          initial="hidden"
          animate="visible"
          variants={variants}
          transition={fadeUpTransition(prefersReducedMotion, staggerDelay(1))}
        >
          <p className="font-mono text-sm font-medium tracking-widest text-primary uppercase">
            Project
          </p>
          <h1
            id="project-heading"
            className="font-heading text-h1 font-semibold tracking-tight sm:text-display"
          >
            {project.name}
          </h1>
          <p className="font-heading text-h3 font-medium tracking-tight text-foreground/90">
            {project.tagline}
          </p>
          <p className="text-muted-foreground max-w-2xl text-body leading-relaxed">
            {project.overview}
          </p>
        </motion.div>

        <motion.div
          className="flex flex-wrap items-center justify-center gap-3 sm:justify-start"
          initial="hidden"
          animate="visible"
          variants={variants}
          transition={fadeUpTransition(prefersReducedMotion, staggerDelay(2))}
        >
          {project.liveUrl ? (
            <Button
              nativeButton={false}
              render={
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                />
              }
              size="lg"
            >
              <span>라이브 보기</span>
              <ExternalLink aria-hidden="true" />
            </Button>
          ) : null}
                    {project.docsUrl ? (
            <Button
              nativeButton={false}
              render={
                <a
                  href={project.docsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                />
              }
              variant="outline"
              size="lg"
            >
              <span>문서 보기</span>
              <ArrowUpRight aria-hidden="true" />
            </Button>
          ) : null}
          {project.githubUrl ? (
            <Button
              nativeButton={false}
              render={
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                />
              }
              variant={project.liveUrl ? "outline" : "default"}
              size="lg"
            >
              <GithubIcon aria-hidden="true" className="size-4" />
              <span>GitHub</span>
              <ArrowUpRight aria-hidden="true" />
            </Button>
          ) : null}
        </motion.div>
      </div>

      {project.banner ? (
        <motion.figure
          className="relative z-10 mt-10 w-full max-w-3xl px-6"
          initial="hidden"
          animate="visible"
          variants={variants}
          transition={fadeUpTransition(prefersReducedMotion, staggerDelay(3))}
        >
          <ImageLightbox
            src={project.banner}
            alt={`${project.name} 프로모션 배너`}
            width={2048}
            height={1000}
            priority
            sizes="(max-width: 768px) 100vw, 48rem"
            className="h-auto w-full object-cover"
          />
        </motion.figure>
      ) : null}

      <motion.dl
        className="relative z-10 mt-10 grid w-full max-w-3xl gap-4 border-t border-border px-6 pt-8 sm:grid-cols-3"
        initial="hidden"
        animate="visible"
        variants={variants}
        transition={fadeUpTransition(
          prefersReducedMotion,
          staggerDelay(project.banner ? 4 : 3),
        )}
      >
        <div className="space-y-1">
          <dt className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
            형태
          </dt>
          <dd className="font-medium">{project.type}</dd>
        </div>
        <div className="space-y-1">
          <dt className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
            참여 역할
          </dt>
          <dd className="font-medium">{project.role}</dd>
        </div>
        <div className="space-y-2 sm:col-span-1">
          <dt className="font-mono text-xs tracking-widest text-muted-foreground uppercase">
            주요 기술
          </dt>
          <dd className="flex flex-wrap gap-1.5">
            {project.stack.map((tech) => (
              <Badge key={tech} variant="secondary">
                {tech}
              </Badge>
            ))}
          </dd>
        </div>
      </motion.dl>
    </section>
  );
}
