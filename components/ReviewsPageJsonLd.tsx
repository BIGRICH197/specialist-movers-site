import { JsonLd } from "@/components/JsonLd";
import { googleReviewsUrl } from "@/lib/legacy-site-content";
import { aggregateRatingSchema } from "@/lib/schema-rating";
import { schemaIds } from "@/lib/schema-graph";
import { pickFeaturedReviews, reviewDateToIso } from "@/lib/scattered-reviews";
import { siteUrl } from "@/lib/site-config";

type Props = {
  /** Must match what ServerReviewsGrid renders, so markup and page agree. */
  reviewCount?: number;
};

/**
 * Review nodes for the reviews the page actually server-renders, hung off the
 * one business entity by @id rather than restating it as a fresh
 * MovingCompany (audit M7).
 *
 * The rating belongs on this page because it is visibly shown here, and now
 * that the reviews behind it are rendered too, the count stops being an
 * unevidenced assertion (audit C4).
 */
export function ReviewsPageJsonLd({ reviewCount = 9 }: Props = {}) {
  const reviews = pickFeaturedReviews(reviewCount).map((review, index) => {
    const datePublished = reviewDateToIso(review.date);
    return {
      "@type": "Review" as const,
      "@id": `${siteUrl}/reviews#review-${index + 1}`,
      author: { "@type": "Person" as const, name: review.name },
      reviewRating: {
        "@type": "Rating" as const,
        ratingValue: review.rating,
        bestRating: 5,
        worstRating: 1,
      },
      reviewBody: review.text,
      ...(datePublished ? { datePublished } : {}),
      itemReviewed: { "@id": schemaIds.organization },
    };
  });

  const data = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "WebPage",
        "@id": `${siteUrl}/reviews#webpage`,
        name: "Customer Reviews",
        url: `${siteUrl}/reviews`,
        description:
          "Google reviews for Specialist Movers Auckland and Hamilton house, piano, and commercial moves.",
        isPartOf: { "@id": schemaIds.website },
        mainEntity: { "@id": schemaIds.organization },
      },
      {
        "@id": schemaIds.organization,
        aggregateRating: { ...aggregateRatingSchema, url: googleReviewsUrl },
        ...(reviews.length > 0
          ? { review: reviews.map((r) => ({ "@id": r["@id"] })) }
          : {}),
      },
      ...reviews,
    ],
  };

  return <JsonLd data={data} />;
}
