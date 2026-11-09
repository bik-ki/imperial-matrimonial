import { createFileRoute } from "@tanstack/react-router";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { PageHero } from "@/components/site/Sections";
import { getPublishedFaqs } from "@/lib/sanity.server";

export const Route = createFileRoute("/faq")({
  loader: () => getPublishedFaqs(),
  head: () => ({
    meta: [
      { title: "Frequently Asked Questions — BiheInCourt" },
      {
        name: "description",
        content: "Answers to common questions about court marriage registration in Nepal.",
      },
    ],
  }),
  component: FaqPage,
});

function FaqPage() {
  const faqs = Route.useLoaderData();
  const categories = [...new Set(faqs.map((faq) => faq.category))];

  return (
    <>
      <PageHero
        eyebrow="FAQs"
        title="Answers to your questions."
        desc="Find answers to common questions about marriage registration and related legal assistance."
      />
      <div className="container-x max-w-4xl py-16 md:py-24">
        {categories.length ? (
          <div className="space-y-12">
            {categories.map((category) => (
              <section key={category} aria-labelledby={`faq-${category}`}>
                <h2 id={`faq-${category}`} className="mb-5 text-3xl">
                  {category}
                </h2>
                <Accordion type="multiple" className="border-t">
                  {faqs
                    .filter((faq) => faq.category === category)
                    .map((faq) => (
                      <AccordionItem key={faq.id} value={faq.id}>
                        <AccordionTrigger className="py-5 text-base">
                          {faq.question}
                        </AccordionTrigger>
                        <AccordionContent className="pr-10 leading-relaxed text-muted-foreground">
                          {faq.answer}
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                </Accordion>
              </section>
            ))}
          </div>
        ) : (
          <div className="border border-dashed p-10 text-center">
            <h2 className="text-3xl">Answers will appear here.</h2>
            <p className="mx-auto mt-3 max-w-xl text-sm text-muted-foreground">
              Frequently asked questions will be added as verified answers are available.
            </p>
          </div>
        )}
      </div>
    </>
  );
}
