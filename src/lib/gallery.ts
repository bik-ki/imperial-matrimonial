import { sanityClient, sanityConfigured, sanityImageUrl } from "./sanity";

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  caption: string;
}

interface SanityGalleryImage {
  _key?: string;
  image?: unknown;
  alt?: string;
  caption?: string;
}

interface SanityGallery {
  images?: SanityGalleryImage[];
}

const galleryQuery = `*[_type == "gallery"][0]{
  images[]{
    _key,
    image,
    alt,
    caption
  }
}`;

function getAltText(image: SanityGalleryImage): string {
  const alt = image.alt?.trim();
  if (alt) return alt;
  const caption = image.caption?.trim();
  if (caption) return caption;
  return "Imperial Matrimonial gallery image";
}

export async function fetchGallery(): Promise<GalleryImage[]> {
  if (!sanityConfigured || !sanityClient) {
    throw new Error("Sanity gallery configuration is missing.");
  }

  const gallery = await sanityClient.fetch<SanityGallery | null>(galleryQuery);
  return (gallery?.images ?? []).flatMap((image, index) => {
    const src = sanityImageUrl(image.image);
    if (!src) return [];

    return [
      {
        id: image._key ?? `gallery-image-${index}`,
        src,
        alt: getAltText(image),
        caption: image.caption?.trim() ?? "",
      },
    ];
  });
}
