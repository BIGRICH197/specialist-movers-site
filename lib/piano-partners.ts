/** Retailer partner logos from specialistpianomovers.co.nz , local copies in /public/piano-partners */
export type PianoPartner = {
  name: string;
  src: string;
  width: number;
  height: number;
  /** Only set where the URL was fetched and confirmed. Never guessed. */
  href?: string;
};

export const pianoRetailerPartners: PianoPartner[] = [
  { name: "Sly's", src: "/piano-partners/slys.png", width: 462, height: 200 },
  { name: "Rockshop", href: "https://www.rockshop.co.nz/", src: "/piano-partners/rockshop.png", width: 385, height: 200 },
  {
    name: "Auckland University Piano Centre",
    src: "/piano-partners/aupc.png",
    width: 394,
    height: 200,
  },
  { name: "Lewis Eady", href: "https://www.lewiseady.co.nz/", src: "/piano-partners/lewis-eady.png", width: 693, height: 200 },
  { name: "Auckland Live", href: "https://www.aucklandlive.co.nz/", src: "/piano-partners/auckland-live.png", width: 737, height: 200 },
  { name: "KBB Music", href: "https://www.kbbmusic.co.nz/", src: "/piano-partners/kbb-music.png", width: 400, height: 200 },
  { name: "Piano Traders", src: "/piano-partners/piano-traders.png", width: 691, height: 200 },
  { name: "Music Planet", href: "https://www.musicplanet.co.nz/", src: "/piano-partners/music-planet.png", width: 626, height: 200 },
];
