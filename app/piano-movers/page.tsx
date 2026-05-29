import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceLandingPage } from "@/components/ServiceLandingPage";
import { getServiceLandingConfig } from "@/lib/service-landings";

const SLUG = "piano-movers";

export const metadata: Metadata = {
  title: "Piano Movers Auckland & Waikato",
  description:
    "Piano movers Auckland and the Waikato , upright, grand, international shipping and storage. Trusted by retailers. Free quote, callback in 15 minutes.",
};

export default function PianoHubPage() {
  const config = getServiceLandingConfig(SLUG);
  if (!config) notFound();
  return <ServiceLandingPage config={config} />;
}
