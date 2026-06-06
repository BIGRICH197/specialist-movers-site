import type { Metadata } from "next";
import { PianoHubPage } from "@/components/piano/PianoHubPage";
import { pianoHubMeta } from "@/lib/piano-hub-copy";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: { absolute: pianoHubMeta.title },
  description: pianoHubMeta.description,
  path: "/piano-movers",
});

export default function PianoMoversHubPage() {
  return <PianoHubPage />;
}
