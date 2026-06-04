import { depots } from "@/lib/depots";

export function googleMapsDepotsUrl(): string {
  const q = depots.map((d) => `${d.label},New Zealand`).join("/");
  return `https://www.google.com/maps/dir/${encodeURIComponent(q)}`;
}
