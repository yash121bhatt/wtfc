import { useTranslations } from "next-intl";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";

export function CtaBand() {
  const t = useTranslations("cta");

  return (
    <section className="band-tint py-20 sm:py-24">
      <div className="container-page">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl border border-brand-200 bg-gradient-to-br from-brand-50 via-white to-brand-100 px-6 py-14 text-center sm:px-14">
            <div
              aria-hidden="true"
              className="absolute -right-20 -top-20 size-64 rounded-full bg-brand-200/40 blur-3xl"
            />
            <h2 className="relative text-3xl font-extrabold tracking-tight text-ink sm:text-4xl">
              {t("title")}
            </h2>
            <p className="relative mx-auto mt-4 max-w-2xl text-base leading-relaxed text-body">
              {t("body")}
            </p>
            <div className="relative mt-9 flex flex-wrap items-center justify-center gap-3">
              <ButtonLink href="/join" size="lg">
                {t("primary")}
                <ArrowUpRight className="size-4" aria-hidden="true" />
              </ButtonLink>
              <ButtonLink href="/contact" size="lg" variant="secondary">
                <MessageCircle className="size-4" aria-hidden="true" />
                {t("secondary")}
              </ButtonLink>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
