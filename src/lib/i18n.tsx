import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "en" | "ne";

const dict = {
  en: {
    "nav.home": "Home",
    "nav.about": "About",
    "nav.process": "Process",
    "nav.services": "Services",
    "nav.eligibility": "Eligibility Checker",
    "nav.blog": "Blog",
    "nav.gallery": "Gallery",
    "nav.contact": "Contact",
    "cta.book": "Book Consultation",
    "cta.check": "Check Your Eligibility",
    "cta.bookA": "Book a Consultation",
    "cta.whatsapp": "Chat on WhatsApp",
    "cta.learn": "Learn more",
    "cta.call": "Call",
    "hero.eyebrow": "Imperial Matrimonial | Advocates & Legal Associates",
    "hero.title1": "Your Marriage.",
    "hero.title2": "Made Official.",
    "hero.sub": "Professional Court Marriage Assistance in Nepal.",
    "hero.desc":
      "From understanding eligibility to preparing documentation and completing court registration, we help make your marriage registration process clear, organized, and legally guided.",
    "hero.badge": "Professional Legal Assistance",
    "stats.years": "Years of Legal Experience",
    "stats.couples": "Couples Assisted",
    "stats.services": "Registration Services",
    "stats.conf": "Client Confidentiality",
    "process.eyebrow": "The Process",
    "process.title": "Your Journey to Legal Marriage",
    "process.note":
      "Requirements and timelines vary depending on each couple's circumstances and applicable legal procedures.",
    "s1.t": "Initial Consultation",
    "s1.d": "Understand the couple's situation and determine the relevant legal requirements.",
    "s2.t": "Document Preparation",
    "s2.d": "Prepare and review the required documents.",
    "s3.t": "Application and Verification",
    "s3.d": "Assist with the relevant application, submission, and verification procedures.",
    "s4.t": "Court Registration",
    "s4.d": "Guide the couple through the applicable court registration process.",
    "services.eyebrow": "Practice Areas",
    "services.title": "Legal assistance, focused on marriage registration.",
    "elig.eyebrow": "Preliminary Screening",
    "elig.title": "Check your eligibility in two minutes.",
    "elig.desc":
      "Answer six short questions for a preliminary indication. No documents or ID numbers required.",
    "ig.eyebrow": "On Instagram",
    "ig.title": "Legal Insights. Real Stories.",
    "blog.eyebrow": "Legal Resources",
    "blog.title": "Knowledge Before Commitment.",
    "contact.eyebrow": "Contact",
    "contact.title": "Speak with our team.",
    "band.title": "Begin with a clear, confidential conversation.",
    "band.desc":
      "A first consultation helps you understand what applies to your situation before you commit.",
  },
  ne: {
    "nav.home": "गृहपृष्ठ",
    "nav.about": "हाम्रो बारेमा",
    "nav.process": "प्रक्रिया",
    "nav.services": "सेवाहरू",
    "nav.eligibility": "योग्यता जाँच",
    "nav.blog": "ब्लग",
    "nav.gallery": "ग्यालरी",
    "nav.contact": "सम्पर्क",
    "cta.book": "परामर्श बुक गर्नुहोस्",
    "cta.check": "आफ्नो योग्यता जाँच गर्नुहोस्",
    "cta.bookA": "परामर्श बुक गर्नुहोस्",
    "cta.whatsapp": "WhatsApp मा कुरा गर्नुहोस्",
    "cta.learn": "थप जान्नुहोस्",
    "cta.call": "फोन",
    "hero.eyebrow": "इम्पेरियल म्याट्रिमोनियल | अधिवक्ता तथा कानुनी सहयोगीहरू",
    "hero.title1": "तपाईंको विवाह।",
    "hero.title2": "कानुनी रूपमा।",
    "hero.sub": "नेपालमा व्यावसायिक अदालती विवाह सहायता।",
    "hero.desc":
      "योग्यता बुझ्नेदेखि कागजात तयारी र अदालती दर्ता पूरा गर्नेसम्म, हामी तपाईंको विवाह दर्ता प्रक्रियालाई स्पष्ट, व्यवस्थित र कानुनी मार्गदर्शनसहित बनाउँछौं।",
    "hero.badge": "व्यावसायिक कानुनी सहायता",
    "stats.years": "वर्षको कानुनी अनुभव",
    "stats.couples": "सहयोग पाएका जोडी",
    "stats.services": "दर्ता सेवाहरू",
    "stats.conf": "ग्राहक गोपनीयता",
    "process.eyebrow": "प्रक्रिया",
    "process.title": "कानुनी विवाहसम्मको तपाईंको यात्रा",
    "process.note":
      "आवश्यकता र समयसीमा प्रत्येक जोडीको अवस्था र लागू कानुनी प्रक्रियामा निर्भर हुन्छ।",
    "s1.t": "प्रारम्भिक परामर्श",
    "s1.d": "जोडीको अवस्था बुझी सम्बन्धित कानुनी आवश्यकता निर्धारण।",
    "s2.t": "कागजात तयारी",
    "s2.d": "आवश्यक कागजातहरूको तयारी र समीक्षा।",
    "s3.t": "आवेदन र प्रमाणीकरण",
    "s3.d": "आवेदन, पेस र प्रमाणीकरण प्रक्रियामा सहयोग।",
    "s4.t": "अदालती दर्ता",
    "s4.d": "लागू अदालती दर्ता प्रक्रियामा मार्गदर्शन।",
    "services.eyebrow": "सेवा क्षेत्र",
    "services.title": "विवाह दर्तामा केन्द्रित कानुनी सहायता।",
    "elig.eyebrow": "प्रारम्भिक जाँच",
    "elig.title": "दुई मिनेटमा आफ्नो योग्यता जाँच गर्नुहोस्।",
    "elig.desc":
      "प्रारम्भिक संकेतका लागि छवटा छोटा प्रश्नको उत्तर दिनुहोस्। कुनै कागजात वा परिचय नम्बर आवश्यक छैन।",
    "ig.eyebrow": "इन्स्टाग्राममा",
    "ig.title": "कानुनी जानकारी। वास्तविक कथा।",
    "blog.eyebrow": "कानुनी स्रोत",
    "blog.title": "प्रतिबद्धता अघि ज्ञान।",
    "contact.eyebrow": "सम्पर्क",
    "contact.title": "हाम्रो टोलीसँग कुरा गर्नुहोस्।",
    "band.title": "स्पष्ट र गोप्य कुराकानीबाट सुरु गर्नुहोस्।",
    "band.desc": "पहिलो परामर्शले तपाईंको अवस्थामा के लागू हुन्छ भनी बुझ्न मद्दत गर्छ।",
  },
} as const;

export type TKey = keyof (typeof dict)["en"];

const Ctx = createContext<{ lang: Lang; setLang: (l: Lang) => void; t: (k: TKey) => string }>({
  lang: "en",
  setLang: () => {},
  t: (k) => dict.en[k],
});

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>("en");
  useEffect(() => {
    const s = localStorage.getItem("imperial_lang");
    if (s === "ne") setLangState("ne");
  }, []);
  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("imperial_lang", l);
    document.documentElement.lang = l;
  };
  return <Ctx.Provider value={{ lang, setLang, t: (k) => dict[lang][k] }}>{children}</Ctx.Provider>;
}

export const useT = () => useContext(Ctx);
