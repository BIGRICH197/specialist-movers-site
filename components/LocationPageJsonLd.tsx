import { JsonLd } from "@/components/JsonLd";
import { googleReviewsUrl } from "@/lib/legacy-site-content";
import { aggregateRatingSchema } from "@/lib/schema-rating";
import { schemaIds } from "@/lib/schema-graph";
import { siteUrl } from "@/lib/site-config";
import type { Location } from "@/lib/location-types";

type Props = {
  location: Location;
};

export function LocationPageJsonLd({ location }: Props) {
  const path = `/locations/${location.slug}`;
  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${siteUrl}${path}#webpage`,
        name: location.metaTitle,
        description: location.metaDescription,
        url: `${siteUrl}${path}`,
        isPartOf: { "@id": schemaIds.website },
        about: { "@id": `${siteUrl}${path}#service` },
      },
      {
        "@type": "Service",
        "@id": `${siteUrl}${path}#service`,
        name: `Moving services in ${location.name}`,
        description: location.intro,
        url: `${siteUrl}${path}`,
        areaServed: { "@type": "Place", name: location.name },
        // One business, referenced — not a fresh MovingCompany per page.
        provider: { "@id": schemaIds.organization },
      },
      {
        // Location pages render the reviews band, so the rating is visible
        // here and belongs on the business node.
        "@id": schemaIds.organization,
        aggregateRating: { ...aggregateRatingSchema, url: googleReviewsUrl },
      },
    ],
  };

  return <JsonLd data={data} />;
}
