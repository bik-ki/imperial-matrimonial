import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

const { fetchConsultationPromo, openConsultation } = vi.hoisted(() => ({
  fetchConsultationPromo: vi.fn(),
  openConsultation: vi.fn(),
}));

vi.mock("@/lib/consultation-promo", () => ({ fetchConsultationPromo }));
vi.mock("@tanstack/react-router", () => ({ useNavigate: () => vi.fn() }));
vi.mock("@/components/site/ConsultationDialog", () => ({
  useConsultation: () => ({ open: openConsultation }),
}));

import { ConsultationPromo } from "@/components/site/ConsultationPromo";

describe("Homepage consultation promotion", () => {
  let host: HTMLDivElement;
  let root: Root;

  beforeEach(() => {
    sessionStorage.removeItem("imperial_consultation_promo_dismissed_v2");
    fetchConsultationPromo.mockReset();
    openConsultation.mockReset();
    host = document.createElement("div");
    document.body.append(host);
    root = createRoot(host);
  });

  afterEach(() => {
    act(() => root.unmount());
    host.remove();
  });

  it("shows a default welcome promotion when CMS content is not configured", async () => {
    fetchConsultationPromo.mockResolvedValue(null);

    await act(async () => {
      root.render(<ConsultationPromo />);
      await Promise.resolve();
    });

    expect(document.body.querySelector('[role="dialog"]')).toBeInTheDocument();
    expect(document.body).toHaveTextContent("Planning a court marriage in Nepal?");
  });

  it("uses the enabled CMS promotion and opens consultation from its button", async () => {
    fetchConsultationPromo.mockResolvedValue({
      enabled: true,
      image: null,
      imageAlt: "",
      heading: "CMS-managed promotion",
      message: "CMS-managed message",
      buttonLabel: "Ask our team",
      destination: "consultation",
    });

    await act(async () => {
      root.render(<ConsultationPromo />);
      await Promise.resolve();
    });

    expect(document.body).toHaveTextContent("CMS-managed promotion");
    const cta = Array.from(document.body.querySelectorAll("button")).find(
      (button) => button.textContent?.trim() === "Ask our team",
    );
    expect(cta).toBeDefined();

    act(() => cta?.dispatchEvent(new MouseEvent("click", { bubbles: true })));

    expect(openConsultation).toHaveBeenCalledOnce();
    expect(sessionStorage.getItem("imperial_consultation_promo_dismissed_v2")).toBe("true");
  });

  it("can be closed from the popup and stays dismissed for the tab session", async () => {
    fetchConsultationPromo.mockResolvedValue(null);

    await act(async () => {
      root.render(<ConsultationPromo />);
      await Promise.resolve();
    });

    const close = Array.from(document.body.querySelectorAll<HTMLButtonElement>("button")).find(
      (button) => button.textContent?.trim() === "Close dialog",
    );
    expect(close).toBeDefined();

    act(() => close?.dispatchEvent(new MouseEvent("click", { bubbles: true })));

    expect(sessionStorage.getItem("imperial_consultation_promo_dismissed_v2")).toBe("true");
    expect(document.body.querySelector('[role="dialog"]')).not.toBeInTheDocument();
  });

  it("respects the CMS disabled setting", async () => {
    fetchConsultationPromo.mockResolvedValue({ enabled: false });

    await act(async () => {
      root.render(<ConsultationPromo />);
      await Promise.resolve();
    });

    expect(document.body.querySelector('[role="dialog"]')).not.toBeInTheDocument();
    expect(document.body).not.toHaveTextContent("Planning a court marriage in Nepal?");
  });
});
