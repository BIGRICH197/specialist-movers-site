import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ServiceLandingPage } from "@/components/ServiceLandingPage";
import { getServiceLandingConfig } from "@/lib/service-landings";
import { legacyMetaDescription } from "@/lib/legacy-meta-descriptions";
import { buildPageMetadata } from "@/lib/seo";

const SLUG = "piano-movers";

export const metadata: Metadata = buildPageMetadata({
  title: { absolute: "Piano moving Auckland | Specialist Piano Movers" },
  description: legacyMetaDescription("piano-movers-auckland"),
  path: "/piano-movers/auckland",
});

export default function PianoMoversAucklandPage() {
  const config = getServiceLandingConfig(SLUG);
  if (!config) notFound();
  return <ServiceLandingPage config={config} />;
}
