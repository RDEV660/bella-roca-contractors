"use client";

import { useRef } from "react";
import { digitsOnly, formatSsnMasked } from "@/lib/ssn";

type MaskedSsnInputProps = {
  id: string;
  value: string;
  onChange: (digits: string) => void;
  hint: string;
  required?: boolean;
};

export function MaskedSsnInput({
  id,
  value,
  onChange,
  hint,
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
      />
      <p id={`${id}-hint`} className="field-hint">
        {hint}
      </p>
    </div>
  );
}
