import { createFileRoute } from "@tanstack/react-router";
import { BlogCard, PageHero } from "@/components/site/Sections";
import { getPublishedBlogPosts } from "@/lib/sanity.server";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/blog/")({
  loader: () => getPublishedBlogPosts({ data: 100 }),
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
        eyebrow={lang === "ne" ? "अनुवाद समीक्षा आवश्यक" : "Legal resources"}
        title={
          lang === "ne"
            ? "अनुवाद समीक्षा आवश्यक — तपाईंको यात्राको लागि लेखहरू"
            : "Articles for your journey."
        }
        desc={
          lang === "ne"
            ? "अनुवाद समीक्षा आवश्यक — विवाह दर्ता यात्राका लागि मार्गदर्शन र जानकारी।"
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
              {lang === "ne"
                ? "अनुवाद समीक्षा आवश्यक — लेख यहाँ देखा पर्नेछ"
                : "Articles will appear here."}
            </h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
              {lang === "ne"
                ? "अनुवाद समीक्षा आवश्यक — नयाँ लेखहरू उपलब्ध भएपछि यहाँ प्रकाशित हुनेछन्।"
                : "New articles will be published here as they become available."}
            </p>
          </div>
        )}
      </div>
    </>
  );
}
