import Image from "next/image";
import { ScatteredReviews } from "@/components/ScatteredReviews";
import { faqSidebarPhotos } from "@/lib/faq-page-photos";
import { photoFrameClass } from "@/lib/photo-fade";

type Props = {
  reviewSlot: string;
  reviewCount?: number;
  /** Show job photos under the review stack (FAQ page). */
  showPhotos?: boolean;
  piano?: boolean;
};

/**
 * Sticky sidebar: reviews on top, optional photo strip below (desktop).
 */
export function ReviewSidebarColumn({
  reviewSlot,
  reviewCount = 2,
  showPhotos = false,
  piano = false,
}: Props) {
  return (
    <div className="hidden lg:block">
      <div className="sticky top-28 space-y-6">
        <ScatteredReviews
          slot={reviewSlot}
          count={reviewCount}
          piano={piano}
          variant="sidebar"
        />
        {showPhotos ? (
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-brand-purple/50">
              On the job
            </p>
            <ul className="mt-3 space-y-3">
              {faqSidebarPhotos.slice(0, 3).map((item, i) => (
                <li key={`${item.src}-${i}`}>
                  <div
                    className={`${photoFrameClass} relative aspect-[4/3] overflow-hidden rounded-xl border border-brand-purple/10 shadow-sm`}
                  >
                    <Image
                      src={item.src}
                      alt={item.alt}
                      fill
                      sizes="200px"
                      className="object-cover"
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </div>
  );
}
