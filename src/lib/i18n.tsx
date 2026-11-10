import { createContext, useContext, useEffect, useState, type ReactNode } from "react";

export type Lang = "en" | "ne";

const dict = {
  en: {
    "nav.home": "Home",
    "nav.about": "About",
    "nav.process": "Process",
    "nav.services": "Services",
    "nav.eligibility": "Eligibility Checker",
    "nav.faq": "FAQs",
    "nav.blog": "Blog",
    "nav.gallery": "Gallery",
    "nav.contact": "Contact",
    "cta.book": "Book Consultation",
    "cta.check": "Check Your Eligibility",
    "cta.bookA": "Book a Consultation",
    "cta.whatsapp": "Chat on WhatsApp",
    "cta.learn": "Learn more",
    "cta.call": "Call",
    "cta.close": "Close",
    "cta.sendAnother": "Send another",
    "language.label": "Language",
    "language.english": "English",
    "language.nepali": "नेपाली",
    "language.notice":
      "Nepali translations are incomplete. Content not yet translated is shown in English.",
    "review.placeholder": "Review placeholder: approved translation is pending.",
    "review.placeholder.ne": "अनुवाद समीक्षा आवश्यक: स्वीकृत नेपाली पाठ पक्का हुन बाँकी छ।",
    "footer.quickLinks": "Quick Links",
    "footer.ourServices": "Our Services",
    "footer.contact": "Contact",
    "footer.location": "Location",
    "footer.phone": "Phone",
    "footer.email": "Email",
    "footer.allRights": "All rights reserved.",
    "footer.legalPrivacy": "Privacy Policy",
    "footer.legalTerms": "Terms & Conditions",
    "footer.legalDisclaimer": "Legal Disclaimer",
    "footer.clientReview": "Client to provide",
    "common.select": "Select…",
    "common.openMenu": "Open navigation menu",
    "common.closeMenu": "Close navigation menu",
    "common.requiredHumanReview": "Human review required",
    "hero.eyebrow": "BiheInCourt | Advocates & Legal Associates",
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
    "contact.pageTitle": "Contact the practice.",
    "contact.pageDesc":
      "Call, email, or message BiheInCourt to discuss court marriage registration assistance in Nepal.",
    "contact.detailsHeading": "Contact details",
    "contact.formHeading": "Enquiry form preview",
    "contact.formNote":
      "This front-end-only form does not send, store, or share your information. Do not enter sensitive or confidential details. For a response, contact the practice directly.",
    "contact.bookAction": "Book a Consultation",
    "contact.previewSubmit": "Preview form submission",
    "contact.previewStatus":
      "Not sent: this form has no delivery integration, and your details have not been saved.",
    "consultation.previewLabel": "Enquiry preview",
    "consultation.title": "Consultation request preview",
    "consultation.description":
      "This prototype has no delivery integration. Completing this form does not send an enquiry or book an appointment.",
    "consultation.previewOnly": "Preview only.",
    "consultation.previewOnlyDesc":
      "Not sent or saved: this prototype has no approved delivery integration. Use the firm's verified contact details when they are available.",
    "form.fullName": "Full name",
    "form.phone": "Phone number",
    "form.email": "Email address",
    "form.service": "Service required",
    "form.serviceBooking": "Consultation type",
    "form.consultationReviewNote":
      "Client review required: confirm the consultation scope and options. Nepali wording requires human review.",
    "form.date": "Preferred date",
    "form.time": "Preferred time",
    "form.contactMethod": "Preferred contact method",
    "form.message": "Brief message",
    "form.messageOptional": "Additional message (optional)",
    "form.consent": "I understand this prototype does not send or store my details.",
    "form.requestConsultation": "Request Consultation",
    "form.sendMessage": "Send Message",
    "form.previewOnlyButton": "Close",
    "form.previewOnlyDescription": "This is a booking request, not a confirmed appointment.",
    "form.generalConsultation": "General consultation",
    "form.specialConsultation": "Special consultation",
    "form.otherOption": "Other / Not sure",
    "form.phoneCall": "Phone call",
    "form.whatsappOption": "WhatsApp",
    "form.emailOption": "Email",
    "form.fullNameError": "Please enter your full name",
    "form.phoneError": "Enter a valid phone number",
    "form.emailError": "Enter a valid email",
    "form.serviceError": "Select a service",
    "form.serviceBookingError": "Select a consultation type",
    "form.dateError": "Select a preferred date",
    "form.timeError": "Select a preferred time",
    "form.contactMethodError": "Select a contact method",
    "form.consentError": "Please confirm you understand.",
    "form.select": "Select…",
    "form.messageLabel": "Message",
    "form.nameLabel": "Name",
    "form.emailLabel": "Email",
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
    "nav.faq": "प्रश्नोत्तर",
    "nav.blog": "ब्लग",
    "nav.gallery": "ग्यालरी",
    "nav.contact": "सम्पर्क",
    "cta.book": "परामर्श बुक गर्नुहोस्",
    "cta.check": "आफ्नो योग्यता जाँच गर्नुहोस्",
    "cta.bookA": "परामर्श बुक गर्नुहोस्",
    "cta.whatsapp": "WhatsApp मा कुरा गर्नुहोस्",
    "cta.learn": "थप जान्नुहोस्",
    "cta.call": "फोन",
    "cta.close": "बन्द गर्नुहोस्",
    "cta.sendAnother": "फेरि पठाउनुहोस्",
    "language.label": "भाषा",
    "language.english": "English",
    "language.nepali": "नेपाली",
    "language.notice": "नेपाली अनुवाद अझै पूरा भएको छैन। अनुवाद नभएको सामग्री अंग्रेजीमा देखाइन्छ।",
    "review.placeholder": "Review placeholder: approved translation is pending.",
    "review.placeholder.ne": "अनुवाद समीक्षा आवश्यक: स्वीकृत नेपाली पाठ पक्का हुन बाँकी छ।",
    "footer.quickLinks": "त्वरित लिङ्कहरू",
    "footer.ourServices": "हाम्रा सेवाहरू",
    "footer.contact": "सम्पर्क",
    "footer.location": "ठेगाना",
    "footer.phone": "फोन",
    "footer.email": "इमेल",
    "footer.allRights": "सबै अधिकार सुरक्षित",
    "footer.legalPrivacy": "गोपनीयता नीति",
    "footer.legalTerms": "सर्तहरू",
    "footer.legalDisclaimer": "कानूनी अस्वीकरण",
    "footer.clientReview": "ग्राहकले उपलब्ध गराउनुपर्ने",
    "common.select": "छान्नुहोस्…",
    "common.openMenu": "नेभिगेसन मेनु खोल्नुहोस्",
    "common.closeMenu": "नेभिगेसन मेनु बन्द गर्नुहोस्",
    "common.requiredHumanReview": "मानवीय समीक्षा आवश्यक",
    "hero.eyebrow": "BiheInCourt | अधिवक्ता तथा कानुनी सहयोगीहरू",
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
    "contact.pageTitle": "प्रयोगसँग सम्पर्क गर्नुहोस्।",
    "contact.pageDesc":
      "फोन, इमेल, वा WhatsApp मार्फत BiheInCourt लाई Nepal मा विवाह दर्ता सहायता सम्बन्धी कुराकानी गर्नुहोस्।",
    "contact.detailsHeading": "सम्पर्क विवरण",
    "contact.formHeading": "जाँचपत्र फर्मको पूर्वावलोकन",
    "contact.formNote":
      "यो फ्रन्ट-एन्ड मात्रको फारम हो। यसले तपाइँको जानकारी पठाउँदैन, संग्रह गर्दैन र साझा गर्दैन। संवेदनशील जानकारी नदिने गर्नुहोस्। प्रतिक्रिया पाउनको लागि सीधा संस्थासँग सम्पर्क गर्नुहोस्।",
    "contact.bookAction": "परामर्श बुक गर्नुहोस्",
    "contact.previewSubmit": "फारम पूर्वावलोकन",
    "contact.previewStatus":
      "पठाइएन: यो फारममा कुनै डिलीवरी एकीकरण छैन, र तपाइँको विवरण सुरक्षित गरिएको छैन।",
    "consultation.previewLabel": "जाँचपत्र पूर्वावलोकन",
    "consultation.title": "परामर्श अनुरोध पूर्वावलोकन",
    "consultation.description":
      "यो प्रोटोटाइपमा कुनै डिलीवरी एकीकरण छैन। यो फारम भर्नाले अनुरोध पठाउँदैन वा अप्वाइन्टमेन्ट बुक गर्दैन।",
    "consultation.previewOnly": "पूर्वावलोकन मात्र।",
    "consultation.previewOnlyDesc":
      "पठाइएन वा सुरक्षित गरिएको छैन: यस प्रोटोटाइपमा कुनै प्रमाणित डिलीवरी एकीकरण छैन। उपलब्ध प्रमाणित सम्पर्क विवरण प्रयोग गर्नुहोस्।",
    "form.fullName": "पूरा नाम",
    "form.phone": "फोन नम्बर",
    "form.email": "इमेल ठेगाना",
    "form.service": "सेवा आवश्यक",
    "form.serviceBooking": "परामर्श प्रकार",
    "form.consultationReviewNote":
      "ग्राहकको समीक्षा आवश्यक: परामर्शको दायरा र विकल्प पुष्टि गर्नुहोस्। नेपाली शब्दावली प्रकाशनअघि मानवीय समीक्षाबाट पुष्टि हुनुपर्छ।",
    "form.date": "मनपर्ने मिति",
    "form.time": "मनपर्ने समय",
    "form.contactMethod": "मनपर्ने सम्पर्क विधि",
    "form.message": "सन्देश",
    "form.messageOptional": "थप सन्देश (वैकल्पिक)",
    "form.consent": "म बुझ्छु कि यो प्रोटोटाइपले मेरो विवरण पठाउँदैन वा संग्रह गर्दैन।",
    "form.requestConsultation": "परामर्श अनुरोध गर्नुहोस्",
    "form.sendMessage": "सन्देश पठाउनुहोस्",
    "form.previewOnlyButton": "बन्द गर्नुहोस्",
    "form.previewOnlyDescription": "यो बुकिङ अनुरोध हो, पुष्टिकृत अप्वाइन्टमेन्ट होइन।",
    "form.generalConsultation": "सामान्य परामर्श",
    "form.specialConsultation": "विशेष परामर्श",
    "form.otherOption": "अन्य / पक्का छैन",
    "form.phoneCall": "फोन कल",
    "form.whatsappOption": "WhatsApp",
    "form.emailOption": "इमेल",
    "form.fullNameError": "कृपया तपाईंको पूरा नाम लेख्नुहोस्",
    "form.phoneError": "वैध फोन नम्बर हाल्नुहोस्",
    "form.emailError": "वैध इमेल हाल्नुहोस्",
    "form.serviceError": "सेवा छान्नुहोस्",
    "form.serviceBookingError": "परामर्श प्रकार छान्नुहोस्",
    "form.dateError": "मनपर्ने मिति छान्नुहोस्",
    "form.timeError": "मनपर्ने समय छान्नुहोस्",
    "form.contactMethodError": "सम्पर्क विधि छान्नुहोस्",
    "form.consentError": "कृपया तपाईंले बुझ्नुभएको पुष्टि गर्नुहोस्।",
    "form.select": "छान्नुहोस्…",
    "form.messageLabel": "सन्देश",
    "form.nameLabel": "नाम",
    "form.emailLabel": "इमेल",
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

const getStoredLang = (): Lang => {
  if (typeof window === "undefined") return "en";
  const stored = localStorage.getItem("imperial_lang");
  return stored === "ne" ? "ne" : "en";
};

export function LangProvider({ children }: { children: ReactNode }) {
  const [lang, setLangState] = useState<Lang>(getStoredLang);

  useEffect(() => {
    const storedLang = getStoredLang();
    setLangState(storedLang);
    document.documentElement.lang = storedLang;
  }, []);

  const setLang = (l: Lang) => {
    setLangState(l);
    localStorage.setItem("imperial_lang", l);
    document.documentElement.lang = l;
  };

  return <Ctx.Provider value={{ lang, setLang, t: (k) => dict[lang][k] }}>{children}</Ctx.Provider>;
}

export const useT = () => {
  const ctx = useContext(Ctx);
  const lang = ctx.lang === "en" && getStoredLang() === "ne" ? "ne" : ctx.lang;
  return {
    ...ctx,
    lang,
    t: (k: TKey) => dict[lang][k],
    setLang: (next: Lang) => {
      ctx.setLang(next);
    },
  };
};
