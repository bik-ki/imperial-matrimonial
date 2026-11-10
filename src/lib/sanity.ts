import { createClient } from "@sanity/client";
import imageUrlBuilder from "@sanity/image-url";

const projectId = import.meta.env["VITE_SANITY_PROJECT_ID"];
const dataset = import.meta.env["VITE_SANITY_DATASET"];

export const sanityConfigured = Boolean(projectId && dataset);

export const sanityClient = sanityConfigured
  ? createClient({
      projectId,
      dataset,
      apiVersion: import.meta.env["VITE_SANITY_API_VERSION"] ?? "2024-01-01",
      useCdn: true,
    })
  : null;

const builder = sanityConfigured ? imageUrlBuilder({ projectId, dataset }) : null;

export function sanityImageUrl(source: unknown): string | null {
  if (!builder || !source) return null;
  try {
    return builder.image(source).width(1600).auto("format").url();
  } catch {
    return null;
  }
}
