import { createFileRoute } from "@tanstack/react-router";
import { PageHero, ServicesGrid } from "@/components/site/Sections";

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Services — Court Marriage & Documentation | Imperial Matrimonial" },
      {
        name: "description",
        content:
          "Court marriage registration, documentation, foreign national marriage and single status certificate assistance in Nepal.",
      },
      { property: "og:title", content: "Practice Areas — Imperial Matrimonial" },
      {
        property: "og:description",
        content: "Legal assistance focused on marriage registration in Nepal.",
      },
    ],
  }),
  component: () => (
    <>
      <PageHero
        eyebrow="Services"
        title="Focused practice areas."
        desc="Every service is centred on one goal: a properly registered marriage."
      />
      <p className="container-x border-l-2 border-gold bg-secondary/50 p-5 text-sm text-muted-foreground">
        Project draft: verify every service description, scope, and inclusion with the client before
        publication. No specific requirements, outcomes, timelines, or fees are confirmed here.
      </p>
      <ServicesGrid />
    </>
  ),
});
