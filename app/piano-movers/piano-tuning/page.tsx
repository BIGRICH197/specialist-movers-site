import type { Metadata } from "next";
import { PianoTuningPage } from "@/components/PianoTuningPage";
import { pianoTuningContent } from "@/lib/piano-tuning-content";

export const metadata: Metadata = {
  title: pianoTuningContent.meta.title,
  description: pianoTuningContent.meta.description,
};

export default function PianoTuningRoute() {
  return <PianoTuningPage content={pianoTuningContent} />;
}
