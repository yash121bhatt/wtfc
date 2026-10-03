"use client";

import { useLocale, useTranslations } from "next-intl";
import { Languages } from "lucide-react";
import { routing, type Locale } from "@/i18n/routing";
import { usePathname, useRouter } from "@/i18n/navigation";
import { useTransition } from "react";
import { cn } from "@/lib/utils";

export function LanguageSwitcher({ className }: { className?: string }) {
  const t = useTranslations("langSwitcher");
  const current = useLocale() as Locale;
  const pathname = usePathname();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const switchTo = (next: Locale) => {
    if (next === current) return;
    startTransition(() => {
      router.replace(pathname, { locale: next });
    });
  };

  return (
    <div
      className={cn("flex items-center gap-1", className)}
      role="group"
      aria-label={t("label")}
    >
      <Languages
        className="hidden size-4 text-brand-600 sm:block"
        aria-hidden="true"
      />
      {routing.locales.map((locale) => {
        const isActive = locale === current;
        return (
          <button
            key={locale}
            type="button"
            onClick={() => switchTo(locale)}
            aria-current={isActive ? "true" : undefined}
            disabled={isPending}
            className={cn(
              "rounded-full px-2.5 py-1 text-xs font-semibold transition-colors",
              isActive
                ? "bg-brand-500 text-white"
                : "text-body hover:bg-brand-50 hover:text-brand-700",
              isPending && "opacity-60",
            )}
          >
            {t(locale)}
          </button>
        );
      })}
    </div>
  );
}
