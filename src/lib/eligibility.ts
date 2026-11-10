export type MaritalStatus = "unmarried" | "divorced" | "widowed" | "currently-married";
export type Nationality = "nepali" | "foreign";
export type YesNo = "yes" | "no";
export type Answer = YesNo | "";

export type ApplicantAnswers = {
  age: string;
  maritalStatus: MaritalStatus | "";
  nationality: Nationality | "";
  applyingOutsidePermanentDistrict: Answer;
  stayedInNepal15Days: Answer;
};

export type Answers = {
  applicants: [ApplicantAnswers, ApplicantAnswers];
  mutualConsent: Answer;
  prohibitedRelationship: Answer;
};

export type FieldErrors = Record<string, string>;

export type ValidatedApplicant = {
  age: number;
  maritalStatus: MaritalStatus;
  nationality: Nationality;
  applyingOutsidePermanentDistrict: Answer;
  stayedInNepal15Days: Answer;
};

export type ValidatedAnswers = {
  applicants: [ValidatedApplicant, ValidatedApplicant];
  mutualConsent: YesNo;
  prohibitedRelationship: YesNo;
};

export type EligibilityFailure = {
  id: string;
  requirement: string;
};

export type EligibilityResult = {
  eligible: boolean;
  failures: EligibilityFailure[];
};

export type DocumentRequirement = {
  id: string;
  title: string;
};

export const LEGAL_NOTICE =
  "This checker provides general information based on the supplied eligibility criteria. It is not legal advice and does not guarantee approval. Requirements may change or vary by District Court. Confirm current requirements with the relevant court, Ward Office, embassy, or a qualified legal professional.";

export function createEmptyApplicant(): ApplicantAnswers {
  return {
    age: "",
    maritalStatus: "",
    nationality: "",
    applyingOutsidePermanentDistrict: "",
    stayedInNepal15Days: "",
  };
}

export function createEmptyAnswers(): Answers {
  return {
    applicants: [createEmptyApplicant(), createEmptyApplicant()],
    mutualConsent: "",
    prohibitedRelationship: "",
  };
}

export function validateAnswers(answers: Answers): FieldErrors {
  const errors: FieldErrors = {};

  answers.applicants.forEach((applicant, index) => {
    const applicantNumber = index + 1;
    const ageField = `applicant-${applicantNumber}-age`;
    const age = Number(applicant.age);
    if (!applicant.age.trim()) {
      errors[ageField] = "Enter this applicant's age.";
    } else if (!/^\d+$/.test(applicant.age) || !Number.isSafeInteger(age) || age > 120) {
      errors[ageField] = "Enter a whole number between 0 and 120.";
    }

    if (!applicant.maritalStatus) {
      errors[`applicant-${applicantNumber}-marital-status`] =
        "Select this applicant's marital status.";
    }
    if (!applicant.nationality) {
      errors[`applicant-${applicantNumber}-nationality`] = "Select this applicant's nationality.";
    }
    if (applicant.nationality === "nepali" && !applicant.applyingOutsidePermanentDistrict) {
      errors[`applicant-${applicantNumber}-outside-district`] =
        "Choose whether this applicant is applying outside their permanent district.";
    }
    if (applicant.nationality === "foreign" && !applicant.stayedInNepal15Days) {
      errors[`applicant-${applicantNumber}-stayed-15-days`] =
        "Choose whether this applicant has stayed in Nepal continuously for at least 15 days.";
    }
  });

  if (!answers.mutualConsent) {
    errors["mutual-consent"] = "Confirm whether both applicants freely consent.";
  }
  if (!answers.prohibitedRelationship) {
    errors["prohibited-relationship"] =
      "Confirm whether the applicants are within a prohibited relationship.";
  }

  return errors;
}

