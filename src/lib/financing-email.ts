import { formatSsnFull } from "@/lib/ssn";

export type FinancingApplication = {
  fullName: string;
  socialSecurity: string;
  dateOfBirth: string;
  address: string;
  email: string;
  phone: string;
  existingHomeowner: "yes" | "no";
  workType: string;
  submittedAt: string;
};

const workTypeLabels: Record<string, string> = {
  remodel: "Remodel",
  roofing: "Roofing",
  "new-home": "New Home Built",
};

function labelWorkType(workType: string) {
  return workTypeLabels[workType] ?? workType;
}

function row(label: string, value: string) {
  return `<tr><td style="padding:8px 12px;border-bottom:1px solid #e4e4e7;color:#71717a;width:180px;">${label}</td><td style="padding:8px 12px;border-bottom:1px solid #e4e4e7;color:#18181b;">${value}</td></tr>`;
}

export function buildFinancingEmail(application: FinancingApplication) {
  const homeowner =
    application.existingHomeowner === "yes" ? "Yes" : "No";
  const submitted = new Date(application.submittedAt).toLocaleString("en-US", {
    timeZone: "America/Chicago",
    dateStyle: "full",
    timeStyle: "short",
  });

  const subject = `New financing application — ${application.fullName}`;

  const text = [
    "New Bella Roca financing application",
    "",
    `Submitted: ${submitted}`,
    `Name: ${application.fullName}`,
    `SSN: ${formatSsnFull(application.socialSecurity)}`,
    `Date of birth: ${application.dateOfBirth}`,
    `Address: ${application.address}`,
    `Email: ${application.email}`,
    `Phone: ${application.phone}`,
    `Existing homeowner: ${homeowner}`,
    `Work type: ${labelWorkType(application.workType)}`,
    "",
    "Reply to this email to contact the applicant.",
  ].join("\n");

  const html = `
    <div style="font-family:Arial,sans-serif;max-width:640px;margin:0 auto;color:#18181b;">
      <h1 style="font-size:20px;margin:0 0 8px;">New financing application</h1>
      <p style="margin:0 0 20px;color:#71717a;">Submitted ${submitted} (Central Time)</p>
      <table style="width:100%;border-collapse:collapse;border:1px solid #e4e4e7;">
        ${row("Name", application.fullName)}
        ${row("SSN", formatSsnFull(application.socialSecurity))}
        ${row("Date of birth", application.dateOfBirth)}
        ${row("Address", application.address)}
        ${row("Email", `<a href="mailto:${application.email}">${application.email}</a>`)}
        ${row("Phone", `<a href="tel:${application.phone}">${application.phone}</a>`)}
        ${row("Existing homeowner", homeowner)}
        ${row("Work type", labelWorkType(application.workType))}
      </table>
      <p style="margin:20px 0 0;color:#71717a;font-size:13px;">
        Reply to this email to contact the applicant directly.
      </p>
    </div>
  `;

  return { subject, text, html };
}
