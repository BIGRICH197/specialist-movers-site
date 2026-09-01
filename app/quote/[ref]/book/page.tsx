import { getQuote, tokenFromRef } from "@/lib/quote-store";
import { formatAddress } from "@/lib/quote-deck/house-move-quote";
import { BookingForm, type BookingPrefill } from "@/components/quote-deck/BookingForm";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Complete your booking — Specialist Movers",
  robots: { index: false, follow: false },
};

export default async function BookPage({
  params,
  searchParams,
}: {
  params: { ref: string };
  searchParams?: { clean?: string; pack?: string; ins?: string };
}) {
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
  const pf = stored.prefill ?? {};

  // Map a HubSpot bedroom count to the booking "Size of move" dropdown options.
  function sizeFromBedrooms(beds?: number): string {
    if (!beds || beds < 1) return "";
    if (beds >= 4) return "4 Bedroom+";
    return `${beds} Bedroom`;
  }

  // Normalise a mover count ("3", "3 movers", 3) to the dropdown's "3 MOVERS".
  function moversLabel(m?: string): string {
    if (!m) return "";
    const n = String(m).match(/\d/)?.[0];
    return n ? `${n} MOVERS` : "";
  }

  const prefill: BookingPrefill = {
    fullName: q.clientName ?? "",
    email: pf.email ?? "",
    phone: pf.phone ?? "",
    pickupAddress: formatAddress(q.pickup),
    dropoffAddress: formatAddress(q.delivery),
    moveDate: q.moveDate ?? "",
    sizeOfMove: pf.sizeOfMove ?? sizeFromBedrooms(pf.bedrooms),
    howManyMovers: moversLabel(pf.movers),
    typeOfMove: pf.typeOfMove ?? "",
    // The customer's tick choices on the quote page (passed as query params)
    // win over the quote's original add-on flags.
    cleaningBooked:
      searchParams?.clean === "1"
        ? "Yes Cleaning"
        : searchParams?.clean === "0"
          ? "No Cleaning"
          : addOns.includes("cleaning")
            ? "Yes Cleaning"
            : "",
    packing:
      searchParams?.pack === "1"
        ? "Yes packing"
        : searchParams?.pack === "0"
          ? "No not packing"
          : addOns.includes("packing")
            ? "Yes packing"
            : "",
    // `ins` was declared here and then dropped on the floor: the customer's
    // insurance answer reached this page and went no further, so a request for
    // cover never made it into the booking record or the team's ping. Carry it
    // like the other two. It is not re-asked on the form — accepting the quote
    // already required choosing cover or owner's risk.
    insurance:
      searchParams?.ins === "1"
        ? "Yes insurance"
        : searchParams?.ins === "0"
          ? "No (owner's risk)"
          : "",
  };

  return <BookingForm quoteRef={params.ref} prefill={prefill} quoteType={stored.quoteType} />;
}
