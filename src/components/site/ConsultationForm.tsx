import { useEffect, useRef, useState } from "react";
import { z } from "zod";
import { Info } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { services } from "@/data/content";
import { useT, type TKey } from "@/lib/i18n";

const phoneRe = /^[+\d][\d\s-]{6,19}$/;

const buildBookingSchema = (t: (key: TKey) => string) =>
  z.object({
    fullName: z.string().trim().min(2, t("form.fullNameError")).max(100),
    phone: z.string().trim().regex(phoneRe, t("form.phoneError")),
    email: z.string().trim().email(t("form.emailError")).max(255),
    service: z.string().min(1, t("form.serviceBookingError")),
    date: z.string().min(1, t("form.dateError")),
    time: z.string().min(1, t("form.timeError")),
    message: z.string().max(1000).optional(),
    consent: z.literal(true, { errorMap: () => ({ message: t("form.consentError") }) }),
  });

const buildContactSchema = (t: (key: TKey) => string) =>
  z.object({
    fullName: z.string().trim().min(2, t("form.fullNameError")).max(100),
    phone: z.string().trim().regex(phoneRe, t("form.phoneError")),
    email: z.string().trim().email(t("form.emailError")).max(255),
    service: z.string().min(1, t("form.serviceError")),
    date: z.string().optional(),
    contactMethod: z.string().min(1, t("form.contactMethodError")),
    message: z.string().trim().max(1000).optional(),
    consent: z.literal(true, { errorMap: () => ({ message: t("form.consentError") }) }),
  });

const selectCls =
  "flex h-11 w-full rounded-sm border border-input bg-card px-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring";

