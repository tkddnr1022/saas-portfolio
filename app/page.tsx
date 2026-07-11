import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { hireStatus, showSalary } from "@/lib/env";

const sections = [
  { id: "hero", label: "Hero", minHeight: "min-h-screen" },
  { id: "pricing", label: "Pricing", minHeight: "min-h-[50vh]" },
  { id: "skills", label: "Skills", minHeight: "min-h-[50vh]" },
  { id: "career", label: "Career", minHeight: "min-h-[50vh]" },
  { id: "links", label: "Links", minHeight: "min-h-[50vh]" },
] as const;

export default function Home() {
  return (
    <main>
      <section
        id="hero"
        className="scroll-mt-20 flex min-h-screen flex-col items-center justify-center gap-6 px-6 py-16"
      >
        <Badge variant="secondary">{hireStatus}</Badge>
        <div className="space-y-2 text-center">
          <h1 className="font-heading text-h2 font-semibold sm:text-h1">SaaS Portfolio</h1>
          <p className="text-muted-foreground max-w-md text-body">
            Phase 1 setup complete. Section components will be added in upcoming tasks.
          </p>
        </div>
        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button type="button">Primary token</Button>
          <Button type="button" variant="outline">
            Salary visibility: {showSalary ? "public" : "private"}
          </Button>
        </div>
      </section>

      {sections.slice(1).map((section) => (
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
