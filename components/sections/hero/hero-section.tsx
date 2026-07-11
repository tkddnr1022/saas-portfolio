import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";

import { HireStatusBadge } from "./hire-status-badge";
import { SkillTagsMarquee } from "./skill-tags-marquee";

const BRAND_SIGNAL = "Full-Stack Engineer as a Service";

const HEADLINE = "디자인 시스템부터 CI/CD까지, 한 명으로 끝내는 풀스택";

const SUB_COPY =
  "프론트엔드·백엔드·DevOps·디자인·PM까지 아우르는 올라운더 엔지니어입니다. 제품 설계부터 배포 파이프라인까지, 팀이 필요로 하는 모든 영역을 책임집니다.";

export function HeroSection() {
  return (
    <section
      id="hero"
      className="relative scroll-mt-20 flex min-h-dvh flex-col items-center justify-center gap-8 overflow-hidden px-6 py-16"
    >
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,oklch(0.52_0.12_195/0.12),transparent)]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_40%_at_80%_100%,oklch(0.52_0.12_195/0.06),transparent)]"
      />

      <div className="relative z-10 flex w-full max-w-3xl flex-col items-center gap-8 text-center">
        <HireStatusBadge />

        <div className="space-y-4">
          <p className="font-mono text-sm font-medium tracking-widest text-primary uppercase">
            {BRAND_SIGNAL}
          </p>
          <h1 className="font-heading text-h2 font-semibold tracking-tight sm:text-h1 lg:text-display">
            {HEADLINE}
          </h1>
          <p className="text-muted-foreground mx-auto max-w-xl text-body leading-relaxed">
            {SUB_COPY}
          </p>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button
            render={<a href="#pricing" />}
            size="lg"
          >
            플랜 보기
            <ArrowRight aria-hidden="true" />
          </Button>
          <Button
            render={<a href="#chat" />}
            variant="outline"
            size="lg"
          >
            챗봇에게 물어보기
            <ArrowRight aria-hidden="true" />
          </Button>
        </div>

        <div className="w-full max-w-lg pt-2">
          <SkillTagsMarquee />
        </div>
      </div>
    </section>
  );
}
