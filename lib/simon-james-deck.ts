/** Copy for /simon-james presentation deck */
export const aboutParagraphs = [
  "We're Auckland's premium furniture and piano moving company. Twenty staff, five trucks, one depot in Glenfield.",
  "We're not the cheapest. We're the careful ones. We know we're often the last touchpoint with your customer, so we're an extension of your brand. How we look, how we dress, and how we behave in your customer's home matters. We turn up in uniform, on time, with a smile.",
  "When something matters, whether it's bespoke furniture, a grand piano, or a family heirloom, we're who Aucklanders call.",
] as const;

export const deliveryPricingIncluded =
  "Collection, careful handling - blanket-wrap, delivery, placement, and rubbish removal.";

/** Per delivery to one address: zone base up to 2 m³, then +$40/m³ */
export const deliveryPricingIntro =
  "Each delivery to one address has a zone base charge (up to 2 m³). Volume above 2 m³ is +$40 per m³ to the same address.";

export const deliveryPricingFootnote =
  "Excl. GST · two-mover crew · extra addresses on the same run each get their own base charge · multi-stop priced per delivery";

export const deliveryPricing = [
  { zone: "A - Inner Auckland", base: "$210", extra: "+$40 / m³" },
  { zone: "B - Wider Metro", base: "$280", extra: "+$40 / m³" },
  { zone: "C - Outer Auckland", base: "$420", extra: "+$40 / m³" },
  { zone: "D - Mangawhai / Waikato", base: "$700", extra: "+$40 / m³" },
  { zone: "E - Far Afield", base: "Quote per job", extra: "n/a" },
] as const;

/** Bulk stock transfers between warehouse sites */
export const warehouseBulkPricing = [
  { label: "Call-out", value: "$60" },
  { label: "Hourly rate", value: "$140 per hour + GST" },
  { label: "Minimum", value: "1 hour" },
] as const;

export const pillars = [
  {
    title: "Care",
    body: "We handle every piece like it's our own. Blanket-wrapped. Dust-covered. Placed exactly where you want it.",
  },
  {
    title: "Reliability",
    body: 'Confirmed windows within 2 hours. The team turns up, on time, prepared. No "between 9 and 5" wait.',
  },
  {
    title: "Simplicity",
    body: "One price covers collection, careful handling, delivery, placement, and rubbish removal. No surprise add-ons.",
  },
] as const;

export const stats = [
  { value: "30+", label: "pianos" },
  { value: "20+", label: "house moves" },
  { value: "80+", label: "commercial deliveries" },
  { value: "5 stars", label: "on Google" },
] as const;

export const included = [
  "Collection from your warehouse",
  "Careful handling - blanket-wrap, dust covers, edge protectors",
  "Delivery to the customer's home (or your second warehouse)",
  "Placement in the room or position you specify",
  "Rubbish removal - packaging, off-cuts, old furniture if requested",
] as const;

export const contacts = [
  {
    role: "Bookings & quotes",
    name: "Danielle Maritz",
    phone: "021 228 2728",
    email: "danielle@specialistmovers.co.nz",
  },
  {
    role: "Operations & on-the-day",
    name: "Matthew Kitney",
    phone: null,
    email: "matthew@specialistmovers.co.nz",
  },
  {
    role: "Anything else / account",
    name: "Richard Boote",
    phone: "021 228 2279",
    email: "richard@specialistmovers.co.nz",
  },
] as const;
