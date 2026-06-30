"use client";

import Link from "next/link";
import { Logo } from "./Logo";
import { SocialLinks } from "./SocialLinks";
import { useLocale } from "./LocaleProvider";
import { site } from "@/lib/site";

export function Footer() {
  const { t } = useLocale();

  return (
    <footer className="mt-auto border-t border-gold/20 bg-zinc-950 pb-[env(safe-area-inset-bottom)]">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-10 sm:px-6 sm:py-12 md:grid-cols-2 lg:grid-cols-4 lg:gap-10">
        <div className="md:col-span-1">
          <Logo showText={false} />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-zinc-400">
            {t.footer.blurb
              .replace("{experience}", site.experience)
              .replace("{area}", t.hero.serviceArea)}
          </p>
          <SocialLinks className="mt-5" />
        </div>

        <div>
          <h3 className="mb-3 text-sm tracking-[0.2em] text-gold uppercase">
            {t.footer.contact}
          </h3>
          <ul className="space-y-2 text-sm text-zinc-300">
            <li>
              <a href={site.phoneHref} className="hover:text-gold">
                {site.phone}
              </a>
            </li>
            <li>{site.address.full}</li>
            <li>{t.contact.hoursValue}</li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm tracking-[0.2em] text-gold uppercase">
            {t.footer.quickLinks}
          </h3>
          <ul className="space-y-2 text-sm text-zinc-300">
            <li>
              <Link href="/gallery" className="hover:text-gold">
                {t.footer.projectGallery}
              </Link>
            </li>
            <li>
              <Link href="/financing" className="hover:text-gold">
                {t.footer.financingApp}
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-gold">
                {t.footer.terms}
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm tracking-[0.2em] text-gold uppercase">
            {t.footer.followUs}
          </h3>
          <ul className="space-y-2 text-sm text-zinc-300">
            {site.socials.map((social) => (
              <li key={social.href}>
                <a
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold"
                >
                  {social.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-gold/10 px-4 py-4 text-center text-xs tracking-wide text-zinc-500 sm:px-6">
        © {new Date().getFullYear()} {site.name} {site.tagline}. {t.footer.rights}
      </div>
    </footer>
  );
}
