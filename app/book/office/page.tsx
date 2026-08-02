import { BookingForm } from "@/components/quote-deck/BookingForm";
import { commercialTerms, COMMERCIAL_TERMS_VERSION } from "@/lib/quote-deck/booking-terms";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Book your office move — Specialist Movers",
  robots: { index: false, follow: false },
};

// Direct office / commercial move book-in (no quote link needed). Same fields
// and flow as a house move, but tagged "office" (deal + Trello card read as a
// commercial job) and signed against the commercial relocation terms.
export default function BookOfficePage() {
  return (
    <BookingForm
      standalone
      bookServiceType="office"
      heading="Book your office move"
      termsSet={commercialTerms}
      termsVersion={COMMERCIAL_TERMS_VERSION}
      hiddenFields={["sizeOfMove", "typeOfMove", "payment"]}
      prefill={{}}
    />
  );
}
