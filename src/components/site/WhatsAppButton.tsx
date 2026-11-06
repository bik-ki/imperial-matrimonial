import { MessageCircle } from "lucide-react";
import { whatsappUrl } from "@/config/site";
import { trackWhatsApp } from "@/lib/leads";
import { useT } from "@/lib/i18n";
import { Button, type ButtonProps } from "@/components/ui/button";

export function WhatsAppButton({
  context,
  message,
  label,
  ...props
}: { context: string; message?: string; label?: string } & ButtonProps) {
  const { t } = useT();
  return (
    <Button asChild {...props}>
      <a href={whatsappUrl(message)} target="_blank" rel="noopener noreferrer" onClick={() => trackWhatsApp(context)}>
        <MessageCircle /> {label ?? t("cta.whatsapp")}
      </a>
    </Button>
  );
}

export function WhatsAppFloat() {
  return (
    <a
      href={whatsappUrl()}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => trackWhatsApp("Floating button")}
      aria-label="Chat on WhatsApp"
      className="fixed bottom-20 right-4 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg ring-1 ring-gold/60 transition-transform hover:scale-105 md:bottom-6 md:right-6"
    >
      <MessageCircle className="h-6 w-6" />
    </a>
  );
}
