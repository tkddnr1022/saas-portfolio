import {
  SectionHeader,
  SectionShell,
} from "@/components/sections/section-header";
import { showSalary } from "@/lib/env";

import { PricingContent } from "./pricing-content";

const SECTION_TITLE = "희망 연봉, SaaS처럼 투명하게";

const SECTION_DESCRIPTION =
  "정규직·프리랜서·단기 계약까지, 협의 범위를 요금제 형태로 정리했습니다. 명시된 모든 조건은 조율이 가능합니다.";

export function PricingSection() {
  return (
    <SectionShell id="pricing">
      <SectionHeader
        sectionId="pricing"
        eyebrow="Pricing"
        title={SECTION_TITLE}
        description={SECTION_DESCRIPTION}
      />
      <PricingContent showSalary={showSalary} />
    </SectionShell>
  );
}
