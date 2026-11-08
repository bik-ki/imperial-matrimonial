import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";

const legalDocuments = {
  privacy: {
    title: "Privacy Policy",
    description:
      "Placeholder for the client's approved privacy policy. No approved privacy text is present in the project.",
    verification: [
      "Client-approved description of information collected and its purposes.",
      "Approved retention, access, security, and deletion practices.",
      "Approved sharing or service-provider disclosures, if applicable.",
      "Verified contact details for privacy questions or requests.",
    ],
  },
  terms: {
    title: "Terms & Conditions",
    description:
      "Placeholder for the client's approved terms and conditions. No approved terms are present in the project.",
    verification: [
      "Client-approved terms for use of the website and its content.",
      "Approved service scope, engagement, fees, payment, and cancellation terms, if applicable.",
      "Approved terms covering enquiries, appointments, and any limitations.",
      "Client-approved governing law and dispute language, if applicable.",
    ],
  },
  disclaimer: {
    title: "Legal Disclaimer",
    description:
      "Placeholder for the client's approved legal disclaimer. No approved disclaimer text is present in the project.",
    verification: [
      "Client-approved explanation of the purpose and limits of website information.",
      "Approved statement about when a professional relationship is or is not formed.",
      "Approved accuracy, update, and reliance language.",
      "Client-approved legal wording and verified firm identification.",
    ],
  },
} as const;

export const Route = createFileRoute("/legal/$doc")({
  loader: ({ params }) => {
    const document = Object.entries(legalDocuments).find(([slug]) => slug === params.doc)?.[1];
    if (!document) throw notFound();
    return { document };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.document.title} — Imperial Matrimonial` },
          { name: "robots", content: "noindex, nofollow" },
        ]
      : [
          { title: "Legal page not found — Imperial Matrimonial" },
          { name: "robots", content: "noindex" },
        ],
  }),
  component: LegalDocumentPage,
});

function LegalDocumentPage() {
  const { document } = Route.useLoaderData();
  return (
    <>
      <header className="border-b">
        <div className="container-x max-w-4xl py-12 md:py-20">
          <Link
            to="/"
            className="inline-flex items-center gap-1 text-xs uppercase tracking-widest text-muted-foreground hover:text-foreground"
          >
            <ArrowLeft className="h-3 w-3" />
            Home
          </Link>
          <p className="eyebrow mt-10">Client-approved copy required</p>
          <h1 className="mt-5 text-5xl md:text-7xl">{document.title}</h1>
          <p className="mt-5 max-w-2xl text-lg text-muted-foreground">{document.description}</p>
        </div>
      </header>
      <div className="container-x max-w-4xl py-12 md:py-16">
        <section
          aria-labelledby="legal-placeholder-heading"
          className="border-l-2 border-gold bg-secondary/50 p-6 md:p-8"
        >
          <h2 id="legal-placeholder-heading" className="text-2xl">
            Placeholder — replace before publication
          </h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            The project contains no client-approved text for this legal page. No policy, contract
            term, or legal position is stated here. The following items are a verification
            checklist, not legal copy.
          </p>
          <ul className="mt-6 list-disc space-y-3 pl-5 text-sm leading-relaxed text-muted-foreground">
            {document.verification.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </section>
        <div className="mt-8">
          <Link
            to="/contact"
            className="text-sm font-semibold uppercase tracking-widest underline underline-offset-4 hover:text-gold"
          >
            Contact page
          </Link>
        </div>
      </div>
    </>
  );
}
