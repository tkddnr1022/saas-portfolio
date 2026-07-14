import { SkillsContent } from "@/components/sections/skills/skills-content";
import {
  SectionHeader,
  SectionShell,
} from "@/components/sections/section-header";

const SECTION_TITLE = "올라운더 역량, 숫자로 보여드립니다";

const SECTION_DESCRIPTION =
  "Frontend부터 Design까지 4개 영역의 숙련도를 탭으로 탐색할 수 있습니다. 기술 태그에 마우스를 올리면 경험 기간과 주요 컨텍스트를 확인할 수 있습니다.";

export function SkillsSection() {
  return (
    <SectionShell id="skills">
      <SectionHeader
        eyebrow="Skills"
        title={SECTION_TITLE}
        description={SECTION_DESCRIPTION}
      />
      <SkillsContent />
    </SectionShell>
  );
}
