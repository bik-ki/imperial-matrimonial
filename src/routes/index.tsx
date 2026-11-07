import { createFileRoute, Link } from "@tanstack/react-router";
import { Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useT } from "@/lib/i18n";
import { images } from "@/data/content";
import { useConsultation } from "@/components/site/ConsultationDialog";
import { WhatsAppButton } from "@/components/site/WhatsAppButton";
import { EligibilityChecker } from "@/components/site/EligibilityChecker";
import { ProcessTimeline, ServicesGrid, InstagramSection, BlogPreview, SectionHead } from "@/components/site/Sections";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Imperial Matrimonial — Court Marriage Registration in Nepal" },
      { name: "description", content: "Professional, confidential court marriage assistance in Kathmandu. Check your eligibility and book a consultation." },
      { property: "og:title", content: "Imperial Matrimonial — Your Marriage. Made Official." },
      { property: "og:description", content: "Professional court marriage assistance in Nepal by Imperial Matrimonial, Advocates & Legal Associates." },
    ],
  }),
  component: Home,
});

// Editable placeholder values — replace with verified figures.
const stats = [
  { v: "[XX]+", k: "stats.years" },
  { v: "[XXX]+", k: "stats.couples" },
  { v: "6", k: "stats.services" },
  { v: "100%", k: "stats.conf" },
] as const;

function Home() {
  const { t } = useT();
  const { open } = useConsultation();
  return (
    <>
      <section className="container-x grid items-center gap-12 py-14 md:py-20 lg:grid-cols-[1.1fr_1fr] lg:gap-20">
        <div className="animate-fade-up">
          <div className="flex items-center gap-3"><span className="rule-gold" /><p className="eyebrow">{t("hero.eyebrow")}</p></div>
          <h1 className="mt-8 text-6xl leading-[0.95] md:text-8xl">
            {t("hero.title1")}<br /><em className="text-muted-foreground">{t("hero.title2")}</em>
          </h1>
          <p className="mt-8 text-lg font-medium">{t("hero.sub")}</p>
          <p className="mt-3 max-w-lg leading-relaxed text-muted-foreground">{t("hero.desc")}</p>
          <div className="mt-10 flex flex-wrap gap-3">
            <Button asChild size="lg"><Link to="/eligibility">{t("cta.check")}</Link></Button>
            <Button variant="outline" size="lg" onClick={open}>{t("cta.bookA")}</Button>
          </div>
          <WhatsAppButton context="Hero" variant="link" className="mt-4 px-0 text-muted-foreground" />
        </div>
        <div className="relative">
          <img src={images.hero} alt="Couple walking through a Kathmandu courtyard" width={1024} height={1280} className="aspect-[4/5] w-full object-cover" />
          <div className="absolute -bottom-6 left-6 flex items-center gap-3 border bg-card px-5 py-4 shadow-sm md:-left-8">
            <Scale className="h-5 w-5 text-gold" strokeWidth={1.4} />
            <div>
              <p className="text-sm font-semibold">{t("hero.badge")}</p>
              <p className="text-xs text-muted-foreground">Kathmandu, Nepal</p>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-10 border-y">
        <div className="container-x grid grid-cols-2 md:grid-cols-4">
          {stats.map((s, i) => (
            <div key={s.k} className={`py-10 ${i % 2 ? "pl-6" : ""} ${i > 0 ? "md:border-l md:pl-8" : ""}`}>
              <p className="font-serif text-5xl">{s.v}</p>
              <p className="mt-2 text-xs uppercase tracking-[0.15em] text-muted-foreground">{t(s.k)}</p>
            </div>
          ))}
        </div>
      </section>

      <ProcessTimeline />

      <section className="bg-ink py-24 text-ink-foreground md:py-32">
        <div className="container-x grid gap-12 lg:grid-cols-[1fr_1.4fr]">
          <div>
            <div className="flex items-center gap-3"><span className="rule-gold" /><p className="eyebrow text-ink-foreground/60">{t("elig.eyebrow")}</p></div>
            <h2 className="mt-5 text-4xl leading-tight md:text-6xl">{t("elig.title")}</h2>
            <p className="mt-5 text-ink-foreground/60">{t("elig.desc")}</p>
          </div>
          <div className="text-foreground"><EligibilityChecker /></div>
        </div>
      </section>

      <ServicesGrid />

      <section className="py-24 md:py-32">
        <div className="container-x grid items-center gap-12 lg:grid-cols-2">
          <img src={images.office} alt="Law office desk with documents" loading="lazy" width={1280} height={896} className="aspect-[4/3] w-full object-cover" />
          <div>
            <SectionHead eyebrow="About the practice" title="A legal practice, not a wedding service." desc="We focus on the legal side of marriage — eligibility, documentation and registration — handled with discretion and care." />
            <Button asChild variant="outline" size="lg" className="mt-8"><Link to="/about">About us</Link></Button>
          </div>
        </div>
      </section>

      <InstagramSection />
      <BlogPreview />
    </>
  );
}