export function LeadForm({ mode, onDone }: { mode: "booking" | "contact"; onDone?: () => void }) {
  const { lang, t } = useT();
  const [v, setV] = useState<Record<string, string | boolean>>({ consent: false });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "done">("idle");
  const formRef = useRef<HTMLFormElement>(null);
  const focusInvalidField = useRef(false);
  const set = (k: string, val: string | boolean) => setV((p) => ({ ...p, [k]: val }));
  const today = new Date().toISOString().slice(0, 10);

  useEffect(() => {
    if (!focusInvalidField.current) return;
    focusInvalidField.current = false;
    formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus();
  }, [errors]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const schema = mode === "booking" ? buildBookingSchema(t) : buildContactSchema(t);
    const r = schema.safeParse(v);
    if (!r.success) {
      const errs: Record<string, string> = {};
      r.error.issues.forEach((i) => (errs[i.path[0] as string] ??= i.message));
      focusInvalidField.current = true;
      setErrors(errs);
      return;
    }
    setErrors({});
    setStatus("done");
  };

  if (status === "done")
    return (
      <div className="py-10 text-center" role="status">
        <Info className="mx-auto h-10 w-10 text-gold" />
        <h3 className="mt-4 text-3xl">{t("consultation.previewOnly")}</h3>
        <p className="mx-auto mt-3 max-w-md text-muted-foreground">
          {t("consultation.previewOnlyDesc")}
        </p>
        <Button
          variant="outline"
          className="mt-6"
          onClick={() => {
            setV({ consent: false });
            setStatus("idle");
            onDone?.();
          }}
        >
          {onDone ? t("cta.close") : t("cta.sendAnother")}
        </Button>
      </div>
    );

  const inp = (id: string, type = "text", extra: Record<string, string> = {}) => (
    <Input
      id={id}
      type={type}
      className="h-11 rounded-sm bg-card"
      value={(v[id] as string) ?? ""}
      onChange={(e) => set(id, e.target.value)}
      aria-invalid={Boolean(errors[id])}
      aria-describedby={errors[id] ? `${id}-error` : undefined}
      {...extra}
    />
  );

  return (
    <form ref={formRef} onSubmit={submit} noValidate className="grid gap-5 sm:grid-cols-2">
      <Field error={errors["fullName"]} id="fullName" label={t("form.fullName")}>
        {inp("fullName", "text", { autoComplete: "name" })}
      </Field>
      <Field error={errors["phone"]} id="phone" label={t("form.phone")}>
        {inp("phone", "tel", { autoComplete: "tel", placeholder: "+977" })}
      </Field>
      <Field error={errors["email"]} id="email" label={t("form.email")}>
        {inp("email", "email", { autoComplete: "email" })}
      </Field>
      <Field
        error={errors["service"]}
        id="service"
        label={mode === "booking" ? t("form.serviceBooking") : t("form.service")}
      >
        <select
          id="service"
          className={selectCls}
          value={(v["service"] as string) ?? ""}
          onChange={(e) => set("service", e.target.value)}
          aria-invalid={Boolean(errors["service"])}
          aria-describedby={`${errors["service"] ? "service-error " : ""}service-review-note`}
        >
          <option value="">{t("common.select")}</option>
          <option value="general-consultation">{t("form.generalConsultation")}</option>
          <option value="special-consultation">{t("form.specialConsultation")}</option>
          {services.map((s) => (
            <option key={s.slug} value={s.slug}>{s.title[lang]}</option>
          ))}
          <option value="other">{t("form.otherOption")}</option>
        </select>
        <p id="service-review-note" className="mt-2 text-xs text-muted-foreground" role="note">
          {t("form.consultationReviewNote")}
        </p>
      </Field>
      {mode === "booking" && (
        <Field error={errors["date"]} id="date" label={t("form.date")}>
          {inp("date", "date", { min: today })}
        </Field>
      )}
      {mode === "booking" ? (
        <Field error={errors["time"]} id="time" label={t("form.time")}>
          <select
            id="time"
            className={selectCls}
            value={(v["time"] as string) ?? ""}
            onChange={(e) => set("time", e.target.value)}
            aria-invalid={Boolean(errors["time"])}
            aria-describedby={errors["time"] ? "time-error" : undefined}
          >
            <option value="">{t("common.select")}</option>
            {["10:00 AM", "11:00 AM", "12:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"].map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </Field>
      ) : (
        <Field error={errors["contactMethod"]} id="contactMethod" label={t("form.contactMethod")}>
          <select
            id="contactMethod"
            className={selectCls}
            value={(v["contactMethod"] as string) ?? ""}
            onChange={(e) => set("contactMethod", e.target.value)}
            aria-invalid={Boolean(errors["contactMethod"])}
            aria-describedby={errors["contactMethod"] ? "contactMethod-error" : undefined}
          >
            <option value="">{t("common.select")}</option>
            <option>{t("form.phoneCall")}</option>
            <option>{t("form.whatsappOption")}</option>
            <option>{t("form.emailOption")}</option>
          </select>
        </Field>
      )}
      <div className="sm:col-span-2">
        <Field
          error={errors["message"]}
          id="message"
          label={mode === "booking" ? t("form.messageOptional") : t("form.message")}
        >
          <Textarea
            id="message"
            rows={4}
            maxLength={1000}
            className="rounded-sm bg-card"
            value={(v["message"] as string) ?? ""}
            onChange={(e) => set("message", e.target.value)}
            aria-invalid={Boolean(errors["message"])}
            aria-describedby={errors["message"] ? "message-error" : undefined}
          />
        </Field>
      </div>
      <div className="sm:col-span-2">
        <label htmlFor="consent" className="flex items-start gap-3 text-sm text-muted-foreground">
          <Checkbox
            id="consent"
            checked={v["consent"] === true}
            onCheckedChange={(c) => set("consent", c === true)}
            className="mt-0.5"
            aria-invalid={Boolean(errors["consent"])}
            aria-describedby={errors["consent"] ? "consent-error" : undefined}
          />
          {t("form.consent")}
        </label>
        {errors["consent"] && (
          <p id="consent-error" className="mt-1 text-xs text-destructive" role="alert">
            {errors["consent"]}
          </p>
        )}
      </div>
      <div className="sm:col-span-2">
        <Button type="submit" size="lg" className="w-full sm:w-auto">
          {mode === "booking" ? t("form.requestConsultation") : t("form.sendMessage")}
        </Button>
        {mode === "booking" && <p className="mt-3 text-xs text-muted-foreground">{t("form.previewOnlyDescription")}</p>}
      </div>
    </form>
  );
}

function Field({
  id,
  label,
  error,
  children,
}: {
  id: string;
  label: string;
  error?: string | undefined;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id} className="text-xs uppercase tracking-[0.12em] text-muted-foreground">
        {label}
      </Label>
      {children}
      {error && (
        <p id={`${id}-error`} className="text-xs text-destructive" role="alert">
          {error}
        </p>
      )}
    </div>
  );
}
