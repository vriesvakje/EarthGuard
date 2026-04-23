-- Create missing tables: impact + plots
-- Run this in the Supabase SQL Editor

-- ============================================================
-- 1. IMPACT
-- ============================================================
CREATE TABLE IF NOT EXISTS impact (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  m2 INTEGER DEFAULT 0,
  trees INTEGER DEFAULT 0,
  co2 INTEGER DEFAULT 0,
  animals INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE impact ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read impact" ON impact FOR SELECT USING (true);
CREATE POLICY "Authenticated users can manage impact" ON impact FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

-- Seed with initial data
INSERT INTO impact (m2, trees, co2, animals) VALUES (0, 0, 0, 0);

-- ============================================================
-- 2. PLOTS (for the interactive map)
-- ============================================================
CREATE TABLE IF NOT EXISTS plots (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL DEFAULT '',
  status TEXT NOT NULL DEFAULT 'available',
  price INTEGER NOT NULL DEFAULT 25,
  size_m2 INTEGER NOT NULL DEFAULT 1,
  row INTEGER NOT NULL DEFAULT 0,
  col INTEGER NOT NULL DEFAULT 0,
  owner_email TEXT,
  owner_name TEXT,
  order_id UUID,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE plots ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read plots" ON plots FOR SELECT USING (true);
CREATE POLICY "Authenticated users can manage plots" ON plots FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');
