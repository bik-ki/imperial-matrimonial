import { act, type MouseEventHandler, type ReactNode } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { SiteHeader } from "@/components/site/Layout";
import { SocialIcons } from "@/components/site/Layout";
import { InstagramSection, ProcessTimeline } from "@/components/site/Sections";

vi.mock("@tanstack/react-router", () => ({
  Link: ({
    to,
    children,
    activeOptions: _activeOptions,
    params: _params,
    onClick,
    ...props
  }: {
    to: string;
    children: ReactNode;
    activeOptions?: unknown;
    params?: unknown;
    onClick?: MouseEventHandler<HTMLAnchorElement>;
    className?: string;
    "aria-label"?: string;
  }) => (
    <a
      href={to}
      {...props}
      onClick={(event) => {
        event.preventDefault();
        onClick?.(event);
      }}
    >
      {children}
    </a>
  ),
}));

describe("Public site navigation", () => {
  let host: HTMLDivElement;
  let root: Root;

  beforeEach(() => {
    host = document.createElement("div");
    document.body.append(host);
    root = createRoot(host);
    act(() => root.render(<SiteHeader />));
  });

  afterEach(() => {
    act(() => root.unmount());
    host.remove();
  });

  it("supports opening and dismissing the mobile menu with the keyboard", () => {
    const toggle = host.querySelector<HTMLButtonElement>(
      'button[aria-label="Open navigation menu"]',
    );
    const menu = host.querySelector<HTMLElement>("#mobile-navigation");
    expect(toggle).not.toBeNull();
    expect(menu).not.toBeNull();
    expect(toggle?.getAttribute("aria-controls")).toBe("mobile-navigation");
    expect(toggle?.getAttribute("aria-expanded")).toBe("false");
    expect(menu?.hidden).toBe(true);

    act(() => toggle?.dispatchEvent(new MouseEvent("click", { bubbles: true })));
    expect(toggle?.getAttribute("aria-expanded")).toBe("true");
    expect(menu?.hidden).toBe(false);

    act(() => {
      window.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape", bubbles: true }));
    });

    expect(toggle?.getAttribute("aria-expanded")).toBe("false");
    expect(menu?.hidden).toBe(true);
    expect(document.activeElement).toBe(toggle);
  });

  it("points each mobile navigation item to its public route", () => {
    act(() =>
      host
        .querySelector<HTMLButtonElement>('button[aria-label="Open navigation menu"]')
        ?.dispatchEvent(new MouseEvent("click", { bubbles: true })),
    );

    const destinations = Array.from(
      host.querySelectorAll<HTMLAnchorElement>("#mobile-navigation nav a"),
      (link) => link.getAttribute("href"),
    );
    expect(destinations).toEqual([
      "/",
      "/about",
      "/process",
      "/services",
      "/eligibility",
      "/blog",
      "/contact",
    ]);
  });

  it("closes when a navigation link is selected and points services to its index", () => {
    const toggle = host.querySelector<HTMLButtonElement>(
      'button[aria-label="Open navigation menu"]',
    );
    act(() => toggle?.dispatchEvent(new MouseEvent("click", { bubbles: true })));

    const servicesLink = host.querySelector<HTMLAnchorElement>(
      '#mobile-navigation a[href="/services"]',
    );
    expect(servicesLink).not.toBeNull();
    expect(servicesLink?.getAttribute("href")).toBe("/services");

    act(() =>
      servicesLink?.dispatchEvent(new MouseEvent("click", { bubbles: true, cancelable: true })),
    );
    expect(toggle?.getAttribute("aria-expanded")).toBe("false");
    expect(document.activeElement).toBe(toggle);
  });

  it("does not present same-page process links or prototype media as live links", () => {
    act(() =>
      root.render(
        <>
          <ProcessTimeline />
          <InstagramSection />
          <SocialIcons />
        </>,
      ),
    );

    expect(host.querySelector('a[href="/process"]')).toBeNull();
    expect(
      host.querySelectorAll('a[href="https://www.instagram.com/imperialmatrimonial/"]'),
    ).toHaveLength(0);
    expect(host.querySelector('a[href="https://www.instagram.com/"]')).toBeNull();
    expect(host.querySelector('a[href="https://www.facebook.com/"]')).toBeNull();
    expect(host.querySelector('a[href="https://www.tiktok.com/"]')).toBeNull();
    expect(host.querySelector('a[href="https://www.youtube.com/"]')).toBeNull();
    expect(host.querySelectorAll("a").length).toBe(1);
    expect(host.textContent).toContain("verify the Instagram profile URL and handle");
    expect(
      Array.from(host.querySelectorAll("a")).some((link) =>
        link.textContent?.includes("Sample post preview"),
      ),
    ).toBe(false);
  });
});
