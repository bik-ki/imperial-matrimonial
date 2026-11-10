import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  useRouterState,
  HeadContent,
  Scripts,
  type ErrorComponentProps,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { LangProvider } from "@/lib/i18n";
import { ConsultationProvider } from "@/components/site/ConsultationDialog";
import { SiteHeader, SiteFooter, MobileCTABar } from "@/components/site/Layout";
import { WhatsAppFloat } from "@/components/site/WhatsAppButton";
import { ConsultationPromo } from "@/components/site/ConsultationPromo";
import { getSiteSettings } from "@/lib/sanity.server";

function NotFoundComponent() {
  return (
    <div className="flex min-h-[60vh] items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl">404</h1>
        <p className="mt-4 text-muted-foreground">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="mt-6 inline-flex bg-primary px-5 py-2.5 text-sm text-primary-foreground"
        >
          Go home
        </Link>
      </div>
    </div>
  );
}

function ErrorComponent({ error, reset }: ErrorComponentProps) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);
  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="max-w-md text-center">
        <h1 className="text-3xl">This page didn't load</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Something went wrong. Try refreshing or head back home.
        </p>
        <div className="mt-6 flex justify-center gap-2">
          <button
            onClick={() => {
              router.invalidate();
              reset();
            }}
            className="bg-primary px-4 py-2 text-sm text-primary-foreground"
          >
            Try again
          </button>
          <a href="/" className="border px-4 py-2 text-sm">
            Go home
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  loader: () => getSiteSettings(),
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "BiheInCourt — Court Marriage Lawyers in Nepal" },
      {
        name: "description",
        content: "Professional court marriage registration assistance in Kathmandu, Nepal.",
      },
      { property: "og:type", content: "website" },
      { property: "og:image", content: "/thumbnail.png" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:image", content: "/thumbnail.png" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Cormorant+Garamond:wght@400;500;600&family=Manrope:wght@400;500;600;700&display=swap",
      },
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/logo.png", type: "image/png" },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
  errorComponent: ErrorComponent,
});

function RootShell({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  const { queryClient } = Route.useRouteContext();
  const settings = Route.useLoaderData();
  const path = useRouterState({ select: (s) => s.location.pathname });
  const internal = path.startsWith("/internal");
  return (
    <QueryClientProvider client={queryClient}>
      <LangProvider>
        <ConsultationProvider>
          {!internal && <SiteHeader />}
          <main>
            <Outlet />
          </main>
          {!internal && (
            <>
              <SiteFooter socialLinks={settings?.socialLinks} />
              <WhatsAppFloat />
              <MobileCTABar />
              <ConsultationPromo />
            </>
          )}
        </ConsultationProvider>
      </LangProvider>
    </QueryClientProvider>
  );
}
