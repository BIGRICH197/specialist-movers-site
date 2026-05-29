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
