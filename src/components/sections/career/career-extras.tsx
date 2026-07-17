"use client";

import Link from "next/link";

import { Reveal } from "@/components/motion/reveal";
import {
  EDUCATION,
  LANGUAGES,
  PROJECTS,
} from "@/data/career";
import { cn } from "@/lib/utils";

function isExternalHref(href: string) {
  return href.startsWith("http://") || href.startsWith("https://");
}

type CareerExtrasProps = {
  className?: string;
};

export function CareerExtras({ className }: CareerExtrasProps) {
  return (
    <div
      className={cn(
        "grid w-full gap-10 md:grid-cols-3 md:gap-8",
        className,
      )}
    >
      <Reveal index={0} className="space-y-4">
        <h3 className="font-heading text-h3 font-semibold tracking-tight">
          학력
        </h3>
        <ul className="space-y-4">
          {EDUCATION.map((edu) => (
            <li key={edu.id} className="space-y-1">
              <p className="font-medium">{edu.school}</p>
              <p className="text-muted-foreground text-body">
                {edu.degree} · {edu.field}
              </p>
              <p className="font-mono text-sm tabular-nums text-muted-foreground">
                {edu.startYear} – {edu.endYear}
              </p>
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal index={1} className="space-y-4">
        <h3 className="font-heading text-h3 font-semibold tracking-tight">
          언어 능력
        </h3>
        <ul className="space-y-4">
          {LANGUAGES.map((lang) => (
            <li key={lang.id} className="space-y-1">
              <div className="flex flex-wrap items-baseline gap-x-2 gap-y-1">
                <p className="font-medium">{lang.name}</p>
                <span className="text-muted-foreground text-sm">
                  {lang.level}
                </span>
                {lang.score && (
                  <span className="font-mono text-sm tabular-nums text-primary">
                    {lang.score}
                  </span>
                )}
              </div>
              <p className="text-muted-foreground text-body leading-relaxed">
                {lang.context}
              </p>
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal index={2} className="space-y-4">
        <h3 className="font-heading text-h3 font-semibold tracking-tight">
          프로젝트
        </h3>
        <ul className="space-y-4">
          {PROJECTS.map((project) => {
            const external = isExternalHref(project.url);
            const linkClassName =
              "font-medium text-primary underline-offset-4 hover:underline";

            return (
              <li key={project.id} className="space-y-1">
                {external ? (
                  <a
                    href={project.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={linkClassName}
                  >
                    {project.name}
                    <span className="sr-only"> (새 창에서 열림)</span>
                  </a>
                ) : (
                  <Link href={project.url} className={linkClassName}>
                    {project.name}
                  </Link>
                )}
                <p className="text-muted-foreground text-body leading-relaxed">
                  {project.description}
                </p>
              </li>
            );
          })}
        </ul>
      </Reveal>
    </div>
  );
}
