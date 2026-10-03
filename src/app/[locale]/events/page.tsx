import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { assertLocale } from "@/lib/locale";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/page-hero";
import { ButtonLink } from "@/components/ui/button";
import { EventsExplorer } from "@/components/events-explorer";
import { NewsletterBand } from "@/components/home/newsletter-band";
import { CtaBand } from "@/components/home/cta-band";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata(assertLocale(locale), "meta.events");
}

export default async function EventsPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = assertLocale((await params).locale);
  setRequestLocale(locale);
  const t = await getTranslations("eventsPage");
  const tCard = await getTranslations("eventsSection");

  return (
    <>
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        subtitle={t("body")}
        image="/images/events-1.jpg"
        imageAlt="WTFC conference"
        actions={
          <ButtonLink
            href="/events/bridging-the-barriers-2026-ontario"
            variant="onDark"
          >
            {tCard("viewAll")}
          </ButtonLink>
        }
      />

      <section className="bg-white py-20 sm:py-24">
        <div className="container-page">
          <EventsExplorer locale={locale} />
        </div>
      </section>

      <NewsletterBand />
      <CtaBand />
    </>
  );
}
