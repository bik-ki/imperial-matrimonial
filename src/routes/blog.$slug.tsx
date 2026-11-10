import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { PortableText } from "@portabletext/react";
import { ArrowLeft } from "lucide-react";
import { formatDate } from "@/lib/date";
import { articles } from "@/data/content";
import { getPublishedBlogPost, type BlogPost, type BlogPostSummary } from "@/lib/sanity.server";

export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => {
    const result = await getPublishedBlogPost({ data: params.slug });
    if (result) return result;

    const fallback = articles.find(
      (article) => article.slug === params.slug && !article.isPlaceholder,
    );
    if (!fallback) throw notFound();

    const body: BlogPost["body"] = fallback.content.flatMap((block, index) => {
      const heading = block.h
        ? [
            {
              _key: `${fallback.slug}-heading-${index}`,
              _type: "block" as const,
              style: "h2",
              children: [
                {
                  _key: `${fallback.slug}-heading-text-${index}`,
                  _type: "span" as const,
                  text: block.h,
                  marks: [],
                },
              ],
            },
          ]
        : [];
      return [
        ...heading,
        {
          _key: `${fallback.slug}-paragraph-${index}`,
          _type: "block" as const,
          children: [
            {
              _key: `${fallback.slug}-paragraph-text-${index}`,
              _type: "span" as const,
              text: block.p,
              marks: [],
            },
          ],
        },
      ];
    });
    const toSummary = (article: (typeof articles)[number]): BlogPostSummary => ({
      slug: article.slug,
      title: article.title,
      excerpt: article.excerpt,
      tags: [article.category],
      publishedAt: article.date,
      image: article.image,
      imageAlt: article.imageAlt,
    });
    const article: BlogPost = {
      ...toSummary(fallback),
      author: "BiheInCourt",
      body,
    };
    const relatedPosts = articles
      .filter((item) => item.slug !== fallback.slug && !item.isPlaceholder)
      .map(toSummary);

    return { article, relatedPosts };
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
      <header className="border-b bg-gradient-to-br from-rose-50 via-amber-50 to-sky-50">
        <div className="container-x grid max-w-7xl items-center gap-10 py-10 md:py-16 lg:grid-cols-[1.05fr_.95fr] lg:gap-16">
          <div>
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
            <h1 className="mt-5 text-5xl leading-[1.03] md:text-6xl">{article.title}</h1>
            <p className="mt-5 max-w-2xl text-lg leading-relaxed text-muted-foreground">
              {article.excerpt}
            </p>
            <p className="mt-5 text-sm text-muted-foreground">By {article.author}</p>
          </div>
          <img
            src={article.image}
            alt={article.imageAlt}
            fetchPriority="high"
            className="aspect-[4/3] w-full rounded-sm object-cover shadow-xl shadow-rose-900/10"
          />
        </div>
      </header>
      <div className="container-x grid max-w-5xl gap-12 py-12 md:py-16 lg:grid-cols-[minmax(0,2fr)_minmax(16rem,1fr)]">
        <div className="space-y-8">
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
