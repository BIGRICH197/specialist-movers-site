"use client";

import { useEffect, useRef, useState } from "react";
import { importLibrary, setOptions } from "@googlemaps/js-api-loader";
import {
  parseAddressComponents,
  placeToQuoteAddress,
  type ParsedPlaceAddress,
} from "@/lib/parse-place-address";

const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

export type { ParsedPlaceAddress };

type Props = {
  id: string;
  value: string;
  onChange: (value: string) => void;
  onPlaceSelect?: (place: ParsedPlaceAddress) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  "aria-label"?: string;
};

/** Auckland + Waikato bias so Hamilton and Auckland suburbs surface first. */
const SERVICE_BOUNDS = {
  south: -37.95,
  west: 174.4,
  north: -36.65,
  east: 176.35,
};

export function AddressAutocomplete({
  id,
  value,
  onChange,
  onPlaceSelect,
  placeholder = "Start typing street address…",
  className,
  disabled,
  "aria-label": ariaLabel,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [hint, setHint] = useState<string | null>(null);

  useEffect(() => {
    if (!apiKey || !inputRef.current) return;

    let autocomplete: google.maps.places.Autocomplete | null = null;
    let listener: google.maps.MapsEventListener | undefined;
    let cancelled = false;

    (async () => {
      try {
        setOptions({ key: apiKey, v: "weekly" });
        const { Autocomplete } = (await importLibrary(
          "places",
        )) as google.maps.PlacesLibrary;
        const { LatLngBounds } = (await importLibrary(
          "core",
        )) as google.maps.CoreLibrary;
        if (cancelled || !inputRef.current) return;

        const bounds = new LatLngBounds(
          { lat: SERVICE_BOUNDS.south, lng: SERVICE_BOUNDS.west },
          { lat: SERVICE_BOUNDS.north, lng: SERVICE_BOUNDS.east },
        );

        autocomplete = new Autocomplete(inputRef.current, {
          componentRestrictions: { country: "nz" },
          fields: ["formatted_address", "address_components", "geometry"],
          bounds,
          strictBounds: false,
          types: ["address"],
        });

        listener = autocomplete.addListener("place_changed", () => {
          const place = autocomplete?.getPlace();
          if (!place?.formatted_address) {
            setHint("Pick an address from the list so we get the right suburb.");
            return;
          }

          const parsed = parseAddressComponents(
            place.address_components ?? [],
            place.formatted_address,
          );
          const quoteAddress = placeToQuoteAddress(parsed);
          onChange(quoteAddress);
          onPlaceSelect?.(parsed);
          setHint(null);
        });
      } catch {
        if (!cancelled) {
          setHint("Address search unavailable , type your full street and suburb.");
        }
      }
    })();

    return () => {
      cancelled = true;
      listener?.remove();
    };
  }, [onChange, onPlaceSelect]);

  if (!apiKey) {
    return (
      <div className="space-y-1">
        <input
          id={id}
          type="text"
          autoComplete="street-address"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
          className={className}
          disabled={disabled}
          aria-label={ariaLabel}
        />
        <p className="text-xs text-brand-purple/55">
          Include street, suburb, and city (e.g. 12 Main St, Hamilton or Remuera,
          Auckland).
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-1">
      <input
        ref={inputRef}
        id={id}
        type="text"
        autoComplete="off"
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          if (hint) setHint(null);
        }}
        placeholder={placeholder}
        className={className}
        disabled={disabled}
        aria-label={ariaLabel}
        aria-autocomplete="list"
      />
      <p className="text-xs text-brand-purple/55">
        Choose a match from the dropdown (full street address).
      </p>
      {hint ? (
        <p className="text-xs font-medium text-amber-800">{hint}</p>
      ) : null}
    </div>
  );
}
