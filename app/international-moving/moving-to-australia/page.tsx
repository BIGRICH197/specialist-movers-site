import type { Metadata } from "next";
import { NicheServicePage } from "@/components/NicheServicePage";
import { movingToAustraliaPage } from "@/lib/niche-service-pages";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: movingToAustraliaPage.metaTitle,
  description: movingToAustraliaPage.metaDescription,
  path: movingToAustraliaPage.path,
});

export default function MovingToAustraliaPage() {
  return <NicheServicePage config={movingToAustraliaPage} />;
}
