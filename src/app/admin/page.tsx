import type { Metadata } from "next";
import { AdminLogin } from "@/components/admin/AdminLogin";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { isAdmin, isAdminEnabled } from "@/lib/admin-auth";
import {
  explainBlobError,
  getManagedImages,
  isBlobConfigured,
} from "@/lib/gallery-store";
import { projectImages, type GalleryImage } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Photo Manager",
  robots: { index: false, follow: false },
};

export const dynamic = "force-dynamic";

function defaultImages(): GalleryImage[] {
  return projectImages.map((image) => ({
    id: image.src,
    src: image.src,
    alt: image.alt,
    category: image.category,
    uploaded: false,
  }));
}

export default async function AdminPage() {
  if (!isAdminEnabled()) {
    return (
      <div className="mx-auto max-w-md px-4 py-24 text-center">
        <h1 className="font-display text-2xl text-white">Setup Needed</h1>
        <p className="mt-3 text-sm text-zinc-400">
          The Photo Manager is not turned on yet. Ask your developer to add an
          admin password so you can log in.
        </p>
      </div>
    );
  }

  if (!(await isAdmin())) {
    return <AdminLogin />;
  }

  const blobConfigured = isBlobConfigured();
  let images = defaultImages();
  let storageError = false;
  let storageErrorMessage = "";

  if (blobConfigured) {
    try {
      images = await getManagedImages();
    } catch (error) {
      storageError = true;
      storageErrorMessage = explainBlobError(error);
    }
  }

  return (
    <AdminDashboard
      images={images}
      blobReady={blobConfigured && !storageError}
      storageError={storageError}
      storageErrorMessage={storageErrorMessage}
    />
  );
}
