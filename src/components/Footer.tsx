import Link from "next/link";
import { Logo } from "./Logo";
import { SocialLinks } from "./SocialLinks";
import { site } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-auto border-t border-gold/20 bg-zinc-950">
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-12 md:grid-cols-4">
        <div className="md:col-span-1">
          <Logo showText={false} />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-zinc-400">
            Family-owned general contractors with {site.experience} of
            experience serving {site.serviceArea}.
          </p>
          <SocialLinks className="mt-5" />
        </div>

        <div>
          <h3 className="mb-3 text-sm tracking-[0.2em] text-gold uppercase">
            Contact
          </h3>
          <ul className="space-y-2 text-sm text-zinc-300">
            <li>
              <a href={site.phoneHref} className="hover:text-gold">
                {site.phone}
              </a>
            </li>
            <li>{site.address.full}</li>
            <li>{site.hours}</li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm tracking-[0.2em] text-gold uppercase">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm text-zinc-300">
            <li>
              <Link href="/gallery" className="hover:text-gold">
                Project Gallery
              </Link>
            </li>
            <li>
              <Link href="/financing" className="hover:text-gold">
                Financing Application
              </Link>
            </li>
            <li>
              <Link href="/terms" className="hover:text-gold">
                Terms &amp; Authorization
              </Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-sm tracking-[0.2em] text-gold uppercase">
            Follow Us
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

      <div className="border-t border-gold/10 px-6 py-4 text-center text-xs tracking-wide text-zinc-500">
        © {new Date().getFullYear()} {site.name} {site.tagline}. All rights
        reserved.
      </div>
    </footer>
  );
}
