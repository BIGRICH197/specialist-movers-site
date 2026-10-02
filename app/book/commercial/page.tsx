import { BookingForm } from "@/components/quote-deck/BookingForm";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Book a commercial / general job \u2014 Specialist Movers",
  robots: { index: false, follow: false },
};

// Direct commercial book-in (no quote link needed): cabinetry and fit outs,
// deliveries, storage and anything else that isn't a house, piano or office
// move. The commercial questions from lib/quote-deck/quote-categories and the
// commercial terms; publishes to ShiftMate as a commercial job.
export default function BookCommercialPage() {
  return (
    <BookingForm
      standalone
      quoteType="commercial"
      bookServiceType="commercial"
      heading="Book a commercial / general job"
      prefill={{}}
    />
  );
}
