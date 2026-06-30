"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Logo } from "./Logo";
import { site } from "@/lib/site";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/#projects", label: "Projects" },
  { href: "/gallery", label: "Gallery" },
  { href: "/#services", label: "Services" },
  { href: "/financing", label: "Financing" },
  { href: "/#contact", label: "Contact" },
];

export function Header() {
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-gold/20 bg-black/90 backdrop-blur-md">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
        <Link href="/" aria-label="Bella Roca home">
          <Logo />
        </Link>

        <nav className="hidden items-center gap-6 lg:flex">
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

        <a
          href={site.phoneHref}
          className="hidden rounded-sm border border-gold/50 bg-gold/10 px-4 py-2 text-sm font-medium tracking-wide text-gold transition hover:bg-gold hover:text-black lg:inline-block"
        >
          {site.phone}
        </a>
      </div>
    </header>
  );
}
