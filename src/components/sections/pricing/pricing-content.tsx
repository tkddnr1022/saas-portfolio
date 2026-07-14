"use client";

import { useState } from "react";

import { PRICING_PLANS, type BillingPeriod } from "@/data/pricing";

import { BillingToggle } from "./billing-toggle";
import { PlanCard } from "./plan-card";

type PricingContentProps = {
  showSalary: boolean;
};

export function PricingContent({ showSalary }: PricingContentProps) {
  const [billingPeriod, setBillingPeriod] =
    useState<BillingPeriod>("yearly");

  return (
    <div className="flex w-full flex-col gap-10">
      <BillingToggle
        billingPeriod={billingPeriod}
        onBillingPeriodChange={setBillingPeriod}
      />

      <div className="grid w-full gap-6 md:grid-cols-3">
        {PRICING_PLANS.map((plan, index) => (
          <PlanCard
            key={plan.id}
            billingPeriod={billingPeriod}
            index={index}
            plan={plan}
            showSalary={showSalary}
          />
        ))}
      </div>
    </div>
  );
}
