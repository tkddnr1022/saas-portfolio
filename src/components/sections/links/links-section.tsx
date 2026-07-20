import { LinkCardGrid } from "@/components/sections/links/link-card-grid";
import { LinksCta } from "@/components/sections/links/links-cta";
import {
  SectionHeader,
  SectionShell,
} from "@/components/sections/section-header";

const SECTION_TITLE = "더 자세히 알아보고, 바로 연락하세요";

const SECTION_DESCRIPTION =
  "작업물과 글을 둘러보신 후, 이메일이나 오픈채팅으로 편하게 연락해 주세요.";


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
