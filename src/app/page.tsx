import { CareerSection } from "@/components/sections/career/career-section";
import { ChatSection } from "@/components/sections/chat/chat-section";
import { HeroSection } from "@/components/sections/hero/hero-section";
import { LinksSection } from "@/components/sections/links/links-section";
import { PricingSection } from "@/components/sections/pricing/pricing-section";
import { SkillsSection } from "@/components/sections/skills/skills-section";

export default function Home() {
  return (
    <main id="main-content" tabIndex={-1} className="outline-none">
      <HeroSection />
      <PricingSection />
      <SkillsSection />
      <ChatSection />
      <CareerSection />
      <LinksSection />
    </main>
  );
}
