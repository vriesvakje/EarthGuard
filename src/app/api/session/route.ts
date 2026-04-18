import { NextRequest, NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";

export async function GET(request: NextRequest) {
  const sessionId = request.nextUrl.searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.json({ error: "Missing session_id" }, { status: 400 });
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);

    return NextResponse.json({
      meters: session.metadata?.meters ? parseInt(session.metadata.meters, 10) : null,
      total: session.amount_total
        ? `€${(session.amount_total / 100).toFixed(2)}`
        : null,
      paymentStatus: session.payment_status,
      extraDonation: session.metadata?.extraDonation ?? null,
    });
  } catch (error) {
    console.error("Session retrieve error:", error);
    return NextResponse.json({ error: "Session not found" }, { status: 404 });
  }
}
