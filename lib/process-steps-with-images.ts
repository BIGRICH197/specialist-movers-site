import { houseMovingProcess, workplaceMovingProcess } from "@/lib/moving-process";
import { homeProcessVisual } from "@/lib/homepage-sections";
import type { ProcessStep } from "@/components/ProcessStepsGrid";

/** Process steps for a service slug, with cartoons on house moving only. */
export function getServiceProcessSteps(slug: string): readonly ProcessStep[] {
  if (slug === "house-moving") {
    return homeProcessVisual.steps;
  }
  if (
    slug === "office-moving" ||
    slug === "commercial-moving" ||
    slug === "piano-movers"
  ) {
    return workplaceMovingProcess.steps;
  }
  return houseMovingProcess.steps;
}
