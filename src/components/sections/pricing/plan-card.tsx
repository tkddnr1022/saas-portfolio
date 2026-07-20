"use client";

import { Check } from "lucide-react";

import { Reveal } from "@/components/motion/reveal";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  CONTACT_HREF,
  formatPrice,
  getYearlyPrice,
  type BillingPeriod,
  type Plan,
} from "@/data/pricing";
import { cn } from "@/lib/utils";

type PlanCardProps = {
  plan: Plan;
  billingPeriod: BillingPeriod;
  showSalary: boolean;
  index?: number;
};

function getPriceLabel(plan: Plan, billingPeriod: BillingPeriod, showSalary: boolean): string {
  if (!showSalary) {
    return "협의";
  }

  const yearlyPrice = getYearlyPrice(plan);

  if (plan.monthlyPrice === null || yearlyPrice === null) {
    return "협의";
  }

  const amount = billingPeriod === "monthly" ? plan.monthlyPrice : yearlyPrice;

  return formatPrice(amount, billingPeriod);
}

export function PlanCard({ plan, billingPeriod, showSalary, index = 0 }: PlanCardProps) {
  const priceLabel = getPriceLabel(plan, billingPeriod, showSalary);

  return (
    <Reveal as="article" index={index} className="h-full">
      <div
        className={cn(
          "relative flex h-full flex-col rounded-xl border bg-card p-6 transition-[border-color,box-shadow,background] duration-300",
          plan.popular
            ? "border-primary bg-[linear-gradient(to_bottom,color-mix(in_oklch,var(--primary)_8%,transparent),var(--card))] shadow-[0_0_0_1px_color-mix(in_oklch,var(--primary)_18%,transparent)]"
            : "border-border",
        )}
      >
        {plan.popular ? (
          <Badge className="absolute -top-3 left-1/2 -translate-x-1/2">Most Popular</Badge>
        ) : null}

        <div className="space-y-1">
          <h3 className="font-heading text-h3 font-semibold tracking-tight">{plan.name}</h3>
          <p className="text-muted-foreground text-sm">{plan.description}</p>
        </div>

        <p className="mt-6 font-heading text-h2 font-semibold tracking-tight">{priceLabel}</p>

        <ul className="mt-6 flex flex-1 flex-col gap-3">
          {plan.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2 text-sm">
              <Check aria-hidden="true" className="mt-0.5 size-4 shrink-0 text-primary" />
              <span>{feature}</span>
            </li>
          ))}
        </ul>

        <Button
          className="mt-8 w-full"
          nativeButton={false}
          render={<a href={CONTACT_HREF} />}
          variant={plan.popular ? "default" : "outline"}
        >
          <span>문의하기</span>
        </Button>
      </div>
    </Reveal>
  );
}
