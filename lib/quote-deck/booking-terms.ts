// Booking terms and conditions shown in the scroll-to-sign box on the booking
// form. THIS IS THE ONE PLACE TO EDIT THE WORDING.
//
// NOTE FOR RICHARD: this is a plain-English starting draft of the moving service
// terms (the /policies page only covers privacy, not service terms). Have your
// solicitor review/replace this wording before relying on it. The booking form
// records the customer's typed signature + timestamp + scroll confirmation as
// the acceptance trail.

export type BookingTermsSection = {
  heading: string;
  paragraphs: string[];
};

export const BOOKING_TERMS_VERSION = "2026-06-draft-1";

export const bookingTerms: BookingTermsSection[] = [
  {
    heading: "1. About these terms",
    paragraphs: [
      "This agreement is between you (the customer) and Specialist Movers, a trading name of KB Logistics Limited.",
      "By signing and accepting below, you confirm you have read and agree to these terms for your move.",
    ],
  },
  {
    heading: "2. Your quote and pricing",
    paragraphs: [
      "Hourly jobs are charged on the actual time taken on the day, plus the call-out fee. The quote is our best estimate, not a cap, unless we have given you a fixed price in writing.",
      "Fixed-price jobs are charged at the agreed amount for the scope quoted. Extra items, extra stops, or access we were not told about may change the price.",
      "All prices include GST where shown. Your quote link shows a validity period for planning only.",
    ],
  },
  {
    heading: "3. Booking and deposit",
    paragraphs: [
      "Your booking is requested when you submit this form and confirmed once we confirm your date with you.",
      "For larger jobs we may ask for a deposit to hold the date. Any deposit is credited to your final invoice.",
    ],
  },
  {
    heading: "4. Payment",
    paragraphs: [
      "Payment is due on completion of the move unless we have agreed an account or other terms in writing.",
      "We accept bank transfer and card. Goods remain our responsibility only while in our care and are released on full payment.",
    ],
  },
  {
    heading: "5. Cancellation and rescheduling",
    paragraphs: [
      "Please give us as much notice as you can. We ask for at least 48 hours notice to cancel or reschedule.",
      "Cancellations with less than 48 hours notice, or where our crew arrives and cannot start, may be charged a call-out fee to cover the booked time.",
    ],
  },
  {
    heading: "6. Access, parking and timing",
    paragraphs: [
      "You are responsible for safe, legal access and parking at both addresses, including any permits, building bookings, or lift bookings.",
      "Waiting time caused by access problems, settlement delays, or keys not being ready is charged at the hourly rate.",
    ],
  },
  {
    heading: "7. Items we cannot move",
    paragraphs: [
      "For safety and legal reasons we cannot move dangerous or hazardous goods, fuel, gas bottles, flammable liquids, ammunition, illegal items, or perishable food.",
      "Please move valuables, documents, medication, and jewellery yourself.",
    ],
  },
  {
    heading: "8. Packing",
    paragraphs: [
      "If you pack your own boxes, we cannot accept responsibility for damage to the contents of those boxes, as we cannot check how they were packed.",
      "Where our team packs for you, we pack with care using suitable materials.",
    ],
  },
  {
    heading: "9. Care, liability and protection",
    paragraphs: [
      "We take great care with your belongings and have hundreds of 5-star reviews. Even so, our liability is limited to direct loss or damage caused by our negligence, up to the value of the work performed, unless separate transit protection has been arranged.",
      "We are not liable for pre-existing damage, normal wear, or damage to items not moved by us.",
    ],
  },
  {
    heading: "10. Damage claims",
    paragraphs: [
      "If anything is damaged, please tell us within 7 days of your move, in writing, with photos. This lets us assess and resolve it fairly and quickly.",
    ],
  },
  {
    heading: "11. Delays outside our control",
    paragraphs: [
      "We are not responsible for delays caused by weather, traffic, breakdowns, or third parties such as settlement, building managers, or other trades.",
    ],
  },
  {
    heading: "12. Pianos and specialist items",
    paragraphs: [
      "Pianos and other specialist items are handled by our trained team. Stairs, tight access, and difficult sites can affect the price and may need a site check first.",
    ],
  },
  {
    heading: "13. Privacy",
    paragraphs: [
      "We handle your information in line with our privacy policy, available on our website.",
    ],
  },
  {
    heading: "14. Acceptance",
    paragraphs: [
      "By typing your full name as your signature and ticking the box below, you confirm you have read these terms in full and agree to them.",
    ],
  },
];
