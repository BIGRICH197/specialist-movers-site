import { BrandLogomarkWatermark } from "@/components/BrandLogomarkWatermark";
import { InclusionAccordion } from "@/components/InclusionAccordion";
import { SectionReveal } from "@/components/SectionReveal";
import { moveInclusionCategories, whatsIncludedPage } from "@/lib/service-clusters";
import { sectionRevealDirection } from "@/lib/motion";

function SectionHeader({
  eyebrow,
  title,
  description,
}: {
  eyebrow: string;
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-3xl">
      <p className="text-xs font-semibold uppercase tracking-wider text-brand-yellow/90">
        {eyebrow}
      </p>
      <h2 className="mt-2 font-heading text-2xl text-white sm:text-3xl">{title}</h2>
      <p className="mt-4 text-base leading-relaxed text-white/88">{description}</p>
    </div>
  );
}

/** What's included , sits directly after the moving process on the homepage. */
export function HomeWhatsIncludedSection() {
  return (
    <SectionReveal
      direction={sectionRevealDirection(3)}
      className="border-t border-brand-purple/10 bg-white py-14 sm:py-16"
    >
      <div
        id="whats-included"
        className="relative mx-auto max-w-7xl scroll-mt-24 overflow-hidden rounded-3xl border border-brand-purple/20 bg-brand-purple py-10 text-white shadow-lg container-px sm:py-12"
      >
        <BrandLogomarkWatermark mark="yellow" position="top-left" size={240} opacity={0.1} />
        <div className="relative z-[1] grid gap-10 sm:px-2 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:items-start lg:gap-12">
          <div>
            <SectionHeader
              eyebrow={whatsIncludedPage.eyebrow}
              title={whatsIncludedPage.title}
              description={whatsIncludedPage.lead}
            />
            <div className="mt-8 rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-sm sm:p-6">
              <h3 className="font-heading text-lg text-brand-yellow">
                {whatsIncludedPage.asideTitle}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-white/88">
                {whatsIncludedPage.asideBody}
              </p>
            </div>
          </div>
          <InclusionAccordion categories={moveInclusionCategories} variant="purple" />
        </div>
      </div>
    </SectionReveal>
  );
}
