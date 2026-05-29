import { ArrowRight } from "lucide-react";
import { BrandLogomarkWatermark } from "@/components/BrandLogomarkWatermark";
import { SectionReveal } from "@/components/SectionReveal";
import { StaggerChildren, StaggerItem } from "@/components/StaggerChildren";
import { hero, homepageSeoSections } from "@/lib/homepage-copy";
import { sectionRevealDirection } from "@/lib/motion";

const featured = homepageSeoSections.slice(0, 3);

export function HomeSeoSection() {
  return (
    <SectionReveal
      direction={sectionRevealDirection(6)}
      className="relative overflow-hidden border-t border-brand-purple/10 bg-brand-surface py-14 sm:py-16"
    >
      <BrandLogomarkWatermark
        mark="purple"
        position="top-right"
        size={200}
        opacity={0.05}
        className="z-0"
      />

      <div className="relative z-[1] mx-auto max-w-7xl container-px">
        <div className="max-w-4xl">
          <p className="inline-block rounded-md bg-brand-yellow/90 px-2.5 py-1 text-xs font-bold uppercase tracking-wider text-brand-purple">
            Local expertise
          </p>
          <h2 className="mt-3 font-heading text-2xl text-brand-purple sm:text-3xl">
            Auckland and Waikato movers you can trust
          </h2>
          <p className="mt-4 text-base leading-relaxed text-brand-purple/85">{hero.coverage}</p>
        </div>

        <StaggerChildren className="mt-8 grid gap-4 lg:grid-cols-3">
          {featured.map((block) => (
            <StaggerItem key={block.heading}>
              <article className="card-interactive relative flex h-full flex-col overflow-hidden rounded-2xl border border-brand-purple/15 bg-white p-6 shadow-sm">
                <span
                  className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-brand-yellow via-brand-yellow/80 to-brand-purple/20"
                  aria-hidden
                />
                <h3 className="font-heading text-lg leading-snug text-brand-purple">
                  {block.heading}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-brand-purple/80">
                  {block.paragraphs[0]}
                </p>
              </article>
            </StaggerItem>
          ))}
        </StaggerChildren>

        <details className="group mt-6 overflow-hidden rounded-2xl border border-brand-purple/15 bg-white shadow-sm">
          <summary className="cursor-pointer list-none bg-white px-5 py-4 font-heading text-sm font-bold text-brand-purple marker:content-none sm:px-6 sm:text-base">
            <span className="flex items-center justify-between gap-3">
              More about how we work
              <ArrowRight className="h-4 w-4 shrink-0 text-brand-yellow transition group-open:rotate-90" />
            </span>
          </summary>
          <div className="space-y-6 border-t border-brand-purple/10 px-5 pb-6 pt-2 sm:px-6">
            {homepageSeoSections.slice(3).map((block) => (
              <div key={block.heading}>
                <h3 className="font-heading text-base text-brand-purple">{block.heading}</h3>
                <div className="mt-2 space-y-3 text-sm leading-relaxed text-brand-purple/80">
                  {block.paragraphs.map((p, i) => (
                    <p key={`${block.heading}-${i}`}>{p}</p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </details>
      </div>
    </SectionReveal>
  );
}
