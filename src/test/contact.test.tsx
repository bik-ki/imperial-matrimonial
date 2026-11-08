import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it } from "vitest";

import { ContactForm } from "@/routes/contact";

describe("Contact form preview", () => {
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

  it("does not claim to send or save submitted details", () => {
    act(() => root.render(<ContactForm />));

    const form = host.querySelector("form");
    expect(form).not.toBeNull();
    const name = host.querySelector<HTMLInputElement>("#contact-name");
    const email = host.querySelector<HTMLInputElement>("#contact-email");
    const message = host.querySelector<HTMLTextAreaElement>("#contact-message");
    expect(name).not.toBeNull();
    expect(email).not.toBeNull();
    expect(message).not.toBeNull();
    name!.value = "Sample Person";
    email!.value = "sample@example.test";
    message!.value = "Test enquiry";
    act(() => {
      form!.dispatchEvent(new Event("submit", { bubbles: true, cancelable: true }));
    });

    expect(host.querySelector('[role="status"]')?.textContent).toContain(
      "Not sent: this form has no delivery integration, and your details have not been saved.",
    );
    expect(localStorage.length).toBe(0);
  });
});
