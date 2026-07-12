import { CareerExtras } from "@/components/sections/career/career-extras";
import { CareerTimeline } from "@/components/sections/career/career-timeline";
import { CertificationGrid } from "@/components/sections/career/certification-grid";

const SECTION_TITLE = "경력과 자격으로 증명하는 신뢰";

const SECTION_DESCRIPTION =
  "실무 성과, 공식 자격증, 학력과 프로젝트까지 객관적 지표로 정리했습니다.";

export function CareerSection() {
  return (
    <section
      id="career"
      className="scroll-mt-20 border-t border-border px-6 py-16"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <header className="mx-auto max-w-2xl space-y-3 text-center">
          <p className="font-mono text-sm font-medium tracking-widest text-primary uppercase">
            Career
          </p>
          <h2 className="font-heading text-h2 font-semibold tracking-tight">
            {SECTION_TITLE}
          </h2>
          <p className="text-muted-foreground text-body leading-relaxed">
            {SECTION_DESCRIPTION}
          </p>
        </header>

        <CareerTimeline />
        <CertificationGrid />
        <CareerExtras />
      </div>
    </section>
  );
}
