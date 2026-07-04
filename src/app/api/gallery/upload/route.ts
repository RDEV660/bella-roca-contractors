import { put } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { NextResponse } from "next/server";
import { assertPublicBlobUrl } from "@/lib/blob-url";
import { isAdmin } from "@/lib/admin-auth";
import {
  addGalleryImage,
  explainBlobError,
} from "@/lib/gallery-store";
import type { ProjectCategory } from "@/lib/projects";

const ALLOWED_TYPES = new Set([
  "image/jpeg",
  "image/png",
  "image/webp",
  "image/gif",
]);

const CATEGORIES: ProjectCategory[] = [
  "exterior",
  "interior",
  "bathroom",
  "kitchen",
  "renovation",
];

const MAX_BYTES = 15 * 1024 * 1024;

export async function POST(request: Request): Promise<NextResponse> {
  if (!(await isAdmin())) {
    return NextResponse.json({ error: "Not authorized." }, { status: 401 });
  }

  try {
    const formData = await request.formData();
    const file = formData.get("file");
    const category = String(formData.get("category") ?? "exterior");
    const alt = String(formData.get("alt") ?? "").trim();

    if (!(file instanceof File) || file.size === 0) {
      return NextResponse.json(
        { error: "Please choose a photo first." },
        { status: 400 },
      );
    }

    if (!ALLOWED_TYPES.has(file.type)) {
      return NextResponse.json(
        { error: "Please use a JPG, PNG, WebP, or GIF photo." },
        { status: 400 },
      );
    }

    if (file.size > MAX_BYTES) {
      return NextResponse.json(
        { error: "Photo must be 15 MB or smaller." },
        { status: 400 },
      );
    }

    const safeCategory = CATEGORIES.includes(category as ProjectCategory)
      ? (category as ProjectCategory)
      : "exterior";

    const extension = file.name.split(".").pop()?.toLowerCase() || "jpg";
    const pathname = `gallery/photos/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${extension}`;
    const token = process.env.BLOB_READ_WRITE_TOKEN;

    const blob = await put(pathname, file, {
      access: "public",
      contentType: file.type,
      addRandomSuffix: false,
      token,
    });

    assertPublicBlobUrl(blob.url);

    await addGalleryImage({
      src: blob.url,
      alt: alt || "Bella Roca project photo",
      category: safeCategory,
    });

    revalidatePath("/admin");
    revalidatePath("/gallery");
    revalidatePath("/");

    return NextResponse.json({ success: true, url: blob.url });
  } catch (error) {
    return NextResponse.json(
      { error: explainBlobError(error) },
      { status: 500 },
    );
  }
}
