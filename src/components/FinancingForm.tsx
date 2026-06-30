"use client";

import Link from "next/link";
import { FormEvent, useState } from "react";
import { MaskedSsnInput } from "@/components/MaskedSsnInput";
import { workTypes } from "@/lib/site";

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

export function FinancingForm() {
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
      setError("You must accept the terms before submitting.");
      return;
    }

    if (form.socialSecurity.length !== 9) {
      setError("Please enter a valid 9-digit Social Security number.");
      return;
    }

    setSubmitting(true);

    try {
      const response = await fetch("/api/financing", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
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
      setError(
        "We could not submit your application. Please call us or try again.",
      );
    } finally {
      setSubmitting(false);
    }
  }

  if (submitted) {
    return (
      <div className="animate-fade-in rounded-sm border border-gold/30 bg-zinc-950 p-8 text-center">
        <h2 className="font-display text-3xl text-white">
          Application Received
        </h2>
        <p className="mt-4 text-zinc-400">
          Thank you. A Bella Roca team member will review your information and
          contact you shortly.
        </p>
      </div>
    );
  }

  const canSubmit =
    termsAccepted &&
    form.socialSecurity.length === 9 &&
    form.existingHomeowner !== "" &&
    form.workType !== "";

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      <section className="space-y-5">
        <h2 className="font-display text-2xl text-white">Your Information</h2>

        <div>
          <label htmlFor="fullName">Name</label>
          <input
            id="fullName"
            name="fullName"
            required
            value={form.fullName}
            onChange={(e) => updateField("fullName", e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="socialSecurity">Full Social Security Number</label>
          <MaskedSsnInput
            id="socialSecurity"
            value={form.socialSecurity}
            onChange={(digits) => updateField("socialSecurity", digits)}
            required
          />
        </div>

        <div>
          <label htmlFor="dateOfBirth">Date of Birth</label>
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
          <label htmlFor="address">Address</label>
          <input
            id="address"
            name="address"
            required
            value={form.address}
            onChange={(e) => updateField("address", e.target.value)}
          />
        </div>

        <div>
          <label htmlFor="email">Email Address</label>
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
          <label htmlFor="phone">Phone Number</label>
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
        <h2 className="font-display text-2xl text-white">Project Details</h2>

        <fieldset>
          <legend className="mb-3 text-sm tracking-wide text-zinc-300">
            Existing homeowner?
          </legend>
          <div className="flex gap-6">
            {(["yes", "no"] as const).map((value) => (
              <label
                key={value}
                className="flex cursor-pointer items-center gap-2 text-sm text-zinc-300"
              >
                <input
                  type="radio"
                  name="existingHomeowner"
                  value={value}
                  required
                  checked={form.existingHomeowner === value}
                  onChange={() => updateField("existingHomeowner", value)}
                  className="h-4 w-4 accent-gold"
                />
                {value === "yes" ? "Yes" : "No"}
              </label>
            ))}
          </div>
        </fieldset>

        <fieldset>
          <legend className="mb-3 text-sm tracking-wide text-zinc-300">
            Type of work needed?
          </legend>
          <div className="grid gap-3 sm:grid-cols-3">
            {workTypes.map((type) => (
              <label
                key={type.value}
                className={`flex cursor-pointer items-center gap-2 rounded-sm border px-4 py-3 text-sm text-zinc-300 transition ${
                  form.workType === type.value
                    ? "border-gold bg-gold/10"
                    : "border-zinc-700"
                }`}
              >
                <input
                  type="radio"
                  name="workType"
                  value={type.value}
                  required
                  checked={form.workType === type.value}
                  onChange={() => updateField("workType", type.value)}
                  className="h-4 w-4 accent-gold"
                />
                {type.label}
              </label>
            ))}
          </div>
        </fieldset>
      </section>

      <section className="rounded-sm border border-gold/25 bg-zinc-950 p-5">
        <label className="flex cursor-pointer items-start gap-3">
          <input
            type="checkbox"
            checked={termsAccepted}
            onChange={(e) => setTermsAccepted(e.target.checked)}
            className="mt-1 h-4 w-4 shrink-0 accent-gold"
            required
          />
          <span className="text-sm leading-relaxed text-zinc-300">
            I confirm that I am the owner of the information provided, or am
            authorized to submit it, and I accept the{" "}
            <Link href="/terms" className="text-gold underline hover:text-gold-light">
              Terms &amp; Authorization
            </Link>
            . I authorize Bella Roca General Contractors and its owners to
            receive my application for financing review.
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
        className="btn-primary w-full sm:w-auto disabled:cursor-not-allowed disabled:opacity-50"
        disabled={!canSubmit || submitting}
      >
        {submitting ? "Submitting…" : "Submit Application"}
      </button>
    </form>
  );
}
