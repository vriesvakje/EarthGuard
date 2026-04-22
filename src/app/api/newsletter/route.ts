import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { sendAdminNotification, sendCustomerEmail } from "@/lib/email";
import { newsletterConfirmationEmail } from "@/lib/email-templates";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { email } = body as { email: string };

    // Validate email
    if (!email) {
      return NextResponse.json(
        { error: "Email is verplicht" },
        { status: 400 }
      );
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Ongeldig emailadres" },
        { status: 400 }
      );
    }

    // Insert into Supabase
    const supabase = await createClient();
    const { error: dbError } = await supabase
      .from("newsletter_subscribers")
      .insert({ email });

    if (dbError) {
      // Duplicate email — still treat as success for the user
      if (dbError.code === "23505") {
        return NextResponse.json({
          success: true,
          message: "Je bent al ingeschreven!",
        });
      }
      console.error("Newsletter DB error:", dbError);
      return NextResponse.json(
        { error: "Er is iets misgegaan" },
        { status: 500 }
      );
    }

    // Send confirmation email to subscriber (non-critical)
    try {
      await sendCustomerEmail(
        email,
        "Welkom bij de EarthGuard nieuwsbrief! 🌿",
        newsletterConfirmationEmail({ email })
      );
    } catch (emailErr) {
      console.warn("⚠️ Newsletter confirmation email failed:", emailErr);
    }

    // Notify admin about new subscriber (non-critical)
    try {
      await sendAdminNotification(
        `📬 Nieuwe nieuwsbrief-inschrijving: ${email}`,
        `
          <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
            <h2 style="color: #1a3a1a;">Nieuwe nieuwsbrief-inschrijving!</h2>
            <div style="background: #faf8f5; border-radius: 12px; padding: 20px; margin: 16px 0;">
              <p style="margin: 4px 0;"><strong>Email:</strong> ${email}</p>
              <p style="margin: 4px 0;"><strong>Datum:</strong> ${new Date().toLocaleDateString("nl-NL")}</p>
            </div>
          </div>
        `
      );
    } catch (emailErr) {
      console.warn("⚠️ Newsletter admin notification failed:", emailErr);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Newsletter subscribe error:", error);
    return NextResponse.json(
      { error: "Er is iets misgegaan" },
      { status: 500 }
    );
  }
}
