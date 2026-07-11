export type BillingPeriod = "monthly" | "yearly";

export type PlanId = "starter" | "professional" | "enterprise";

export type Plan = {
  id: PlanId;
  name: string;
  description: string;
  features: string[];
  monthlyPrice: number | null;
  yearlyPrice: number | null;
  popular?: boolean;
};

export const YEARLY_SAVINGS_PERCENT = 10;

export const CONTACT_EMAIL = "hello@example.com";

export const CONTACT_HREF = `mailto:${CONTACT_EMAIL}`;

export const PRICING_PLANS: Plan[] = [
  {
    id: "starter",
    name: "Starter",
    description: "프리랜서 / 단기 계약",
    features: ["특정 도메인 개발", "코드 리뷰", "프로젝트별 범위 협의"],
    monthlyPrice: null,
    yearlyPrice: null,
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
    monthlyPrice: 700,
    yearlyPrice: 7560,
    popular: true,
  },
  {
    id: "enterprise",
    name: "Enterprise",
    description: "정규직 + α",
    features: [
      "무한한 가능성"
    ],
    monthlyPrice: 850,
    yearlyPrice: 9180,
  },
];

export function formatPrice(amount: number, period: BillingPeriod): string {
  const prefix = period === "monthly" ? "월" : "연";
  return `${prefix} ${amount.toLocaleString("ko-KR")}만원`;
}
