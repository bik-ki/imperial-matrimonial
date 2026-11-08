import { createFileRoute } from "@tanstack/react-router";
import { BlogCard, PageHero } from "@/components/site/Sections";
import { articles } from "@/data/content";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Blog — Imperial Matrimonial" },
      {
        name: "description",
        content:
          "Draft article previews from Imperial Matrimonial. All content requires verification before publication.",
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
      <section className="container-x py-16 md:py-24">
        <p className="border-l-2 border-gold bg-secondary/50 p-5 text-sm leading-relaxed text-muted-foreground">
          <strong className="text-foreground">Draft content — not for publication.</strong> No
          client-verified articles are available in the project. These existing draft entries and
          their metadata are placeholders; the copy, dates, and reading times must be verified and
          replaced or approved by the client before publication.
        </p>
        <div className="mt-12 grid gap-x-10 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <BlogCard key={article.slug} a={article} />
          ))}
        </div>
      </section>
    </>
  );
}
