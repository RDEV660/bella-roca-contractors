"use client";

import { useState } from "react";
import { useLocale } from "@/components/LocaleProvider";
import { GalleryPhoto } from "@/components/GalleryPhoto";
import { GalleryImage } from "@/lib/projects";

const categoryKeys = [
  "all",
  "exterior",
  "interior",
  "bathroom",
  "kitchen",
  "renovation",
] as const;

export function GalleryGrid({ images }: { images: GalleryImage[] }) {
  const { t } = useLocale();
  const [filter, setFilter] =
    useState<(typeof categoryKeys)[number]>("all");
  const [lightbox, setLightbox] = useState<GalleryImage | null>(null);

  const filtered =
    filter === "all"
      ? images
      : images.filter((img) => img.category === filter);

  return (
    <>
      <div className="mb-8 flex flex-wrap gap-2 sm:mb-10 sm:gap-3">
        {categoryKeys.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setFilter(cat)}
            className={`min-h-[44px] rounded-sm border px-4 py-2 text-xs tracking-widest uppercase transition ${
              filter === cat
                ? "border-gold bg-gold/15 text-gold"
                : "border-zinc-700 text-zinc-400 hover:border-gold/40"
            }`}
          >
            {t.gallery.categories[cat]}
          </button>
        ))}
      </div>

      <div className="grid gap-3 sm:grid-cols-2 sm:gap-4 lg:grid-cols-3">
        {filtered.map((image) => (
          <button
            key={image.src}
            type="button"
            onClick={() => setLightbox(image)}
            className="group relative aspect-[4/3] overflow-hidden rounded-sm border border-zinc-800 bg-black text-left transition hover:border-gold/40"
          >
            <GalleryPhoto
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover transition duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
            <div className="absolute right-0 bottom-0 left-0 translate-y-2 p-4 opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">
              <span className="text-xs tracking-widest text-gold uppercase">
                {t.gallery.categories[image.category]}
              </span>
            </div>
          </button>
        ))}
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
        >
          <div
            className="relative max-h-[90dvh] w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setLightbox(null)}
              className="absolute -top-12 right-0 min-h-[44px] text-sm tracking-wide text-zinc-400 uppercase hover:text-gold"
            >
              {t.gallery.close}
            </button>
            <div className="relative aspect-[4/3] w-full overflow-hidden rounded-sm border border-gold/30 sm:aspect-[16/10]">
              <GalleryPhoto
                src={lightbox.src}
                alt={lightbox.alt}
                fill
                className="object-contain bg-black"
                sizes="100vw"
              />
            </div>
          </div>
        </div>
      )}
    </>
  );
}
