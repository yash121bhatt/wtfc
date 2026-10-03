/** Locale-aware date helpers. Every date string on the site goes through here. */

const LOCALE_TAGS: Record<string, string> = {
  en: "en-CA",
  fr: "fr-CA",
};

const tag = (locale: string) => LOCALE_TAGS[locale] ?? "en-CA";

/** Parses `YYYY-MM-DD` as a local date — avoids the UTC off-by-one that
 *  `new Date("2026-09-15")` produces in negative-offset timezones. */
function parse(iso: string): Date {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(year ?? 1970, (month ?? 1) - 1, day ?? 1);
}

type Style = "long" | "short" | "month" | "day" | "weekday" | "year" | "numeric";

export function formatDate(iso: string, locale: string, style: Style = "long") {
  const options: Intl.DateTimeFormatOptions =
    style === "month"
      ? { month: "short" }
      : style === "day"
        ? { day: "2-digit" }
        : style === "weekday"
          ? { weekday: "long", month: "long", day: "numeric" }
          : style === "year"
            ? { year: "numeric" }
            : style === "numeric"
              ? { month: "numeric", day: "numeric", year: "numeric" }
              : style === "short"
                ? { month: "short", day: "numeric", year: "numeric" }
                : { weekday: "long", year: "numeric", month: "long", day: "numeric" };

  return new Intl.DateTimeFormat(tag(locale), options).format(parse(iso));
}

export const formatEventDate = formatDate;

/** "14 – 15 September 2026" style range, collapsing to one date when equal. */
export function formatDateRange(
  startIso: string,
  endIso: string,
  locale: string,
) {
  const start = parse(startIso);
  const end = parse(endIso);
  const localeTag = tag(locale);

  if (startIso === endIso) {
    return new Intl.DateTimeFormat(localeTag, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    }).format(start);
  }

  const sameMonth =
    start.getMonth() === end.getMonth() && start.getFullYear() === end.getFullYear();

  if (sameMonth) {
    const first = new Intl.DateTimeFormat(localeTag, {
      weekday: "long",
      month: "long",
      day: "numeric",
    }).format(start);
    const last = new Intl.DateTimeFormat(localeTag, {
      year: "numeric",
      day: "numeric",
    }).format(end);
    return locale === "fr" ? `${first} au ${last}` : `${first} – ${last}`;
  }

  const first = new Intl.DateTimeFormat(localeTag, {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(start);
  const last = new Intl.DateTimeFormat(localeTag, {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(end);

  return locale === "fr" ? `du ${first} au ${last}` : `${first} – ${last}`;
}

export function isPast(iso: string) {
  return parse(iso).getTime() < Date.now();
}
