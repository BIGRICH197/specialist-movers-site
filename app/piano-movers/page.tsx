import type { Metadata } from "next";
import { PianoHubPage } from "@/components/piano/PianoHubPage";
import { pianoHubMeta } from "@/lib/piano-hub-copy";

export const metadata: Metadata = {
  title: { absolute: pianoHubMeta.title },
  description: pianoHubMeta.description,
};

export default function PianoMoversHubPage() {
  return <PianoHubPage />;
}
