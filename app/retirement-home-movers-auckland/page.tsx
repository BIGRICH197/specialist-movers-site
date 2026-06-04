import type { Metadata } from "next";
import { NicheServicePage } from "@/components/NicheServicePage";
import { retirementHomeMoversPage } from "@/lib/niche-service-pages";

export const metadata: Metadata = {
  title: retirementHomeMoversPage.metaTitle,
  description: retirementHomeMoversPage.metaDescription,
  alternates: { canonical: retirementHomeMoversPage.path },
};

export default function RetirementHomeMoversAucklandPage() {
  return <NicheServicePage config={retirementHomeMoversPage} />;
}
