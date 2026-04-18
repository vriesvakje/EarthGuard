import { NextRequest, NextResponse } from "next/server";
import { stripe, PRICE_PER_METER_CENTS, EXTRA_VIJVER_CENTS, EXTRA_DIEREN_CENTS } from "@/lib/stripe";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: NextRequest) {
  try {
    // Get authenticated user
    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      return NextResponse.json({ error: "Niet ingelogd" }, { status: 401 });
    }

    const body = await request.json();
    const { meters, extraDonation } = body as {
      meters: number;
      extraDonation: "vijver" | "dieren" | null;
    };

    // Validate input
    if (!meters || meters < 1 || meters > 100) {
      return NextResponse.json({ error: "Ongeldig aantal m²" }, { status: 400 });
    }

    // Build line items
    const lineItems = [
      {
        price_data: {
          currency: "eur",
          unit_amount: PRICE_PER_METER_CENTS,
          product_data: {
            name: `${meters}m² Biodivers Voedselbos`,
            description: `Je adopteert ${meters}m² landbouwgrond die wordt omgezet in biodivers voedselbos.`,
            images: ["https://morally-unwoven-radar.ngrok-free.dev/achtergrond.png"],
          },
        },
        quantity: meters,
      },
    ];

    if (extraDonation === "vijver") {
      lineItems.push({
        price_data: {
          currency: "eur",
          unit_amount: EXTRA_VIJVER_CENTS,
          product_data: {
            name: "Extra: De Vijver",
            description: "Draag bij aan de aanleg van waterpartijen.",
            images: [],
          },
        },
        quantity: 1,
      });
    }

    if (extraDonation === "dieren") {
      lineItems.push({
        price_data: {
          currency: "eur",
          unit_amount: EXTRA_DIEREN_CENTS,
          product_data: {
            name: "Extra: De Dieren",
            description: "Hulpmiddelen voor dierenbeheer en nestkastjes.",
            images: [],
          },
        },
        quantity: 1,
      });
    }

    // Determine the base URL for success/cancel redirects
    // Stripe requires HTTPS for redirect URLs, so we use NEXT_PUBLIC_BASE_URL
    // (ngrok or production URL) instead of localhost which causes SSL errors
    const forwardedHost = request.headers.get("x-forwarded-host");
    const baseUrl = forwardedHost
      ? `https://${forwardedHost}`
      : process.env.NEXT_PUBLIC_BASE_URL || request.headers.get("origin") || "http://localhost:3000";

    // Create Stripe Checkout Session
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["ideal", "card", "bancontact"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${baseUrl}/adopteer/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/adopteer/cancel`,
      metadata: {
        userId: user.id,
        userEmail: user.email ?? "",
        meters: String(meters),
        extraDonation: extraDonation ?? "none",
      },
      customer_email: user.email ?? undefined,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Checkout error:", error);
    return NextResponse.json(
      { error: "Er is iets misgegaan bij het aanmaken van de betaling" },
      { status: 500 }
    );
  }
}
