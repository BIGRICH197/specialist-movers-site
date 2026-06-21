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

export const BOOKING_TERMS_VERSION = "2026-06-official-1";

export const bookingTerms: BookingTermsSection[] = [
  {
    heading: "Acceptance of items or goods for transportation",
    paragraphs: [
      "Please read the following information carefully. This information is for residential, commercial and business customers. Where price estimates are provided based on information given by the customer, Specialist Movers reserves the right to alter prices as a result of inaccurate information. Additional charges may also be incurred for additional labour required, storage, waiting time, services not requested and packing materials.",
      "Specialist Movers will ascertain if any personal items or commercial goods are not safe to transport or are insufficiently packaged that may cause potential damage to either the item being moved, other items, or the transport vehicle. We reserve the right to reject acceptance of any item/s or goods. All the Specialist Movers professional movers follow strict Health and Safety regulations to ensure no unnecessary risks are taken with transporting any items or goods.",
      "Please note, any items that cannot be safely lifted or carried by two people must be disclosed and inspected by Specialist Movers. The recommended weight limit is a maximum of 80 kilograms for two professional movers. Additional resources/men may be required for heavier items which will be at an additional charge.",
      "If you are in doubt and have any questions, please call us to discuss what alternative options are available before you book, we are happy to help and discuss the best solution.",
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
      "We take great care in the movement of electronic equipment; however, we cannot be held responsible for electronics that may cease working following a move.",
    ],
  },
  {
    heading: "Whiteware Appliances",
    paragraphs: [
      "We are not plumbing specialists. If we are requested to connect your washing machine or dishwasher taps, we will do so but do not accept responsibility if there are subsequent issues, leaks, flooding or if the connection fails.",
      "It is advised that the owner be present to check that there are no leaks on the first cycle wash after connection.",
    ],
  },
  {
    heading: "Packing Services & Fragile Items",
    paragraphs: [
      "Where Specialist Movers is requested to provide packing services, including the supply of packing materials and labour, all packing is undertaken strictly on a best endeavours basis only. Packing services do not constitute a guarantee against damage or loss.",
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
      "While reasonable care is taken, Specialist Movers accepts no liability for breakage, cracking, chipping, or internal damage to fragile or delicate items, including when such items are packed by our staff.",
      "Items with pre-existing damage, wear, hairline fractures, or inherent weaknesses are packed and transported entirely at the Client's risk. Specialist Movers is not responsible for damage that occurs as a result of such pre-existing conditions.",
    ],
  },
  {
    heading: "Packed Cartons & Concealed Damage",
    paragraphs: ["Specialist Movers accepts no responsibility for:"],
    bullets: [
      "Damage to the contents of sealed cartons",
      "Internal or concealed damage not immediately visible upon delivery",
      "Damage discovered after cartons have been unpacked by the Client",
    ],
    tail: [
      "Unless cartons are unpacked and inspected in the presence of Specialist Movers at the time of delivery, all contents are deemed to have been delivered in satisfactory condition.",
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
      "If such items are packed or transported at the Client's request, this is done entirely at the Client's risk, and Specialist Movers accepts no liability whatsoever.",
    ],
  },
  {
    heading: "Unpacking Services",
    paragraphs: [
      "Where unpacking services are provided, they are limited to the removal of items from cartons only. Specialist Movers does not accept responsibility for damage identified during or after unpacking unless notified within 24 hours and proven to be directly caused by our actions.",
      "Packing services provided by Specialist Movers do not include insurance cover unless expressly agreed in writing prior to the move.",
    ],
  },
  {
    heading: "Hourly Charges",
    paragraphs: [
      "After the first hour, we charge in 30-minute increments. Unlike other moving companies we do not charge depot to depot, rather our call out fee covers the time taken for our movers to get to the pick-up address.",
    ],
  },
  {
    heading: "Delays",
    paragraphs: [
      "All work is carried out on a best endeavours basis. Whilst we try our best to make it on time to every booking and delivery, we sometimes have delays outside our control caused by factors such as heavy traffic. Specialist Movers is not liable for personal or business losses arising from delays either directly or indirectly.",
    ],
  },
  {
    heading: "Cancellations",
    paragraphs: [
      "Bookings cancelled within 24 hours of the move date will incur a cancellation fee of $200+gst, this is because it is likely it will be too late for us to find a replacement job.",
    ],
  },
  {
    heading: "Payment",
    paragraphs: [
      "Payment is due within 24 hours of completion of your move unless agreed otherwise.",
    ],
  },
  {
    heading: "The Contract and Commercial Law Act 2017",
    paragraphs: [
      "Insurance is not included for Household Goods and Personal Effects.",
      "Please note our prices do not include insurance cover. Our transport delivery service is carried at the Owner's (Customer's) risk with no insurance. As defined by The Contract and Commercial Law Act 2017.",
      "All goods are carried at the owner's risk. This means that we (the carrier) will pay no compensation if the goods are lost or damaged, unless we (the carrier) intentionally loses or damages them.",
    ],
  },
  {
    heading: "Notification of Damage",
    paragraphs: [
      "If you (the Client) believe that we (Specialist Movers) are responsible for any damage, you must notify us within 24 hours of the incident. This notification allows us to assess the circumstances and determine liability. Claims made after this 24-hour period will not be considered for compensation.",
    ],
  },
  {
    heading: "Payment Terms",
    paragraphs: [
      "Payment is required within 24 hours of completion of your move. Please note, after 14 days of non-payment there will be a $49 overdue admin fee added to your invoice. After 30 days of non-payment your details will be sent for debt collection and all costs incurred in doing so will be your responsibility to cover.",
    ],
  },
  {
    heading: "Insurance Cover",
    paragraphs: [
      "Specialist Movers strongly recommends to all customers to ensure there is adequate insurance cover in place for private and commercial items and goods.",
      "While every care is taken when transporting private items and goods, accidents can and may happen. For this reason, Specialist Movers advises customers to ensure that the best option is to contact your Home and Contents insurance provider. It is advised to ask for specific Transit Cover for the duration of the move. Most home and contents policies do not specifically cover goods in transit as part of a private move. Although transit insurance cover could be included if organised. Alternatively, we can arrange for Insurance on your behalf through our insurance broker.",
      "If you don't wish to take out your own insurance, you are acknowledging and accepting that you are using our services At Owner's risk as defined by The Contract and Commercial Law Act 2017. This means goods are transported at owners risk (your risk) and Specialist Movers can not be held responsible for any damages.",
      "Nothing in these terms limits your rights under the Consumer Guarantees Act 1993.",
    ],
  },
  {
    heading: "Specialist Movers Insurance Terms and Conditions - Pianos Only",
    paragraphs: [
      "Specialist Movers do provide cover up to $2,000 for pianos when moving pianos, conditions apply, please ask our team if you would like more information.",
      "If we are delivering your piano from a piano retailer, you can disregard this as your piano is covered by the retailer you have purchased from.",
    ],
  },
];
