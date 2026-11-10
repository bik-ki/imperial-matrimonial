import { useState } from "react";
import { z } from "zod";
import { Info } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { services } from "@/data/content";
import { gmailComposeUrl, isConfiguredBusinessEmail, site } from "@/config/site";

const phoneRe = /^[+\d][\d\s-]{6,19}$/;

const bookingSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name").max(100),
  phone: z.string().trim().regex(phoneRe, "Enter a valid phone number"),
  email: z.string().trim().email("Enter a valid email").max(255),
  service: z.string().min(1, "Select a consultation type"),
  date: z.string().min(1, "Select a preferred date"),
  time: z.string().min(1, "Select a preferred time"),
  message: z.string().max(1000).optional(),
  consent: z.literal(true, { errorMap: () => ({ message: "Please confirm you understand." }) }),
});

const contactSchema = z.object({
  fullName: z.string().trim().min(2, "Please enter your full name").max(100),
  phone: z.string().trim().regex(phoneRe, "Enter a valid phone number"),
  email: z.string().trim().email("Enter a valid email").max(255),
  service: z.string().min(1, "Select a service"),
  date: z.string().optional(),
  contactMethod: z.string().min(1, "Select a contact method"),
  message: z.string().trim().max(1000).optional(),
  consent: z.literal(true, { errorMap: () => ({ message: "Please confirm you understand." }) }),
});

const selectCls =
  "flex h-11 w-full rounded-sm border border-input bg-card px-3 text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring";

