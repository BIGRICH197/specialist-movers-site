import type { Metadata } from "next";
import { NicheServicePage } from "@/components/NicheServicePage";
import { retirementHomeMoversPage } from "@/lib/niche-service-pages";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: retirementHomeMoversPage.metaTitle,
  description: retirementHomeMoversPage.metaDescription,
  path: retirementHomeMoversPage.path,
});

export default function RetirementHomeMoversAucklandPage() {
  return <NicheServicePage config={retirementHomeMoversPage} />;
}
