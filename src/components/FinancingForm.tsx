"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { MaskedSsnInput } from "@/components/MaskedSsnInput";
import { useLocale } from "@/components/LocaleProvider";

type FormState = {
  fullName: string;
  socialSecurity: string;
  dateOfBirth: string;
  address: string;
  email: string;
  phone: string;
  existingHomeowner: "" | "yes" | "no";
  workType: string;
};

const emptyForm: FormState = {
  fullName: "",
  socialSecurity: "",
  dateOfBirth: "",
  address: "",
  email: "",
  phone: "",
  existingHomeowner: "",
  workType: "",
};

const workTypeKeys = ["remodel", "roofing", "newHome"] as const;

export function FinancingForm() {
  const { t } = useLocale();
  const [form, setForm] = useState<FormState>(emptyForm);
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError("");

    if (!termsAccepted) {
      setError(t.financing.errorTerms);
      return;
    }

    if (
      !form.fullName.trim() ||
      !form.dateOfBirth ||
      !form.address.trim() ||
      !form.email.trim() ||
      !form.phone.trim()
    ) {
      setError(t.financing.errorRequired);
      return;
    }

    if (form.existingHomeowner === "") {
      setError(t.financing.errorHomeowner);
      return;
    }

    if (!form.workType) {
      setError(t.financing.errorWorkType);
      return;
    }

    if (form.socialSecurity.length !== 9) {
      setError(t.financing.errorSsn);
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch("/api/financing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          workType:
            form.workType === "newHome" ? "new-home" : form.workType,
          termsAccepted: true,
        }),
      });

      if (!response.ok) {
        throw new Error("Submission failed.");
      }

      setSubmitted(true);
      setForm(emptyForm);
      setTermsAccepted(false);
    } catch {
      setError(t.financing.errorSubmit);
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="animate-fade-in rounded-sm border border-gold/30 bg-zinc-950 p-6 text-center sm:p-8">
        <h2 className="font-display text-2xl text-white sm:text-3xl">
          {t.financing.successTitle}
        </h2>
        <p className="mt-4 text-sm text-zinc-400 sm:text-base">
          {t.financing.successBody}
        </p>
      </div>
    );
  }

  const canSubmit = !submitting;

  return (
    <form onSubmit={handleSubmit} noValidate className="space-y-8">
      <section className="space-y-5">
        <h2 className="font-display text-xl text-white sm:text-2xl">
          {t.financing.yourInfo}
        </h2>

        <div>
          <label htmlFor="fullName">{t.financing.name}</label>
          <input
            id="fullName"
            name="fullName"
            required
            value={form.fullName}
            onChange={(e) => updateField("fullName", e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="socialSecurity">{t.financing.ssn}</label>
          <MaskedSsnInput
            id="socialSecurity"
            value={form.socialSecurity}
            onChange={(digits) => updateField("socialSecurity", digits)}
            hint={t.financing.ssnHint}
          />
        </div>

        <div>
          <label htmlFor="dateOfBirth">{t.financing.dob}</label>
          <input
            id="dateOfBirth"
            name="dateOfBirth"
            type="date"
            required
            value={form.dateOfBirth}
            onChange={(e) => updateField("dateOfBirth", e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="address">{t.financing.address}</label>
          <input
            id="address"
            name="address"
            required
            value={form.address}
            onChange={(e) => updateField("address", e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="email">{t.financing.email}</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            value={form.email}
            onChange={(e) => updateField("email", e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="phone">{t.financing.phone}</label>
          <input
            id="phone"
            name="phone"
            type="tel"
            required
            value={form.phone}
            onChange={(e) => updateField("phone", e.target.value)}
          />
        </div>
      </section>

      <section className="space-y-5">
        <h2 className="font-display text-xl text-white sm:text-2xl">
          {t.financing.projectDetails}
        </h2>

        <fieldset>
          <legend className="mb-3 text-sm tracking-wide text-zinc-300">
            {t.financing.homeowner}
          </legend>
          <div className="flex gap-6">
            {(["yes", "no"] as const).map((value) => (
              <label
                key={value}
                className="flex min-h-[44px] cursor-pointer items-center gap-2 text-sm text-zinc-300"
              >
                <input
                  type="radio"
                  name="existingHomeowner"
                  value={value}
                  required
                  checked={form.existingHomeowner === value}
                  onChange={() => updateField("existingHomeowner", value)}
                  className="h-5 w-5 accent-gold"
                />
                {value === "yes" ? t.financing.yes : t.financing.no}
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="mb-3 text-sm tracking-wide text-zinc-300">
            {t.financing.workType}
          </legend>
          <div className="grid gap-3 sm:grid-cols-3">
            {workTypeKeys.map((key) => (
              <label
                key={key}
                className={`flex min-h-[48px] cursor-pointer items-center gap-2 rounded-sm border px-4 py-3 text-sm text-zinc-300 transition ${
                  form.workType === key
                    ? "border-gold bg-gold/10"
                    : "border-zinc-700"
                }`}
              >
                <input
                  type="radio"
                  name="workType"
                  value={key}
                  required
                  checked={form.workType === key}
                  onChange={() => updateField("workType", key)}
                  className="h-5 w-5 accent-gold"
                />
                {t.financing.workTypes[key]}
              </label>
            ))}
          </div>
        </fieldset>
      </section>

      <section className="rounded-sm border border-gold/25 bg-zinc-950 p-4 sm:p-5">
        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
            className="mt-1 h-5 w-5 shrink-0 accent-gold"
          />
          <span className="text-sm leading-relaxed text-zinc-300">
            {t.financing.termsBefore}{" "}
            <Link href="/terms" className="text-gold underline hover:text-gold-light">
              {t.financing.termsLink}
            </Link>
            {t.financing.termsAfter}
          </span>
        </label>
      </section>

      {error && (
        <p className="text-sm text-red-400" role="alert">
          {error}
        </p>
      )}

      <button
        type="submit"
        className="btn-primary w-full disabled:cursor-not-allowed disabled:opacity-50 sm:w-auto"
        disabled={!canSubmit}
      >
        {submitting ? t.financing.submitting : t.financing.submit}
      </button>
    </form>
  );
}
