import {
  FileCheck2,
  Globe2,
  Scale,
  ScrollText,
  FileBadge,
  Compass,
  type LucideIcon,
} from "lucide-react";
import hero from "@/assets/hero-couple.jpg";
import office from "@/assets/office.jpg";
import signing from "@/assets/signing.jpg";
import court from "@/assets/court.jpg";

export const images = { hero, office, signing, court };

export interface Service {
  slug: string;
  icon: LucideIcon;
  title: { en: string; ne: string };
  short: { en: string; ne: string };
  body: string[];
  includes: string[];
  overview: { en: string; ne: string };
  whoFor: { en: string; ne: string };
  confirm: { en: string; ne: string };
  enquiry: { en: string; ne: string };
  pendingDetails?: string;
}

export const services: Service[] = [
  {
    slug: "court-marriage-registration",
    icon: Scale,
    title: { en: "Court Marriage Registration", ne: "अदालती विवाह दर्ता" },
    short: {
      en: "End-to-end guidance through the court marriage registration process in Nepal.",
      ne: "नेपालमा अदालती विवाह दर्ता प्रक्रियाभरि पूर्ण मार्गदर्शन।",
    },
    body: [
      "We guide couples through the court marriage registration process, from initial assessment to the registration appointment.",
      "Our role is to help you understand the applicable procedure, prepare the necessary paperwork, and stay organised at each stage.",
    ],
    includes: [
      "Initial case assessment",
      "Document checklist",
      "Application preparation",
      "Guidance on registration day",
    ],
    overview: {
      en: "This service page is a draft. Before publication, the firm must confirm the exact scope, procedure, required documents, and any filing or attendance steps that apply to each matter.",
      ne: "यो सेवा पृष्ठ ड्राफ्ट हो। प्रकाशन अघि फर्मले प्रत्येक मामिलामा लागू हुने कृत्रिम दायरा, प्रक्रिया, आवश्यक कागजात र फाइलिङ/उपस्थिति चरणहरू पुष्टि गर्नुपर्छ।",
    },
    whoFor: {
      en: "This service may be relevant to couples preparing for court marriage registration, including couples who need an initial review of the process and documentation they may need to prepare.",
      ne: "यो सेवा विवाह दर्ताको तयारीमा रहेका जोडिहरूका लागि सम्बन्धित हुन सक्छ, जसमा प्रारम्भिक प्रक्रिया र आवश्यक कागजातको समीक्षा आवश्यक छ।",
    },
    confirm: {
      en: "Before relying on this page, confirm the exact document list, legal criteria, filing venue, required attendance, and any timelines or fees with the firm for the relevant matter.",
      ne: "यो पृष्ठलाई उपयोग गर्नुअघि, सम्बन्धित मामिलाको लागि आवश्यक कागजात सूची, कानूनी मापदण्ड, फाइलिङ स्थल, उपस्थितिको आवश्यकता, समयसीमा र शुल्क फर्मसँग पुष्टि गर्नुहोस्।",
    },
    enquiry: {
      en: "Use the enquiry form or contact the practice to confirm whether this service applies to your circumstances before you rely on the information here.",
      ne: "यहाँको सूचना भरोसा गर्नु अघि, enquiry फारम वा सीधा सम्पर्कमार्फत तपाइँकी परिस्थिति अनुरूप यो सेवा लागू हुन्छ कि हुँदैन पुष्टि गर्नुहोस्।",
    },
    pendingDetails:
      "Placeholder: specific document requirements, legal details, timelines, and fees have not been verified. Confirm them with the firm for your circumstances.",
  },
  {
    slug: "marriage-documentation",
    icon: ScrollText,
    title: { en: "Marriage Documentation", ne: "विवाह कागजात" },
    short: {
      en: "Preparation and review of the documents typically required for registration.",
      ne: "दर्ताका लागि आवश्यक कागजातहरूको तयारी र समीक्षा।",
    },
    body: [
      "Incomplete or inconsistent documents are a common cause of delay. We review what you have and help prepare what is missing.",
    ],
    includes: [
      "Document review",
      "Consistency checks",
      "Translation guidance",
      "Post-marriage documentation",
    ],
    overview: {
      en: "This service page is a review placeholder. It describes a documentation support service only in general terms until the firm confirms the exact document list and authority-specific requirements for each case.",
      ne: "यो सेवा पृष्ठ समीक्षा प्लेसहोल्डर हो। फर्मले प्रत्येक मामिलाको लागि सटीक कागजात सूची र अधिकार-विशेष आवश्यकताहरू पुष्टि नगरेसम्म यो सेवाको सामान्य वर्णन मात्र हो।",
    },
    whoFor: {
      en: "This assistance may be relevant to couples or individuals preparing registration files who need a checklist and a review of supporting documents before submission.",
      ne: "यो सहयोग विवाह दर्ता फाइल तयार गर्ने जोडी वा व्यक्तिहरूका लागि सम्बन्धित हुन सक्छ जसलाई अनुप्रयोग अघि कागजात सूची र समीक्षा आवश्यक हुन्छ।",
    },
    confirm: {
      en: "Confirm the exact documents, supporting evidence, attestation or translation needs, and submission process with the firm before acting on this information.",
      ne: "यो सूचना आधारमा काम गर्नु अघि, फर्मसँग सटीक कागजात, सहयोगी प्रमाण, attestation/अनुवाद आवश्यकताहरू र पेश गर्ने प्रक्रिया पुष्टि गर्नुहोस्।",
    },
    enquiry: {
      en: "Send an enquiry to confirm whether this documentation support applies to your matter and what documents the firm needs to review.",
      ne: "तपाईंको मामिलामा यो कागजात सहयोग लागू हुन्छ कि हुँदैन र फर्मले कुन कागजात जाँच गर्न आवश्यक छ भन्ने कुरा確認 गर्न enquiry पठाउनुहोस्।",
    },
    pendingDetails:
      "Placeholder: specific document requirements, legal details, timelines, and fees have not been verified. Confirm them with the firm for your circumstances.",
  },
  {
    slug: "foreign-national-marriage",
    icon: Globe2,
    title: { en: "Foreign National Marriage Assistance", ne: "विदेशी नागरिकसँग विवाह सहायता" },
    short: {
      en: "Support for Nepali citizens marrying foreign nationals, and foreigners registering in Nepal.",
      ne: "विदेशी नागरिकसँग विवाह गर्ने नेपाली तथा नेपालमा दर्ता गर्ने विदेशीका लागि सहयोग।",
    },
    body: [
      "Marriages involving a foreign national may require additional documents, attestations or embassy-related steps. We help you understand what may apply to your situation.",
    ],
    includes: [
      "Requirement assessment",
      "Embassy document guidance",
      "Attestation checklist",
      "Coordination support",
    ],
    overview: {
      en: "This service page is a draft overview. It does not state confirmed legal requirements, embassy steps, or timelines. The firm must confirm the exact process for each case before publication.",
      ne: "यो सेवा पृष्ठ ड्राफ्ट अवलोकन हो। यसमा प्रमाणित कानूनी आवश्यकताहरू, दूतावास प्रक्रियाहरू वा समयसीमाहरू उल्लेख गरिएको छैन। प्रकाशन अघि फर्मले प्रत्येक मामिलाको लागि सटीक प्रक्रिया पुष्टि गर्नुपर्छ।",
    },
    whoFor: {
      en: "This may be relevant to Nepali citizens marrying foreign nationals, and to foreign nationals seeking to register a marriage in Nepal.",
      ne: "यो सेवा नेपाली नागरिकलाई विदेशी नागरिकसँग विवाह गर्ने वा नेपालमा विवाह दर्ता गर्न चाहने विदेशी नागरिकहरुलाई सम्बन्धित हुन सक्छ।",
    },
    confirm: {
      en: "The exact supporting documents, attestation requirements, embassy or foreign authority steps, and filing details must be confirmed with the firm before reliance.",
      ne: "सटीक सहयोगक कागजात, attestation आवश्यकताहरू, दूतावास वा विदेशी प्राधिकरणका चरणहरू र फाइलिङ विवरणलाई भरोसा गर्नु अघि फर्मसँग पुष्टि गर्नुहोस्।",
    },
    enquiry: {
      en: "Enquire with the practice to confirm whether your circumstances require additional documents or cross-border checks before you proceed.",
      ne: "तपाईंको परिस्थितिले अतिरिक्त कागजात वा क्रस-बोर्डर जाँच आवश्यक छ कि छैन भनेर पुष्टि गर्न प्रैक्टिससँग enquiry गर्नुहोस्।",
    },
    pendingDetails:
      "Placeholder: specific document requirements, legal details, timelines, and fees have not been verified. Confirm them with the firm for your circumstances.",
  },
  {
    slug: "single-status-certificate",
    icon: FileBadge,
    title: { en: "Single Status Certificate Assistance", ne: "अविवाहित प्रमाणपत्र सहायता" },
    short: {
      en: "Guidance on obtaining and presenting proof of unmarried status.",
      ne: "अविवाहित स्थितिको प्रमाण प्राप्त गर्ने बारे मार्गदर्शन।",
    },
    body: [
      "Proof of marital status is often required. We guide you on the relevant issuing authority and format.",
    ],
    includes: ["Process guidance", "Application assistance", "Document review"],
    overview: {
      en: "This service is described as a general guidance service only. The exact issuing authority, document set, and procedure remain to be confirmed by the firm before publication.",
      ne: "यो सेवा सामान्य मार्गदर्शन सेवा रूपमा मात्र वर्णन गरिएको छ। सटीक जारी गर्ने प्राधिकरण, कागजात सेट र प्रक्रिया प्रकाशन अघि फर्मले पुष्टि गर्नुपर्छ।",
    },
    whoFor: {
      en: "This service may be relevant to individuals who need to provide evidence of unmarried status in a formal or cross-border process.",
      ne: "यो सेवा भनेको आधिकारिक वा क्रस-बोर्डर प्रक्रियामा आफ्नो अविवाहित स्थिति प्रमाण गर्न चाहने व्यक्तिहरूका लागि सम्बन्धित हुन सक्छ।",
    },
    confirm: {
      en: "Before relying on this page, confirm the issuing authority, valid document format, supporting evidence, any certification steps, and any fees or timelines with the firm.",
      ne: "यो पृष्ठमा भरोसा गर्नु अघि, फर्मसँग जारी गर्ने प्राधिकरण, वैध कागजात ढाँचा, सहयोगी प्रमाण, कुनै सर्टिफिकेशन चरण, तथा शुल्क वा समयसीमा पुष्टि गर्नुहोस्।",
    },
    enquiry: {
      en: "Ask the practice whether this document is required in your case and what specific evidence they need you to prepare.",
      ne: "तपाईंको मामिलामा यो कागजात आवश्यक छ कि छैन र फर्मले कुन प्रमाण तयार गर्नुपर्ने छ भनेर प्रैक्टिससँग पुछ्नुहोस्।",
    },
    pendingDetails:
      "Placeholder: specific document requirements, legal details, timelines, and fees have not been verified. Confirm them with the firm for your circumstances.",
  },
  {
    slug: "legal-consultation",
    icon: FileCheck2,
    title: { en: "Legal Consultation", ne: "कानुनी परामर्श" },
    short: {
      en: "General consultation and special consultation are available.",
      ne: "तपाईंको अवस्था र विकल्प बुझ्न गोप्य परामर्श।",
    },
    body: [
      "A structured consultation to assess your circumstances and outline the likely next steps.",
    ],
    includes: ["General consultation", "Special consultation"],
    overview: {
      en: "This service page is a general overview only. The firm must confirm the exact consultation format, scope, and what matters are included before the page is treated as approved public copy.",
      ne: "यो सेवा पृष्ठ सामान्य अवलोकन मात्र हो। प्रकाशनको रूपमा स्वीकृत मान्नुअघि फर्मले परामर्शको सटीक ढाँचा, दायरा र समावेश गरिने विषयहरू पुष्टि गर्नुपर्छ।",
    },
    whoFor: {
      en: "This service may be relevant to individuals or couples who want an initial discussion about their circumstances, what may be required, and what questions to clarify before proceeding.",
      ne: "यो सेवा उनीहरूका लागि सम्बन्धित हुन सक्छ जो आफ्नो परिस्थिति, आवश्यकताहरू र अगाडि बढ्नु अघि स्पष्ट गर्नुपर्ने प्रश्नहरूको प्रारम्भिक छलफल गर्न चाहन्छन्।",
    },
    confirm: {
      en: "Confirm the consultation scope, whether it is general or specialised, the appointment format, and any fees or follow-up work with the firm before relying on this information.",
      ne: "यो सूचना प्रयोग गर्नु अघि, परामर्शको दायरा, सामान्य वा विशेष प्रकार, अप्वाइन्टमेन्ट ढाँचा, र कुनै शुल्क वा पदचिह्न कार्य फर्मसँग पुष्टि गर्नुहोस्।",
    },
    enquiry: {
      en: "Use the enquiry form or contact the practice to request the right consultation type for your circumstances and to confirm any next steps.",
      ne: "तपाईंको परिस्थितिका लागि सही परामर्श प्रकार अनुरोध गर्न enquiry फारम वा सीधा सम्पर्क प्रयोग गर्नुहोस् र अगाडि हुने चरणहरू पुष्टि गर्नुहोस्।",
    },
    pendingDetails:
      "Placeholder: specific requirements,legal details, timelines, and fees have not been verified. Confirm them with the firm for your circumstances.",
  },
  {
    slug: "registration-guidance",
    icon: Compass,
    title: { en: "Marriage Registration Guidance", ne: "विवाह दर्ता मार्गदर्शन" },
    short: {
      en: "Clear guidance on eligibility, residence and procedural questions.",
      ne: "योग्यता, बसोबास र प्रक्रियागत प्रश्नहरूमा स्पष्ट मार्गदर्शन।",
    },
    body: [
      "For couples living outside their home district or abroad, we explain which procedures may apply.",
    ],
    includes: ["Eligibility guidance", "Residence considerations", "Procedural roadmap"],
    overview: {
      en: "This guidance page is a preliminary summary only. The firm must verify the precise procedure, eligibility rules, residence considerations, and other requirements before the page is treated as approved copy.",
      ne: "यो मार्गदर्शन पृष्ठ प्रारम्भिक सारांश मात्र हो। प्रकाशनको रूपमा मान्नुअघि फर्मले सटीक प्रक्रिया, योग्यता नियम, बसोबास विचार र अन्य आवश्यकताहरू पुष्टि गर्नुपर्छ।",
    },
    whoFor: {
      en: "This may be relevant to couples with residence, location, or procedural questions, especially where one or both parties are outside their home district or abroad.",
      ne: "यो सेवा बसोबास, स्थान वा प्रक्रियागत प्रश्न भएकाहरू, विशेष गरी एक वा दुवै पक्ष आफ्नो घर जिल्ला बाहिर वा विदेशमा रहनु भएको अवस्थामा सम्बन्धित हुन सक्छ।",
    },
    confirm: {
      en: "Before relying on this page, confirm the relevant residence requirements, district or authority issues, and any procedural steps with the firm.",
      ne: "यो पृष्ठमा भरोसा गर्नु अघि, फर्मसँग सम्बन्धित निवास आवश्यकताहरू, जिल्ला वा प्राधिकरण मुद्दाहरू, र प्रक्रियागत चरणहरू पुष्टि गर्नुहोस्।",
    },
    enquiry: {
      en: "Use the enquiry form to confirm whether this guidance is suitable for your situation and what information the firm needs to assess it.",
      ne: "तपाईंको परिस्थिति लागि यो मार्गदर्शन उपयुक्त छ कि छैन र फर्मले के जानकारी जाँच गर्न आवश्यक छ भनेर enquiry फारममार्फत पुष्टि गर्नुहोस्।",
    },
    pendingDetails:
      "Placeholder: specific requirements, legal details, timelines, and fees have not been verified. Confirm them with the firm for your circumstances.",
  },
];

