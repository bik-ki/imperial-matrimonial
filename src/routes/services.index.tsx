import { createFileRoute } from "@tanstack/react-router";
import { PageHero, ServicesGrid } from "@/components/site/Sections";
import { getPublishedServices } from "@/lib/sanity.server";

export const Route = createFileRoute("/services/")({
  loader: () => getPublishedServices(),
  head: () => ({
    meta: [
      { title: "Services — Court Marriage & Documentation | BiheInCourt" },
      {
        name: "description",
        content:
          "Court marriage registration, documentation, foreign national marriage and single status certificate assistance in Nepal.",
      },
      { property: "og:title", content: "Practice Areas — BiheInCourt" },
      {
        property: "og:description",
        content: "Legal assistance focused on marriage registration in Nepal.",
      },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  const services = Route.useLoaderData();
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Focused practice areas."
        desc="Explore the service areas currently described in the project content. Each card links to its detail page."
      />
      <p className="container-x border-l-2 border-gold bg-secondary/50 p-5 text-sm text-muted-foreground">
        Project draft: verify every service description, scope, and inclusion with the client before
        publication. No specific requirements, outcomes, timelines, or fees are confirmed here.
      </p>
      <section
        aria-labelledby="district-coverage-heading"
        className="container-x grid gap-3 border-b py-10 sm:grid-cols-[minmax(12rem,0.6fr)_1fr] sm:items-center"
      >
        <h2 id="district-coverage-heading" className="text-2xl">
          District court coverage
        </h2>
        <p className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
          Legal services are provided through district courts in all 77 districts. BiheInCourt
          engages an advocate in each district court.
        </p>
      </section>
      <ServicesGrid services={services} />
    </>
  );
}
