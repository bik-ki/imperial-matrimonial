import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { EligibilityChecker } from "@/components/site/EligibilityChecker";
import { LeadForm } from "@/components/site/ConsultationForm";
import { LangProvider } from "@/lib/i18n";

describe("Public form accessibility", () => {
  let host: HTMLDivElement;
  let root: Root;
  let resizeObserverDescriptor: PropertyDescriptor | undefined;

  beforeEach(() => {
    resizeObserverDescriptor = Object.getOwnPropertyDescriptor(globalThis, "ResizeObserver");
    Object.defineProperty(globalThis, "ResizeObserver", {
      configurable: true,
      value: class {
        observe() {}
        unobserve() {}
        disconnect() {}
      },
    });
    host = document.createElement("div");
    document.body.append(host);
    root = createRoot(host);
  });

  afterEach(() => {
    act(() => root.unmount());
    host.remove();
    localStorage.removeItem("imperial_lang");
    if (resizeObserverDescriptor) {
      Object.defineProperty(globalThis, "ResizeObserver", resizeObserverDescriptor);
    } else {
      Reflect.deleteProperty(globalThis, "ResizeObserver");
    }
  });

  it("announces field errors and focuses the first invalid field", () => {
    act(() => root.render(<LeadForm mode="booking" />));

    const form = host.querySelector("form");
    expect(form).not.toBeNull();
    act(() => {
      form!.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
    });

    const fullName = host.querySelector<HTMLInputElement>("#fullName");
    expect(fullName).toHaveAttribute("aria-invalid", "true");
    const errorId = fullName?.getAttribute("aria-describedby");
    expect(errorId).toBe("fullName-error");
    expect(host.querySelector(`#${errorId}`)).toHaveAttribute("role", "alert");
    expect(document.activeElement).toBe(fullName);
  });

  it("offers the client-provided general and special consultation types", () => {
    act(() => root.render(<LeadForm mode="booking" />));

    const options = Array.from(
      host.querySelectorAll<HTMLSelectElement>("#service option"),
      (option) => option.textContent,
    );
    expect(options).toContain("General consultation");
    expect(options).toContain("Special consultation");
  });

  it("shows Nepali consultation options with a human-review note", () => {
    localStorage.setItem("imperial_lang", "ne");
    act(() =>
      root.render(
        <LangProvider>
          <LeadForm mode="booking" />
        </LangProvider>,
      ),
    );

    const options = Array.from(
      host.querySelectorAll<HTMLSelectElement>("#service option"),
      (option) => option.textContent,
    );
    expect(options).toContain("सामान्य परामर्श");
    expect(options).toContain("विशेष परामर्श");
    expect(host.querySelector("#service-review-note")?.textContent).toContain("मानवीय समीक्षा");
    expect(host.querySelector("#service")?.getAttribute("aria-describedby")).toContain(
      "service-review-note",
    );
  });

  it("provides labeled native radio controls for the eligibility questions", () => {
    act(() => root.render(<EligibilityChecker />));

    const consent = host.querySelector<HTMLInputElement>("#mutual-consent-yes");
    const notRelated = host.querySelector<HTMLInputElement>("#prohibited-relationship-no");

    expect(consent).toHaveAccessibleName("Yes");
    expect(notRelated).toHaveAccessibleName("No");
    expect(consent?.closest("fieldset")).toHaveAccessibleName(
      "Do both applicants freely and mutually consent to the marriage?",
    );
    expect(consent).toHaveAttribute("aria-required", "true");
    expect(notRelated).toHaveAttribute("aria-required", "true");
  });

  it("preserves entered answers and announces required-field errors", () => {
    act(() => root.render(<EligibilityChecker />));

    const age = host.querySelector<HTMLInputElement>("#applicant-1-age");
    const form = host.querySelector("form");
    expect(age).not.toBeNull();
    expect(form).not.toBeNull();

    act(() => {
      const setValue = Object.getOwnPropertyDescriptor(HTMLInputElement.prototype, "value")?.set;
      setValue?.call(age, "24");
      age!.dispatchEvent(new Event("input", { bubbles: true }));
    });

    act(() => {
      form!.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
    });

    expect(age).toHaveValue("24");
    expect(host.querySelector("#applicant-1-marital-status")).toHaveAttribute(
      "aria-invalid",
      "true",
    );
    expect(host.querySelector('[role="alert"]')).toHaveTextContent(
      "Select this applicant's marital status.",
    );
  });
});
