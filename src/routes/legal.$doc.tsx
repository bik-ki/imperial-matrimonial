import { createFileRoute, notFound } from "@tanstack/react-router";
import { PageHero } from "@/components/site/Sections";

const legalDocuments = {
  privacy: { title: "Privacy Policy", description: "[Client to provide approved Privacy Policy copy.]" },
  terms: { title: "Terms & Conditions", description: "[Client to provide approved Terms & Conditions copy.]" },
  disclaimer: { title: "Legal Disclaimer", description: "[Client to provide approved Legal Disclaimer copy.]" },
} as const;

export const Route = createFileRoute("/legal/$doc")({
  loader: ({ params }) => {
    const document = legalDocuments[params.doc as keyof typeof legalDocuments];
    if (!document) throw notFound();
    return document;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [{ title: `${loaderData.title} — Imperial Matrimonial` }]
      : [{ title: "Legal page not found" }, { name: "robots", content: "noindex" }],
  }),
  component: LegalDocument,
});

function LegalDocument() {
  const document = Route.useLoaderData();
  return (
    <>
      <PageHero eyebrow="Legal information" title={document.title} desc={document.description} />
      <section className="container-x py-20 md:py-24">
        <div className="max-w-3xl border-l-2 border-gold bg-secondary/50 p-8 md:p-10">
          <p className="eyebrow text-gold">Publication status</p>
          <h2 className="mt-4 text-3xl">Approved copy pending.</h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
            {document.description} This page is a frontend placeholder and does not state legal terms, privacy practices, or liability conditions.
          </p>
        </div>
      </section>
    </>
  );
}