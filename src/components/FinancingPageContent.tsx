"use client";

import Link from "next/link";
import { FinancingForm } from "@/components/FinancingForm";
import { useLocale } from "@/components/LocaleProvider";
import { site } from "@/lib/site";

export function FinancingPageContent() {
  const { t } = useLocale();

  return (
    <div className="section-padding mx-auto max-w-3xl px-4 sm:px-6">
      <p className="text-sm tracking-[0.35em] text-gold uppercase">
        {t.financing.eyebrow}
      </p>
      <h1 className="font-display mt-3 text-3xl text-white sm:text-4xl md:text-5xl">
        {t.financing.title}
      </h1>
      <p className="mt-4 text-sm leading-relaxed text-zinc-400 sm:text-base">
        {t.financing.introBefore}{" "}
        <Link href="/terms" className="text-gold hover:underline">
          {t.financing.termsLink}
        </Link>{" "}
        {t.financing.introAfter}{" "}
        <a href={site.phoneHref} className="text-gold hover:underline">
          {site.phone}
        </a>
        .
      </p>

      <div className="mt-8 rounded-sm border border-gold/20 bg-black p-4 sm:mt-10 sm:p-6 md:p-10">
        <FinancingForm />
      </div>
    </div>
  );
}
