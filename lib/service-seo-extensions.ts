import type { ProcessStep } from "@/components/ProcessStepsGrid";
import {
  houseMovingProcess,
  pianoMovingProcess,
  workplaceMovingProcess,
} from "@/lib/moving-process";
import {
  generalServiceFaqs,
  grandPianoFaqs,
  packingServiceFaqs,
  cleaningServiceFaqs,
  uprightPianoFaqs,
  officeServiceFaqs,
  commercialServiceFaqs,
  type FaqItem,
} from "@/lib/service-faqs";

export type ServiceSeoExtension = {
  bodyParagraphs: readonly string[];
  /** Heading above bodyParagraphs on landing-layout pages. Written per service
   *  rather than derived from the H1, which produced "How office movers
   *  auckland actually works". */
  bodyTitle?: string;
  faqs: readonly FaqItem[];
  processTitle: string;
  processSteps: readonly ProcessStep[];
  piano?: boolean;
};

const pianoProtectionBody =
  "Every piano is wrapped in padded blankets and shrink wrap before it leaves your home. Uprights are secured upright inside the truck with specialist straps. Grands are tilted onto a piano board, padded, and strapped for transport. Humidity and finish are protected with proper wrap, not just a furniture blanket.";

const pianoProcessSteps = pianoMovingProcess.steps;
const defaultProcess = houseMovingProcess.steps;

