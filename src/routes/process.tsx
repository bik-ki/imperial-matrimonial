import { createFileRoute, Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { PageHero, ProcessTimeline } from "@/components/site/Sections";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/process")({
  head: () => ({
    meta: [
      { title: "Marriage Registration Assistance Process — BiheInCourt" },
      {
        name: "description",
        content:
          "The four assistance stages described by BiheInCourt, from initial consultation through court registration.",
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
  const { lang } = useT();
  return (
    <>
      <PageHero
        eyebrow={lang === "ne" ? "अनुवाद समीक्षा आवश्यक" : "Court marriage process"}
        title={lang === "ne" ? "अनुवाद समीक्षा आवश्यक — स्पष्ट चरण र सावधानीपूर्ण मार्गदर्शन" : "Clear steps. Careful guidance."}
        desc={
          lang === "ne"
            ? "अनुवाद समीक्षा आवश्यक — यस पृष्ठमा चार सहयोग चरणहरूको सामान्य概要 दिइएको छ। यो कानूनी प्रक्रिया बयान होइन; लागू चरणहरू प्रत्येक जोडीको वास्तविक आवश्यकतामा निर्भर हुन्छन्।"
            : "An overview of the four assistance stages described by the practice. This is not a statement of the legal procedure; applicable steps depend on verified requirements and each couple's circumstances."
        }
      />
      <p className="container-x border-l-2 border-gold bg-secondary/50 p-5 text-sm text-muted-foreground">
        {lang === "ne"
          ? "अनुवाद समीक्षा आवश्यक — यी सहयोग चरण र वर्णनहरू प्रकाशन अघि ग्राहकले पुष्टि गर्नुपर्छ। यी प्रमाणित कानूनी चरण होइनन्।"
          : "Project draft: confirm these assistance stages and descriptions with the client before publication. They are not verified legal steps."}
      </p>
      <ProcessTimeline />
      <section className="border-t py-20">
        <div className="container-x grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div className="max-w-3xl">
            <p className="eyebrow">{lang === "ne" ? "अनुवाद समीक्षा आवश्यक" : "Details to verify"}</p>
            <h2 className="mt-4 text-4xl">
              {lang === "ne" ? "अनुवाद समीक्षा आवश्यक — तपाईंको परिस्थितिका लागि विवरण पुष्टि गर्नुहोस्" : "Confirm the specifics for your circumstances."}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              {lang === "ne"
                ? "अनुवाद समीक्षा आवश्यक — आवश्यक कागजात सूची, फाइलिङ स्थान, उपस्थितिको आवश्यकता, निवास, समयसीमा र शुल्क यहाँ उल्लेख गरिएको छैन। यी विवरण परामर्शको रूपमा प्रयोग गर्नु अघि फर्मसँग पुष्टि गर्नुहोस्।"
                : "Placeholder for client verification: the required document list, filing venue and procedure, attendance and residence requirements, expected timelines, and fees are not specified here. Confirm these details with the firm before relying on them."}
            </p>
          </div>
          <Button asChild size="lg">
            <Link to="/contact">{lang === "ne" ? "अनुवाद समीक्षा आवश्यक" : "Contact us"}</Link>
          </Button>
        </div>
      </section>
    </>
  );
}
