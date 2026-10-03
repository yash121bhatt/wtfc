"use client";

import { useRef, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CheckCircle2, Loader2, Send } from "lucide-react";
import {
  joinSchema,
  sponsorSchema,
  toPublicCode,
  type JoinForm,
  type SponsorForm,
} from "@/lib/validation/schemas";
import { provinces } from "@/data/provinces";
import { sponsorTiers } from "@/data/sponsors";
import { pick } from "@/lib/site";
import { Button } from "@/components/ui/button";
import {
  FieldShell,
  Select,
  SelectWrap,
  SpamGuards,
  TextArea,
  TextInput,
} from "@/components/ui/field";
import { cn } from "@/lib/utils";

type Status =
  | { kind: "idle" }
  | { kind: "loading" }
  | { kind: "success" }
  | { kind: "error" };

function errorLabel(t: (key: string) => string, code?: string) {
  const publicCode = toPublicCode(code);
  return publicCode ? t(`errors.${publicCode}`) : undefined;
}

/* ------------------------------------------------------------------ */
/* Membership application                                              */
/* ------------------------------------------------------------------ */

export function MembershipForm({ defaultType }: { defaultType: "individual" | "corporate" }) {
  const t = useTranslations("forms");
  const locale = useLocale();
  const renderedAt = useRef(Date.now());
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<JoinForm["Input"], unknown, JoinForm["Values"]>({
    resolver: zodResolver(joinSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      company: "",
      role: "",
      province: "",
      membershipType: defaultType,
      message: "",
    },
  });

  const err = (field: keyof JoinForm["Input"]) =>
    errorLabel(t, errors[field]?.message as string | undefined);

  async function onSubmit(values: JoinForm["Values"]) {
    setStatus({ kind: "loading" });
    try {
      const response = await fetch("/api/join", {
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
    return <SuccessPanel message={t("joinSuccess")} />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="relative flex flex-col gap-5">
      <SpamGuards />

      <fieldset>
        <legend className="text-sm font-medium text-ink">
          {t("membershipType")}
        </legend>
        <div className="mt-2.5 flex flex-wrap gap-2">
          {(["individual", "corporate"] as const).map((option) => {
            const label =
              option === "individual"
                ? t("membershipIndividual")
                : t("membershipCorporate");
            return (
              <label key={option} htmlFor={`membership-${option}`} className="cursor-pointer">
                <input
                  id={`membership-${option}`}
                  type="radio"
                  value={option}
                  {...register("membershipType")}
                  className="peer sr-only"
                />
                <span className="inline-flex rounded-full border border-line px-5 py-2.5 text-sm font-semibold text-body transition-colors peer-checked:border-brand-500 peer-checked:bg-brand-500 peer-checked:text-white peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand-500">
                  {label}
                </span>
              </label>
            );
          })}
        </div>
      </fieldset>

      <div className="grid gap-5 sm:grid-cols-2">
        <FieldShell label={t("firstName")} htmlFor="j-first" required error={err("firstName")}>
          <TextInput {...register("firstName")} id="j-first" autoComplete="given-name" invalid={Boolean(errors.firstName)} />
        </FieldShell>
        <FieldShell label={t("lastName")} htmlFor="j-last" required error={err("lastName")}>
          <TextInput {...register("lastName")} id="j-last" autoComplete="family-name" invalid={Boolean(errors.lastName)} />
        </FieldShell>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <FieldShell label={t("email")} htmlFor="j-email" required error={err("email")}>
          <TextInput {...register("email")} id="j-email" type="email" autoComplete="email" invalid={Boolean(errors.email)} />
        </FieldShell>
        <FieldShell label={t("phone")} htmlFor="j-phone" optionalLabel={t("optional")} error={err("phone")}>
          <TextInput {...register("phone")} id="j-phone" type="tel" autoComplete="tel" invalid={Boolean(errors.phone)} />
        </FieldShell>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <FieldShell label={t("company")} htmlFor="j-company" optionalLabel={t("optional")}>
          <TextInput {...register("company")} id="j-company" autoComplete="organization" />
        </FieldShell>
        <FieldShell label={t("role")} htmlFor="j-role" optionalLabel={t("optional")}>
          <TextInput {...register("role")} id="j-role" autoComplete="organization-title" />
        </FieldShell>
      </div>

      <FieldShell label={t("province")} htmlFor="j-province" optionalLabel={t("optional")}>
        <SelectWrap>
          <Select {...register("province")} id="j-province" defaultValue="">
            <option value="">—</option>
            {provinces.map((province) => (
              <option key={province.en} value={province.en}>
                {pick(province, locale)}
              </option>
            ))}
          </Select>
        </SelectWrap>
      </FieldShell>

      <FieldShell label={t("message")} htmlFor="j-message" optionalLabel={t("optional")}>
        <TextArea {...register("message")} id="j-message" rows={4} />
      </FieldShell>

      <input type="hidden" name="locale" value={locale} />

      <SubmitRow status={status} label={t("joinSubmit")} busyLabel={t("submitting")} />
    </form>
  );
}

/* ------------------------------------------------------------------ */
/* Sponsorship enquiry                                                 */
/* ------------------------------------------------------------------ */

export function SponsorForm() {
  const t = useTranslations("forms");
  const locale = useLocale();
  const renderedAt = useRef(Date.now());
  const [status, setStatus] = useState<Status>({ kind: "idle" });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SponsorForm["Input"], unknown, SponsorForm["Values"]>({
    resolver: zodResolver(sponsorSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      company: "",
      role: "",
      tier: "partner",
      message: "",
    },
  });

  const err = (field: keyof SponsorForm["Input"]) =>
    errorLabel(t, errors[field]?.message as string | undefined);

  async function onSubmit(values: SponsorForm["Values"]) {
    setStatus({ kind: "loading" });
    try {
      const response = await fetch("/api/sponsor", {
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
    return <SuccessPanel message={t("sponsorSuccess")} />;
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="relative flex flex-col gap-5">
      <SpamGuards />

      <div className="grid gap-5 sm:grid-cols-2">
        <FieldShell label={t("firstName")} htmlFor="s-first" required error={err("firstName")}>
          <TextInput {...register("firstName")} id="s-first" autoComplete="given-name" invalid={Boolean(errors.firstName)} />
        </FieldShell>
        <FieldShell label={t("lastName")} htmlFor="s-last" required error={err("lastName")}>
          <TextInput {...register("lastName")} id="s-last" autoComplete="family-name" invalid={Boolean(errors.lastName)} />
        </FieldShell>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <FieldShell label={t("email")} htmlFor="s-email" required error={err("email")}>
          <TextInput {...register("email")} id="s-email" type="email" autoComplete="email" invalid={Boolean(errors.email)} />
        </FieldShell>
        <FieldShell label={t("company")} htmlFor="s-company" required error={err("company")}>
          <TextInput {...register("company")} id="s-company" autoComplete="organization" invalid={Boolean(errors.company)} />
        </FieldShell>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <FieldShell label={t("phone")} htmlFor="s-phone" optionalLabel={t("optional")} error={err("phone")}>
          <TextInput {...register("phone")} id="s-phone" type="tel" autoComplete="tel" invalid={Boolean(errors.phone)} />
        </FieldShell>
        <FieldShell label={t("role")} htmlFor="s-role" optionalLabel={t("optional")}>
          <TextInput {...register("role")} id="s-role" autoComplete="organization-title" />
        </FieldShell>
      </div>

      <FieldShell label={t("tier")} htmlFor="s-tier" required error={err("tier")}>
        <SelectWrap>
          <Select {...register("tier")} id="s-tier">
            {sponsorTiers.map((tier) => (
              <option key={tier.key} value={tier.key}>
                {pick(tier.name, locale)} — {pick(tier.price, locale)}
              </option>
            ))}
            <option value="custom">{t("tierCustom")}</option>
          </Select>
        </SelectWrap>
      </FieldShell>

      <FieldShell label={t("message")} htmlFor="s-message" optionalLabel={t("optional")}>
        <TextArea {...register("message")} id="s-message" rows={4} />
      </FieldShell>

      <input type="hidden" name="locale" value={locale} />

      <SubmitRow status={status} label={t("sponsorSubmit")} busyLabel={t("submitting")} />
    </form>
  );
}

/* ------------------------------------------------------------------ */

function SubmitRow({
  status,
  label,
  busyLabel,
}: {
  status: Status;
  label: string;
  busyLabel: string;
}) {
  const t = useTranslations("forms");
  return (
    <div className="flex flex-wrap items-center gap-4">
      <Button type="submit" size="lg" disabled={status.kind === "loading"}>
        {status.kind === "loading" ? (
          <>
            <Loader2 className="size-4 animate-spin" aria-hidden="true" />
            {busyLabel}
          </>
        ) : (
          <>
            <Send className="size-4" aria-hidden="true" />
            {label}
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
  );
}

function SuccessPanel({ message }: { message: string }) {
  return (
    <div
      role="status"
      className="flex flex-col items-center gap-3 rounded-2xl border border-brand-200 bg-brand-50/60 px-6 py-14 text-center"
    >
      <CheckCircle2 className="size-12 text-brand-600" aria-hidden="true" />
      <p className="text-lg font-semibold text-ink">{message}</p>
    </div>
  );
}

export const FORM_PANEL = cn(
  "rounded-3xl border border-line bg-white p-6 shadow-[0_30px_70px_-50px_rgb(14_16_20/0.6)] sm:p-10",
);
