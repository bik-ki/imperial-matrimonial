import { createFileRoute } from "@tanstack/react-router";
import { BlogCard, PageHero } from "@/components/site/Sections";
import { getPublishedBlogPosts } from "@/lib/sanity.server";
import { articles } from "@/data/content";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/blog/")({
  loader: async () => {
    const publishedPosts = await getPublishedBlogPosts({ data: 100 });
    const postsBySlug = new Map(
      articles
        .filter((article) => !article.isPlaceholder)
        .map((article) => [
          article.slug,
          {
            slug: article.slug,
            title: article.title,
            excerpt: article.excerpt,
            tags: [article.category],
            publishedAt: article.date,
            image: article.image,
            imageAlt: article.imageAlt,
          },
        ]),
    );

    for (const post of publishedPosts) postsBySlug.set(post.slug, post);

    return [...postsBySlug.values()]
      .sort((a, b) => Date.parse(b.publishedAt) - Date.parse(a.publishedAt))
      .slice(0, 100);
  },
  head: () => ({
    meta: [
      { title: "Blog — BiheInCourt" },
      {
        name: "description",
        content: "Legal resources and articles from BiheInCourt, Advocates & Legal Associates.",
      },
    ],
  }),
  component: BlogIndexPage,
});

function BlogIndexPage() {
  const posts = Route.useLoaderData();
  const { lang } = useT();
  return (
    <>
      <PageHero
        eyebrow={lang === "ne" ? "कानुनी जानकारी" : "Legal resources"}
        title={
          lang === "ne" ? "तपाईंको यात्राका लागि उपयोगी लेखहरू" : "Guidance for your next chapter."
        }
        desc={
          lang === "ne"
            ? "नेपालमा विवाह दर्ताको तयारी, प्रक्रिया र कागजातबारे उपयोगी जानकारी।"
            : "Guidance and insights for your marriage registration journey."
        }
      />
      <div className="container-x py-16 md:py-24">
        {posts.length > 0 ? (
          <div className="mt-12 grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <BlogCard key={post.slug} a={post} headingLevel={2} />
            ))}
          </div>
        ) : (
          <div className="mt-12 border border-dashed p-10 text-center">
            <h2 className="text-3xl">
              {lang === "ne" ? "अहिले कुनै लेख उपलब्ध छैन" : "Articles will appear here."}
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
              {lang === "ne"
                ? "नयाँ लेखहरू प्रकाशित भएपछि यहाँ देखिनेछन्।"
                : "New articles will be published here as they become available."}
            </p>
          </div>
        )}
      </div>
    </>
  );
}
