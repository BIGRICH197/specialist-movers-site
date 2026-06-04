import type { Metadata } from "next";
import { NicheServicePage } from "@/components/NicheServicePage";
import { apartmentMoversPage } from "@/lib/niche-service-pages";

export const metadata: Metadata = {
  title: apartmentMoversPage.metaTitle,
  description: apartmentMoversPage.metaDescription,
  alternates: { canonical: apartmentMoversPage.path },
};

export default function ApartmentMoversAucklandPage() {
  return <NicheServicePage config={apartmentMoversPage} />;
}
