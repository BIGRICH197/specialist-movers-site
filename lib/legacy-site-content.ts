/**
 * Verbatim (or near-verbatim) marketing and SEO copy from specialistmovers.co.nz
 * as provided in site exports / live pages , preserved for Google rankings.
 * Only obvious typos are corrected (e.g. moviang → moving, transprot → transport).
 */

import { houseMovingProcess } from "@/lib/moving-process";
import { regions } from "@/lib/regions";

export const homeMeta = {
  title: regions.homeMetaTitle,
  description: regions.homeMetaDescription,
};

export const hero = {
  eyebrow: regions.heroEyebrow,
  h1: regions.heroH1,
  lead: regions.heroLead,
  subline:
    "Moves starting from $350. Free quote. We call back within 15 minutes.",
  /** On-photo caption (couch gag). Swap any line from photoTaglineAlternates. */
  photoTagline: "You relax. We move.",
  photoTaglineAlternates: [
    "You relax. We move.",
    "Sit back. We have got the sofa.",
    "Moving day, minus the stress.",
    "We lift. You barely notice.",
    "Careful crew. Calm move.",
  ] as const,
  /** On-photo caption , rain crew shot (homepage section below fold) */
  photoRainCaption: "Rain or shine, we\u2019ve got your back",
  photoRainCaptionAlternates: [
    "Rain or shine. Your move still happens.",
    "A bit wet out here. Still on time.",
    "You stay dry. We handle the weather.",
    "Wet day. Same careful crew.",
    "Boxes outside. Calm inside.",
  ] as const,
  coverage: regions.coverage,
};

export const servicesIntro = {
  title: "Our services",
  body:
    "Our experienced team at Specialist Movers provides professional relocation services, handling everything from home and office relocations to specialised services such as packing and unpacking your belongings, as well as delicate relocations of fragile items such as pianos, spa pools, and saunas. We do it all.",
};

export const serviceBlurbs: Record<
  string,
  { title: string; excerpt: string }
> = {
  "house-moving": {
    title: "House Moving & Packing Auckland",
    excerpt:
      "Full-service home moves across Auckland and the Waikato , furniture removals, professional packing, storage, and careful transport. Our experienced team makes residential moves smooth and stress-free.",
  },
  "office-moving": {
    title: "Office Moving Auckland",
    excerpt:
      "Office and workplace relocations across Auckland and the Waikato , desks, IT, meeting rooms, and files moved with minimal downtime. We plan access, lifts, and timing so your team can get back to work.",
  },
  "piano-movers": {
    title: "Piano Movers Auckland and Hamilton",
    excerpt:
      "We specialise in transporting pianos of all kinds – from upright, electric, to grand – safely and on time. Our piano transportation package includes careful collection, shrink wrapping, secure delivery, and full setup upon arrival.",
  },
  "commercial-moving": {
    title: "Commercial Moving Auckland",
    excerpt:
      "Commercial relocations for Auckland and the Waikato: cabinetry and fit outs, staging work, printer and vending machine deliveries, and specialist equipment moves. Trained crews, the right gear, and clear timelines.",
  },
  "packing-services": {
    title: "Packing Services Auckland",
    excerpt:
      "Professional packing and unpacking support. Our experienced moving specialists provide a professional packing service, assisting with packing and unpacking, furniture disassembly and access to storage facilities for both short-term and long-term needs.",
  },
  "hard-to-shift": {
    title: "Moving Hard to Shift Items",
    excerpt:
      "We are experienced in transporting all types of fragile and bulky furniture and also provide the necessary packing materials and moving blankets to ensure your belongings are kept safe from damage during transit.",
  },
  "cleaning-services": {
    title: "Exit Cleaning",
    excerpt:
      "Make moving out completely stress-free with our professional Exit Cleaning services. We handle tenancy, settlement, and post-construction cleans across Auckland, Hamilton, and the Waikato. Our expert team ensures your property is spotless and fully ready for inspection, helping you enjoy a smooth and hassle-free handover process.",
  },
  "international-moving": {
    title: "International Moving",
    excerpt:
      "As one of the leading moving companies in New Zealand, we bring years of experience handling and transporting a wide range of items from furniture to delicate instruments to North Island, South Island and international destinations. Our specialist moving team ensures your items arrive safely and on time.",
  },
  "loading-unloading": {
    title: "Loading and Unloading",
    excerpt:
      "Some customers simply need experienced movers for hire to assist with transportation and heavy lifting. At Specialist Movers, we adapt our services to suit your needs with efficient, well-organised service and careful handling.",
  },
  "winz-quotes": {
    title: "WINZ Quotes",
    excerpt:
      "Need a written quote for moving assistance? Contact us with your move details and we will respond with a clear scope and pricing you can use for your application.",
  },
};

