import { LinkCardGrid } from "@/components/sections/links/link-card-grid";
import { LinksCta } from "@/components/sections/links/links-cta";
import {
  SectionHeader,
  SectionShell,
} from "@/components/sections/section-header";

const SECTION_TITLE = "더 자세히 알아보고, 바로 연락하세요";

const SECTION_DESCRIPTION =
  "GitHub·블로그·노션·Mealio를 살펴본 뒤, 이메일로 문의하거나 이력서를 내려받을 수 있습니다.";

export function LinksSection() {
  return (
    <SectionShell id="links">
      <SectionHeader
        sectionId="links"
        eyebrow="Links"
        title={SECTION_TITLE}
        description={SECTION_DESCRIPTION}
      />
      <LinkCardGrid />
      <LinksCta />
    </SectionShell>
  );
}
