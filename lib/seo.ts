import type { Metadata } from "next";
import { regions } from "@/lib/regions";
import { siteName, siteUrl } from "@/lib/site-config";

/** Served by `app/opengraph-image.tsx` at 1200×630. */
export const ogImagePath = "/opengraph-image";

/** Routes with a dedicated opengraph-image.tsx file. Everything else uses the site default. */
const routeOgImagePath: Record<string, string> = {
  "/": "/opengraph-image",
  "/piano-movers": "/piano-movers/opengraph-image",
  "/piano-movers/auckland": "/piano-movers/auckland/opengraph-image",
  "/piano-movers/hamilton": "/piano-movers/hamilton/opengraph-image",
};

export function resolveOgImagePath(path: string): string {
  const normalized = path.replace(/\/$/, "") || "/";
  return routeOgImagePath[normalized] ?? "/opengraph-image";
}

/** Layout defaults — no images here; each route sets its own share art. */
export const rootOpenGraph: NonNullable<Metadata["openGraph"]> = {
  type: "website",
  locale: "en_NZ",
  siteName,
  title: regions.sharePreviewTitle,
  description: regions.layoutDescription,
};

export const rootTwitter: NonNullable<Metadata["twitter"]> = {
  card: "summary_large_image",
  title: regions.sharePreviewTitle,
  description: regions.layoutDescription,
};

type PageMetadataInput = {
  title: string | { absolute: string };
  description: string;
  path: string;
  openGraphTitle?: string;
  openGraphDescription?: string;
  openGraphType?: "website" | "article";
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
  const ogImage = resolveOgImagePath(input.path);

  return {
    title: input.title,
    description: input.description,
    alternates: { canonical: input.path },
    openGraph: {
      type: input.openGraphType ?? "website",
      locale: "en_NZ",
      siteName,
      url: `${siteUrl}${input.path}`,
      title: ogTitle,
      description: ogDescription,
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: ogTitle,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: ogTitle,
      description: ogDescription,
      images: [ogImage],
    },
    ...(input.robots ? { robots: input.robots } : {}),
  };
}
