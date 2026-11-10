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
  Music2,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useT, type TKey } from "@/lib/i18n";
import { site, whatsappUrl } from "@/config/site";
import { services } from "@/data/content";
import { trackWhatsApp } from "@/lib/leads";
import { useConsultation } from "./ConsultationDialog";

const nav: { to: string; key: TKey }[] = [
  { to: "/", key: "nav.home" },
  { to: "/about", key: "nav.about" },
  { to: "/process", key: "nav.process" },
  { to: "/services", key: "nav.services" },
  { to: "/eligibility", key: "nav.eligibility" },
  { to: "/blog", key: "nav.blog" },
  { to: "/gallery", key: "nav.gallery" },
  { to: "/contact", key: "nav.contact" },
];

const hasVerifiedPhone = !site.phoneDisplay.includes("[");
const hasVerifiedWhatsApp = !site.whatsappDisplay.includes("[");
const hasVerifiedInstagram =
  !site.instagramHandle.includes("[") && new URL(site.social.instagram).pathname !== "/";

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
  const { lang, setLang, t } = useT();
  return (
    <div className="flex border text-xs" role="group" aria-label={t("language.label")}>
      {(["en", "ne"] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          title={l === "en" ? t("language.english") : t("language.nepali")}
          className={`px-2.5 py-1.5 transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-gold ${lang === l ? "bg-primary font-semibold text-primary-foreground" : "text-muted-foreground hover:text-foreground"}`}
        >
          {l === "en" ? "EN" : "नेपाली"}
        </button>
      ))}
    </div>
  );
}

export function SiteHeader() {
  const { lang, t } = useT();
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
    <>
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
            aria-label={mobile ? t("common.closeMenu") : t("common.openMenu")}
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
      {lang === "ne" && (
        <div
          lang="ne"
          role="status"
          aria-live="polite"
          className="border-b bg-secondary/60 px-4 py-2 text-center text-xs text-muted-foreground"
        >
          {t("language.notice")}
        </div>
      )}
    </>
  );
}

const socials = [
  { href: site.social.instagram, icon: Instagram, label: "Instagram" },
  { href: site.social.facebook, icon: Facebook, label: "Facebook" },
  { href: site.social.tiktok, icon: Music2, label: "TikTok" },
  { href: site.social.youtube, icon: Youtube, label: "YouTube" },
  { href: whatsappUrl(), icon: MessageCircle, label: "WhatsApp" },
];

export function SocialIcons({ inverse }: { inverse?: boolean }) {
  return (
    <div className="flex gap-2">
      {socials
        .filter((s) => {
          if (s.label === "WhatsApp") return hasVerifiedWhatsApp;
          if (s.label === "Instagram") return hasVerifiedInstagram;
          return new URL(s.href).pathname !== "/";
        })
        .map((s) => (
          <a
            key={s.label}
            href={s.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={s.label}
            onClick={() => s.label === "WhatsApp" && trackWhatsApp("Social icon")}
            className={`flex h-9 w-9 items-center justify-center border transition-colors ${inverse ? "border-ink-foreground/20 hover:border-gold hover:text-gold" : "hover:border-foreground"}`}
          >
            <s.icon className="h-4 w-4" />
          </a>
        ))}
    </div>
  );
}

export function SiteFooter() {
  const { lang, t } = useT();
  const { open } = useConsultation();
  const legalLinksToRender = [
    { doc: "privacy", label: t("footer.legalPrivacy") },
    { doc: "terms", label: t("footer.legalTerms") },
    { doc: "disclaimer", label: t("footer.legalDisclaimer") },
  ] as const;
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
            <SocialIcons inverse />
          </div>
          <div className="mt-5 flex items-center gap-3">
            <span className="text-xs text-ink-foreground/60">{t("language.label")}</span>
            <LangToggle />
          </div>
        </div>
        <nav aria-label={t("footer.quickLinks")}>
          <h2 className="eyebrow text-gold">{t("footer.quickLinks")}</h2>
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
        <nav aria-label={t("footer.ourServices")}>
          <h2 className="eyebrow text-gold">{t("footer.ourServices")}</h2>
          <ul className="mt-5 space-y-2.5 text-sm text-ink-foreground/70">
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  to="/services/$slug"
                  params={{ slug: s.slug }}
                  className="hover:text-ink-foreground"
                >
                  {s.title[lang]}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div>
          <h2 className="eyebrow text-gold">{t("footer.contact")}</h2>
          <ul className="mt-5 space-y-3 text-sm text-ink-foreground/70">
            <li className="flex gap-2">
              <Phone className="h-4 w-4 shrink-0 text-gold" />
              {hasVerifiedPhone ? (
                <a href={site.phoneHref}>{site.phoneDisplay}</a>
              ) : (
                <span>{t("footer.clientReview")} {t("footer.phone")}</span>
              )}
            </li>
            <li className="flex gap-2">
              <Mail className="h-4 w-4 shrink-0 text-gold" />
              <a href={`mailto:${site.email}`}>{site.email}</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="container-x flex flex-col gap-3 border-t border-ink-foreground/10 py-6 text-xs text-ink-foreground/50 md:flex-row md:justify-between">
        <p>
          © {new Date().getFullYear()} {site.name} — Advocates & Legal Associates. {t("footer.allRights")}
        </p>
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          {legalLinksToRender.map((legal) => (
            <Link
              key={legal.doc}
              to="/legal/$doc"
              params={{ doc: legal.doc }}
              className="hover:text-ink-foreground"
            >
              {legal.label}
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
