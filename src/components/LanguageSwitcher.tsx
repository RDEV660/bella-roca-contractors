"use client";

import { useLocale } from "@/components/LocaleProvider";
import type { Locale } from "@/i18n/config";

export function LanguageSwitcher({ className = "" }: { className?: string }) {
  const { locale, setLocale, t } = useLocale();

  return (
    <div
      className={`inline-flex rounded-sm border border-gold/30 p-0.5 ${className}`}
      role="group"
      aria-label={t.lang.switch}
    >
      {(["en", "es"] as const).map((code) => (
        <button
          key={code}
          type="button"
          onClick={() => setLocale(code as Locale)}
          className={`min-h-[36px] min-w-[44px] rounded-sm px-3 py-1.5 text-xs font-medium tracking-wide uppercase transition ${
            locale === code
              ? "bg-gold text-black"
              : "text-zinc-300 hover:text-gold"
          }`}
        >
          {code === "en" ? "EN" : "ES"}
        </button>
      ))}
    </div>
  );
}
