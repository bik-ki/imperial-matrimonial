import { createFileRoute } from "@tanstack/react-router";
import { PageHero, ServicesGrid } from "@/components/site/Sections";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Services — Court Marriage & Documentation | Imperial Matrimonial" },
      { name: "description", content: "Court marriage registration, documentation, foreign national marriage and single status certificate assistance in Nepal." },
      { property: "og:title", content: "Practice Areas — Imperial Matrimonial" },
      { property: "og:description", content: "Legal assistance focused on marriage registration in Nepal." },
    ],
  }),
  component: () => (
    <>
      <PageHero eyebrow="Services" title="Focused practice areas." desc="Every service is centred on one goal: a properly registered marriage." />
      <ServicesGrid />
    </>
  ),
});
