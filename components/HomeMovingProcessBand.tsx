import { Fragment } from "react";
import { ChevronRight } from "lucide-react";
import { ProcessIllustration } from "@/components/ProcessIllustration";
import type { ProcessStep } from "@/components/ProcessStepsGrid";

type Props = {
  title: string;
  steps: readonly ProcessStep[];
  className?: string;
};

/**
 * Homepage moving process , brand-purple cartoons in a row with arrows (live site layout).
 */
export function HomeMovingProcessBand({ title, steps, className = "" }: Props) {
  return (
    <section className={`bg-white ${className}`}>
      <h2 className="text-center font-heading text-2xl uppercase tracking-wide text-brand-purple sm:text-3xl">
        {title}
      </h2>
      <ol className="m-0 mt-10 flex list-none flex-col gap-10 p-0 md:flex-row md:items-start md:justify-between md:gap-3 lg:gap-5">
        {steps.map((step, index) => (
          <Fragment key={step.title ?? `process-${index}`}>
            <li className="flex min-w-0 flex-1 flex-col items-center text-center">
              {step.image ? (
                <div className="h-24 w-24 sm:h-28 sm:w-28">
                  <ProcessIllustration
                    src={step.image}
                    alt={
                      step.imageAlt ??
                      (typeof step.title === "string" ? step.title : `Step ${index + 1}`)
                    }
                  />
                </div>
              ) : null}
              {step.title ? (
                <p className="mt-4 font-heading text-sm font-bold uppercase tracking-wide text-brand-purple">
                  {step.title}
                </p>
              ) : null}
              <p className="mt-2 max-w-xs text-sm leading-relaxed text-brand-purple/80">
                {step.body}
              </p>
            </li>
            {index < steps.length - 1 ? (
              <li
                className="hidden shrink-0 items-center self-center text-brand-yellow md:flex md:px-1"
                aria-hidden
              >
                <ChevronRight className="h-8 w-8 stroke-[2.5]" />
              </li>
            ) : null}
          </Fragment>
        ))}
      </ol>
    </section>
  );
}
