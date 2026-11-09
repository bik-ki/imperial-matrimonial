import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import {
  Menu,
  X,
  Phone,
  MessageCircle,
  CalendarCheck,
  Instagram,
  Facebook,
  Youtube,
  Linkedin,
  Music2,
  MapPin,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useT, type TKey } from "@/lib/i18n";
import { site, whatsappUrl } from "@/config/site";
import { services } from "@/data/content";
import { trackWhatsApp } from "@/lib/leads";
import { useConsultation } from "./ConsultationDialog";
import type { SiteSettingsContent } from "@/lib/sanity.server";

const nav: { to: string; key: TKey }[] = [
  { to: "/", key: "nav.home" },
  { to: "/about", key: "nav.about" },
  { to: "/process", key: "nav.process" },
  { to: "/services", key: "nav.services" },
  { to: "/eligibility", key: "nav.eligibility" },
  { to: "/faq", key: "nav.faq" },
  { to: "/blog", key: "nav.blog" },
  { to: "/contact", key: "nav.contact" },
];

const legalLinks = [
  { doc: "privacy", label: "Privacy Policy" },
  { doc: "terms", label: "Terms & Conditions" },
  { doc: "disclaimer", label: "Legal Disclaimer" },
] as const;
const hasVerifiedPhone = !site.phoneDisplay.includes("[");
const hasVerifiedWhatsApp = !site.whatsappDisplay.includes("[");

export function Wordmark({ inverse = false }: { inverse?: boolean }) {
  return (
    <Link to="/" className="flex flex-col leading-none" aria-label={`${site.name} home`}>
      <span
        className={`whitespace-nowrap font-serif text-sm tracking-[0.08em] sm:text-xl sm:tracking-[0.14em] ${inverse ? "text-ink-foreground" : "text-foreground"}`}
      >
        {site.name}
      </span>
      <span className="mt-1 whitespace-nowrap text-[0.5rem] font-semibold uppercase tracking-[0.15em] text-gold sm:text-[0.58rem] sm:tracking-[0.3em]">
        Advocates & Legal Associates
      </span>
    </Link>
  );
}

