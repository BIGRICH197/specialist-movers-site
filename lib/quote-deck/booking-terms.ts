// Booking terms and conditions shown in the scroll-to-sign box on the booking
// form. THIS IS THE ONE PLACE TO EDIT THE WORDING.
//
// These are the official Specialist Movers Terms and Conditions (KB Logistics
// Limited). The booking form records the customer's typed signature + timestamp
// + scroll confirmation + this version string as the acceptance trail. If you
// change the wording, bump BOOKING_TERMS_VERSION so signatures record which
// version was agreed to.

export type BookingTermsSection = {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
  /** Paragraphs shown after the bullet list. */
  tail?: string[];
  /** Shown only in the scroll-to-sign box on the booking form, not on the public /policies page. */
  signOnly?: boolean;
};

export const BOOKING_TERMS_VERSION = "2026-09-official-18";
export const COMMERCIAL_TERMS_VERSION = "2026-10-commercial-3"; // residential terms + Business customers

export const bookingTerms: BookingTermsSection[] = [
  {
    heading: "Acceptance of items or goods for transportation",
    paragraphs: [
      "Please read the following information carefully. This information is for residential, commercial and business customers. Where price estimates are provided based on information given by the customer, Specialist Movers reserves the right to alter prices as a result of inaccurate information. Additional charges may also be incurred for additional labour required, storage, waiting time, services not requested and packing materials.",
      "Specialist Movers will ascertain if any personal items or commercial goods are not safe to transport or are insufficiently packaged that may cause potential damage to either the item being moved, other items, or the transport vehicle. We reserve the right to reject acceptance of any item/s or goods. All Specialist Movers professional movers follow strict Health and Safety regulations to ensure no unnecessary risks are taken with transporting any items or goods.",
      "Please note, any items that cannot be safely lifted or carried by two people must be disclosed and inspected by Specialist Movers. The recommended weight limit is a maximum of 80 kilograms for two professional movers. Additional resources/men may be required for heavier items, which will be at an additional charge.",
      "If you are in doubt and have any questions, please call us to discuss what alternative options are available before you book. We are happy to help and discuss the best solution.",
    ],
  },
  {
    heading: "Acceptance of these Terms",
    paragraphs: [
      "By confirming your booking, you acknowledge that you have read and accept these Terms and Conditions, including in particular that your goods are carried at owner's risk under the Contract and Commercial Law Act 2017 unless you have arranged separate insurance cover. We record the date and time your acceptance is given.",
    ],
  },
  {
    heading: "What forms your agreement with us",
    signOnly: true,
    paragraphs: [
      "Your agreement with Specialist Movers is made up of your written quote, your booking form, and these Terms and Conditions. Together they are the whole agreement between us, and they replace anything said or written before you booked, including in emails, phone calls, viewings, or advertising.",
      "Our team will always try to help and to answer your questions, but nothing a staff member or sales consultant says, and nothing in an earlier email, forms part of this agreement or changes it, unless it is set out in your written quote or confirmed in writing by our office as a variation. If someone tells you something that differs from these terms, or that matters to your decision to book, please ask us to confirm it in writing before you book. Only that written confirmation counts.",
      "Where your written quote and these terms differ, the quote applies to price, dates and scope, and these terms apply to everything else. Nothing in this clause limits your rights under the Consumer Guarantees Act 1993 or the Fair Trading Act 1986.",
    ],
  },
  {
    heading: "Jewellery & High Value Items",
    paragraphs: [
      "Insurance providers recommend that all small-value items are moved by the owner and are NOT included with the larger household items on the removal vehicle. This includes jewellery, family heirlooms, fragile antiques, passports and any cash or credit cards.",
    ],
  },
  {
    heading: "TV's & Electronics",
    paragraphs: [
      "Where possible, it is advisable that you move your TV and any smaller electronics in your own vehicle as they may be susceptible to damage while in transit.",
      "We take great care in the movement of electronic equipment; however, as goods are carried at owner's risk, we cannot be held responsible for electronics that cease working following a move, except where we cause the damage intentionally.",
    ],
  },
  {
    heading: "Whiteware Appliances",
    paragraphs: [
      "We are not plumbing specialists, and we do not connect or disconnect plumbed appliances such as washing machines or dishwashers. Please arrange a qualified plumber to disconnect and drain these appliances before your move, and to reconnect them afterwards. We are happy to transport whiteware once it has been safely disconnected and drained.",
    ],
  },
  {
    heading: "Removal of Fittings & Fixtures",
    paragraphs: [
      "Our crew are professional movers, not tradespeople, and we do not carry specialist tools such as drills. From time to time we may offer to help with small extras, such as taking a TV off a wall mount or removing a bracket or shelf. Any help of this kind is a complimentary courtesy only. It is not a professional removal or installation service, and it does not form part of your quoted move.",
      "If a fitting or fixture needs tools we do not carry, or specialist skill to remove or reinstall safely, we will not be able to do it, and you will need to arrange a qualified tradesperson yourself. Where we offer complimentary help of this kind, Specialist Movers is not responsible for the cost of engaging a tradesperson or any other third party, and is not liable for loss or damage arising from it, except where caused intentionally by our team.",
    ],
  },
  {
    heading: "Packing Services & Fragile Items",
    paragraphs: [
      "Where Specialist Movers is requested to provide packing services, including the supply of packing materials and labour, all packing is undertaken strictly on a best-endeavours basis only. Packing services do not constitute a guarantee against damage or loss.",
      "All goods, whether packed by Specialist Movers or by the Client, are transported at the owner's risk in accordance with the Contract and Commercial Law Act 2017, unless separate insurance has been arranged.",
      "Packing is billed on the hours worked and the materials used, at the rates on your quote. The packing figure on your quote is an estimate. If less needs packing on the day, including where items have already been packed or your own materials are used, you pay for what is done. If more needs packing, the additional hours and materials are charged at the quoted rates. Packing labour is not covered by the price cap promise below. Offers that depend on a full house pack, such as a complimentary exit clean, require the full pack as quoted; a reduced pack is not eligible, under the terms published at specialistmovers.co.nz/promotions.",
    ],
  },
  {
    heading: "Our packing and wrapping standard",
    paragraphs: [
      "We pack and wrap to the Specialist Movers standard: furniture wrapped in moving blankets, with shrink wrap where needed; fragile items wrapped individually in paper or bubble wrap and boxed; cartons labelled to the plan agreed with you on the day. Our crew lead decides how each item is packed, wrapped, loaded and stacked, and that decision is final on questions of safety.",
      "If you would like something done differently, tell the crew lead before the item is packed or loaded. We will accommodate reasonable requests where it is safe and practical. Where a request means re-doing work that already met our standard, working to a different standard, or using a method that takes longer than ours, for example wrapping items individually that we would normally wrap together, or not stacking goods on the truck, that is a variation to the quoted job. The extra time is charged at the packing or moving rate on your quote, and any extra materials are charged as used. We will tell you at the time where practicable.",
      "You are welcome to be present while we work. Please raise any concern with the crew lead, who will resolve it or call the office. Our crew are entitled to a safe and respectful workplace. If our crew are subjected to abuse or threats, or if an instruction from you would require them to work unsafely, we may pause or stop the job. Charges for the work done and materials used up to that point remain payable.",
    ],
  },
  {
    heading: "Fragile, Delicate & Breakable Items",
    paragraphs: ["Fragile items include, but are not limited to:"],
    bullets: [
      "Glassware, mirrors, windows, and framed items",
      "Crockery, china, crystal, ornaments, and ceramics",
      "Lamps, light fittings, and decorative household items",
    ],
    tail: [
      "As goods are carried at owner's risk, and while reasonable care is taken, Specialist Movers accepts no liability for breakage, cracking, chipping, or internal damage to fragile or delicate items, including when such items are packed by our staff, except where such damage is caused intentionally.",
      "Items with pre-existing damage, wear, hairline fractures, or inherent weaknesses are packed and transported entirely at the Client's risk. Specialist Movers is not responsible for damage that occurs as a result of such pre-existing conditions.",
    ],
  },
  {
    heading: "Packed Cartons & Concealed Damage",
    paragraphs: [
      "As goods are carried at owner's risk, Specialist Movers accepts no responsibility for:",
    ],
    bullets: [
      "Damage to the contents of sealed cartons",
      "Internal or concealed damage not immediately visible upon delivery",
      "Damage discovered after cartons have been unpacked by the Client",
    ],
    tail: [
      "We ask that, where practical, cartons are unpacked and inspected at the time of delivery. This clause does not limit your rights under the Consumer Guarantees Act 1993.",
    ],
  },
  {
    heading: "Items Packed by the Client",
    paragraphs: [
      "All items packed by the Client are transported entirely at the Client's risk. Specialist Movers accepts no responsibility for loss or damage arising from inadequate, unsuitable, or insufficient packing by the Client.",
    ],
  },
  {
    heading: "Excluded Items",
    paragraphs: [
      "The following items must not be packed or transported by Specialist Movers and remain the sole responsibility of the Client:",
    ],
    bullets: [
      "Jewellery, cash, credit cards, passports, and important documents",
      "High-value, irreplaceable, or sentimental items",
      "Perishable goods, flammable, hazardous, or dangerous materials",
    ],
    tail: [
      "If such items are packed or transported at the Client's request, this is done entirely at the Client's risk.",
    ],
  },
  {
    heading: "Unpacking Services",
    paragraphs: [
      "Where unpacking services are provided, they are limited to the removal of items from cartons only. Specialist Movers does not accept responsibility for damage identified during or after unpacking unless it results from our failure to carry out the service with reasonable care and skill.",
      "Packing services provided by Specialist Movers do not include insurance cover unless expressly agreed in writing prior to the move.",
    ],
  },
  {
    heading: "Hourly Charges",
    paragraphs: [
      "After the first hour, we charge in 30-minute increments. Unlike other moving companies we do not charge depot to depot; rather our call-out fee covers the time taken for our movers to get to the pick-up address.",
    ],
  },
  {
    heading: "Price cap promise",
    paragraphs: [
      "Where your house move quote gives an estimate of moving hours and the move runs more than 2 hours over that estimate, the extra time is free. The most an hourly move will bill is the quoted moving hours plus two, at the rate on your quote. The cap applies to the moving crew’s working time on the move only. It does not apply to packing, unpacking or furniture wrapping labour, which are estimates billed on the time actually taken, with the quoted packing price as the minimum. Materials, the call-out fee, the fuel surcharge and any additional service added on the day are charged as they are used.",
      "The promise assumes the job we quoted is the job we arrive to. It does not apply to time added by any of the following:",
    ],
    bullets: [
      "Settlement delays — settlement not confirming or being pushed out, funds not cleared, keys not released, or a handover not happening when it was meant to. Settlement is between you, your lawyer and the other party; we cannot move it, and the time we spend waiting on it is yours.",
      "Information given to us at quote time being wrong or incomplete — more to move than described, items not mentioned, or stairs, access or parking we were not told about.",
      "The job changing after the quote — a different or additional address, a changed date, extra goods, or a service added on the day.",
      "The home not being ready to load when we arrive — packing unfinished, rooms not cleared, or the previous occupant still in.",
      "Access not being available when we arrive — a lift or loading dock booked by someone else, a locked building or gate, or a landlord or body-corporate approval still outstanding.",
      "A third party delaying us — another trade still on site, or anyone acting on your behalf.",
      "Conditions outside our reasonable control — weather, traffic, road closures, or an accident en route.",
      "Instructions given on the day that change how we work — for example not stacking or double-loading goods, wrapping or re-wrapping items that already met our standard, extra trips, or asking us to stand down a crew member. These are variations to the quoted job, and the time they add is charged at the rate on your quote. Where practicable we will tell you at the time that an instruction will add chargeable time.",
      "Crew or trucks added on the day at your request, or made necessary by any of the above. Additional crew are charged at our standard per-mover rate, pro-rata, from the time they start; we will tell you before adding them where practicable.",
    ],
    tail: [
      "In those cases the hours reflect the actual job and are charged at the rate on your quote. Time we spend waiting is chargeable and does not count towards the two hours. The cap exists so that our own underestimate is our problem rather than yours; it is not cover for a delay neither of us caused.",
      "The cap applies to the estimate on your current written quote. If the job changes and we re-quote, the new estimate replaces the old one. We may vary or withdraw this promise for new bookings at any time; a booking already confirmed keeps the promise it was booked under.",
    ],
  },
  {
    heading: "Delays",
    paragraphs: [
      "All work is carried out on a best-endeavours basis. Whilst we try our best to make it on time to every booking and delivery, we sometimes have delays outside our control caused by factors such as heavy traffic. To the extent permitted by law, Specialist Movers is not liable for personal or business losses arising from delays, whether directly or indirectly.",
      "Where a delay outside our reasonable control extends the job — most commonly a settlement delay, but also keys not released, a lift or access unavailable, or the property not ready — the additional time is charged at the rate on your quote and sits outside the Price cap promise above.",
    ],
  },
  {
    heading: "Access, lifts, parking and building rules",
    paragraphs: [
      "Arranging access is your responsibility. Before the day, you must arrange and confirm at both addresses: entry to the building and the property, including keys, codes, gates and anyone who needs to be present; lift bookings and any lift protection or padding the building requires; a loading dock or legal parking for our truck as close to the entrance as possible; and any approval, move-in or move-out rules, time windows, bonds or certificates of insurance required by a body corporate, building manager or landlord. Tell us at quote time about stairs, lift size, time limits, and the distance from where the truck can park to your door.",
      "If access, a lift or parking is unavailable or restricted when we arrive, the time we spend waiting, the extra carrying distance and any extra trips are charged at the rate on your quote and sit outside the price cap promise. Parking fees or fines incurred because legal parking was not arranged, and any building charges such as lift booking fees, are passed on to you at cost. If we cannot get access at all, the call-out fee and any time on site are charged and the job is rescheduled.",
      "We are not liable for delays or incomplete work caused by access, lift, parking or building restrictions, or by a body corporate, building manager or landlord refusing or limiting entry.",
    ],
  },
  {
    heading: "Cancellations",
    paragraphs: [
      "Bookings cancelled within 24 hours of the move date will incur a cancellation fee of $200 + GST, as it is likely to be too late for us to find a replacement job.",
    ],
  },
  {
    heading: "The Contract and Commercial Law Act 2017 - Owner's Risk",
    paragraphs: [
      "Your move is a contract for the carriage of goods under the Contract and Commercial Law Act 2017. That Act expressly allows goods to be carried on an owner's risk basis. By accepting these Terms and confirming your booking, you agree that your goods are carried at owner's risk.",
      "Owner's risk means you carry the risk of loss of or damage to the goods being moved, and Specialist Movers is not liable for that loss or damage, except where we cause it intentionally. Insurance is not included for household goods or personal effects, and our prices do not include insurance cover.",
      "\"All goods are carried at the owner's risk. This means that we (the carrier) will pay no compensation if the goods are lost or damaged, unless we (the carrier) intentionally lose or damage them.\"",
      "This owner's risk arrangement applies to loss of or damage to the goods we carry. It does not remove your separate rights under the Consumer Guarantees Act 1993 in relation to the moving service itself, which we will carry out with reasonable care and skill. In particular, owner's risk does not cover damage we negligently cause to your property, such as your home, floors, or vehicle, while performing the service.",
    ],
  },
  {
    heading: "Notification of Damage",
    paragraphs: [
      "Your goods are carried at owner's risk, so Specialist Movers is not liable for loss of or damage to them unless we caused it intentionally. If you have arranged transit insurance, any loss or damage to your goods is claimed through your insurer, and we will provide the photos and information your insurer reasonably needs. The claims you can make against us are limited to: damage to your goods that you say we caused intentionally; damage to your property, such as your home, the building, floors or your vehicle, caused by our negligence while performing the service; and a claim under the Consumer Guarantees Act 1993 about the service itself.",
      "Any such claim must be notified to us in writing within 24 hours of the incident so that we can assess the circumstances while the details are fresh. Claims made outside this period may not be considered.",
      "Photos are required. A claim must include photos showing the item's condition before the move and the damage after it. Please photograph valuable or fragile items before packing day, and any damage before it is moved, cleaned or repaired. Our crew may photograph goods and property at both addresses before and after the move, and we may rely on those photos in assessing a claim. Without before and after photos we may be unable to assess a claim.",
      "Nothing in this clause limits any statutory rights you may have under the Consumer Guarantees Act 1993 or the Contract and Commercial Law Act 2017.",
    ],
  },
  {
    heading: "Payment",
    paragraphs: [
      "Our standard procedure is payment on completion of your move, on the day, unless we have agreed other terms with you in writing before the move. We reserve the right to ask for payment before our crew leave the delivery address, or at the end of each completed service where a booking covers more than one day, for example packing, moving and cleaning.",
      "Later scheduled services: if any part of your invoice is unpaid by its due date, we may postpone or withhold any further scheduled service on the same booking, including cleaning, unpacking, a second day, storage collection or a return trip, until the balance is paid. Complimentary inclusions, such as a free exit clean, are provided on the condition that the invoice for the move is paid in full and on time. If it is not, the inclusion is withdrawn and may be rebooked at our standard price.",
      "Concerns: if you have a concern about your invoice or about the service, raise it with us in writing within 24 hours of completion, with the reason, so we can look into it while the details are fresh. Concerns raised after that may not be considered. We will respond within 2 business days. Raising a concern does not extend the due date for any part of the invoice that is not in question, and where we agree an adjustment we will issue a credit or refund.",
      "Overdue accounts: if payment is not received within 3 days of the due date, interest of 2% per month, calculated daily, is charged on the overdue balance, and a $49 overdue admin fee, which reflects our administration cost, is added to your invoice. If payment is not received within 15 days of the due date, your details will be sent for debt collection, and our reasonable costs of recovery, including collection agency fees, will be your responsibility to cover to the extent permitted by law.",
      "Nothing in this section limits your rights under the Consumer Guarantees Act 1993 or the Fair Trading Act 1986.",
    ],
  },
  {
    heading: "Insurance Cover",
    paragraphs: [
      "Specialist Movers strongly recommends that all customers ensure there is adequate insurance cover in place for private and commercial items and goods.",
      "While every care is taken when transporting private items and goods, accidents can and may happen. For this reason, Specialist Movers advises customers to contact your home and contents insurance provider and ask for specific transit cover for the duration of the move. Most home and contents policies do not specifically cover goods in transit as part of a private move, although transit cover can often be added if arranged in advance. Alternatively, we can arrange insurance on your behalf through our insurance broker.",
      "If you do not wish to take out your own insurance, you acknowledge and accept that you are using our services at owner's risk as defined by the Contract and Commercial Law Act 2017. This means goods are transported at your risk, and Specialist Movers is not liable for loss of or damage to those goods except where we cause it intentionally.",
      "This owner's risk position governs liability for the goods we carry. Separately, the Consumer Guarantees Act 1993 continues to apply to the extent it cannot lawfully be excluded, including our guarantee to carry out the moving service with reasonable care and skill.",
    ],
  },
  {
    heading: "Specialist Movers Insurance Terms and Conditions - Pianos Only",
    paragraphs: [
      "Specialist Movers provides insurance-backed cover of up to $2,000 for pianos we move, subject to conditions which we will provide to you in writing on request before your move.",
      "If we are delivering your piano from a piano retailer, you can disregard the above, as your piano is covered by the retailer you have purchased from.",
    ],
  },
];

