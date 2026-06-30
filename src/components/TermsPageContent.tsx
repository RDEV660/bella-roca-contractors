"use client";

import Link from "next/link";
import { useLocale } from "@/components/LocaleProvider";
import { site } from "@/lib/site";

export function TermsPageContent() {
  const { t } = useLocale();
  const sections = [
    t.terms.sections.ownership,
    t.terms.sections.authorization,
    t.terms.sections.sensitive,
    t.terms.sections.accuracy,
    {
      ...t.terms.sections.contact,
      body: t.terms.sections.contact.body
        .replace("{phone}", site.phone)
        .replace("{address}", site.address.full),
    },
  ];

  return (
    <div className="section-padding mx-auto max-w-3xl px-4 sm:px-6">
      <p className="text-sm tracking-[0.35em] text-gold uppercase">{t.terms.eyebrow}</p>
      <h1 className="font-display mt-3 text-3xl text-white sm:text-4xl md:text-5xl">
        {t.terms.title}
      </h1>
      <p className="mt-4 text-sm text-zinc-400 sm:text-base">{t.terms.intro}</p>

      <div className="prose-invert mt-8 space-y-6 text-sm leading-relaxed text-zinc-300 sm:mt-10 sm:space-y-8">
        {sections.map((section) => (
          <section
            key={section.title}
            className="rounded-sm border border-gold/20 bg-zinc-950 p-5 sm:p-6"
          >
            <h2 className="font-display text-xl text-white sm:text-2xl">
              {section.title}
            </h2>
            <p className="mt-3">{section.body}</p>
          </section>
        ))}
      </div>

      <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap">
        <Link href="/financing" className="btn-primary w-full text-center sm:w-auto">
          {t.terms.continue}
        </Link>
        <Link href="/" className="btn-outline w-full text-center sm:w-auto">
          {t.terms.backHome}
        </Link>
      </div>
    </div>
  );
}
