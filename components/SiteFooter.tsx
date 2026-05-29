import Image from "next/image";
import Link from "next/link";
import { BrandLogomarkWatermark } from "@/components/BrandLogomarkWatermark";
import { BrandLogo } from "@/components/BrandLogo";
import { brandAssets } from "@/lib/brand-assets";
import {
  movingDistanceHub,
  storageHub,
  whatsIncludedPage,
} from "@/lib/service-clusters";
import { serviceHref } from "@/lib/service-links";
import { pianoServices, services } from "@/lib/site-data";
import { phoneDisplay, phoneNumber } from "@/lib/site-data";

const clusterLinks = [
  { href: movingDistanceHub.path, label: "Moving by distance" },
  { href: storageHub.path, label: "Storage options" },
  { href: whatsIncludedPage.path, label: "What's included" },
] as const;

export function SiteFooter() {
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
          <ul className="mt-3 space-y-2 text-sm text-white/85">
            {services.map((service) => (
              <li key={service.slug}>
                <Link href={serviceHref(service.slug)} className="hover:text-brand-yellow">
                  {service.title}
                </Link>
              </li>
            ))}
            {clusterLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="hover:text-brand-yellow">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-heading text-brand-yellow">Piano Movers</p>
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
          <p className="mt-4 text-sm">
            <a href={`tel:${phoneNumber}`} className="text-brand-yellow hover:underline">
              {phoneDisplay}
            </a>
          </p>
          <p className="text-sm text-white/85">Mon–Sun, 9am–7pm</p>
        </div>
      </div>
      <div className="mx-auto mt-10 max-w-7xl border-t border-white/20 pt-6 text-center text-xs text-white/70 container-px">
        © {new Date().getFullYear()} Specialist Movers NZ. All rights reserved.
      </div>
    </footer>
  );
}
