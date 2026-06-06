import { JsonLd } from "@/components/JsonLd";
import { siteName, siteUrl } from "@/lib/site-config";

type Props = {
  name: string;
  description: string;
  path: string;
  serviceType?: string;
};

export function ServiceJsonLd({ name, description, path, serviceType }: Props) {
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
    },
    areaServed: [
      { "@type": "City", name: "Auckland" },
      { "@type": "City", name: "Hamilton" },
      { "@type": "AdministrativeArea", name: "North Island" },
    ],
  };

  return <JsonLd data={data} />;
}
