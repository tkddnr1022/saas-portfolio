import siteData from "./site.json";

export type SiteData = {
  name: string;
};

const data = siteData as SiteData;

export const SITE_NAME = data.name;
