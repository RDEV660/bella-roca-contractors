"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { LanguageSwitcher } from "./LanguageSwitcher";
import { Logo } from "./Logo";
import { useLocale } from "./LocaleProvider";
import { site } from "@/lib/site";

export function Header() {
  const pathname = usePathname();
  const { t } = useLocale();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { href: "/", label: t.nav.home },
    { href: "/#projects", label: t.nav.projects },
    { href: "/gallery", label: t.nav.gallery },
    { href: "/#services", label: t.nav.services },
    { href: "/financing", label: t.nav.financing },
    { href: "/#contact", label: t.nav.contact },
  ];

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const isHome = pathname === "/";

  return (
    <header
      className={`sticky top-0 z-50 backdrop-blur-md ${
        isHome
          ? "border-b border-white/10 bg-black/40"
          : "border-b border-gold/20 bg-black/90"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3 sm:px-6 sm:py-4">
        <Link href="/" aria-label="Bella Roca home" className="shrink-0">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-5 lg:flex">
          {navLinks.map((link) => {
            const isActive =
              link.href === "/"
                ? pathname === "/"
                : pathname === link.href;

            return (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm tracking-wide uppercase transition-colors ${
                  isActive ? "text-gold" : "text-zinc-300 hover:text-gold"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageSwitcher className="hidden sm:inline-flex" />

          <a
            href={site.phoneHref}
            className="inline-flex min-h-[44px] items-center rounded-sm border border-gold/50 bg-gold/10 px-3 py-2 text-xs font-medium tracking-wide text-gold transition hover:bg-gold hover:text-black sm:px-4 sm:text-sm lg:hidden"
            aria-label={`${t.nav.call} ${site.phone}`}
          >
            {t.nav.call}
          </a>

          <a
            href={site.phoneHref}
            className="hidden rounded-sm border border-gold/50 bg-gold/10 px-4 py-2 text-sm font-medium tracking-wide text-gold transition hover:bg-gold hover:text-black lg:inline-block"
          >
            {site.phone}
          </a>

          <button
            type="button"
            className="inline-flex min-h-[44px] min-w-[44px] flex-col items-center justify-center gap-1.5 rounded-sm border border-gold/30 p-2 lg:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-label={menuOpen ? t.nav.menuClose : t.nav.menuOpen}
          >
            <span
              className={`block h-0.5 w-5 bg-gold transition ${menuOpen ? "translate-y-2 rotate-45" : ""}`}
            />
            <span
              className={`block h-0.5 w-5 bg-gold transition ${menuOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`block h-0.5 w-5 bg-gold transition ${menuOpen ? "-translate-y-2 -rotate-45" : ""}`}
            />
          </button>
        </div>
      </div>

      {menuOpen && (
        <div className="border-t border-gold/20 bg-black/95 px-4 py-4 pb-[max(1rem,env(safe-area-inset-bottom))] lg:hidden">
          <LanguageSwitcher className="mb-4 w-full justify-center sm:hidden" />
          <nav className="flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="min-h-[48px] rounded-sm px-3 py-3 text-base tracking-wide text-zinc-200 uppercase transition hover:bg-gold/10 hover:text-gold"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </header>
  );
}
