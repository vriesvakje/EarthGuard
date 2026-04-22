import { Resend } from "resend";

// Lazy-initialise the Resend client so it doesn't throw at build time
// when RESEND_API_KEY is absent from the environment.
let _resend: Resend | null = null;
function getResend(): Resend {
  if (!_resend) {
    _resend = new Resend(process.env.RESEND_API_KEY);
  }
  return _resend;
}

// The "from" address — uses Resend's test domain by default.
// Once you verify your own domain in Resend, change this to e.g. "EarthGuard <noreply@earthguard.nl>"
const FROM_EMAIL = "EarthGuard <info@hexus.nl>";

// Your admin email for notifications
const ADMIN_EMAIL = "earthguard.project@gmail.com";

interface SendEmailParams {
  to: string | string[];
  subject: string;
  html: string;
  replyTo?: string;
}

/**
 * Send an email using Resend.
 * Works in API routes (server-side only).
 */
export async function sendEmail({ to, subject, html, replyTo }: SendEmailParams) {
  if (!process.env.RESEND_API_KEY) {
    console.warn("⚠️ RESEND_API_KEY not set — skipping email send");
    return { id: "skipped" };
  }

  const { data, error } = await getResend().emails.send({
    from: FROM_EMAIL,
    to,
    subject,
    html,
    replyTo,
  });

  if (error) {
    console.error("❌ Email send error:", error);
    throw error;
  }

  return data;
}

/**
 * Send a notification email to the admin (you).
 */
export async function sendAdminNotification(subject: string, html: string, replyTo?: string) {
  return sendEmail({
    to: ADMIN_EMAIL,
    subject,
    html,
    replyTo,
  });
}

/**
 * Send a confirmation email to a customer.
 */
export async function sendCustomerEmail(
  customerEmail: string,
  subject: string,
  html: string
) {
  return sendEmail({
    to: customerEmail,
    subject,
    html,
  });
}
