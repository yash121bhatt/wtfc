import { SITE } from "@/lib/site";
import { routing, type Locale } from "@/i18n/routing";
import messages from "@/messages/en.json";
import type { Metadata } from "next";

type PageKey =
  | "meta.home"
  | "meta.about"
  | "meta.events"
  | "meta.careers"
  | "meta.contact"
  | "meta.join"
  | "meta.impact"
  | "meta.notFound";

/** Reads a dotted key out of the English catalogue without loading it at runtime. */
function lookup(locale: Locale, key: PageKey): { title: string; description: string } {
  const node = key
    .split(".")
    .reduce<unknown>(
      (acc, part) =>
        acc && typeof acc === "object"
          ? (acc as Record<string, unknown>)[part]
          : undefined,
      messages,
    );
  const value = (node ?? {}) as { title?: string; description?: string };
  return {
    title: value.title ?? SITE.name,
    description: value.description ?? "",
  };
}

export function buildMetadata(locale: Locale, key: PageKey): Metadata {
  const en = lookup("en", key);

  // Localised titles/descriptions come from the message catalogue at render time;
  // this helper wires the alternates, OG tags and canonical URL around them.
  return {
    alternates: {
      canonical: `/${locale}`,
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `/${l}`]),
      ),
    },
    openGraph: {
      title: en.title,
      description: en.description,
      locale: locale === "fr" ? "fr_CA" : "en_CA",
      alternateLocale: locale === "fr" ? "en_CA" : "fr_CA",
    },
  };
}

export function nonprofitJsonLd(locale: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "NGO",
    "@id": `${SITE.url}/#organization`,
    name: SITE.name,
    alternateName: "WTFC",
    url: `${SITE.url}/${locale}`,
    logo: `${SITE.url}/images/logo.png`,
    image: `${SITE.url}/images/hero-group.jpg`,
    email: SITE.email,
    description: lookup(locale, "meta.home").description,
    foundingDate: "2015",
    areaServed: { "@type": "Country", name: "Canada" },
    sameAs: SITE.social.map((social) => social.href),
  };
}

export function eventJsonLd(
  locale: Locale,
  event: {
    title: string;
    startDate: string;
    endDate: string;
    description: string;
    venue: string;
    address: string;
  },
) {
  return {
    "@context": "https://schema.org",
    "@type": "Event",
    name: event.title,
    description: event.description,
    startDate: event.startDate,
    endDate: event.endDate,
    eventStatus: "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: event.venue,
      address: { "@type": "PostalAddress", streetAddress: event.address },
    },
    organizer: { "@type": "NGO", name: SITE.name, url: `${SITE.url}/${locale}` },
  };
}

export function jobJsonLd(
  locale: Locale,
  job: { title: string; company: string; description: string; posted: string; location: string },
) {
  return {
    "@context": "https://schema.org",
    "@type": "JobPosting",
    title: job.title,
    description: job.description,
    datePosted: job.posted,
    employmentType: "FULL_TIME",
    hiringOrganization: {
      "@type": "Organization",
      name: job.company,
      sameAs: `${SITE.url}/${locale}`,
    },
    jobLocation: {
      "@type": "Place",
      address: { "@type": "PostalAddress", addressCountry: "CA", addressLocality: job.location },
    },
  };
}

export function breadcrumbJsonLd(
  locale: Locale,
  trail: { name: string; path: string }[],
) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: trail.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: `${SITE.url}/${locale}${crumb.path === "/" ? "" : crumb.path}`,
    })),
  };
}
