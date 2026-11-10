import { createServerFn } from "@tanstack/react-start";

export type PortableTextBlock = {
  _key: string;
  _type: "block";
  style?: string;
  listItem?: string;
  markDefs?: Array<{
    _key: string;
    _type: string;
    href?: string;
  }>;
  children: Array<{
    _key: string;
    _type: "span";
    text: string;
    marks: string[];
  }>;
};

export type BlogPostSummary = {
  slug: string;
  title: string;
  excerpt: string;
  tags: string[];
  publishedAt: string;
  image: string;
  imageAlt: string;
};

export type BlogPost = BlogPostSummary & {
  author: string;
  body: PortableTextBlock[];
  seoTitle?: string;
  seoDescription?: string;
};

export type SanityServiceSummary = {
  slug: string;
  title: string;
  titleNe?: string;
  summary: string;
  summaryNe?: string;
};

export type SanityService = SanityServiceSummary & {
  body: PortableTextBlock[];
  includes: string[];
  pendingDetails?: string;
  seoTitle?: string;
  seoDescription?: string;
};

export type SanityFaq = {
  id: string;
  question: string;
  answer: string;
  category: string;
  displayOrder: number;
};

export type HomePageContent = {
  hero?: {
    eyebrow?: string;
    titleLine1?: string;
    titleLine2?: string;
    subtitle?: string;
    description?: string;
    primaryCtaLabel?: string;
    secondaryCtaLabel?: string;
    image?: string;
    imageAlt?: string;
    badgeTitle?: string;
    badgeDetail?: string;
  };
  statistics?: Array<{ value: string; label: string }>;
  process?: {
    eyebrow?: string;
    title?: string;
    steps?: Array<{ title: string; description: string }>;
    note?: string;
    primaryCtaLabel?: string;
    secondaryCtaLabel?: string;
  };
  eligibility?: { eyebrow?: string; title?: string; description?: string };
  servicesSection?: {
    eyebrow?: string;
    title?: string;
    consultationCtaLabel?: string;
    whatsappCtaLabel?: string;
  };
  about?: {
    eyebrow?: string;
    title?: string;
    description?: string;
    linkLabel?: string;
    image?: string;
    imageAlt?: string;
  };
  instagram?: {
    eyebrow?: string;
    title?: string;
    note?: string;
    posts?: Array<{ image?: string; imageAlt?: string; caption: string }>;
    featuredReel?: { image?: string; imageAlt?: string; caption?: string };
  };
  blogPreview?: { eyebrow?: string; title?: string; allArticlesLabel?: string };
};

export type SiteSettingsContent = {
  socialLinks?: Array<{ platform: string; url: string }>;
};

export type GalleryImageContent = {
  id: string;
  src: string;
  alt: string;
  caption: string;
};

export type ConsultationPromoContent =
  | { enabled: false }
  | {
      enabled: true;
      image: string | null;
      imageAlt: string;
      heading: string;
      message: string;
      buttonLabel: string;
      destination: "consultation" | "contact";
    };

type SanityGalleryImage = {
  _key?: string;
  image?: unknown;
  alt?: string;
  caption?: string;
};

type SanityConsultationPromo = {
  enabled?: boolean;
  image?: unknown;
  imageAlt?: string;
  heading?: string;
  message?: string;
  buttonLabel?: string;
  ctaDestination?: "consultation" | "contact";
};

const publishedPostFilter =
  '_type == "blogPost" && defined(slug.current) && defined(publishedAt) && dateTime(publishedAt) <= dateTime(now()) && !(_id in path("drafts.**"))';

const publishedServiceFilter =
  '_type == "service" && defined(slug.current) && !(_id in path("drafts.**"))';

const defaultProjectId = "vk9sp82r";
const defaultDataset = "production";
const defaultApiVersion = "2025-02-19";

const summaryProjection = `{
  "slug": slug.current,
  title,
  excerpt,
  "tags": coalesce(tags, []),
  publishedAt,
  "image": coverImage.asset->url,
  "imageAlt": coverImage.alt
}`;

