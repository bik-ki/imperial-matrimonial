import { Link } from "@tanstack/react-router";
import {
  ArrowUpRight,
  Instagram,
  Play,
  MessageSquare,
  FileText,
  ShieldCheck,
  Landmark,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useT, type TKey } from "@/lib/i18n";
import {
  services,
  articles,
  instagramPosts,
  featuredReel,
  type Article,
  type Service,
} from "@/data/content";
import { site } from "@/config/site";
import { useConsultation } from "./ConsultationDialog";
import { WhatsAppButton } from "./WhatsAppButton";

export function SectionHead({
  eyebrow,
  title,
  desc,
  center,
}: {
  eyebrow: string;
  title: string;
  desc?: string | undefined;
  center?: boolean;
}) {
  return (
    <div className={`max-w-2xl ${center ? "mx-auto text-center" : ""}`}>
      <div className={`flex items-center gap-3 ${center ? "justify-center" : ""}`}>
        <span className="rule-gold" />
        <p className="eyebrow">{eyebrow}</p>
      </div>
      <h2 className="mt-5 text-4xl leading-[1.05] md:text-6xl">{title}</h2>
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
    <section className="border-b">
      <div className="container-x animate-fade-up py-20 md:py-28">
        <SectionHead eyebrow={eyebrow} title={title} desc={desc} />
      </div>
    </section>
  );
}

const steps: { n: string; icon: typeof MessageSquare; t: TKey; d: TKey }[] = [
  { n: "01", icon: MessageSquare, t: "s1.t", d: "s1.d" },
  { n: "02", icon: FileText, t: "s2.t", d: "s2.d" },
  { n: "03", icon: ShieldCheck, t: "s3.t", d: "s3.d" },
  { n: "04", icon: Landmark, t: "s4.t", d: "s4.d" },
];

export function ProcessTimeline() {
  const { t } = useT();
  const { open } = useConsultation();
  return (
    <section className="py-24 md:py-32">
      <div className="container-x">
        <SectionHead eyebrow={t("process.eyebrow")} title={t("process.title")} />
        <ol className="relative mt-16 grid gap-0 md:grid-cols-4">
          <div
            className="absolute left-5 top-0 h-full w-px bg-border md:left-0 md:top-5 md:h-px md:w-full"
            aria-hidden
          />
          {steps.map((s, i) => (
            <li key={s.n} className="relative pb-12 pl-16 md:pb-0 md:pl-0 md:pr-8">
              <span className="absolute left-0 top-0 flex h-10 w-10 items-center justify-center border bg-background md:relative">
                <s.icon className="h-4 w-4 text-gold" />
              </span>
              <p className="mt-0 font-serif text-5xl text-muted-foreground/40 md:mt-8">{s.n}</p>
              <h3 className="mt-2 text-2xl">{t(s.t)}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t(s.d)}</p>
              {i === 0 ? (
                <button
                  onClick={open}
                  className="mt-4 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-widest hover:text-gold"
                >
                  {t("cta.bookA")} <ArrowRight className="h-3 w-3" />
                </button>
              ) : (
                <Link
                  to="/process"
                  className="mt-4 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-widest hover:text-gold"
                >
                  {t("cta.learn")} <ArrowRight className="h-3 w-3" />
                </Link>
              )}
            </li>
          ))}
        </ol>
        <div className="mt-14 flex flex-col gap-6 border-t pt-8 md:flex-row md:items-center md:justify-between">
          <p className="max-w-xl text-sm text-muted-foreground">{t("process.note")}</p>
          <div className="flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to="/eligibility">{t("cta.check")}</Link>
            </Button>
            <Button variant="outline" size="lg" onClick={open}>
              {t("cta.bookA")}
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}

export function ServiceCard({ s }: { s: Service }) {
  const { lang, t } = useT();
  return (
    <Link
      to="/services/$slug"
      params={{ slug: s.slug }}
      className="group relative flex flex-col border-b border-r bg-card p-8 transition-colors hover:bg-primary hover:text-primary-foreground md:p-10"
    >
      <s.icon className="h-6 w-6 text-gold" strokeWidth={1.3} />
      <h3 className="mt-10 text-3xl">{s.title[lang]}</h3>
      <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground group-hover:text-primary-foreground/70">
        {s.short[lang]}
      </p>
      <span className="mt-8 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-widest">
        {t("cta.learn")}{" "}
        <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
      </span>
    </Link>
  );
}

export function ServicesGrid() {
  const { t } = useT();
  const { open } = useConsultation();
  return (
    <section className="bg-secondary/50 py-24 md:py-32">
      <div className="container-x">
        <SectionHead eyebrow={t("services.eyebrow")} title={t("services.title")} />
        <div className="mt-14 grid border-l border-t sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <ServiceCard key={s.slug} s={s} />
          ))}
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <Button size="lg" onClick={open}>
            {t("cta.bookA")}
          </Button>
          <WhatsAppButton variant="outline" size="lg" />
        </div>
      </div>
    </section>
  );
}

