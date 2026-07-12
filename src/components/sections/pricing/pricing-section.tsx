import { showSalary } from "@/lib/env";

import { PricingContent } from "./pricing-content";

const SECTION_TITLE = "희망 연봉, SaaS처럼 투명하게";

const SECTION_DESCRIPTION =
  "정규직·프리랜서·단기 계약까지, 협의 범위를 요금제 형태로 정리했습니다. 명시된 모든 조건은 조율이 가능합니다.";

export function PricingSection() {
  return (
    <section
      id="pricing"
      className="scroll-mt-20 border-t border-border px-6 py-16"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <header className="mx-auto max-w-2xl space-y-3 text-center">
          <p className="font-mono text-sm font-medium tracking-widest text-primary uppercase">
            Pricing
          </p>
          <h2 className="font-heading text-h2 font-semibold tracking-tight">
            {SECTION_TITLE}
          </h2>
          <p className="text-muted-foreground text-body leading-relaxed">
            {SECTION_DESCRIPTION}
          </p>
        </header>

        <PricingContent showSalary={showSalary} />
      </div>
    </section>
  );
}
