import type { MetadataRoute } from "next";
import { getLocationSlugs } from "@/lib/locations";
import { isIndexedLocation } from "@/lib/location-index-policy";
import {
  clusterItemPath,
  movingDistanceHub,
  movingDistanceServices,
  storageHub,
  storageServices,
  whatsIncludedPage,
} from "@/lib/service-clusters";
import { listHamiltonPaths } from "@/lib/hamilton-pages";
import { legacyPathForServiceSlug } from "@/lib/legacy-auckland-urls";
import { blogPosts, pianoServices, services } from "@/lib/site-data";
import { siteUrl } from "@/lib/site-config";
import { routeLastModified } from "@/lib/content-dates";

const staticRoutes = [
  "",
  "/services",
  "/piano-movers",
  "/piano-movers/auckland",
  "/reviews",
  "/faq",
  "/pricing",
  "/movers-near-me",
  "/about",
  "/why-us",
  "/blog",
  "/contact",
  "/policies",
  "/locations",
  "/apartment-movers-auckland",
  "/furniture-movers-auckland",
  "/furniture-movers-hamilton",
  "/retirement-home-movers-auckland",
  "/retirement-home-movers-hamilton",
  "/international-moving/moving-to-australia",
  "/kitchen-and-joinery-delivery",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = staticRoutes.map((route) => ({
    url: `${siteUrl}${route}`,
    lastModified: routeLastModified(route || "/"),
    changeFrequency: route === "" ? "weekly" : "weekly",
    priority: route === "" ? 1 : route === "/piano-movers" ? 0.9 : 0.7,
  }));

  entries.push({
    url: `${siteUrl}${whatsIncludedPage.path}`,
    lastModified: routeLastModified(whatsIncludedPage.path),
    changeFrequency: "monthly",
    priority: 0.8,
  });

  entries.push({
    url: `${siteUrl}${movingDistanceHub.path}`,
    lastModified: routeLastModified(movingDistanceHub.path),
    changeFrequency: "weekly",
    priority: 0.8,
  });

  for (const item of movingDistanceServices) {
    entries.push({
      url: `${siteUrl}${clusterItemPath(movingDistanceHub.path, item)}`,
      lastModified: routeLastModified(clusterItemPath(movingDistanceHub.path, item)),
      changeFrequency: "weekly",
      priority: 0.75,
    });
  }

  entries.push({
    url: `${siteUrl}${storageHub.path}`,
    lastModified: routeLastModified(storageHub.path),
    changeFrequency: "weekly",
    priority: 0.75,
  });

  for (const item of storageServices) {
    const path = item.href ?? `${storageHub.path}/${item.slug}`;
    entries.push({
      url: `${siteUrl}${path}`,
      lastModified: routeLastModified(path),
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  for (const service of services) {
    if (service.slug === "piano-movers") continue;
    const legacyPath = legacyPathForServiceSlug(service.slug);
    entries.push({
      url: `${siteUrl}${legacyPath ?? `/services/${service.slug}`}`,
      lastModified: routeLastModified(legacyPath ?? `/services/${service.slug}`),
      changeFrequency: "weekly",
      priority: 0.75,
    });
  }

  for (const piano of pianoServices) {
    entries.push({
      url: `${siteUrl}/piano-movers/${piano.slug}`,
      lastModified: routeLastModified(`/piano-movers/${piano.slug}`),
      changeFrequency: "monthly",
      priority: 0.65,
    });
  }

  for (const path of listHamiltonPaths()) {
    entries.push({
      url: `${siteUrl}${path}`,
      lastModified: routeLastModified(path),
      changeFrequency: "weekly",
      priority: 0.85,
    });
  }

  for (const slug of getLocationSlugs()) {
    if (!isIndexedLocation(slug)) continue;
    entries.push({
      url: `${siteUrl}/locations/${slug}`,
      lastModified: routeLastModified(`/locations/${slug}`),
      changeFrequency: "monthly",
      priority: 0.7,
    });
  }

  for (const post of blogPosts) {
    entries.push({
      url: `${siteUrl}/blog/${post.slug}`,
      lastModified: routeLastModified(`/blog/${post.slug}`, post.publishedDate),
      changeFrequency: "monthly",
      priority: 0.5,
    });
  }

  const seen = new Set<string>();
  return entries.filter((entry) => {
    if (seen.has(entry.url)) return false;
    seen.add(entry.url);
    return true;
  });
}
