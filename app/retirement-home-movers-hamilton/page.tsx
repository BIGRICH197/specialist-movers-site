import type { Metadata } from "next";
import { NicheServicePage } from "@/components/NicheServicePage";
import { retirementHomeMoversHamiltonPage } from "@/lib/niche-service-pages";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: { absolute: retirementHomeMoversHamiltonPage.metaTitle },
  description: retirementHomeMoversHamiltonPage.metaDescription,
  path: retirementHomeMoversHamiltonPage.path,
});

export default function RetirementHomeMoversHamiltonPage() {
  return <NicheServicePage config={retirementHomeMoversHamiltonPage} />;
}
