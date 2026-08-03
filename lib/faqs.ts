/**
 * Site FAQs — the homepage block, /faq, and the FAQPage JSON-LD on both.
 *
 * Replaces the legacy set, which the 2026-07-28 GEO audit scored 37/100 on
 * /faq and 50 on the homepage — the two weakest high-traffic pages on the
 * site. The problem was not length, it was that no answer contained a fact.
 * Live in the JSON-LD until now:
 *
 *   "How much does it cost to hire movers in Auckland?" — "Costs vary
 *   depending on distance, the volume of items, and additional services like
 *   storage services. We offer affordable pricing with a focus on
 *   cost-effective solutions."
 *
 * Our own cost blog answered the identical question with real arithmetic and
 * scored 91/100. This is that content, brought to the pages that need it.
 *
 * Two rules, both from audit findings:
 *  1. Every answer opens with the answer. The old set had seven answers
 *     beginning "Yes" to questions that were not yes/no ("What is the process
 *     for booking?" — "Yes, we start with a free viewing"), and because they
 *     sit inside JSON-LD that non-sequitur is exactly what a model quotes.
 *  2. Every number is real and checked against brain/context/pricing.md
 *     (last_updated 2026-07-07). $120/hr is the TUESDAY 2-man Auckland rate,
 *     the cheapest day of the week, so it never appears without the Friday
 *     rate beside it.
 *
 * Order matters: app/page.tsx renders faqs.slice(0, 4), so the first four are
 * the highest-intent questions.
 */

export type Faq = { q: string; a: string };

