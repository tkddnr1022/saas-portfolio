import { LinkCardGrid } from "@/components/sections/links/link-card-grid";
import { LinksCta } from "@/components/sections/links/links-cta";

const SECTION_TITLE = "더 자세히 알아보고, 바로 연락하세요";

const SECTION_DESCRIPTION =
  "GitHub·블로그·노션·Mealio를 살펴본 뒤, 이메일로 문의하거나 이력서를 내려받을 수 있습니다.";

export function LinksSection() {
  return (
    <section
      id="links"
      className="scroll-mt-20 border-t border-border px-6 py-16"
    >
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <header className="mx-auto max-w-2xl space-y-3 text-center">
          <p className="font-mono text-sm font-medium tracking-widest text-primary uppercase">
            Links
          </p>
          <h2 className="font-heading text-h2 font-semibold tracking-tight">
            {SECTION_TITLE}
          </h2>
          <p className="text-muted-foreground text-body leading-relaxed">
            {SECTION_DESCRIPTION}
          </p>
        </header>

        <LinkCardGrid />
        <LinksCta />
      </div>
    </section>
  );
}
