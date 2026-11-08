import { createFileRoute } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PageHero } from "@/components/site/Sections";
import { useConsultation } from "@/components/site/ConsultationDialog";
import { site, whatsappUrl } from "@/config/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Imperial Matrimonial — Advocates & Legal Associates" },
      { name: "description", content: "Contact Imperial Matrimonial about court marriage registration assistance in Nepal." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const { open } = useConsultation();
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title="Start with a conversation."
        desc="[Client to provide the verified company introduction and preferred contact instructions.]"
      />
      <section className="container-x grid gap-12 py-20 lg:grid-cols-[1fr_0.8fr]">
        <div>
          <p className="eyebrow">Contact details</p>
          <h2 className="mt-5 text-4xl">[Client to provide verified contact details]</h2>
          <ul className="mt-8 space-y-5 text-sm text-muted-foreground">
            <li className="flex gap-3"><Phone className="h-5 w-5 shrink-0 text-gold" /><a href={site.phoneHref}>{site.phoneDisplay}</a></li>
            <li className="flex gap-3"><Mail className="h-5 w-5 shrink-0 text-gold" />{site.email}</li>
            <li className="flex gap-3"><MapPin className="h-5 w-5 shrink-0 text-gold" />{site.address}</li>
          </ul>
          <p className="mt-8 text-sm text-muted-foreground">[Verified office hours and location details needed before publication.]</p>
        </div>
        <div className="border bg-card p-8">
          <p className="eyebrow">Next step</p>
          <h2 className="mt-4 text-3xl">Tell us what you need help with.</h2>
          <p className="mt-4 text-sm leading-relaxed text-muted-foreground">Use the existing consultation request flow or continue through WhatsApp. No contact form or backend connection has been added here.</p>
          <div className="mt-8 flex flex-col gap-3">
            <Button size="lg" onClick={open}>Book a Consultation</Button>
            <Button asChild variant="outline" size="lg"><a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">Message on WhatsApp</a></Button>
          </div>
        </div>
      </section>
    </>
  );
}