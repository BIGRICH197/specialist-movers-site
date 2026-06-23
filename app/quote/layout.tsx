import type { Metadata } from "next";
import "../quote-deck.css";
import { siteName } from "@/lib/site-config";

/**
 * Layout for hosted quote pages. Loads the self-contained quote-deck styles
 * (ported from the standalone proposal deck) scoped to the /quote segment.
 * Does not affect the rest of the site.
 */
export const metadata: Metadata = {
  robots: { index: false, follow: false },
  openGraph: {
    siteName,
  },
};

export default function QuoteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