export const faqs: readonly Faq[] = [
  // --- The four the homepage shows -----------------------------------------
  {
    q: "How much does it cost to hire movers in Auckland?",
    a: "A two-person crew and truck costs $120 per hour plus GST on a Tuesday, our cheapest day, rising to $150 on a Friday. Three movers are $160 to $190. On top of the hourly rate there is a callout fee of $60 to $120 depending on how far you are from our depot, and a flat $25 fuel surcharge. A one-bedroom apartment typically comes to about $300 plus GST; a three-bedroom home about $660 plus GST on a Friday.",
  },
  {
    q: "What is the process for booking a move?",
    a: "It starts with a quote, either over the phone or after a free in-home viewing. For anything three bedrooms or larger we prefer to come and look, because volume and access are what actually drive the price. You get a written quote, and when you accept it we lock in your date. We call back within 15 minutes during business hours.",
  },
  {
    q: "How long does a house move take?",
    a: "A two to three bedroom local move is usually one day on site. A one-bedroom apartment is often three to four hours. Larger homes with packing normally run to two days: packers come in the day before, the move happens the next. We confirm hours and crew size in your written quote rather than leaving it open.",
  },
  {
    q: "How far in advance should I book?",
    a: "Two weeks ahead is ideal, and more than that for a Friday, a Saturday, or the end of the month, which are the slots that fill first. Smaller jobs and single items we can often fit sooner. Call (021) 228 2728 and we will tell you the next crew we have free.",
  },

  // --- Pricing -------------------------------------------------------------
  {
    q: "What is the cheapest day to move house?",
    a: "Tuesday. A two-person crew is $120 per hour plus GST on a Tuesday against $150 on a Friday, so on a job that runs six hours that is $180 saved for choosing a different day. Thursday at $130 is the next cheapest. Friday, Saturday and Sunday are the dearest and the busiest.",
  },
  {
    q: "What is the callout fee and why is there one?",
    a: "The callout covers getting the truck and crew to you and back. It is $60 for a two-person crew within about 23km of our depot, $80 out to 45km, and $120 beyond that. Three and four-person crews are $80 to $160 on the same bands. It is quoted upfront, not added at the end.",
  },
  {
    q: "Are there any hidden costs?",
    a: "No. Your written quote shows the hourly rate, the callout fee, the $25 fuel surcharge, and any extras like packing or stairs. The one thing that can move is time, because we charge for the hours the job actually takes. That is why we would rather visit a larger home first than guess.",
  },
  {
    q: "Do you charge more for stairs?",
    a: "Sometimes, and we tell you before the day rather than after. Stairs slow a move down, so the effect is usually on the hours rather than a separate line. Where a property has a lot of steps, a steep driveway, or a long carry from the truck, we factor it into the quote once we know both addresses.",
  },
  {
    q: "Do you charge GST on top?",
    a: "Yes. Every price we publish is plus GST unless we say otherwise, so the $120 Tuesday rate is $138 including GST. Your written quote shows both.",
  },
  {
    q: "Is it cheaper to move myself?",
    a: "Sometimes, for a small flat with friends and a hired van. It stops being cheaper the moment something heavy or fragile is involved, because a damaged piano or a marked wall costs more than the crew would have. If you want to do the driving and just need the lifting, we do load-only and unload-only jobs from around $350 plus GST.",
  },

  // --- What is included ----------------------------------------------------
  {
    q: "What is included in the hourly rate?",
    a: "The crew, the truck, moving blankets, shrink wrap, and mattress covers. Local travel is in the day rate. Disassembly and reassembly of beds and tables is included in the time. Packing, cleaning, storage, and specialist piano handling are quoted separately so you only pay for what you use.",
  },
  {
    q: "Do you provide packing services?",
    a: "Yes. Our packers come in the day before your move, and the price is set by bedroom count, starting at $1,599 plus GST for a one-bedroom home. Cartons, wrap, and tape are supplied. We can pack the whole house or just the kitchen and the fragile things, which is what most people actually want.",
  },
  {
    q: "Do you supply boxes?",
    a: "Yes, cartons and materials come with a packing booking. If you are packing yourself we can drop boxes to you beforehand. Tell us roughly how many rooms and we will work out what you need.",
  },
  {
    q: "Do you take apart and reassemble furniture?",
    a: "Yes, and it is part of the hourly rate rather than an extra. Beds, dining tables, and modular office furniture come apart for transport and go back together at the other end. Hardware is bagged and labelled per item so nothing goes missing.",
  },
  {
    q: "Can you store our things between settlement dates?",
    a: "Yes. Short-term, long-term, in-transit and overnight storage are all available, which matters when settlement on one house does not line up with the other. Tell us the gap when you quote and we will price the whole thing as one job.",
  },
  {
    q: "Do you do exit cleaning as well?",
    a: "Yes, fixed-price tenancy and settlement cleans, scheduled around your move-out so the house is empty when the cleaners arrive. It is priced by bedrooms and bathrooms on the quote form.",
  },

  // --- Handling and protection --------------------------------------------
  {
    q: "How do you protect furniture during the move?",
    a: "Moving blankets, shrink wrap, and mattress covers go on every job as standard, not as an upsell. Fragile items are boxed or crated. Pianos and high-value pieces get specialist padding, piano boards, and dedicated strapping inside the truck. Marble and glass tops travel vertically in a padded frame, never flat.",
  },
  {
    q: "What happens if something gets damaged?",
    a: "Tell us straight away and we will work it out with you. On the insurance side we carry $2,000,000 public liability, which covers damage we cause to your property. Your household goods travel at owner's risk, which is standard across the industry, so if you want them covered we can arrange transit cover through our broker before the move. Pianos carry $2,000 of cover as standard.",
  },
  {
    q: "Are you insured?",
    a: "Our crews are licensed and insured, and we carry $2,000,000 public liability. That is separate from cover on your belongings: no insurer in New Zealand includes household goods in a moving quote, so like every mover we carry them at owner's risk unless you arrange transit cover. Ask us and we will explain exactly what is and is not covered before you book.",
  },
  {
    q: "What will not fit through the door?",
    a: "Sofas and wardrobes, more often than anything else, especially in older Auckland villas with narrow hallways. We check the carry path at both ends before move day. When nothing fits we hoist over a balcony or through a window. We do that with grand pianos, so a couch is manageable.",
  },
  {
    q: "How many movers will you send?",
    a: "Two for most homes up to three bedrooms. Three or four for larger houses, offices, and anything with a lot of stairs, because a bigger crew on a harder job is usually cheaper than a small crew taking twice as long. Pianos always get a minimum of three trained movers.",
  },

  // --- Specialist items ----------------------------------------------------
  {
    q: "Can you move a piano?",
    a: "Yes, and it is what we are best known for. Upright piano moves start from $290 plus GST locally and grands from $550 plus GST, with a minimum of three trained movers, piano boards, shrink wrap and padded blankets on every job. Auckland's Steinway dealers use us, and every piano carries $2,000 of cover as standard.",
  },
  {
    q: "Do you move spa pools, safes and pool tables?",
    a: "Yes, all three are regular work. Spa pools need draining beforehand and take one and a half to three hours. Slate pool tables come apart bed by bed and are relevelled at the other end, usually two to four hours. Safes over about 150kg need a stair-climber or a hoist. Send photos of both ends and we will tell you what the job needs.",
  },
  {
    q: "Can you move an office or a business?",
    a: "Yes. Small offices of up to about ten staff are often quoted from around $800 plus GST. Larger floors need a site visit. We work after hours and at weekends so you do not lose a trading day, and we confirm lift bookings, loading zones and building rules before the move rather than on the morning.",
  },
  {
    q: "Can you move IT equipment and servers?",
    a: "Screens, desktops and peripherals, yes, wrapped and boxed. Servers are usually better handled by your IT provider, who needs to shut them down and bring them back up anyway. We coordinate around them, and we move the racks. Check with your IT team early, because it changes the running order of the day.",
  },

  // --- Coverage and logistics ---------------------------------------------
  {
    q: "What areas do you cover?",
    a: "All of Auckland from our North Shore depot, and Hamilton and the Waikato from our Hamilton base. North Shore, central, east, west and south Auckland are standard callout zones. Hibiscus Coast, Warkworth and Pukekohe are outer zones with a higher callout. Regional North Island routes are quoted individually.",
  },
  {
    q: "Do you move between Auckland and Hamilton?",
    a: "Yes, that corridor is a weekly route and we have depots at both ends, so it is priced as an ordinary job rather than a long-distance special. Travel is shown in the quote upfront.",
  },
  {
    q: "Do you move to the South Island or overseas?",
    a: "Yes. Inter-island and international moves are quoted individually once we know the volume and destination, covering sea freight in shared or sole-use containers and air freight for smaller urgent loads. Allow eight to twelve weeks of lead time for sea freight.",
  },
  {
    q: "What happens if it rains on move day?",
    a: "We move anyway, and Auckland being Auckland we are set up for it. Furniture is wrapped before it leaves the house, floors get protection, and we adjust the loading order so soft furnishings are not sitting out. It is worth having a few large rubbish bags handy for mattresses.",
  },
  {
    q: "Do you work weekends?",
    a: "Yes, seven days a week. Saturday and Sunday are $140 per hour for a two-person crew against $120 on a Tuesday, and they book out first, so give us more notice for a weekend date.",
  },
  {
    q: "Do you provide a written quote for WINZ?",
    a: "Yes. We provide written quotes for Work and Income moving assistance applications with the scope and price set out the way they need it. Tell us when you get in touch and we will turn it around promptly.",
  },
];