export const movingProcess = {
  title: houseMovingProcess.title,
  steps: houseMovingProcess.steps,
};

export const statsStrip = {
  title: "Over 60 Years of Combined Moving Industry Experience",
  items: [
    { label: "SiteWise Gold Certified Contractor", value: "Gold" },
    { label: "Health & Safety Assessment Score", value: "90%+" },
    { label: "Moves from", value: "$350" },
    { label: "Service", value: "7 days" },
  ],
};

/** Homepage purple band , SiteWise stats + numbered detail cards (not the volume stats band). */
export const siteWiseHomeSection = {
  title: "SiteWise Gold & health and safety",
};

/** SiteWise / safety list , full sentences from the live site. */
export const siteWideBullets = [
  "90%+ Annual Safety Assessment Score Achieved a Gold-level score in the official SiteWise Health & Safety audit, demonstrating exceptional compliance and safety performance.",
  "Premier Prequalification Status Recognised as a top-tier contractor, giving clients confidence in our safety standards before projects even begin.",
  "Industry-Leading Health & Safety Systems Comprehensive, structured, and audited safety management procedures that meet national industry benchmarks.",
  "Independently Audited & Verified Our systems are reviewed annually to ensure ongoing compliance and continuous improvement.",
  "Reduced Risk for Clients & Projects Working with a SiteWise Gold certified contractor minimizes workplace risk and supports safe, efficient project delivery.",
  "Commitment to Worker & Community Safety We prioritize the wellbeing of our team, clients, and the wider community through strict safety protocols.",
];

/** General FAQs , specialistmovers.co.nz/faq/ */
export const faqs = [
  {
    q: "How much does it cost to hire movers in Auckland?",
    a: "Costs vary depending on distance, the volume of items, and additional services like storage services. We offer affordable pricing with a focus on cost-effective solutions.",
  },
  {
    q: "What is the process for booking?",
    a: "We always like to come for a free viewing first. Once we meet you and take a look, we will provide you with an accurate quote and timeline for your move.",
  },
  {
    q: "How long will it take?",
    a: "This can vary a lot depending on the size of your move. We know you want to minimise downtime. We usually say 1 day for packing, 1 day for moving and unpacking, but we will make this clear when quoting.",
  },
  {
    q: "How far in advance should I book my move?",
    a: "It's best to schedule at least two weeks in advance, especially if you're booking during peak times.",
  },
  {
    q: "Do you provide packing services?",
    a: "Yes, we offer packing service options, including packing materials and careful handling by our expert team.",
  },
  {
    q: "How many movers will you bring?",
    a: "When navigating stairwells and elevators with desks and boardroom tables, we always like to bring at least 4 movers, but we have more available depending on the size of your move.",
  },
  {
    q: "Do you offer furniture disassembly and reassembly services?",
    a: "Absolutely. Our two movers can handle heavy lifting, disassembly, and reassembly as part of our specialist moving services.",
  },
  {
    q: "How do you protect my furniture during the move?",
    a: "We use high-quality packing materials, including wraps and covers, and our professional movers ensure that every item is safely transported.",
  },
  {
    q: "Can you move our IT equipment?",
    a: "Yes we can. It's always worth checking with your IT team or service provider. Often we end up moving computer screens but the IT department will move and set up the servers and server room.",
  },
];

export const contactCta =
  "Not sure what you need for your upcoming move? Fill out the form below with your moving date and requirements. We will get back to you with a clear recommendation, a fair quote, and our next available booking.";

export const whyChooseShort = regions.whyChooseShort;

export const googleReviewsUrl =
  "https://search.google.com/local/reviews?placeid=ChIJwRwBH8vRNYkRyam_iy7vUDc";

