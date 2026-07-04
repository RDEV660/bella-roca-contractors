import { get, head, list, put, del } from "@vercel/blob";
import {
  projectImages,
  type GalleryImage,
  type ProjectCategory,
  type ProjectImage,
} from "@/lib/projects";

export type { GalleryImage };

const MANIFEST_PATH = "gallery/manifest.json";

type BlobAccess = "public" | "private";

export function isBlobConfigured() {
  return Boolean(process.env.BLOB_READ_WRITE_TOKEN?.trim());
}

function blobAccessFromEnv(): BlobAccess {
  const value = process.env.BLOB_ACCESS?.trim().toLowerCase();
  return value === "private" ? "private" : "public";
}

export function explainBlobError(error: unknown): string {
  const message = error instanceof Error ? error.message : String(error);

  if (/access|public|private/i.test(message)) {
    return "Your Blob store is set to Private, but this site needs a Public store so photos show on the website. In Vercel → Storage, create a Public Blob store and connect it to this project.";
  }

  if (/token|unauthorized|401|403|forbidden/i.test(message)) {
    return "The BLOB_READ_WRITE_TOKEN is missing or invalid. In Vercel → Storage, connect the Blob store to this project (do not paste the token by hand unless it is the full read-write token).";
  }

  if (/not found|store/i.test(message)) {
    return "Could not reach the Blob store. Confirm the store is connected to bella-roca-contractors, then redeploy.";
  }

  return message || "Unknown storage error.";
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

function parseManifest(raw: unknown): GalleryImage[] | null {
  if (!Array.isArray(raw)) return null;

  const images = raw.filter(
    (item): item is GalleryImage =>
      !!item &&
      typeof item === "object" &&
      typeof (item as GalleryImage).id === "string" &&
      typeof (item as GalleryImage).src === "string",
  );

  return images.length > 0 ? images : null;
}

async function readManifestViaGet(
  access: BlobAccess,
): Promise<GalleryImage[] | null> {
  try {
    await head(MANIFEST_PATH, { token: process.env.BLOB_READ_WRITE_TOKEN });
  } catch {
    return null;
  }

  const result = await get(MANIFEST_PATH, {
    access,
    token: process.env.BLOB_READ_WRITE_TOKEN,
  });

  if (!result || result.statusCode !== 200 || !result.stream) {
    return null;
  }

  const raw = JSON.parse(await new Response(result.stream).text()) as unknown;
  return parseManifest(raw);
}

async function readManifestViaList(): Promise<GalleryImage[] | null> {
  const { blobs } = await list({
    prefix: "gallery/",
    token: process.env.BLOB_READ_WRITE_TOKEN,
  });

  const match = blobs.find((blob) => blob.pathname === MANIFEST_PATH);
  if (!match?.url) return null;

  const response = await fetch(match.url, { cache: "no-store" });
  if (!response.ok) return null;

  const raw = (await response.json()) as unknown;
  return parseManifest(raw);
}

async function readManifest(): Promise<GalleryImage[] | null> {
  const access = blobAccessFromEnv();

  try {
    const viaGet = await readManifestViaGet(access);
    if (viaGet) return viaGet;
  } catch (error) {
    if (access === "public") {
      try {
        return await readManifestViaGet("private");
      } catch {
        throw error;
      }
    }
    throw error;
  }

  try {
    return await readManifestViaList();
  } catch {
    return null;
  }
}

async function writeManifest(images: GalleryImage[]): Promise<void> {
  const body = JSON.stringify(images, null, 2);
  const token = process.env.BLOB_READ_WRITE_TOKEN;
  const access = blobAccessFromEnv();

  try {
    await put(MANIFEST_PATH, body, {
      access,
      contentType: "application/json",
      addRandomSuffix: false,
      allowOverwrite: true,
      token,
    });
    return;
  } catch (error) {
    if (access !== "public") throw error;

    // Some stores were created as private-only.
    await put(MANIFEST_PATH, body, {
      access: "private",
      contentType: "application/json",
      addRandomSuffix: false,
      allowOverwrite: true,
      token,
    });
  }
}

export function getBlobUploadAccess(): BlobAccess {
  return blobAccessFromEnv();
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

  if (target?.uploaded) {
    try {
      await del(target.src, { token: process.env.BLOB_READ_WRITE_TOKEN });
    } catch {
      // Manifest is already updated; ignore missing blob.
    }
  }
}
