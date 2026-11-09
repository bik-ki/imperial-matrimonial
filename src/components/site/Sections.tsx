import { Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  Instagram,
  MessageSquare,
  FileText,
  ShieldCheck,
  Landmark,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useT, type TKey } from "@/lib/i18n";
import { instagramPosts, featuredReel } from "@/data/content";
import { site } from "@/config/site";
import { useConsultation } from "./ConsultationDialog";
import { WhatsAppButton } from "./WhatsAppButton";
import type { BlogPostSummary } from "@/lib/sanity.server";
import type { SanityServiceSummary } from "@/lib/sanity.server";
import type { HomePageContent } from "@/lib/sanity.server";
import { getServiceIcon } from "@/lib/service-icons";

export function SectionHead({
  eyebrow,
  title,
  desc,
  center,
  level = 2,
}: {
  eyebrow: string;
  title: string;
  desc?: string | undefined;
  center?: boolean;
  level?: 1 | 2;
}) {
  const Heading = level === 1 ? "h1" : "h2";
  return (
    <div className={`max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      <div className={`flex items-center gap-3 ${center ? "justify-center" : ""}`}>
        <span className="rule-gold" />
        <p className="eyebrow">{eyebrow}</p>
      </div>
      <Heading className="mt-5 text-4xl leading-[1.05] md:text-6xl">{title}</Heading>
      {desc && <p className="mt-5 text-muted-foreground">{desc}</p>}
    </div>
  );
}

export function PageHero({
  eyebrow,
  title,
  desc,
}: {
  eyebrow: string;
  title: string;
  desc?: string;
}) {
  return (
    <header className="border-b">
      <div className="container-x animate-fade-up py-20 md:py-28">
        <SectionHead eyebrow={eyebrow} title={title} desc={desc} level={1} />
      </div>
    </header>
  );
}

const steps: { n: string; icon: typeof MessageSquare; t: TKey; d: TKey }[] = [
  { n: "01", icon: MessageSquare, t: "s1.t", d: "s1.d" },
  { n: "02", icon: FileText, t: "s2.t", d: "s2.d" },
  { n: "03", icon: ShieldCheck, t: "s3.t", d: "s3.d" },
  { n: "04", icon: Landmark, t: "s4.t", d: "s4.d" },
];

export function ProcessTimeline({ content }: { content?: HomePageContent["process"] }) {
  const { t } = useT();
  const { open } = useConsultation();
  const timelineSteps = content?.steps?.length
    ? content.steps.map((step, index) => ({
        n: String(index + 1).padStart(2, "0"),
        icon: steps[index % steps.length]!.icon,
        title: step.title,
        description: step.description,
      }))
    : steps.map((step) => ({
        n: step.n,
        icon: step.icon,
        title: t(step.t),
        description: t(step.d),
      }));
  return (
    <section className="py-24 md:py-32">
      <div className="container-x">
        <SectionHead
          eyebrow={content?.eyebrow || t("process.eyebrow")}
          title={content?.title || t("process.title")}
        />
        <ol className="relative mt-16 grid gap-0 md:grid-cols-4">
          <div
            className="absolute left-5 top-0 h-full w-px bg-border md:left-0 md:top-5 md:h-px md:w-full"
            aria-hidden
          />
          {timelineSteps.map((s, i) => (
            <li key={s.n} className="relative pb-12 pl-16 md:pb-0 md:pl-0 md:pr-8">
              <span className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center border bg-background md:relative">
                <s.icon className="h-4 w-4 text-gold" />
              </span>
              <p className="mt-0 font-serif text-5xl text-muted-foreground/40 md:mt-8">{s.n}</p>
              <h3 className="mt-2 text-2xl">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.description}</p>
              {i === 0 ? (
                <button
                  onClick={open}
                  className="mt-4 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-widest hover:text-gold"
                >
                  {t("cta.bookA")} <ArrowRight className="h-3 w-3" />
                </button>
              ) : null}
            </li>
          ))}
        </ol>
        <div className="mt-14 flex flex-col gap-6 border-t pt-8 md:flex-row md:items-center md:justify-between">
          <p className="max-w-xl text-sm text-muted-foreground">
            {content?.note || t("process.note")}
          </p>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to="/eligibility">{content?.primaryCtaLabel || t("cta.check")}</Link>
            </Button>
            <Button variant="outline" size="lg" onClick={open}>
              {content?.secondaryCtaLabel || t("cta.bookA")}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ServiceCard({ s }: { s: SanityServiceSummary }) {
  const { lang, t } = useT();
  const Icon = getServiceIcon(s.slug);
  return (
    <Link
      to="/services/$slug"
      params={{ slug: s.slug }}
      className="group relative flex flex-col border-b border-r bg-card p-8 transition-colors hover:bg-primary hover:text-primary-foreground md:p-10"
    >
      <Icon className="h-6 w-6 text-gold" strokeWidth={1.3} />
      <h3 className="mt-10 text-3xl">{lang === "ne" ? s.titleNe || s.title : s.title}</h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground group-hover:text-primary-foreground/70">
        {lang === "ne" ? s.summaryNe || s.summary : s.summary}
      </p>
      <span className="mt-8 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-widest">
        {t("cta.learn")}{" "}
        <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
    </Link>
  );
}

export function ServicesGrid({
  services,
  content,
}: {
  services: SanityServiceSummary[];
  content?: HomePageContent["servicesSection"];
}) {
  const { t } = useT();
  const { open } = useConsultation();
  return (
    <section className="bg-secondary/50 py-24 md:py-32">
      <div className="container-x">
        <SectionHead
          eyebrow={content?.eyebrow || t("services.eyebrow")}
          title={content?.title || t("services.title")}
        />
        <div className="mt-14 grid border-l border-t sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <ServiceCard key={s.slug} s={s} />
          ))}
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button size="lg" onClick={open}>
            {content?.consultationCtaLabel || t("cta.bookA")}
          </Button>
          <WhatsAppButton
            context="Services section"
            label={content?.whatsappCtaLabel || t("cta.whatsapp")}
            variant="outline"
            size="lg"
          />
        </div>
      </div>
    </section>
  );
}

export function BlogCard({ a, headingLevel = 3 }: { a: BlogPostSummary; headingLevel?: 2 | 3 }) {
  const Heading = headingLevel === 2 ? "h2" : "h3";
  return (
    <Link to="/blog/$slug" params={{ slug: a.slug }} className="group flex flex-col">
      <div className="aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={a.image}
          alt={a.imageAlt}
          loading="lazy"
          className="h-full w-full object-cover grayscale transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="mt-5 flex items-center gap-3 text-xs text-muted-foreground">
        <span className="font-semibold uppercase tracking-widest text-foreground">
          {a.tags[0] || "Legal resources"}
        </span>
      </div>
      <Heading className="mt-3 text-2xl leading-tight group-hover:underline group-hover:decoration-1 group-hover:underline-offset-4">
        {a.title}
      </Heading>
      <p className="mt-2 text-sm text-muted-foreground">{a.excerpt}</p>
      <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-widest">
        Read more <ArrowRight className="h-3 w-3" />
      </span>
    </Link>
  );
}

export function BlogPreview({
  posts,
  content,
}: {
  posts: BlogPostSummary[];
  content?: HomePageContent["blogPreview"];
}) {
  const { t } = useT();
  return (
    <section className="py-24 md:py-32">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHead
            eyebrow={content?.eyebrow || t("blog.eyebrow")}
            title={content?.title || t("blog.title")}
          />
          <Button asChild variant="outline" size="lg">
            <Link to="/blog">{content?.allArticlesLabel || "All articles"}</Link>
          </Button>
        </div>
        <div className="mt-14 grid gap-10 md:grid-cols-3">
          {posts.slice(0, 3).map((a) => (
            <BlogCard key={a.slug} a={a} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function InstagramCard({
  p,
}: {
  p: { id: string; image: string; imageAlt: string; caption: string };
}) {
  return (
    <div className="relative aspect-square overflow-hidden bg-muted">
      <img
        src={p.image}
        alt={p.imageAlt}
        loading="lazy"
        className="h-full w-full object-cover grayscale"
      />
      <div className="absolute inset-0 flex flex-col justify-between bg-ink/65 p-4 text-ink-foreground">
        <p className="text-[0.65rem] uppercase tracking-widest text-gold">Sample post preview</p>
        <p className="line-clamp-4 text-sm">{p.caption}</p>
      </div>
    </div>
  );
}

export function InstagramSection({
  content,
  instagramUrl,
}: {
  content?: HomePageContent["instagram"];
  instagramUrl?: string;
}) {
  const { t } = useT();
  const posts = content?.posts?.length
    ? content.posts.map((post, index) => ({
        id: String(index),
        image: post.image || instagramPosts[index % instagramPosts.length]!.image,
        imageAlt: post.imageAlt || "",
        caption: post.caption,
      }))
    : instagramPosts.map((post) => ({ ...post, id: String(post.id), imageAlt: "" }));
  const reelImage = content?.featuredReel?.image || featuredReel.image;
  const reelImageAlt = content?.featuredReel?.imageAlt || "";
  const reelCaption = content?.featuredReel?.caption || featuredReel.caption;
  const profileUrl = instagramUrl || site.social.instagram;
  const instagramVerified = instagramUrl
    ? /^https:\/\/[^/]+\/[^/?#]/.test(instagramUrl)
    : !site.instagramHandle.includes("[") && /^https:\/\/[^/]+\/[^/?#]/.test(site.social.instagram);
  return (
    <section className="border-t py-24 md:py-32">
      <div className="container-x grid gap-12 lg:grid-cols-[1fr_minmax(0,22rem)]">
        <div className="min-w-0">
          <SectionHead
            eyebrow={content?.eyebrow || t("ig.eyebrow")}
            title={content?.title || t("ig.title")}
          />
          <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-3">
            {posts.map((p) => (
              <InstagramCard key={p.id} p={p} />
            ))}
          </div>
          <div className="mt-8 flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-xs text-muted-foreground">
              {content?.note || "Sample posts shown for this prototype."}
            </p>
            {!instagramVerified ? (
              <p className="text-xs text-muted-foreground">
                Project placeholder: verify the Instagram profile URL and handle before publication.
              </p>
            ) : (
              <Button asChild variant="outline">
                <a href={profileUrl} target="_blank" rel="noopener noreferrer">
                <Instagram /> View Instagram profile
                </a>
              </Button>
            )}
          </div>
        </div>
        <div className="relative mx-auto block aspect-[9/16] w-full max-w-[22rem] overflow-hidden border bg-ink">
          <img
            src={reelImage}
            alt={reelImageAlt}
            loading="lazy"
            className="h-full w-full object-cover opacity-80 grayscale"
          />
          <div className="absolute inset-x-0 top-0 flex items-center gap-2 p-4 text-ink-foreground">
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-gold font-serif text-sm">
              IM
            </span>
            <span className="text-sm font-semibold">{site.instagramHandle}</span>
            <span className="ml-auto text-[0.6rem] uppercase tracking-widest text-gold">
              Project reel preview — not published
            </span>
          </div>
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink to-transparent p-5 pt-16 text-ink-foreground">
            <p className="font-serif text-2xl leading-tight">{reelCaption}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
