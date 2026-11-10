import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Check, ArrowLeft } from "lucide-react";
import { PortableText } from "@portabletext/react";
import { Button } from "@/components/ui/button";
import { getPublishedService } from "@/lib/sanity.server";
import { useT } from "@/lib/i18n";
import { useConsultation } from "@/components/site/ConsultationDialog";
import { WhatsAppButton } from "@/components/site/WhatsAppButton";
import { ServiceCard } from "@/components/site/Sections";
import { getServiceIcon } from "@/lib/service-icons";

export const Route = createFileRoute("/services/$slug")({
  loader: async ({ params }) => {
    const result = await getPublishedService({ data: params.slug });
    if (!result) throw notFound();
    return result;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          {
            title: `${loaderData.service.seoTitle || loaderData.service.title} — BiheInCourt`,
          },
          {
            name: "description",
            content: loaderData.service.seoDescription || loaderData.service.summary,
          },
          { property: "og:title", content: loaderData.service.title },
          { property: "og:description", content: loaderData.service.summary },
        ]
      : [{ title: "Service not found" }, { name: "robots", content: "noindex" }],
  }),
  component: ServicePage,
});

function ServicePage() {
  const { service: s, otherServices } = Route.useLoaderData();
  const { lang } = useT();
  const { open } = useConsultation();
  const Icon = getServiceIcon(s.slug);
  const title = lang === "ne" ? s.titleNe || s.title : s.title;
  const summary = lang === "ne" ? s.summaryNe || s.summary : s.summary;
  return (
    <>
      <section className="border-b">
        <div className="container-x py-16 md:py-24">
          <Link
            to="/services"
            className="inline-flex items-center gap-1 text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-3 w-3" />{" "}
            {lang === "ne" ? "अनुवाद समीक्षा आवश्यक" : "All services"}
          </Link>
          <Icon className="mt-10 h-8 w-8 text-gold" strokeWidth={1.3} />
          <h1 className="mt-6 max-w-3xl text-5xl md:text-7xl">{title}</h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">{summary}</p>
        </div>
      </section>
      <p className="container-x border-l-2 border-gold bg-secondary/50 p-5 text-sm text-muted-foreground">
        {lang === "ne"
          ? "अनुवाद समीक्षा आवश्यक — प्रकाशन अघि यो सेवा विवरण र समावेशीकरण ग्राहकले पुष्टि गर्नुहोस्। यी विवरणहरू प्रमाणित आवश्यकताहरू, परिणाम, समयसीमा वा शुल्क मान्नुहोस्।"
          : "Project draft: verify this service description and listed inclusions with the client before publication. Do not rely on these details as confirmed requirements, outcomes, timelines, or fees."}
      </p>
      <div className="container-x grid gap-12 py-16 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-5 leading-relaxed">
          <PortableText
            value={s.body}
            components={{
              block: {
                normal: ({ children }) => <p>{children}</p>,
                h2: ({ children }) => <h2 className="text-3xl">{children}</h2>,
                h3: ({ children }) => <h3 className="text-2xl">{children}</h3>,
                blockquote: ({ children }) => (
                  <blockquote className="border-l-2 border-gold pl-4 text-muted-foreground">
                    {children}
                  </blockquote>
                ),
              },
              list: {
                bullet: ({ children }) => <ul className="list-disc space-y-2 pl-6">{children}</ul>,
                number: ({ children }) => (
                  <ol className="list-decimal space-y-2 pl-6">{children}</ol>
                ),
              },
            }}
          />
          {s.pendingDetails && (
            <p className="border-l-2 border-gold pl-4 text-sm text-muted-foreground">
              <strong className="text-foreground">
                {lang === "ne" ? "अनुवाद समीक्षा आवश्यक" : "Details to verify:"}
              </strong>{" "}
              {s.pendingDetails}
            </p>
          )}
          <p className="text-sm text-muted-foreground">
            {lang === "ne"
              ? "अनुवाद समीक्षा आवश्यक — आवश्यकताहरू परिस्थिति अनुसार फरक पर्दछ। यस पृष्ठमा कुनै परिणाम वा समयसीमा ग्यारेन्टी छैन।"
              : "Requirements vary by circumstance. Nothing on this page is a guarantee of outcome or timeline."}
          </p>
        </div>
        <aside aria-labelledby="service-includes-heading" className="border bg-card p-8">
          <h2 id="service-includes-heading" className="eyebrow">
            {lang === "ne" ? "अनुवाद समीक्षा आवश्यक" : "What's included"}
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
              {lang === "ne" ? "अनुवाद समीक्षा आवश्यक" : "Book a Consultation"}
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/contact">{lang === "ne" ? "अनुवाद समीक्षा आवश्यक" : "Contact us"}</Link>
            </Button>
            <WhatsAppButton
              context={`Service: ${s.title}`}
              variant="outline"
              size="lg"
              message={`Hello BiheInCourt, I'd like to know more about ${s.title}.`}
            />
          </div>
        </aside>
      </div>
      <section className="border-y bg-secondary/50 py-14">
        <div className="container-x">
          <div className="max-w-3xl">
            <p className="eyebrow text-gold">
              {lang === "ne" ? "अनुवाद समीक्षा आवश्यक" : "Client review required"}
            </p>
            <h2 className="mt-4 text-3xl">
              {lang === "ne"
                ? "अनुवाद समीक्षा आवश्यक — प्रकाशन अघि विवरण जाँच गर्नुहोस्"
                : "Details to verify before publication."}
            </h2>
            <ul className="mt-6 grid gap-3 text-sm text-muted-foreground sm:grid-cols-2">
              <li>
                {lang === "ne"
                  ? "अनुवाद समीक्षा आवश्यक — सेवा आवश्यकताहरू"
                  : "[Verified service requirements needed]"}
              </li>
              <li>
                {lang === "ne" ? "अनुवाद समीक्षा आवश्यक — समयसीमा" : "[Verified timeline needed]"}
              </li>
              <li>
                {lang === "ne"
                  ? "अनुवाद समीक्षा आवश्यक — योग्यता नियम"
                  : "[Verified eligibility rules needed]"}
              </li>
              <li>
                {lang === "ne"
                  ? "अनुवाद समीक्षा आवश्यक — शुल्क जानकारी"
                  : "[Verified fee information needed]"}
              </li>
              <li className="sm:col-span-2">
                {lang === "ne"
                  ? "अनुवाद समीक्षा आवश्यक — कानूनी विवरण"
                  : "[Verified legal details needed]"}
              </li>
            </ul>
          </div>
        </div>
      </section>
      <section className="border-t py-16">
        <div className="container-x">
          <h2 className="text-3xl">{lang === "ne" ? "अनुवाद समीक्षा आवश्यक" : "Other services"}</h2>
          <div className="mt-8 grid border-l border-t sm:grid-cols-2 lg:grid-cols-3">
            {otherServices.map((x) => (
              <ServiceCard key={x.slug} s={x} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
