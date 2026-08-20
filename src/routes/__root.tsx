import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {
  Outlet,
  Link,
  createRootRouteWithContext,
  useRouter,
  HeadContent,
  Scripts,
} from "@tanstack/react-router";
import { useEffect, type ReactNode } from "react";

import appCss from "../styles.css?url";
import { reportLovableError } from "../lib/lovable-error-reporting";
import { SiteShell } from "@/components/layout/SiteShell";
import { Toaster } from "@/components/ui/sonner";
import { site } from "@/lib/site";
import { attachBasicClickSound } from "@/lib/basic-click-sound";

function NotFoundComponent() {
  return (
    <div className="container-page py-32 text-center">
      <p className="text-sm font-semibold uppercase tracking-[0.2em] text-primary">Error 404</p>
      <h1 className="mt-4 text-6xl md:text-8xl font-bold tracking-tight">Page not found</h1>
      <p className="mt-4 text-muted-foreground max-w-md mx-auto">
        The page you were looking for may have moved, or you may have entered a wrong link. Please return to the homepage or contact {site.name} directly.
      </p>
      <div className="mt-8 flex flex-wrap justify-center gap-3">
        <Link to="/" className="inline-flex items-center rounded-full gradient-teal px-6 py-3 text-sm font-semibold text-white shadow-soft">
          Back home
        </Link>
        <Link to="/contact" className="inline-flex items-center rounded-full border border-border px-6 py-3 text-sm font-semibold text-foreground">
          Contact clinic
        </Link>
      </div>
    </div>
  );
}
function ErrorComponent({ error, reset }: { error: Error; reset: () => void }) {
  console.error(error);
  const router = useRouter();
  useEffect(() => {
    reportLovableError(error, { boundary: "tanstack_root_error_component" });
  }, [error]);

  return (
    <div className="container-page py-32 text-center">
      <h1 className="text-3xl font-bold">Something went wrong</h1>
      <p className="mt-3 text-muted-foreground">Please try again in a moment.</p>
      <div className="mt-6 flex gap-3 justify-center">
        <button
          onClick={() => { router.invalidate(); reset(); }}
          className="rounded-full gradient-teal px-6 py-3 text-sm font-semibold text-white"
        >Try again</button>
        <a href="/" className="rounded-full border border-border px-6 py-3 text-sm font-semibold">Go home</a>
      </div>
    </div>
  );
}

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1, maximum-scale=5" },
      { title: `${site.name} — Physiotherapy Clinic in Jhansi` },
      { name: "description", content: `Evidence-based physiotherapy in Jhansi for back pain, sports injury, neurological rehab, post-surgery recovery and wax therapy with ${site.doctor}.` },
      { name: "author", content: site.name },
      { name: "theme-color", content: "#2563EB" },
      { name: "keywords", content: "physiotherapy in Jhansi, physiotherapist near me Jhansi, best physiotherapy clinic Jhansi, wax therapy Jhansi, physiotherapy clinic near me" },
      { property: "og:title", content: `${site.name} — Physiotherapy Clinic in Jhansi` },
      { property: "og:description", content: `Evidence-based physiotherapy and rehabilitation in Jhansi for pain relief, mobility recovery and long-term wellness.` },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: site.name },
      { property: "og:url", content: "https://arnavpyhsiotherapy.com" },
      { property: "og:image", content: "https://arnavpyhsiotherapy.com/logo.png" },
      { property: "og:image:alt", content: `${site.name} logo and clinic branding` },
      { property: "og:locale", content: "en_IN" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: `${site.name} — Physiotherapy Clinic in Jhansi` },
      { name: "twitter:description", content: `Book physiotherapy in Jhansi for pain relief, sports rehab, neuro rehab and wax therapy.` },
      { name: "twitter:image", content: "https://arnavpyhsiotherapy.com/logo.png" },
      { name: "twitter:image:alt", content: `${site.name} logo and clinic branding` },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "icon", href: "/logo.png", type: "image/png" },
      { rel: "alternate icon", href: "/logo.png", type: "image/png" },
      { rel: "apple-touch-icon", href: "/logo.png" },
      { rel: "manifest", href: "/site.webmanifest" },
      { rel: "canonical", href: "https://arnavpyhsiotherapy.com" },
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

  useEffect(() => {
    const cleanup = attachBasicClickSound();
    return cleanup;
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <SiteShell>
        <Outlet />
      </SiteShell>
      <Toaster position="top-center" richColors />
    </QueryClientProvider>
  );
}