export function LeadForm({ mode, onDone }: { mode: "booking" | "contact"; onDone?: () => void }) {
  const [v, setV] = useState<Record<string, string | boolean>>({ consent: false });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "preview" | "opened" | "error">("idle");
  const [statusMessage, setStatusMessage] = useState("");
  const set = (k: string, val: string | boolean) => setV((p) => ({ ...p, [k]: val }));
  const today = new Date().toISOString().slice(0, 10);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const r = (mode === "booking" ? bookingSchema : contactSchema).safeParse(v);
    if (!r.success) {
      const errs: Record<string, string> = {};
      r.error.issues.forEach((i) => (errs[i.path[0] as string] ??= i.message));
      setErrors(errs);
      return;
    }
    setErrors({});
    if (mode !== "booking") {
      setStatus("preview");
      setStatusMessage(
        "Not sent: this form has no delivery integration, and your details have not been saved.",
      );
      return;
    }

    if (!isConfiguredBusinessEmail()) {
      setStatus("error");
      setStatusMessage(
        "The business email is not configured yet. Please use the verified contact details instead.",
      );
      return;
    }

    if (!("time" in r.data)) {
      setStatus("error");
      setStatusMessage(
        "The consultation details are incomplete. Please review the form and try again.",
      );
      return;
    }

    const data = r.data;
    const subject = `${site.consultation.subjectPrefix} from ${data.fullName}`;
    const body = [
      site.consultation.bodyHeading,
      "",
      `Full name: ${data.fullName}`,
      `Phone number: ${data.phone}`,
      `Email address: ${data.email}`,
      `Consultation type: ${data.service}`,
      `Preferred date: ${data.date}`,
      `Preferred time: ${data.time}`,
      `Privacy consent: ${data.consent ? "Yes" : "No"}`,
      "",
      "Visitor query:",
      data.message?.trim() || "No additional message provided.",
    ].join("\n");
    const composeWindow = window.open(
      gmailComposeUrl({ recipient: site.email, subject, body }),
      "_blank",
      "noopener,noreferrer",
    );
    if (!composeWindow) {
      setStatus("error");
      setStatusMessage(
        "Gmail could not open, possibly because your browser blocked the new tab. Allow pop-ups and try again.",
      );
      return;
    }
    setStatus("opened");
    setStatusMessage(
      "Gmail should now be open with your request prepared. Review it and press Send; opening Gmail does not confirm a booking.",
    );
  };

  if (status !== "idle")
    return (
      <div className="py-10 text-center" role="status">
        <Info className="mx-auto h-10 w-10 text-gold" />
        <h3 className="mt-4 text-3xl">
          {status === "preview"
            ? "Preview only."
            : status === "opened"
              ? "Gmail compose opened."
              : "Unable to open Gmail."}
        </h3>
        <p className="mx-auto mt-3 max-w-md text-muted-foreground">{statusMessage}</p>
        <Button
          variant="outline"
          className="mt-6"
          onClick={() => {
            setV({ consent: false });
            setStatus("idle");
            setStatusMessage("");
            onDone?.();
          }}
        >
          {onDone ? "Close" : "Send another"}
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
      {...extra}
    />
  );

  return (
    <form onSubmit={submit} noValidate className="grid gap-5 sm:grid-cols-2">
      <Field error={errors["fullName"]} id="fullName" label="Full name">
        {inp("fullName", "text", { autoComplete: "name" })}
      </Field>
      <Field error={errors["phone"]} id="phone" label="Phone number">
        {inp("phone", "tel", { autoComplete: "tel", placeholder: "+977" })}
      </Field>
      <Field error={errors["email"]} id="email" label="Email address">
        {inp("email", "email", { autoComplete: "email" })}
      </Field>
      <Field
        error={errors["service"]}
        id="service"
        label={mode === "booking" ? "Consultation type" : "Service required"}
      >
        <select
          id="service"
          className={selectCls}
          value={(v["service"] as string) ?? ""}
          onChange={(e) => set("service", e.target.value)}
        >
          <option value="">Select…</option>
          {services.map((s) => (
            <option key={s.slug}>{s.title.en}</option>
          ))}
          <option>Other / Not sure</option>
        </select>
      </Field>
      {mode === "booking" && (
        <Field error={errors["date"]} id="date" label="Preferred date">
          {inp("date", "date", { min: today })}
        </Field>
      )}
      {mode === "booking" ? (
        <Field error={errors["time"]} id="time" label="Preferred time">
          <select
            id="time"
            className={selectCls}
            value={(v["time"] as string) ?? ""}
            onChange={(e) => set("time", e.target.value)}
          >
            <option value="">Select…</option>
            {["10:00 AM", "11:00 AM", "12:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"].map((t) => (
              <option key={t}>{t}</option>
            ))}
          </select>
        </Field>
      ) : (
        <Field error={errors["contactMethod"]} id="contactMethod" label="Preferred contact method">
          <select
            id="contactMethod"
            className={selectCls}
            value={(v["contactMethod"] as string) ?? ""}
            onChange={(e) => set("contactMethod", e.target.value)}
          >
            <option value="">Select…</option>
            <option>Phone call</option>
            <option>WhatsApp</option>
            <option>Email</option>
          </select>
        </Field>
      )}
      <div className="sm:col-span-2">
        <Field
          error={errors["message"]}
          id="message"
          label={mode === "booking" ? "Additional message (optional)" : "Brief message"}
        >
          <Textarea
            id="message"
            rows={4}
            maxLength={1000}
            className="rounded-sm bg-card"
            value={(v["message"] as string) ?? ""}
            onChange={(e) => set("message", e.target.value)}
          />
        </Field>
      </div>
      <div className="sm:col-span-2">
        <label className="flex items-start gap-3 text-sm text-muted-foreground">
          <Checkbox
            checked={v["consent"] === true}
            onCheckedChange={(c) => set("consent", c === true)}
            className="mt-0.5"
            aria-label="Privacy consent"
          />
          I understand this prototype does not send or store my details.
        </label>
        {errors["consent"] && <p className="mt-1 text-xs text-destructive">{errors["consent"]}</p>}
      </div>
      <div className="sm:col-span-2">
        <Button type="submit" size="lg" className="w-full sm:w-auto">
          {mode === "booking" ? "Request Consultation" : "Send Message"}
        </Button>
        {mode === "booking" && (
          <p className="mt-3 text-xs text-muted-foreground">
            This is a booking request, not a confirmed appointment.
          </p>
        )}
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
      {error && <p className="text-xs text-destructive">{error}</p>}
    </div>
  );
}
