import { GalleryPageContent } from "@/components/GalleryPageContent";
import { getGalleryImages } from "@/lib/gallery-store";
import { site } from "@/lib/site";

export const metadata = {
  title: `Project Gallery | ${site.name}`,
  description:
    "Browse completed residential and commercial construction projects by Bella Roca General Contractors across the Rio Grande Valley.",
};

export const dynamic = "force-dynamic";

export default async function GalleryPage() {
  const images = await getGalleryImages();
  return <GalleryPageContent images={images} />;
}
