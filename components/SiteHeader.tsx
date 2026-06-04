"use client";

import type { ReactNode } from "react";
import Link from "next/link";
import { Menu, Phone, X, ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { BrandLogo } from "@/components/BrandLogo";
import { LocationNavMenu } from "@/components/LocationNavMenu";
import { ServiceNavMenu } from "@/components/ServiceNavMenu";
import { phoneDisplay, phoneNumber } from "@/lib/site-data";

const navLink =
  "shrink-0 whitespace-nowrap rounded-lg px-2.5 py-2 text-xs font-medium text-brand-yellow/90 transition-colors hover:bg-white/10 hover:text-brand-yellow xl:px-3 xl:text-sm";

const moreLinks = [
  { href: "/why-us", label: "Why Us" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
] as const;

function NavDropdown({
  label,
  open,
  onOpen,
  onClose,
  children,
  widthClass = "w-[min(100vw-2rem,17rem)]",
}: {
  label: string;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
  children: ReactNode;
  widthClass?: string;
}) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    function handlePointerDown(event: MouseEvent) {
      if (rootRef.current?.contains(event.target as Node)) return;
      onClose();
    }
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [open, onClose]);

  return (
    <div
      ref={rootRef}
      className="relative shrink-0"
      onMouseEnter={onOpen}
      onMouseLeave={onClose}
    >
      <button
        type="button"
        className={`${navLink} inline-flex items-center gap-1`}
        aria-expanded={open}
        aria-haspopup="true"
        onClick={() => (open ? onClose() : onOpen())}
      >
        {label}
        <ChevronDown
          className={`h-3.5 w-3.5 shrink-0 opacity-70 transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      {open ? (
        <div className={`absolute left-0 top-full z-[100] ${widthClass} pt-1`}>
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-brand-purple p-1.5 shadow-lg ring-1 ring-black/[0.12]">
            {children}
          </div>
        </div>
      ) : null}
    </div>
  );
}

export function SiteHeader() {
  const pathname = usePathname();
  const quoteHref = pathname === "/" ? "#quote" : "/#quote";
  const [open, setOpen] = useState(false);
  const [megaMenu, setMegaMenu] = useState<"services" | "locations" | null>(null);
  const [moreOpen, setMoreOpen] = useState(false);
  const servicesTriggerRef = useRef<HTMLButtonElement>(null);
  const locationsTriggerRef = useRef<HTMLButtonElement>(null);
  const megaPanelRef = useRef<HTMLDivElement>(null);
  const megaCloseTimerRef = useRef<number | null>(null);

  const cancelMegaClose = () => {
    if (megaCloseTimerRef.current) {
      window.clearTimeout(megaCloseTimerRef.current);
      megaCloseTimerRef.current = null;
    }
  };

  const scheduleMegaClose = () => {
    cancelMegaClose();
    megaCloseTimerRef.current = window.setTimeout(() => {
      setMegaMenu(null);
      megaCloseTimerRef.current = null;
    }, 150);
  };

  const openMega = (menu: "services" | "locations") => {
    cancelMegaClose();
    setMoreOpen(false);
    setMegaMenu(menu);
  };

  const toggleMega = (menu: "services" | "locations") => {
    cancelMegaClose();
    setMoreOpen(false);
    setMegaMenu((current) => (current === menu ? null : menu));
  };

  useEffect(() => {
    if (!megaMenu) return;
    function handlePointerDown(event: MouseEvent) {
      const target = event.target as Node;
      if (servicesTriggerRef.current?.contains(target)) return;
      if (locationsTriggerRef.current?.contains(target)) return;
      if (megaPanelRef.current?.contains(target)) return;
      setMegaMenu(null);
    }
    function handleEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setMegaMenu(null);
    }
    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("keydown", handleEscape);
    };
  }, [megaMenu]);

  return (
    <header className="relative sticky top-0 z-50 border-b border-white/10 bg-brand-purple text-brand-yellow">
      <div className="mx-auto flex h-14 max-w-7xl items-center gap-2 sm:h-16 sm:gap-3 container-px">
        <BrandLogo variant="header" />

        <nav
          className="hidden min-w-0 flex-1 flex-nowrap items-center justify-center gap-0 lg:flex"
          aria-label="Primary"
        >
          <div className="relative shrink-0">
            <button
              ref={servicesTriggerRef}
              type="button"
              className={`${navLink} inline-flex items-center gap-1`}
              aria-expanded={megaMenu === "services"}
              aria-haspopup="true"
              onMouseEnter={() => openMega("services")}
              onClick={() => toggleMega("services")}
            >
              Services
              <ChevronDown
                className={`h-3.5 w-3.5 shrink-0 opacity-70 transition-transform duration-200 ${
                  megaMenu === "services" ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>

          <div className="relative shrink-0">
            <button
              ref={locationsTriggerRef}
              type="button"
              className={`${navLink} inline-flex items-center gap-1`}
              aria-expanded={megaMenu === "locations"}
              aria-haspopup="true"
              onMouseEnter={() => openMega("locations")}
              onClick={() => toggleMega("locations")}
            >
              Locations
              <ChevronDown
                className={`h-3.5 w-3.5 shrink-0 opacity-70 transition-transform duration-200 ${
                  megaMenu === "locations" ? "rotate-180" : ""
                }`}
              />
            </button>
          </div>

          <Link href="/piano-movers" className={navLink}>
            Piano
          </Link>
          <Link href="/reviews" className={navLink}>
            Reviews
          </Link>
          <Link href="/blog" className={navLink}>
            Blog
          </Link>
          <Link href="/contact" className={navLink}>
            Contact
          </Link>

          <NavDropdown
            label="More"
            open={moreOpen}
            onOpen={() => {
              setMegaMenu(null);
              setMoreOpen(true);
            }}
            onClose={() => setMoreOpen(false)}
            widthClass="w-[min(100vw-2rem,12rem)]"
          >
            {moreLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setMoreOpen(false)}
                className="block rounded-xl px-3 py-2.5 text-sm font-medium text-brand-yellow/90 transition-colors hover:bg-white/10 hover:text-brand-yellow"
              >
                {item.label}
              </Link>
            ))}
          </NavDropdown>
        </nav>

        <div className="ml-auto flex shrink-0 items-center gap-2">
          <a
            href={`tel:${phoneNumber}`}
            className="group hidden items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-3 py-2 text-xs font-semibold text-brand-yellow transition-colors hover:bg-white/15 hover:text-white xl:inline-flex xl:text-sm"
          >
            <Phone className="h-3.5 w-3.5 shrink-0 transition-colors group-hover:text-white" strokeWidth={2} />
            <span className="whitespace-nowrap">{phoneDisplay}</span>
          </a>
          <Link
            href={quoteHref}
            className="shrink-0 whitespace-nowrap rounded-full bg-brand-yellow px-4 py-2 font-heading text-xs font-bold uppercase tracking-wide text-brand-purple ring-1 ring-white/25 transition hover:brightness-[1.05] xl:px-5 xl:py-2.5 xl:text-sm"
          >
            Free quote
          </Link>
        </div>

        <button
          type="button"
          className="-mr-1 shrink-0 rounded-lg p-2.5 text-brand-yellow transition-colors hover:bg-white/10 lg:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-label={open ? "Close menu" : "Open menu"}
        >
          {open ? <X className="h-5 w-5" strokeWidth={2} /> : <Menu className="h-5 w-5" strokeWidth={2} />}
        </button>
      </div>

      {open && (
        <div className="fixed inset-0 z-[200] flex flex-col bg-brand-purple p-6 text-brand-yellow lg:hidden">
          <div className="mb-8 flex items-center justify-between gap-4">
            <BrandLogo variant="header" onNavigate={() => setOpen(false)} />
            <button
              type="button"
              className="shrink-0 rounded-lg p-1 hover:bg-white/10"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
            >
              <X className="h-6 w-6" />
            </button>
          </div>
          <nav className="flex flex-1 flex-col gap-1 overflow-y-auto font-heading text-xl" aria-label="Mobile primary">
            <Link href="/services" onClick={() => setOpen(false)} className="block rounded-xl px-2 py-2 hover:bg-white/10">
              Services
            </Link>
            <Link href="/locations" onClick={() => setOpen(false)} className="block rounded-xl px-2 py-2 hover:bg-white/10">
              Locations
            </Link>
            <Link href="/piano-movers" onClick={() => setOpen(false)} className="block rounded-xl px-2 py-2 hover:bg-white/10">
              Piano
            </Link>
            <Link href="/reviews" onClick={() => setOpen(false)} className="block rounded-xl px-2 py-2 hover:bg-white/10">
              Reviews
            </Link>
            <Link href="/blog" onClick={() => setOpen(false)} className="block rounded-xl px-2 py-2 hover:bg-white/10">
              Blog
            </Link>
            <Link href="/contact" onClick={() => setOpen(false)} className="block rounded-xl px-2 py-2 hover:bg-white/10">
              Contact
            </Link>
            <p className="mt-4 px-2 text-xs font-semibold uppercase tracking-wider text-brand-yellow/60">
              More
            </p>
            {moreLinks.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setOpen(false)}
                className="block rounded-xl px-2 py-2 hover:bg-white/10"
              >
                {item.label}
              </Link>
            ))}
            <a
              href={`tel:${phoneNumber}`}
              className="mt-2 block font-sans text-base font-semibold text-brand-yellow transition-colors hover:text-white"
            >
              {phoneDisplay}
            </a>
            <Link
              href={quoteHref}
              onClick={() => setOpen(false)}
              className="mt-4 inline-flex items-center justify-center rounded-full bg-brand-yellow px-6 py-3 font-heading text-sm font-bold uppercase text-brand-purple ring-1 ring-white/25"
            >
              Free quote
            </Link>
          </nav>
        </div>
      )}

      {megaMenu ? (
        <div
          ref={megaPanelRef}
          className="absolute inset-x-0 top-full z-[100] hidden border-t border-white/10 bg-brand-purple pt-1 shadow-xl lg:block"
          onMouseEnter={cancelMegaClose}
          onMouseLeave={scheduleMegaClose}
        >
          <div className="mx-auto max-w-7xl container-px">
            {megaMenu === "services" ? (
              <ServiceNavMenu onNavigate={() => setMegaMenu(null)} />
            ) : (
              <LocationNavMenu onNavigate={() => setMegaMenu(null)} />
            )}
          </div>
        </div>
      ) : null}
    </header>
  );
}
