import { NumberedInfoGrid, type NumberedInfoItem } from "@/components/NumberedInfoGrid";
import { cn } from "@/lib/utils";

export type ProcessStep = NumberedInfoItem;

type Props = {
  steps: readonly ProcessStep[];
  className?: string;
};

/**
 * Four-step process: steps 1–2 left column, 3–4 right (desktop).
 */
export function ProcessStepsGrid({ steps, className = "mt-8" }: Props) {
  const left = steps.slice(0, 2);
  const right = steps.slice(2, 4);

  return (
    <div className={cn("grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-4", className)}>
      <NumberedInfoGrid items={left} columns={1} startNumber={1} />
      <NumberedInfoGrid items={right} columns={1} startNumber={3} />
    </div>
  );
}
