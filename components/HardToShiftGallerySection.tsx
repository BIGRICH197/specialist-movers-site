import { SitePhoto } from "@/components/SitePhoto";
import { SectionReveal } from "@/components/SectionReveal";
import { hardToShiftGalleryPhotos } from "@/lib/hard-to-shift-gallery";

export function HardToShiftGallerySection() {
  return (
    <SectionReveal className="border-t border-brand-purple/10 bg-brand-white py-12 container-px sm:py-14">
      <h2 className="font-heading text-2xl text-brand-purple sm:text-3xl">
        Hard-to-shift jobs we handle
      </h2>
      <p className="mt-3 max-w-2xl text-base leading-relaxed text-brand-purple/80">
        Spa pools, pianos, safes, and bulky items that need cranes, rigging, or extra crew.
        These are real Specialist Movers jobs, not stock photos.
      </p>
      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {hardToShiftGalleryPhotos.map((photo) => (
          <figure key={photo.src} className="min-w-0">
            <SitePhoto src={photo.src} alt={photo.alt} aspect="wide" className="w-full" />
            <figcaption className="mt-2 text-sm leading-relaxed text-brand-purple/75">
              {photo.caption}
            </figcaption>
          </figure>
        ))}
      </div>
    </SectionReveal>
  );
}