function LangToggle() {
  const { lang, setLang } = useT();
  return (
    <div className="flex border text-xs" role="group" aria-label="Language">
      {(["en", "ne"] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`px-2.5 py-1.5 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${lang === l ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
        >
          {l === "en" ? "EN" : "नेपाली"}
        </button>
      ))}
    </div>
  );
}

export function SiteHeader() {
  const { t } = useT();
  const { open } = useConsultation();
  const [mobile, setMobile] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    if (!mobile) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMobile(false);
        menuButtonRef.current?.focus();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [mobile]);

  const closeMobileMenu = () => {
    setMobile(false);
    menuButtonRef.current?.focus();
  };

  return (
    <header className="sticky top-0 z-50 border-b bg-background/90 backdrop-blur">
      <div className="container-x flex h-20 items-center justify-between gap-6">
        <Wordmark />
        <nav className="hidden items-center gap-6 xl:flex" aria-label="Main">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              activeOptions={{ exact: n.to === "/" }}
              className="text-[0.8rem] text-muted-foreground transition-colors hover:text-foreground data-[status=active]:text-foreground"
            >
              {t(n.key)}
            </Link>
          ))}
        </nav>
        <div className="hidden items-center gap-3 xl:flex">
          <LangToggle />
          <Button onClick={open}>{t("cta.book")}</Button>
        </div>
        <button
          ref={menuButtonRef}
          type="button"
          className="inline-flex h-11 w-11 items-center justify-center focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold xl:hidden"
          onClick={() => setMobile((isOpen) => !isOpen)}
          aria-label={mobile ? "Close navigation menu" : "Open navigation menu"}
          aria-controls="mobile-navigation"
          aria-expanded={mobile}
        >
          {mobile ? <X aria-hidden="true" /> : <Menu aria-hidden="true" />}
        </button>
      </div>
      <div
        id="mobile-navigation"
        className="max-h-[calc(100dvh-5rem)] overflow-y-auto overscroll-contain border-t bg-background xl:hidden"
        hidden={!mobile}
      >
        <nav className="container-x flex flex-col py-4" aria-label="Mobile">
          {nav.map((n) => (
            <Link
              key={n.to}
              to={n.to}
              onClick={closeMobileMenu}
              activeOptions={{ exact: n.to === "/" }}
              className="border-b py-3 font-serif text-2xl data-[status=active]:text-gold"
            >
              {t(n.key)}
            </Link>
          ))}
          <div className="mt-5 flex items-center justify-between gap-3">
            <LangToggle />
            <Button
              onClick={() => {
                setMobile(false);
                open();
              }}
            >
              {t("cta.book")}
            </Button>
          </div>
        </nav>
      </div>
    </header>
  );
}

const socialIcons = {
  facebook: Facebook,
  instagram: Instagram,
  tiktok: Music2,
  youtube: Youtube,
  linkedin: Linkedin,
} as const;

type SocialPlatform = keyof typeof socialIcons;

function isSocialPlatform(platform: string): platform is SocialPlatform {
  return platform in socialIcons;
}

const fallbackSocialLinks = [
  { platform: "instagram", url: site.social.instagram },
  { platform: "facebook", url: site.social.facebook },
  { platform: "tiktok", url: site.social.tiktok },
  { platform: "youtube", url: site.social.youtube },
];

export function SocialIcons({
  inverse,
  socialLinks,
}: {
  inverse?: boolean;
  socialLinks?: SiteSettingsContent["socialLinks"];
}) {
  const links = socialLinks ?? fallbackSocialLinks;
  const icons = links.flatMap((link) => {
    if (!isSocialPlatform(link.platform) || !/^https:\/\/[^/]+\/[^/?#]/.test(link.url)) {
      return [];
    }
    const Icon = socialIcons[link.platform];
    return [{ ...link, Icon, label: link.platform[0]!.toUpperCase() + link.platform.slice(1) }];
  });
  if (hasVerifiedWhatsApp) {
    icons.push({
      platform: "whatsapp",
      url: whatsappUrl(),
      Icon: MessageCircle,
      label: "WhatsApp",
    });
  }

  return (
    <div className="flex gap-2">
      {icons.map((s) => (
        <a
          key={s.platform}
          href={s.url}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={s.label}
          onClick={() => s.platform === "whatsapp" && trackWhatsApp("Social icon")}
          className={`flex h-9 w-9 items-center justify-center border transition-colors ${inverse ? "border-ink-foreground/20 hover:border-gold hover:text-gold" : "hover:border-foreground"}`}
        >
          <s.Icon className="h-4 w-4" />
        </a>
      ))}
    </div>
  );
}

export function SiteFooter({ socialLinks }: { socialLinks?: SiteSettingsContent["socialLinks"] }) {
  const { t } = useT();
  const { open } = useConsultation();
  return (
    <footer className="bg-ink pb-24 text-ink-foreground md:pb-0">
      <div className="container-x border-b border-ink-foreground/10 py-14 md:flex md:items-end md:justify-between">
        <h2 className="max-w-xl text-4xl md:text-5xl">{t("band.title")}</h2>
        <Button variant="inverse" size="lg" className="mt-6 md:mt-0" onClick={open}>
          {t("cta.bookA")}
        </Button>
      </div>
      <div className="container-x grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Wordmark inverse />
          <p className="mt-5 text-sm leading-relaxed text-ink-foreground/60">
            A Kathmandu-based legal practice assisting couples with court marriage registration and
            related documentation in Nepal.
          </p>
          <div className="mt-6">
            <SocialIcons inverse socialLinks={socialLinks} />
          </div>
        </div>
        <nav aria-label="Quick links">
          <h2 className="eyebrow text-gold">Quick Links</h2>
          <ul className="mt-5 space-y-2.5 text-sm text-ink-foreground/70">
            {nav.map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="hover:text-ink-foreground">
                  {t(n.key)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <nav aria-label="Our services">
          <h2 className="eyebrow text-gold">Our Services</h2>
          <ul className="mt-5 space-y-2.5 text-sm text-ink-foreground/70">
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  to="/services/$slug"
                  params={{ slug: s.slug }}
                  className="hover:text-ink-foreground"
                >
                  {s.title.en}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <h2 className="eyebrow text-gold">Contact</h2>
          <ul className="mt-5 space-y-3 text-sm text-ink-foreground/70">
            <li className="flex gap-2">
              <Phone className="h-4 w-4 shrink-0 text-gold" />
              {hasVerifiedPhone ? (
                <a href={site.phoneHref}>{site.phoneDisplay}</a>
              ) : (
                <span>[Client to provide verified phone number]</span>
              )}
            </li>
            <li className="flex gap-2">
              <Mail className="h-4 w-4 shrink-0 text-gold" />
              {site.email.includes("[") ? "[Client to provide verified email address]" : site.email}
            </li>
            <li className="flex gap-2">
              <MapPin className="h-4 w-4 shrink-0 text-gold" />
              {site.address.includes("[")
                ? "[Client to provide verified office address]"
                : site.address}
            </li>
            {site.hours.some((h) => h.time.includes("[")) ? (
              <li className="text-xs">[Client to provide verified office hours]</li>
            ) : (
              site.hours.map((h) => (
                <li key={h.days} className="text-xs">
                  {h.days}: {h.time}
                </li>
              ))
            )}
          </ul>
        </div>
      </div>
      <div className="container-x flex flex-col gap-3 border-t border-ink-foreground/10 py-6 text-xs text-ink-foreground/50 md:flex-row md:justify-between">
        <p>
          © {new Date().getFullYear()} {site.name} — Advocates & Legal Associates. All rights
          reserved.
        </p>
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          {legalLinks.map((legal) => (
            <Link key={legal.doc} to="/legal/$doc" params={{ doc: legal.doc }} className="hover:text-ink-foreground">
              {legal.label} [Client to provide]
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}

export function MobileCTABar() {
  const { t } = useT();
  const { open } = useConsultation();
  const cls =
    "flex flex-1 flex-col items-center gap-1 py-2.5 text-[0.65rem] uppercase tracking-wider";
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 flex border-t bg-background/95 backdrop-blur md:hidden">
      {hasVerifiedPhone ? (
        <a href={site.phoneHref} className={cls}>
          <Phone className="h-4 w-4" />
          {t("cta.call")}
        </a>
      ) : (
        <Link to="/contact" className={cls}>
          <Mail className="h-4 w-4" />
          {t("nav.contact")}
        </Link>
      )}
      {hasVerifiedWhatsApp && (
        <a
          href={whatsappUrl()}
          target="_blank"
          rel="noopener noreferrer"
          className={`${cls} border-x`}
        >
          <MessageCircle className="h-4 w-4" />
          WhatsApp
        </a>
      )}
      <button
        onClick={open}
        className={`${cls} bg-primary text-primary-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold`}
      >
        <CalendarCheck className="h-4 w-4" />
        {t("cta.book")}
      </button>
    </div>
  );
}
