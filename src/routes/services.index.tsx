import { createFileRoute } from "@tanstack/react-router";
import { PageHero, ServicesGrid } from "@/components/site/Sections";
import { getPublishedServices } from "@/lib/sanity.server";
import { useT } from "@/lib/i18n";

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
  const { lang } = useT();
  return (
    <>
      <PageHero
        eyebrow={lang === "ne" ? "अनुवाद समीक्षा आवश्यक" : "Services"}
        title={
          lang === "ne"
            ? "अनुवाद समीक्षा आवश्यक — केन्द्रित सेवा क्षेत्र"
            : "Focused practice areas."
        }
        desc={
          lang === "ne"
            ? "अनुवाद समीक्षा आवश्यक — परियोजना सामग्रीमा वर्णित सेवा क्षेत्रहरू हेर्नुहोस्। प्रत्येक कार्डले विस्तृत पृष्ठमा लिङ्क गर्दछ।"
            : "Explore the service areas currently described in the project content. Each card links to its detail page."
        }
      />
      <p className="container-x border-l-2 border-gold bg-secondary/50 p-5 text-sm text-muted-foreground">
        {lang === "ne"
          ? "अनुवाद समीक्षा आवश्यक — प्रत्येक सेवा विवरण, दायरा र समावेशीकरणलाई प्रकाशन अघि ग्राहकले पुष्टि गर्नुपर्छ। यहाँ कुनै विशिष्ट आवश्यकता, परिणाम, समयसीमा वा शुल्क प्रमाणित छैन।"
          : "Project draft: verify every service description, scope, and inclusion with the client before publication. No specific requirements, outcomes, timelines, or fees are confirmed here."}
      </p>
      <section
        aria-labelledby="district-coverage-heading"
        className="container-x grid gap-3 border-b py-10 sm:grid-cols-[minmax(12rem,0.6fr)_1fr] sm:items-center"
      >
        <h2 id="district-coverage-heading" className="text-2xl">
          {lang === "ne" ? "ग्राहक पुष्टि आवश्यक" : "District court coverage (client review)"}
        </h2>
        <div className="max-w-3xl text-sm leading-relaxed text-muted-foreground">
          {lang === "en" ? (
            <>
              <p>
                Legal services are provided through district courts in all 77 districts. BiheInCourt
                engages an advocate in each district court.
              </p>
              <p className="mt-2 text-xs">
                Client confirmation required before publication. This statement is not a guarantee
                of availability, outcome, or response time.
              </p>
            </>
          ) : (
            <p lang="ne">
              ग्राहकको पुष्टि आवश्यक। ७७ जिल्लासम्बन्धी दाबीको नेपाली अनुवाद प्रकाशनअघि ग्राहक र
              नेपाली भाषा समीक्षकबाट मानवीय समीक्षा हुनुपर्छ। उपलब्धता, नतिजा वा जवाफ समयको
              ग्यारेन्टी होइन।
            </p>
          )}
        </div>
      </section>
      <ServicesGrid services={services} />
    </>
  );
}
