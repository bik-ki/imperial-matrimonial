import { createFileRoute } from "@tanstack/react-router";
import { ArrowRight, FileText, HeartHandshake, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero, SectionHead } from "@/components/site/Sections";
import { useConsultation } from "@/components/site/ConsultationDialog";
import { useT } from "@/lib/i18n";
import { site } from "@/config/site";
import aboutImage from "@/assets/blog-international-couple.svg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About BiheInCourt — Advocates & Legal Associates" },
      {
        name: "description",
        content:
          "Learn about BiheInCourt and our focus on court marriage registration and related legal documentation in Nepal.",
      },
      { property: "og:title", content: "About BiheInCourt" },
      {
        property: "og:description",
        content:
          "Clear, considerate guidance for couples navigating marriage registration in Nepal.",
      },
    ],
  }),
  component: About,
});

function About() {
  const { lang } = useT();
  const { open } = useConsultation();
  const isNepali = lang === "ne";
  const values = [
    {
      icon: FileText,
      title: isNepali ? "स्पष्ट जानकारी" : "Clear information",
      description: isNepali
        ? "प्रक्रिया र कागजातबारे बुझ्न सजिलो मार्गदर्शन।"
        : "Straightforward explanations of the process and documents to discuss for your situation.",
    },
    {
      icon: HeartHandshake,
      title: isNepali ? "व्यक्तिगत सहयोग" : "Personal guidance",
      description: isNepali
        ? "हरेक जोडीको अवस्था फरक हुन्छ; हामी तपाईंको कुरा बुझेर मार्गदर्शन गर्छौं।"
        : "Every couple’s circumstances are different. We take time to understand yours.",
    },
    {
      icon: ShieldCheck,
      title: isNepali ? "गोपनीयता र सावधानी" : "Care and discretion",
      description: isNepali
        ? "तपाईंको व्यक्तिगत मामिलालाई सम्मान र गोपनीयताका साथ सम्हालिन्छ।"
        : "We approach personal matters with respect, care, and discretion.",
    },
  ];

  return (
    <>
      <PageHero
        eyebrow={isNepali ? "हाम्रो बारेमा" : "About us"}
        title={
          isNepali
            ? "विवाह दर्ताको यात्रामा स्पष्ट मार्गदर्शन।"
            : "Clear guidance for an important step."
        }
        desc={
          isNepali
            ? `${site.name} नेपालमा कोर्ट म्यारिज दर्ता र सम्बन्धित कानुनी कागजातबारे सहयोग गर्ने एडभोकेट्स एण्ड लिगल एसोसिएट्स हो।`
            : `${site.name}, Advocates & Legal Associates, helps couples understand court marriage registration and related legal documentation in Nepal.`
        }
      />

      <section className="container-x grid items-center gap-10 py-16 md:py-24 lg:grid-cols-[1fr_0.9fr] lg:gap-16">
        <div>
          <SectionHead
            eyebrow={isNepali ? "हामी के गर्छौं" : "What we do"}
            title={
              isNepali
                ? "प्रक्रिया बुझ्न र तयारी गर्न सहयोग।"
                : "Support to help you prepare with confidence."
            }
          />
          <div className="mt-7 space-y-4 text-sm leading-relaxed text-muted-foreground md:text-base">
            <p>
              {isNepali
                ? "हामी जोडीहरूलाई उनीहरूको परिस्थिति बुझ्न, दर्ता प्रक्रियाबारे जानकारी लिन र आवश्यक कागजात व्यवस्थित गर्न सहयोग गर्छौं।"
                : "We help couples understand the steps involved, organise their documentation, and prepare questions about the registration process."}
            </p>
            <p>
              {isNepali
                ? "हरेक मामिला फरक हुन्छ। त्यसैले, लागू हुने आवश्यकताहरू सम्बन्धित निकाय वा योग्य कानुनी व्यवसायीसँग पुष्टि गर्नु महत्त्वपूर्ण छ।"
                : "Every matter is different. We explain what may apply to your circumstances and encourage you to confirm current requirements with the relevant authority or a qualified Nepali lawyer."}
            </p>
          </div>
          <Button size="lg" className="mt-8" onClick={open}>
            {isNepali ? "परामर्श लिनुहोस्" : "Talk to our team"}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
        <img
          src={aboutImage}
          alt={
            isNepali
              ? "हिमाली दृश्यमा जोडीको रंगीन चित्र"
              : "Illustration of a couple with a colorful Himalayan landscape"
          }
          width={1200}
          height={900}
          className="aspect-[4/3] w-full rounded-sm object-cover"
        />
      </section>

      <section className="border-y bg-secondary/40 py-16 md:py-20">
        <div className="container-x">
          <SectionHead
            eyebrow={isNepali ? "हाम्रो दृष्टिकोण" : "Our approach"}
            title={
              isNepali
                ? "तपाईंको परिस्थितिमा केन्द्रित सहयोग।"
                : "Guidance shaped around your circumstances."
            }
            desc={
              isNepali
                ? "महत्त्वपूर्ण कानुनी निर्णय गर्दा स्पष्टता, सम्मान र इमानदारी आवश्यक हुन्छ।"
                : "Important legal decisions deserve clear explanations, thoughtful preparation, and an honest view of what comes next."
            }
          />
          <div className="mt-10 grid gap-5 md:grid-cols-3">
            {values.map(({ icon: Icon, title, description }) => (
              <article key={title} className="border bg-background p-6 md:p-8">
                <Icon className="h-6 w-6 text-gold" strokeWidth={1.5} aria-hidden="true" />
                <h2 className="mt-5 text-2xl">{title}</h2>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{description}</p>
              </article>
            ))}
          </div>
          <p className="mt-8 max-w-3xl text-xs leading-relaxed text-muted-foreground">
            {isNepali
              ? "यो वेबसाइटको जानकारी सामान्य जानकारीका लागि हो र व्यक्तिगत कानुनी सल्लाहको विकल्प होइन।"
              : "Information on this website is general and does not replace legal advice for your individual circumstances."}
          </p>
        </div>
      </section>
    </>
  );
}
