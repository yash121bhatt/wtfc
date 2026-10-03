import type { Metadata } from "next";
import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/home/hero";
import { QuickLinks } from "@/components/home/quick-links";
import { Partners } from "@/components/home/partners";
import { WhatWeOffer } from "@/components/home/what-we-offer";
import { Mission } from "@/components/home/mission";
import { ImpactStats } from "@/components/home/impact-stats";
import { CorporateLogos } from "@/components/home/corporate-logos";
import { SponsorshipTiers } from "@/components/home/sponsorship-tiers";
import { Testimonials } from "@/components/home/testimonials";
import { EventsPreview } from "@/components/home/events-preview";
import { CareersPreview } from "@/components/home/careers-preview";
import { Faq } from "@/components/home/faq";
import { NewsletterBand } from "@/components/home/newsletter-band";
import { CtaBand } from "@/components/home/cta-band";
import { routing } from "@/i18n/routing";
import { assertLocale } from "@/lib/locale";
import { buildMetadata, nonprofitJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata(assertLocale(locale), "meta.home");
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: raw } = await params;
  const locale = assertLocale(raw);
  setRequestLocale(locale);

  const jsonLd = nonprofitJsonLd(locale);

  return (
    <>
      <script
        type="application/ld+json"
        // Structured data for search engines; content is ours, not user input.
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <Hero />
      <QuickLinks />
      <Partners />
      <WhatWeOffer />
      <Mission />
      <ImpactStats />
      <CorporateLogos />
      <SponsorshipTiers />
      <Testimonials />
      <EventsPreview />
      <CareersPreview />
      <Faq />
      <NewsletterBand />
      <CtaBand />
    </>
  );
}
