import { notFound } from "next/navigation";
import { HouseMoveDeck } from "@/components/quote-deck/house-move/HouseMoveDeck";
import { QUOTE_CATEGORIES, type QuoteCategoryKey } from "@/lib/quote-deck/quote-categories";
import { SAMPLE_QUOTES } from "@/lib/quote-deck/quote-category-samples";

// One category's quote page with a sample quote. Accept goes to the sample
// booking form, not /quote/[ref]/book. Never on the live site.

export const metadata = {
  title: "Quote page preview",
  robots: { index: false, follow: false },
};

export default function QuotePreview({ params }: { params: { category: string } }) {
  if (process.env.VERCEL_ENV === "production") notFound();
  if (!(params.category in QUOTE_CATEGORIES)) notFound();
  const key = params.category as QuoteCategoryKey;
  const { quote, prefill } = SAMPLE_QUOTES[key];
  return (
    <HouseMoveDeck
      quote={quote}
      quoteType={key}
      quoteRef={`preview-${key}`}
      bookPath={`/quote/preview/${key}/book`}
      bedrooms={prefill.bedrooms}
      bathrooms={prefill.bathrooms}
    />
  );
}
