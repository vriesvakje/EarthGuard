/**
 * Email templates for EarthGuard.
 * These functions return HTML strings for use with Resend.
 * Styled with inline CSS for maximum email client compatibility.
 */

const BASE_STYLES = `
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
  color: #1a3a1a;
  line-height: 1.6;
  max-width: 600px;
  margin: 0 auto;
  background-color: #faf8f5;
`;

const FOREST = "#1a3a1a";
const BEIGE = "#faf8f5";
const EARTH = "#8B6914";

function header(title: string): string {
  return `
    <div style="background-color: ${FOREST}; padding: 32px 24px; text-align: center;">
      <h1 style="color: ${BEIGE}; margin: 0; font-size: 28px; font-weight: 800; letter-spacing: -0.5px;">
        🌿 EarthGuard
      </h1>
      <p style="color: rgba(250,248,245,0.7); margin: 8px 0 0; font-size: 14px;">
        ${title}
      </p>
    </div>
  `;
}

function footer(): string {
  return `
    <div style="background-color: ${FOREST}; padding: 24px; text-align: center; border-radius: 0 0 16px 16px;">
      <p style="color: rgba(250,248,245,0.6); margin: 0; font-size: 13px;">
        EarthGuard — Biodiversiteit terugbrengen in Brabant, m² voor m².
      </p>
      <p style="color: rgba(250,248,245,0.4); margin: 8px 0 0; font-size: 12px;">
        Tilburg, Project I &nbsp;|&nbsp; earthguard.project@gmail.com
      </p>
    </div>
  `;
}

function button(text: string, url: string): string {
  return `
    <a href="${url}" style="
      display: inline-block;
      background-color: ${FOREST};
      color: ${BEIGE};
      padding: 14px 32px;
      border-radius: 999px;
      text-decoration: none;
      font-weight: 700;
      font-size: 16px;
      margin: 16px 0;
    ">${text}</a>
  `;
}

/**
 * Payment confirmation email sent to the customer after a successful Stripe checkout.
 */
export function paymentConfirmationEmail(params: {
  customerEmail: string;
  meters: number;
  total: string;
  extraDonation: string | null;
  dashboardUrl: string;
}): string {
  const { customerEmail, meters, total, extraDonation, dashboardUrl } = params;

  const extraText = extraDonation === "vijver"
    ? `<p style="margin: 4px 0; color: ${FOREST};">🌊 Extra bijdrage: De Vijver — €25</p>`
    : extraDonation === "dieren"
    ? `<p style="margin: 4px 0; color: ${FOREST};">🐾 Extra bijdrage: De Dieren — €15</p>`
    : "";

  return `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"></head>
    <body style="${BASE_STYLES}">
      <div style="border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08);">
        ${header("Bevestiging van je adoptie")}

        <div style="padding: 32px 24px; background-color: white;">
          <h2 style="color: ${FOREST}; font-size: 22px; margin: 0 0 16px;">
            Bedankt, Guard! 🎉
          </h2>
          <p style="color: ${FOREST}; opacity: 0.8; font-size: 16px;">
            Je hebt zojuist <strong>${meters}m²</strong> biodivers voedselbos geadopteerd.
            Jouw bijdrage wordt direct omgezet in echte natuur in Brabant.
          </p>

          <div style="background-color: ${BEIGE}; border-radius: 12px; padding: 20px; margin: 24px 0;">
            <h3 style="color: ${FOREST}; margin: 0 0 12px; font-size: 16px;">📋 Jouw bestelling</h3>
            <p style="margin: 4px 0; color: ${FOREST};">🌿 ${meters}m² Biodivers Voedselbos</p>
            ${extraText}
            <div style="height: 1px; background-color: rgba(26,58,26,0.1); margin: 12px 0;"></div>
            <p style="margin: 4px 0; color: ${FOREST}; font-weight: 700; font-size: 18px;">Totaal: ${total}</p>
          </div>

          <p style="color: ${FOREST}; opacity: 0.8; font-size: 15px;">
            Via je dashboard kun je volgen wat er op jouw stukje grond groeit en leeft.
            We houden je op de hoogte van elke nieuwe ontwikkeling!
          </p>

          <div style="text-align: center;">
            ${button("Naar je Dashboard →", dashboardUrl)}
          </div>
        </div>

        ${footer()}
      </div>
    </body>
    </html>
  `;
}

