import { Check } from "lucide-react";
import { SectionReveal } from "@/components/SectionReveal";
import { pianoExpertiseSection, pianoTypesSection } from "@/lib/piano-types";

export function PianoExpertiseSection() {
  return (
    <>
      <SectionReveal className="border-t border-brand-purple/10 bg-brand-purple/[0.03] py-12 container-px sm:py-14">
        <h2 className="font-heading text-2xl text-brand-purple sm:text-3xl">
          {pianoTypesSection.title}
        </h2>
        <p className="mt-3 max-w-2xl text-base leading-relaxed text-brand-purple/85">
          {pianoTypesSection.lead}
        </p>
        <div className="mt-8 grid gap-5 md:grid-cols-3">
          {pianoTypesSection.types.map((item) => (
            <div
              key={item.title}
              className="rounded-2xl border border-brand-purple/15 bg-white p-6 shadow-sm"
            >
              <h3 className="font-heading text-lg text-brand-purple">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-brand-purple/80">{item.body}</p>
            </div>
          ))}
        </div>
      </SectionReveal>

      <SectionReveal className="mx-auto max-w-7xl py-12 container-px sm:py-14">
        <h2 className="font-heading text-2xl text-brand-purple sm:text-3xl">
          {pianoExpertiseSection.title}
        </h2>
        <p className="mt-3 max-w-3xl text-base leading-relaxed text-brand-purple/85">
          {pianoExpertiseSection.lead}
        </p>
        <ul className="mt-6 grid gap-3 sm:grid-cols-2">
          {pianoExpertiseSection.bullets.map((b) => (
            <li key={b} className="flex gap-3 text-sm text-brand-purple/85">
              <span className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-brand-yellow/90 text-brand-purple">
                <Check className="h-3 w-3" strokeWidth={3} />
              </span>
              <span>{b}</span>
            </li>
          ))}
        </ul>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {pianoExpertiseSection.stats.map((item) => (
            <div
              key={item.label}
              className="rounded-2xl border border-brand-purple/15 bg-white p-5 text-center shadow-sm"
            >
              <p className="font-heading text-2xl text-brand-purple">{item.value}</p>
              <p className="mt-1 text-xs text-brand-purple/75">{item.label}</p>
            </div>
          ))}
        </div>
      </SectionReveal>
    </>
  );
}
