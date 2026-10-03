import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Bot, Clock, Mail, MapPin, MessageCircle } from "lucide-react";
import { routing } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { assertLocale } from "@/lib/locale";
import { buildMetadata } from "@/lib/seo";
import { SITE } from "@/lib/site";
import { PageHero } from "@/components/page-hero";
import { SectionHeading } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { ContactForm } from "@/components/contact-form";
import { SocialIcon, type SocialName } from "@/components/ui/social-icon";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  return buildMetadata(assertLocale(locale), "meta.contact");
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const locale = assertLocale((await params).locale);
  setRequestLocale(locale);
  const t = await getTranslations("contactPage");

  const cards = [
    {
      Icon: Mail,
      title: t("emailUs"),
      body: t("emailBody"),
      action: (
        <a
          href={`mailto:${SITE.email}`}
          className="font-semibold text-brand-700 hover:text-brand-800"
        >
          {SITE.email}
        </a>
      ),
    },
    {
      Icon: Bot,
      title: t("aiAssistant"),
      body: t("aiBody"),
      action: (
        <span className="font-semibold text-brand-700">{t("aiCta")}</span>
      ),
    },
    {
      Icon: MapPin,
      title: t("reachTitle"),
      body: t("reachBody"),
      action: (
        <span className="font-semibold text-brand-700">{t("reachValue")}</span>
      ),
    },
  ];

  return (
    <>
      <PageHero
        eyebrow={t("eyebrow")}
        title={t("title")}
        subtitle={t("body")}
        image="/images/contact-1.jpg"
        imageAlt="WTFC team"
      />

      <section className="bg-white py-20 sm:py-24">
        <div className="container-page">
          <ul className="grid gap-5 sm:grid-cols-3">
            {cards.map(({ Icon, title, body, action }, index) => (
              <Reveal as="li" key={title} delay={index * 0.07}>
                <div className="card-hover h-full rounded-2xl border border-line bg-white p-7">
                  <span className="grid size-11 place-items-center rounded-xl bg-brand-500/10 text-brand-600">
                    <Icon className="size-5" aria-hidden="true" />
                  </span>
                  <h2 className="mt-5 font-bold text-ink">{title}</h2>
                  <p className="mt-1.5 text-sm text-body">{body}</p>
                  <p className="mt-4 text-sm">{action}</p>
                </div>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      <section className="band-surface border-y border-line py-20 sm:py-24">
        <div className="container-page">
          <div className="grid gap-14 lg:grid-cols-[1.5fr_1fr] lg:gap-20">
            <Reveal>
              <SectionHeading title={t("formTitle")} />
              <ContactForm />
            </Reveal>

            <Reveal delay={0.12}>
              <div className="flex flex-col gap-6">
                <div className="rounded-2xl border border-line bg-white p-7">
                  <span className="grid size-11 place-items-center rounded-xl bg-brand-500/10 text-brand-600">
                    <Clock className="size-5" aria-hidden="true" />
                  </span>
                  <h2 className="mt-5 font-bold text-ink">{t("hoursTitle")}</h2>
                  <p className="mt-1 text-sm text-body">{t("hoursBody")}</p>

                  <dl className="mt-5 flex flex-col gap-3 text-sm">
                    <div className="flex items-center justify-between gap-4 border-b border-line pb-3">
                      <dt className="text-body">{t("hoursWeekday")}</dt>
                      <dd className="font-semibold text-ink">
                        {t("hoursWeekdayTime")}
                      </dd>
                    </div>
                    <div className="flex items-center justify-between gap-4">
                      <dt className="text-body">{t("hoursWeekend")}</dt>
                      <dd className="font-semibold text-ink">
                        {t("hoursWeekendTime")}
                      </dd>
                    </div>
                  </dl>
                </div>

                <div className="rounded-2xl border border-line bg-white p-7">
                  <span className="grid size-11 place-items-center rounded-xl bg-brand-500/10 text-brand-600">
                    <MessageCircle className="size-5" aria-hidden="true" />
                  </span>
                  <h2 className="mt-5 font-bold text-ink">{t("teamTitle")}</h2>
                  <p className="mt-1.5 text-sm leading-relaxed text-body">
                    {t("teamBody")}
                  </p>

                  <ul className="mt-5 flex items-center gap-2">
                    {SITE.social.map((social) => (
                      <li key={social.href}>
                        <a
                          href={social.href}
                          target="_blank"
                          rel="noopener noreferrer"
                          aria-label={social.label}
                          className="grid size-10 place-items-center rounded-full border border-line text-body transition-colors hover:border-brand-400 hover:bg-brand-50 hover:text-brand-700"
                        >
                          <SocialIcon name={social.icon as SocialName} />
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>

                <div className="rounded-2xl border border-brand-200 bg-brand-50/60 p-7">
                  <h2 className="font-bold text-ink">{t("involvedTitle")}</h2>
                  <p className="mt-1.5 text-sm leading-relaxed text-body">
                    {t("involvedBody")}
                  </p>
                  <ButtonLink href="/join" size="sm" className="mt-5">
                    {t("involvedCta")}
                  </ButtonLink>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      <section className="bg-white py-20 sm:py-24">
        <div className="container-page">
          <Reveal>
            <div className="grid gap-8 rounded-3xl border border-line p-8 sm:p-12 lg:grid-cols-2 lg:items-center">
              <div>
                <SectionHeading title={t("questionsTitle")} description={t("questionsBody")} />
              </div>
              <div className="flex flex-wrap gap-3 lg:justify-end">
                <ButtonLink href="/about">{t("learnAbout")}</ButtonLink>
                <ButtonLink href={`mailto:${SITE.email}`} variant="secondary">
                  {t("emailDirect")}
                </ButtonLink>
                <Link
                  href="/events"
                  className="inline-flex h-11 items-center rounded-full px-2 text-sm font-semibold text-brand-700 hover:text-brand-800"
                >
                  {t("viewEvents")}
                </Link>
              </div>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
