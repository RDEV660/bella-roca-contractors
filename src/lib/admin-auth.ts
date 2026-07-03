import { createHash } from "crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "bella_admin";

export function isAdminEnabled() {
  return Boolean(process.env.ADMIN_PASSWORD);
}

/** Deterministic token derived from the configured password. */
export function tokenForPassword(password: string) {
  return createHash("sha256").update(`bella-roca:${password}`).digest("hex");
}

function expectedToken(): string | null {
  const password = process.env.ADMIN_PASSWORD;
  if (!password) return null;
  return tokenForPassword(password);
}

export function verifyPassword(password: string) {
  const expected = process.env.ADMIN_PASSWORD;
  return Boolean(expected) && password === expected;
}

export async function isAdmin(): Promise<boolean> {
  const expected = expectedToken();
  if (!expected) return false;

  const store = await cookies();
  return store.get(ADMIN_COOKIE)?.value === expected;
}
