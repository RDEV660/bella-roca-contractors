"use client";

import { useState } from "react";
import Image from "next/image";
import { ProjectImage, projectImages } from "@/lib/projects";

const categories = [
  "All",
  "Exterior",
  "Interior",
  "Bathroom",
  "Kitchen",
  "Renovation",
] as const;

export function GalleryGrid() {
  const [filter, setFilter] =
    useState<(typeof categories)[number]>("All");
  const [lightbox, setLightbox] = useState<ProjectImage | null>(null);

  const filtered =
    filter === "All"
      ? projectImages
      : projectImages.filter((img) => img.category === filter);

  return (
    <>
      <div className="mb-10 flex flex-wrap gap-3">
        {categories.map((cat) => (
          <button
            key={cat}
            type="button"
            onClick={() => setFilter(cat)}
            className={`rounded-sm border px-4 py-2 text-xs tracking-widest uppercase transition ${
              filter === cat
                ? "border-gold bg-gold/15 text-gold"
                : "border-zinc-700 text-zinc-400 hover:border-gold/40"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((image, i) => (
          <button
            key={image.src}
            type="button"
            onClick={() => setLightbox(image)}
            className="group relative aspect-[4/3] overflow-hidden rounded-sm border border-zinc-800 bg-black text-left transition hover:border-gold/40 hover:shadow-[0_0_30px_rgba(201,169,98,0.12)]"
            style={{ animationDelay: `${i * 60}ms` }}
          >
            <Image
              src={image.src}
              alt={image.alt}
              fill
              className="object-cover transition duration-500 group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, 33vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 transition group-hover:opacity-100" />
            <div className="absolute right-0 bottom-0 left-0 translate-y-2 p-4 opacity-0 transition group-hover:translate-y-0 group-hover:opacity-100">
              <span className="text-xs tracking-widest text-gold uppercase">
                {image.category}
              </span>
            </div>
          </button>
        ))}
      </div>

      {lightbox && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm animate-fade-in"
          onClick={() => setLightbox(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Project image preview"
        >
          <div
            className="relative max-h-[90vh] w-full max-w-5xl"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setLightbox(null)}
              className="absolute -top-12 right-0 text-sm tracking-wide text-zinc-400 uppercase hover:text-gold"
            >
              Close
            </button>
            <div className="relative aspect-[16/10] w-full overflow-hidden rounded-sm border border-gold/30">
              <Image
                src={lightbox.src}
                alt={lightbox.alt}
                fill
                className="object-contain bg-black"
                sizes="90vw"
              />
            </div>
            <p className="mt-4 text-center text-sm text-zinc-400">{lightbox.alt}</p>
          </div>
        </div>
      )}
    </>
  );
}
