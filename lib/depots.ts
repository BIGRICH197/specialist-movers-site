/** Depot pins for coverage map and future contact/schema use. */
export type Depot = {
  id: "auckland" | "hamilton";
  label: string;
  sublabel: string;
  lat: number;
  lng: number;
};

export const depots: readonly Depot[] = [
  {
    id: "auckland",
    label: "Auckland",
    sublabel: "Wairau Valley",
    lat: -36.869,
    lng: 174.705,
  },
  {
    id: "hamilton",
    label: "Hamilton",
    sublabel: "Waikato base",
    lat: -37.787,
    lng: 175.279,
  },
] as const;