export const serviceSeoExtensions: Partial<Record<string, ServiceSeoExtension>> = {
  /**
   * Office and commercial were the only two services on the site with no
   * bodyParagraphs at all, which left them the thinnest pages we run: roughly
   * 165 words of unique prose each against 342 for house moving.
   *
   * They are also the biggest search opportunity we have. Non-brand GSC, 90
   * days to 2026-08-02: office and commercial queries pull 18,021 impressions
   * at average position 23.5, ahead of residential's 15,211, with 57 queries
   * already inside position 20. Unlike residential, where a three-slot map
   * pack takes the click before anyone reaches an organic result, B2B buyers
   * read and compare, so depth on the page is the thing that moves it.
   *
   * Three high-volume terms appeared nowhere on either page before this:
   * "removalists" (1,764 impressions, position 15.7), "office furniture"
   * (~884 across three variants) and "corporate relocation" (173). They are
   * worked in below as the words a buyer would actually use, not as keywords.
   */
  "office-moving": {
    bodyTitle: "What an office move actually involves",
    bodyParagraphs: [
      "The expensive part of an office move is rarely the moving. It is the hours your team cannot work. An after-hours or weekend crew costs more per hour and usually still comes out cheaper once you count the salaries sitting idle, which is why we would rather quote you for the Saturday than watch a floor of people queue for one lift.",
      "Workstations come apart, and the screws, brackets and cables for each desk go into a bag labelled for that desk, so the right hardware goes back into the right desk at the other end. It is the same habit our crews use on beds and dining tables at a house move.",
      "Office furniture is the part people underestimate. Compactus units, four-drawer filing, server racks that need to stay upright, boardroom tables that went in before the walls did and will not come out in one piece. Those are the items that turn a one-day move into two, so on medium and large floors we would rather come and look than take your word for the desk count.",
      "One thing worth knowing early: building managers usually want our insurance details before they will let a crew in, and that takes a day to turn around. We hold SiteWise Gold certification with a 90%+ health and safety score, which is what gets a crew onto managed and construction sites at all.",
    ],
    faqs: officeServiceFaqs,
    processTitle: workplaceMovingProcess.title,
    processSteps: [
      {
        title: "Walkthrough of both sites",
        body: "We look at the space you are leaving and the one you are going to. Lift sizes, dock access, door widths, and what actually needs to move rather than what should have been thrown out.",
      },
      {
        title: "Written plan and quote",
        body: "Crew size, truck count, timing, and the after-hours or weekend window if you need one. Fixed in writing before you commit.",
      },
      {
        title: "Access booked in advance",
        body: "Lifts, loading zones, dock times, security sign-in and building manager requirements confirmed ahead of the day, along with the certificate of insurance if the building wants one.",
      },
      {
        title: "Move and set down",
        body: "Desks broken down with the hardware bagged and labelled, IT wrapped, and everything set down where your floor plan says it goes rather than stacked in a corridor.",
      },
      {
        title: "Set back up",
        body: "Desks rebuilt and boxes in the right rooms, then a walk through the floor with you before we leave."
      },
    ],
  },
  "commercial-moving": {
    bodyTitle: "How commercial work is different",
    bodyParagraphs: [
      "Commercial work runs to a window rather than a day. A shop fit out has a date the doors open. An install slot in a managed building might be a few hours on a weekday morning, and if you miss it you wait for the next one. We plan the crew and the gear around your window, not ours.",
      "Prequalification is the other difference. On retail, construction and managed sites, paperwork decides whether a crew gets through the gate before anyone lifts anything, and plenty of movers cannot produce it. Ours is in order, which is why we get booked for the jobs that need it.",
      "Past the standard fit out work, we take the awkward end: spa pools, pool tables, safes, marble tops, kilns and machinery, with balcony hoists and crane lifts when the stairwell is not an option. If you are not sure whether something is movable, send photos of both ends and we will tell you what it needs.",
    ],
    faqs: commercialServiceFaqs,
    processTitle: workplaceMovingProcess.title,
    processSteps: [
      {
        title: "Tell us the window",
        body: "Access times, install date, trading hours, and any site inductions. This is what the plan is built around.",
      },
      {
        title: "Site scope",
        body: "We look at both ends: floor loadings, lift and stair access, dock height, and what gear the job actually needs.",
      },
      {
        title: "Prequalification sorted",
        body: "SiteWise documentation, insurance certificates, and site inductions handled before the day so nobody is turned away at the gate.",
      },
      {
        title: "Delivered to the window",
        body: "Crew and gear sized to hit the slot. Fixtures protected, positioned where the fit out team needs them.",
      },
      {
        title: "Sign off",
        body: "Walk the job with you, confirm nothing is outstanding, and book the next run if it is recurring work.",
      },
    ],
  },
  "packing-services": {
    bodyParagraphs: [
      "Our packing crew arrives the day before your move with cartons, paper, and wrap. Kitchens, fragile items, and wardrobes are packed room by room so load day is faster and safer.",
      "We label boxes by room and priority so unload at your new address is straightforward. Partial packs are available when you only need help with breakables or a few rooms.",
    ],
    faqs: packingServiceFaqs,
    processTitle: "Packing process",
    processSteps: [
      { title: "Quote by bedroom count", body: "Fixed packing price based on home size. Add packing when you request your moving quote." },
      { title: "Pack day", body: "Crew packs the day before move day with materials supplied." },
      { title: "Move day", body: "Pre-packed cartons load faster, your move crew handles furniture and transport." },
      { title: "Unpack on request", body: "Unpacking and box removal can be added when you book." },
    ],
  },
  "hard-to-shift": {
    bodyParagraphs: [
      "Spa pools, large safes, gym equipment, and oversized furniture need planning, we scope access, weight, and equipment before we quote.",
      "Padded blankets, custom dollies, and extra crew are arranged when needed. We have moved spa pools, bathtubs, and commercial fit-outs across Auckland and the Waikato.",
    ],
    faqs: generalServiceFaqs,
    processTitle: "Specialist item process",
    processSteps: defaultProcess,
  },
  "cleaning-services": {
    bodyParagraphs: [
      "Exit cleans are fixed-price by bedrooms and bathrooms on our booking form, no hourly surprises. Kitchen, bathrooms, floors, and living areas are cleaned to tenancy inspection standard.",
      "Settlement-day and post-construction cleans are available across Auckland, Hamilton, and Waikato towns. Add extra living rooms on the form when you need them.",
    ],
    faqs: cleaningServiceFaqs,
    processTitle: "Exit clean process",
    processSteps: [
      { title: "Fixed quote online", body: "Select bedrooms, bathrooms, and clean type for an instant fixed price." },
      { title: "Schedule around move-out", body: "We book your clean to align with handover or settlement." },
      { title: "Inspection-ready finish", body: "Kitchen, bathrooms, and living areas cleaned to standard." },
      { title: "Invoice matches quote", body: "Fixed price on the form is what you pay, no hidden add-ons." },
    ],
  },
  "international-moving": {
    bodyParagraphs: [
      "International and inter-island moves are planned in stages: inventory or viewing, written quote, confirmed dates, then pack, export wrap, and coordinated delivery.",
      "We work with trusted partners for overseas freight; North and South Island relocations are run with our own crews and clear timelines.",
      "Sole-use containers, shared sea freight, and air freight are explained for your load size. Storage in transit is available when collection and delivery dates do not align.",
    ],
    faqs: generalServiceFaqs,
    processTitle: "International move process",
    processSteps: defaultProcess,
    piano: false,
  },
  "loading-unloading": {
    bodyParagraphs: [
      "Hire our crew and truck for load-only, unload-only, or both, ideal when you are moving yourself but need experienced movers for the heavy work.",
      "We bring blankets, straps, and the right crew size for stairs and bulky items. Priced by the hour with a clear minimum call-out.",
      "Popular for container deliveries, storage unit loads, and DIY moves where you drive the truck but want professional help at each end.",
    ],
    faqs: generalServiceFaqs,
    processTitle: "Load and unload process",
    processSteps: [
      { title: "Scope the job", body: "Tell us addresses, stairs, and what needs moving." },
      { title: "Crew and truck", body: "We confirm crew size, hourly rate, and arrival window." },
      { title: "Load or unload", body: "Careful handling with blankets and straps as standard." },
      { title: "Sign-off", body: "Walk through with the team leader before we leave." },
    ],
  },
  /**
   * Every fact about the grant here is taken from workandincome.govt.nz
   * (Moving Costs Grant) and check.msd.govt.nz, checked August 2026.
   *
   * Do not add "WINZ approved mover", "registered WINZ supplier" or any
   * equivalent, however well those phrases search. Work and Income does not
   * approve, register, accredit or list moving companies, and its own page says
   * only that you need "proof of your moving costs, like a quote from the
   * moving company". Competitors do make the claim. Repeating it would be a
   * false representation of official approval, which is a Fair Trading Act
   * problem before it is an SEO one. The page ranks for the phrase by
   * correcting it instead.
   *
   * Deliberately no dollar amounts or grant limits: those change, and a stale
   * number on this page would be worse than no number. Point people at Work and
   * Income for current figures.
   */
  "winz-quotes": {
    bodyParagraphs: [
      "The payment most people mean by a WINZ moving quote is the Moving Costs Grant. Work and Income asks for \"proof of your moving costs, like a quote from the moving company\", so what you need from us is one written quote with real numbers on it.",
      "There is no such thing as a WINZ approved mover. Work and Income does not approve, register or accredit moving companies, and it does not keep a list of them. Any mover advertising that status is describing something that does not exist. What matters is that the quote is itemised, on letterhead, and detailed enough for a case manager to see what the money is for.",
      "Our quotes are written, itemised and dated, with the hourly rate, the crew size, the callout fee and the estimated hours set out separately. That is the format that gets approved without a second conversation.",
      "Tell us your application deadline when you get in touch. If you have a date with your case manager, say so, and we will work to it rather than to our usual turnaround.",
      "We quote home moves, packing and move-out cleaning the same way, across Auckland and the Waikato. If your application covers more than the truck, ask and we will itemise the rest of it too.",
    ],
    faqs: [
      {
        q: "How do I get a moving quote for Work and Income?",
        a: "Send us the pickup and delivery addresses, the number of bedrooms, the floor at each end, and your deadline. We come back with a written itemised quote, usually within 15 minutes during business hours and always within one business day. You then attach it to your Moving Costs Grant application. Call (021) 228 2728 if your deadline is sooner than that.",
      },
      {
        q: "Are you a WINZ approved mover?",
        a: "Nobody is. Work and Income does not approve, register or accredit moving companies, so there is no list to be on and no status to hold. Its own guidance asks only for proof of your moving costs, like a quote from the moving company. We give you a written itemised quote that meets that, which is all the application actually needs.",
      },
      {
        q: "How many quotes does Work and Income need?",
        a: "Work and Income's published guidance asks for proof of your moving costs, like a quote from the moving company, and does not state a number. Your case manager may ask for more than one, so check with them rather than assuming. Getting ours costs you nothing either way.",
      },
      {
        q: "Can I get a WINZ moving quote online?",
        a: "Yes. Use the quote form on this page or call us, and the written quote comes back by email ready to attach to your application. We only need to visit in person for larger or more complex homes, and we will tell you upfront if yours is one.",
      },
      {
        q: "Do you do WINZ quotes for South Auckland?",
        a: "Yes, across all of Auckland including Manukau, Papakura and Otara, and across the Waikato from our Hamilton base. Our hourly rate is the same everywhere in Auckland. Only the callout fee changes with distance from our Wairau Valley depot, and it is on the quote so your case manager can see it.",
      },
      {
        q: "What happens if my application is delayed or declined?",
        a: "The quote stays valid and there is no obligation on you. We do not ask for a deposit to hold a quote and we do not book a truck until you tell us the funding is confirmed. If the date moves, tell us and we will requote for the new one.",
      },
    ],
    processTitle: "How the quote fits your application",
    processSteps: [
      { title: "Tell us the deadline", body: "Your case manager's date matters more to us than ours." },
      { title: "Scope it properly", body: "Bedrooms, access and distance, by phone or a free viewing." },
      { title: "Written itemised quote", body: "Rate, crew, callout and hours listed separately, on letterhead." },
      { title: "Book once funding is confirmed", body: "No deposit, no obligation, and we requote if the date moves." },
    ],
  },
  "grand-piano": {
    bodyParagraphs: [
      pianoProtectionBody,
      "Grand piano moves include leg removal where required, piano board tilt, padded wrap, and placement at your new address.",
    ],
    faqs: grandPianoFaqs,
    processTitle: pianoMovingProcess.title,
    processSteps: pianoProcessSteps,
    piano: true,
  },
  "upright-piano": {
    bodyParagraphs: [
      pianoProtectionBody,
      "Upright pianos are wrapped, strapped, and moved on specialist dollies through tight hallways and doorways.",
    ],
    faqs: uprightPianoFaqs,
    processTitle: pianoMovingProcess.title,
    processSteps: pianoProcessSteps,
    piano: true,
  },
  "international-piano": {
    bodyParagraphs: [
      pianoProtectionBody,
      "International piano shipping includes export wrap, crating when required, and coordination with our freight partners.",
    ],
    faqs: grandPianoFaqs,
    processTitle: pianoMovingProcess.title,
    processSteps: pianoProcessSteps,
    piano: true,
  },
  "piano-storage": {
    bodyParagraphs: [
      pianoProtectionBody,
      "Climate-aware piano storage is available short or long term while sale, renovation, or international timing is sorted.",
    ],
    faqs: uprightPianoFaqs,
    processTitle: pianoMovingProcess.title,
    processSteps: pianoProcessSteps,
    piano: true,
  },
};

export function getServiceSeoExtension(slug: string): ServiceSeoExtension | undefined {
  return serviceSeoExtensions[slug];
}
