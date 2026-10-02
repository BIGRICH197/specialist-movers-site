import { PianoBookingForm } from "@/components/quote-deck/PianoBookingForm";

export const dynamic = "force-dynamic";

export const metadata = {
  title: "Book your piano or hard to shift item — Specialist Movers",
  robots: { index: false, follow: false },
};

// Direct piano / large-item book-in (no quote link needed) — replaces the JotForm.
export default function BookPianoPage() {
  return <PianoBookingForm />;
}
