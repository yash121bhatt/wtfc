import type { Metadata } from "next";
import Link from "next/link";
import { Compass } from "lucide-react";
import "./globals.css";

/**
 * Root 404. Unlike `app/[locale]/not-found.tsx` this renders its own
 * `<html>`: there is no `app/layout.tsx`, so this document is responsible for
 * the shell whenever a URL matches no route at all.
 *
 * Copy is bilingual and inline rather than routed through next-intl, because
 * `getMessages()` depends on the locale layout that never ran for this request.
 */
export const metadata: Metadata = {
  title: "Page not found | Women's Trucking Federation of Canada",
  description: "The page you are looking for has moved or no longer exists.",
};

export default function RootNotFound() {
  return (
    <html lang="en">
      <body className="min-h-dvh bg-white antialiased">
        <main className="relative isolate grid min-h-dvh place-items-center overflow-hidden px-6 py-24">
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-br from-brand-50 via-white to-brand-100"
          />

          <div className="relative flex max-w-xl flex-col items-center text-center">
            <span className="grid size-16 place-items-center rounded-2xl bg-brand-500 text-white">
              <Compass className="size-8" aria-hidden="true" />
            </span>

            <p className="mt-8 text-6xl font-extrabold tracking-tight text-brand-600 sm:text-7xl">
              404
            </p>

            <h1 className="mt-4 text-3xl font-bold text-ink sm:text-4xl">
              404 — This road ends here
            </h1>
            <p className="mt-4 text-base leading-relaxed text-body">
              The page you&apos;re looking for has moved or never existed.
              Let&apos;s get you back on the route.
            </p>
            <p className="mt-2 text-sm leading-relaxed text-body/80">
              La page que vous cherchez a été déplacée ou n&apos;a jamais existé.
            </p>

            <div className="mt-9 flex flex-wrap justify-center gap-3">
              <Link
                href="/en"
                className="inline-flex h-13 items-center rounded-full bg-brand-500 px-8 text-base font-semibold text-white shadow-[0_10px_30px_-12px_rgb(198_47_160/0.7)] transition-colors hover:bg-brand-700"
              >
                Back to home
              </Link>
              <Link
                href="/fr"
                className="inline-flex h-13 items-center rounded-full border border-brand-200 px-8 text-base font-semibold text-brand-700 transition-colors hover:border-brand-400 hover:bg-brand-50"
              >
                Retour à l&apos;accueil
              </Link>
            </div>
          </div>
        </main>
      </body>
    </html>
  );
}