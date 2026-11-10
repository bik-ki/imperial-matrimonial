import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { EligibilityChecker } from "@/components/site/EligibilityChecker";
import { PageHero } from "@/components/site/Sections";
import { articles } from "@/data/content";

describe("Public page semantics", () => {
  let host: HTMLDivElement;
  let root: Root;

  beforeEach(() => {
    host = document.createElement("div");
    document.body.append(host);
    root = createRoot(host);
  });

  afterEach(() => {
    act(() => root.unmount());
    host.remove();
  });

  it("uses a page-level heading and labels the eligibility answer groups", () => {
    act(() =>
      root.render(
        <>
          <PageHero eyebrow="Preliminary guidance" title="A preliminary review." />
          <h2>Details to verify</h2>
          <EligibilityChecker />
        </>,
      ),
    );

    expect(host.querySelector("h1")?.textContent).toBe("A preliminary review.");
    expect(host.querySelector("#applicant-1-age")).toHaveAccessibleName("Age");
    expect(host.querySelector("#mutual-consent-yes")?.closest("fieldset")).toHaveAccessibleName(
      "Do both applicants freely and mutually consent to the marriage?",
    );
    expect(
      host.querySelector("#prohibited-relationship-no")?.closest("fieldset"),
    ).toHaveAccessibleName(
      "Are the applicants within a blood or kinship relationship prohibited under Nepali law?",
    );
  });

  it("provides a description for every article lead image", () => {
    expect(articles.length).toBeGreaterThan(0);
    expect(articles.every((article) => article.imageAlt.trim().length > 0)).toBe(true);
  });
});
