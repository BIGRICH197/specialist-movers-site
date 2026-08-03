import { brandAssets } from "@/lib/brand-assets";
import { businessInfo } from "@/lib/business-info";
import { googleReviewsUrl } from "@/lib/legacy-site-content";
import { regions } from "@/lib/regions";
import { aggregateRatingSchema } from "@/lib/schema-rating";
import { phoneNumber } from "@/lib/site-data";
import { siteName, siteUrl } from "@/lib/site-config";

/**
 * Canonical @id anchors.
 *
 * Before this, every page emitted the business 2–5 times as structurally
 * distinct nodes with different property subsets (/about alone emitted five),
 * and BlogPosting.publisher was typed Organization while everything else was
 * MovingCompany — which to a strict consumer reads as two companies. Stable
 * @ids let every node point at one entity instead of restating it.
 */
export const schemaIds = {
  organization: `${siteUrl}/#organization`,
  website: `${siteUrl}/#website`,
  aucklandDepot: `${siteUrl}/#depot-auckland`,
  hamiltonDepot: `${siteUrl}/#depot-hamilton`,
} as const;

/** E.164 for NZ mobile 021… */
export const phoneE164 = `+64${phoneNumber.replace(/^0/, "")}`;

function openingHoursSpecification() {
  return businessInfo.openingHoursSpec.map((slot) => ({
    "@type": "OpeningHoursSpecification",
    dayOfWeek: [...slot.days],
    opens: slot.opens,
    closes: slot.closes,
  }));
}

function areaServed() {
  return businessInfo.areaServed.map((area) => ({
    "@type": area.type,
    name: area.name,
  }));
}

/**
 * The one business node. `withRating` is deliberate: aggregateRating used to
 * be stamped onto all 101 URLs including blog posts, /policies and 46 location
 * pages where no rating is rendered anywhere on the page. "Structured data not
 * visible to users" is a documented manual-action trigger, and MovingCompany
 * inherits from LocalBusiness, which has been ineligible for review rich
 * results since Google's 2019 self-serving-review restriction anyway. So the
 * rating goes only where it is actually on screen, and carries a url so the
 * count is verifiable rather than circular.
 */
export function organizationNode({ withRating = false }: { withRating?: boolean } = {}) {
  return {
    "@type": "MovingCompany",
    "@id": schemaIds.organization,
    name: siteName,
    legalName: businessInfo.legalName,
    description: regions.jsonLdDescription,
    url: siteUrl,
    foundingDate: businessInfo.foundingDate,
    telephone: phoneE164,
    email: businessInfo.email,
    image: `${siteUrl}${brandAssets.logomarkPurple}`,
    address: {
      "@type": "PostalAddress",
      ...businessInfo.aucklandAddress,
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: businessInfo.geo.auckland.latitude,
      longitude: businessInfo.geo.auckland.longitude,
    },
    openingHoursSpecification: openingHoursSpecification(),
    areaServed: areaServed(),
    location: [
      { "@id": schemaIds.aucklandDepot },
      { "@id": schemaIds.hamiltonDepot },
    ],
    priceRange: "$$",
    sameAs: [...businessInfo.sameAs],
    ...(withRating
      ? {
          aggregateRating: {
            ...aggregateRatingSchema,
            url: googleReviewsUrl,
          },
        }
      : {}),
  };
}

/** Both depots as Place nodes. Hamilton had no schema representation at all,
 *  despite hamiltonAddress and geo.hamilton being defined and never consumed. */
export function depotNodes() {
  return [
    {
      "@type": "Place",
      "@id": schemaIds.aucklandDepot,
      name: "Specialist Movers — Auckland depot",
      address: { "@type": "PostalAddress", ...businessInfo.aucklandAddress },
      geo: {
        "@type": "GeoCoordinates",
        latitude: businessInfo.geo.auckland.latitude,
        longitude: businessInfo.geo.auckland.longitude,
      },
    },
    {
      "@type": "Place",
      "@id": schemaIds.hamiltonDepot,
      name: "Specialist Movers — Hamilton depot",
      address: { "@type": "PostalAddress", ...businessInfo.hamiltonAddress },
      geo: {
        "@type": "GeoCoordinates",
        latitude: businessInfo.geo.hamilton.latitude,
        longitude: businessInfo.geo.hamilton.longitude,
      },
    },
  ];
}

/** WebSite node. No SearchAction — there is no search route on the site, and
 *  marking one up would simply be inaccurate. */
export function websiteNode() {
  return {
    "@type": "WebSite",
    "@id": schemaIds.website,
    url: siteUrl,
    name: siteName,
    publisher: { "@id": schemaIds.organization },
    inLanguage: "en-NZ",
  };
}

export function siteGraph({ withRating = false }: { withRating?: boolean } = {}) {
  return {
    "@context": "https://schema.org",
    "@graph": [
      organizationNode({ withRating }),
      websiteNode(),
      ...depotNodes(),
    ],
  };
}
