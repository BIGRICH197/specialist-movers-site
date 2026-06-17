export type PianoMobileCity = "Auckland" | "Hamilton";

export const PIANO_MOBILE_TRUST_PILL =
  "Trusted by Steinway and music retailers";

export function inferPianoMobileCity(heading: string): PianoMobileCity | null {
  if (/hamilton/i.test(heading)) return "Hamilton";
  if (/auckland/i.test(heading)) return "Auckland";
  return null;
}

export function getPianoMobileH1(city: PianoMobileCity): string {
  return `Piano movers ${city}`;
}

/** Fitted mobile title — city pages or Auckland default on piano hub. */
export function getPianoMobileTitle(heading: string): string {
  const city = inferPianoMobileCity(heading);
  return city ? getPianoMobileH1(city) : getPianoMobileH1("Auckland");
}
