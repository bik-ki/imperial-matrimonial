export type Answers = Record<string, string>;

export const questions = [
  {
    id: "citizenship",
    short: "Citizenship",
    q: "Are both partners Nepali citizens?",
    options: ["Yes", "No", "One Nepali and one foreign national"],
  },
  {
    id: "status",
    short: "Marital status",
    q: "What is your current marital status?",
    options: ["Both unmarried", "One previously married", "Both previously married"],
  },
  {
    id: "age",
    short: "Marriageable age",
    q: "Are both partners legally of marriageable age?",
    options: ["Yes", "No", "Not sure"],
  },
  {
    id: "documents",
    short: "Identification",
    q: "Do both partners have valid identification documents?",
    options: ["Yes", "No", "Partially"],
  },
  {
    id: "residence",
    short: "Residence",
    q: "Where are you currently residing?",
    options: [
      "Kathmandu Valley",
      "Other district in Nepal",
      "Outside Nepal",
      "Different countries",
    ],
  },
  {
    id: "timeline",
    short: "Timeline",
    q: "When are you planning to get married?",
    options: ["As soon as possible", "Within one month", "Within three months", "Just exploring"],
  },
];

export type Level = "no-flags" | "review" | "clarify";

/** Summarizes screening prompts only; it does not assess legal eligibility. */
export function evaluate(a: Answers): { level: Level; title: string; detail: string } {
  if (
    a["age"] === "No" ||
    a["age"] === "Not sure" ||
    a["documents"] === "No" ||
    a["citizenship"] === "No"
  ) {
    return {
      level: "clarify",
      title: "Some answers need clarification.",
      detail:
        "This preliminary tool cannot interpret these answers for your circumstances. Confirm the relevant criteria with the firm.",
    };
  }
  if (
    a["citizenship"] !== "Yes" ||
    a["status"] !== "Both unmarried" ||
    a["documents"] === "Partially" ||
    a["residence"] === "Outside Nepal" ||
    a["residence"] === "Different countries"
  ) {
    return {
      level: "review",
      title: "Some answers may need further review.",
      detail:
        "Your responses include circumstances flagged for client verification. This result does not determine whether any legal requirement applies.",
    };
  }
  return {
    level: "no-flags",
    title: "No review flags in the answers selected.",
    detail:
      "This only summarizes the prompts in this prototype. It does not establish eligibility or confirm current legal criteria.",
  };
}
