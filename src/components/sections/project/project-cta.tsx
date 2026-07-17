"use client";

import { ArrowRight, ArrowUpRight } from "lucide-react";
import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";
import { Button } from "@/components/ui/button";
import { CONTACT_HREF } from "@/data/links";
import type { ProjectDetail } from "@/data/projects";

type ProjectCtaProps = {
  project: ProjectDetail;
};

export function ProjectCta({ project }: ProjectCtaProps) {
  return (
    <section
      aria-labelledby="project-cta-heading"
      className="border-t border-border px-6 py-16"
    >
      <Reveal className="mx-auto flex w-full max-w-3xl flex-col items-start gap-6 rounded-xl border border-border bg-[linear-gradient(to_bottom,color-mix(in_oklch,var(--primary)_6%,transparent),var(--card))] p-8 sm:p-10">
        <div className="space-y-3">
          <p className="font-mono text-sm font-medium tracking-widest text-primary uppercase">
            Next
          </p>
          <h2
            id="project-cta-heading"
            className="font-heading text-h2 font-semibold tracking-tight"
          >
            {project.name}처럼, 제품 단위로 끝까지 책임집니다
          </h2>
          <p className="text-muted-foreground max-w-xl text-body leading-relaxed">
            설계·구현·운영까지 한 흐름으로 다루는 풀스택 협업이 필요하면
            편하게 문의해 주세요.
          </p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Button
            nativeButton={false}
            render={<a href={CONTACT_HREF} />}
            size="lg"
          >
            문의하기
            <ArrowRight aria-hidden="true" />
          </Button>
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
              variant="outline"
              size="lg"
            >
              코드 보기
              <ArrowUpRight aria-hidden="true" />
            </Button>
          ) : null}
          <Button
            nativeButton={false}
            render={<Link href="/#career" />}
            variant="ghost"
            size="lg"
          >
            다른 경력 보기
          </Button>
        </div>
      </Reveal>
    </section>
  );
}
