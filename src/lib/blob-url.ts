export function isBlobUrl(src: string) {
  return src.includes("blob.vercel-storage.com");
}

export function isPrivateBlobUrl(url: string) {
  return isBlobUrl(url) && !url.includes(".public.blob.vercel-storage.com");
}

export function assertPublicBlobUrl(url: string) {
  if (!isBlobUrl(url)) return;

  if (isPrivateBlobUrl(url)) {
    throw new Error(
      "This photo was saved as private and cannot appear on the public website. In Vercel → Storage, use a Public Blob store, then upload the photo again.",
    );
  }
}
