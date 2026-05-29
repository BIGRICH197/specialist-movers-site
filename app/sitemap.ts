import type { MetadataRoute } from "next";
import { getLocationSlugs } from "@/lib/locations";
import {
  clusterItemPath,
  movingDistanceHub,
  movingDistanceServices,
  storageHub,
  storageServices,
  whatsIncludedPage,
} from "@/lib/service-clusters";
import { blogPosts, pianoServices, services } from "@/lib/site-data";
import { siteUrl } from "@/lib/site-config";

const staticRoutes = [
  "",
  "/services",
  "/piano-movers",
  "/reviews",
  "/faq",
  "/about",
  "/why-us",
  "/blog",
  "/contact",
  "/policies",
  "/locations",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const entries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: now,
    changeFrequency: route === "" ? "weekly" : "weekly",
    priority: route === "" ? 1 : route === "/piano-movers" ? 0.9 : 0.7,
  }));

  entries.push({
    url: `${siteUrl}${whatsIncludedPage.path}`,
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  });

  entries.push({
    url: `${siteUrl}${movingDistanceHub.path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  });

  for (const item of movingDistanceServices) {
    entries.push({
      url: `${siteUrl}${clusterItemPath(movingDistanceHub.path, item)}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.75,
    });
  }

  entries.push({
    url: `${siteUrl}${storageHub.path}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.75,
  });

  for (const item of storageServices) {
    const path = item.href ?? `${storageHub.path}/${item.slug}`;
    entries.push({
      url: `${siteUrl}${path}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  for (const service of services) {
    if (service.slug === "piano-movers") continue;
    entries.push({
      url: `${siteUrl}/services/${service.slug}`,
      lastModified: now,
      changeFrequency: "weekly",
      priority: 0.75,
    });
  }

  for (const piano of pianoServices) {
    entries.push({
      url: `${siteUrl}/piano-movers/${piano.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.65,
    });
  }

  for (const slug of getLocationSlugs()) {
    entries.push({
      url: `${siteUrl}/locations/${slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  for (const post of blogPosts) {
    entries.push({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: now,
      changeFrequency: "monthly",
      priority: 0.5,
    });
  }

  return entries;
}
