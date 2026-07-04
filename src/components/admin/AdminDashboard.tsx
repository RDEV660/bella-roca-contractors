"use client";

import { useRef, useState, useTransition } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { upload } from "@vercel/blob/client";
import {
  deletePhotoAction,
  logoutAction,
  registerPhotoAction,
} from "@/app/admin/actions";
import type { GalleryImage } from "@/lib/projects";

const CATEGORY_OPTIONS: { value: GalleryImage["category"]; label: string }[] = [
  { value: "exterior", label: "Outside / Exterior" },
  { value: "interior", label: "Inside / Interior" },
  { value: "kitchen", label: "Kitchen" },
  { value: "bathroom", label: "Bathroom" },
  { value: "renovation", label: "Remodel / Renovation" },
];

type Props = {
  images: GalleryImage[];
  blobReady: boolean;
  storageError?: boolean;
  storageErrorMessage?: string;
  uploadAccess: "public" | "private";
};

export function AdminDashboard({
  images,
  blobReady,
  storageError,
  storageErrorMessage,
  uploadAccess,
}: Props) {
  const router = useRouter();
  const fileRef = useRef<HTMLInputElement>(null);
  const [category, setCategory] =
    useState<GalleryImage["category"]>("exterior");
  const [description, setDescription] = useState("");
  const [uploading, setUploading] = useState(false);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [deletingId, startDelete] = useTransition();

  async function handleUpload(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");
    setMessage("");

    const file = fileRef.current?.files?.[0];
    if (!file) {
      setError("Please choose a photo first.");
      return;
    }

    setUploading(true);
    try {
      const blob = await upload(`gallery/photos/${file.name}`, file, {
        access: uploadAccess,
        handleUploadUrl: "/api/gallery/upload",
        contentType: file.type,
      });

      const result = await registerPhotoAction({
        url: blob.url,
        alt: description,
        category,
      });

      if (!result.ok) {
        setError(result.error ?? "Something went wrong.");
        return;
      }

      setMessage("Photo added! It is now live on the website.");
      setDescription("");
      if (fileRef.current) fileRef.current.value = "";
      router.refresh();
    } catch {
      setError("The photo could not be uploaded. Please try again.");
    } finally {
      setUploading(false);
    }
  }

  function handleDelete(image: GalleryImage) {
    const confirmed = window.confirm(
      "Remove this photo from the website? This cannot be undone.",
    );
    if (!confirmed) return;

    setError("");
    setMessage("");
    startDelete(async () => {
      const result = await deletePhotoAction(image.id);
      if (!result.ok) {
        setError(result.error ?? "Could not remove the photo.");
        return;
      }
      setMessage("Photo removed.");
      router.refresh();
    });
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-10 sm:px-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl text-white sm:text-4xl">
            Photo Manager
          </h1>
          <p className="mt-2 text-sm text-zinc-400">
            Add or remove the photos that appear on your website.
          </p>
        </div>
        <form action={logoutAction}>
          <button
            type="submit"
            className="btn-outline min-h-[44px] px-5 text-sm"
          >
            Log Out
          </button>
        </form>
      </div>

      {storageError ? (
        <div className="mt-6 rounded-sm border border-red-500/40 bg-red-500/10 p-4 text-sm text-red-200">
          {storageErrorMessage ||
            "Photo storage is connected but returned an error. Make sure the Vercel Blob store is connected to the Production environment, then redeploy the site."}
        </div>
      ) : (
        !blobReady && (
          <div className="mt-6 rounded-sm border border-yellow-500/40 bg-yellow-500/10 p-4 text-sm text-yellow-200">
            Photo storage is not connected yet. Ask your developer to finish the
            one-time setup (Vercel Blob) so uploads can be saved.
          </div>
        )
      )}

      <section className="mt-8 rounded-sm border border-gold/25 bg-zinc-950 p-5 sm:p-6">
        <h2 className="font-display text-xl text-white sm:text-2xl">
          Add a New Photo
        </h2>

        <form onSubmit={handleUpload} className="mt-5 space-y-5">
          <div>
            <label htmlFor="photo" className="text-sm text-zinc-300">
              1. Choose a photo from your device
            </label>
            <input
              ref={fileRef}
              id="photo"
              type="file"
              accept="image/*"
              className="mt-2 block w-full text-sm text-zinc-300 file:mr-4 file:min-h-[48px] file:cursor-pointer file:rounded-sm file:border-0 file:bg-gold file:px-5 file:py-3 file:text-sm file:font-semibold file:text-black hover:file:bg-gold-light"
            />
          </div>

          <div>
            <label htmlFor="category" className="text-sm text-zinc-300">
              2. What kind of project is it?
            </label>
            <select
              id="category"
              value={category}
              onChange={(e) =>
                setCategory(e.target.value as GalleryImage["category"])
              }
              className="mt-2 min-h-[48px] w-full text-base"
            >
              {CATEGORY_OPTIONS.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label htmlFor="description" className="text-sm text-zinc-300">
              3. Short description (optional)
            </label>
            <input
              id="description"
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. New stone home in Alton"
              className="mt-2 min-h-[48px] w-full text-base"
            />
          </div>

          {error && (
            <p className="text-sm text-red-400" role="alert">
              {error}
            </p>
          )}
          {message && (
            <p className="text-sm text-green-400" role="status">
              {message}
            </p>
          )}

          <button
            type="submit"
            className="btn-primary w-full text-center text-lg sm:w-auto"
            disabled={uploading || !blobReady}
          >
            {uploading ? "Uploading…" : "Add Photo"}
          </button>
        </form>
      </section>

      <section className="mt-10">
        <h2 className="font-display text-xl text-white sm:text-2xl">
          Photos on the Website ({images.length})
        </h2>
        <p className="mt-2 text-sm text-zinc-400">
          Tap “Remove” under any photo to take it off the website.
        </p>

        {images.length === 0 ? (
          <p className="mt-6 text-sm text-zinc-500">
            No photos yet. Add your first one above.
          </p>
        ) : (
          <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
            {images.map((image) => (
              <div
                key={image.id}
                className="overflow-hidden rounded-sm border border-zinc-800 bg-black"
              >
                <div className="relative aspect-[4/3]">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                </div>
                <button
                  type="button"
                  onClick={() => handleDelete(image)}
                  disabled={deletingId}
                  className="min-h-[44px] w-full bg-zinc-900 px-3 py-2 text-sm text-red-300 transition hover:bg-red-500/20 hover:text-red-200 disabled:opacity-50"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
