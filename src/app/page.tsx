import { HeroSection } from "@/components/HeroSection";
import { HomeContent } from "@/components/HomeContent";
import { getGalleryImages } from "@/lib/gallery-store";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const images = await getGalleryImages();

  return (
    <>
      <HeroSection images={images} />
      <HomeContent />
    </>
  );
}
