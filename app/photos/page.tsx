import { PhotoUploadForm } from "@/components/PhotoUploadForm";

export const metadata = {
  title: "Send us your photos — Specialist Movers",
  robots: { index: false, follow: false },
};

// One fixed link for the automatic emails (replaces the Lexos survey link).
// Photos land in ShiftMate under Quotes -> Customer photos.
export default function PhotosPage() {
  return <PhotoUploadForm />;
}
