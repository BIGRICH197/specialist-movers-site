import type { Metadata } from "next";
import { PianoTuningPage } from "@/components/PianoTuningPage";
import { pianoTuningMeta } from "@/lib/piano-tuning-content";

export const metadata: Metadata = {
  title: pianoTuningMeta.title,
  description: pianoTuningMeta.description,
};

export default function PianoTuningRoute() {
  return <PianoTuningPage />;
}
