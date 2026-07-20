import { Badge } from "@/components/ui/badge";
import { hireStatus, type HireStatus } from "@/lib/env";
import { cn } from "@/lib/utils";

const HIRE_STATUS_LABELS: Record<HireStatus, string> = {
  available: "Available for hire",
  open_to_work: "Open to work",
  unavailable: "Currently unavailable",
};

const HIRE_STATUS_VARIANTS: Record<HireStatus, "default" | "secondary" | "outline"> = {
  available: "default",
  open_to_work: "secondary",
  unavailable: "outline",
};

const ACTIVE_STATUSES: HireStatus[] = ["available", "open_to_work"];

export function HireStatusBadge() {
  const isActive = ACTIVE_STATUSES.includes(hireStatus);

  return (
    <Badge
      variant={HIRE_STATUS_VARIANTS[hireStatus]}
      className={cn("gap-1.5 px-3 py-1 text-xs font-medium", !isActive && "text-muted-foreground")}
    >
      {isActive && (
        <span aria-hidden="true" className="relative flex size-2 shrink-0">
          <span className="absolute inline-flex size-full animate-ping rounded-full bg-current opacity-40" />
          <span className="relative inline-flex size-2 rounded-full bg-current" />
        </span>
      )}
      {HIRE_STATUS_LABELS[hireStatus]}
    </Badge>
  );
}
