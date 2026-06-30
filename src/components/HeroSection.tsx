"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { SocialLinks } from "@/components/SocialLinks";
import { projectImages } from "@/lib/projects";
import { site } from "@/lib/site";

export function HeroSection() {
  const [index, setIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const total = projectImages.length;

  const goTo = useCallback(
    (next: number) => {
      setIndex((next + total) % total);
    },
    [total],
  );

  const resetTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
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
      className="relative flex min-h-screen items-center overflow-hidden"
    >
      <div className="absolute inset-0">
        {projectImages.map((image, i) => (
          <Image
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

      <div className="absolute inset-0 bg-black/45" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/85 via-black/55 to-black/25" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/50" />

      <div className="relative z-10 mx-auto w-full max-w-6xl px-6 py-32 md:py-40">
        <div className="max-w-2xl animate-fade-in">
          <p className="mb-4 text-sm tracking-[0.35em] text-gold uppercase drop-shadow-sm">
            {site.serviceArea}
          </p>
          <h1 className="font-display text-5xl leading-tight font-semibold text-white drop-shadow-lg md:text-7xl">
            <span className="gold-gradient">Bella Roca</span>
            <br />
            General Contractors
          </h1>
          <p className="mt-3 text-sm tracking-[0.3em] text-zinc-200 uppercase drop-shadow">
            Roofing &amp; Construction
          </p>
          <p className="mt-6 max-w-lg text-base leading-relaxed text-zinc-200/95 drop-shadow">
            {site.description}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <a href={site.phoneHref} className="btn-primary shadow-lg">
              Call {site.phone}
            </a>
            <Link href="/financing" className="btn-outline border-white/40 bg-black/20 text-white backdrop-blur-sm hover:border-gold hover:bg-gold/10 hover:text-gold">
              Apply for Financing
            </Link>
            <Link href="/gallery" className="btn-outline border-white/40 bg-black/20 text-white backdrop-blur-sm hover:border-gold hover:bg-gold/10 hover:text-gold">
              View Gallery
            </Link>
          </div>
          <SocialLinks className="mt-8" />
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 z-10 flex -translate-x-1/2 gap-2">
        {projectImages.map((_, i) => (
          <button
            key={i}
            type="button"
            onClick={() => {
              goTo(i);
              resetTimer();
            }}
            className={`rounded-full transition-all duration-500 ease-out ${
              i === index
                ? "h-1.5 w-7 bg-gold"
                : "h-1.5 w-1.5 bg-white/35 hover:bg-gold/60"
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </section>
  );
}
