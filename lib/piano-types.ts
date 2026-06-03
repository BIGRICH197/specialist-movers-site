/** Piano types section , from specialistpianomovers.co.nz (edited for NZ voice). */
export const pianoTypesSection = {
  title: "Upright, grand, and everything between",
  lead:
    "Different pianos need different care. We plan each move around your instrument, access, and stairs at both ends.",
  types: [
    {
      title: "Upright and console pianos",
      body:
        "Uprights are heavy and awkward in tight hallways and stairwells. We use custom dollies, padding, and secure straps so corners and door frames stay protected.",
    },
    {
      title: "Baby grand and grand pianos",
      body:
        "Grands are delicate and top-heavy. We remove legs, pedals, and the lid when needed, pad the body, and transport on a piano board built for the job.",
    },
    {
      title: "Digital and electric pianos",
      body:
        "Lighter than acoustic pianos but still worth specialist handling. We treat keyboards and hybrid pianos with the same care on stairs and in vans.",
    },
  ],
} as const;

export const pianoExpertiseSection = {
  title: "Dedicated piano crews and gear",
  lead:
    "Specialist Piano Movers is part of Specialist Movers. We run Auckland and Hamilton with trucks and equipment built for pianos, not general furniture.",
  bullets: [
    "We never send fewer than three trained movers on a piano job.",
    "Piano boards, shrink wrap, quilted blankets, and straps sized for your instrument.",
    "Local moves, Auckland to Hamilton runs, and international crating when you need it.",
    "Specialist transport insurance options. Ask us for details.",
  ],
  stats: [
    { value: "5,000+", label: "Pianos moved" },
    { value: "4.9", label: "Google rating" },
    { value: "7 days", label: "Service" },
    { value: "$300", label: "Moves from (excl. GST)" },
  ],
} as const;
