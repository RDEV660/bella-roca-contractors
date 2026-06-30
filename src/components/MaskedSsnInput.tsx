"use client";

import { useRef } from "react";
import { digitsOnly, formatSsnMasked } from "@/lib/ssn";

type MaskedSsnInputProps = {
  id: string;
  name: string;
  value: string;
  onChange: (digits: string) => void;
  required?: boolean;
};

export function MaskedSsnInput({
  id,
  name,
  value,
  onChange,
  required,
}: MaskedSsnInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="relative">
      <input
        ref={inputRef}
        id={id}
        name={name}
        type="text"
        inputMode="numeric"
        autoComplete="off"
        required={required}
        value={formatSsnMasked(value)}
        onChange={(event) => onChange(digitsOnly(event.target.value))}
        className="font-mono tracking-widest"
        aria-describedby={`${id}-hint`}
      />
      <input type="hidden" name={`${name}Full`} value={value} />
      <p id={`${id}-hint`} className="field-hint">
        Your SSN is masked on screen. Owners receive the full number unblurred
        for application review.
      </p>
    </div>
  );
}
