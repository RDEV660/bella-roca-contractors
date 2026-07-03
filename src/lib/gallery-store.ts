import { list, put, del } from "@vercel/blob";
import {
  projectImages,
  type GalleryImage,
  type ProjectCategory,
  type ProjectImage,
} from "@/lib/projects";

export type { GalleryImage };

const MANIFEST_PATH = "gallery/manifest.json";

export function isBlobConfigured() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN);
}

function defaultImages(): GalleryImage[] {
  return projectImages.map((image: ProjectImage) => ({
    id: image.src,
    src: image.src,
    alt: image.alt,
    category: image.category,
    uploaded: false,
  }));
}

async function findManifestUrl(): Promise<string | null> {
  const { blobs } = await list({ prefix: MANIFEST_PATH });
  const match = blobs.find((blob) => blob.pathname === MANIFEST_PATH);
  return match?.url ?? null;
}

async function readManifest(): Promise<GalleryImage[] | null> {
  const url = await findManifestUrl();
  if (!url) return null;

  const response = await fetch(url, { cache: "no-store" });
  if (!response.ok) return null;

  const data = (await response.json()) as unknown;
  if (!Array.isArray(data)) return null;

  return data.filter(
    (item): item is GalleryImage =>
      !!item &&
      typeof item === "object" &&
      typeof (item as GalleryImage).id === "string" &&
      typeof (item as GalleryImage).src === "string",
  );
}

async function writeManifest(images: GalleryImage[]): Promise<void> {
  await put(MANIFEST_PATH, JSON.stringify(images, null, 2), {
    access: "public",
    contentType: "application/json",
    addRandomSuffix: false,
    allowOverwrite: true,
    cacheControlMaxAge: 0,
  });
}

/**
 * Public gallery list. Reads the Blob manifest when available; otherwise falls
 * back to the bundled default photos so the site always shows images.
 */
export async function getGalleryImages(): Promise<GalleryImage[]> {
  if (!isBlobConfigured()) {
    return defaultImages();
  }

  try {
    const manifest = await readManifest();
    return manifest ?? defaultImages();
  } catch {
    return defaultImages();
  }
}

/**
 * Ensures a manifest exists so the owner can manage every photo (including the
 * originals). Seeds it from the bundled defaults on first run.
 */
export async function getManagedImages(): Promise<GalleryImage[]> {
  const manifest = await readManifest();
  if (manifest) return manifest;

  const seeded = defaultImages();
  await writeManifest(seeded);
  return seeded;
}

export async function addGalleryImage(input: {
  src: string;
  alt: string;
  category: ProjectCategory;
}): Promise<GalleryImage> {
  const current = await getManagedImages();
  const image: GalleryImage = {
    id: input.src,
    src: input.src,
    alt: input.alt,
    category: input.category,
    uploaded: true,
  };
  await writeManifest([image, ...current]);
  return image;
}

export async function deleteGalleryImage(id: string): Promise<void> {
  const current = await getManagedImages();
  const target = current.find((image) => image.id === id);
  const next = current.filter((image) => image.id !== id);
  await writeManifest(next);

  // Remove the underlying Blob file for uploaded photos.
  if (target?.uploaded) {
    try {
      await del(target.src);
    } catch {
      // Manifest is already updated; ignore missing blob.
    }
  }
}