/** “Specialist Care…” / insurance / best mover blocks from the homepage. */
export const trustPillars = [
  {
    title: "Specialist Care and Expertise",
    body:
      "As one of the leading moving companies in New Zealand, we bring years of experience handling and transporting a wide range of items from furniture to delicate instruments to North Island, South Island and international destinations. Our specialist moving team ensures your items arrive safely and on time.",
  },
  {
    title: "Guaranteed care and protection",
    body:
      "Specialist Movers provides personalised transit insurance across residential moves, business relocation, and other specialised requests. Our moving insurance ensures that fragile items arrive safely, giving our customers peace of mind. Talk to our team for more information.",
  },
  {
    title: "Best Moving Company in Auckland - Trusted Specialist Movers",
    body:
      "Our team at Specialist Movers takes pride in providing reliable and skilled moving services to our customers at competitive fixed prices with no hidden fees. We are fully trained to handle and transport a wide range of items – from delicate instruments to bulky furniture. Our goal is to provide customer satisfaction by making your move as smooth and hassle-free as possible.",
  },
] as const;

/** Long-form homepage SEO (legacy Auckland keywords + 2026 Auckland/Hamilton bases). */
export const homepageSeoSections = [
  {
    heading: "Auckland and Hamilton Movers Built on Care and Experience",
    paragraphs: [
      "Moving to a new home or relocating your business should be exciting, not stressful. Specialist Movers has bases in Auckland (Wairau Valley) and Hamilton, with daily work across Auckland and strong coverage for Hamilton and nearby towns. We also service the wider Waikato when you need us.",
      "Our experienced team understands that every move is different, which is why we focus on careful planning, clear communication, and efficient service from start to finish. We take pride in helping customers relocate safely, from North Shore and central Auckland suburbs through to Hamilton, Cambridge, and wider Waikato towns.",
      "Great service is about more than transporting belongings. It is about peace of mind during an important transition. That is why families, businesses, and music stores choose Specialist Movers when they need dependable Auckland and Hamilton removalists they can trust.",
    ],
  },
  {
    heading: "Moving Services Across Auckland, Hamilton, and New Zealand",
    paragraphs: [
      "At Specialist Movers, we offer flexible and reliable NZ moving services for homeowners, renters, and businesses who want a stress-free relocation experience.",
      "Our trained professional removalists use the right equipment, careful techniques, and proven processes. Services include residential moving for houses, apartments, and townhouses; office and commercial relocations; local moves in Auckland and Hamilton; longer relocations across New Zealand; professional packing (packers come in the day before your move); furniture disassembly and reassembly; and storage when needed.",
      "When you choose our company, you choose a team that values preparation, safety, and attention to detail. We organise every step so your belongings arrive safely and on time.",
    ],
  },
  {
    heading: "Affordable Movers Who Deliver Real Value",
    paragraphs: [
      "One of the biggest concerns people have when planning a move is the cost. We believe professional moving help should be accessible without sacrificing quality. Our transparent pricing means you know what to expect, with no hidden surprises.",
      "If you are looking for affordable local movers in Auckland or Hamilton, our team combines experience, reliability, and value. We plan each move carefully, use modern equipment, and work efficiently so customers receive a high standard of service.",
      "Many customers choose us for house moves, piano moves, and commercial work because we combine affordability with professionalism and SiteWise Gold safety systems.",
    ],
  },
  {
    heading: "Experienced Removalists You Can Trust",
    paragraphs: [
      "Choosing the right moving company can make a huge difference. With Specialist Movers, you work with skilled movers who understand every stage of a relocation. Our team brings over 60 years of combined moving industry experience.",
      "We have built a strong reputation in Auckland and Hamilton by focusing on professionalism, reliability, and friendly customer service. We know local access, traffic, and logistics, which helps us plan each job efficiently.",
      "Customers trust us because we treat every move with care. We protect furniture, handle belongings carefully, and ensure items are loaded and transported safely from quote to handover.",
    ],
  },
  {
    heading: "Movers for Hire for Homes and Businesses",
    paragraphs: [
      "Every move comes with different challenges. Some customers need a full-service relocation, while others need experienced movers for hire to assist with transportation and heavy lifting. At Specialist Movers, we adapt our services to suit your needs.",
      "Our team works with families, tenants, businesses, and property managers across Auckland, Hamilton, and the Waikato.",
      "Whether you are moving locally or relocating to another region, our crews are ready to make the process easier.",
    ],
  },
  {
    heading: "Making Your Move Simple and Stress-Free",
    paragraphs: [
      "Moving does not have to feel overwhelming when you have the right team helping you. We combine experience, professionalism, and friendly Kiwi service for customers across Auckland, Hamilton, the Waikato, and wider New Zealand.",
      "From careful preparation to safe transportation and efficient unloading, our skilled specialist movers handle every relocation with attention and care. Our goal is simple – to provide dependable service that makes moving easier for our customers.",
      "Planning a move and looking for reliable help? Our experienced team is ready to make your relocation simple, organised, and stress-free from start to finish. Whether you are moving your home or business, our professional movers are here to help every step of the way.",
    ],
  },
  {
    heading: "Expert in Safe Furniture Moving Solutions",
    paragraphs: [
      "We are experienced in transporting all types of fragile and bulky furniture and also provide the necessary packing materials and moving blankets to ensure your belongings are kept safe from damage during transit. Our experienced moving specialists also provide a professional packing service, assisting with packing and unpacking, furniture disassembly and access to storage facilities for both short-term and long-term needs.",
    ],
  },
];

