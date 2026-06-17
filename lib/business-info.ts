import { depots } from "@/lib/depots";

/** Shared business facts for JSON-LD, contact, and schema. */
export const businessInfo = {
  email: "info@specialistmovers.co.nz",
  /** Mon–Sun 9am–7pm (contact page + Aroha prompt). */
  openingHours: ["Mo-Su 09:00-19:00"] as const,
  sameAs: [
    "https://www.instagram.com/specialistmovers/",
    "https://www.facebook.com/people/Specialist-Movers/61563245376572/",
  ] as const,
  aucklandAddress: {
    streetAddress: "186 Target Road",
    addressLocality: "Glenfield",
    addressRegion: "Auckland",
    postalCode: "0629",
    addressCountry: "NZ",
  },
  hamiltonAddress: {
    streetAddress: "Hamilton",
    addressLocality: "Hamilton",
    addressRegion: "Waikato",
    postalCode: "3204",
    addressCountry: "NZ",
  },
  geo: {
    auckland: { latitude: depots[0].lat, longitude: depots[0].lng },
    hamilton: { latitude: depots[1].lat, longitude: depots[1].lng },
  },
} as const;
