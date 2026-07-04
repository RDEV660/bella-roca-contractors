import Image, { type ImageProps } from "next/image";
import { isBlobUrl } from "@/lib/blob-url";

type GalleryPhotoProps = Omit<ImageProps, "src" | "alt"> & {
  src: string;
  alt: string;
};

/** Gallery/hero photo — blob uploads skip Next.js optimization and load directly. */
export function GalleryPhoto({ src, alt, ...props }: GalleryPhotoProps) {
  return (
    <Image src={src} alt={alt} unoptimized={isBlobUrl(src)} {...props} />
  );
}
