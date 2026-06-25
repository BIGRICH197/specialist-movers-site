import { JsonLd } from "@/components/JsonLd";
import { aggregateRatingSchema } from "@/lib/schema-rating";
import { siteName, siteUrl } from "@/lib/site-config";

type AreaServed = { "@type": string; name: string };

type Props = {
  name: string;
  description: string;
  path: string;
  serviceType?: string;
  areaServed?: AreaServed[];
  includeRating?: boolean;
};

const defaultAreaServed: AreaServed[] = [
  { "@type": "City", name: "Auckland" },
  { "@type": "City", name: "Hamilton" },
  { "@type": "AdministrativeArea", name: "Waikato" },
];

export function ServiceJsonLd({
  name,
  description,
  path,
  serviceType,
  areaServed = defaultAreaServed,
  includeRating = true,
}: Props) {
  const data = {
    "@context": "https://schema.org",
    "@type": "Service",
    name,
    description,
    url: `${siteUrl}${path}`,
    serviceType: serviceType ?? name,
    provider: {
      "@type": "MovingCompany",
      name: siteName,
      url: siteUrl,
      ...(includeRating ? { aggregateRating: aggregateRatingSchema } : {}),
    },
    areaServed,
  };

  return <JsonLd data={data} />;
}
