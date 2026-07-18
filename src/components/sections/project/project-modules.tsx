"use client";

import { Check } from "lucide-react";
import Image from "next/image";

import { Reveal } from "@/components/motion/reveal";
import type { ProjectModule } from "@/data/projects";

type ProjectModulesProps = {
  modules: ProjectModule[];
};

export function ProjectModules({ modules }: ProjectModulesProps) {
  return (
    <section aria-labelledby="modules-heading" className="border-t border-border px-6 py-16">
      <div className="mx-auto flex w-full max-w-3xl flex-col gap-12">
        <Reveal as="header" className="space-y-3">
          <p className="font-mono text-sm font-medium tracking-widest text-primary uppercase">
            Experience
          </p>
          <h2 id="modules-heading" className="font-heading text-h2 font-semibold tracking-tight">
            설계와 구현에서 풀어낸 문제
          </h2>
          <p className="text-muted-foreground text-body leading-relaxed">
            각 모듈은 실서비스에서 마주치는 제약 조건과, 그 안에서 선택한 해결을 기준으로
            정리했습니다.
          </p>
        </Reveal>

        <ol className="flex flex-col gap-14">
          {modules.map((module, index) => (
            <Reveal key={module.id} as="li" index={index}>
              <article className="space-y-5">
                <div className="flex items-baseline gap-3">
                  <span className="font-mono text-sm tabular-nums text-primary">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <div className="space-y-1">
                    <h3 className="font-heading text-h3 font-semibold tracking-tight">
                      {module.title}
                    </h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {module.summary}
                    </p>
                  </div>
                </div>

                {module.image ? (
                    <figure>
                      <Image
                        src={module.image}
                        alt={`${module.title} 관련 이미지`}
                        width={1600}
                        height={900}
                        sizes="(max-width: 768px) 100vw, 48rem"
                        className="h-auto w-full object-cover"
                      />
                    </figure>
                  ) : null}

                <p className="text-body leading-relaxed">{module.problem}</p>

                <ul className="flex flex-col gap-3 border-l border-border pl-4">
                  {module.points.map((point) => (
                    <li key={point} className="flex items-start gap-2 text-sm leading-relaxed">
                      <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-primary" />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>
              </article>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
