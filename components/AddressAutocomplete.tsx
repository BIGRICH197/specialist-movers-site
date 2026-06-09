"use client";

import { useEffect, useRef, useState } from "react";
import { importLibrary, setOptions } from "@googlemaps/js-api-loader";
import {
  parseAddressComponents,
  parseNewPlaceAddressComponents,
  placeToQuoteAddress,
  type ParsedPlaceAddress,
} from "@/lib/parse-place-address";
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

type WidgetMode = "places-widget" | "manual";

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
  const hostRef = useRef<HTMLDivElement>(null);
  const manualInputRef = useRef<HTMLInputElement>(null);
  const widgetRef = useRef<google.maps.places.PlaceAutocompleteElement | null>(
    null,
  );
  const onChangeRef = useRef(onChange);
  const onPlaceSelectRef = useRef(onPlaceSelect);
  const [mode, setMode] = useState<WidgetMode>(
    !apiKey || isGoogleMapsAuthFailed() ? "manual" : "places-widget",
  );
  const [hint, setHint] = useState<string | null>(null);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    onPlaceSelectRef.current = onPlaceSelect;
  }, [onPlaceSelect]);

  useEffect(() => {
    ensureGoogleMapsAuthFailureHook();
    return subscribeGoogleMapsAuthFailure(() => setMode("manual"));
  }, []);

  useEffect(() => {
    if (mode !== "places-widget" || !apiKey || !hostRef.current) return;

    let cancelled = false;
    let element: google.maps.places.PlaceAutocompleteElement | null = null;
    let onSelect: EventListener | null = null;
    let onError: EventListener | null = null;
    let onInput: EventListener | null = null;

    (async () => {
      try {
        if (!mapsOptionsSet) {
          setOptions({ key: apiKey, v: "weekly" });
          mapsOptionsSet = true;
        }

        const { PlaceAutocompleteElement } = (await importLibrary(
          "places",
        )) as google.maps.PlacesLibrary & {
          PlaceAutocompleteElement: typeof google.maps.places.PlaceAutocompleteElement;
        };
        const { LatLngBounds } = (await importLibrary(
          "core",
        )) as google.maps.CoreLibrary;

        if (cancelled || !hostRef.current || isGoogleMapsAuthFailed()) return;

        const bounds = new LatLngBounds(
          { lat: SERVICE_BOUNDS.south, lng: SERVICE_BOUNDS.west },
          { lat: SERVICE_BOUNDS.north, lng: SERVICE_BOUNDS.east },
        );

        element = new PlaceAutocompleteElement({
          includedRegionCodes: ["nz"],
          locationBias: bounds,
          placeholder,
        });

        element.id = id;
        element.name = id;
        element.description = ariaLabel ?? placeholder;
        if (disabled) element.disabled = true;

        widgetRef.current = element;
        hostRef.current.replaceChildren(element);

        onInput = () => {
          const next = element?.value?.trim() ?? "";
          onChangeRef.current(next);
          setHint((current) => (current ? null : current));
        };
        element.addEventListener("input", onInput);

        onSelect = async (event) => {
          try {
            const { placePrediction } =
              event as google.maps.places.PlacePredictionSelectEvent;
            const place = placePrediction.toPlace();
            await place.fetchFields({
              fields: ["formattedAddress", "addressComponents"],
            });
            const formatted = place.formattedAddress ?? "";
            const components = place.addressComponents ?? [];
            const parsed = components.length
              ? parseNewPlaceAddressComponents(components, formatted)
              : parseAddressComponents([], formatted);
            const quoteAddress = placeToQuoteAddress(parsed);
            onChangeRef.current(quoteAddress);
            onPlaceSelectRef.current?.(parsed);
            if (element) element.value = quoteAddress;
            setHint(null);
          } catch {
            setHint("Pick an address from the list so we get the right suburb.");
          }
        };
        element.addEventListener("gmp-select", onSelect);

        onError = () => {
          markGoogleMapsAuthFailure();
          if (!cancelled) setMode("manual");
        };
        element.addEventListener("gmp-error", onError);
      } catch {
        if (!cancelled) setMode("manual");
      }
    })();

    return () => {
      cancelled = true;
      if (element) {
        if (onSelect) element.removeEventListener("gmp-select", onSelect);
        if (onError) element.removeEventListener("gmp-error", onError);
        if (onInput) element.removeEventListener("input", onInput);
      }
      widgetRef.current = null;
    };
  }, [id, mode, disabled, placeholder, ariaLabel]);

  useEffect(() => {
    if (mode !== "places-widget" || !widgetRef.current) return;
    const widgetValue = widgetRef.current.value ?? "";
    if (widgetValue !== value) {
      widgetRef.current.value = value || null;
    }
  }, [value, mode]);

  function handleFocus() {
    window.requestAnimationFrame(() => {
      const el =
        mode === "manual" ? manualInputRef.current : hostRef.current;
      el?.scrollIntoView({ block: "center", behavior: "smooth" });
    });
  }

  if (mode === "manual" || !apiKey) {
    return (
      <div className="space-y-1">
        <input
          id={id}
          ref={manualInputRef}
          type="text"
          autoComplete="street-address"
          value={value}
          onChange={(e) => {
            onChange(e.target.value);
            if (hint) setHint(null);
          }}
          onFocus={handleFocus}
          placeholder={placeholder}
          className={className}
          disabled={disabled}
          aria-label={ariaLabel}
        />
        <p className="text-xs text-brand-purple/55">{manualHint}</p>
        {hint ? (
          <p className="text-xs font-medium text-amber-800">{hint}</p>
        ) : null}
      </div>
    );
  }

  return (
    <div className="space-y-1">
      <div
        ref={hostRef}
        className={`address-autocomplete-host ${className ?? ""}`}
        onFocus={handleFocus}
      />
      <p className="text-xs text-brand-purple/55">
        Choose a match from the dropdown, or type your full street and suburb.
      </p>
      {hint ? (
        <p className="text-xs font-medium text-amber-800">{hint}</p>
      ) : null}
    </div>
  );
}
