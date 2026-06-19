import type { Metadata } from "next";
import { buildPageMetadata } from "@/lib/seo";
import { notFound } from "next/navigation";
import { LocationPageTemplate } from "@/components/LocationPageTemplate";
import { getLocation, getLocationSlugs } from "@/lib/locations";
import { isIndexedLocation } from "@/lib/location-index-policy";

export function generateStaticParams() {
  return getLocationSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const location = getLocation(params.slug);
  if (!location) return {};
  return buildPageMetadata({
    title: location.metaTitle,
    description: location.metaDescription,
    path: `/locations/${location.slug}`,
    // Thin/templated long-tail pages: keep live for users + internal links,
    // but don't let Google index near-duplicate content.
    robots: isIndexedLocation(location.slug)
      ? undefined
      : { index: false, follow: true },
  });
}

export default function LocationDetailPage({ params }: { params: { slug: string } }) {
  const location = getLocation(params.slug);
  if (!location) notFound();
  return <LocationPageTemplate location={location} />;
}
