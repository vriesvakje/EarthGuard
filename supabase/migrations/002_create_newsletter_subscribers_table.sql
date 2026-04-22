-- Newsletter subscribers table
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert (subscribe) — but prevent duplicates via UNIQUE constraint
CREATE POLICY "Anyone can subscribe" ON newsletter_subscribers
  FOR INSERT
  WITH CHECK (true);

-- Only authenticated users can read subscribers (for admin dashboard)
CREATE POLICY "Authenticated users can read subscribers" ON newsletter_subscribers
  FOR SELECT
  USING (auth.role() = 'authenticated');
