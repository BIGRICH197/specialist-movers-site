"use client";

import { useEffect, useRef, useState } from "react";
import { importLibrary, setOptions } from "@googlemaps/js-api-loader";
import {
  parseAddressComponents,
  placeToQuoteAddress,
  type ParsedPlaceAddress,
} from "@/lib/parse-place-address";
import { isGooglePlacesConfigured } from "@/lib/google-places-config";
import { isQuoteDevBypassClient } from "@/lib/quote-dev-bypass";
import {
  ensureGoogleMapsAuthFailureHook,
  isGoogleMapsAuthFailed,
  markGoogleMapsAuthFailure,
  subscribeGoogleMapsAuthFailure,
} from "@/lib/google-maps-auth";

const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

export type { ParsedPlaceAddress };

type Props = {
  id: string;
  value: string;
  onChange: (value: string) => void;
  onPlaceSelect?: (place: ParsedPlaceAddress) => void;
  onValidatedChange?: (validated: boolean) => void;
  onPlacesModeChange?: (placesActive: boolean) => void;
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

let mapsOptionsSet = false;

const manualHint =
  "Type your full street address and suburb (e.g. 12 Main St, Remuera, Auckland).";

const localDevHint =
  "Local test mode — type any address (e.g. 12 Main St, Remuera, Auckland).";

type AutocompleteMode = "places" | "manual";

function shouldUseManualMode(): boolean {
  if (isQuoteDevBypassClient()) return true;
  if (!isGooglePlacesConfigured() || isGoogleMapsAuthFailed()) return true;
  return false;
}

export function AddressAutocomplete({
  id,
  value,
  onChange,
  onPlaceSelect,
  onValidatedChange,
  onPlacesModeChange,
  placeholder = "Start typing street address…",
  className,
  disabled,
  "aria-label": ariaLabel,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const autocompleteRef = useRef<google.maps.places.Autocomplete | null>(null);
  const onChangeRef = useRef(onChange);
  const onPlaceSelectRef = useRef(onPlaceSelect);
  const onValidatedChangeRef = useRef(onValidatedChange);
  const [mode, setMode] = useState<AutocompleteMode>(() =>
    shouldUseManualMode() ? "manual" : "places",
  );
  const [inputKey, setInputKey] = useState(0);
  const [hint, setHint] = useState<string | null>(null);
  const localDev = isQuoteDevBypassClient();

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    onPlaceSelectRef.current = onPlaceSelect;
  }, [onPlaceSelect]);

  useEffect(() => {
    onValidatedChangeRef.current = onValidatedChange;
  }, [onValidatedChange]);

  useEffect(() => {
    onPlacesModeChange?.(mode === "places" && Boolean(apiKey));
  }, [mode, onPlacesModeChange]);

  useEffect(() => {
    ensureGoogleMapsAuthFailureHook();
    return subscribeGoogleMapsAuthFailure(() => {
      setMode("manual");
      setInputKey((key) => key + 1);
    });
  }, []);

  useEffect(() => {
    if (mode !== "places" || !apiKey || !inputRef.current || disabled) return;

    let cancelled = false;
    let listener: google.maps.MapsEventListener | null = null;

    (async () => {
      try {
        if (!mapsOptionsSet) {
          setOptions({ key: apiKey, v: "weekly" });
          mapsOptionsSet = true;
        }

        const { Autocomplete } = (await importLibrary(
          "places",
        )) as google.maps.PlacesLibrary;
        const { LatLngBounds } = (await importLibrary(
          "core",
        )) as google.maps.CoreLibrary;

        if (cancelled || !inputRef.current || isGoogleMapsAuthFailed()) return;

        const bounds = new LatLngBounds(
          { lat: SERVICE_BOUNDS.south, lng: SERVICE_BOUNDS.west },
          { lat: SERVICE_BOUNDS.north, lng: SERVICE_BOUNDS.east },
        );

        const autocomplete = new Autocomplete(inputRef.current, {
          componentRestrictions: { country: "nz" },
          bounds,
          strictBounds: false,
          fields: ["formatted_address", "address_components"],
          types: ["address"],
        });

        autocompleteRef.current = autocomplete;

        listener = autocomplete.addListener("place_changed", () => {
          const place = autocomplete.getPlace();
          const formatted = place.formatted_address ?? "";
          const components = place.address_components ?? [];

          if (!formatted && components.length === 0) {
            onValidatedChangeRef.current?.(false);
            setHint("Pick an address from the list so we get the right suburb.");
            return;
          }

          const parsed = parseAddressComponents(components, formatted);
          const quoteAddress = placeToQuoteAddress(parsed);
          onChangeRef.current(quoteAddress);
          onPlaceSelectRef.current?.(parsed);
          onValidatedChangeRef.current?.(true);
          setHint(null);
        });
      } catch {
        markGoogleMapsAuthFailure();
        if (!cancelled) setMode("manual");
      }
    })();

    return () => {
      cancelled = true;
      if (listener) google.maps.event.removeListener(listener);
      if (autocompleteRef.current) {
        google.maps.event.clearInstanceListeners(autocompleteRef.current);
        autocompleteRef.current = null;
      }
    };
  }, [mode, disabled]);

  function handleFocus() {
    window.requestAnimationFrame(() => {
      inputRef.current?.scrollIntoView({ block: "center", behavior: "smooth" });
    });
  }

  return (
    <div className="space-y-1">
      <input
        key={inputKey}
        id={id}
        ref={inputRef}
        type="text"
        autoComplete="off"
        value={value}
        onChange={(e) => {
          onChange(e.target.value);
          onValidatedChange?.(false);
          if (hint) setHint(null);
        }}
        onFocus={handleFocus}
        placeholder={placeholder}
        className={className}
        disabled={disabled}
        aria-label={ariaLabel}
      />
      {mode === "manual" ? (
        <p className="text-xs text-brand-purple/55">
          {localDev ? localDevHint : manualHint}
        </p>
      ) : null}
      {hint ? (
        <p className="text-xs font-medium text-amber-800">{hint}</p>
      ) : null}
    </div>
  );
}