export interface Article {
  slug: string;
  title: string;
  category: string;
  isPlaceholder: boolean;
  date: string;
  readTime: string;
  image: string;
  imageAlt: string;
  excerpt: string;
  content: { h?: string; p: string }[];
}

const placeholderNote =
  "[Placeholder legal content — to be reviewed and replaced by the firm's advocates before publication.]";

export const articles: Article[] = [
  {
    slug: "understanding-court-marriage-in-nepal",
    title: "Understanding Court Marriage in Nepal",
    category: "Guides",
    isPlaceholder: true,
    date: "2026-10-12",
    readTime: "6 min",
    image: court,
    imageAlt: "Kathmandu District Court building",
    excerpt:
      "An overview of what court marriage is, who it is for, and how the process is generally structured.",
    content: [
      { p: placeholderNote },
      {
        h: "What is a court marriage?",
        p: "A court marriage is a marriage registered through the applicable legal authority rather than solely through a religious or customary ceremony.",
      },
      {
        h: "Who chooses it?",
        p: "Couples often choose this route for its legal clarity, especially where families are in different districts or one partner is a foreign national.",
      },
      {
        h: "How the process is generally structured",
        p: "The process typically involves eligibility review, document preparation, application and verification, followed by registration. Exact requirements depend on individual circumstances.",
      },
    ],
  },
  {
    slug: "documents-required-for-court-marriage",
    title: "Documents Required for Court Marriage",
    category: "Documentation",
    isPlaceholder: true,
    date: "2026-09-28",
    readTime: "5 min",
    image: signing,
    imageAlt: "Hands signing a marriage registration document",
    excerpt: "A general checklist of documents commonly requested, and why consistency matters.",
    content: [
      { p: placeholderNote },
      {
        h: "Commonly requested documents",
        p: "Identification documents, photographs, proof of address and, where relevant, proof of marital status are commonly requested.",
      },
      {
        h: "Why consistency matters",
        p: "Names, dates and addresses should match across all documents. Discrepancies may require correction before submission.",
      },
    ],
  },
  {
    slug: "foreign-national-marry-nepali-citizen",
    title: "Can a Foreign National Marry a Nepali Citizen in Nepal?",
    category: "Foreign Nationals",
    isPlaceholder: true,
    date: "2026-09-10",
    readTime: "7 min",
    image: images.hero,
    imageAlt: "Couple walking through a Kathmandu courtyard",
    excerpt: "Key considerations for couples where one partner is not a Nepali citizen.",
    content: [
      { p: placeholderNote },
      {
        h: "Additional requirements",
        p: "Foreign nationals may need documents from their home country or embassy, which may require attestation or translation.",
      },
      {
        h: "Plan ahead",
        p: "Gathering foreign documents can take time. An early consultation helps identify what applies.",
      },
    ],
  },
  {
    slug: "court-marriage-vs-traditional-marriage",
    title: "Court Marriage vs Traditional Marriage",
    category: "Guides",
    isPlaceholder: true,
    date: "2026-08-22",
    readTime: "4 min",
    image: office,
    imageAlt: "Law office desk with legal documents",
    excerpt:
      "How a court-registered marriage differs from a traditional ceremony, and how they can coexist.",
    content: [
      { p: placeholderNote },
      {
        h: "Legal recognition",
        p: "Registration provides documentary proof of marriage, which is often needed for official purposes.",
      },
      {
        h: "Both can coexist",
        p: "Many couples hold a traditional ceremony and also complete legal registration.",
      },
    ],
  },
  {
    slug: "legal-age-and-eligibility",
    title: "Understanding the Legal Age and Eligibility Requirements",
    category: "Eligibility",
    isPlaceholder: true,
    date: "2026-08-05",
    readTime: "5 min",
    image: court,
    imageAlt: "Kathmandu District Court building",
    excerpt: "A general introduction to eligibility considerations under applicable Nepalese law.",
    content: [
      { p: placeholderNote },
      {
        h: "Eligibility depends on several factors",
        p: "Age, existing marital status and other legal conditions are considered. Requirements should be verified against current law.",
      },
    ],
  },
  {
    slug: "common-mistakes-marriage-registration",
    title: "Common Mistakes During Marriage Registration",
    category: "Documentation",
    isPlaceholder: true,
    date: "2026-07-18",
    readTime: "4 min",
    image: signing,
    imageAlt: "Hands signing a marriage registration document",
    excerpt: "Avoidable issues that commonly delay registration — and how to prepare for them.",
    content: [
      { p: placeholderNote },
      {
        h: "Mismatched details",
        p: "Spelling differences in names across documents are a frequent issue.",
      },
      {
        h: "Missing proofs",
        p: "Arriving without a required document or copy may mean returning another day.",
      },
    ],
  },
];

/** Instagram content — replace with real posts. Not live-connected. */
export const instagramPosts = [
  {
    id: 1,
    image: court,
    caption: "What actually happens on court marriage registration day? A quick walkthrough.",
  },
  {
    id: 2,
    image: signing,
    caption: "Five documents couples most often forget. Save this before you apply.",
  },
  {
    id: 3,
    image: office,
    caption: "Behind the desk: how we review your documents for consistency.",
  },
  {
    id: 4,
    image: images.hero,
    caption: "Marrying a foreign national in Nepal? Start with these questions.",
  },
  {
    id: 5,
    image: court,
    caption: "Court marriage vs traditional marriage — myths, clarified.",
  },
  {
    id: 6,
    image: signing,
    caption: "Living outside your home district? Here's what to ask first.",
  },
];

export const featuredReel = {
  image: images.hero,
  caption: "Your court marriage journey in 60 seconds.",
};

export const team = [
  { name: "[Advocate Name]", role: "[Designation]", image: office },
  { name: "[Advocate Name]", role: "[Designation]", image: court },
  { name: "[Associate Name]", role: "[Designation]", image: signing },
];
