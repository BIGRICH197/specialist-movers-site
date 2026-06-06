import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceLandingPage } from "@/components/ServiceLandingPage";
import { getServiceLandingConfig } from "@/lib/service-landings";
import { buildPageMetadata } from "@/lib/seo";

const SLUG = "piano-movers";

export const metadata: Metadata = buildPageMetadata({
  title: { absolute: "Piano moving Auckland | Specialist Piano Movers" },
  description:
    "Piano moving Auckland for upright, grand, and digital pianos. Trusted by retailers. Local moves, Hamilton routes, international shipping. Free quote, callback in 15 minutes.",
  path: "/piano-movers/auckland",
});

export default function PianoMoversAucklandPage() {
  const config = getServiceLandingConfig(SLUG);
  if (!config) notFound();
  return <ServiceLandingPage config={config} />;
}
