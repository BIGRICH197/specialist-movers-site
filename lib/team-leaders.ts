/**
 * Leadership team , mug shots from email signature assets (public/team/).
 */
export type TeamLeader = {
  id: string;
  name: string;
  role: string;
  bio: string;
  email?: string;
  phone?: string;
  phoneDisplay?: string;
  /** Square mug shot on brand yellow; omit for initials fallback */
  photoSrc?: string;
};

export const teamLeaders: TeamLeader[] = [
  {
    id: "richard",
    name: "Richard Boote",
    role: "Owner & General Manager",
    bio:
      "Co-owner and general manager. Sets direction for premium service, safety, and growth across Auckland and Waikato operations.",
    email: "richard@specialistmovers.co.nz",
    phone: "+64212282279",
    phoneDisplay: "021 228 2279",
    photoSrc: "/team/richard-boote.png",
  },
  {
    id: "matthew",
    name: "Matthew Kitney",
    role: "Owner & Operations Manager",
    bio:
      "Co-owner who runs day-to-day operations. Oversees crews, trucks, and job execution so every move is planned properly and delivered on the ground.",
    email: "matthew@specialistmovers.co.nz",
    phone: "+64224756185",
    phoneDisplay: "022 475 6185",
    photoSrc: "/team/matthew-kitney.png",
  },
  {
    id: "danielle",
    name: "Danielle Maritz",
    role: "Office Manager",
    bio:
      "Runs scheduling and rostering. She keeps the office, crews, and calendars aligned so your move stays on track.",
    email: "danielle@specialistmovers.co.nz",
    phone: "+64212282728",
    phoneDisplay: "021 228 2728",
    photoSrc: "/team/danielle-maritz.png",
  },
  {
    id: "taine",
    name: "Taine Watts",
    role: "Client Services Manager",
    bio:
      "Your main contact for viewings, quotes, and bookings. Clear communication from first enquiry through to move day.",
    email: "taine@specialistmovers.co.nz",
    phone: "+642102289044",
    phoneDisplay: "021 022 8904",
    photoSrc: "/team/taine-watts.png",
  },
  {
    id: "tunoa",
    name: "Tunoa Feleti",
    role: "Team Leader",
    bio:
      "Leads crews on move day. Licensed Class 2 driver for our larger trucks and demanding jobs across Auckland and the Waikato.",
    photoSrc: "/team/tunoa.png",
  },
];
