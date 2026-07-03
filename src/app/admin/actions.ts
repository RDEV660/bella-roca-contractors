"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";
import {
  ADMIN_COOKIE,
  isAdmin,
  tokenForPassword,
  verifyPassword,
} from "@/lib/admin-auth";
import {
  addGalleryImage,
  deleteGalleryImage,
} from "@/lib/gallery-store";
import type { ProjectCategory } from "@/lib/projects";

const CATEGORIES: ProjectCategory[] = [
  "exterior",
  "interior",
  "bathroom",
  "kitchen",
  "renovation",
];

const THIRTY_DAYS = 60 * 60 * 24 * 30;

export type ActionResult = { ok: boolean; error?: string };

export async function loginAction(
  _prev: ActionResult | undefined,
  formData: FormData,
): Promise<ActionResult> {
  const password = String(formData.get("password") ?? "");

  if (!verifyPassword(password)) {
    return { ok: false, error: "Wrong password. Please try again." };
  }

  const store = await cookies();
  store.set(ADMIN_COOKIE, tokenForPassword(password), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: THIRTY_DAYS,
  });

  revalidatePath("/admin");
  return { ok: true };
}

export async function logoutAction(): Promise<void> {
  const store = await cookies();
  store.delete(ADMIN_COOKIE);
  revalidatePath("/admin");
}

export async function registerPhotoAction(input: {
  url: string;
  alt: string;
  category: string;
}): Promise<ActionResult> {
  if (!(await isAdmin())) {
    return { ok: false, error: "Your session expired. Please log in again." };
  }

  if (!input.url || !input.url.startsWith("https://")) {
    return { ok: false, error: "The photo did not upload correctly." };
  }

  const category = CATEGORIES.includes(input.category as ProjectCategory)
    ? (input.category as ProjectCategory)
    : "exterior";

  const alt = input.alt.trim() || "Bella Roca project photo";

  await addGalleryImage({ src: input.url, alt, category });

  revalidatePath("/admin");
  revalidatePath("/gallery");
  revalidatePath("/");
  return { ok: true };
}

export async function deletePhotoAction(id: string): Promise<ActionResult> {
  if (!(await isAdmin())) {
    return { ok: false, error: "Your session expired. Please log in again." };
  }

  if (!id) {
    return { ok: false, error: "Could not find that photo." };
  }

  await deleteGalleryImage(id);

  revalidatePath("/admin");
  revalidatePath("/gallery");
  revalidatePath("/");
  return { ok: true };
}
