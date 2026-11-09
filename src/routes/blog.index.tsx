import { createFileRoute } from "@tanstack/react-router";
import { BlogCard, PageHero } from "@/components/site/Sections";
import { getPublishedBlogPosts } from "@/lib/sanity.server";

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

  return (
    <>
      <PageHero
        eyebrow="Legal resources"
        title="Articles for your journey."
        desc="Guidance and insights for your marriage registration journey."
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
            <h2 className="text-3xl">Articles will appear here.</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
              New articles will be published here as they become available.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
