"use client";

import { useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import { newsletterSchema, type NewsletterForm } from "@/lib/validation/schemas";
import { Button } from "@/components/ui/button";
import { TextInput } from "@/components/ui/field";
import { cn } from "@/lib/utils";

type Props = {
  /** `inline` sits inside a section, `stacked` inside the footer. */
  layout?: "inline" | "stacked";
  className?: string;
};

export function NewsletterForm({ layout = "inline", className }: Props) {
  const t = useTranslations("newsletter");
  const tForms = useTranslations("forms");
  const locale = useLocale();
  const renderedAt = useRef(Date.now());

  const [status, setStatus] = useState<
    | { kind: "idle" }
    | { kind: "loading" }
    | { kind: "success" }
    | { kind: "error" }
  >({ kind: "idle" });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<NewsletterForm["Input"], unknown, NewsletterForm["Values"]>({
    resolver: zodResolver(newsletterSchema),
    defaultValues: { firstName: "", email: "" },
  });

  async function onSubmit(values: NewsletterForm["Values"]) {
    setStatus({ kind: "loading" });
    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...values,
          locale,
          renderedAt: renderedAt.current,
        }),
      });
      if (!response.ok) throw new Error("request failed");
      setStatus({ kind: "success" });
      reset();
    } catch {
      setStatus({ kind: "error" });
    }
  }

  if (status.kind === "success") {
    return (
      <p
        role="status"
        className={cn(
          "flex items-center gap-2 text-sm font-semibold text-brand-700",
          className,
        )}
      >
        <CheckCircle2 className="size-5 shrink-0" aria-hidden="true" />
        {t("success")}
      </p>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className={cn(
        layout === "inline"
          ? "flex flex-col gap-3 sm:flex-row sm:items-start"
          : "flex flex-col gap-3",
        className,
      )}
    >
      <TextInput
        {...register("firstName")}
        type="text"
        autoComplete="given-name"
        placeholder={t("placeholderName")}
        aria-label={t("placeholderName")}
        className={layout === "inline" ? "sm:max-w-45" : undefined}
      />

      <div className={cn(layout === "inline" && "flex-1")}>
        <TextInput
          {...register("email")}
          type="email"
          required
          autoComplete="email"
          placeholder={t("placeholderEmail")}
          aria-label={t("placeholderEmail")}
          aria-invalid={Boolean(errors.email) || undefined}
          aria-describedby={errors.email ? "newsletter-email-error" : undefined}
        />
        {errors.email ? (
          <p
            id="newsletter-email-error"
            role="alert"
            className="mt-1.5 text-xs font-medium text-red-600"
          >
            {tForms("errors.email")}
          </p>
        ) : null}
      </div>

      <input type="hidden" name="locale" value={locale} />
      {/* Honeypot: invisible to humans, irresistible to bots. */}
      <div aria-hidden="true" className="absolute left-[-9999px] h-0 w-0 overflow-hidden">
        <label htmlFor="newsletter-website">Website</label>
        <input
          id="newsletter-website"
          type="text"
          tabIndex={-1}
          autoComplete="off"
          {...register("website")}
        />
      </div>

      <Button
        type="submit"
        disabled={status.kind === "loading"}
        className={cn("shrink-0", layout === "inline" && "sm:px-5")}
      >
        {status.kind === "loading" ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            {t("loading")}
          </>
        ) : (
          <>
            {layout === "inline" ? t("submit") : t("submitFooter")}
            <ArrowRight className="size-4" aria-hidden="true" />
          </>
        )}
      </Button>

      <p
        role="alert"
        className={cn(
          "text-xs font-medium text-red-600",
          status.kind === "error" ? "block" : "sr-only",
        )}
      >
        {status.kind === "error" ? t("error") : ""}
      </p>
    </form>
  );
}
