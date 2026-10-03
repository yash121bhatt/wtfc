import { Compass } from "lucide-react";
import { Link } from "@/i18n/navigation";

/**
 * Locale-aware 404 for unmatched paths *inside* a valid locale segment
 * (e.g. `/en/typo`). The root `app/not-found.tsx` covers everything else.
 */
export default function LocaleNotFound() {
  return (
    <section className="relative isolate grid min-h-[70vh] place-items-center overflow-hidden px-6 py-24">
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
          The page you&apos;re looking for has moved or never existed. Let&apos;s
          get you back on the route.
        </p>

        <Link
          href="/"
          className="mt-9 inline-flex h-13 items-center rounded-full bg-brand-500 px-8 text-base font-semibold text-white shadow-[0_10px_30px_-12px_rgb(198_47_160/0.7)] transition-colors hover:bg-brand-700"
        >
          Back to home
        </Link>
      </div>
    </section>
  );
}