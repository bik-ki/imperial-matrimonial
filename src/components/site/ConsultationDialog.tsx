import { createContext, useContext, useState, type ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useT } from "@/lib/i18n";
import { LeadForm } from "./ConsultationForm";

const Ctx = createContext<{ open: () => void }>({ open: () => {} });
export const useConsultation = () => useContext(Ctx);

export function ConsultationProvider({ children }: { children: ReactNode }) {
  const { t } = useT();
  const [isOpen, setOpen] = useState(false);
  return (
    <Ctx.Provider value={{ open: () => setOpen(true) }}>
      {children}
      <Dialog open={isOpen} onOpenChange={setOpen}>
        <DialogContent className="max-h-[92vh] max-w-2xl overflow-y-auto rounded-sm">
          <DialogHeader>
            <p className="eyebrow">{t("consultation.previewLabel")}</p>
            <DialogTitle className="font-serif text-4xl font-medium">
              {t("consultation.title")}
            </DialogTitle>
            <DialogDescription>{t("consultation.description")}</DialogDescription>
          </DialogHeader>
          <LeadForm mode="booking" onDone={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    </Ctx.Provider>
  );
}
