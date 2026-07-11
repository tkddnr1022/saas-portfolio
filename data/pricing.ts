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

export const YEARLY_SAVINGS_PERCENT = 10;

export { CONTACT_EMAIL, CONTACT_HREF } from "@/data/links";

export const PRICING_PLANS: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    description: "프리랜서 / 단기 계약",
    features: ["특정 도메인 개발", "코드 리뷰", "프로젝트별 범위 협의"],
    monthlyPrice: null,
    yearlyDiscountPercent: YEARLY_SAVINGS_PERCENT,
  },
  {
    id: "professional",
    name: "Professional",
    description: "정규직",
    features: [
      "FE·BE·DevOps 전 영역",
      "온보딩 2주 포함",
      "주 5일 풀타임 투입",
    ],
    monthlyPrice: 320,
    yearlyDiscountPercent: YEARLY_SAVINGS_PERCENT,
    popular: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "정규직 + α",
    features: [
      "무한한 잠재력",
      "빠르게 흡수하는 학습 속도",
      "정해지지 않은 성장 상한선",
    ],
    monthlyPrice: null,
    yearlyDiscountPercent: YEARLY_SAVINGS_PERCENT,
  },
];

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
