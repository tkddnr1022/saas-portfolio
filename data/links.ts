export type LinkIcon = "github" | "blog" | "notion" | "mealio";

export type ExternalLink = {
  id: string;
  label: string;
  description: string;
  href: string;
  icon: LinkIcon;
  showInFooter: boolean;
};

export const CONTACT_EMAIL = "hello@example.com";

export const CONTACT_HREF = `mailto:${CONTACT_EMAIL}`;

export const RESUME_HREF = "/resume.pdf";

/** 탐색용 외부 채널 4개. 연락(이메일)은 Links CTA로 분리. */
export const EXTERNAL_LINKS: ExternalLink[] = [
  {
    id: "github",
    label: "GitHub",
    description: "코드 품질과 기여 이력을 확인하세요",
    href: "https://github.com/example",
    icon: "github",
    showInFooter: true,
  },
  {
    id: "blog",
    label: "기술 블로그",
    description: "사고방식과 글쓰기 능력을 살펴보세요",
    href: "https://blog.example.com",
    icon: "blog",
    showInFooter: true,
  },
  {
    id: "notion",
    label: "노션 포트폴리오",
    description: "프로젝트 상세 문서를 확인하세요",
    href: "https://notion.example.com/portfolio",
    icon: "notion",
    showInFooter: true,
  },
  {
    id: "mealio",
    label: "Mealio",
    description: "사이드 프로젝트를 구경해보세요",
    href: "https://mealio.site",
    icon: "mealio",
    showInFooter: true,
  },
];

export const FOOTER_LINKS = EXTERNAL_LINKS.filter((link) => link.showInFooter);
