import type { Metadata } from "next";
import { NicheServicePage } from "@/components/NicheServicePage";
import { joineryDeliveryPage } from "@/lib/joinery-page";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: { absolute: joineryDeliveryPage.metaTitle },
  description: joineryDeliveryPage.metaDescription,
  path: joineryDeliveryPage.path,
});

export default function KitchenAndJoineryDeliveryPage() {
  return <NicheServicePage config={joineryDeliveryPage} />;
}
