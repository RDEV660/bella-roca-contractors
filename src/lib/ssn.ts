export function digitsOnly(value: string): string {
  return value.replace(/\D/g, "").slice(0, 9);
}

export function formatSsnMasked(digits: string): string {
  if (!digits) return "";

  const parts = [
    "#".repeat(Math.min(3, digits.length)),
    digits.length > 3 ? "#".repeat(Math.min(2, digits.length - 3)) : "",
    digits.length > 5 ? digits.slice(5) : "",
  ];

  if (digits.length <= 3) return parts[0];
  if (digits.length <= 5) return `${parts[0]}-${parts[1]}`;
  return `${parts[0]}-${parts[1]}-${parts[2]}`;
}

export function formatSsnFull(digits: string): string {
  if (digits.length <= 3) return digits;
  if (digits.length <= 5) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  return `${digits.slice(0, 3)}-${digits.slice(3, 5)}-${digits.slice(5)}`;
}
