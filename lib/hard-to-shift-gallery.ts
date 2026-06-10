/** Real hard-to-shift jobs — stills from client WhatsApp video/photo, June 2026. */
const base = "/photos/hard-to-shift";

/** Gallery top-left crane shot */
export const hardToShiftHeroPhoto = `${base}/crane-piano-hero.jpg`;
/** Homepage service card (landscape, reads well at card aspect) */
export const hardToShiftCardPhoto = `${base}/team-on-site.jpeg`;
/** Service page hero — full balcony lift (video 3 @ 1s, native res; bottom trimmed in CSS) */
export const hardToShiftPageHeroPhoto = `${base}/video-3-t1.jpg`;
export const hardToShiftMomentPhoto = `${base}/team-on-site.jpeg`;
export const hardToShiftAboutPhoto = `${base}/video-2-t1.jpg`;

export const hardToShiftGalleryPhotos = [
  {
    src: hardToShiftHeroPhoto,
    alt: "Crane lifting a wrapped upright piano on Specialist Piano Movers straps",
    caption:
      "Upright piano hoisted with a Palfinger crane, padded, strapped, and guided by our crew.",
  },
  {
    src: `${base}/team-on-site.jpeg`,
    alt: "Specialist Movers crane truck and crew preparing a heavy lift at a residential property",
    caption: "Crane truck setup for bulky items that will not fit through standard access.",
  },
  {
    src: `${base}/crew-piano-dolly.jpg`,
    alt: "Specialist Movers crew moving a wrapped piano on a heavy-duty dolly",
    caption:
      "Experienced crews on the ground, with guide straps, padding, and clear communication on every lift.",
  },
  {
    src: `${base}/video-3-t1.jpg`,
    alt: "Crane lifting a wrapped item up to an upper-level balcony",
    caption: "Upper-level and balcony deliveries when stairs and hallways are not an option.",
  },
] as const;