async function getClient() {
  const projectId = process.env["SANITY_PROJECT_ID"] ?? defaultProjectId;
  const dataset = process.env["SANITY_DATASET"] ?? defaultDataset;
  const apiVersion = process.env["SANITY_API_VERSION"] ?? defaultApiVersion;

  if (!projectId.trim() || !dataset.trim() || !apiVersion.trim()) {
    throw new Error("Sanity project ID, dataset, and API version must not be empty.");
  }

  const { createClient } = await import("@sanity/client");
  const token = process.env["SANITY_API_READ_TOKEN"];

  return createClient({
    projectId,
    dataset,
    apiVersion,
    ...(token ? { token } : {}),
    useCdn: !token,
  });
}

async function getImageBuilder() {
  const { default: imageUrlBuilder } = await import("@sanity/image-url");
  return imageUrlBuilder({
    projectId: process.env["SANITY_PROJECT_ID"] ?? defaultProjectId,
    dataset: process.env["SANITY_DATASET"] ?? defaultDataset,
  });
}

function getImageUrl(
  builder: Awaited<ReturnType<typeof getImageBuilder>>,
  source: unknown,
): string | null {
  if (!source) return null;
  try {
    return builder.image(source).width(1600).auto("format").url();
  } catch {
    return null;
  }
}

export const getPublishedBlogPosts = createServerFn({ method: "GET" })
  .validator((limit: number) => {
    if (!Number.isInteger(limit) || limit < 1 || limit > 100) {
      throw new Error("Blog post limit must be an integer from 1 to 100.");
    }

    return limit;
  })
  .handler(async ({ data: limit }) => {
    const client = await getClient();
    const query = `*[${publishedPostFilter}] | order(publishedAt desc)[0...${limit}]${summaryProjection}`;

    return client.fetch<BlogPostSummary[]>(query);
  });

export const getPublishedBlogPost = createServerFn({ method: "GET" })
  .validator((slug: string) => {
    if (!slug || slug.length > 96) {
      throw new Error("A valid blog post slug is required.");
    }

    return slug;
  })
  .handler(async ({ data: slug }) => {
    const client = await getClient();
    const articleQuery = `*[${publishedPostFilter} && slug.current == $slug][0]{
      "slug": slug.current,
      title,
      excerpt,
      "tags": coalesce(tags, []),
      publishedAt,
      author,
      "image": coverImage.asset->url,
      "imageAlt": coverImage.alt,
      body[]{..., children[]{...}, markDefs[]{...}},
      seoTitle,
      seoDescription
    }`;
    const relatedQuery = `*[${publishedPostFilter} && slug.current != $slug] | order(publishedAt desc)[0...4]${summaryProjection}`;
    const [article, relatedPosts] = await Promise.all([
      client.fetch<BlogPost | null>(articleQuery, { slug }),
      client.fetch<BlogPostSummary[]>(relatedQuery, { slug }),
    ]);

    return article ? { article, relatedPosts } : null;
  });

export const getPublishedServices = createServerFn({ method: "GET" }).handler(async () => {
  const client = await getClient();
  const query = `*[${publishedServiceFilter}] | order(title asc){
    "slug": slug.current,
    title,
    titleNe,
    summary,
    summaryNe
  }`;

  return client.fetch<SanityServiceSummary[]>(query);
});

export const getPublishedService = createServerFn({ method: "GET" })
  .validator((slug: string) => {
    if (!slug || slug.length > 96) {
      throw new Error("A valid service slug is required.");
    }

    return slug;
  })
  .handler(async ({ data: slug }) => {
    const client = await getClient();
    const serviceQuery = `*[${publishedServiceFilter} && slug.current == $slug][0]{
      "slug": slug.current,
      title,
      titleNe,
      summary,
      summaryNe,
      body[]{..., children[]{...}, markDefs[]{...}},
      "includes": coalesce(includes, []),
      pendingDetails,
      seoTitle,
      seoDescription
    }`;
    const otherServicesQuery = `*[${publishedServiceFilter} && slug.current != $slug] | order(title asc)[0...3]{
      "slug": slug.current,
      title,
      titleNe,
      summary,
      summaryNe
    }`;
    const [service, otherServices] = await Promise.all([
      client.fetch<SanityService | null>(serviceQuery, { slug }),
      client.fetch<SanityServiceSummary[]>(otherServicesQuery, { slug }),
    ]);

    return service ? { service, otherServices } : null;
  });

