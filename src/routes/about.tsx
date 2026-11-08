import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { PageHero, SectionHead, ServiceCard } from "@/components/site/Sections";
import { images, services, team } from "@/data/content";
import { useConsultation } from "@/components/site/ConsultationDialog";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Imperial Matrimonial — Advocates & Legal Associates" },
      { name: "description", content: "A Kathmandu-based legal practice helping couples navigate court marriage registration in Nepal." },
      { property: "og:title", content: "About Imperial Matrimonial" },
      { property: "og:description", content: "Our mission, approach and commitment to confidentiality." },
    ],
  }),
  component: About,
});

const pillars = [
  { t: "Our Mission", d: "To make the legal process of marriage registration in Nepal clear, organised and accessible to every couple." },
  { t: "Professional Approach", d: "Each matter starts with a structured assessment. We explain what applies, what is needed and what to expect." },
  { t: "Confidentiality", d: "Personal matters stay personal. Information you share is used only to assist with your matter." },
  { t: "Our Philosophy", d: "We don't promise outcomes. We provide careful, honest legal guidance based on your circumstances and applicable law." },
];

function About() {
  const { open } = useConsultation();
  return (
    <>
      <PageHero eyebrow="About us" title="Guiding couples through the legal path to marriage." desc="Imperial Matrimonial is a legal service provider focused on court marriage registration and related documentation in Nepal." />
      <section className="container-x grid gap-12 py-20 lg:grid-cols-2">
        <img src={images.office} alt="Our office" loading="lazy" className="aspect-[4/3] w-full object-cover" />
        <div className="grid gap-px border bg-border sm:grid-cols-2">
          {pillars.map((p) => (
            <div key={p.t} className="bg-background p-7">
              <h3 className="text-2xl">{p.t}</h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{p.d}</p>
            </div>
          ))}
        </div>
      </section>
      <section className="border-t bg-secondary/50 py-20 md:py-24">
        <div className="container-x">
          <SectionHead
            eyebrow="Practice focus"
            title="Support centred on marriage registration."
            desc="These six service areas reflect the assistance currently described in the project content. [Client to review scope and wording before publication.]"
          />
          <div className="mt-12 grid border-l border-t sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => <ServiceCard key={service.slug} s={service} />)}
          </div>
        </div>
      </section>
      <section className="border-t py-20">
        <div className="container-x">
          <SectionHead eyebrow="Our team" title="The people behind your file." desc="[Team profiles are placeholders — replace names, designations and photos with verified details.]" />
          <div className="mt-12 grid gap-8 sm:grid-cols-3">
            {team.map((m, i) => (
              <div key={i}>
                <img src={m.image} alt="" loading="lazy" className="aspect-[4/5] w-full object-cover grayscale" />
                <p className="mt-4 font-serif text-2xl">{m.name}</p>
                <p className="text-sm text-muted-foreground">{m.role}</p>
              </div>
            ))}
          </div>
          <Button size="lg" className="mt-14" onClick={open}>Book a Consultation</Button>
        </div>
      </section>
    </>
  );
}
