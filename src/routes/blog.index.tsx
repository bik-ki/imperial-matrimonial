import { createFileRoute } from "@tanstack/react-router";
import { BlogCard, PageHero } from "@/components/site/Sections";
import { articles } from "@/data/content";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Blog — BiheInCourt" },
      {
        name: "description",
        content:
          "Draft article previews from BiheInCourt. All content requires verification before publication.",
      },
    ],
  }),
  component: BlogIndexPage,
});

function BlogIndexPage() {
  return (
    <>
      <PageHero
        eyebrow="Legal resources"
        title="Articles for your journey."
        desc="Browse the current article drafts from the project."
      />
      <div className="container-x py-16 md:py-24">
        <p className="border-l-2 border-gold bg-secondary/50 p-5 text-sm leading-relaxed text-muted-foreground">
          <strong className="text-foreground">Draft content — not for publication.</strong> No
          client-verified articles are available in the project. These existing draft entries and
          their metadata are placeholders; the copy, dates, and reading times must be verified and
          replaced or approved by the client before publication.
        </p>
        {articles.length > 0 ? (
          <div className="mt-12 grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => (
              <BlogCard key={article.slug} a={article} headingLevel={2} />
            ))}
          </div>
        ) : (
          <div className="mt-12 border border-dashed p-10 text-center">
            <h2 className="text-3xl">Articles will appear here.</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
              [Client to provide verified article content before publication.]
            </p>
          </div>
        )}
      </div>
    </>
  );
}
