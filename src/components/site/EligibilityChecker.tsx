import { useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowLeft, ArrowRight, RotateCcw, AlertTriangle, Info } from "lucide-react";
import { Button } from "@/components/ui/button";
import { evaluate, questions, type Answers } from "@/lib/eligibility";

export function EligibilityChecker() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Answers>({});
  const [error, setError] = useState("");
  const optionRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const done = step >= questions.length;
  const q = questions[Math.min(step, questions.length - 1)]!;

  const next = () => {
    if (!answers[q.id]) {
      setError("Please select an option to continue.");
      optionRefs.current[0]?.focus();
      return;
    }
    setError("");
    setStep(step + 1);
  };
  const selectOption = (option: string) => {
    setAnswers({ ...answers, [q.id]: option });
    setError("");
  };
  const handleOptionKeyDown = (event: React.KeyboardEvent<HTMLButtonElement>, index: number) => {
    let nextIndex: number | undefined;
    switch (event.key) {
      case "ArrowRight":
      case "ArrowDown":
        nextIndex = (index + 1) % q.options.length;
        break;
      case "ArrowLeft":
      case "ArrowUp":
        nextIndex = (index - 1 + q.options.length) % q.options.length;
        break;
      case "Home":
        nextIndex = 0;
        break;
      case "End":
        nextIndex = q.options.length - 1;
        break;
    }
    if (nextIndex === undefined) return;
    event.preventDefault();
    selectOption(q.options[nextIndex]!);
    optionRefs.current[nextIndex]?.focus();
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
            <h3 id="eligibility-question" className="mt-4 text-3xl md:text-4xl">
              {q.q}
            </h3>
            <div
              className="mt-8 grid gap-3 sm:grid-cols-2"
              role="radiogroup"
              aria-labelledby="eligibility-question"
              aria-invalid={Boolean(error)}
              aria-describedby={error ? "eligibility-error" : undefined}
            >
              {q.options.map((o, index) => {
                const sel = answers[q.id] === o;
                return (
                  <button
                    type="button"
                    key={o}
                    ref={(element) => {
                      optionRefs.current[index] = element;
                    }}
                    role="radio"
                    aria-checked={sel}
                    tabIndex={sel || (!answers[q.id] && index === 0) ? 0 : -1}
                    onKeyDown={(event) => handleOptionKeyDown(event, index)}
                    onClick={() => {
                      selectOption(o);
                    }}
                    className={`flex items-center justify-between border px-5 py-4 text-left text-sm transition-colors focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring ${sel ? "border-primary bg-primary text-primary-foreground" : "hover:border-foreground"}`}
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
              <p id="eligibility-error" className="mt-4 text-sm text-destructive" role="alert">
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
    <div className="animate-fade-up" role="status" aria-live="polite">
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
