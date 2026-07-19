"use client";

import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { YEARLY_SAVINGS_PERCENT, type BillingPeriod } from "@/data/pricing";
import { cn } from "@/lib/utils";

type BillingToggleProps = {
  billingPeriod: BillingPeriod;
  onBillingPeriodChange: (period: BillingPeriod) => void;
};

export function BillingToggle({
  billingPeriod,
  onBillingPeriodChange,
}: BillingToggleProps) {
  const isYearly = billingPeriod === "yearly";

  return (
    <div className="flex w-full flex-wrap items-center justify-end gap-3 h-6">
      {isYearly ? (
        <Badge variant="secondary">{YEARLY_SAVINGS_PERCENT}% 절약</Badge>
      ) : null}

      <span
        className={cn(
          "text-sm font-medium transition-colors pt-[3px]",
          !isYearly ? "text-foreground" : "text-muted-foreground",
        )}
      >
        월간
      </span>

      <Switch
        aria-label={
          isYearly
            ? "연간 요금제 선택됨. 월간으로 전환"
            : "월간 요금제 선택됨. 연간으로 전환"
        }
        checked={isYearly}
        onCheckedChange={(checked) =>
          onBillingPeriodChange(checked ? "yearly" : "monthly")
        }
      />

      <span
        className={cn(
          "text-sm font-medium transition-colors pt-[3px]",
          isYearly ? "text-foreground" : "text-muted-foreground",
        )}
      >
        연간
      </span>
    </div>
  );
}
