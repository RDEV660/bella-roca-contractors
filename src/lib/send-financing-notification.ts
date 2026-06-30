import { Resend } from "resend";
import {
  buildFinancingEmail,
  type FinancingApplication,
} from "@/lib/financing-email";

const DEFAULT_NOTIFY_EMAIL = "Bellarocageneralcontractors@gmail.com";
const DEFAULT_FROM_EMAIL = "Bella Roca Applications <onboarding@resend.dev>";

export async function sendFinancingNotification(
  application: FinancingApplication,
) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured.");
  }

  const to =
    process.env.FINANCING_NOTIFY_EMAIL?.trim() || DEFAULT_NOTIFY_EMAIL;
  const from =
    process.env.RESEND_FROM_EMAIL?.trim() || DEFAULT_FROM_EMAIL;

  const { subject, text, html } = buildFinancingEmail(application);
  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from,
    to: [to],
    replyTo: application.email,
    subject,
    text,
    html,
  });

  if (error) {
    throw new Error(error.message);
  }
}
