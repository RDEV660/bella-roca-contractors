"use client";

import { FormEvent, useState } from "react";
import { MaskedSsnInput } from "@/components/MaskedSsnInput";
import { workTypes } from "@/lib/site";
import { formatSsnFull } from "@/lib/ssn";

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

const initialState: FormState = {
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
  const [form, setForm] = useState<FormState>(initialState);
  const [submitted, setSubmitted] = useState(false);

  function updateField<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
  }

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (form.socialSecurity.length !== 9) {
      return;
    }

    // Full SSN is sent to owners unblurred when a backend is connected.
    const ownerPayload = {
      ...form,
      socialSecurityFull: formatSsnFull(form.socialSecurity),
      socialSecurityMasked: formatSsnFull(form.socialSecurity).replace(/\d/g, "#"),
    };

    void ownerPayload;
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-sm border border-gold/30 bg-zinc-950 p-8 text-center">
        <h2 className="font-display text-3xl text-white">
          Application Received
        </h2>
        <p className="mt-4 text-zinc-400">
          Thank you, {form.fullName}. A Bella Roca team member will review your
          information and contact you shortly.
        </p>
      </div>
    );
  }

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
            name="socialSecurity"
            required
            value={form.socialSecurity}
            onChange={(digits) => updateField("socialSecurity", digits)}
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

      <p className="text-xs leading-relaxed text-zinc-500">
        By submitting, you authorize Bella Roca General Contractors to review
        your financing application. Sensitive information is masked for you and
        delivered unblurred to the owners for processing.
      </p>

      <button
        type="submit"
        className="btn-primary w-full sm:w-auto"
        disabled={form.socialSecurity.length !== 9}
      >
        Submit Application
      </button>
    </form>
  );
}
