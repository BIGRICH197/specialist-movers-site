import Image from "next/image";
import Link from "next/link";
import { BrandLogomarkWatermark } from "@/components/BrandLogomarkWatermark";
import { BrandLogo } from "@/components/BrandLogo";
import { brandAssets } from "@/lib/brand-assets";
import { getServiceNavRows, serviceNavClusterLinks } from "@/lib/service-nav";
import { pianoServices } from "@/lib/site-data";
import { phoneDisplay, phoneNumber } from "@/lib/site-data";
import { nap, nzbnUrl } from "@/lib/company-facts";
import { businessInfo } from "@/lib/business-info";

export function SiteFooter() {
  const serviceRows = getServiceNavRows();
  return (
    <footer className="relative overflow-hidden border-t-4 border-brand-yellow bg-brand-purple py-12 text-white">
      <BrandLogomarkWatermark mark="yellow" position="center-right" size={320} opacity={0.06} />
      <div className="relative z-[1] mx-auto grid max-w-7xl gap-8 container-px md:grid-cols-5">
        <div className="md:col-span-2">
          <BrandLogo variant="footer" />
          <p className="mt-4 text-sm text-white/85">
            Auckland and Hamilton bases, servicing Auckland and the Waikato
          </p>
          <div className="mt-4 flex items-center gap-3">
            <a
              href="https://www.instagram.com/specialistmovers/"
              aria-label="Instagram"
              className="rounded-lg border border-white/30 bg-white/10 p-2.5 transition hover:bg-white/20"
            >
              <Image
                src={brandAssets.socialInstagram}
                alt=""
                width={22}
                height={22}
                unoptimized
              />
            </a>
            <a
              href="https://www.facebook.com/people/Specialist-Movers/61563245376572/"
              aria-label="Facebook"
              className="rounded-lg border border-white/30 bg-white/10 p-2.5 transition hover:bg-white/20"
            >
              <Image
                src={brandAssets.socialFacebook}
                alt=""
                width={22}
                height={22}
                unoptimized
              />
            </a>
          </div>
        </div>
        <div>
          <p className="font-heading text-brand-yellow">Services</p>
          <ul className="mt-3 space-y-3 text-sm text-white/85">
            {serviceRows.map((row) => (
              <li key={row.key}>
                <p className="font-semibold text-white/95">{row.label}</p>
                <p className="mt-1 flex flex-wrap gap-x-3 gap-y-1 text-xs">
                  <Link href={row.auckland.href} className="hover:text-brand-yellow">
                    {row.auckland.label}
                  </Link>
                  {row.hamilton ? (
                    <Link href={row.hamilton.href} className="hover:text-brand-yellow">
                      {row.hamilton.label}
                    </Link>
                  ) : null}
                </p>
              </li>
            ))}
          </ul>
          <ul className="mt-4 space-y-2 border-t border-white/10 pt-4 text-sm text-white/85">
            {serviceNavClusterLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-brand-yellow">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-heading text-brand-yellow">Piano moving</p>
          <ul className="mt-3 space-y-2 text-sm text-white/85">
            {pianoServices.map((piano) => (
              <li key={piano.slug}>
                <Link href={`/piano-movers/${piano.slug}`} className="hover:text-brand-yellow">
                  {piano.title}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-heading text-brand-yellow">Company</p>
          <ul className="mt-3 space-y-2 text-sm text-white/85">
            <li>
              <Link href="/locations" className="hover:text-brand-yellow">
                Areas we serve
              </Link>
            </li>
            <li>
              <Link href="/reviews" className="hover:text-brand-yellow">
                Reviews
              </Link>
            </li>
            <li>
              <Link href="/pricing" className="hover:text-brand-yellow">
                Pricing
              </Link>
            </li>
            <li>
              <Link href="/movers-near-me" className="hover:text-brand-yellow">
                Movers near me
              </Link>
            </li>
            <li>
              <Link href="/faq" className="hover:text-brand-yellow">
                FAQ
              </Link>
            </li>
            <li>
              <Link href="/about" className="hover:text-brand-yellow">
                About
              </Link>
            </li>
            <li>
              <Link href="/why-us" className="hover:text-brand-yellow">
                Why Us
              </Link>
            </li>
            <li>
              <Link href="/blog" className="hover:text-brand-yellow">
                Blog
              </Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-brand-yellow">
                Contact
              </Link>
            </li>
            <li>
              <Link href="/policies" className="hover:text-brand-yellow">
                Policies
              </Link>
            </li>
          </ul>
          <p className="mt-4 font-heading text-brand-yellow">Contact us</p>
          <p className="mt-2 text-sm">
            <a href={`tel:${phoneNumber}`} className="text-brand-yellow hover:underline">
              {phoneDisplay}
            </a>
          </p>
          <p className="text-sm">
            <a
              href={`mailto:${businessInfo.email}`}
              className="break-all text-brand-yellow hover:underline"
            >
              {businessInfo.email}
            </a>
          </p>
          <p className="text-sm text-white/85">Mon–Sun, 9am–7pm</p>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-7xl border-t border-white/20 pt-6 text-center text-xs text-white/70 container-px">
        © {new Date().getFullYear()} Specialist Movers Auckland & Hamilton. All rights reserved.
        {/* H7: neither the legal entity, the NZBN, nor a street address
            appeared anywhere on the site. Table stakes for a business asking
            people to hand over an entire household. */}
        <span className="mt-2 block text-brand-white/60">
          {nap.tradingName} is a trading name of {nap.legalName}. NZBN{" "}
          <a
            href={nzbnUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="underline underline-offset-2 hover:text-brand-white"
          >
            {nap.nzbn}
          </a>
          . {nap.streetAddress}, {nap.suburb}, {nap.city} {nap.postcode}.
        </span>
      </div>
    </footer>
  );
}