/**
 * Admin notification email sent to earthguard.project@gmail.com when a new order comes in.
 */
export function newOrderAdminEmail(params: {
  customerEmail: string;
  meters: number;
  total: string;
  extraDonation: string | null;
  stripeSessionId: string;
}): string {
  const { customerEmail, meters, total, extraDonation, stripeSessionId } = params;

  const extraText = extraDonation && extraDonation !== "none"
    ? `<p style="margin: 4px 0;"><strong>Extra bijdrage:</strong> ${extraDonation === "vijver" ? "De Vijver (€25)" : "De Dieren (€15)"}</p>`
    : "";

  return `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"></head>
    <body style="${BASE_STYLES}">
      <div style="border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08);">
        ${header("🎉 Nieuwe bestelling!")}

        <div style="padding: 32px 24px; background-color: white;">
          <h2 style="color: ${FOREST}; font-size: 22px; margin: 0 0 16px;">
            Nieuwe adoptie binnengekomen!
          </h2>

          <div style="background-color: ${BEIGE}; border-radius: 12px; padding: 20px; margin: 16px 0;">
            <p style="margin: 4px 0;"><strong>Klant:</strong> ${customerEmail}</p>
            <p style="margin: 4px 0;"><strong>Meters:</strong> ${meters}m²</p>
            ${extraText}
            <div style="height: 1px; background-color: rgba(26,58,26,0.1); margin: 12px 0;"></div>
            <p style="margin: 4px 0; font-size: 18px;"><strong>Totaal:</strong> ${total}</p>
          </div>

          <p style="color: ${FOREST}; opacity: 0.6; font-size: 13px;">
            Stripe Session: ${stripeSessionId}
          </p>
        </div>

        ${footer()}
      </div>
    </body>
    </html>
  `;
}

/**
 * Contact form notification email sent to the admin.
 */
export function contactFormAdminEmail(params: {
  name: string;
  email: string;
  subject: string;
  message: string;
  type: string;
}): string {
  const { name, email, subject, message, type } = params;

  return `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"></head>
    <body style="${BASE_STYLES}">
      <div style="border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08);">
        ${header("📝 Nieuw contactformulier")}

        <div style="padding: 32px 24px; background-color: white;">
          <h2 style="color: ${FOREST}; font-size: 22px; margin: 0 0 16px;">
            Iemand heeft het contactformulier ingevuld
          </h2>

          <div style="background-color: ${BEIGE}; border-radius: 12px; padding: 20px; margin: 16px 0;">
            <p style="margin: 4px 0;"><strong>Naam:</strong> ${name}</p>
            <p style="margin: 4px 0;"><strong>Email:</strong> <a href="mailto:${email}" style="color: ${EARTH};">${email}</a></p>
            <p style="margin: 4px 0;"><strong>Onderwerp:</strong> ${subject}</p>
            <p style="margin: 4px 0;"><strong>Type:</strong> ${type}</p>
          </div>

          <div style="background-color: ${BEIGE}; border-radius: 12px; padding: 20px; margin: 16px 0;">
            <p style="margin: 0 0 8px; font-weight: 700; color: ${FOREST};">Bericht:</p>
            <p style="margin: 0; color: ${FOREST}; opacity: 0.85; white-space: pre-wrap;">${message}</p>
          </div>

          <div style="text-align: center;">
            ${button(`Beantwoord ${name} →`, `mailto:${email}`)}
          </div>
        </div>

        ${footer()}
      </div>
    </body>
    </html>
  `;
}

/**
 * Auto-reply email sent to the person who filled in the contact form.
 */
export function contactAutoReplyEmail(params: {
  name: string;
}): string {
  const { name } = params;

  return `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"></head>
    <body style="${BASE_STYLES}">
      <div style="border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08);">
        ${header("We hebben je bericht ontvangen")}

        <div style="padding: 32px 24px; background-color: white;">
          <h2 style="color: ${FOREST}; font-size: 22px; margin: 0 0 16px;">
            Hoi ${name}, bedankt voor je bericht! 🌿
          </h2>
          <p style="color: ${FOREST}; opacity: 0.8; font-size: 16px;">
            We hebben je bericht ontvangen en nemen zo snel mogelijk contact met je op —
            meestal binnen 48 uur.
          </p>
          <p style="color: ${FOREST}; opacity: 0.8; font-size: 16px;">
            In de tussentijd kun je altijd langskomen op zaterdag voor een rondleiding,
            of volg ons op Instagram voor de laatste updates!
          </p>

          <div style="text-align: center;">
            ${button("Bekijk de Community →", "https://earthguard.nl/community")}
          </div>
        </div>

        ${footer()}
      </div>
    </body>
    </html>
  `;
}

