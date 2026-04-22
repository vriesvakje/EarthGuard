import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { sendCustomerEmail, sendAdminNotification } from "@/lib/email";
import { welcomeEmail } from "@/lib/email-templates";

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get("next") ?? "/dashboard";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      // ── Send welcome email to new user ────────────────────────
      try {
        const {
          data: { user },
        } = await supabase.auth.getUser();

        if (user?.email) {
          const baseUrl =
            process.env.NEXT_PUBLIC_BASE_URL ||
            request.headers.get("origin") ||
            "http://localhost:3000";

          // Send welcome email to the new user
          await sendCustomerEmail(
            user.email,
            "Welkom bij EarthGuard! 🌱",
            welcomeEmail({
              userName: user.user_metadata?.full_name || null,
              dashboardUrl: `${baseUrl}/dashboard`,
            })
          );
          console.log(`📧 Welcome email sent to ${user.email}`);

          // Notify admin about new registration
          await sendAdminNotification(
            `👤 Nieuwe Guard geregistreerd: ${user.email}`,
            `
              <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <h2 style="color: #1a3a1a;">Nieuwe gebruiker geregistreerd!</h2>
                <div style="background: #faf8f5; border-radius: 12px; padding: 20px; margin: 16px 0;">
                  <p style="margin: 4px 0;"><strong>Email:</strong> ${user.email}</p>
                  <p style="margin: 4px 0;"><strong>Naam:</strong> ${user.user_metadata?.full_name || "Niet opgegeven"}</p>
                  <p style="margin: 4px 0;"><strong>ID:</strong> ${user.id}</p>
                  <p style="margin: 4px 0;"><strong>Datum:</strong> ${new Date().toLocaleDateString("nl-NL")}</p>
                </div>
              </div>
            `
          );
          console.log("📧 Admin notification sent about new user");
        }
      } catch (emailErr) {
        // Don't fail the auth flow if email fails
        console.error("⚠️ Failed to send welcome email:", emailErr);
      }
      // ── End welcome email ─────────────────────────────────────

      const forwardedHost = request.headers.get("x-forwarded-host"); // original URL before load balancer (e.g. ngrok)
      if (forwardedHost) {
        // ngrok or other reverse proxy — use the original host so the redirect
        // goes back to the public URL instead of localhost
        return NextResponse.redirect(`https://${forwardedHost}${next}`);
      } else {
        return NextResponse.redirect(`${origin}${next}`);
      }
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/login?error=auth`);
}
