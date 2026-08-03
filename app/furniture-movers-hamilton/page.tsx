import type { Metadata } from "next";
import { NicheServicePage } from "@/components/NicheServicePage";
import { furnitureMoversHamiltonPage } from "@/lib/furniture-pages";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: { absolute: furnitureMoversHamiltonPage.metaTitle },
  description: furnitureMoversHamiltonPage.metaDescription,
  path: furnitureMoversHamiltonPage.path,
});

export default function FurnitureMoversHamiltonPage() {
  return <NicheServicePage config={furnitureMoversHamiltonPage} />;
}
