/**
 * Piano tuning page copy (from specialistpianomovers.co.nz/piano-tuning/, refreshed for SM voice).
 */
import type { PianoTuningContent } from "@/lib/piano-tuning-types";

export const pianoTuningContent: PianoTuningContent = {
  meta: {
    title: "Piano Tuning | Specialist Piano Movers",
    description:
      "Piano tuning across Auckland and the Waikato. Upright and grand pianos. Book after a move or for maintenance. Callback within 15 minutes.",
  },
  hero: {
    eyebrow: "Auckland & Waikato",
    h1: "Piano tuning",
    lead:
      "Keeping your piano in tune is vital for the sound you paid for. Whether you need a tune after a move or regular maintenance at home, we book experienced tuners from our Auckland and Hamilton bases.",
    subline: "Upright and grand pianos. Free quote and callback within 15 minutes.",
  },
  included: [
    "Standard tuning for upright and grand pianos",
    "Pitch correction when the piano has slipped between services",
    "Advice on humidity, heating, and how often to book",
    "Coordination with piano moves when you need both services",
    "Auckland suburbs and Waikato towns including Hamilton and Cambridge",
    "Clear pricing before we confirm your appointment",
  ],
  sections: [
    {
      title: "Why does my piano go out of tune?",
      body:
        "Pianos stay under constant tension. More than 230 steel strings, each pulled to roughly 150 to 200 pounds, add up to 18 to 20 tons on the frame and wooden back. When humidity or temperature shifts, those strings slacken or tighten and the pitch drifts.",
    },
    {
      title: "How often should I tune my piano?",
      body:
        "In a stable home, plan for at least twice a year. A practical rhythm: book tuning two to three weeks after you turn heating on in winter, and again two to three weeks after you turn it off in summer. That gives the piano time to settle before the strings are brought back to pitch.",
    },
    {
      title: "Tuning upright and grand pianos",
      body:
        "Regular tuning keeps tone even and helps spot problems early, like a broken string or soundboard issue, before they turn into costly repairs. We tune both upright and grand pianos and can line up tuning after we move your instrument into its new room.",
    },
  ],
  whyChoose:
    "Finding a reliable piano tuner can feel like searching for a needle in a haystack. Specialist Piano Movers is part of Specialist Movers, with years around pianos every day. We understand upright and grand instruments and book tuners who treat each job with the same care we bring to moves.",
  faqs: [
    {
      q: "How long does piano tuning take?",
      a: "Most home tunings take 60 to 90 minutes. A piano that has not been tuned for years may need longer for a pitch raise and stabilisation. We confirm timing when we book.",
    },
    {
      q: "How much does piano tuning cost?",
      a: "Price depends on piano type, when it was last tuned, and your location. Call or use the form and we will quote clearly before we lock in a date.",
    },
    {
      q: "Will my piano need tuning after a move?",
      a: "The move itself rarely knocks a piano out of tune, but humidity and temperature changes in a new room can. Book a tuner two to three weeks after the piano settles in its new space.",
    },
    {
      q: "Do you tune across Auckland and the Waikato?",
      a: "Yes. We cover Auckland metro suburbs from our Wairau Valley depot and Hamilton, Cambridge, and wider Waikato towns from our Hamilton base. Tell us your address when you enquire.",
    },
    {
      q: "How are piano strings tuned?",
      a: "A tuner adjusts each string to the correct pitch using a tuning lever on the tuning pins. They listen for beats between notes and set octaves and unisons so the piano sounds even across the keyboard.",
    },
    {
      q: "Why do pianos go out of tune?",
      a: "Humidity, temperature swings, heavy playing, and age all affect tension in the strings. Seasonal changes in the home are one of the most common reasons pianos drift between services.",
    },
  ],
  relatedSlugs: ["piano-movers", "grand-piano", "upright-piano", "piano-storage"],
  breadcrumbs: [
    { label: "Home", href: "/" },
    { label: "Piano moving", href: "/piano-movers" },
    { label: "Piano tuning" },
  ],
  crossLink: null,
  ctaTitle: "Book your piano tuning",
};

/** @deprecated use pianoTuningContent.meta */
export const pianoTuningMeta = pianoTuningContent.meta;
/** @deprecated use pianoTuningContent.hero */
export const pianoTuningHero = pianoTuningContent.hero;
/** @deprecated use pianoTuningContent.included */
export const pianoTuningIncluded = pianoTuningContent.included;
/** @deprecated use pianoTuningContent.sections */
export const pianoTuningSections = pianoTuningContent.sections;
/** @deprecated use pianoTuningContent.whyChoose */
export const pianoTuningWhy = pianoTuningContent.whyChoose;
/** @deprecated use pianoTuningContent.faqs */
export const pianoTuningFaqs = pianoTuningContent.faqs;
/** @deprecated use pianoTuningContent.relatedSlugs */
export const pianoTuningRelatedSlugs = pianoTuningContent.relatedSlugs;
