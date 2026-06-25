import type { MetadataRoute } from "next";
import { siteUrl } from "@/lib/site-config";

const aiCrawlers = ["GPTBot", "ClaudeBot", "PerplexityBot"] as const;

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/logo-lab", "/admin/", "/quote/", "/portal"],
      },
      ...aiCrawlers.map((userAgent) => ({
        userAgent,
        allow: "/" as const,
        disallow: ["/api/", "/admin/", "/quote/", "/portal"],
      })),
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}