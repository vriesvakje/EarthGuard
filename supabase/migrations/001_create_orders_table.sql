-- Create orders table for Stripe payments
-- Run this in the Supabase SQL Editor (Dashboard → SQL Editor)

CREATE TABLE IF NOT EXISTS public.orders (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  stripe_session_id TEXT UNIQUE NOT NULL,
  meters INTEGER NOT NULL,
  extra_donation TEXT, -- 'vijver', 'dieren', or NULL
  amount_total INTEGER NOT NULL, -- in cents
  currency TEXT DEFAULT 'eur',
  payment_status TEXT DEFAULT 'paid',
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Policy: Users can only see their own orders
CREATE POLICY "Users can view their own orders"
  ON public.orders
  FOR SELECT
  USING (auth.uid() = user_id);

-- Policy: Service role can insert orders (used by webhook)
CREATE POLICY "Service role can insert orders"
  ON public.orders
  FOR INSERT
  WITH CHECK (true);

-- Policy: Users cannot update or delete orders
-- (No UPDATE or DELETE policies = not allowed)
