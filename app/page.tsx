import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { hireStatus, showSalary } from "@/lib/env";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 px-6 py-16">
      <Badge variant="secondary">{hireStatus}</Badge>
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-semibold tracking-tight">SaaS Portfolio</h1>
        <p className="text-muted-foreground max-w-md text-sm">
          Phase 1 setup complete. Section components will be added in upcoming tasks.
        </p>
      </div>
      <Button type="button" variant="outline">
        Salary visibility: {showSalary ? "public" : "private"}
      </Button>
    </main>
  );
}
