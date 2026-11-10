import { useEffect, useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { AlertCircle, CheckCircle2, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  createEmptyAnswers,
  evaluateEligibility,
  getDocumentRequirements,
  LEGAL_NOTICE,
  toValidatedAnswers,
  validateAnswers,
  type ApplicantAnswers,
  type Answers,
  type Answer,
  type EligibilityResult,
  type FieldErrors,
  type MaritalStatus,
  type Nationality,
} from "@/lib/eligibility";

const applicantLabels = ["Applicant 1", "Applicant 2"] as const;
const maritalStatuses: { value: MaritalStatus; label: string }[] = [
  { value: "unmarried", label: "Unmarried" },
  { value: "divorced", label: "Legally divorced" },
  { value: "widowed", label: "Widowed" },
  { value: "currently-married", label: "Currently married" },
];
const nationalities: { value: Nationality; label: string }[] = [
  { value: "nepali", label: "Nepali citizen" },
  { value: "foreign", label: "Foreign national" },
];
const yesNo = [
  { value: "yes", label: "Yes" },
  { value: "no", label: "No" },
] as const;

type ApplicantKey = keyof ApplicantAnswers;

export function EligibilityChecker() {
  const [answers, setAnswers] = useState<Answers>(createEmptyAnswers);
  const [errors, setErrors] = useState<FieldErrors>({});
  const [result, setResult] = useState<EligibilityResult | null>(null);
  const [checkedDocuments, setCheckedDocuments] = useState<Record<string, boolean>>({});
  const formRef = useRef<HTMLFormElement>(null);
  const focusInvalidField = useRef(false);

  useEffect(() => {
    if (!focusInvalidField.current || Object.keys(errors).length === 0) return;
    const firstInvalidField = Object.keys(errors)[0];
    formRef.current?.querySelector<HTMLElement>(`[name="${firstInvalidField}"]`)?.focus();
    focusInvalidField.current = false;
  }, [errors]);

  const updateApplicant = (index: number, key: ApplicantKey, value: string) => {
    setAnswers((current) => ({
      ...current,
      applicants: current.applicants.map((applicant, applicantIndex) =>
        applicantIndex === index ? { ...applicant, [key]: value } : applicant,
      ) as Answers["applicants"],
    }));
    setErrors((current) => {
      const next = { ...current };
      const errorNames = [keyToErrorName[key]];
      if (key === "nationality") errorNames.push("outside-district", "stayed-15-days");
      for (const errorName of errorNames) {
        delete next[`applicant-${index + 1}-${errorName}`];
      }
      return next;
    });
    setResult(null);
  };

  const updateSharedAnswer = (key: "mutualConsent" | "prohibitedRelationship", value: Answer) => {
    setAnswers((current) => ({ ...current, [key]: value }));
    setErrors((current) => {
      const next = { ...current };
      delete next[key === "mutualConsent" ? "mutual-consent" : "prohibited-relationship"];
      return next;
    });
    setResult(null);
  };

  const submit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const validationErrors = validateAnswers(answers);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) {
      focusInvalidField.current = true;
      return;
    }

    const validatedAnswers = toValidatedAnswers(answers);
    if (validatedAnswers) setResult(evaluateEligibility(validatedAnswers));
  };

  const startOver = () => {
    setAnswers(createEmptyAnswers());
    setErrors({});
    setResult(null);
    setCheckedDocuments({});
    formRef.current?.querySelector<HTMLElement>("input")?.focus();
  };

  const documentRequirements = getDocumentRequirements(answers);
  const errorSummary = Object.entries(errors);

  return (
    <div className="space-y-10">
      <form ref={formRef} onSubmit={submit} noValidate className="space-y-8">
        <div className="grid gap-6 lg:grid-cols-2">
          {answers.applicants.map((applicant, index) => (
            <ApplicantFields
              key={index}
              applicant={applicant}
              index={index}
              errors={errors}
              onChange={updateApplicant}
            />
          ))}
        </div>

        <section className="border bg-card p-6 md:p-8" aria-labelledby="shared-answers-heading">
          <div className="flex items-start gap-4">
            <span className="eyebrow pt-1">Both applicants</span>
            <div>
              <h2 id="shared-answers-heading" className="text-2xl md:text-3xl">
                Consent and relationship
              </h2>
              <p className="mt-2 text-sm text-muted-foreground">
                Answer these questions for the couple.
              </p>
            </div>
          </div>
          <div className="mt-6 grid gap-8 md:grid-cols-2">
            <RadioChoices
              id="mutual-consent"
              name="mutual-consent"
              legend="Do both applicants freely and mutually consent to the marriage?"
              value={answers.mutualConsent}
              options={yesNo}
              error={errors["mutual-consent"]}
              onChange={(value) => updateSharedAnswer("mutualConsent", value)}
            />
            <RadioChoices
              id="prohibited-relationship"
              name="prohibited-relationship"
              legend="Are the applicants within a blood or kinship relationship prohibited under Nepali law?"
              value={answers.prohibitedRelationship}
              options={yesNo}
              error={errors["prohibited-relationship"]}
              onChange={(value) => updateSharedAnswer("prohibitedRelationship", value)}
            />
          </div>
          <p className="mt-6 border-l-2 border-gold bg-secondary/60 p-4 text-sm leading-relaxed text-muted-foreground">
            Parental consent is not included in this assessment because it is not required for
            eligibility under the criteria used here.
          </p>
        </section>

        {errorSummary.length > 0 && (
          <div className="border border-destructive/50 bg-destructive/5 p-4" role="alert">
            <p className="font-semibold">Please review the highlighted fields.</p>
            <ul className="mt-2 list-inside list-disc text-sm text-muted-foreground">
              {errorSummary.map(([field, message]) => (
                <li key={field}>{message}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex flex-wrap items-center gap-4">
          <Button type="submit" size="lg">
            Check eligibility
          </Button>
          <p className="text-sm text-muted-foreground">
            Your answers stay in this page only. No documents or identity details are collected.
          </p>
        </div>
      </form>

      {result && <Result result={result} onStartOver={startOver} />}

      <section className="border bg-card p-6 md:p-8" aria-labelledby="documents-heading">
        <div className="max-w-3xl">
          <p className="eyebrow">Preparation checklist</p>
          <h2 id="documents-heading" className="mt-3 text-3xl md:text-4xl">
            Documents and procedure
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
            These items help you prepare. An unchecked item means a document may still be needed; it
            does not change the legal eligibility result above. Do not upload documents here.
          </p>
        </div>
        {answers.applicants.every((applicant) => !applicant.nationality) ? (
          <p className="mt-6 border p-4 text-sm text-muted-foreground">
            Choose each applicant's nationality above to see the relevant document checklist.
          </p>
        ) : (
          <>
            {answers.applicants.some((applicant) => !applicant.nationality) && (
              <p className="mt-6 border p-4 text-sm text-muted-foreground">
                Choose each applicant's nationality to see the full checklist.
              </p>
            )}
            <ul className="mt-6 grid gap-3 md:grid-cols-2">
              {documentRequirements.map((document) => (
                <li key={document.id}>
                  <label className="flex min-h-14 cursor-pointer items-start gap-3 border p-4 text-sm leading-relaxed hover:bg-secondary/40">
                    <input
                      type="checkbox"
                      checked={Boolean(checkedDocuments[document.id])}
                      onChange={(event) =>
                        setCheckedDocuments((current) => ({
                          ...current,
                          [document.id]: event.target.checked,
                        }))
                      }
                      className="mt-1 h-4 w-4 shrink-0 accent-foreground focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
                    />
                    <span>{document.title}</span>
                  </label>
                </li>
              ))}
            </ul>
          </>
        )}
      </section>
    </div>
  );
}

const keyToErrorName: Record<ApplicantKey, string> = {
  age: "age",
  maritalStatus: "marital-status",
  nationality: "nationality",
  applyingOutsidePermanentDistrict: "outside-district",
  stayedInNepal15Days: "stayed-15-days",
};

function ApplicantFields({
  applicant,
  index,
  errors,
  onChange,
}: {
  applicant: ApplicantAnswers;
  index: number;
  errors: FieldErrors;
  onChange: (index: number, key: ApplicantKey, value: string) => void;
}) {
  const applicantNumber = index + 1;
  const ageField = `applicant-${applicantNumber}-age`;
  const maritalStatusField = `applicant-${applicantNumber}-marital-status`;
  const nationalityField = `applicant-${applicantNumber}-nationality`;
  const outsideDistrictField = `applicant-${applicantNumber}-outside-district`;
  const stayed15DaysField = `applicant-${applicantNumber}-stayed-15-days`;

  return (
    <section
      className="border bg-card p-6 md:p-8"
      aria-labelledby={`applicant-${applicantNumber}-heading`}
    >
      <p className="eyebrow">Applicant 0{applicantNumber}</p>
      <h2 id={`applicant-${applicantNumber}-heading`} className="mt-3 text-3xl">
        Applicant details
      </h2>

      <div className="mt-6 space-y-6">
        <div>
          <label htmlFor={ageField} className="block text-sm font-medium">
            Age <span aria-hidden="true">*</span>
          </label>
          <input
            id={ageField}
            name={ageField}
            type="text"
            inputMode="numeric"
            autoComplete="off"
            maxLength={3}
            value={applicant.age}
            onChange={(event) => {
              const value = event.target.value;
              if (/^\d{0,3}$/.test(value)) onChange(index, "age", value);
            }}
            aria-required="true"
            aria-invalid={Boolean(errors[ageField])}
            aria-describedby={errors[ageField] ? `${ageField}-error` : `${ageField}-hint`}
            className="mt-2 block h-12 w-full border bg-background px-3 text-base focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          />
          <p id={`${ageField}-hint`} className="mt-2 text-xs text-muted-foreground">
            Enter a whole number from 0 to 120.
          </p>
          {errors[ageField] && (
            <p id={`${ageField}-error`} className="mt-2 text-sm text-destructive">
              {errors[ageField]}
            </p>
          )}
        </div>

        <div>
          <label htmlFor={maritalStatusField} className="block text-sm font-medium">
            Marital status <span aria-hidden="true">*</span>
          </label>
          <select
            id={maritalStatusField}
            name={maritalStatusField}
            value={applicant.maritalStatus}
            onChange={(event) => onChange(index, "maritalStatus", event.target.value)}
            aria-required="true"
            aria-invalid={Boolean(errors[maritalStatusField])}
            aria-describedby={
              errors[maritalStatusField] ? `${maritalStatusField}-error` : undefined
            }
            className="mt-2 block h-12 w-full border bg-background px-3 text-base focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            <option value="">Select marital status</option>
            {maritalStatuses.map((status) => (
              <option key={status.value} value={status.value}>
                {status.label}
              </option>
            ))}
          </select>
          {errors[maritalStatusField] && (
            <p id={`${maritalStatusField}-error`} className="mt-2 text-sm text-destructive">
              {errors[maritalStatusField]}
            </p>
          )}
        </div>

        <div>
          <label htmlFor={nationalityField} className="block text-sm font-medium">
            Nationality <span aria-hidden="true">*</span>
          </label>
          <select
            id={nationalityField}
            name={nationalityField}
            value={applicant.nationality}
            onChange={(event) => onChange(index, "nationality", event.target.value)}
            aria-required="true"
            aria-invalid={Boolean(errors[nationalityField])}
            aria-describedby={errors[nationalityField] ? `${nationalityField}-error` : undefined}
            className="mt-2 block h-12 w-full border bg-background px-3 text-base focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring"
          >
            <option value="">Select nationality</option>
            {nationalities.map((nationality) => (
              <option key={nationality.value} value={nationality.value}>
                {nationality.label}
              </option>
            ))}
          </select>
          {errors[nationalityField] && (
            <p id={`${nationalityField}-error`} className="mt-2 text-sm text-destructive">
              {errors[nationalityField]}
            </p>
          )}
        </div>

        {applicant.nationality === "nepali" && (
          <RadioChoices
            id={outsideDistrictField}
            name={outsideDistrictField}
            legend="Are you applying outside your permanent district?"
            value={applicant.applyingOutsidePermanentDistrict}
            options={yesNo}
            error={errors[outsideDistrictField]}
            onChange={(value) => onChange(index, "applyingOutsidePermanentDistrict", value)}
          />
        )}
        {applicant.nationality === "foreign" && (
          <RadioChoices
            id={stayed15DaysField}
            name={stayed15DaysField}
            legend="Have you stayed continuously in Nepal for at least 15 days before applying?"
            value={applicant.stayedInNepal15Days}
            options={yesNo}
            error={errors[stayed15DaysField]}
            onChange={(value) => onChange(index, "stayedInNepal15Days", value)}
          />
        )}
      </div>
    </section>
  );
}

function RadioChoices({
  id,
  name,
  legend,
  value,
  options,
  error,
  onChange,
}: {
  id: string;
  name: string;
  legend: string;
  value: Answer;
  options: readonly { value: "yes" | "no"; label: string }[];
  error: string | undefined;
  onChange: (value: Answer) => void;
}) {
  return (
    <fieldset
      aria-describedby={error ? `${id}-error` : undefined}
      aria-invalid={Boolean(error)}
      className="min-w-0"
    >
      <legend className="text-sm font-medium">
        {legend} <span aria-hidden="true">*</span>
      </legend>
      <div className="mt-3 flex flex-wrap gap-3">
        {options.map((option) => (
          <label
            key={option.value}
            className={`flex min-h-11 cursor-pointer items-center gap-2 border px-4 py-2 text-sm transition-colors focus-within:outline focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-ring ${
              value === option.value ? "border-primary bg-secondary" : "hover:bg-secondary/40"
            }`}
          >
            <input
              type="radio"
              id={`${id}-${option.value}`}
              name={name}
              value={option.value}
              checked={value === option.value}
              onChange={() => onChange(option.value)}
              aria-required="true"
              className="h-4 w-4 accent-foreground"
            />
            {option.label}
          </label>
        ))}
      </div>
      {error && (
        <p id={`${id}-error`} className="mt-2 text-sm text-destructive">
          {error}
        </p>
      )}
    </fieldset>
  );
}

function Result({ result, onStartOver }: { result: EligibilityResult; onStartOver: () => void }) {
  return (
    <section
      className="border bg-card p-6 md:p-8"
      aria-labelledby="eligibility-result-heading"
      aria-live="polite"
    >
      <p className="eyebrow">Your result</p>
      <div className="mt-3 flex items-start gap-4">
        {result.eligible ? (
          <CheckCircle2 className="mt-1 h-6 w-6 shrink-0" aria-hidden="true" />
        ) : (
          <AlertCircle className="mt-1 h-6 w-6 shrink-0" aria-hidden="true" />
        )}
        <div>
          <h2 id="eligibility-result-heading" className="text-3xl md:text-4xl">
            {result.eligible
              ? "You appear to meet the basic eligibility requirements."
              : "You may not currently meet the eligibility requirements."}
          </h2>
          {!result.eligible && (
            <div className="mt-6">
              <h3 className="text-lg font-semibold">Legal eligibility requirements to address</h3>
              <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed">
                {result.failures.map((failure) => (
                  <li key={failure.id}>{failure.requirement}</li>
                ))}
              </ul>
            </div>
          )}
          <p className="mt-6 border-l-2 border-gold bg-secondary/60 p-4 text-sm leading-relaxed text-muted-foreground">
            <strong className="text-foreground">Legal notice: </strong>
            {LEGAL_NOTICE}
          </p>
          <p className="mt-4 text-sm text-muted-foreground">
            Document or procedural gaps are shown separately in the preparation checklist and do not
            automatically mean you are legally ineligible.
          </p>
        </div>
      </div>
      <div className="mt-6 flex flex-wrap gap-3">
        <Button asChild size="lg">
          <Link to="/contact">Contact us</Link>
        </Button>
        <Button type="button" variant="outline" size="lg" onClick={onStartOver}>
          <RotateCcw aria-hidden="true" /> Start Over
        </Button>
      </div>
    </section>
  );
}
