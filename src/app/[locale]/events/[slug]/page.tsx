import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { CalendarDays, Clock, MapPin, Ticket, Users } from "lucide-react";
import { routing, type Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { assertLocale } from "@/lib/locale";
import { buildMetadata, eventJsonLd } from "@/lib/seo";
import { pick } from "@/lib/site";
import { formatDateRange, isPast } from "@/lib/date";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { events, getEvent, sortByDate } from "@/data/events";
import { CtaBand } from "@/components/home/cta-band";

export function generateStaticParams() {
  return routing.locales.flatMap((locale) =>
    events.map((event) => ({ locale, slug: event.slug })),
  );
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: raw, slug } = await params;
  const locale = assertLocale(raw);
  const event = getEvent(slug);
  if (!event) return {};

  const title = pick(event.title, locale);
  const description = pick(event.excerpt, locale);

  return {
    ...buildMetadata(locale, "meta.events"),
    title,
    description,
    alternates: {
      canonical: `/${locale}/events/${slug}`,
      languages: Object.fromEntries(
        routing.locales.map((l) => [l, `/${l}/events/${slug}`]),
      ),
    },
    openGraph: {
      title,
      description,
      type: "website",
      locale: locale === "fr" ? "fr_CA" : "en_CA",
      alternateLocale: locale === "fr" ? "en_CA" : "fr_CA",
      images: [{ url: event.image, alt: title }],
    },
  };
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: raw, slug } = await params;
  const locale: Locale = assertLocale(raw);
  setRequestLocale(locale);

  const event = getEvent(slug);
  if (!event) notFound();

  const t = await getTranslations("eventsPage");
  const past = isPast(event.startDate);

  const related = sortByDate(
    events.filter((other) => other.slug !== event.slug),
    "desc",
  ).slice(0, 3);

  const jsonLd = eventJsonLd(locale, {
    title: pick(event.title, locale),
    startDate: event.startDate,
    endDate: event.endDate,
    description: pick(event.excerpt, locale),
    venue: pick(event.venue, locale),
    address: pick(event.address, locale),
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <section className="relative isolate overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={event.image}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        </div>
        <div className="scrim-hero absolute inset-0" aria-hidden="true" />

        <div className="container-page relative flex min-h-80 flex-col justify-end py-16 sm:min-h-96">
          <Reveal>
            <Link
              href="/events"
              className="text-sm font-semibold text-white/70 transition-colors hover:text-white"
            >
              ← {t("backToList")}
            </Link>
            <p className="mt-4 inline-flex self-start rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.16em] text-white/90 backdrop-blur-sm">
              {past ? t("pastBadge") : t("eyebrow")}
            </p>
            <h1 className="mt-4 max-w-3xl text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
              {pick(event.title, locale)}
            </h1>

            <dl className="mt-7 flex flex-wrap gap-x-8 gap-y-3 text-sm text-white/80">
              <div className="inline-flex items-center gap-2">
                <CalendarDays className="size-4 shrink-0 text-brand-300" aria-hidden="true" />
                <dt className="sr-only">{t("dateLabel")}</dt>
                <dd>
                  <time dateTime={event.startDate}>
                    {formatDateRange(event.startDate, event.endDate, locale)}
                  </time>
                </dd>
              </div>
              <div className="inline-flex items-center gap-2">
                <MapPin className="size-4 shrink-0 text-brand-300" aria-hidden="true" />
                <dt className="sr-only">{t("venueLabel")}</dt>
                <dd>
                  {pick(event.venue, locale)} — {pick(event.city, locale)},{" "}
                  {pick(event.province, locale)}
                </dd>
              </div>
            </dl>

            {event.registrationOpen ? (
              <div className="mt-8">
                <ButtonLink href="/contact" size="lg">
                  <Ticket className="size-4" aria-hidden="true" />
                  {t("registerCta")}
                </ButtonLink>
              </div>
            ) : null}
          </Reveal>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <div className="container-page">
          <div className="grid gap-14 lg:grid-cols-[1.4fr_1fr] lg:gap-20">
            <div className="flex flex-col gap-10">
              <Reveal>
                <h2 className="text-2xl font-bold text-ink">{t("detailAbout")}</h2>
                <div className="mt-5 flex flex-col gap-4 text-base leading-relaxed text-body">
                  {event.body.map((paragraph, index) => (
                    <p key={index}>{pick(paragraph, locale)}</p>
                  ))}
                </div>
              </Reveal>

              {event.schedule?.length ? (
                <Reveal delay={0.08}>
                  <h2 className="text-2xl font-bold text-ink">
                    {t("detailSchedule")}
                  </h2>
                  <ul className="mt-5 divide-y divide-line overflow-hidden rounded-2xl border border-line">
                    {event.schedule.map((item, index) => (
                      <li
                        key={index}
                        className="flex flex-col gap-1 bg-white p-5 sm:flex-row sm:items-center sm:gap-6 sm:p-6"
                      >
                        <span className="inline-flex shrink-0 items-center gap-2 text-sm font-semibold text-brand-700 sm:w-56">
                          <Clock className="size-4" aria-hidden="true" />
                          {pick(item.time, locale)}
                        </span>
                        <span className="text-base text-ink">
                          {pick(item.title, locale)}
                        </span>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ) : null}

              {event.speakers?.length ? (
                <Reveal delay={0.12}>
                  <h2 className="text-2xl font-bold text-ink">
                    {t("detailSpeakers")}
                  </h2>
                  <ul className="mt-5 grid gap-4 sm:grid-cols-2">
                    {event.speakers.map((speaker) => (
                      <li
                        key={speaker.name.en}
                        className="flex items-center gap-4 rounded-2xl border border-line bg-surface p-5"
                      >
                        <span
                          aria-hidden="true"
                          className="grid size-12 shrink-0 place-items-center rounded-full bg-brand-500 text-sm font-bold text-white"
                        >
                          {speaker.name.en
                            .split(" ")
                            .map((part) => part[0])
                            .join("")
                            .slice(0, 2)}
                        </span>
                        <span>
                          <span className="block font-semibold text-ink">
                            {pick(speaker.name, locale)}
                          </span>
                          <span className="block text-sm text-body">
                            {pick(speaker.role, locale)}
                          </span>
                        </span>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              ) : null}

              {event.fees?.length ? (
                <Reveal delay={0.16}>
                  <h2 className="text-2xl font-bold text-ink">
                    {t("detailFees")}
                  </h2>
                  <ul className="mt-5 divide-y divide-line overflow-hidden rounded-2xl border border-line">
                    {event.fees.map((fee) => (
                      <li
                        key={fee.label.en}
                        className="flex items-center justify-between gap-4 bg-white p-5"
                      >
                        <span className="text-sm text-ink">
                          {pick(fee.label, locale)}
                        </span>
                        <span className="font-semibold text-brand-700">
                          {fee.amount}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-4 text-sm text-body">{t("sponsorNote")}</p>
                </Reveal>
              ) : null}
            </div>

            <aside className="lg:sticky lg:top-24 lg:self-start">
              <Reveal delay={0.1}>
                <div className="rounded-2xl border border-line bg-surface p-7">
                  <h2 className="text-lg font-bold text-ink">
                    {t("detailVenue")}
                  </h2>
                  <address className="mt-3 text-sm not-italic leading-relaxed text-body">
                    <span className="block font-medium text-ink">
                      {pick(event.venue, locale)}
                    </span>
                    {pick(event.address, locale)}
                    <br />
                    {pick(event.city, locale)}, {pick(event.province, locale)}
                  </address>

                  <div className="mt-7 overflow-hidden rounded-xl border border-line">
                    <div className="flex aspect-4/3 items-center justify-center bg-brand-50">
                      <Users className="size-10 text-brand-400" aria-hidden="true" />
                    </div>
                  </div>

                  {event.registrationOpen ? (
                    <ButtonLink href="/contact" className="mt-6 w-full">
                      {t("registerCta")}
                    </ButtonLink>
                  ) : null}
                </div>
              </Reveal>
            </aside>
          </div>
        </div>
      </section>

      {related.length ? (
        <section className="band-surface border-t border-line py-20">
          <div className="container-page">
            <h2 className="text-2xl font-bold text-ink">{t("moreEvents")}</h2>
            <ul className="mt-8 grid gap-5 sm:grid-cols-3">
              {related.map((other) => (
                <li key={other.slug}>
                  <Link
                    href={`/events/${other.slug}`}
                    className="card-hover flex h-full flex-col overflow-hidden rounded-2xl border border-line bg-white"
                  >
                    <div className="relative aspect-16/10 overflow-hidden bg-surface">
                      <Image
                        src={other.image}
                        alt=""
                        fill
                        sizes="(max-width: 640px) 100vw, 33vw"
                        className="object-cover transition-transform duration-700 hover:scale-105"
                      />
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <p className="text-xs text-body">
                        <time dateTime={other.startDate}>
                          {formatDateRange(other.startDate, other.endDate, locale)}
                        </time>
                      </p>
                      <p className="mt-2 flex-1 font-semibold text-ink">
                        {pick(other.title, locale)}
                      </p>
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </section>
      ) : null}

      <CtaBand />
    </>
  );
}
