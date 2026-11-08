import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { BlogCard, formatDate } from "@/components/site/Sections";
import { articles } from "@/data/content";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const article = articles.find((item) => item.slug === params.slug);
    if (!article) throw notFound();
    return article;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title} — Imperial Matrimonial` },
          { name: "description", content: loaderData.excerpt },
          { property: "og:title", content: loaderData.title },
          { property: "og:description", content: loaderData.excerpt },
        ]
      : [{ title: "Article not found" }, { name: "robots", content: "noindex" }],
  }),
  component: BlogArticle,
});

function BlogArticle() {
  const article = Route.useLoaderData();
  const related = articles.filter((item) => item.slug !== article.slug).slice(0, 3);
  return (
    <>
      <article>
        <section className="border-b">
          <div className="container-x py-16 md:py-24">
            <Link to="/blog" className="inline-flex items-center gap-1 text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground"><ArrowLeft className="h-3 w-3" /> All articles</Link>
            <div className="mt-10 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
              <span className="font-semibold uppercase tracking-widest text-foreground">{article.category}</span>
              <span aria-hidden="true">·</span>
              <time dateTime={article.date}>{formatDate(article.date)}</time>
              <span aria-hidden="true">·</span>
              <span>{article.readTime} read</span>
            </div>
            <h1 className="mt-6 max-w-4xl text-5xl md:text-7xl">{article.title}</h1>
            <p className="mt-5 max-w-2xl text-lg text-muted-foreground">{article.excerpt}</p>
          </div>
        </section>
        <section className="container-x grid gap-12 py-16 lg:grid-cols-[minmax(0,1.4fr)_minmax(16rem,0.6fr)]">
          <div>
            <img src={article.image} alt="" className="aspect-[4/3] w-full object-cover grayscale" />
            <div className="mt-10 space-y-8 leading-relaxed">
              {article.content.map((block, index) => (
                <section key={`${article.slug}-${index}`}>
                  {block.h && <h2 className="text-3xl">{block.h}</h2>}
                  <p className={block.h ? "mt-3" : "text-sm text-muted-foreground"}>{block.p}</p>
                </section>
              ))}
            </div>
          </div>
          <aside className="h-fit border bg-secondary/50 p-7">
            <p className="eyebrow text-gold">Client review required</p>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">[Client to verify this article's legal content, date, and publication status before publishing.]</p>
          </aside>
        </section>
      </article>
      {related.length > 0 && (
        <section className="border-t py-16">
          <div className="container-x">
            <h2 className="text-3xl">More articles</h2>
            <div className="mt-8 grid gap-10 sm:grid-cols-2 lg:grid-cols-3">
              {related.map((item) => <BlogCard key={item.slug} a={item} />)}
            </div>
          </div>
        </section>
      )}
    </>
  );
}