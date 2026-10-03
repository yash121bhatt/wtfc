import { useTranslations } from "next-intl";
import { Accordion, type AccordionItem } from "@/components/ui/accordion";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

const KEYS = ["who", "national", "training", "mentorship", "btb", "sponsor"] as const;

export function Faq() {
  const t = useTranslations("faq");

  const items: AccordionItem[] = KEYS.map((key) => ({
    id: key,
    question: t(`items.${key}.question`),
    answer: t(`items.${key}.answer`),
  }));

  return (
    <section className="band-surface border-y border-line py-20 sm:py-28">
      <div className="container-page">
        <Reveal>
          <SectionHeading
            eyebrow={t("eyebrow")}
            title={t("title")}
            align="center"
            className="mx-auto items-center"
          />
        </Reveal>
        <Reveal delay={0.1}>
          <Accordion items={items} className="mt-12 bg-white" />
        </Reveal>
      </div>
    </section>
  );
}
