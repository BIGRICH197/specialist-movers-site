/**
 * Meta descriptions from live specialistmovers.co.nz (Yoast), June 2026.
 * Use verbatim on migrated URLs to preserve SEO.
 */
export const legacyMetaDescriptions = {
  home:
    "Are you relocating houses? Hire Specialist Movers in Auckland! We specialize in local and international house and piano packing and moving. Contact us today!",
  "house-moving":
    "Relocating cars can be stressful, but not anymore with Specialist Movers, your expert house moving and packing services company in Auckland. Hire us today!",
  "office-moving":
    "Moving your business to a new location? Contact Specialist Movers, your office furniture movers in Auckland for a smooth transition.",
  "commercial-moving":
    "Specialist Movers are the best commercial movers for your business in Auckland, providing competitive pricing and peace of mind. Contact us today for a quote.",
  "packing-services":
    "Get top-notch office and house packing services in Auckland with Specialist Movers. Our expert team ensures your belongings are securely packed and safely transported.",
  "hard-to-shift":
    "Looking for heavy item movers? Hire Specialist Movers in Auckland for heavy and hard-to-shift items. Contact us for hassle-free movement and to learn more.",
  "cleaning-services":
    "Book trusted professional cleaning services in Auckland with Specialist Movers. Easy online cleaning bookings for homes and offices. Get a fast quote today.",
  "international-moving":
    "Choose Specialist Movers for your International Moving Services. Our experienced team provides efficient and secure relocation services to and from New Zealand.",
  "loading-unloading":
    "Need help with heavy lifting items? Discover Specialist Movers to help load a truck. We handle your belongings with care and smooth moves. Contact us!",
  "winz-quotes":
    "Looking for Winz house moving quotes? Contact Specialist Movers today and get a free quotation. Save money on movers and packs!",
  "piano-movers-auckland":
    "Hire Special Movers, your piano moving experts in Auckland. We move your piano safely both locally and internationally. Contact us today to know more.",
  "piano-movers":
    "Hire Special Movers, your piano moving experts in Auckland. We move your piano safely both locally and internationally. Contact us today to know more.",
  "apartment-movers-auckland":
    "Moving to a new apartment? Take the help of Specialist Movers who specializes in apartment relocation in Auckland. Click here to learn more.",
  "retirement-home-movers-auckland":
    "Retiring soon? Hire your personalised retirement home movers, the Specialist Movers in Auckland and experience the difference. Click here now!",
  about:
    "Learn about Specialist Movers – experienced professionals delivering reliable moving and cleaning services in Auckland. Discover our values and book with confidence.",
  contact:
    "Connect with Specialist Movers, your expert packers and movers in Auckland. Fill out our form for quick, no-obligation quotes and efficient moving solutions.",
  faq:
    "Find answers to common questions about moving and cleaning services in Auckland. Visit Specialist Movers FAQs and get the information you need before booking.",
  reviews:
    "Customer satisfaction is our top priority at Specialist Movers. Check what our customers have to say about our services. Call us now to get your custom quote.",
  services:
    "Trust Specialist Movers Auckland for professional moving services. From house and commercial moves to international relocations & piano transport, we've got you covered.",
  policies:
    "At Specialist Movers, we are committed to protecting your privacy & personal information by adhering to strict standards and legal requirements. Learn more here.",
} as const;

export type LegacyMetaKey = keyof typeof legacyMetaDescriptions;

export function legacyMetaDescription(key: LegacyMetaKey): string {
  return legacyMetaDescriptions[key];
}

/** Legacy Yoast descriptions for /services/{slug} and legacy Auckland paths. */
const serviceSlugToLegacyKey: Partial<Record<string, LegacyMetaKey>> = {
  "house-moving": "house-moving",
  "office-moving": "office-moving",
  "commercial-moving": "commercial-moving",
  "packing-services": "packing-services",
  "hard-to-shift": "hard-to-shift",
  "cleaning-services": "cleaning-services",
  "international-moving": "international-moving",
  "loading-unloading": "loading-unloading",
  "winz-quotes": "winz-quotes",
  "piano-movers": "piano-movers-auckland",
};

export function legacyMetaForServiceSlug(slug: string): string | undefined {
  const key = serviceSlugToLegacyKey[slug];
  return key ? legacyMetaDescriptions[key] : undefined;
}
