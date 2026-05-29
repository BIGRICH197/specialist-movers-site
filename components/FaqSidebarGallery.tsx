import Image from "next/image";
import { faqSidebarPhotos } from "@/lib/faq-page-photos";
import { photoFrameClass } from "@/lib/photo-fade";

export function FaqSidebarGallery() {
  return (
    <aside
      className="hidden lg:block"
      aria-label="Photos from Specialist Movers jobs"
    >
      <div className="sticky top-28 space-y-4">
        <p className="text-xs font-semibold uppercase tracking-wider text-brand-purple/50">
          On the job
        </p>
        <ul className="space-y-3">
          {faqSidebarPhotos.map((item, i) => (
            <li key={`${item.src}-${i}`}>
              <div
                className={`${photoFrameClass} relative aspect-[4/3] overflow-hidden rounded-xl border border-brand-purple/10 shadow-sm`}
              >
                <div className="absolute inset-0 z-0">
                  <Image
                    src={item.src}
                    alt={item.alt}
                    fill
                    sizes="200px"
                    className="object-cover"
                  />
                </div>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </aside>
  );
}
