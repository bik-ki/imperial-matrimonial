import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PortableText } from "@portabletext/react";
import { ArrowLeft } from "lucide-react";
import { BlogCard } from "@/components/site/Sections";
import { formatDate } from "@/lib/date";
import { getPublishedBlogPost } from "@/lib/sanity.server";

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => {
    const result = await getPublishedBlogPost({ data: params.slug });
    if (!result) throw notFound();
    return result;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.article.seoTitle || loaderData.article.title} — BiheInCourt` },
          {
            name: "description",
            content: loaderData.article.seoDescription || loaderData.article.excerpt,
          },
        ]
      : [{ title: "Article not found — BiheInCourt" }, { name: "robots", content: "noindex" }],
  }),
  component: ArticlePage,
});

function ArticlePage() {
  const { article, relatedPosts } = Route.useLoaderData();

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
          <p className="eyebrow mt-10">
            {article.tags[0] || "Legal resources"} · {formatDate(article.publishedAt)}
          </p>
          <h1 className="mt-5 text-5xl leading-tight md:text-7xl">{article.title}</h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">{article.excerpt}</p>
          <p className="mt-4 text-sm text-muted-foreground">By {article.author}</p>
        </div>
      </header>
      <div className="container-x grid max-w-5xl gap-12 py-12 md:py-16 lg:grid-cols-[minmax(0,2fr)_minmax(16rem,1fr)]">
        <div className="space-y-8">
          <img
            src={article.image}
            alt={article.imageAlt}
            className="aspect-[4/3] w-full object-cover grayscale"
          />
          <div className="space-y-6 leading-relaxed">
            <PortableText
              value={article.body}
              components={{
                block: {
                  normal: ({ children }) => <p className="text-muted-foreground">{children}</p>,
                  h2: ({ children }) => <h2 className="text-3xl">{children}</h2>,
                  h3: ({ children }) => <h3 className="text-2xl">{children}</h3>,
                  blockquote: ({ children }) => (
                    <blockquote className="border-l-2 border-gold pl-5 text-muted-foreground">
                      {children}
                    </blockquote>
                  ),
                },
                list: {
                  bullet: ({ children }) => (
                    <ul className="list-disc space-y-2 pl-6 text-muted-foreground">{children}</ul>
                  ),
                  number: ({ children }) => (
                    <ol className="list-decimal space-y-2 pl-6 text-muted-foreground">
                      {children}
                    </ol>
                  ),
                },
                marks: {
                  strong: ({ children }) => <strong className="font-semibold">{children}</strong>,
                  em: ({ children }) => <em>{children}</em>,
                },
              }}
            />
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
            More articles
          </h2>
          <ul className="mt-5 space-y-4">
            {relatedPosts.map((post) => (
              <li key={post.slug}>
                <Link
                  to="/blog/$slug"
                  params={{ slug: post.slug }}
                  className="text-sm leading-relaxed hover:underline"
                >
                  {post.title}
                </Link>
              </li>
            ))}
          </ul>
        </aside>
      </div>
    </article>
  );
}
