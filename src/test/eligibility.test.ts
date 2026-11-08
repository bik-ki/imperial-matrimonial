import { describe, expect, it } from "vitest";

import { evaluate, questions } from "@/lib/eligibility";

describe("preliminary eligibility guidance", () => {
  it("uses only the six prompts already present in the project", () => {
    expect(questions.map((question) => question.id)).toEqual([
      "citizenship",
      "status",
      "age",
      "documents",
      "residence",
      "timeline",
    ]);
  });

  it.each([
    [
      {
        citizenship: "Yes",
        status: "Both unmarried",
        age: "Yes",
        documents: "Yes",
        residence: "Kathmandu Valley",
        timeline: "Just exploring",
      },
      "no-flags",
    ],
    [
      {
        citizenship: "Yes",
        status: "One previously married",
        age: "Yes",
        documents: "Yes",
        residence: "Kathmandu Valley",
        timeline: "Just exploring",
      },
      "review",
    ],
    [
      {
        citizenship: "Yes",
        status: "Both unmarried",
        age: "Not sure",
        documents: "Yes",
        residence: "Kathmandu Valley",
        timeline: "Just exploring",
      },
      "clarify",
    ],
  ])("returns non-determinative guidance for an answer set", (answers, level) => {
    const result = evaluate(answers);

    expect(result.level).toBe(level);
    expect(`${result.title} ${result.detail}`).not.toMatch(/eligible|ineligible|qualif(y|ied)/i);
  });
});
