"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { searchLocations } from "@/lib/locations";

export function LocationSearch() {
  const [query, setQuery] = useState("");

  const trimmed = query.trim();
  const results = useMemo(
    () => (trimmed.length < 2 ? [] : searchLocations(trimmed).slice(0, 20)),
    [trimmed],
  );

  return (
    <div className="rounded-2xl border border-brand-purple/15 bg-white p-5 shadow-sm sm:p-6">
      <label htmlFor="location-search" className="font-heading text-lg text-brand-purple">
        Find your area
      </label>
      <p className="mt-1 text-sm text-brand-purple/75">
        Type a suburb or town. Results link to our area pages.
      </p>
      <div className="relative mt-4">
        <Search
          className="pointer-events-none absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-brand-purple/40"
          aria-hidden
        />
        <input
          id="location-search"
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="e.g. Takapuna, Hamilton, Remuera"
          className="w-full rounded-xl border border-brand-purple/20 bg-brand-surface py-3 pl-10 pr-4 text-brand-purple placeholder:text-brand-purple/40 focus:border-brand-purple/50 focus:outline-none focus:ring-2 focus:ring-brand-purple/15"
          autoComplete="off"
        />
      </div>
      {trimmed.length > 0 && (
        <ul className="mt-4 max-h-80 space-y-1 overflow-y-auto" role="listbox">
          {trimmed.length < 2 ? (
            <li className="rounded-lg px-3 py-2 text-sm text-brand-purple/70">
              Type at least 2 letters, e.g. Hill, Shore, Hamilton.
            </li>
          ) : results.length === 0 ? (
            <li className="rounded-lg px-3 py-2 text-sm text-brand-purple/70">
              No match. Try another spelling or browse the suburb lists below.{" "}
              <Link href="/contact" className="font-semibold underline">
                Contact us
              </Link>{" "}
              if your area is not listed.
            </li>
          ) : (
            results.map((loc) => (
              <li key={loc.slug}>
                <Link
                  href={`/locations/${loc.slug}`}
                  className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm text-brand-purple transition hover:bg-brand-purple/[0.06]"
                  role="option"
                >
                  <span className="font-medium">{loc.name}</span>
                  <span className="text-xs uppercase tracking-wide text-brand-purple/50">
                    {loc.kind === "region" ? "Region" : loc.kind === "town" ? "Waikato" : "Suburb"}
                  </span>
                </Link>
              </li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
