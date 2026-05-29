import { brandAssets } from "@/lib/brand-assets";
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
    email: "info@specialistmovers.co.nz",
    image: `${siteUrl}${brandAssets.logomarkPurple}`,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Auckland",
      addressRegion: "Auckland",
      addressCountry: "NZ",
    },
    areaServed: [
      { "@type": "City", name: "Auckland" },
      { "@type": "City", name: "Hamilton" },
      { "@type": "AdministrativeArea", name: "Waikato" },
    ],
    priceRange: "$$",
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
