import type { Metadata } from "next";
import { CleaningBookingsPage } from "@/components/CleaningBookingsPage";

export const metadata: Metadata = {
  title: "Cleaning Bookings Auckland | Fixed Price Exit Cleaning",
  description:
    "Book exit, settlement, and moving cleans in Auckland. Fixed prices by bedrooms and bathrooms. Option 1 and Option 2 packages. Specialist Movers.",
  alternates: { canonical: "/cleaning-bookings" },
};

export default function CleaningBookingsRoutePage() {
  return <CleaningBookingsPage />;
}
