import { Resend } from "resend";
import nodemailer from "nodemailer";
import {
  buildFinancingEmail,
  type FinancingApplication,
} from "@/lib/financing-email";

const DEFAULT_NOTIFY_EMAIL = "Bellarocageneralcontractors@gmail.com";
const DEFAULT_FROM_EMAIL = "Bella Roca Applications <onboarding@resend.dev>";

function notifyEmail() {
  return process.env.FINANCING_NOTIFY_EMAIL?.trim() || DEFAULT_NOTIFY_EMAIL;
}

async function sendViaResend(application: FinancingApplication) {
  const apiKey = process.env.RESEND_API_KEY?.trim();
  if (!apiKey) {
    throw new Error("RESEND_API_KEY is not configured.");
  }

  const from =
    process.env.RESEND_FROM_EMAIL?.trim() || DEFAULT_FROM_EMAIL;
  const { subject, text, html } = buildFinancingEmail(application);
  const resend = new Resend(apiKey);

  const { error } = await resend.emails.send({
    from,
    to: [notifyEmail()],
    replyTo: application.email,
    subject,
    text,
    html,
  });

  if (error) {
    throw new Error(`Resend: ${error.message}`);
  }
}

async function sendViaGmail(application: FinancingApplication) {
  const user = process.env.SMTP_USER?.trim();
  const pass = process.env.SMTP_PASS?.trim();

  if (!user || !pass) {
    throw new Error("SMTP_USER and SMTP_PASS are not configured.");
  }

  const port = Number(process.env.SMTP_PORT || "465");
  const secure = process.env.SMTP_SECURE !== "false";

  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST?.trim() || "smtp.gmail.com",
    port,
    secure,
    auth: { user, pass },
  });

  const { subject, text, html } = buildFinancingEmail(application);

  await transporter.sendMail({
    from: `Bella Roca Applications <${user}>`,
    to: notifyEmail(),
    replyTo: application.email,
    subject,
    text,
    html,
  });
}

export async function sendFinancingNotification(
  application: FinancingApplication,
) {
  const hasResend = Boolean(process.env.RESEND_API_KEY?.trim());
  const hasSmtp = Boolean(
    process.env.SMTP_USER?.trim() && process.env.SMTP_PASS?.trim(),
  );

  if (!hasResend && !hasSmtp) {
    throw new Error(
      "No email provider configured. Set RESEND_API_KEY or SMTP_USER + SMTP_PASS.",
    );
  }

  const errors: string[] = [];

  if (hasResend) {
    try {
      await sendViaResend(application);
      return;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "Resend delivery failed.";
      errors.push(message);
      console.error("[financing] Resend failed:", message);

      if (!hasSmtp) {
        throw new Error(message);
      }
    }
  }

  if (hasSmtp) {
    try {
      await sendViaGmail(application);
      return;
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "SMTP delivery failed.";
      errors.push(message);
      console.error("[financing] SMTP failed:", message);
      throw new Error(errors.join(" | "));
    }
  }

  throw new Error(errors.join(" | ") || "Email delivery failed.");
}
