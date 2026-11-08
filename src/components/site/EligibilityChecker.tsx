import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, RotateCcw, AlertTriangle, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { evaluate, questions, type Answers } from "@/lib/eligibility";

export function EligibilityChecker() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [error, setError] = useState("");
  const done = step >= questions.length;
  const q = questions[Math.min(step, questions.length - 1)]!;

  const next = () => {
    if (!answers[q.id]) return setError("Please select an option to continue.");
    setError("");
    setStep(step + 1);
  };
  const restart = () => {
    setAnswers({});
    setStep(0);
    setError("");
  };

  return (
    <div className="border bg-card">
      <div className="h-1 bg-secondary">
        <div
          className="h-full bg-primary transition-all duration-500"
          style={{ width: `${(Math.min(step, questions.length) / questions.length) * 100}%` }}
        />
      </div>
      <div className="p-6 md:p-12">
        {!done ? (
          <div key={step} className="animate-fade-up">
            <p className="eyebrow">
              Question {step + 1} of {questions.length}
            </p>
            <h3 className="mt-4 text-3xl md:text-4xl">{q.q}</h3>
            <div className="mt-8 grid gap-3 sm:grid-cols-2" role="radiogroup">
              {q.options.map((o) => {
                const sel = answers[q.id] === o;
                return (
                  <button
                    key={o}
                    role="radio"
                    aria-checked={sel}
                    onClick={() => {
                      setAnswers({ ...answers, [q.id]: o });
                      setError("");
                    }}
                    className={`flex items-center justify-between border px-5 py-4 text-left text-sm transition-colors ${sel ? "border-primary bg-primary text-primary-foreground" : "hover:border-foreground"}`}
                  >
                    {o}
                    <span
                      className={`h-3 w-3 rounded-full border ${sel ? "border-gold bg-gold" : ""}`}
                    />
                  </button>
                );
              })}
            </div>
            {error && (
              <p className="mt-4 text-sm text-destructive" role="alert">
                {error}
              </p>
            )}
            <div className="mt-10 flex justify-between">
              <Button variant="ghost" onClick={() => setStep(step - 1)} disabled={step === 0}>
                <ArrowLeft /> Previous
              </Button>
              <Button onClick={next}>
                {step === questions.length - 1 ? "See result" : "Next"} <ArrowRight />
              </Button>
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
  const Icon = r.level === "clarify" ? AlertTriangle : Info;
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
        <strong className="text-foreground">Important:</strong> This is preliminary guidance based
        only on the answers selected. It does not assess or determine legal eligibility, confirm
        current legal criteria, or replace advice from a qualified advocate.
      </div>
      <div className="mt-8 flex flex-wrap gap-3">
        <Button asChild size="lg">
          <Link to="/contact">Contact us</Link>
        </Button>
        <Button variant="ghost" size="lg" onClick={onRestart}>
          <RotateCcw /> Restart
        </Button>
      </div>
    </div>
  );
}
