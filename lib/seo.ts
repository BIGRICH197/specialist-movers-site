import type { Metadata } from "next";
import { regions } from "@/lib/regions";
import { siteName, siteUrl } from "@/lib/site-config";

/** Served by `app/opengraph-image.tsx` at 1200×630. */
export const ogImagePath = "/opengraph-image";

const ogImageAlt = `${siteName}, Auckland and Hamilton house and piano movers`;

const defaultOpenGraphImages = [
  {
    url: ogImagePath,
    width: 1200,
    height: 630,
    alt: ogImageAlt,
  },
] as const;

export const rootOpenGraph: NonNullable<Metadata["openGraph"]> = {
  type: "website",
  locale: "en_NZ",
  siteName,
  title: "Specialist Movers NZ | Auckland & Waikato Movers",
  description: regions.layoutDescription,
  images: [...defaultOpenGraphImages],
};

export const rootTwitter: NonNullable<Metadata["twitter"]> = {
  card: "summary_large_image",
  title: "Specialist Movers NZ | Auckland & Waikato Movers",
  description: regions.layoutDescription,
  images: [ogImagePath],
};

type PageMetadataInput = {
  title: string | { absolute: string };
  description: string;
  path: string;
  openGraphTitle?: string;
  openGraphDescription?: string;
  robots?: Metadata["robots"];
};

export function resolveTitle(title: PageMetadataInput["title"]): string {
  return typeof title === "string" ? title : title.absolute;
}

/** Per-route metadata with canonical, Open Graph, and Twitter cards. */
export function buildPageMetadata(input: PageMetadataInput): Metadata {
  const resolvedTitle = resolveTitle(input.title);
  const ogTitle = input.openGraphTitle ?? resolvedTitle;
  const ogDescription = input.openGraphDescription ?? input.description;

  return {
    title: input.title,
    description: input.description,
    alternates: { canonical: input.path },
    openGraph: {
      type: "website",
      locale: "en_NZ",
      siteName,
      url: `${siteUrl}${input.path}`,
      title: ogTitle,
      description: ogDescription,
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDescription,
    },
    ...(input.robots ? { robots: input.robots } : {}),
  };
}
