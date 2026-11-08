import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Check, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { services } from "@/data/content";
import { useT } from "@/lib/i18n";
import { useConsultation } from "@/components/site/ConsultationDialog";
import { WhatsAppButton } from "@/components/site/WhatsAppButton";
import { ServiceCard } from "@/components/site/Sections";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => {
    const s = services.find((x) => x.slug === params.slug);
    if (!s) throw notFound();
    return { slug: s.slug, title: s.title.en, short: s.short.en };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title} — Imperial Matrimonial` },
          { name: "description", content: loaderData.short },
          { property: "og:title", content: loaderData.title },
          { property: "og:description", content: loaderData.short },
        ]
      : [{ title: "Service not found" }, { name: "robots", content: "noindex" }],
  }),
  component: ServicePage,
});

function ServicePage() {
  const { slug } = Route.useLoaderData();
  const s = services.find((x) => x.slug === slug)!;
  const { lang } = useT();
  const { open } = useConsultation();
  return (
    <>
      <section className="border-b">
        <div className="container-x py-16 md:py-24">
          <Link
            to="/services"
            className="inline-flex items-center gap-1 text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-3 w-3" /> All services
          </Link>
          <s.icon className="mt-10 h-8 w-8 text-gold" strokeWidth={1.3} />
          <h1 className="mt-6 max-w-3xl text-5xl md:text-7xl">{s.title[lang]}</h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">{s.short[lang]}</p>
        </div>
      </section>
      <p className="container-x border-l-2 border-gold bg-secondary/50 p-5 text-sm text-muted-foreground">
        Project draft: verify this service description and listed inclusions with the client before
        publication. Do not rely on these details as confirmed requirements, outcomes, timelines, or
        fees.
      </p>
      <div className="container-x grid gap-12 py-16 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-5 leading-relaxed">
          {s.body.map((p, i) => (
            <p key={i}>{p}</p>
          ))}
          {s.pendingDetails && (
            <p className="border-l-2 border-gold pl-4 text-sm text-muted-foreground">
              <strong className="text-foreground">Details to verify:</strong> {s.pendingDetails}
            </p>
          )}
          <p className="text-sm text-muted-foreground">
            Requirements vary by circumstance. Nothing on this page is a guarantee of outcome or
            timeline.
          </p>
        </div>
        <aside aria-labelledby="service-includes-heading" className="border bg-card p-8">
          <h2 id="service-includes-heading" className="eyebrow">
            What's included
          </h2>
          <ul className="mt-5 space-y-3">
            {s.includes.map((i) => (
              <li key={i} className="flex gap-3 text-sm">
                <Check className="h-4 w-4 shrink-0 text-gold" />
                {i}
              </li>
            ))}
          </ul>
          <div className="mt-8 flex flex-col gap-3">
            <Button size="lg" onClick={open}>
              Book a Consultation
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/contact">Contact us</Link>
            </Button>
            <WhatsAppButton
              variant="outline"
              size="lg"
              message={`Hello Imperial Matrimonial, I'd like to know more about ${s.title.en}.`}
            />
          </div>
        </aside>
      </div>
      <section className="border-t py-16">
        <div className="container-x">
          <h2 className="text-3xl">Other services</h2>
          <div className="mt-8 grid border-l border-t sm:grid-cols-2 lg:grid-cols-3">
            {services
              .filter((x) => x.slug !== slug)
              .slice(0, 3)
              .map((x) => (
                <ServiceCard key={x.slug} s={x} />
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
