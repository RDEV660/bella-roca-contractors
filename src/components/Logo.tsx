"use client";

import { useLocale } from "./LocaleProvider";

type LogoProps = {
  className?: string;
  showText?: boolean;
};

export function Logo({ className = "", showText = true }: LogoProps) {
  const { t } = useLocale();

  return (
    <div className={`flex items-center gap-2 sm:gap-3 ${className}`}>
      <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-sm border border-gold/30 bg-black sm:h-14 sm:w-14">
        <img
          src="/logo.svg"
          alt="Bella Roca"
          className="h-full w-full object-contain p-1"
        />
      </div>
      {showText && (
        <div className="leading-tight">
          <p className="font-display text-base tracking-[0.15em] text-white uppercase sm:text-lg sm:tracking-[0.2em]">
            Bella Roca
          </p>
          <p className="text-[9px] tracking-[0.2em] text-gold uppercase sm:text-[10px] sm:tracking-[0.25em]">
            {t.logo.contractors}
          </p>
        </div>
      )}
    </div>
  );
}
