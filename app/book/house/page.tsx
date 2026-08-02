import { BookingForm } from "@/components/quote-deck/BookingForm";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Book your house move — Specialist Movers",
  robots: { index: false, follow: false },
};

// Direct house-move book-in (no quote link needed) — replaces the JotForm.
export default function BookHousePage() {
  return <BookingForm standalone heading="Book your house move" prefill={{}} />;
}
