import type { Metadata } from "next";
import { NicheServicePage } from "@/components/NicheServicePage";
import { movingToAustraliaPage } from "@/lib/niche-service-pages";

export const metadata: Metadata = {
  title: movingToAustraliaPage.metaTitle,
  description: movingToAustraliaPage.metaDescription,
  alternates: { canonical: movingToAustraliaPage.path },
};

export default function MovingToAustraliaPage() {
  return <NicheServicePage config={movingToAustraliaPage} />;
}
