import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/Sections";
import { EligibilityChecker } from "@/components/site/EligibilityChecker";

export const Route = createFileRoute("/eligibility")({
  head: () => ({
    meta: [
      { title: "Court Marriage Eligibility Checker — Imperial Matrimonial" },
      {
        name: "description",
        content:
          "Answer six project-defined prompts for preliminary guidance. This tool does not determine legal eligibility.",
      },
      { property: "og:title", content: "Check Your Court Marriage Eligibility" },
      {
        property: "og:description",
        content:
          "A front-end-only preliminary guide. No personal information is requested or stored.",
      },
    ],
  }),
  component: () => (
    <>
      <PageHero
        eyebrow="Preliminary guidance"
        title="A preliminary review, in six questions."
        desc="Use these project-defined prompts to identify topics that may need follow-up. The result is not a legal determination or advice."
      />
      <section className="container-x max-w-4xl space-y-8 py-16">
        <aside className="border-l-2 border-gold bg-secondary/50 p-6 text-sm leading-relaxed text-muted-foreground">
          <h2 className="font-semibold text-foreground">Details to verify with the client</h2>
          <p className="mt-2">
            The precise legal criteria and their application have not been verified here. In
            particular, confirm the applicable marriageable-age rule, acceptable identification and
            supporting evidence, how previous marriages are treated, and any residence, procedure,
            or timing requirements with the firm before publication or reliance.
          </p>
          <p className="mt-3">
            This front-end-only tool does not request or store names, contact details, documents, or
            answers beyond the current page session.
          </p>
        </aside>
        <EligibilityChecker />
      </section>
    </>
  ),
});
