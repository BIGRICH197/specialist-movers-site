import { SitePhoto } from "@/components/SitePhoto";
import { SectionReveal } from "@/components/SectionReveal";
import { pianoGalleryPhotos } from "@/lib/piano-gallery";

export function PianoGallerySection() {
  return (
    <SectionReveal className="border-t border-brand-purple/10 bg-brand-white py-12 container-px sm:py-14">
      <h2 className="font-heading text-2xl text-brand-purple sm:text-3xl">
        How we move your piano
      </h2>
      <p className="mt-3 max-w-2xl text-base leading-relaxed text-brand-purple/80">
        Real jobs from homes, music stores, theatres, and our piano trucks. This is the team
        behind Specialist Piano Movers.
      </p>
      <div className="mt-8 grid gap-6 sm:grid-cols-2">
        {pianoGalleryPhotos.map((photo) => (
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
