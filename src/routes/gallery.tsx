import { useEffect, useState } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { AlertCircle, LoaderCircle } from "lucide-react";
import { PageHero } from "@/components/site/Sections";
import { fetchGallery, type GalleryImage } from "@/lib/gallery";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery — Imperial Matrimonial" },
      {
        name: "description",
        content:
          "A visual look at Imperial Matrimonial and its legal marriage registration practice.",
      },
    ],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [failedIds, setFailedIds] = useState<Set<string>>(new Set());
  const [status, setStatus] = useState<"loading" | "ready" | "error">("loading");

  useEffect(() => {
    let active = true;
    fetchGallery()
      .then((result) => {
        if (!active) return;
        setImages(result);
        setStatus("ready");
      })
      .catch(() => {
        if (active) setStatus("error");
      });
    return () => {
      active = false;
    };
  }, []);

  return (
    <>
      <PageHero
        eyebrow="Gallery"
        title="A closer look at the practice."
        desc="Explore images shared by Imperial Matrimonial. Captions and accessibility descriptions are managed in the gallery content."
      />
      <section className="container-x py-16 md:py-24" aria-labelledby="gallery-heading">
        <h2 id="gallery-heading" className="sr-only">
          Imperial Matrimonial gallery
        </h2>
        {status === "loading" && (
          <div
            className="flex min-h-48 items-center justify-center gap-3 border bg-card p-8 text-sm text-muted-foreground"
            role="status"
          >
            <LoaderCircle className="h-5 w-5 animate-spin" aria-hidden="true" />
            Loading gallery…
          </div>
        )}
        {status === "error" && (
          <div
            className="flex min-h-48 flex-col items-center justify-center border border-destructive/40 bg-card p-8 text-center"
            role="alert"
          >
            <AlertCircle className="h-6 w-6 text-destructive" aria-hidden="true" />
            <p className="mt-3 font-medium">The gallery could not be loaded.</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Gallery content is temporarily unavailable. Please try again later.
            </p>
          </div>
        )}
        {status === "ready" && images.length === 0 && (
          <div className="min-h-48 border border-dashed p-8 text-center">
            <h2 className="text-3xl">Gallery images will appear here.</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              No published gallery images are available yet.
            </p>
          </div>
        )}
        {status === "ready" && images.length > 0 && failedIds.size === images.length && (
          <div className="min-h-48 border border-dashed p-8 text-center" role="status">
            <h2 className="text-3xl">Gallery images are unavailable.</h2>
            <p className="mt-3 text-sm text-muted-foreground">
              The published gallery entries could not be displayed right now.
            </p>
          </div>
        )}
        {status === "ready" && images.length > 0 && failedIds.size < images.length && (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {images.map((image) => (
              <GalleryCard
                key={image.id}
                image={image}
                onError={() => setFailedIds((ids) => new Set(ids).add(image.id))}
                hidden={failedIds.has(image.id)}
              />
            ))}
          </div>
        )}
      </section>
    </>
  );
}

function GalleryCard({
  image,
  onError,
  hidden,
}: {
  image: GalleryImage;
  onError: () => void;
  hidden: boolean;
}) {
  if (hidden) return null;
  return (
    <figure className="group overflow-hidden border bg-card">
      <img
        src={image.src}
        alt={image.alt}
        loading="lazy"
        onError={onError}
        className="aspect-[4/3] w-full object-cover transition duration-500 group-hover:scale-105"
      />
      {image.caption && (
        <figcaption className="break-words p-4 text-sm text-muted-foreground">
          {image.caption}
        </figcaption>
      )}
    </figure>
  );
}
