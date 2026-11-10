import { sanityClient, sanityConfigured, sanityImageUrl } from "./sanity";

export interface ConsultationPromo {
  image: string | null;
  imageAlt: string;
  heading: string;
  message: string;
  buttonLabel: string;
  destination: "consultation" | "contact";
}

interface SanityConsultationPromo {
  enabled?: boolean;
  image?: unknown;
  imageAlt?: string;
  heading?: string;
  message?: string;
  buttonLabel?: string;
  ctaDestination?: "consultation" | "contact";
}

const query = `*[_type == "consultationPromo" && enabled == true][0]{
  image,
  imageAlt,
  heading,
  message,
  buttonLabel,
  ctaDestination
}`;

export async function fetchConsultationPromo(): Promise<ConsultationPromo | null> {
  if (!sanityConfigured || !sanityClient) {
    throw new Error("Sanity consultation promotion configuration is missing.");
  }

  const promo = await sanityClient.fetch<SanityConsultationPromo | null>(query);
  if (!promo?.heading?.trim() || !promo.message?.trim() || !promo.buttonLabel?.trim()) {
    return null;
  }

  return {
    image: sanityImageUrl(promo.image),
    imageAlt: promo.imageAlt?.trim() || "Imperial Matrimonial consultation",
    heading: promo.heading.trim(),
    message: promo.message.trim(),
    buttonLabel: promo.buttonLabel.trim(),
    destination: promo.ctaDestination === "contact" ? "contact" : "consultation",
  };
}
