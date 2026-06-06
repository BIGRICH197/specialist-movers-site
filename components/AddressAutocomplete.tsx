"use client";



import { useEffect, useRef, useState } from "react";

import { importLibrary, setOptions } from "@googlemaps/js-api-loader";

import {

  parseAddressComponents,

  placeToQuoteAddress,

  type ParsedPlaceAddress,

} from "@/lib/parse-place-address";

import {

  ensureGoogleMapsAuthFailureHook,

  isGoogleMapsAuthFailed,

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

  const onChangeRef = useRef(onChange);

  const onPlaceSelectRef = useRef(onPlaceSelect);

  const [manualMode, setManualMode] = useState(

    !apiKey || isGoogleMapsAuthFailed(),

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
    return subscribeGoogleMapsAuthFailure(() => setManualMode(true));
  }, []);



  useEffect(() => {

    if (manualMode || !apiKey || !inputRef.current) return;



    let autocomplete: google.maps.places.Autocomplete | null = null;

    let listener: google.maps.MapsEventListener | undefined;

    let cancelled = false;



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



        autocomplete = new Autocomplete(inputRef.current, {

          componentRestrictions: { country: "nz" },

          fields: ["formatted_address", "address_components", "geometry"],

          bounds,

          strictBounds: false,

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

          onChangeRef.current(quoteAddress);

          onPlaceSelectRef.current?.(parsed);

          setHint(null);

        });

      } catch {

        if (!cancelled) {

          setManualMode(true);

          setHint(null);

        }

      }

    })();



    return () => {

      cancelled = true;

      listener?.remove();

    };

  }, [id, manualMode]);



  function handleFocus() {

    window.requestAnimationFrame(() => {

      inputRef.current?.scrollIntoView({ block: "center", behavior: "smooth" });

    });

  }



  if (manualMode || !apiKey) {

    return (

      <div className="space-y-1">

        <input

          id={id}

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

      <input

        ref={inputRef}

        id={id}

        type="text"

        autoComplete="off"

        defaultValue={value}

        onChange={(e) => {

          onChangeRef.current(e.target.value);

          if (hint) setHint(null);

        }}

        onFocus={handleFocus}

        placeholder={placeholder}

        className={className}

        disabled={disabled}

        aria-label={ariaLabel}

        aria-autocomplete="list"

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


