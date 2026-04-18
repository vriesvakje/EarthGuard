import Stripe from "stripe";

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2026-03-25.dahlia",
});

// Price in cents — €12.50 per m²
export const PRICE_PER_METER_CENTS = 1250;

// Extra donation prices in cents
export const EXTRA_VIJVER_CENTS = 2500; // €25
export const EXTRA_DIEREN_CENTS = 1500; // €15
