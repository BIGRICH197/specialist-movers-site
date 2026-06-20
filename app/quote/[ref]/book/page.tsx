import { getQuote, tokenFromRef } from "@/lib/quote-store";
import { formatAddress } from "@/lib/quote-deck/house-move-quote";
import { BookingForm, type BookingPrefill } from "@/components/quote-deck/BookingForm";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Complete your booking — Specialist Movers",
  robots: { index: false, follow: false },
};

export default async function BookPage({ params }: { params: { ref: string } }) {
  const stored = await getQuote(tokenFromRef(params.ref));

  if (!stored) {
    return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-white px-6 text-center text-brand-purple">
        <h1 className="font-heading text-2xl sm:text-3xl">Quote not found</h1>
        <p className="mt-3 max-w-md text-brand-purple/75">
          This link is no longer available. Please get in touch for a fresh quote.
        </p>
      </main>
    );
  }

  const q = stored.quote;
  const addOns = q.includedAddOns ?? [];
  const prefill: BookingPrefill = {
    fullName: q.clientName ?? "",
    pickupAddress: formatAddress(q.pickup),
    dropoffAddress: formatAddress(q.delivery),
    moveDate: q.moveDate ?? "",
    cleaningBooked: addOns.includes("cleaning") ? "Yes Cleaning" : "",
    packing: addOns.includes("packing") ? "Yes packing" : "",
  };

  return <BookingForm quoteRef={params.ref} prefill={prefill} />;
}
