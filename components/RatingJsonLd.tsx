import { JsonLd } from "@/components/JsonLd";
import { googleReviewsUrl } from "@/lib/legacy-site-content";
import { aggregateRatingSchema } from "@/lib/schema-rating";
import { schemaIds } from "@/lib/schema-graph";

/**
 * Attaches the aggregate rating to the site-wide business node, by @id.
 *
 * Render this ONLY on pages that visibly show the rating. It used to be
 * stamped onto all 101 URLs from the layout — including blog posts,
 * /policies, and location pages — and "structured data not visible to users"
 * is a documented manual-action trigger. The `url` makes the 331 count
 * checkable against the Google profile instead of self-asserted.
 */
export function RatingJsonLd() {
  return (
    <JsonLd
      data={{
        "@context": "https://schema.org",
        "@id": schemaIds.organization,
        aggregateRating: { ...aggregateRatingSchema, url: googleReviewsUrl },
      }}
    />
  );
}
