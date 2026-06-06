import { JsonLd } from "@/components/JsonLd";
import { brandAssets } from "@/lib/brand-assets";
import { businessInfo } from "@/lib/business-info";
import { regions } from "@/lib/regions";
import { phoneNumber } from "@/lib/site-data";
import { siteName, siteUrl } from "@/lib/site-config";

/** E.164 for NZ mobile 021… */
const phoneE164 = `+64${phoneNumber.replace(/^0/, "")}`;

export function LocalBusinessJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "MovingCompany",
    name: siteName,
    description: regions.jsonLdDescription,
    url: siteUrl,
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
    openingHoursSpecification: businessInfo.openingHours.map((hours) => ({
      "@type": "OpeningHoursSpecification",
      dayOfWeek: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
      opens: "09:00",
      closes: "19:00",
    })),
    areaServed: [
      { "@type": "City", name: "Auckland" },
      { "@type": "City", name: "Hamilton" },
      { "@type": "AdministrativeArea", name: "Waikato" },
      { "@type": "AdministrativeArea", name: "North Island" },
    ],
    priceRange: "$$",
    sameAs: [...businessInfo.sameAs],
  };

  return <JsonLd data={data} />;
}