/**
 * Welcome email sent to new users after registration.
 */
export function welcomeEmail(params: {
  userName: string | null;
  dashboardUrl: string;
}): string {
  const { userName, dashboardUrl } = params;
  const name = userName || "Guard";

  return `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"></head>
    <body style="${BASE_STYLES}">
      <div style="border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08);">
        ${header("Welkom bij EarthGuard!")}

        <div style="padding: 32px 24px; background-color: white;">
          <h2 style="color: ${FOREST}; font-size: 22px; margin: 0 0 16px;">
            Welkom, ${name}! 🌱
          </h2>
          <p style="color: ${FOREST}; opacity: 0.8; font-size: 16px;">
            Je bent nu officieel onderdeel van de EarthGuard community.
            Samen brengen we biodiversiteit terug in Brabant — vierkante meter voor vierkante meter.
          </p>

          <div style="background-color: ${BEIGE}; border-radius: 12px; padding: 20px; margin: 24px 0;">
            <h3 style="color: ${FOREST}; margin: 0 0 12px; font-size: 16px;">Wat kun je doen?</h3>
            <p style="margin: 8px 0; color: ${FOREST};">🌿 <strong>Adopteer m²</strong> — Koop je eigen stukje natuur</p>
            <p style="margin: 8px 0; color: ${FOREST};">🤝 <strong>Kom helpen</strong> — Plant bomen, verzorg dieren</p>
            <p style="margin: 8px 0; color: ${FOREST};">🥕 <strong>Koop lokaal</strong> — Eieren, groenten, fruit uit het bos</p>
          </div>

          <p style="color: ${FOREST}; opacity: 0.8; font-size: 15px;">
            Ga naar je dashboard om te beginnen, of bekijk wat er te doen is in de community.
          </p>

          <div style="text-align: center;">
            ${button("Naar je Dashboard →", dashboardUrl)}
          </div>
        </div>

        ${footer()}
      </div>
    </body>
    </html>
  `;
}

/**
 * Newsletter subscription confirmation email.
 */
export function newsletterConfirmationEmail(params: {
  email: string;
}): string {
  const { email } = params;

  return `
    <!DOCTYPE html>
    <html>
    <head><meta charset="utf-8"></head>
    <body style="${BASE_STYLES}">
      <div style="border-radius: 16px; overflow: hidden; box-shadow: 0 4px 24px rgba(0,0,0,0.08);">
        ${header("Nieuwsbrief bevestiging")}

        <div style="padding: 32px 24px; background-color: white;">
          <h2 style="color: ${FOREST}; font-size: 22px; margin: 0 0 16px;">
            Je bent ingeschreven! 🌱
          </h2>
          <p style="color: ${FOREST}; opacity: 0.8; font-size: 16px;">
            Bedankt voor je inschrijving op de EarthGuard nieuwsbrief.
            Vanaf nu houd je wekelijks op de hoogte van wat er groeit en bloeit in ons voedselbos.
          </p>

          <div style="background-color: ${BEIGE}; border-radius: 12px; padding: 20px; margin: 24px 0;">
            <h3 style="color: ${FOREST}; margin: 0 0 12px; font-size: 16px;">Wat kun je verwachten?</h3>
            <p style="margin: 8px 0; color: ${FOREST};">🌿 Updates over het voedselbos</p>
            <p style="margin: 8px 0; color: ${FOREST};">📅 Uitnodigingen voor evenementen</p>
            <p style="margin: 8px 0; color: ${FOREST};">🥕 Tips over lokaal en seizoensgebonden eten</p>
            <p style="margin: 8px 0; color: ${FOREST};">🐾 Verhalen over de dieren en planten</p>
          </div>

          <div style="text-align: center;">
            ${button("Bekijk de Community →", "https://earthguard.nl/community")}
          </div>
        </div>

        ${footer()}
      </div>
    </body>
    </html>
  `;
}
