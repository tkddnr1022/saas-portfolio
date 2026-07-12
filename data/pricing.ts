import pricingData from "./pricing.json";

export type BillingPeriod = "monthly" | "yearly";

export type PlanId = "starter" | "professional" | "enterprise";

export type Plan = {
  id: PlanId;
  name: string;
  description: string;
  features: string[];
  monthlyPrice: number | null;
  yearlyDiscountPercent: number;
  popular?: boolean;
};

export type PricingData = {
  yearlySavingsPercent: number;
  plans: Plan[];
};

const data = pricingData as PricingData;

export const YEARLY_SAVINGS_PERCENT = data.yearlySavingsPercent;

export { CONTACT_EMAIL, CONTACT_HREF } from "@/data/links";

export const PRICING_PLANS: Plan[] = data.plans;

export function getYearlyPrice(plan: Plan): number | null {
  if (plan.monthlyPrice === null) {
    return null;
  }

  const annual = plan.monthlyPrice * 12;
  return Math.round(annual * (1 - plan.yearlyDiscountPercent / 100));
}

export function formatPrice(amount: number, period: BillingPeriod): string {
  const prefix = period === "monthly" ? "월" : "연";
  return `${prefix} ${amount.toLocaleString("ko-KR")}만원`;
}
