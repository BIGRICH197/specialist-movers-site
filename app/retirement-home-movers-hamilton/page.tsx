import type { Metadata } from "next";
import { NicheServicePage } from "@/components/NicheServicePage";
import { retirementHomeMoversHamiltonPage } from "@/lib/niche-service-pages";

export const metadata: Metadata = {
  title: retirementHomeMoversHamiltonPage.metaTitle,
  description: retirementHomeMoversHamiltonPage.metaDescription,
  alternates: { canonical: retirementHomeMoversHamiltonPage.path },
};

export default function RetirementHomeMoversHamiltonPage() {
  return <NicheServicePage config={retirementHomeMoversHamiltonPage} />;
}
