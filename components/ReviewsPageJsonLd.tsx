import { JsonLd } from "@/components/JsonLd";
import { aggregateRatingSchema } from "@/lib/schema-rating";
import { siteName, siteUrl } from "@/lib/site-config";

export function ReviewsPageJsonLd() {
  const data = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Customer Reviews",
    url: `${siteUrl}/reviews`,
    description:
      "Google reviews for Specialist Movers Auckland and Hamilton house, piano, and commercial moves.",
    mainEntity: {
      "@type": "MovingCompany",
      name: siteName,
      url: siteUrl,
      aggregateRating: aggregateRatingSchema,
    },
  };

  return <JsonLd data={data} />;
}
