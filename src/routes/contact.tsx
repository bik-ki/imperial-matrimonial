import { useState, type FormEvent } from "react";
import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { PageHero } from "@/components/site/Sections";
import { useConsultation } from "@/components/site/ConsultationDialog";
import { WhatsAppButton } from "@/components/site/WhatsAppButton";
import { useT } from "@/lib/i18n";
import { site } from "@/config/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact BiheInCourt — Advocates & Legal Associates" },
      {
        name: "description",
        content:
          "Contact BiheInCourt about court marriage registration assistance in Nepal.",
      },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  const { open } = useConsultation();
  const { t } = useT();

  return (
    <>
      <PageHero
        eyebrow={t("contact.eyebrow")}
        title={t("contact.pageTitle")}
        desc={t("contact.pageDesc")}
      />
      <div className="container-x grid gap-10 py-12 md:py-16 lg:grid-cols-[minmax(16rem,0.8fr)_minmax(0,1.2fr)]">
        <aside
          aria-labelledby="contact-details-heading"
          className="h-fit min-w-0 border bg-card p-6 md:p-8"
        >
          <p className="eyebrow">{t("contact.detailsHeading")}</p>
          <h2 id="contact-details-heading" className="mt-4 text-3xl">
            {site.name}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">{site.tagline}</p>
          <dl className="mt-8 space-y-5 text-sm">
            <ContactDetail label={t("footer.phone")} value={site.phoneDisplay} href={site.phoneHref} />
            <ContactDetail label={t("footer.email")} value={site.email} href={`mailto:${site.email}`} />
          </dl>
        </aside>
        <div className="min-w-0 border bg-card p-6 md:p-8">
          <h2 className="text-3xl">{t("contact.formHeading")}</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{t("contact.formNote")}</p>
          <ContactForm />
          <div className="mt-6 flex flex-wrap gap-3">
            <Button size="lg" onClick={open}>
              {t("contact.bookAction")}
            </Button>
            <WhatsAppButton context="Contact page" variant="outline" size="lg" />
          </div>
        </div>
      </div>
    </>
  );
}

function ContactDetail({ label, value, href }: { label: string; value: string; href: string }) {
  return (
    <div>
      <dt className="text-xs uppercase tracking-widest text-muted-foreground">{label}</dt>
      <dd className="mt-1 break-words">
        <a href={href}>{value}</a>
      </dd>
    </div>
  );
}

export function ContactForm() {
  const { t } = useT();
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
  };

  return (
    <form className="mt-8 grid gap-5 sm:grid-cols-2" onSubmit={handleSubmit}>
      <div className="space-y-1.5">
        <Label htmlFor="contact-name">{t("form.nameLabel")}</Label>
        <Input id="contact-name" name="name" autoComplete="name" required maxLength={100} />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor="contact-email">{t("form.emailLabel")}</Label>
        <Input
          id="contact-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          maxLength={255}
        />
      </div>
      <div className="space-y-1.5 sm:col-span-2">
        <Label htmlFor="contact-message">{t("form.messageLabel")}</Label>
        <Textarea id="contact-message" name="message" rows={5} required maxLength={1000} />
      </div>
      <div className="sm:col-span-2">
        <Button type="submit" size="lg">
          {t("contact.previewSubmit")}
        </Button>
        {submitted && (
          <p className="mt-4 text-sm text-muted-foreground" role="status">
            {t("contact.previewStatus")}
          </p>
        )}
      </div>
    </form>
  );
}
