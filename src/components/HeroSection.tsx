"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useLocale } from "@/components/LocaleProvider";
import { GalleryPhoto } from "@/components/GalleryPhoto";
import { SocialLinks } from "@/components/SocialLinks";
import { GalleryImage } from "@/lib/projects";
import { site } from "@/lib/site";

export function HeroSection({ images }: { images: GalleryImage[] }) {
  const { t } = useLocale();
  const [index, setIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const total = images.length;

  const goTo = useCallback(
    (next: number) => {
      setIndex((next + total) % total);
    },
    [total],
  );

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (total <= 1) return;
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % total);
    }, 7000);
  }, [total]);

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [resetTimer]);

  return (
    <section
      id="projects"
      className="relative flex min-h-[100dvh] items-center overflow-hidden"
    >
      <div className="absolute inset-0">
        {images.map((image, i) => (
          <GalleryPhoto
            key={image.src}
            src={image.src}
            alt=""
            fill
            priority={i === 0}
            aria-hidden={i !== index}
            className={`object-cover transition-all duration-[2000ms] ease-in-out ${
              i === index ? "scale-100 opacity-100" : "scale-105 opacity-0"
            }`}
            sizes="100vw"
          />
        ))}
      </div>

      <div className="absolute inset-0 bg-black/50" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/65 to-black/35" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/55" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-4 py-28 sm:px-6 sm:py-32 md:py-40">
        <div className="max-w-2xl animate-fade-in">
          <p className="mb-3 text-xs tracking-[0.25em] text-gold uppercase drop-shadow-sm sm:mb-4 sm:text-sm sm:tracking-[0.35em]">
            {t.hero.serviceArea}
          </p>
          <h1 className="font-display text-4xl leading-tight font-semibold text-white drop-shadow-lg sm:text-5xl md:text-7xl">
            <span className="gold-gradient">Bella Roca</span>
            <br />
            {t.hero.tagline}
          </h1>
          <p className="mt-2 text-xs tracking-[0.2em] text-zinc-200 uppercase drop-shadow sm:mt-3 sm:text-sm sm:tracking-[0.3em]">
            {t.hero.subtitle}
          </p>
          <p className="mt-4 max-w-lg text-sm leading-relaxed text-zinc-200/95 drop-shadow sm:mt-6 sm:text-base">
            {t.hero.description}
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:mt-10 sm:flex-row sm:flex-wrap sm:items-center">
            <a
              href={site.phoneHref}
              className="btn-primary w-full text-center shadow-lg sm:w-auto"
            >
              {t.hero.call} {site.phone}
            </a>
            <Link
              href="/financing"
              className="btn-outline w-full border-white/40 bg-black/25 text-center text-white backdrop-blur-sm hover:border-gold hover:bg-gold/10 hover:text-gold sm:w-auto"
            >
              {t.hero.applyFinancing}
            </Link>
            <Link
              href="/gallery"
              className="btn-outline w-full border-white/40 bg-black/25 text-center text-white backdrop-blur-sm hover:border-gold hover:bg-gold/10 hover:text-gold sm:w-auto"
            >
              {t.hero.viewGallery}
            </Link>
          </div>
          <SocialLinks className="mt-6 sm:mt-8" />
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 z-10 flex max-w-[90vw] -translate-x-1/2 flex-wrap justify-center gap-1.5 sm:bottom-8 sm:gap-2">
        {total > 1 &&
          images.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => {
              goTo(i);
              resetTimer();
            }}
            className={`rounded-full transition-all duration-500 ease-out ${
              i === index
                ? "h-2 w-7 bg-gold sm:h-1.5"
                : "h-2 w-2 bg-white/35 hover:bg-gold/60 sm:h-1.5"
            }`}
            aria-label={`${t.hero.slide} ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
