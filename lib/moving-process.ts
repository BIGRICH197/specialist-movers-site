/** Per-service process steps shown on landing pages */

export const houseMovingProcess = {
  title: "House moving process",
  steps: [
    {
      title: "Free in-home viewing",
      body: "Fill in our form and we come to see your home. We understand access, volume, and timing before we quote.",
    },
    {
      title: "Accurate quote and plan",
      body: "You get a clear price and timeline. Packing, cleaning, and storage can be included if you need them.",
    },
    {
      title: "Move day",
      body: "Our Team Leader introduces the crew, protects furniture, and loads the truck with care.",
    },
    {
      title: "Delivery and final check",
      body: "We unload at your new place and walk through everything with you before we leave.",
    },
  ],
} as const;

/** Piano moves: quote, prep, protect, deliver */
export const pianoMovingProcess = {
  title: "Piano moving process",
  steps: [
    {
      title: "Quote and confirm details",
      body: "Tell us upright or grand, pickup and drop-off addresses, and stairs at each end. We confirm price and your move date.",
    },
    {
      title: "Plan access and prep",
      body: "We check doorways, steps, and parking. Grand pianos may need legs or pedals removed before transport. We handle that on site.",
    },
    {
      title: "Protect and load",
      body: "On move day the crew shrink wraps and pads your piano, then loads it onto our piano truck using specialist dollies and straps.",
    },
    {
      title: "Deliver and place",
      body: "We transport your piano safely, set it down where you need it, and do a final check with you before we leave.",
    },
  ],
} as const;

/** Office and commercial: site visit, quote, execute, handover */
export const workplaceMovingProcess = {
  title: "How we run your move",
  steps: [
    {
      title: "Free site viewing",
      body: "We visit your current and new site, or the job location, and scope what needs to move.",
    },
    {
      title: "Tailored quote",
      body: "You receive a clear quote and plan: access, timing, crew size, and any special handling.",
    },
    {
      title: "Move day",
      body: "Our crew protects items, loads safely, and transports with the right gear for your workplace or fit out.",
    },
    {
      title: "Handover",
      body: "We place items where you need them and do a final check with you before we leave.",
    },
  ],
} as const;
