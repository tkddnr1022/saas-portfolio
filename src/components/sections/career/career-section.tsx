import { CareerExtras } from "@/components/sections/career/career-extras";
import { CareerTimeline } from "@/components/sections/career/career-timeline";
import {
  SectionHeader,
  SectionShell,
} from "@/components/sections/section-header";

const SECTION_TITLE = "경력과 자격으로 증명하는 신뢰";

const SECTION_DESCRIPTION =
  "실무 성과, 공식 자격증, 학력과 언어 능력까지 객관적 지표로 정리했습니다.";

export function CareerSection() {
  return (
    <SectionShell id="career">
      <SectionHeader
        sectionId="career"
        eyebrow="Career"
        title={SECTION_TITLE}
        description={SECTION_DESCRIPTION}
      />
      <CareerTimeline />
      <CareerExtras />
    </SectionShell>
  );
}
