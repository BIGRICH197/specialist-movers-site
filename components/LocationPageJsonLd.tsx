import { JsonLd } from "@/components/JsonLd";
import { aggregateRatingSchema } from "@/lib/schema-rating";
import { siteName, siteUrl } from "@/lib/site-config";
import type { Location } from "@/lib/location-types";

type Props = {
  location: Location;
};

export function LocationPageJsonLd({ location }: Props) {
  const path = `/locations/${location.slug}`;
  const data = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: location.metaTitle,
    description: location.metaDescription,
    url: `${siteUrl}${path}`,
    about: {
      "@type": "Service",
      name: `Moving services in ${location.name}`,
      description: location.intro,
      url: `${siteUrl}${path}`,
      areaServed: { "@type": "Place", name: location.name },
      provider: {
        "@type": "MovingCompany",
        name: siteName,
        url: siteUrl,
        aggregateRating: aggregateRatingSchema,
      },
    },
  };

  return <JsonLd data={data} />;
}
