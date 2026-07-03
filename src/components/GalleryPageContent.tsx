"use client";

import { GalleryGrid } from "@/components/GalleryGrid";
import { useLocale } from "@/components/LocaleProvider";
import { GalleryImage } from "@/lib/projects";

export function GalleryPageContent({ images }: { images: GalleryImage[] }) {
  const { t } = useLocale();

  return (
    <div className="section-padding mx-auto max-w-6xl px-4 sm:px-6">
      <p className="text-sm tracking-[0.35em] text-gold uppercase animate-fade-in">
        {t.gallery.eyebrow}
      </p>
      <h1 className="font-display mt-3 text-3xl text-white sm:text-4xl md:text-5xl">
        {t.gallery.title}
      </h1>
      <p className="mt-4 max-w-2xl text-sm text-zinc-400 sm:text-base">
        {t.gallery.body}
      </p>

      <div className="mt-10 sm:mt-12">
        <GalleryGrid images={images} />
      </div>
    </div>
  );
}
