import { SkillsContent } from "@/components/sections/skills/skills-content";

const SECTION_TITLE = "올라운더 역량, 숫자로 보여드립니다";

const SECTION_DESCRIPTION =
  "Frontend부터 PM까지 5개 영역의 숙련도를 탭으로 탐색할 수 있습니다. 기술 태그에 마우스를 올리면 사용 기간과 주요 컨텍스트를 확인할 수 있습니다.";

export function SkillsSection() {
  return (
    <section
      id="skills"
      className="scroll-mt-20 border-t border-border px-6 py-16"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <header className="mx-auto max-w-2xl space-y-3 text-center">
          <p className="font-mono text-sm font-medium tracking-widest text-primary uppercase">
            Skills
          </p>
          <h2 className="font-heading text-h2 font-semibold tracking-tight">
            {SECTION_TITLE}
          </h2>
          <p className="text-muted-foreground text-body leading-relaxed">
            {SECTION_DESCRIPTION}
          </p>
        </header>

        <SkillsContent />
      </div>
    </section>
  );
}