// Shown IN ADDITION to the moving terms when the booking includes cleaning.
// Full text recovered from the JotForm source (form 241337586237866, field 58).
export const cleaningTerms: BookingTermsSection[] = [
  {
    heading: "Specialist Cleaners - Terms and Conditions",
    paragraphs: [
      "These Terms and Conditions apply to all residential, commercial, and end-of-tenancy cleaning services provided by Specialist Cleaners (we, us, our) to the customer (you, the Client).",
      "By booking a cleaning service with us, you agree to the following terms.",
    ],
  },
  {
    heading: "1. Scope of Cleaning Services",
    paragraphs: [
      "Our cleaning services are provided strictly in accordance with our Cleaning Schedule / End of Tenancy Cleaning List as supplied at the time of booking.",
      "Only the items listed in the schedule are included in the standard service. Any services listed as Optional Extras must be requested and confirmed prior to the booking. Any services listed as Excluded are not covered, including under any re-clean or guarantee.",
    ],
  },
  {
    heading: "2. End of Tenancy / Bond Cleans",
    paragraphs: [
      "Real estate agencies and property managers may have specific or additional requirements for bond or end-of-tenancy cleans.",
      "It is the Client's responsibility to review their tenancy agreement and advise us before the service of any special conditions. If we are not informed of additional requirements prior to the clean, these items are not included and not covered under our guarantee.",
    ],
  },
  {
    heading: "3. Estimates & Pricing Adjustments",
    paragraphs: [
      "Where price estimates are provided based on information supplied by the Client, we reserve the right to adjust pricing if:",
    ],
    bullets: [
      "The property condition differs from what was disclosed",
      "Additional time, labour, or services are required",
      "Optional extras were not previously advised",
      "The property is excessively dirty or requires intensive cleaning",
    ],
    tail: ["Any additional costs will be discussed with the Client where possible."],
  },
  {
    heading: "4. Access & Property Condition",
    paragraphs: ["The Client must ensure:"],
    bullets: [
      "Safe, unobstructed access to the property at the scheduled time",
      "Electricity and water are connected and available",
      "The property is vacant (unless otherwise agreed)",
      "All personal belongings have been removed where required",
    ],
    tail: [
      "We are not responsible for delays or incomplete work due to lack of access or unsafe conditions.",
    ],
  },
  {
    heading: "5. Health & Safety",
    paragraphs: [
      "We operate under strict Health and Safety practices.",
      "We reserve the right to refuse or discontinue services if:",
    ],
    bullets: [
      "There are unsafe conditions",
      "Biohazards, animal waste, or hazardous materials are present",
      "Cleaning would result in damage to the property or surfaces",
    ],
  },
  {
    heading: "6. Cleaning Limitations & Wear and Tear",
    paragraphs: [
      "Cleaning improves appearance but does not restore items to as new condition.",
      "The following are considered normal wear and tear and are not guaranteed outcomes:",
    ],
    bullets: [
      "Permanent staining",
      "Discolouration",
      "Scratches, chips, rust, or damage",
      "Nicotine or smoke staining",
      "Mould beyond surface-level cleaning",
    ],
  },
  {
    heading: "7. Excluded Services",
    paragraphs: [
      "The following are excluded from our services and guarantee (non-exhaustive list):",
    ],
    bullets: [
      "Carpet shampooing or wet carpet cleaning",
      "Full wall washing (internal or external)",
      "Tile & grout specialist cleaning",
      "Oil or grease removal from garages or driveways",
      "Chandelier or high-reach cleaning beyond step-ladder height",
      "Outdoor rubbish bins, large decks, or extensive exterior areas",
      "Animal waste, gardening, or garden waste removal",
    ],
    tail: ["(Refer to full exclusions list in the Cleaning Schedule.)"],
  },
  {
    heading: "8. Guarantee & Re-Clean Policy",
    paragraphs: ["Where a re-clean guarantee is offered:"],
    bullets: [
      "The Client must notify us within 48 hours of service completion",
      "The issue must relate to items included in the original cleaning scope",
      "We must be given the opportunity to re-clean before third-party cleaners are engaged",
    ],
    tail: [
      "The guarantee does not apply to excluded services, wear and tear, or undisclosed requirements.",
    ],
  },
  {
    heading: "9. Damage & Liability",
    paragraphs: ["While every care is taken, we do not accept responsibility for:"],
    bullets: [
      "Pre-existing damage",
      "Damage caused by faulty fixtures, fittings, or surfaces",
      "Items that deteriorate due to age, poor condition, or improper installation",
    ],
    tail: ["Any concerns must be reported within 24 hours of service completion."],
  },
  {
    heading: "10. Delays",
    paragraphs: [
      "All services are carried out on a best-endeavours basis.",
      "We are not liable for delays caused by factors outside our control, including traffic, weather, or access issues.",
    ],
  },
  {
    heading: "11. Cancellations",
    paragraphs: [],
    bullets: [
      "Cancellations within 24 hours of the booking may incur a cancellation fee",
      "Same-day cancellations may be charged up to the full service amount",
    ],
  },
  {
    heading: "12. Payment Terms",
    paragraphs: [],
    bullets: [
      "Payment is due within 24 hours of service completion unless agreed otherwise",
      "Overdue accounts may incur an administration fee",
      "Unpaid accounts may be referred for debt collection, with associated costs payable by the Client",
      "Where the clean is a complimentary inclusion with a full pack and move, it is conditional on the invoice for the move being paid in full by its due date. A complimentary clean has no cash value and cannot be exchanged for a credit or discount. Any add-ons or extras requested for a complimentary clean are charged at our standard prices and are payable before the clean",
    ],
  },
  {
    heading: "13. Insurance",
    paragraphs: [
      "We recommend Clients ensure appropriate insurance is in place.",
      "Unless otherwise stated, cleaning services are provided at the Client's risk, as permitted under New Zealand law.",
    ],
  },
  {
    heading: "14. Consumer Guarantees Act 1993",
    paragraphs: [
      "Nothing in these Terms limits your rights under the Consumer Guarantees Act 1993.",
    ],
  },
];

