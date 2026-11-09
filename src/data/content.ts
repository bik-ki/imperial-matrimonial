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
    pendingDetails:
      "Placeholder: specific document requirements, applicable legal details, timelines, and fees have not been verified. Confirm them with the firm for your circumstances.",
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
    pendingDetails:
      "Placeholder: specific requirements, applicable legal details, timelines, and fees have not been verified. Confirm them with the firm for your circumstances.",
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
    pendingDetails:
      "Placeholder: specific requirements, applicable legal details, timelines, and fees have not been verified. Confirm them with the firm for your circumstances.",
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
