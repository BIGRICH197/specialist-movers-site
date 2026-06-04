import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HamiltonServicePage } from "@/components/HamiltonServicePage";
import { getHamiltonPageConfig } from "@/lib/hamilton-pages";

export const metadata: Metadata = {
  title: "Piano moving Hamilton | Specialist Piano Movers",
  description:
    "Hamilton piano moving for upright and grand pianos. Waikato base, Auckland routes, storage and international crating. Free quote within 15 minutes.",
  alternates: { canonical: "/piano-movers/hamilton" },
};

export default function PianoMoversHamiltonPage() {
  const config = getHamiltonPageConfig("piano-movers-hamilton");
  if (!config) notFound();
  return <HamiltonServicePage config={config} />;
}
