import "../quote-deck.css";

/**
 * Layout for hosted quote pages. Loads the self-contained quote-deck styles
 * (ported from the standalone proposal deck) scoped to the /quote segment.
 * Does not affect the rest of the site.
 */
export default function QuoteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