export function formatDate(d: string) {
  return new Date(d).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export function BlogCard({ a }: { a: Article }) {
  return (
    <Link to="/blog/$slug" params={{ slug: a.slug }} className="group flex flex-col">
      <div className="aspect-[4/3] overflow-hidden bg-muted">
        <img
          src={a.image}
          alt=""
          loading="lazy"
          className="h-full w-full object-cover grayscale transition-transform duration-700 group-hover:scale-105"
        />
      </div>
      <div className="mt-5 flex items-center gap-3 text-xs text-muted-foreground">
        <span className="font-semibold uppercase tracking-widest text-foreground">
          {a.category}
        </span>
        {a.isPlaceholder && (
          <>
            <span>·</span>
            <span className="uppercase tracking-widest">Draft placeholder</span>
          </>
        )}
      </div>
      <h3 className="mt-3 text-2xl leading-tight group-hover:underline group-hover:decoration-1 group-hover:underline-offset-4">
        {a.title}
      </h3>
      <p className="mt-2 text-sm text-muted-foreground">{a.excerpt}</p>
      <span className="mt-4 inline-flex items-center gap-1 text-xs font-semibold uppercase tracking-widest">
        Read more <ArrowRight className="h-3 w-3" />
      </span>
    </Link>
  );
}

export function BlogPreview() {
  const { t } = useT();
  return (
    <section className="py-24 md:py-32">
      <div className="container-x">
        <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
          <SectionHead eyebrow={t("blog.eyebrow")} title={t("blog.title")} />
          <Button asChild variant="outline" size="lg">
            <Link to="/blog">All articles</Link>
          </Button>
        </div>
        <div className="mt-14 grid gap-10 md:grid-cols-3">
          {articles.slice(0, 3).map((a) => (
            <BlogCard key={a.slug} a={a} />
          ))}
        </div>
      </div>
    </section>
  );
}

export function InstagramCard({ p }: { p: (typeof instagramPosts)[number] }) {
  return (
    <a
      href={p.url}
      target="_blank"
      rel="noopener noreferrer"
      className="group relative block aspect-square overflow-hidden bg-muted"
    >
      <img
        src={p.image}
        alt=""
        loading="lazy"
        className="h-full w-full object-cover grayscale transition-transform duration-700 group-hover:scale-105"
      />
      <div className="absolute inset-0 flex flex-col justify-between bg-ink/0 p-4 text-ink-foreground transition-colors group-hover:bg-ink/75">
        <Instagram className="h-4 w-4 self-end" />
        <div className="opacity-0 transition-opacity group-hover:opacity-100">
          <p className="line-clamp-3 text-sm">{p.caption}</p>
          <p className="mt-2 text-[0.65rem] uppercase tracking-widest text-gold">
            View on Instagram
          </p>
        </div>
      </div>
    </a>
  );
}

export function InstagramSection() {
  const { t } = useT();
  return (
    <section className="border-t py-24 md:py-32">
      <div className="container-x grid gap-12 lg:grid-cols-[1fr_minmax(0,22rem)]">
        <div>
          <SectionHead eyebrow={t("ig.eyebrow")} title={t("ig.title")} />
          <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-3">
            {instagramPosts.map((p) => (
              <InstagramCard key={p.id} p={p} />
            ))}
          </div>
          <div className="mt-8 flex items-center justify-between gap-4">
            <p className="text-xs text-muted-foreground">Sample posts shown for this prototype.</p>
            <Button asChild variant="outline">
              <a href={site.social.instagram} target="_blank" rel="noopener noreferrer">
                <Instagram /> Follow {site.instagramHandle}
              </a>
            </Button>
          </div>
        </div>
        <a
          href={featuredReel.url}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative mx-auto block aspect-[9/16] w-full max-w-[22rem] overflow-hidden border bg-ink"
        >
          <img
            src={featuredReel.image}
            alt=""
            loading="lazy"
            className="h-full w-full object-cover opacity-80 grayscale"
          />
          <div className="absolute inset-x-0 top-0 flex items-center gap-2 p-4 text-ink-foreground">
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-gold font-serif text-sm">
              IM
            </span>
            <span className="text-sm font-semibold">{site.instagramHandle}</span>
            <span className="ml-auto text-[0.6rem] uppercase tracking-widest text-gold">Reel</span>
          </div>
          <span className="absolute left-1/2 top-1/2 flex h-16 w-16 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-ink-foreground/60 bg-ink/30 text-ink-foreground backdrop-blur transition-transform group-hover:scale-110">
            <Play className="ml-1 h-6 w-6" fill="currentColor" />
          </span>
          <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-ink to-transparent p-5 pt-16 text-ink-foreground">
            <p className="font-serif text-2xl leading-tight">{featuredReel.caption}</p>
            <span className="mt-4 inline-flex items-center gap-1 text-xs uppercase tracking-widest text-gold">
              View Reel <ArrowUpRight className="h-3 w-3" />
            </span>
          </div>
        </a>
      </div>
    </section>
  );
}
