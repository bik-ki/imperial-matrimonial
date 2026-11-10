import { createContext, useContext, useState, type ReactNode } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { LeadForm } from "./ConsultationForm";

const Ctx = createContext<{ open: () => void }>({ open: () => {} });
export const useConsultation = () => useContext(Ctx);

export function ConsultationProvider({ children }: { children: ReactNode }) {
  const [isOpen, setOpen] = useState(false);
  return (
    <Ctx.Provider value={{ open: () => setOpen(true) }}>
      {children}
      <Dialog open={isOpen} onOpenChange={setOpen}>
        <DialogContent className="max-h-[92vh] max-w-2xl overflow-y-auto rounded-sm">
          <DialogHeader>
            <p className="eyebrow">Enquiry preview</p>
            <DialogTitle className="font-serif text-4xl font-medium">
              Consultation request preview
            </DialogTitle>
            <DialogDescription>
              Submitting opens Gmail with a prepared request. You must review and send it yourself;
              opening Gmail does not confirm an appointment.
            </DialogDescription>
          </DialogHeader>
          <LeadForm mode="booking" onDone={() => setOpen(false)} />
        </DialogContent>
      </Dialog>
    </Ctx.Provider>
  );
}
