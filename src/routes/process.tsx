import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { PageHero, ProcessTimeline } from "@/components/site/Sections";

export const Route = createFileRoute("/process")({
  head: () => ({
    meta: [
      { title: "Marriage Registration Assistance Process — Imperial Matrimonial" },
      {
        name: "description",
        content:
          "The four assistance stages described by Imperial Matrimonial, from initial consultation through court registration.",
      },
      { property: "og:title", content: "Your Journey to Legal Marriage" },
      {
        property: "og:description",
        content: "An overview of the practice's four marriage registration assistance stages.",
      },
    ],
  }),
  component: Process,
});

function Process() {
  return (
    <>
      <PageHero
        eyebrow="Court marriage process"
        title="Clear steps. Careful guidance."
        desc="An overview of the four assistance stages described by the practice. This is not a statement of the legal procedure; applicable steps depend on verified requirements and each couple's circumstances."
      />
      <p className="container-x border-l-2 border-gold bg-secondary/50 p-5 text-sm text-muted-foreground">
        Project draft: confirm these assistance stages and descriptions with the client before
        publication. They are not verified legal steps.
      </p>
      <ProcessTimeline />
      <section className="border-t py-20">
        <div className="container-x grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-3xl">
            <p className="eyebrow">Details to verify</p>
            <h2 className="mt-4 text-4xl">Confirm the specifics for your circumstances.</h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              Placeholder for client verification: the required document list, filing venue and
              procedure, attendance and residence requirements, expected timelines, and fees are not
              specified here. Confirm these details with the firm before relying on them.
            </p>
          </div>
          <Button asChild size="lg">
            <Link to="/contact">Contact us</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
