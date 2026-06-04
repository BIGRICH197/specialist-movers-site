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

/** North Island bounds for the decorative map projection. */
export const coverageMapBounds = {
  minLat: -41.6,
  maxLat: -34.2,
  minLng: 172.4,
  maxLng: 178.6,
  width: 360,
  height: 520,
} as const;

export function projectCoveragePoint(lat: number, lng: number): { x: number; y: number } {
  const { minLat, maxLat, minLng, maxLng, width, height } = coverageMapBounds;
  const x = ((lng - minLng) / (maxLng - minLng)) * width;
  const y = ((lat - minLat) / (maxLat - minLat)) * height;
  return { x, y };
}
