import { HeroSection } from "@/components/sections/hero/hero-section";
import { PricingSection } from "@/components/sections/pricing/pricing-section";

const sections = [
  { id: "skills", label: "Skills", minHeight: "min-h-[50vh]" },
  { id: "career", label: "Career", minHeight: "min-h-[50vh]" },
  { id: "links", label: "Links", minHeight: "min-h-[50vh]" },
] as const;

export default function Home() {
  return (
    <main>
      <HeroSection />
      <PricingSection />

      {sections.map((section) => (
        <section
          key={section.id}
          id={section.id}
          className={`scroll-mt-20 ${section.minHeight} flex items-center justify-center border-t border-border px-6 py-16`}
        >
          <p className="text-muted-foreground text-body">{section.label} section placeholder</p>
        </section>
      ))}
    </main>
  );
}
