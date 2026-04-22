import { NextRequest, NextResponse } from "next/server";
import { sendAdminNotification, sendCustomerEmail } from "@/lib/email";
import {
  contactFormAdminEmail,
  contactAutoReplyEmail,
} from "@/lib/email-templates";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, subject, message, type } = body as {
      name: string;
      email: string;
      subject: string;
      message: string;
      type: string;
    };

    // Validate required fields
    if (!name || !email || !message) {
      return NextResponse.json(
        { error: "Naam, email en bericht zijn verplicht" },
        { status: 400 }
      );
    }

    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: "Ongeldig emailadres" },
        { status: 400 }
      );
    }

    // Send notification to admin
    await sendAdminNotification(
      `📝 Contactformulier: ${subject || "Nieuw bericht"}`,
      contactFormAdminEmail({
        name,
        email,
        subject: subject || "Geen onderwerp",
        message,
        type: type || "algemeen",
      }),
      email // replyTo so you can directly reply to the sender
    );

    // Send auto-reply to the customer (non-critical — don't fail the form if this errors)
    try {
      await sendCustomerEmail(
        email,
        "We hebben je bericht ontvangen — EarthGuard 🌿",
        contactAutoReplyEmail({ name })
      );
    } catch (autoReplyError) {
      console.warn("⚠️ Auto-reply kon niet verzonden worden:", autoReplyError);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Contact form error:", error);
    return NextResponse.json(
      { error: "Er is iets misgegaan bij het verzenden" },
      { status: 500 }
    );
  }
}