export const aboutPage = {
  intro:
    "Auckland and Hamilton movers for house, piano, commercial, and specialist work—NZ owned, SiteWise Gold, and built for careful moves.",
  story: hero.coverage,
};

export const whyUsPage = {
  intro: regions.heroLead,
  closing:
    "Planning a move and looking for reliable help? Our experienced team is ready to make your relocation simple, organised, and stress-free from start to finish. Whether you are moving your home or business, our professional movers are here to help every step of the way.",
};

/** Service-page “why choose us” blocks , aligned with specialistmovers.co.nz service themes. */
export const serviceWhyChooseCopy: Record<string, string> = {
  "house-moving":
    "Our team at Specialist Movers takes pride in providing reliable and skilled moving services to our customers at competitive fixed prices with no hidden fees. We are fully trained to handle and transport a wide range of items – from delicate instruments to bulky furniture. Our goal is to provide customer satisfaction by making your move as smooth and hassle-free as possible.",
  "office-moving":
    "Office moves need planning, not guesswork. We coordinate lifts, parking, and building access, protect IT and workstations, and work around your hours so downtime stays minimal. Clear communication from site visit to handover.",
  "piano-movers":
    "We specialise in transporting pianos of all kinds – from upright, electric, to grand – safely and on time. Our piano transportation package includes careful collection, shrink wrapping, secure delivery, and full setup upon arrival.",
  "commercial-moving":
    "Commercial relocations for Auckland and the Waikato: cabinetry and fit outs, staging work, printer and vending machine deliveries, and specialist equipment moves. Our trained crews use the right equipment, careful techniques, and proven processes so every job runs on time.",
  "packing-services":
    "We are experienced in transporting all types of fragile and bulky furniture and also provide the necessary packing materials and moving blankets to ensure your belongings are kept safe from damage during transit. Our experienced moving specialists provide professional packing and unpacking, furniture disassembly and access to storage facilities for both short-term and long-term needs.",
  "hard-to-shift":
    "We are experienced in transporting all types of fragile and bulky furniture and also provide the necessary packing materials and moving blankets to ensure your belongings are kept safe from damage during transit. Specialist equipment and planning for spa pools, bathtubs and oversized items.",
  "cleaning-services":
    "Make moving out completely stress-free with our professional Exit Cleaning services. We handle tenancy, settlement, and post-construction cleans across Auckland, Hamilton, and the Waikato. Our expert team ensures your property is spotless and fully ready for inspection, helping you enjoy a smooth and hassle-free handover process.",
  "international-moving":
    "As one of the leading moving companies in New Zealand, we bring years of experience handling and transporting a wide range of items from furniture to delicate instruments to North Island, South Island and international destinations. Our specialist moving team ensures your items arrive safely and on time.",
  "loading-unloading":
    "Some customers need experienced movers for hire to assist with transportation and heavy lifting. At Specialist Movers, we adapt our services to suit your needs with efficient, well-organised service and careful handling.",
  "winz-quotes":
    "If you are applying for moving assistance, you need a clear written quote fast. We focus on prompt follow-up and straightforward communication so you have the details you need for your application.",
};
