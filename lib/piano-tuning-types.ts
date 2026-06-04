export type PianoTuningContent = {
  meta: { title: string; description: string };
  hero: {
    eyebrow: string;
    h1: string;
    lead: string;
    subline: string;
  };
  included: readonly string[];
  sections: readonly { title: string; body: string }[];
  whyChoose: string;
  faqs: readonly { q: string; a: string }[];
  relatedSlugs: readonly string[];
  breadcrumbs: readonly { label: string; href?: string }[];
  crossLink: { href: string; label: string } | null;
  ctaTitle: string;
};
