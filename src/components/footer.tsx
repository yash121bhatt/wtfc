import { useTranslations } from "next-intl";
import { Mail, MapPin } from "lucide-react";
import { Link } from "@/i18n/navigation";
import { SITE } from "@/lib/site";
import { NewsletterForm } from "@/components/newsletter-form";
import { SocialIcon, type SocialName } from "@/components/ui/social-icon";

const quickLinks = ["about", "events", "careers", "impact", "contact"] as const;

export function Footer() {
  const t = useTranslations("footer");
  const tNav = useTranslations("nav");

  return (
    <footer className="border-t border-line bg-surface">
      <div className="container-page grid gap-10 py-16 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <h2 className="text-base font-bold text-ink">{t("aboutTitle")}</h2>
          <p className="mt-3 text-sm leading-relaxed text-body">{t("aboutBody")}</p>
        </div>

        <nav aria-label={tNav("footer.label")}>
          <h2 className="text-base font-bold text-ink">{t("quickLinksTitle")}</h2>
          <ul className="mt-3 flex flex-col gap-2">
            {quickLinks.map((item) => (
              <li key={item}>
                <Link
                  href={`/${item}`}
                  className="text-sm text-body transition-colors hover:text-brand-700"
                >
                  {tNav(item)}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h2 className="text-base font-bold text-ink">{t("contactTitle")}</h2>
          <ul className="mt-3 flex flex-col gap-3 text-sm text-body">
            <li>
              <Link
                href="/contact"
                className="inline-flex items-center gap-2 transition-colors hover:text-brand-700"
              >
                <MapPin className="size-4 shrink-0 text-brand-500" aria-hidden="true" />
                {t("address")}
              </Link>
            </li>
            <li>
              <a
                href={`mailto:${SITE.email}`}
                className="inline-flex items-center gap-2 transition-colors hover:text-brand-700"
              >
                <Mail className="size-4 shrink-0 text-brand-500" aria-hidden="true" />
                {t("email")}
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="text-base font-bold text-ink">{t("stayConnectedTitle")}</h2>
          <NewsletterForm layout="stacked" className="mt-3" />

          <h3 className="mt-7 text-sm font-bold text-ink">{t("followUsTitle")}</h3>
          <ul className="mt-3 flex items-center gap-2">
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
      </div>

      <div className="border-t border-line">
        <div className="container-page flex flex-col items-center justify-between gap-2 py-6 text-xs text-body sm:flex-row">
          <p>
            © {new Date().getFullYear()} {SITE.name}. {t("rights")}
          </p>
          <p>
            {t("builtWith")}{" "}
            <span className="font-semibold text-brand-700">WTFC</span>
          </p>
        </div>
      </div>
    </footer>
  );
}
