/**
 * Brand-purple cartoons in public/illustrations (process + milestones).
 * Gold originals live in public/illustrations/_gold_backup if needed.
 */
/** Bust CDN/browser cache after swapping purple assets in public/illustrations */
const v = "purple-v2";

export const houseProcessIllustrations = [
  {
    src: `/illustrations/process/step-1-form.webp?${v}`,
    alt: "Fill in our form for a free in-home viewing",
  },
  {
    src: `/illustrations/process/step-2-move-day.webp?${v}`,
    alt: "Team Leader introduces the crew on move day",
  },
  {
    src: `/illustrations/process/step-3-deliver.webp?${v}`,
    alt: "Transport and deliver your items",
  },
  {
    src: `/illustrations/process/step-4-final-check.webp?${v}`,
    alt: "Final check before you enjoy your new home",
  },
] as const;

/** Volume stats band , cartoon icons from the live homepage. */
export const milestoneIllustrations = [
  { src: `/illustrations/milestones/families.png?${v}`, alt: "Families moved" },
  { src: `/illustrations/milestones/pianos.png?${v}`, alt: "Pianos moved" },
  { src: `/illustrations/milestones/spa-pools.png?${v}`, alt: "Spa pools moved" },
  { src: `/illustrations/milestones/commercial.png?${v}`, alt: "Commercial moves" },
] as const;
