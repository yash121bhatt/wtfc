"use client";

import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Menu, X, ArrowUpRight, CircleUser, ShieldCheck } from "lucide-react";
import Image from "next/image";
import { Link, usePathname } from "@/i18n/navigation";
import { LanguageSwitcher } from "@/components/language-switcher";
import { ButtonLink } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const getInvolved = ["join", "events", "careers", "impact"] as const;
const learnMore = ["about", "contact"] as const;

export function Header() {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the drawer on navigation.
  useEffect(() => setMenuOpen(false), [pathname]);

  // Lock body scroll while the drawer is open.
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!menuOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [menuOpen]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-line bg-white/90 backdrop-blur-lg"
          : "border-b border-transparent bg-white",
      )}
    >
      <div className="container-page flex h-18 items-center justify-between gap-4">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2.5"
          aria-label="WTFC — home"
        >
          <Image
            src="/images/logo.png"
            alt=""
            width={52}
            height={52}
            priority
            className="size-11 object-contain sm:size-12"
          />
          <span className="hidden text-sm font-bold leading-tight tracking-tight text-ink sm:block">
            Women&apos;s Trucking
            <br />
            Federation of Canada
          </span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          <LanguageSwitcher className="hidden lg:flex" />

          <Link
            href="/join"
            className="hidden items-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold text-body transition-colors hover:bg-brand-50 hover:text-brand-700 sm:flex"
          >
            <CircleUser className="size-4" aria-hidden="true" />
            {t("memberLogin")}
          </Link>
          <Link
            href="/join"
            className="hidden items-center gap-1.5 rounded-full px-3 py-2 text-sm font-semibold text-body transition-colors hover:bg-brand-50 hover:text-brand-700 md:flex"
          >
            <ShieldCheck className="size-4" aria-hidden="true" />
            {t("adminLogin")}
          </Link>

          <ButtonLink href="/join" size="sm" className="hidden sm:inline-flex">
            {t("join")}
            <ArrowUpRight className="size-4" aria-hidden="true" />
          </ButtonLink>

          <button
            type="button"
            onClick={() => setMenuOpen((open) => !open)}
            aria-expanded={menuOpen}
            aria-controls="mobile-nav"
            aria-label={menuOpen ? t("closeMenu") : t("openMenu")}
            className="grid size-11 place-items-center rounded-full border border-line text-ink transition-colors hover:border-brand-300 hover:bg-brand-50 lg:hidden"
          >
            {menuOpen ? (
              <X className="size-5" aria-hidden="true" />
            ) : (
              <Menu className="size-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div
        id="mobile-nav"
        hidden={!menuOpen}
        className="border-t border-line bg-white lg:hidden"
      >
        <nav
          aria-label={t("primary.label")}
          className="container-page grid gap-8 py-8 sm:grid-cols-2"
        >
          <MobileGroup title={t("menuGroups.getInvolved")} items={getInvolved} />
          <MobileGroup title={t("menuGroups.learnMore")} items={learnMore} />
        </nav>
        <div className="container-page flex flex-wrap items-center justify-between gap-4 border-t border-line py-5">
          <LanguageSwitcher />
          <div className="flex items-center gap-2">
            <Link
              href="/join"
              className="rounded-full px-3 py-2 text-sm font-semibold text-body hover:bg-brand-50 hover:text-brand-700"
            >
              {t("memberLogin")}
            </Link>
            <Link
              href="/join"
              className="rounded-full px-3 py-2 text-sm font-semibold text-body hover:bg-brand-50 hover:text-brand-700"
            >
              {t("adminLogin")}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}

function MobileGroup({
  title,
  items,
}: {
  title: string;
  items: readonly string[];
}) {
  const t = useTranslations("nav");
  return (
    <div>
      <p className="mb-3 text-xs font-semibold uppercase tracking-[0.18em] text-brand-600">
        {title}
      </p>
      <ul className="flex flex-col gap-1">
        {items.map((item) => (
          <li key={item}>
            <Link
              href={`/${item}`}
              className="block rounded-xl px-3 py-2.5 text-lg font-semibold text-ink transition-colors hover:bg-brand-50 hover:text-brand-700"
            >
              {t(item)}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
