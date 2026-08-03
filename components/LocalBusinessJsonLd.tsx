import { JsonLd } from "@/components/JsonLd";
import { siteGraph } from "@/lib/schema-graph";

/**
 * Site-wide entity graph, emitted once from app/layout.tsx.
 *
 * `withRating` must only be true on pages that visibly render the rating —
 * see the note on organizationNode(). The layout defaults it off; pages that
 * show the review badge opt in.
 */
export function LocalBusinessJsonLd({ withRating = false }: { withRating?: boolean }) {
  return <JsonLd data={siteGraph({ withRating })} />;
}
