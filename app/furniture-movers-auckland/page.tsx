import type { Metadata } from "next";
import { NicheServicePage } from "@/components/NicheServicePage";
import { furnitureMoversAucklandPage } from "@/lib/furniture-pages";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: { absolute: furnitureMoversAucklandPage.metaTitle },
  description: furnitureMoversAucklandPage.metaDescription,
  path: furnitureMoversAucklandPage.path,
});

export default function FurnitureMoversAucklandPage() {
  return <NicheServicePage config={furnitureMoversAucklandPage} />;
}
