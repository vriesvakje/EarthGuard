import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { createClient } from "@/lib/supabase/server";
import { sendCustomerEmail, sendAdminNotification } from "@/lib/email";
import {
  paymentConfirmationEmail,
  newOrderAdminEmail,
} from "@/lib/email-templates";

// Disable body parsing — Stripe needs the raw body to verify the signature
export const runtime = "nodejs";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      process.env.STRIPE_WEBHOOK_SECRET!
    );
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  // Handle the checkout.session.completed event
  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const metadata = session.metadata;

    if (!metadata) {
      console.error("No metadata in session:", session.id);
      return NextResponse.json({ error: "No metadata" }, { status: 400 });
    }

    const { userId, meters, extraDonation } = metadata;
    const amountTotal = session.amount_total ?? 0;

    try {
      const supabase = await createClient();

      // Insert order into Supabase
      const { error } = await supabase.from("orders").insert({
        user_id: userId,
        stripe_session_id: session.id,
        meters: parseInt(meters, 10),
        extra_donation: extraDonation === "none" ? null : extraDonation,
        amount_total: amountTotal,
        currency: session.currency ?? "eur",
        payment_status: session.payment_status ?? "paid",
        created_at: new Date().toISOString(),
      });

      if (error) {
        console.error("Supabase insert error:", error);
        return NextResponse.json({ error: "Database error" }, { status: 500 });
      }

      console.log(
        `✅ Order saved: ${meters}m² for user ${userId}, €${(amountTotal / 100).toFixed(2)}`
      );

      // ── Send emails ──────────────────────────────────────────────
      const customerEmail = session.customer_email ?? metadata.userEmail ?? "";
      const totalFormatted = `€${(amountTotal / 100).toFixed(2)}`;
      const baseUrl =
        process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";

      // 1. Payment confirmation to the customer
      if (customerEmail) {
        try {
          await sendCustomerEmail(
            customerEmail,
            `Bedankt! Je hebt ${meters}m² geadopteerd 🌿`,
            paymentConfirmationEmail({
              customerEmail,
              meters: parseInt(meters, 10),
              total: totalFormatted,
              extraDonation:
                extraDonation === "none" ? null : extraDonation,
              dashboardUrl: `${baseUrl}/dashboard`,
            })
          );
          console.log(`📧 Confirmation email sent to ${customerEmail}`);
        } catch (emailErr) {
          // Don't fail the webhook if email fails — order is already saved
          console.error("⚠️ Failed to send confirmation email:", emailErr);
        }
      }

      // 2. Admin notification about the new order
      try {
        await sendAdminNotification(
          `🎉 Nieuwe adoptie: ${meters}m² — ${totalFormatted}`,
          newOrderAdminEmail({
            customerEmail,
            meters: parseInt(meters, 10),
            total: totalFormatted,
            extraDonation:
              extraDonation === "none" ? null : extraDonation,
            stripeSessionId: session.id,
          })
        );
        console.log("📧 Admin notification sent");
      } catch (emailErr) {
        console.error("⚠️ Failed to send admin notification:", emailErr);
      }
      // ── End emails ───────────────────────────────────────────────
    } catch (err) {
      console.error("Error processing webhook:", err);
      return NextResponse.json({ error: "Processing error" }, { status: 500 });
    }
  }

  return NextResponse.json({ received: true });
}
