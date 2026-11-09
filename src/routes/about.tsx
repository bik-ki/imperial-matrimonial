import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { PageHero, SectionHead, ServiceCard } from "@/components/site/Sections";
import { getPublishedServices } from "@/lib/sanity.server";
import { images, team } from "@/data/content";
import { useConsultation } from "@/components/site/ConsultationDialog";
import { useT } from "@/lib/i18n";

export const Route = createFileRoute("/about")({
  loader: () => getPublishedServices(),
  head: () => ({
    meta: [
      { title: "About BiheInCourt — Advocates & Legal Associates" },
      {
        name: "description",
        content:
          "A Kathmandu-based legal practice helping couples navigate court marriage registration in Nepal.",
      },
      { property: "og:title", content: "About BiheInCourt" },
      {
        property: "og:description",
        content: "Our mission, approach and commitment to confidentiality.",
      },
    ],
  }),
  component: About,
});

function About() {
  const services = Route.useLoaderData();
  const { lang } = useT();
  const { open } = useConsultation();
  const reviewText =
    lang === "ne"
      ? "अनुवाद समीक्षा आवश्यक — कम्पनीStatement, मिशन, गोपनीयता र अन्य परिचयात्मक पाठहरूलाई स्वीकृत गर्नु अघि पुनः जाँच गर्नुपर्छ।"
      : "Project review: mission, professional approach, confidentiality, and other company statements on this page require client verification before publication.";
  const pillars = [
    {
      t: lang === "ne" ? "अनुवाद समीक्षा आवश्यक" : "Our Mission",
      d:
        lang === "ne"
          ? "अनुवाद समीक्षा आवश्यक — विवाह दर्ता सम्बन्धी कानूनी प्रक्रिया स्पष्ट, व्यवस्थित र समावेशी बनाउने बारेले स्वीकृत पाठ पक्का हुन बाँकी छ।"
          : "To make the legal process of marriage registration in Nepal clear, organised and accessible to every couple.",
    },
    {
      t: lang === "ne" ? "अनुवाद समीक्षा आवश्यक" : "Professional Approach",
      d:
        lang === "ne"
          ? "अनुवाद समीक्षा आवश्यक — प्रत्येक मामला संरचित मूल्याङ्कनबाट सुरु हुन्छ।"
          : "Each matter starts with a structured assessment. We explain what applies, what is needed and what to expect.",
    },
    {
      t: lang === "ne" ? "अनुवाद समीक्षा आवश्यक" : "Confidentiality",
      d:
        lang === "ne"
          ? "अनुवाद समीक्षा आवश्यक — तपाइँको जानकारी केवल तपाईंको मामिलालाई सहयोग गर्न प्रयोग गरिन्छ।"
          : "Personal matters stay personal. Information you share is used only to assist with your matter.",
    },
    {
      t: lang === "ne" ? "अनुवाद समीक्षा आवश्यक" : "Our Philosophy",
      d:
        lang === "ne"
          ? "अनुवाद समीक्षा आवश्यक — हामी परिणामको वचनदारी गर्दैनौं; हामी तपाईंको परिस्थितिको आधारमा सचेत, ईमानदार कानूनी मार्गदर्शन प्रदान गर्छौं।"
          : "We don't promise outcomes. We provide careful, honest legal guidance based on your circumstances and applicable law.",
    },
  ];
  return (
    <>
      <PageHero
        eyebrow={lang === "ne" ? "अनुवाद समीक्षा आवश्यक" : "About us"}
        title={
          lang === "ne"
            ? "अनुवाद समीक्षा आवश्यक — विवाहको कानूनी बाटो"
            : "Guiding couples through the legal path to marriage."
        }
        desc={
          lang === "ne"
            ? "अनुवाद समीक्षा आवश्यक — BiheInCourt को Nepal मा विवाह दर्ता र सम्बन्धित कागजातको कानुनी सेवा केन्द्रीय विषय हो।"
            : "BiheInCourt is a legal service provider focused on court marriage registration and related documentation in Nepal."
        }
      />
      <aside className="container-x border-l-2 border-gold bg-secondary/50 p-5 text-sm text-muted-foreground">
        {reviewText}
      </aside>
      <section className="container-x grid gap-12 py-20 lg:grid-cols-2">
        <img
          src={images.office}
          alt="Law office desk with legal documents"
          width={1280}
          height={896}
          loading="lazy"
          className="aspect-[4/3] w-full object-cover"
        />
        <div className="grid gap-px border bg-border sm:grid-cols-2">
          {pillars.map((p) => (
            <div key={p.t} className="bg-background p-7">
              <h2 className="text-2xl">{p.t}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.d}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="border-t bg-secondary/50 py-20 md:py-24">
        <div className="container-x">
          <SectionHead
            eyebrow={lang === "ne" ? "अनुवाद समीक्षा आवश्यक" : "Practice focus"}
            title={
              lang === "ne"
                ? "अनुवाद समीक्षा आवश्यक — विवाह दर्तामा केन्द्रित सहयोग"
                : "Support centred on marriage registration."
            }
            desc={
              lang === "ne"
                ? "अनुवाद समीक्षा आवश्यक — यी छ सेवा क्षेत्रहरू वर्तमान परियोजना सामग्रीमा वर्णित सहयोगलाई प्रतिबिम्बित गर्छन्।"
                : "These six service areas reflect the assistance currently described in the project content. [Client to review scope and wording before publication.]"
            }
          />
          <div className="mt-12 grid border-l border-t sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <ServiceCard key={service.slug} s={service} />
            ))}
          </div>
        </div>
      </section>
      <section className="border-t py-20">
        <div className="container-x">
          <SectionHead
            eyebrow={lang === "ne" ? "अनुवाद समीक्षा आवश्यक" : "Our team"}
            title={
              lang === "ne"
                ? "अनुवाद समीक्षा आवश्यक — तपाईंको फाइल पछाडिको व्यक्ति"
                : "The people behind your file."
            }
            desc={
              lang === "ne"
                ? "अनुवाद समीक्षा आवश्यक — टोली सदस्यहरूको प्रोफाइलहरू प्रारम्भिक प्लेसहोल्डर हुन्; नाम, पद, र फोटो स्वीकृत विवरणले प्रतिस्थापन गर्नुपर्छ।"
                : "[Team profiles are placeholders — replace names, designations and photos with verified details.]"
            }
          />
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {team.map((m, i) => (
              <div key={i}>
                <img
                  src={m.image}
                  alt=""
                  width={1280}
                  height={896}
                  loading="lazy"
                  className="aspect-[4/5] w-full object-cover grayscale"
                />
                <h3 className="mt-4 font-serif text-2xl">{m.name}</h3>
                <p className="text-sm text-muted-foreground">{m.role}</p>
              </div>
            ))}
          </div>
          <Button size="lg" className="mt-14" onClick={open}>
            {lang === "ne" ? "अनुवाद समीक्षा आवश्यक" : "Book a Consultation"}
          </Button>
        </div>
      </section>
    </>
  );
}
