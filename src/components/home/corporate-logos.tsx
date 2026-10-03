import { useLocale, useTranslations } from "next-intl";
import { corporateMembers } from "@/data/partners";
import { pick } from "@/lib/site";
import { Marquee } from "@/components/ui/marquee";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

export function CorporateLogos() {
  const t = useTranslations("logos");
  const locale = useLocale();

  return (
    <section className="border-y border-line bg-white py-16 sm:py-20">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow={t("eyebrow")}
            title={t("title")}
            align="center"
            className="mx-auto items-center"
          />
        </Reveal>
      </div>

      <Reveal delay={0.1}>
        <div className="mt-12">
          <Marquee>
            {corporateMembers.map((member) => (
              <li
                key={member.en}
                className="mx-3 shrink-0 rounded-xl border border-line bg-surface px-7 py-4"
              >
                <span className="whitespace-nowrap text-sm font-semibold tracking-tight text-body/70 transition-colors sm:text-base">
                  {pick(member, locale)}
                </span>
              </li>
            ))}
          </Marquee>
        </div>
      </Reveal>
    </section>
  );
}
