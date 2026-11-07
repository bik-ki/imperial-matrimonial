import { createFileRoute } from "@tanstack/react-router";
import { PageHero, ProcessTimeline } from "@/components/site/Sections";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

export const Route = createFileRoute("/process")({
  head: () => ({
    meta: [
      { title: "Court Marriage Process in Nepal — Imperial Matrimonial" },
      { name: "description", content: "The four stages of court marriage registration: consultation, documents, verification and registration." },
      { property: "og:title", content: "Your Journey to Legal Marriage" },
      { property: "og:description", content: "How the court marriage process is generally structured in Nepal." },
    ],
  }),
  component: Process,
});

const faqs = [
  { q: "How long does the process take?", a: "Timelines depend on your circumstances, documents and the applicable procedure. We'll give you a realistic view after reviewing your situation — we do not guarantee timelines." },
  { q: "Do we both need to be present?", a: "Presence requirements depend on the stage and procedure. We'll explain what applies in your consultation." },
  { q: "What if one of us lives abroad?", a: "Additional steps may apply. Our team can explain the options during a consultation." },
  { q: "Is my information kept confidential?", a: "Yes. Information is used only to assist with your matter." },
];

function Process() {
  return (
    <>
      <PageHero eyebrow="Court marriage process" title="Clear steps. Careful guidance." desc="An overview of how we typically assist couples. Actual requirements depend on individual circumstances and applicable law." />
      <ProcessTimeline />
      <section className="border-t py-20">
        <div className="container-x max-w-3xl">
          <h2 className="text-4xl">Frequently asked</h2>
          <Accordion type="single" collapsible className="mt-8">
            {faqs.map((f) => (
              <AccordionItem key={f.q} value={f.q}>
                <AccordionTrigger className="text-left text-base">{f.q}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{f.a}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>
    </>
  );
}
