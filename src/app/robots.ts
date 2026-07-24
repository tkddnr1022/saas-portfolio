import type { MetadataRoute } from "next";

import { getSiteUrl } from "@/data/site";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = getSiteUrl();

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/", "/resume"],
    },
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