export const getPublishedFaqs = createServerFn({ method: "GET" }).handler(async () => {
  const client = await getClient();
  const query = `*[_type == "faq" && defined(question) && !(_id in path("drafts.**"))]
    | order(displayOrder asc, category asc){
      "id": _id,
      question,
      answer,
      category,
      displayOrder
    }`;

  return client.fetch<SanityFaq[]>(query);
});

export const getHomePageContent = createServerFn({ method: "GET" }).handler(async () => {
  const client = await getClient();
  const query = `*[_id == "homePage" && !(_id in path("drafts.**"))][0]{
    hero{
      eyebrow,
      titleLine1,
      titleLine2,
      subtitle,
      description,
      primaryCtaLabel,
      secondaryCtaLabel,
      "image": image.asset->url,
      "imageAlt": image.alt,
      badgeTitle,
      badgeDetail
    },
    statistics[]{value, label},
    process{
      eyebrow,
      title,
      steps[]{title, description},
      note,
      primaryCtaLabel,
      secondaryCtaLabel
    },
    eligibility{eyebrow, title, description},
    servicesSection{eyebrow, title, consultationCtaLabel, whatsappCtaLabel},
    about{
      eyebrow,
      title,
      description,
      linkLabel,
      "image": image.asset->url,
      "imageAlt": image.alt
    },
    instagram{
      eyebrow,
      title,
      note,
      posts[]{caption, "image": image.asset->url, "imageAlt": image.alt},
      featuredReel{caption, "image": image.asset->url, "imageAlt": image.alt}
    },
    blogPreview{eyebrow, title, allArticlesLabel}
  }`;

  return client.fetch<HomePageContent | null>(query);
});

export const getSiteSettings = createServerFn({ method: "GET" }).handler(async () => {
  const client = await getClient();
  const query = `*[_id == "siteSettings" && !(_id in path("drafts.**"))][0]{
    socialLinks[]{platform, url}
  }`;

  return client.fetch<SiteSettingsContent | null>(query);
});

export const getPublishedGallery = createServerFn({ method: "GET" }).handler(async () => {
  const client = await getClient();
  const gallery = await client.fetch<{ images?: SanityGalleryImage[] } | null>(
    `*[_type == "gallery" && !(_id in path("drafts.**"))] | order(_updatedAt desc)[0]{images[]{_key, "image": coalesce(image, @), "alt": coalesce(alt, image.alt), caption}}`,
  );
  if (!gallery?.images?.length) return [];

  const builder = await getImageBuilder();
  return gallery.images.flatMap((image, index) => {
    const src = getImageUrl(builder, image.image);
    if (!src) return [];

    const altText = image.alt?.trim();
    const alt =
      (altText && !/^https?:\/\//i.test(altText) ? altText : null) ||
      image.caption?.trim() ||
      "BiheInCourt gallery image";
    return [
      {
        id: image._key ?? `gallery-image-${index}`,
        src,
        alt,
        caption: image.caption?.trim() ?? "",
      },
    ];
  });
});

export const getPublishedConsultationPromo = createServerFn({ method: "GET" }).handler(
  async (): Promise<ConsultationPromoContent | null> => {
    const client = await getClient();
    const promo = await client.fetch<SanityConsultationPromo | null>(
      `*[_type == "consultationPromo" && !(_id in path("drafts.**"))] | order(_updatedAt desc)[0]{
        enabled,
        image,
        imageAlt,
        heading,
        message,
        buttonLabel,
        ctaDestination
      }`,
    );

    if (!promo) return null;
    if (!promo.enabled) return { enabled: false };
    if (!promo?.heading?.trim() || !promo.message?.trim() || !promo.buttonLabel?.trim()) {
      return { enabled: false };
    }

    const builder = promo.image ? await getImageBuilder() : null;
    return {
      enabled: true,
      image: builder ? getImageUrl(builder, promo.image) : null,
      imageAlt: promo.imageAlt?.trim() || "BiheInCourt consultation",
      heading: promo.heading.trim(),
      message: promo.message.trim(),
      buttonLabel: promo.buttonLabel.trim(),
      destination: promo.ctaDestination === "contact" ? "contact" : "consultation",
    };
  },
);
