import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { routing } from "@/i18n/routing";
import { assertLocale } from "@/lib/locale";
import { buildMetadata } from "@/lib/seo";
import { PageHero } from "@/components/page-hero";
import { CareersExplorer } from "@/components/careers-explorer";
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
  return buildMetadata(assertLocale(locale), "meta.careers");
}

export default async function CareersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = assertLocale((await params).locale);
  setRequestLocale(locale);
  const t = await getTranslations("careersPage");

  return (
    <>
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        subtitle={t("body")}
        image="/images/events-2.jpg"
        imageAlt="A driver at work"
      />

      <section className="bg-night pb-20">
        <div className="container-page">
          <CareersExplorer locale={locale} />
        </div>
      </section>

      <NewsletterBand />
      <CtaBand />
    </>
  );
}
