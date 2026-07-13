import siteData from "./site.json";

export type SiteData = {
  name: string;
  title: string;
  description: string;
};

const data = siteData as SiteData;

export const SITE_NAME = data.name;
export const SITE_TITLE = data.title;
export const SITE_DESCRIPTION = data.description;

/** Absolute site origin for metadata, sitemap, and robots. */
export function getSiteUrl(): string {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "");
  if (fromEnv) {
    return fromEnv;
  }

  const production = process.env.VERCEL_PROJECT_PRODUCTION_URL?.replace(
    /\/$/,
    "",
  );
  if (production) {
    return `https://${production}`;
  }

  const vercel = process.env.VERCEL_URL?.replace(/\/$/, "");
  if (vercel) {
    return `https://${vercel}`;
  }

  return "http://localhost:3000";
}
