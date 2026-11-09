import { createFileRoute, Link } from "@tanstack/react-router";
import {
  getHomePageContent,
  getPublishedBlogPosts,
  getPublishedServices,
  getSiteSettings,
} from "@/lib/sanity.server";
import { Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import { site } from "@/config/site";
import { useT } from "@/lib/i18n";
import { images } from "@/data/content";
import { useConsultation } from "@/components/site/ConsultationDialog";
import { WhatsAppButton } from "@/components/site/WhatsAppButton";
import { EligibilityChecker } from "@/components/site/EligibilityChecker";
import {
  ProcessTimeline,
  ServicesGrid,
  InstagramSection,
  BlogPreview,
  SectionHead,
} from "@/components/site/Sections";

export const Route = createFileRoute("/")({
  loader: async () => {
    const [posts, services, homePage, siteSettings] = await Promise.all([
      getPublishedBlogPosts({ data: 3 }),
      getPublishedServices(),
      getHomePageContent(),
      getSiteSettings(),
    ]);

    return { posts, services, homePage, siteSettings };
  },
  head: () => ({
    meta: [
      { title: "BiheInCourt — Court Marriage Registration in Nepal" },
      {
        name: "description",
        content:
          "Professional, confidential court marriage assistance in Kathmandu. Check your eligibility and book a consultation.",
      },
      { property: "og:title", content: "BiheInCourt — Your Marriage. Made Official." },
      {
        property: "og:description",
        content:
          "Professional court marriage assistance in Nepal by BiheInCourt, Advocates & Legal Associates.",
      },
    ],
  }),
  component: Home,
});

const stats = [
  { k: "stats.years" },
  { k: "stats.couples" },
  { k: "stats.services" },
  { k: "stats.conf" },
] as const;

function Home() {
  const { posts: recentPosts, services, homePage, siteSettings } = Route.useLoaderData();
  const { lang, t } = useT();
  const { open } = useConsultation();
  const hero = homePage?.hero;
  const statistics = homePage?.statistics?.length
    ? homePage.statistics
    : stats.map((stat) => ({ value: "[Verify before publication]", label: t(stat.k) }));
  const about = homePage?.about;
  const instagramUrl = siteSettings?.socialLinks?.find(
    (link) => link.platform === "instagram",
  )?.url;
  const reviewText =
    lang === "ne"
      ? "अनुवाद समीक्षा आवश्यक — स्वीकृत नेपाली पाठ पक्का हुन बाँकी छ।"
      : "Project placeholders — replace these metrics only with client-verified figures and claims.";
  const aboutTitle =
    lang === "ne"
      ? "अनुवाद समीक्षा आवश्यक — विवाह सेवा, कानूनी सेवा होइन"
      : "A legal practice, not a wedding service.";
  const aboutDesc =
    lang === "ne"
      ? "अनुवाद समीक्षा आवश्यक — हामी विवाहको कानूनी पक्षमा ध्यान केन्द्रित गर्छौं — योग्यता, कागजात र दर्ता — गोपनीयता र सावधानी संग ह्यान्डल गरिन्छ।"
      : "We focus on the legal side of marriage — eligibility, documentation and registration — handled with discretion and care.";
  return (
    <>
      <section className="container-x grid items-center gap-12 py-14 md:py-20 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
        <div className="animate-fade-up">
          <div className="flex items-center gap-3">
            <span className="rule-gold" />
            <p className="eyebrow">{hero?.eyebrow || t("hero.eyebrow")}</p>
          </div>
          <h1 className="mt-8 text-6xl leading-[0.95] md:text-8xl">
            {hero?.titleLine1 || t("hero.title1")}
            <br />
            <em className="text-muted-foreground">{hero?.titleLine2 || t("hero.title2")}</em>
          </h1>
          <p className="mt-8 text-lg font-medium">{hero?.subtitle || t("hero.sub")}</p>
          <p className="mt-3 max-w-lg leading-relaxed text-muted-foreground">
            {hero?.description || t("hero.desc")}
          </p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button asChild size="lg">
              <Link to="/eligibility">{hero?.primaryCtaLabel || t("cta.check")}</Link>
            </Button>
            <Button variant="outline" size="lg" onClick={open}>
              {hero?.secondaryCtaLabel || t("cta.bookA")}
            </Button>
          </div>
          <WhatsAppButton variant="link" className="mt-4 px-0 text-muted-foreground" />
        </div>
        <div className="relative">
          <img
            src={hero?.image || images.hero}
            alt={hero?.imageAlt || "Couple walking through a Kathmandu courtyard"}
            width={1024}
            height={1280}
            className="aspect-[4/5] w-full object-cover"
          />
          <div className="absolute -bottom-6 left-6 flex items-center gap-3 border bg-card px-5 py-4 shadow-sm md:-left-8">
            <Scale className="h-5 w-5 text-gold" strokeWidth={1.4} />
            <div>
              <p className="text-sm font-semibold">{hero?.badgeTitle || t("hero.badge")}</p>
              <p className="text-xs text-muted-foreground">{site.location}</p>
            </div>
          </div>
        </div>
      </section>

      <div className="mt-10 border-y">
        {!homePage?.statistics?.length && (
          <p className="container-x pt-5 text-xs font-semibold uppercase tracking-widest text-muted-foreground">
            {reviewText}
          </p>
        )}
        <div className="container-x grid grid-cols-2 md:grid-cols-4">
          {statistics.map((stat, i) => (
            <div
              key={stat.label}
              className={`min-w-0 py-10 ${i % 2 ? "pl-6" : ""} ${
                i > 0 ? "md:border-l md:pl-8" : ""
              }`}
            >
              <p className="break-words font-serif text-xl uppercase sm:text-2xl">{stat.value}</p>
              <p className="mt-2 break-words text-xs uppercase tracking-[0.15em] text-muted-foreground">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>

      <ProcessTimeline content={homePage?.process} />

      <section className="bg-ink py-24 text-ink-foreground md:py-32">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <div className="flex items-center gap-3">
              <span className="rule-gold" />
              <p className="eyebrow text-ink-foreground/60">
                {homePage?.eligibility?.eyebrow || t("elig.eyebrow")}
              </p>
            </div>
            <h2 className="mt-5 text-4xl leading-tight md:text-6xl">
              {homePage?.eligibility?.title || t("elig.title")}
            </h2>
            <p className="mt-5 text-ink-foreground/60">
              {homePage?.eligibility?.description || t("elig.desc")}
            </p>
          </div>
          <div className="text-foreground">
            <EligibilityChecker />
          </div>
        </div>
      </section>

      <ServicesGrid services={services} content={homePage?.servicesSection} />

      <section className="py-24 md:py-32">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <img
            src={about?.image || images.office}
            alt={about?.imageAlt || "Law office desk with documents"}
            loading="lazy"
            width={1280}
            height={896}
            className="aspect-[4/3] w-full object-cover"
          />
          <div>
            <SectionHead
              eyebrow={
                about?.eyebrow || (lang === "ne" ? "अनुवाद समीक्षा आवश्यक" : "About the practice")
              }
              title={about?.title || aboutTitle}
              desc={about?.description || aboutDesc}
            />
            <Button asChild variant="outline" size="lg" className="mt-8">
              <Link to="/about">
                {about?.linkLabel || (lang === "ne" ? "हाम्रो बारेमा" : "About us")}
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <InstagramSection content={homePage?.instagram} {...(instagramUrl ? { instagramUrl } : {})} />
      <BlogPreview posts={recentPosts} content={homePage?.blogPreview} />
    </>
  );
}
