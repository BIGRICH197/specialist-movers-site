import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceLandingPage } from "@/components/ServiceLandingPage";
import { getServiceLandingConfig } from "@/lib/service-landings";

const SLUG = "piano-movers";

export const metadata: Metadata = {
  title: "Piano moving Auckland | Specialist Piano Movers",
  description:
    "Piano moving Auckland for upright, grand, and digital pianos. Trusted by retailers. Local moves, Hamilton routes, international shipping. Free quote, callback in 15 minutes.",
};

export default function PianoHubPage() {
  const config = getServiceLandingConfig(SLUG);
  if (!config) notFound();
  return <ServiceLandingPage config={config} />;
}