// Office and commercial / general terms (Richard, 2026-10-03): the residential
// terms, which are the ones we have worked on, plus a short section for
// customers booking for a business. They replaced a thinner, separate
// commercial set that called every price fixed and switched the Consumer
// Guarantees Act off for everyone, including a private customer moving a
// fridge. The piano-only cover clause is left out (pianos book on the
// residential terms). The three things worth keeping from the old set (the
// s43 CGA business exclusion, account terms, the liability limit) now apply
// only where the customer is in fact a business.
export const businessCustomersTerms: BookingTermsSection = {
  heading: "Business customers",
  paragraphs: [
    "This section applies only where you are booking our services for the purposes of a business. If you are booking as a private individual, it does not apply to you and the rest of these terms apply in full.",
    "Consumer Guarantees Act: as you are acquiring these services for the purposes of a business, the parties agree, in accordance with section 43 of the Consumer Guarantees Act 1993, that the Consumer Guarantees Act 1993 does not apply to this booking. Nothing in these terms contracts out of any right that cannot lawfully be excluded.",
    "Account customers: where you hold an approved credit account with us, we invoice on account and payment is due in full by the 20th of the month following the date of the invoice, without deduction or set-off. Without an approved account, payment is as set out under Payment above.",
    "Limitation of liability: to the maximum extent permitted by law, our total liability arising out of or in connection with this booking is limited to the value of the services provided, and we are not liable for any indirect or consequential loss, including loss of profit, revenue or business interruption.",
  ],
};

export const commercialTerms: BookingTermsSection[] = [
  ...bookingTerms.filter((sec) => !/pianos only/i.test(sec.heading)),
  businessCustomersTerms,
];
