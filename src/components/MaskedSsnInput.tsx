"use client";

import { useRef } from "react";
import { digitsOnly, formatSsnMasked } from "@/lib/ssn";

type MaskedSsnInputProps = {
  id: string;
  value: string;
  onChange: (digits: string) => void;
  hint: string;
};

export function MaskedSsnInput({
  id,
  value,
  onChange,
  hint,
}: MaskedSsnInputProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  function setDigits(digits: string) {
    onChange(digitsOnly(digits).slice(0, 9));
  }

  function appendDigit(digit: string) {
    if (value.length >= 9) return;
    setDigits(value + digit);
  }

  function removeDigit() {
    setDigits(value.slice(0, -1));
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

  function handleBeforeInput(event: React.FormEvent<HTMLInputElement>) {
    const nativeEvent = event.nativeEvent as InputEvent;

    if (nativeEvent.inputType === "insertText" && nativeEvent.data) {
      const digits = digitsOnly(nativeEvent.data);
      if (digits) {
        event.preventDefault();
        setDigits(value + digits);
      }
      return;
    }

    if (
      nativeEvent.inputType === "deleteContentBackward" ||
      nativeEvent.inputType === "deleteContentForward"
    ) {
      event.preventDefault();
      removeDigit();
    }
  }

  function handlePaste(event: React.ClipboardEvent<HTMLInputElement>) {
    event.preventDefault();
    const pasted = digitsOnly(event.clipboardData.getData("text"));
    if (!pasted) return;
    setDigits(value + pasted);
  }

  const isComplete = value.length === 9;

  return (
    <div className="relative">
      <input
        ref={inputRef}
        id={id}
        type="text"
        inputMode="numeric"
        autoComplete="off"
        autoCorrect="off"
        autoCapitalize="off"
        spellCheck={false}
        data-lpignore="true"
        data-1p-ignore="true"
        value={formatSsnMasked(value)}
        onKeyDown={handleKeyDown}
        onBeforeInput={handleBeforeInput}
        onPaste={handlePaste}
        onChange={() => {
          /* digits are captured via keyboard / paste handlers */
        }}
        onCopy={(event) => event.preventDefault()}
        onCut={(event) => event.preventDefault()}
        className="font-mono tracking-widest"
        aria-describedby={`${id}-hint`}
        aria-label="Social Security Number"
        aria-invalid={value.length > 0 && !isComplete}
      />
      <input
        type="hidden"
        name="socialSecurity"
        value={value}
        tabIndex={-1}
        aria-hidden="true"
        readOnly
      />
      <p id={`${id}-hint`} className="field-hint">
        {hint}
        {value.length > 0 && !isComplete && (
          <span className="mt-1 block text-gold/80">
            {value.length}/9 digits
          </span>
        )}
      </p>
    </div>
  );
}
