import type { Metadata } from "next";
import { NicheServicePage } from "@/components/NicheServicePage";
import { apartmentMoversPage } from "@/lib/niche-service-pages";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: apartmentMoversPage.metaTitle,
  description: apartmentMoversPage.metaDescription,
  path: apartmentMoversPage.path,
});

export default function ApartmentMoversAucklandPage() {
  return <NicheServicePage config={apartmentMoversPage} />;
}
