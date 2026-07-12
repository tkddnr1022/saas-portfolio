import linksData from "./links.json";

export type LinkIcon = "github" | "blog" | "notion" | "mealio";

export type ExternalLink = {
  id: string;
  label: string;
  description: string;
  href: string;
  icon: LinkIcon;
  showInFooter: boolean;
};

export type LinksData = {
  contactEmail: string;
  resumeHref: string;
  externalLinks: ExternalLink[];
};

const data = linksData as LinksData;

export const CONTACT_EMAIL = data.contactEmail;

export const CONTACT_HREF = `mailto:${CONTACT_EMAIL}`;

export const RESUME_HREF = data.resumeHref;

/** 탐색용 외부 채널 4개. 연락(이메일)은 Links CTA로 분리. */
export const EXTERNAL_LINKS: ExternalLink[] = data.externalLinks;

export const FOOTER_LINKS = EXTERNAL_LINKS.filter((link) => link.showInFooter);
