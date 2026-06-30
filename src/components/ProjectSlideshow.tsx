"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { projectImages } from "@/lib/projects";

type ProjectSlideshowProps = {
  variant?: "hero" | "section";
};

export function ProjectSlideshow({ variant = "section" }: ProjectSlideshowProps) {
  const [index, setIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const isHero = variant === "hero";

  const total = projectImages.length;
  const current = projectImages[index];

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
    }, isHero ? 7000 : 5500);
  }, [total, isHero]);

  useEffect(() => {
    resetTimer();
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [resetTimer]);

  const slideshow = (
    <div
      className={`group relative overflow-hidden bg-zinc-950 ${
        isHero
          ? "aspect-[4/5] w-full max-w-md rounded-2xl shadow-[0_24px_80px_rgba(0,0,0,0.5),0_0_0_1px_rgba(201,169,98,0.12)]"
          : "rounded-xl border border-gold/15 shadow-[0_0_60px_rgba(201,169,98,0.06)]"
      }`}
    >
      <div
        className={`relative w-full ${isHero ? "h-full min-h-[320px]" : "aspect-[16/10] md:aspect-[16/9]"}`}
      >
        {projectImages.map((image, i) => (
          <Image
            key={image.src}
            src={image.src}
            alt={image.alt}
            fill
            priority={i === 0}
            className={`object-cover transition-all ease-in-out ${
              isHero ? "duration-[1400ms]" : "duration-1000"
            } ${
              i === index
                ? "scale-100 opacity-100"
                : "scale-[1.04] opacity-0"
            }`}
            sizes={isHero ? "(max-width: 768px) 100vw, 448px" : "(max-width: 768px) 100vw, 1152px"}
          />
        ))}

        <div
          className={`absolute inset-0 ${
            isHero
              ? "bg-gradient-to-t from-black/50 via-black/5 to-transparent"
              : "bg-gradient-to-t from-black/70 via-black/15 to-transparent"
          }`}
        />

        {!isHero && (
          <div className="absolute right-0 bottom-0 left-0 p-6 md:p-8">
            <span className="inline-block rounded-full border border-gold/30 bg-black/30 px-3 py-1 text-xs tracking-widest text-gold/90 uppercase backdrop-blur-sm">
              {current.category}
            </span>
            <p className="mt-3 max-w-xl text-sm text-zinc-300 md:text-base">
              {current.alt}
            </p>
          </div>
        )}

        {isHero && (
          <div className="absolute right-4 bottom-4 left-4 flex items-end justify-between gap-3">
            <span className="rounded-full bg-black/35 px-3 py-1 text-[10px] tracking-[0.2em] text-gold/90 uppercase backdrop-blur-md">
              {current.category}
            </span>
            <Link
              href="/gallery"
              className="text-[10px] tracking-[0.15em] text-zinc-300 uppercase backdrop-blur-sm transition hover:text-gold"
            >
              Gallery →
            </Link>
          </div>
        )}

        <button
          type="button"
          onClick={() => {
            goTo(index - 1);
            resetTimer();
          }}
          className={`absolute top-1/2 left-3 -translate-y-1/2 rounded-full text-gold/80 backdrop-blur-sm transition ${
            isHero
              ? "bg-black/20 p-2 opacity-0 group-hover:opacity-100 hover:bg-black/40 hover:text-gold"
              : "border border-gold/25 bg-black/50 p-3 hover:border-gold hover:bg-gold/15"
          }`}
          aria-label="Previous project"
        >
          ‹
        </button>
        <button
          type="button"
          onClick={() => {
            goTo(index + 1);
            resetTimer();
          }}
          className={`absolute top-1/2 right-3 -translate-y-1/2 rounded-full text-gold/80 backdrop-blur-sm transition ${
            isHero
              ? "bg-black/20 p-2 opacity-0 group-hover:opacity-100 hover:bg-black/40 hover:text-gold"
              : "border border-gold/25 bg-black/50 p-3 hover:border-gold hover:bg-gold/15"
          }`}
          aria-label="Next project"
        >
          ›
        </button>

        <div
          className={`absolute left-1/2 flex -translate-x-1/2 gap-1.5 ${
            isHero ? "bottom-3" : "bottom-4"
          }`}
        >
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
                  ? isHero
                    ? "h-1.5 w-6 bg-gold/90"
                    : "h-2 w-8 bg-gold"
                  : isHero
                    ? "h-1.5 w-1.5 bg-white/30 hover:bg-gold/50"
                    : "h-2 w-2 bg-zinc-500 hover:bg-gold/60"
              }`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </div>
  );

  if (isHero) {
    return (
      <div id="projects" className="flex w-full justify-center lg:justify-end">
        {slideshow}
      </div>
    );
  }

  return (
    <section id="projects" className="section-padding border-y border-gold/10 bg-zinc-950/80">
      <div className="mx-auto max-w-6xl">
        <div className="mb-10 flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm tracking-[0.35em] text-gold uppercase">Our Work</p>
            <h2 className="font-display mt-3 text-4xl text-white md:text-5xl">
              Featured Projects
            </h2>
          </div>
          <Link href="/gallery" className="btn-outline">
            View Full Gallery
          </Link>
        </div>
        {slideshow}
      </div>
    </section>
  );
}
