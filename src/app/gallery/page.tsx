import { GalleryPageContent } from "@/components/GalleryPageContent";
import { site } from "@/lib/site";

export const metadata = {
  title: `Project Gallery | ${site.name}`,
  description:
    "Browse completed residential and commercial construction projects by Bella Roca General Contractors across the Rio Grande Valley.",
};

export default function GalleryPage() {
  return <GalleryPageContent />;
}