export function toValidatedAnswers(answers: Answers): ValidatedAnswers | null {
  if (Object.keys(validateAnswers(answers)).length > 0) return null;
  const [first, second] = answers.applicants.map((applicant) => {
    if (!applicant.maritalStatus || !applicant.nationality) return null;
    return {
      age: Number(applicant.age),
      maritalStatus: applicant.maritalStatus,
      nationality: applicant.nationality,
      applyingOutsidePermanentDistrict: applicant.applyingOutsidePermanentDistrict,
      stayedInNepal15Days: applicant.stayedInNepal15Days,
    };
  });
  if (
    !first ||
    !second ||
    (answers.mutualConsent !== "yes" && answers.mutualConsent !== "no") ||
    (answers.prohibitedRelationship !== "yes" && answers.prohibitedRelationship !== "no")
  ) {
    return null;
  }

  return {
    applicants: [first, second],
    mutualConsent: answers.mutualConsent,
    prohibitedRelationship: answers.prohibitedRelationship,
  };
}

export function evaluateEligibility(answers: ValidatedAnswers): EligibilityResult {
  const failures: EligibilityFailure[] = [];

  answers.applicants.forEach((applicant, index) => {
    const applicantLabel = `Applicant ${index + 1}`;
    if (applicant.age < 20) {
      failures.push({
        id: `applicant-${index + 1}-age`,
        requirement: `${applicantLabel} must be at least 20 years old.`,
      });
    }
    if (applicant.maritalStatus === "currently-married") {
      failures.push({
        id: `applicant-${index + 1}-marital-status`,
        requirement: `${applicantLabel} must be unmarried, legally divorced, or widowed.`,
      });
    }
    if (applicant.nationality === "foreign" && applicant.stayedInNepal15Days !== "yes") {
      failures.push({
        id: `applicant-${index + 1}-residency`,
        requirement: `${applicantLabel} must have stayed continuously in Nepal for at least 15 days before applying.`,
      });
    }
  });

  if (answers.mutualConsent !== "yes") {
    failures.push({
      id: "mutual-consent",
      requirement: "Both applicants must freely and mutually consent to the marriage.",
    });
  }
  if (answers.prohibitedRelationship !== "no") {
    failures.push({
      id: "prohibited-relationship",
      requirement:
        "The applicants must not be within a blood or kinship relationship prohibited under Nepali law.",
    });
  }

  return { eligible: failures.length === 0, failures };
}

export function getDocumentRequirements(answers: Answers): DocumentRequirement[] {
  const documents: DocumentRequirement[] = [
    { id: "joint-application", title: "Completed joint marriage registration application form" },
    { id: "photographs", title: "Passport-size photographs of both applicants" },
    {
      id: "witness-documents",
      title: "Citizenship certificates and photographs of three witnesses",
    },
  ];

  answers.applicants.forEach((applicant, index) => {
    const applicantLabel = `Applicant ${index + 1}`;
    if (applicant.nationality === "nepali") {
      documents.push({
        id: `applicant-${index + 1}-citizenship`,
        title: `Original and photocopy of ${applicantLabel}'s Citizenship Certificate`,
      });
      documents.push({
        id: `applicant-${index + 1}-ward-status`,
        title: `Unmarried, divorced, or widowed status recommendation letter for ${applicantLabel} from the local Ward Office`,
      });
      if (applicant.applyingOutsidePermanentDistrict === "yes") {
        documents.push({
          id: `applicant-${index + 1}-temporary-residence`,
          title: `15-day temporary residence letter for ${applicantLabel} from the local Ward Office (applying outside the permanent district)`,
        });
      }
    }
    if (applicant.nationality === "foreign") {
      documents.push({
        id: `applicant-${index + 1}-passport-visa`,
        title: `Valid passport and tourist or resident visa for ${applicantLabel}`,
      });
      documents.push({
        id: `applicant-${index + 1}-embassy-letter`,
        title: `No-objection or single-status letter for ${applicantLabel} from the relevant embassy or consulate`,
      });
      documents.push({
        id: `applicant-${index + 1}-marriage-laws`,
        title: `Notarized English or Nepali translation of ${applicantLabel}'s home-country marriage laws`,
      });
      documents.push({
        id: `applicant-${index + 1}-residence-proof`,
        title: `Proof that ${applicantLabel} stayed continuously in Nepal for at least 15 days before applying`,
      });
    }
  });

  return documents;
}
