export type Answers = Record<string, string>;

export const questions = [
  { id: "citizenship", short: "Citizenship", q: "Are both partners Nepali citizens?", options: ["Yes", "No", "One Nepali and one foreign national"] },
  { id: "status", short: "Marital status", q: "What is your current marital status?", options: ["Both unmarried", "One previously married", "Both previously married"] },
  { id: "age", short: "Marriageable age", q: "Are both partners legally of marriageable age?", options: ["Yes", "No", "Not sure"] },
  { id: "documents", short: "Identification", q: "Do both partners have valid identification documents?", options: ["Yes", "No", "Partially"] },
  { id: "residence", short: "Residence", q: "Where are you currently residing?", options: ["Kathmandu Valley", "Other district in Nepal", "Outside Nepal", "Different countries"] },
  { id: "timeline", short: "Timeline", q: "When are you planning to get married?", options: ["As soon as possible", "Within one month", "Within three months", "Just exploring"] },
];

export type Level = "positive" | "review" | "consult";

/** Preliminary screening only — never a legal determination. */
export function evaluate(a: Answers): { level: Level; title: string; detail: string } {
  if (a.age === "No" || a.age === "Not sure" || a.documents === "No" || a.citizenship === "No") {
    return {
      level: "consult",
      title: "A consultation is recommended before determining eligibility.",
      detail: "Some of your answers need to be clarified by an advocate before any view on eligibility can be formed.",
    };
  }
  if (
    a.citizenship !== "Yes" ||
    a.status !== "Both unmarried" ||
    a.documents === "Partially" ||
    a.residence === "Outside Nepal" ||
    a.residence === "Different countries"
  ) {
    return {
      level: "review",
      title: "Additional documents or legal review may be necessary.",
      detail: "Your situation may involve additional requirements, such as foreign documents, proof of previous marriage dissolution or residence-related steps.",
    };
  }
  return {
    level: "positive",
    title: "Preliminary eligibility indicators appear positive.",
    detail: "Based on your answers, no immediate concerns were flagged. Your documents and circumstances still need to be reviewed before registration.",
  };
}
