import { JsonLd } from "@/components/JsonLd";
import { aggregateRatingSchema } from "@/lib/schema-rating";
import { pickFeaturedReviews, reviewDateToIso } from "@/lib/scattered-reviews";
import { siteName, siteUrl } from "@/lib/site-config";

type Props = {
  /** Must match what ServerReviewsGrid renders, so markup and page agree. */
  reviewCount?: number;
};

export function ReviewsPageJsonLd({ reviewCount = 9 }: Props = {}) {
  const reviews = pickFeaturedReviews(reviewCount).map((review) => {
    const datePublished = reviewDateToIso(review.date);
    return {
      "@type": "Review" as const,
      author: { "@type": "Person" as const, name: review.name },
      reviewRating: {
        "@type": "Rating" as const,
        ratingValue: review.rating,
        bestRating: 5,
        worstRating: 1,
      },
      reviewBody: review.text,
      ...(datePublished ? { datePublished } : {}),
    };
  });

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
      ...(reviews.length > 0 ? { review: reviews } : {}),
    },
  };

  return <JsonLd data={data} />;
}
