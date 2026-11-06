import { useState } from "react";
import { ArrowLeft, ArrowRight, RotateCcw, AlertTriangle, CheckCircle2, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { saveLead } from "@/lib/leads";
import { useConsultation } from "./ConsultationDialog";
import { WhatsAppButton } from "./WhatsAppButton";
import { evaluate, questions, type Answers } from "@/lib/eligibility";

export function EligibilityChecker() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [error, setError] = useState("");
  const done = step >= questions.length;
  const q = questions[step];

  const next = () => {
    if (!answers[q.id]) return setError("Please select an option to continue.");
    setError("");
    setStep(step + 1);
  };
  const restart = () => { setAnswers({}); setStep(0); setError(""); };

  return (
    <div className="border bg-card">
      <div className="h-1 bg-secondary">
        <div className="h-full bg-primary transition-all duration-500" style={{ width: `${(Math.min(step, questions.length) / questions.length) * 100}%` }} />
      </div>
      <div className="p-6 md:p-12">
        {!done ? (
          <div key={step} className="animate-fade-up">
            <p className="eyebrow">Question {step + 1} of {questions.length}</p>
            <h3 className="mt-4 text-3xl md:text-4xl">{q.q}</h3>
            <div className="mt-8 grid gap-3 sm:grid-cols-2" role="radiogroup">
              {q.options.map((o) => {
                const sel = answers[q.id] === o;
                return (
                  <button key={o} role="radio" aria-checked={sel}
                    onClick={() => { setAnswers({ ...answers, [q.id]: o }); setError(""); }}
                    className={`flex items-center justify-between border px-5 py-4 text-left text-sm transition-colors ${sel ? "border-primary bg-primary text-primary-foreground" : "hover:border-foreground"}`}>
                    {o}
                    <span className={`h-3 w-3 rounded-full border ${sel ? "border-gold bg-gold" : ""}`} />
                  </button>
                );
              })}
            </div>
            {error && <p className="mt-4 text-sm text-destructive" role="alert">{error}</p>}
            <div className="mt-10 flex justify-between">
              <Button variant="ghost" onClick={() => setStep(step - 1)} disabled={step === 0}><ArrowLeft /> Previous</Button>
              <Button onClick={next}>{step === questions.length - 1 ? "See result" : "Next"} <ArrowRight /></Button>
            </div>
          </div>
        ) : (
          <Result answers={answers} onRestart={restart} />
        )}
      </div>
    </div>
  );
}

function Result({ answers, onRestart }: { answers: Answers; onRestart: () => void }) {
  const r = evaluate(answers);
  const { open } = useConsultation();
  const Icon = r.level === "positive" ? CheckCircle2 : r.level === "review" ? Info : AlertTriangle;
  return (
    <div className="animate-fade-up">
      <p className="eyebrow">Your preliminary result</p>
      <div className="mt-4 flex items-start gap-4">
        <Icon className="mt-1 h-7 w-7 shrink-0 text-gold" />
        <div>
          <h3 className="text-3xl md:text-4xl">{r.title}</h3>
          <p className="mt-3 text-muted-foreground">{r.detail}</p>
        </div>
      </div>
      <dl className="mt-8 grid border-l border-t text-sm sm:grid-cols-2">
        {questions.map((q) => (
          <div key={q.id} className="border-b border-r p-4">
            <dt className="text-xs text-muted-foreground">{q.short}</dt>
            <dd className="mt-1 font-medium">{answers[q.id]}</dd>
          </div>
        ))}
      </dl>
      <div className="mt-6 border-l-2 border-gold bg-secondary/60 p-4 text-xs leading-relaxed text-muted-foreground">
        <strong className="text-foreground">Important:</strong> This is a preliminary screening tool only and is not an official legal eligibility determination or legal advice. Eligibility depends on applicable Nepalese law, supporting documents and your individual circumstances, and can only be confirmed after review by a qualified advocate.
      </div>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button size="lg" onClick={open}>Book a Consultation</Button>
        <WhatsAppButton context="Eligibility result" variant="outline" size="lg"
          message={`Hello Imperial Matrimonial, I used your eligibility checker. Result: "${r.title}". I'd like to discuss my case.`} />
        <Button variant="ghost" size="lg" onClick={onRestart}><RotateCcw /> Restart</Button>
      </div>
      <SaveResult result={r.title} answers={answers} />
    </div>
  );
}

function SaveResult({ result, answers }: { result: string; answers: Answers }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [consent, setConsent] = useState(false);
  const [err, setErr] = useState("");
  const [saved, setSaved] = useState(false);
  if (saved) return <p className="mt-10 border-t pt-6 text-sm" role="status">Thank you — our team will contact you about your result.</p>;
  return (
    <form className="mt-10 border-t pt-8" noValidate onSubmit={(e) => {
      e.preventDefault();
      if (name.trim().length < 2) return setErr("Please enter your name.");
      if (!/^[+\d][\d\s-]{6,19}$/.test(phone.trim())) return setErr("Please enter a valid phone number.");
      if (!consent) return setErr("Please accept the privacy consent.");
      saveLead({
        source: "Eligibility Checker", fullName: name.trim(), phone: phone.trim(), eligibilityResult: result, consent: true,
        message: Object.entries(answers).map(([k, v]) => `${k}: ${v}`).join("; "),
      });
      setSaved(true);
    }}>
      <p className="font-serif text-2xl">Optional: have our team call you about this result</p>
      <div className="mt-4 grid gap-3 sm:grid-cols-[1fr_1fr_auto]">
        <Input aria-label="Your name" placeholder="Your name" value={name} onChange={(e) => setName(e.target.value)} className="h-11 rounded-sm" maxLength={100} />
        <Input aria-label="Phone number" placeholder="Phone (+977…)" type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="h-11 rounded-sm" />
        <Button type="submit" className="h-11">Request a call</Button>
      </div>
      <label className="mt-3 flex items-start gap-2 text-xs text-muted-foreground">
        <Checkbox checked={consent} onCheckedChange={(c) => setConsent(c === true)} aria-label="Privacy consent" /> I consent to being contacted about this enquiry.
      </label>
      {err && <p className="mt-2 text-xs text-destructive">{err}</p>}
    </form>
  );
}
