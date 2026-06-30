"use client";

import { useRef } from "react";
import { digitsOnly, formatSsnMasked } from "@/lib/ssn";

type MaskedSsnInputProps = {
  id: string;
  value: string;
  onChange: (digits: string) => void;
  required?: boolean;
};

export function MaskedSsnInput({
  id,
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
        type="password"
        inputMode="numeric"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
        data-lpignore="true"
        data-1p-ignore="true"
        required={required}
        maxLength={11}
        value={formatSsnMasked(value)}
        onChange={(event) => onChange(digitsOnly(event.target.value))}
        onCopy={(event) => event.preventDefault()}
        onCut={(event) => event.preventDefault()}
        onPaste={(event) => {
          event.preventDefault();
          onChange(digitsOnly(event.clipboardData.getData("text")));
        }}
        className="font-mono tracking-widest"
        aria-describedby={`${id}-hint`}
        aria-label="Social Security Number"
      />
      <p id={`${id}-hint`} className="field-hint">
        Your SSN is masked on screen and transmitted securely. Only authorized
        Bella Roca owners receive the full number for application review.
      </p>
    </div>
  );
}
