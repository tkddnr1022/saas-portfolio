"use client";

import { Reveal } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";
import {
  CERTIFICATIONS,
  EDUCATION,
  LANGUAGES,
} from "@/data/career";
import { cn } from "@/lib/utils";

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
          자격증
        </h3>
        <ul className="space-y-4">
          {CERTIFICATIONS.map((cert) => (
            <li key={cert.id}>
              <a
                href={cert.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col gap-2 rounded-lg border border-border px-4 py-3 transition-colors duration-300 hover:border-primary/40 hover:bg-muted/50 focus-visible:border-primary/40 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
              >
                <span className="font-medium leading-snug group-hover:text-primary">
                  {cert.name}
                  <span className="sr-only"> (새 창에서 열림)</span>
                </span>
                <span className="text-muted-foreground text-sm">
                  {cert.issuer}
                </span>
                <Badge variant="outline" className="w-fit">
                  {cert.year}
                </Badge>
              </a>
            </li>
          ))}
        </ul>
      </Reveal>

      <Reveal index={1} className="space-y-4">
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

      <Reveal index={2} className="space-y-4">
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
    </div>
  );
}
