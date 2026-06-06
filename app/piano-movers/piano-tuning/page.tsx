import type { Metadata } from "next";
import { PianoTuningPage } from "@/components/PianoTuningPage";
import { pianoTuningContent } from "@/lib/piano-tuning-content";
import { buildPageMetadata } from "@/lib/seo";

export const metadata: Metadata = buildPageMetadata({
  title: { absolute: pianoTuningContent.meta.title },
  description: pianoTuningContent.meta.description,
  path: "/piano-movers/piano-tuning",
});

export default function PianoTuningRoute() {
  return <PianoTuningPage content={pianoTuningContent} />;
}
