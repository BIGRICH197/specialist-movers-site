import type { Metadata } from "next";
import { NicheServicePage } from "@/components/NicheServicePage";
import { regularRunsPage } from "@/lib/regular-runs-page";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: { absolute: regularRunsPage.metaTitle },
  description: regularRunsPage.metaDescription,
  path: regularRunsPage.path,
});

export default function RegularRunsPage() {
  return <NicheServicePage config={regularRunsPage} />;
}
