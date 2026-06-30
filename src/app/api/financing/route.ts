import { NextResponse } from "next/server";
import { sendFinancingNotification } from "@/lib/send-financing-notification";

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

  const application = {
    fullName: body.fullName.trim(),
    socialSecurity: body.socialSecurity,
    dateOfBirth: body.dateOfBirth,
    address: body.address.trim(),
    email: body.email.trim(),
    phone: body.phone.trim(),
    existingHomeowner: body.existingHomeowner,
    workType: body.workType,
    submittedAt: new Date().toISOString(),
  };

  try {
    await sendFinancingNotification(application);
  } catch (error) {
    console.error("[financing] Email delivery failed:", error);

    return NextResponse.json(
      {
        error:
          "Your application could not be delivered. Please call us directly.",
      },
      { status: 503 },
    );
  }

  return NextResponse.json({ success: true });
}
