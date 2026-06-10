/** True when a Maps/Places key is configured (client or server). */
export function isGooglePlacesConfigured(): boolean {
  return Boolean(process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY?.trim());
}
