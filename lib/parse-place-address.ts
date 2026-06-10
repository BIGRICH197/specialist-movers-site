/** Parsed fields from Google Places `address_components`. */
export type ParsedPlaceAddress = {
  formattedAddress: string;
  suburb: string;
  city: string;
  region: string;
  country: string;
};

type AddressComponent = {
  long_name: string;
  short_name: string;
  types: string[];
};

type NewAddressComponent = {
  longText?: string | null;
  shortText?: string | null;
  types: string[];
};

/** Map Places API (New) address components to the legacy parser shape. */
export function parseNewPlaceAddressComponents(
  components: NewAddressComponent[],
  formattedAddress?: string,
): ParsedPlaceAddress {
  const legacy = components.map((component) => ({
    long_name: component.longText ?? "",
    short_name: component.shortText ?? "",
    types: component.types,
  }));
  return parseAddressComponents(legacy, formattedAddress);
}

function pickComponent(
  components: AddressComponent[],
  ...types: string[]
): string {
  for (const type of types) {
    const hit = components.find((c) => c.types.includes(type));
    if (hit?.long_name) return hit.long_name;
  }
  return "";
}

/** Build a quote-friendly string (suburb + city always included for branch detection). */
export function parseAddressComponents(
  components: AddressComponent[],
  formattedAddress?: string,
): ParsedPlaceAddress {
  const suburb = pickComponent(
    components,
    "sublocality_level_1",
    "sublocality",
    "neighborhood",
  );
  const city = pickComponent(
    components,
    "locality",
    "administrative_area_level_2",
  );
  const region = pickComponent(components, "administrative_area_level_1");
  const country = pickComponent(components, "country");

  const parts = [suburb, city, region].filter(Boolean);
  const deduped = Array.from(new Set(parts));

  return {
    formattedAddress: formattedAddress?.trim() || deduped.join(", "),
    suburb,
    city,
    region,
    country,
  };
}

/** String sent to pricing , full formatted address plus locality hints. */
export function placeToQuoteAddress(parsed: ParsedPlaceAddress): string {
  const { formattedAddress, suburb, city, region } = parsed;
  if (!formattedAddress) {
    return [suburb, city, region].filter(Boolean).join(", ");
  }
  const hints = [suburb, city, region].filter(Boolean).join(" ");
  if (!hints || formattedAddress.toLowerCase().includes(hints.toLowerCase())) {
    return formattedAddress;
  }
  return `${formattedAddress} (${hints})`;
}
