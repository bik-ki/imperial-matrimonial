import { describe, expect, it } from "vitest";

import {
  evaluateEligibility,
  getDocumentRequirements,
  validateAnswers,
  type ApplicantAnswers,
  type Answers,
  type ValidatedAnswers,
} from "@/lib/eligibility";

function applicant(
  overrides: Partial<ValidatedAnswers["applicants"][number]> = {},
): ValidatedAnswers["applicants"][number] {
  return {
    age: 20,
    maritalStatus: "unmarried",
    nationality: "nepali",
    applyingOutsidePermanentDistrict: "no",
    stayedInNepal15Days: "",
    ...overrides,
  } satisfies ValidatedAnswers["applicants"][number];
}

function eligibleAnswers(): ValidatedAnswers {
  return {
    applicants: [applicant(), applicant()],
    mutualConsent: "yes",
    prohibitedRelationship: "no",
  };
}

function inputApplicant(overrides: Partial<ApplicantAnswers> = {}): ApplicantAnswers {
  return {
    age: "20",
    maritalStatus: "unmarried",
    nationality: "nepali",
    applyingOutsidePermanentDistrict: "no",
    stayedInNepal15Days: "",
    ...overrides,
  };
}

describe("Nepal court marriage eligibility", () => {
  it("accepts both applicants when they are exactly 20", () => {
    expect(evaluateEligibility(eligibleAnswers())).toEqual({ eligible: true, failures: [] });
  });

  it("reports an applicant who is under 20", () => {
    const answers = eligibleAnswers();
    answers.applicants[1].age = 19;

    expect(evaluateEligibility(answers).failures).toContainEqual({
      id: "applicant-2-age",
      requirement: "Applicant 2 must be at least 20 years old.",
    });
  });

  it("does not accept an applicant who is currently married", () => {
    const answers = eligibleAnswers();
    answers.applicants[0].maritalStatus = "currently-married";

    expect(evaluateEligibility(answers).failures).toContainEqual({
      id: "applicant-1-marital-status",
      requirement: "Applicant 1 must be unmarried, legally divorced, or widowed.",
    });
  });

  it("reports missing mutual consent", () => {
    const answers = eligibleAnswers();
    answers.mutualConsent = "no";

    expect(evaluateEligibility(answers).failures.map((failure) => failure.id)).toContain(
      "mutual-consent",
    );
  });

  it("reports a prohibited relationship", () => {
    const answers = eligibleAnswers();
    answers.prohibitedRelationship = "yes";

    expect(evaluateEligibility(answers).failures.map((failure) => failure.id)).toContain(
      "prohibited-relationship",
    );
  });

  it("does not let parental approval affect eligibility", () => {
    const answers = eligibleAnswers();
    const withNoParentalApproval = { ...answers, parentalApproval: false };

    expect(evaluateEligibility(withNoParentalApproval)).toEqual({
      eligible: true,
      failures: [],
    });
  });

  it("keeps an outside-district Nepali applicant eligible and adds the residence letter to the checklist", () => {
    const answers = eligibleAnswers();
    answers.applicants[0].applyingOutsidePermanentDistrict = "yes";

    expect(evaluateEligibility(answers).eligible).toBe(true);
    expect(
      getDocumentRequirements({
        applicants: [inputApplicant({ applyingOutsidePermanentDistrict: "yes" }), inputApplicant()],
        mutualConsent: "yes",
        prohibitedRelationship: "no",
      }).map((document) => document.title),
    ).toContain(
      "15-day temporary residence letter for Applicant 1 from the local Ward Office (applying outside the permanent district)",
    );
  });

  it("reports a foreign applicant without 15 days of continuous stay", () => {
    const answers = eligibleAnswers();
    answers.applicants[0].nationality = "foreign";
    answers.applicants[0].stayedInNepal15Days = "no";

    expect(evaluateEligibility(answers).failures).toContainEqual({
      id: "applicant-1-residency",
      requirement:
        "Applicant 1 must have stayed continuously in Nepal for at least 15 days before applying.",
    });
  });

  it("lists every failed requirement together", () => {
    const answers = eligibleAnswers();
    answers.applicants[0].age = 19;
    answers.applicants[0].nationality = "foreign";
    answers.applicants[0].stayedInNepal15Days = "no";
    answers.applicants[1].maritalStatus = "currently-married";
    answers.mutualConsent = "no";
    answers.prohibitedRelationship = "yes";

    expect(evaluateEligibility(answers).failures.map((failure) => failure.id)).toEqual([
      "applicant-1-age",
      "applicant-1-residency",
      "applicant-2-marital-status",
      "mutual-consent",
      "prohibited-relationship",
    ]);
  });

  it.each(["-1", "20.5", "121", ""])("validates age input %s", (age) => {
    const answers: Answers = {
      applicants: [inputApplicant({ age }), inputApplicant()],
      mutualConsent: "yes",
      prohibitedRelationship: "no",
    };

    expect(validateAnswers(answers)["applicant-1-age"]).toBeDefined();
  });
});
