import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { HamiltonServicePage } from "@/components/HamiltonServicePage";
import { getHamiltonPageConfig } from "@/lib/hamilton-pages";
import { buildPageMetadata } from "@/lib/seo";
import { seoAbsoluteTitles } from "@/lib/seo-meta-titles";

export const metadata: Metadata = buildPageMetadata({
  title: { absolute: seoAbsoluteTitles.pianoHamilton },
  description:
    "Hamilton piano moving for uprights and grands. Waikato base, storage and international crating. Free quote.",
  path: "/piano-movers/hamilton",
});

export default function PianoMoversHamiltonPage() {
  const config = getHamiltonPageConfig("piano-movers-hamilton");
  if (!config) notFound();
  return <HamiltonServicePage config={config} />;
}
