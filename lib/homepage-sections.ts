import { sitePhotos } from "@/lib/site-photos";
import { houseMovingProcess } from "@/lib/moving-process";
import { houseProcessIllustrations, milestoneIllustrations } from "@/lib/process-illustrations";

/** Homepage moving process , 1–4 grid with small cartoons in each step card. */
export const homeProcessVisual = {
  title: houseMovingProcess.title,
  steps: houseMovingProcess.steps.map((step, index) => ({
    title: step.title,
    body: step.body,
    image: houseProcessIllustrations[index].src,
    imageAlt: houseProcessIllustrations[index].alt,
  })),
} as const;

/** Volume stats band , faded team photo behind (readable overlay in component). */
export const experienceMilestones = {
  title: "Over 60 years of combined moving industry experience",
  backgroundImage: sitePhotos.aboutTeam,
  backgroundAlt: "Specialist Movers team with trucks at the depot",
  items: [
    {
      value: "4,000+",
      label: "Families moved",
      icon: milestoneIllustrations[0].src,
      iconAlt: milestoneIllustrations[0].alt,
    },
    {
      value: "5,000+",
      label: "Pianos moved",
      icon: milestoneIllustrations[1].src,
      iconAlt: milestoneIllustrations[1].alt,
    },
    {
      value: "1,000+",
      label: "Spa pools moved",
      icon: milestoneIllustrations[2].src,
      iconAlt: milestoneIllustrations[2].alt,
    },
    {
      value: "1,100+",
      label: "Commercial moves",
      icon: milestoneIllustrations[3].src,
      iconAlt: milestoneIllustrations[3].alt,
    },
  ],
} as const;
