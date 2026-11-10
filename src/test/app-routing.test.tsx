import { QueryClient } from "@tanstack/react-query";
import { createRouter, rootRouteId } from "@tanstack/react-router";
import { describe, expect, it } from "vitest";

import { articles, services } from "@/data/content";
import { routeTree } from "@/routeTree.gen";

// Match routes without running loaders or rendering: loaders may need a server or
// network the test run lacks, and jsdom never loads the stylesheets React waits on.
describe("App routing", () => {
  it("matches a page for / instead of falling back to not found", () => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    const matches = router.matchRoutes("/");

    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });

  it.each([
    "/about",
    "/contact",
    "/process",
    "/eligibility",
    "/gallery",
    "/blog",
    "/services",
    "/legal/privacy",
    "/legal/terms",
    "/legal/disclaimer",
    ...articles.map((article) => `/blog/${article.slug}`),
    ...services.map((service) => `/services/${service.slug}`),
  ])("matches %s", (path) => {
    const router = createRouter({ routeTree, context: { queryClient: new QueryClient() } });

    const matches = router.matchRoutes(path);

    expect(matches.at(-1)?.routeId).not.toBe(rootRouteId);
  });

  it.each(["single-status-certificate", "legal-consultation", "registration-guidance"])(
    "marks unverified details as placeholders for %s",
    (slug) => {
      const service = services.find((item) => item.slug === slug);

      expect(service?.pendingDetails).toContain("Placeholder");
      for (const detail of ["requirements", "legal details", "timelines", "fees"]) {
        expect(service?.pendingDetails?.toLowerCase()).toContain(detail);
      }
    },
  );

  it("marks every current article draft as a placeholder", () => {
    expect(articles.length).toBeGreaterThan(0);
    expect(articles.every((article) => article.isPlaceholder)).toBe(true);
    expect(
      articles.every((article) =>
        article.content.some((block) => block.p.includes("[Placeholder legal content")),
      ),
    ).toBe(true);
  });
});
