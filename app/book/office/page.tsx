import { BookingForm } from "@/components/quote-deck/BookingForm";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Book your office move \u2014 Specialist Movers",
  robots: { index: false, follow: false },
};

// Direct office move book-in (no quote link needed). Asks the office questions
// (lib/quote-deck/quote-categories: company, contact on the day, IT, rebuilds,
// building access) and signs the commercial terms, the same form an office
// quote books through. Tagged "office" so the deal and job read as commercial.
export default function BookOfficePage() {
  return (
    <BookingForm
      standalone
      quoteType="office"
      bookServiceType="office"
      heading="Book your office move"
      prefill={{}}
    />
  );
}
