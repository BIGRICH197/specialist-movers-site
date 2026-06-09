"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import {
  locationNavDepotColumns,
  locationNavSidebarLinks,
} from "@/lib/location-nav";
import {
  getServiceNavRows,
  serviceNavClusterLinks,
  serviceNavHubLink,
  serviceNavInternationalExtras,
  serviceNavPianoExtras,
} from "@/lib/service-nav";
import { scrollToInstantQuote } from "@/lib/scroll-to-quote";
import { usePathname } from "next/navigation";

type Props = {
  onNavigate: () => void;
  moreLinks: readonly { href: string; label: string }[];
  quoteHref: string;
  phoneDisplay: string;
  phoneNumber: string;
};

const subLinkClass =
  "text-sm text-white/85 transition-colors hover:text-brand-yellow";

/** Mobile: Auckland depot before Hamilton. */
const mobileLocationDepots = [...locationNavDepotColumns].sort((a, b) =>
  a.id === "auckland" ? -1 : b.id === "auckland" ? 1 : 0,
);

function AccordionSection({
  title,
  open,
  onToggle,
  children,
}: {
  title: string;
  open: boolean;
  onToggle: () => void;
  children: ReactNode;
}) {
  return (
    <div>
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center justify-between rounded-xl px-2 py-2 text-left transition-colors hover:bg-white/10"
        aria-expanded={open}
      >
        <span>{title}</span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 opacity-70 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
          aria-hidden
        />
      </button>
      {open ? (
        <div className="mb-2 border-l border-white/15 pl-3 font-sans text-sm">
          {children}
        </div>
      ) : null}
    </div>
  );
}

/** Mobile drawer nav — same service/location trees as desktop mega menus. */
export function MobileNavMenu({
  onNavigate,
  moreLinks,
  quoteHref,
  phoneDisplay,
  phoneNumber,
}: Props) {
  const pathname = usePathname();
  const [expanded, setExpanded] = useState<"services" | "locations" | null>(
    null,
  );

  function handleQuoteClick(event: React.MouseEvent<HTMLAnchorElement>) {
    onNavigate();
    if (pathname !== "/") return;
    event.preventDefault();
    scrollToInstantQuote();
  }
  const serviceRows = getServiceNavRows();

  const toggle = (section: "services" | "locations") =>
    setExpanded((current) => (current === section ? null : section));

  return (
    <>
      <AccordionSection
        title="Services"
        open={expanded === "services"}
        onToggle={() => toggle("services")}
      >
        <div className="space-y-3 py-2">
          {serviceRows.map((row) => (
            <div key={row.key}>
              <p className="text-xs font-semibold uppercase tracking-wide text-brand-yellow/75">
                {row.label}
              </p>
              <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1">
                <Link
                  href={row.auckland.href}
                  onClick={onNavigate}
                  className={subLinkClass}
                >
                  {row.auckland.label}
                </Link>
                {row.hamilton ? (
                  <Link
                    href={row.hamilton.href}
                    onClick={onNavigate}
                    className={subLinkClass}
                  >
                    {row.hamilton.label}
                  </Link>
                ) : null}
              </div>
            </div>
          ))}

          <ul className="space-y-1.5 border-t border-white/10 pt-3">
            {serviceNavPianoExtras.map((link) => (
              <li key={link.href}>
                <Link href={link.href} onClick={onNavigate} className={subLinkClass}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <ul className="space-y-1.5 border-t border-white/10 pt-3">
            {serviceNavInternationalExtras.map((link) => (
              <li key={link.href}>
                <Link href={link.href} onClick={onNavigate} className={subLinkClass}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <ul className="space-y-1.5 border-t border-white/10 pt-3">
            {serviceNavClusterLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} onClick={onNavigate} className={subLinkClass}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>

          <Link
            href={serviceNavHubLink.href}
            onClick={onNavigate}
            className="inline-block pt-2 text-sm font-semibold text-brand-yellow"
          >
            {serviceNavHubLink.label} →
          </Link>
        </div>
      </AccordionSection>

      <AccordionSection
        title="Locations"
        open={expanded === "locations"}
        onToggle={() => toggle("locations")}
      >
        <div className="space-y-4 py-2">
          {mobileLocationDepots.map((depot) => (
            <div key={depot.id}>
              <p className="text-xs font-semibold uppercase tracking-wide text-brand-yellow/75">
                {depot.depotTitle}
              </p>
              <p className="mt-0.5 text-xs text-white/55">{depot.coverageTitle}</p>

              {depot.primaryLink ? (
                <Link
                  href={depot.primaryLink.href}
                  onClick={onNavigate}
                  className="mt-2 inline-block text-sm font-semibold text-brand-yellow"
                >
                  {depot.primaryLink.label} →
                </Link>
              ) : null}

              {depot.subsections.map((section) => (
                <div key={section.title ?? depot.id} className="mt-3">
                  {section.title ? (
                    <p className="text-xs font-medium text-white/50">
                      {section.title}
                    </p>
                  ) : null}
                  <ul className={section.title ? "mt-1.5 space-y-1" : "mt-2 space-y-1"}>
                    {section.links.map((link) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          onClick={onNavigate}
                          className={subLinkClass}
                        >
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          ))}

          <ul className="space-y-1.5 border-t border-white/10 pt-3">
            {locationNavSidebarLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} onClick={onNavigate} className={subLinkClass}>
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </AccordionSection>

      <Link
        href="/piano-movers"
        onClick={onNavigate}
        className="block rounded-xl px-2 py-2 hover:bg-white/10"
      >
        Piano
      </Link>
      <Link
        href="/reviews"
        onClick={onNavigate}
        className="block rounded-xl px-2 py-2 hover:bg-white/10"
      >
        Reviews
      </Link>
      <Link
        href="/blog"
        onClick={onNavigate}
        className="block rounded-xl px-2 py-2 hover:bg-white/10"
      >
        Blog
      </Link>
      <Link
        href="/contact"
        onClick={onNavigate}
        className="block rounded-xl px-2 py-2 hover:bg-white/10"
      >
        Contact
      </Link>

      <p className="mt-4 px-2 text-xs font-semibold uppercase tracking-wider text-brand-yellow/60">
        More
      </p>
      {moreLinks.map((item) => (
        <Link
          key={item.href}
          href={item.href}
          onClick={onNavigate}
          className="block rounded-xl px-2 py-2 hover:bg-white/10"
        >
          {item.label}
        </Link>
      ))}
      <a
        href={`tel:${phoneNumber}`}
        className="mt-2 block px-2 font-sans text-base font-semibold text-brand-yellow transition-colors hover:text-white"
      >
        {phoneDisplay}
      </a>
      <Link
        href={quoteHref}
        onClick={handleQuoteClick}
        scroll={pathname !== "/"}
        className="mt-4 inline-flex min-h-11 items-center justify-center rounded-full bg-brand-yellow px-6 py-3 font-heading text-sm font-bold uppercase text-brand-purple ring-1 ring-white/25"
      >
        Free quote
      </Link>
    </>
  );
}
