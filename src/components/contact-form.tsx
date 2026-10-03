"use client";

import { useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import {
  contactSchema,
  toPublicCode,
  type ContactForm,
} from "@/lib/validation/schemas";
import { Button } from "@/components/ui/button";
import { FieldShell, SpamGuards, TextArea, TextInput } from "@/components/ui/field";

const FIELD_CLASS = "";

export function ContactForm() {
  const t = useTranslations("forms");
  const locale = useLocale();
  const renderedAt = useRef(Date.now());

  const [status, setStatus] = useState<
    { kind: "idle" } | { kind: "loading" } | { kind: "success" } | { kind: "error" }
  >({ kind: "idle" });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ContactForm["Input"], unknown, ContactForm["Values"]>({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      subject: "",
      message: "",
    },
  });

  const err = (field: keyof ContactForm["Input"]) => {
    const code = toPublicCode(errors[field]?.message as string | undefined);
    return code ? t(`errors.${code}`) : undefined;
  };

  async function onSubmit(values: ContactForm["Values"]) {
    setStatus({ kind: "loading" });
    try {
      const response = await fetch("/api/contact", {
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
    } catch {
      setStatus({ kind: "error" });
    }
  }

  if (status.kind === "success") {
    return (
      <div
        role="status"
        className="flex flex-col items-center gap-3 rounded-2xl border border-brand-200 bg-brand-50/60 px-6 py-16 text-center"
      >
        <CheckCircle2 className="size-12 text-brand-600" aria-hidden="true" />
        <p className="text-lg font-semibold text-ink">{t("contactSuccess")}</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="relative flex flex-col gap-5">
      <SpamGuards />

      <div className="grid gap-5 sm:grid-cols-2">
        <FieldShell label={t("firstName")} htmlFor="firstName" required error={err("firstName")}>
          <TextInput
            {...register("firstName")}
            id="firstName"
            autoComplete="given-name"
            invalid={Boolean(errors.firstName)}
            className={FIELD_CLASS}
          />
        </FieldShell>

        <FieldShell label={t("lastName")} htmlFor="lastName" required error={err("lastName")}>
          <TextInput
            {...register("lastName")}
            id="lastName"
            autoComplete="family-name"
            invalid={Boolean(errors.lastName)}
          />
        </FieldShell>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <FieldShell label={t("email")} htmlFor="email" required error={err("email")}>
          <TextInput
            {...register("email")}
            id="email"
            type="email"
            autoComplete="email"
            invalid={Boolean(errors.email)}
          />
        </FieldShell>

        <FieldShell
          label={t("phone")}
          htmlFor="phone"
          optionalLabel={t("optional")}
          error={err("phone")}
        >
          <TextInput
            {...register("phone")}
            id="phone"
            type="tel"
            autoComplete="tel"
            invalid={Boolean(errors.phone)}
          />
        </FieldShell>
      </div>

      <FieldShell label={t("subject")} htmlFor="subject" required error={err("subject")}>
        <TextInput
          {...register("subject")}
          id="subject"
          invalid={Boolean(errors.subject)}
        />
      </FieldShell>

      <FieldShell label={t("message")} htmlFor="message" required error={err("message")}>
        <TextArea
          {...register("message")}
          id="message"
          rows={6}
          invalid={Boolean(errors.message)}
        />
      </FieldShell>

      <input type="hidden" name="locale" value={locale} />

      <div className="flex flex-wrap items-center gap-4">
        <Button type="submit" size="lg" disabled={status.kind === "loading"}>
          {status.kind === "loading" ? (
            <>
              <Loader2 className="size-4 animate-spin" aria-hidden="true" />
              {t("sending")}
            </>
          ) : (
            <>
              <Send className="size-4" aria-hidden="true" />
              {t("send")}
            </>
          )}
        </Button>

        <p
          role="alert"
          className="text-sm font-medium text-red-600"
          hidden={status.kind !== "error"}
        >
          {status.kind === "error" ? t("errorGeneric") : ""}
        </p>
      </div>
    </form>
  );
}
