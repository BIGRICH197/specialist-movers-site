import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LocationPageTemplate } from "@/components/LocationPageTemplate";
import { getLocation, getLocationSlugs } from "@/lib/locations";

export function generateStaticParams() {
  return getLocationSlugs().map((slug) => ({ slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const location = getLocation(params.slug);
  if (!location) return {};
  return {
    title: location.metaTitle,
    description: location.metaDescription,
  };
}

export default function LocationDetailPage({ params }: { params: { slug: string } }) {
  const location = getLocation(params.slug);
  if (!location) notFound();
  return <LocationPageTemplate location={location} />;
}
