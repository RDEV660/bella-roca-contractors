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

  function appendDigit(digit: string) {
    if (value.length >= 9) return;
    onChange(value + digit);
  }

  function removeDigit() {
    onChange(value.slice(0, -1));
  }

  function handleKeyDown(event: React.KeyboardEvent<HTMLInputElement>) {
    if (/^\d$/.test(event.key)) {
      event.preventDefault();
      appendDigit(event.key);
      return;
    }

    if (event.key === "Backspace" || event.key === "Delete") {
      event.preventDefault();
      removeDigit();
    }
  }

  function handlePaste(event: React.ClipboardEvent<HTMLInputElement>) {
    event.preventDefault();
    const pasted = digitsOnly(event.clipboardData.getData("text"));
    if (!pasted) return;
    onChange(digitsOnly(value + pasted).slice(0, 9));
  }

  return (
    <div className="relative">
      <input
        ref={inputRef}
        id={id}
        type="text"
        inputMode="numeric"
        pattern="[0-9]*"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
        data-lpignore="true"
        data-1p-ignore="true"
        required={required}
        value={formatSsnMasked(value)}
        onKeyDown={handleKeyDown}
        onPaste={handlePaste}
        onChange={() => {
          /* digits are captured via onKeyDown / onPaste only */
        }}
        onCopy={(event) => event.preventDefault()}
        onCut={(event) => event.preventDefault()}
        className="font-mono tracking-widest"
        aria-describedby={`${id}-hint`}
        aria-label="Social Security Number"
      />
      <p id={`${id}-hint`} className="field-hint">
        {hint}
      </p>
    </div>
  );
}
