import { useEffect, useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "@/components/ui/dialog";
import { useConsultation } from "./ConsultationDialog";
import { fetchConsultationPromo, type ConsultationPromo } from "@/lib/consultation-promo";

const DISMISSED_KEY = "imperial_consultation_promo_dismissed_v2";
const DEFAULT_PROMO: ConsultationPromo = {
  enabled: true,
  image: null,
  imageAlt: "",
  heading: "Planning a court marriage in Nepal?",
  message: "Get clear guidance on eligibility, documents, and the court process from our team.",
  buttonLabel: "Book a consultation",
  destination: "consultation",
};

function wasDismissed() {
  try {
    return sessionStorage.getItem(DISMISSED_KEY) === "true";
  } catch {
    return false;
  }
}

function persistDismissal() {
  try {
    sessionStorage.setItem(DISMISSED_KEY, "true");
  } catch {
    // A blocked storage API should not prevent the visitor from dismissing the popup.
  }
}

export function ConsultationPromo() {
  const { open: openConsultation } = useConsultation();
  const navigate = useNavigate();
  const [promo, setPromo] = useState<ConsultationPromo | null>(null);
  const [open, setOpen] = useState(false);
  const [imageFailed, setImageFailed] = useState(false);

  useEffect(() => {
    if (wasDismissed()) return;

    let active = true;
    fetchConsultationPromo()
      .then((result) => {
        if (active && result?.enabled !== false) {
          setPromo(result ?? DEFAULT_PROMO);
          setOpen(true);
        }
      })
      .catch((error: unknown) => {
        if (active) {
          console.error("Unable to load consultation promotion.", error);
          setPromo(DEFAULT_PROMO);
          setOpen(true);
        }
      });

    return () => {
      active = false;
    };
  }, []);

  if (!promo?.enabled) return null;

  const dismiss = () => {
    persistDismissal();
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        if (!nextOpen) dismiss();
        else setOpen(true);
      }}
    >
      <DialogContent
        className={`max-h-[90vh] w-[calc(100%-2rem)] overflow-y-auto overflow-x-hidden p-0 motion-reduce:animate-none motion-reduce:transition-none ${promo.image && !imageFailed ? "max-w-2xl sm:grid sm:grid-cols-[5fr_7fr]" : "max-w-sm"}`}
      >
        {promo.image && !imageFailed && (
          <img
            src={promo.image}
            alt={promo.imageAlt}
            onError={() => setImageFailed(true)}
            className="h-48 w-full object-cover sm:h-full"
          />
        )}
        <div className="flex min-w-0 flex-col justify-center gap-5 p-7 sm:p-10">
          <p className="eyebrow">A note from our team</p>
          <DialogTitle className="break-words font-serif text-4xl font-medium leading-tight">
            {promo.heading}
          </DialogTitle>
          <DialogDescription className="break-words text-base leading-relaxed">
            {promo.message}
          </DialogDescription>
          <button
            type="button"
            className="inline-flex min-h-11 w-full items-center justify-center bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:w-fit"
            onClick={() => {
              dismiss();
              if (promo.destination === "contact") {
                void navigate({ to: "/contact" });
              } else {
                openConsultation();
              }
            }}
          >
            <span className="break-words">{promo.buttonLabel}</span>
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
