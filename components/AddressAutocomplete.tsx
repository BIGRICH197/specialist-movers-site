"use client";

import { useRef } from "react";
import type { ParsedPlaceAddress } from "@/lib/parse-place-address";

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

const hint =
  "Type your full street address and suburb (e.g. 12 Main St, Remuera, Auckland).";

export function AddressAutocomplete({
  id,
  value,
  onChange,
  placeholder = "Start typing street address…",
  className,
  disabled,
  "aria-label": ariaLabel,
}: Props) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFocus() {
    window.requestAnimationFrame(() => {
      inputRef.current?.scrollIntoView({ block: "center", behavior: "smooth" });
    });
  }

  return (
    <div className="space-y-1">
      <input
        id={id}
        ref={inputRef}
        type="text"
        autoComplete="street-address"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onFocus={handleFocus}
        placeholder={placeholder}
        className={className}
        disabled={disabled}
        aria-label={ariaLabel}
      />
      <p className="text-xs text-brand-purple/55">{hint}</p>
    </div>
  );
}
