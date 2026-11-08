import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { EligibilityChecker } from "@/components/site/EligibilityChecker";
import { LeadForm } from "@/components/site/ConsultationForm";

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

  it("supports arrow-key selection and roving focus in the eligibility choices", () => {
    act(() => root.render(<EligibilityChecker />));

    const radios = host.querySelectorAll<HTMLButtonElement>('[role="radio"]');
    expect(radios.length).toBeGreaterThan(1);
    expect(radios[0]).toHaveAttribute("tabindex", "0");
    expect(radios[1]).toHaveAttribute("tabindex", "-1");

    act(() => {
      radios[0]!.dispatchEvent(
        new KeyboardEvent("keydown", { key: "ArrowRight", bubbles: true, cancelable: true }),
      );
    });

    expect(radios[1]).toHaveAttribute("aria-checked", "true");
    expect(radios[1]).toHaveAttribute("tabindex", "0");
    expect(document.activeElement).toBe(radios[1]);
  });
});
