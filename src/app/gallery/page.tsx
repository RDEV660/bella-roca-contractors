import { GalleryGrid } from "@/components/GalleryGrid";
import { site } from "@/lib/site";

export const metadata = {
  title: `Project Gallery | ${site.name}`,
  description:
    "Browse completed residential and commercial construction projects by Bella Roca General Contractors across the Rio Grande Valley.",
};

export default function GalleryPage() {
  return (
    <div className="section-padding mx-auto max-w-6xl">
      <p className="text-sm tracking-[0.35em] text-gold uppercase animate-fade-in">
        Portfolio
      </p>
      <h1 className="font-display mt-3 text-4xl text-white md:text-5xl">
        Project Gallery
      </h1>
      <p className="mt-4 max-w-2xl text-zinc-400">
        A selection of our residential and commercial work across the RGV —
        exteriors, kitchens, bathrooms, and full renovations.
      </p>

      <div className="mt-12">
        <GalleryGrid />
      </div>
    </div>
  );
}
