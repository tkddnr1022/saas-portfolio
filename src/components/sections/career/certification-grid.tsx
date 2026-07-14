"use client";

import { Reveal } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";
import { CERTIFICATIONS } from "@/data/career";
import { cn } from "@/lib/utils";

type CertificationGridProps = {
  className?: string;
};

export function CertificationGrid({ className }: CertificationGridProps) {
  return (
    <div className={cn("w-full", className)}>
      <h3 className="mb-6 font-heading text-h3 font-semibold tracking-tight">
        자격증
      </h3>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {CERTIFICATIONS.map((cert, index) => (
          <Reveal key={cert.id} as="li" index={index}>
            <a
              href={cert.credentialUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex h-full flex-col gap-2 rounded-lg border border-border px-4 py-3 transition-colors duration-300 hover:border-primary/40 hover:bg-muted/50 focus-visible:border-primary/40 focus-visible:ring-3 focus-visible:ring-ring/50 focus-visible:outline-none"
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
          </Reveal>
        ))}
      </ul>
    </div>
  );
}
