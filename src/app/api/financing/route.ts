import { NextResponse } from "next/server";
import { formatSsnFull } from "@/lib/ssn";

type FinancingPayload = {
  fullName: string;
  socialSecurity: string;
  dateOfBirth: string;
  address: string;
  email: string;
  phone: string;
  existingHomeowner: "yes" | "no";
  workType: string;
  termsAccepted: boolean;
};

function isValidPayload(body: unknown): body is FinancingPayload {
  if (!body || typeof body !== "object") return false;
  const data = body as Record<string, unknown>;
  return (
    typeof data.fullName === "string" &&
    typeof data.socialSecurity === "string" &&
    /^\d{9}$/.test(data.socialSecurity) &&
    typeof data.dateOfBirth === "string" &&
    typeof data.address === "string" &&
    typeof data.email === "string" &&
    typeof data.phone === "string" &&
    (data.existingHomeowner === "yes" || data.existingHomeowner === "no") &&
    typeof data.workType === "string" &&
    data.termsAccepted === true
  );
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!isValidPayload(body)) {
    return NextResponse.json(
      { error: "Missing or invalid application fields." },
      { status: 400 },
    );
  }

  // Owners receive full SSN; only non-sensitive fields are logged here.
  const ownerRecord = {
    fullName: body.fullName,
    socialSecurityFull: formatSsnFull(body.socialSecurity),
    dateOfBirth: body.dateOfBirth,
    address: body.address,
    email: body.email,
    phone: body.phone,
    existingHomeowner: body.existingHomeowner,
    workType: body.workType,
    submittedAt: new Date().toISOString(),
  };

  // TODO: Wire to secure email/webhook/CRM for owner delivery.
  if (process.env.NODE_ENV === "development") {
    console.info("[financing] Application received for:", ownerRecord.fullName);
  }

  return NextResponse.json({ success: true });
}
