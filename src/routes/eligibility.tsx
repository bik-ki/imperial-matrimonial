import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/Sections";
import { EligibilityChecker } from "@/components/site/EligibilityChecker";

export const Route = createFileRoute("/eligibility")({
  head: () => ({
    meta: [
      { title: "Court Marriage Eligibility Checker — Imperial Matrimonial" },
      { name: "description", content: "Answer six questions for a preliminary, non-binding court marriage eligibility screening in Nepal." },
      { property: "og:title", content: "Check Your Court Marriage Eligibility" },
      { property: "og:description", content: "A free preliminary screening tool. No documents or ID numbers required." },
    ],
  }),
  component: () => (
    <>
      <PageHero eyebrow="Eligibility checker" title="A preliminary check, in six questions." desc="This tool gives an early indication only. It is not a legal determination — an advocate must review your documents and circumstances." />
      <section className="container-x max-w-4xl py-16"><EligibilityChecker /></section>
    </>
  ),
});
