import { notFound } from "next/navigation";
import { BookingForm } from "@/components/quote-deck/BookingForm";
import { formatAddress } from "@/lib/quote-deck/house-move-quote";
import { QUOTE_CATEGORIES, type QuoteCategoryKey } from "@/lib/quote-deck/quote-categories";
import { SAMPLE_QUOTES } from "@/lib/quote-deck/quote-category-samples";

// One category's booking form, prefilled from its sample quote the way
// /quote/[ref]/book prefills from a real one. Submitting checks the answers
// and shows the confirmation, but sends nothing. Never on the live site.

export const metadata = {
  title: "Booking form preview",
  robots: { index: false, follow: false },
};

export default function BookingPreview({
  params,
  searchParams,
}: {
  params: { category: string };
  searchParams?: { clean?: string; pack?: string; ins?: string };
}) {
  if (process.env.VERCEL_ENV === "production") notFound();
  if (!(params.category in QUOTE_CATEGORIES)) notFound();
  const key = params.category as QuoteCategoryKey;
  const { quote, prefill } = SAMPLE_QUOTES[key];
  const beds = prefill.bedrooms;
  return (
    <BookingForm
      quoteRef={`preview-${key}`}
      quoteType={key}
      dryRun
      prefill={{
        fullName: quote.contactName ?? quote.clientName,
        companyName: quote.contactName ? quote.clientName : undefined,
        email: "sample@example.com",
        phone: "021 000 0000",
        pickupAddress: formatAddress(quote.pickup),
        dropoffAddress: formatAddress(quote.delivery),
        moveDate: quote.moveDate ?? "",
        sizeOfMove: beds ? (beds >= 4 ? "4 Bedroom+" : `${beds} Bedroom`) : "",
        howManyMovers: prefill.movers ? `${prefill.movers} MOVERS` : "",
        typeOfMove: prefill.typeOfMove ?? "",
        cleaningBooked: searchParams?.clean === "1" ? "Yes Cleaning" : searchParams?.clean === "0" ? "No Cleaning" : "",
        packing: searchParams?.pack === "1" ? "Yes packing" : searchParams?.pack === "0" ? "No not packing" : "",
        insurance: searchParams?.ins === "1" ? "Yes insurance" : searchParams?.ins === "0" ? "No (owner's risk)" : "",
        bedrooms: prefill.bedrooms,
        bathrooms: prefill.bathrooms,
      }}
    />
  );
}
