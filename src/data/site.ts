import siteData from "./site.json";

export type SiteData = {
  name: string;
  title: string;
  description: string;
  fullName: string;
  jobTitle: string;
  yearsOfExperience: number;
  photoSrc: string;
  email: string;
  githubId: string;
  portfolioUrl: string;
};

const data = siteData as SiteData;

export const SITE_NAME = data.name;
export const SITE_TITLE = data.title;
export const SITE_DESCRIPTION = data.description;
export const SITE_FULL_NAME = data.fullName;
export const SITE_JOB_TITLE = data.jobTitle;
export const SITE_YEARS_OF_EXPERIENCE = data.yearsOfExperience;
export const SITE_PHOTO_SRC = data.photoSrc;
export const SITE_EMAIL = data.email;
export const SITE_GITHUB_ID = data.githubId;
export const SITE_GITHUB_URL = `https://github.com/${data.githubId}`;
export const SITE_PORTFOLIO_URL = data.portfolioUrl;

/** Absolute site origin for metadata, sitemap, and robots. */
export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (fromEnv) {
    return fromEnv;
  }

  const production = process.env.VERCEL_PROJECT_PRODUCTION_URL?.replace(/\/$/, "");
  if (production) {
    return `https://${production}`;
  }

  const vercel = process.env.VERCEL_URL?.replace(/\/$/, "");
  if (vercel) {
    return `https://${vercel}`;
  }

  return "http://localhost:3000";
}
