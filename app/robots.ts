import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site-config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Internal API + the standalone logo-lab tool shouldn't be crawled.
        disallow: ["/api/", "/logo-lab"],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}

