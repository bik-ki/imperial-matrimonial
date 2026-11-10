import { createFileRoute } from "@tanstack/react-router";
import { PageHero } from "@/components/site/Sections";
import { EligibilityChecker } from "@/components/site/EligibilityChecker";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/eligibility")({
  head: () => ({
    meta: [
      { title: "Court Marriage Eligibility Checker — BiheInCourt" },
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
  component: () => {
    const { lang } = useT();
    return (
      <>
        <PageHero
          eyebrow={lang === "ne" ? "अनुवाद समीक्षा आवश्यक" : "Preliminary guidance"}
          title={
            lang === "ne"
              ? "अनुवाद समीक्षा आवश्यक — छ प्रश्नमा प्रारम्भिक समीक्षा"
              : "A preliminary review, in six questions."
          }
          desc={
            lang === "ne"
              ? "अनुवाद समीक्षा आवश्यक — यी परियोजना-परिभाषित प्रॉम्प्टहरूले कुनै विषयमा पछिको अनुगमन आवश्यक हुन सक्छ भन्ने संकेत दिन्छ। परिणाम कानूनी निर्णय वा सल्लाह होइन।"
              : "Use these project-defined prompts to identify topics that may need follow-up. The result is not a legal determination or advice."
          }
        />
        <section className="container-x max-w-4xl space-y-8 py-16">
          <aside className="border-l-2 border-gold bg-secondary/50 p-6 text-sm leading-relaxed text-muted-foreground">
            <h2 className="font-semibold text-foreground">
              {lang === "ne" ? "अनुवाद समीक्षा आवश्यक" : "Details to verify with the client"}
            </h2>
            <p className="mt-2">
              {lang === "ne"
                ? "अनुवाद समीक्षा आवश्यक — यहाँ सटीक कानूनी मापदण्ड र तिनीहरूको प्रयोग प्रमाणित भएको छैन। विशेष गरी विवाहयोग्य उमेर, स्वीकार्य परिचयपत्र, सहयोगी प्रमाण, पहिलाको विवाहको हेरचाह, र निवास, प्रक्रिया, समयसीमा जस्ता विषयहरू प्रकाशन वा भरोसा गर्नुअघि फर्मसँग पुष्टि गर्नुहोस्।"
                : "The precise legal criteria and their application have not been verified here. In particular, confirm the applicable marriageable-age rule, acceptable identification and supporting evidence, how previous marriages are treated, and any residence, procedure, or timing requirements with the firm before publication or reliance."}
            </p>
            <p className="mt-3">
              {lang === "ne"
                ? "अनुवाद समीक्षा आवश्यक — यो फ्रन्ट-एन्ड मात्रको उपकरणले हालको पेज सेसन बाहेक कुनै नाम, सम्पर्क, कागजात वा उत्तरहरू संकलन वा सुरक्षित गर्दैन।"
                : "This front-end-only tool does not request or store names, contact details, documents, or answers beyond the current page session."}
            </p>
          </aside>
          <EligibilityChecker />
        </section>
      </>
    );
  },
});
