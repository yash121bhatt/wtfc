import { notFound } from "next/navigation";
import { hasLocale } from "next-intl";
import { routing, type Locale } from "@/i18n/routing";

/**
 * Narrows the dynamic `[locale]` segment to the configured union, 404ing on
 * anything else. Call this at the top of every page before touching `locale`.
 */
export function assertLocale(value: string): Locale {
  if (!hasLocale(routing.locales, value)) notFound();
  return value;
}
