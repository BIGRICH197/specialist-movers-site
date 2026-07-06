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
};

export const BOOKING_TERMS_VERSION = "2026-07-official-3";

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
    heading: "Packing Services & Fragile Items",
    paragraphs: [
      "Where Specialist Movers is requested to provide packing services, including the supply of packing materials and labour, all packing is undertaken strictly on a best-endeavours basis only. Packing services do not constitute a guarantee against damage or loss.",
      "All goods, whether packed by Specialist Movers or by the Client, are transported at the owner's risk in accordance with the Contract and Commercial Law Act 2017, unless separate insurance has been arranged.",
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
    heading: "Delays",
    paragraphs: [
      "All work is carried out on a best-endeavours basis. Whilst we try our best to make it on time to every booking and delivery, we sometimes have delays outside our control caused by factors such as heavy traffic. To the extent permitted by law, Specialist Movers is not liable for personal or business losses arising from delays, whether directly or indirectly.",
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
      "Insurance is not included for household goods and personal effects. Our prices do not include insurance cover. Our transport delivery service is carried at the owner's (customer's) risk with no insurance, as defined by the Contract and Commercial Law Act 2017.",
      "\"All goods are carried at the owner's risk. This means that we (the carrier) will pay no compensation if the goods are lost or damaged, unless we (the carrier) intentionally lose or damage them.\"",
      "For clarity, this owner's-risk arrangement applies to loss of or damage to the goods we carry. It does not affect any rights you have under the Consumer Guarantees Act 1993 in relation to other matters, for example damage we negligently cause to your property (such as your home, floors or vehicle) while performing the service.",
    ],
  },
  {
    heading: "Notification of Damage",
    paragraphs: [
      "If you believe that Specialist Movers is responsible for any loss or damage, you must notify us within 24 hours of the incident so that we can assess the circumstances and determine liability. Claims made outside this period may not be considered. Nothing in this clause limits any statutory rights you may have under the Consumer Guarantees Act 1993 or the Contract and Commercial Law Act 2017.",
    ],
  },
  {
    heading: "Payment",
    paragraphs: [
      "Payment is due within 24 hours of completion of your move unless agreed otherwise. After 14 days of non-payment a $49 overdue admin fee will be added to your invoice. After 30 days of non-payment your details will be sent for debt collection, and all costs incurred in doing so will be your responsibility to cover.",
    ],
  },
  {
    heading: "Insurance Cover",
    paragraphs: [
      "Specialist Movers strongly recommends that all customers ensure there is adequate insurance cover in place for private and commercial items and goods.",
      "While every care is taken when transporting private items and goods, accidents can and may happen. For this reason, Specialist Movers advises customers to contact your home and contents insurance provider and ask for specific transit cover for the duration of the move. Most home and contents policies do not specifically cover goods in transit as part of a private move, although transit cover can often be added if arranged in advance. Alternatively, we can arrange insurance on your behalf through our insurance broker.",
      "If you do not wish to take out your own insurance, you acknowledge and accept that you are using our services at owner's risk as defined by the Contract and Commercial Law Act 2017. This means goods are transported at your risk, and Specialist Movers is not liable for loss of or damage to those goods except where we cause it intentionally.",
      "Nothing in these terms limits your rights under the Consumer Guarantees Act 1993.",
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
