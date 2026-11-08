import { createFileRoute } from "@tanstack/react-router";
import { BlogCard, PageHero } from "@/components/site/Sections";
import { articles } from "@/data/content";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Legal Resources — Imperial Matrimonial" },
      { name: "description", content: "Existing legal resource previews from Imperial Matrimonial." },
      { property: "og:title", content: "Legal Resources — Imperial Matrimonial" },
      { property: "og:description", content: "Existing legal resource previews from Imperial Matrimonial." },
    ],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  return (
    <>
      <PageHero
        eyebrow="Legal resources"
        title="Knowledge before commitment."
        desc="Browse the article content currently available in the project. [Client to review all legal content before publication.]"
      />
      <section className="container-x py-20 md:py-24">
        {articles.length > 0 ? (
          <div className="grid gap-x-10 gap-y-16 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((article) => <BlogCard key={article.slug} a={article} />)}
          </div>
        ) : (
          <div className="border border-dashed p-10 text-center">
            <h2 className="text-3xl">Articles will appear here.</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">[Client to provide verified article content before publication.]</p>
          </div>
        )}
      </section>
    </>
  );
}