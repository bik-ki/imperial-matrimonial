import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { articles } from "@/data/content";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const article = articles.find((item) => item.slug === params.slug);
    if (!article) throw notFound();
    return { article };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.article.title} — Imperial Matrimonial` },
          { name: "description", content: loaderData.article.excerpt },
          { name: "robots", content: "noindex, nofollow" },
        ]
      : [
          { title: "Article not found — Imperial Matrimonial" },
          { name: "robots", content: "noindex" },
        ],
  }),
  component: ArticlePage,
});

function ArticlePage() {
  const { article } = Route.useLoaderData();

  return (
    <article>
      <header className="border-b">
        <div className="container-x max-w-4xl py-12 md:py-20">
          <Link
            to="/blog"
            className="inline-flex items-center gap-1 text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-3 w-3" />
            All articles
          </Link>
          <p className="eyebrow mt-10">{article.category} · Draft placeholder</p>
          <h1 className="mt-5 text-5xl leading-tight md:text-7xl">{article.title}</h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">{article.excerpt}</p>
        </div>
      </header>
      <div className="container-x grid max-w-5xl gap-12 py-12 md:py-16 lg:grid-cols-[minmax(0,2fr)_minmax(16rem,1fr)]">
        <div className="space-y-8">
          <img
            src={article.image}
            alt={article.imageAlt}
            className="aspect-[4/3] w-full object-cover grayscale"
          />
          <div className="border-l-2 border-gold bg-secondary/50 p-5 text-sm leading-relaxed text-muted-foreground">
            <strong className="text-foreground">Draft content — not for publication.</strong> This
            article and its metadata are placeholders, not client-verified legal guidance. Replace
            or approve all text and verify its details before publication.
          </div>
          <div className="space-y-6 leading-relaxed">
            {article.content.map((block, index) => (
              <div key={`${article.slug}-${index}`}>
                {block.h && <h2 className="mb-3 text-3xl">{block.h}</h2>}
                <p className="text-muted-foreground">{block.p}</p>
              </div>
            ))}
          </div>
          <Link
            to="/blog"
            className="inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-widest hover:text-gold"
          >
            <ArrowLeft className="h-3 w-3" />
            Back to all articles
          </Link>
        </div>
        <aside aria-labelledby="more-articles-heading" className="h-fit border bg-card p-6">
          <h2 id="more-articles-heading" className="eyebrow">
            More draft articles
          </h2>
          <ul className="mt-5 space-y-4">
            {articles
              .filter((item) => item.slug !== article.slug)
              .slice(0, 4)
              .map((item) => (
                <li key={item.slug}>
                  <Link
                    to="/blog/$slug"
                    params={{ slug: item.slug }}
                    className="text-sm leading-relaxed hover:underline"
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
          </ul>
        </aside>
      </div>
    </article>
  );
}
