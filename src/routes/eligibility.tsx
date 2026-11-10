import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/Sections";
import { EligibilityChecker } from "@/components/site/EligibilityChecker";

export const Route = createFileRoute("/eligibility")({
  head: () => ({
    meta: [
      { title: "Nepal Court Marriage Eligibility Checker — BiheInCourt" },
      {
        name: "description",
        content:
          "Review basic court marriage eligibility criteria and prepare a separate document checklist.",
      },
      { property: "og:title", content: "Nepal Court Marriage Eligibility Checker" },
      {
        property: "og:description",
        content:
          "Check the basic eligibility criteria and see a preparation checklist. No identity documents are collected.",
      },
    ],
  }),
  component: EligibilityPage,
});

function EligibilityPage() {
  return (
    <>
      <PageHero
        eyebrow="Court marriage in Nepal"
        title="Check the basic eligibility requirements."
        desc="Answer a few questions about both applicants. Your answers are used only on this page and are not stored."
      />
      <main className="container-x max-w-5xl space-y-16 py-12 md:py-16">
        <EligibilityChecker />

        <section aria-labelledby="process-heading">
          <p className="eyebrow">The process</p>
          <h2 id="process-heading" className="mt-3 text-3xl md:text-4xl">
            What to expect at the District Court
          </h2>
          <ol className="mt-8 grid gap-4 md:grid-cols-2">
            {[
              "Submit the joint application and required documents to the District Court.",
              "The court verifies the documents, residency, and marital status.",
              "Both applicants and three witnesses appear physically and sign the deed of consent before the judge or authorized officer.",
              "The court issues the Court Marriage Certificate, typically within 1 to 7 days for local applicants.",
              "The certificate may be recorded at the local Ward Office to update civil registry records.",
            ].map((step, index) => (
              <li key={step} className="flex gap-4 border bg-card p-5">
                <span className="font-serif text-3xl text-muted-foreground" aria-hidden="true">
                  0{index + 1}
                </span>
                <p className="pt-1 text-sm leading-relaxed">{step}</p>
              </li>
            ))}
          </ol>
        </section>

        <section
          className="grid gap-4 border bg-secondary/50 p-6 sm:grid-cols-[1fr_auto] sm:items-center md:p-8"
          aria-labelledby="cost-heading"
        >
          <div>
            <p className="eyebrow">Court fee</p>
            <h2 id="cost-heading" className="mt-2 text-3xl">
              Official court fee: NRS 500
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Administrative, translation, notarization, or legal-assistance costs may be
              additional.
            </p>
          </div>
          <p className="font-serif text-4xl" aria-label="500 Nepalese rupees">
            NRS 500
          </p>
        </section>
      </main>
    </>
  );
}
