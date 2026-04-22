-- Admin dashboard tables + seed data
-- Run this in the Supabase SQL Editor

-- ============================================================
-- 1. EVENTS
-- ============================================================
CREATE TABLE IF NOT EXISTS events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  date TEXT NOT NULL,
  month TEXT DEFAULT '2025',
  location TEXT NOT NULL,
  tag TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE events ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read events" ON events FOR SELECT USING (true);
CREATE POLICY "Authenticated users can manage events" ON events FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

INSERT INTO events (title, description, date, month, location, tag, sort_order) VALUES
('Eerste Plantdag Brabant I', 'Help ons de eerste bomen te planten op ons perceel in Tilburg. Geen ervaring nodig — we leggen alles uit.', 'Binnenkort', '2025', 'Tilburg, Project I', 'Planten', 1),
('Kippen Welkomstdag', 'Onze eerste geredde kippen komen aan! Help mee hun nieuwe thuis in te richten en maak kennis met de bewoners.', 'Binnenkort', '2025', 'Tilburg, Project I', 'Dieren', 2),
('Oogst Festival', 'Viervoudig het seizoen met de community. Proef de eerste oogst, ontmoet medeguards en geniet van live muziek in het bos.', 'Binnenkort', '2025', 'Tilburg, Project I', 'Feest', 3),
('Open Dag — Kom Kijken', 'Elke zaterdag kun je langskomen om te zien hoe de Agroforestry zich ontwikkelt. Rondleiding om 11:00 en 14:00.', 'Elke zaterdag', '2025', 'Tilburg, Project I', 'Rondleiding', 4);

-- ============================================================
-- 2. PROJECTS
-- ============================================================
CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  location TEXT NOT NULL,
  type TEXT NOT NULL,
  status TEXT NOT NULL,
  progress INTEGER DEFAULT 0,
  target INTEGER NOT NULL,
  current INTEGER DEFAULT 0,
  description TEXT NOT NULL,
  features TEXT[] DEFAULT '{}',
  sort_order INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read projects" ON projects FOR SELECT USING (true);
CREATE POLICY "Authenticated users can manage projects" ON projects FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

INSERT INTO projects (name, location, type, status, progress, target, current, description, features, sort_order) VALUES
('Brabant I — Tilburg', 'Berkel-Enschot, Tilburg', 'forest', 'Opstart', 0, 10000, 0, 'Ons allereerste project. Een braakliggend perceel dat wordt omgezet in een volledige Agroforestry met zeven lagen, Kune Kune varkens en geredde scharrelkippen.', '{"Agroforestry 7 lagen", "Kune Kune varkens", "Geredde kippen", "Vijver"}', 1),
('Brabant II — Biesbosch', 'Biesbosch, Noord-Brabant', 'pond', 'Gepland', 0, 15000, 0, 'Een waterrijk project in de Biesbosch. Herstel van wetlands, vijvers en waterzuiverende planten. Thuis voor amfibieën, watervogels en libellen.', '{"Wetland herstel", "Vijvers", "Waterzuivering", "Amfibieën"}', 2),
('Brabant III — Kampina', 'Kampina, Oisterwijk', 'meadow', 'Gepland', 0, 8000, 0, 'Kruidenrijk grasland op de zandgronden van de Kampina. Bloemenweides, bijenstalling en een educatief pad voor scholen en bezoekers.', '{"Kruidenrijk grasland", "Bijenstalling", "Educatief pad", "Bloemenweides"}', 3);

-- ============================================================
-- 3. STORIES
-- ============================================================
CREATE TABLE IF NOT EXISTS stories (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  quote TEXT NOT NULL,
  role TEXT NOT NULL,
  initials TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE stories ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read stories" ON stories FOR SELECT USING (true);
CREATE POLICY "Authenticated users can manage stories" ON stories FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

INSERT INTO stories (name, quote, role, initials, sort_order) VALUES
('De Eerste Guard', 'Ik adopteerde 10 m² omdat ik geloof dat verandering lokaal begint. Nu zie ik via mijn dashboard dat er al twee nieuwe vogelsoorten op mijn stukje grond zitten.', 'Vroege adopter', 'EG', 1),
('De Vrijwilliger', 'Elke zaterdag sta ik met mijn handen in de aarde. Het is mijn therapie. En de kippen kennen me al — ze komen naar me toe gerend als ik aankom.', 'Actieve vrijwilliger', 'DV', 2),
('De Buurvrouw', 'Ik woon naast het perceel. Vroeger was het een braak stuk grond. Nu hoor ik ''s ochtends de vogels en zie ik de varkens scharrelen. Het heeft de hele buurt veranderd.', 'Brabantse buurvrouw', 'DB', 3);

-- ============================================================
-- 4. HARVEST ITEMS
-- ============================================================
CREATE TABLE IF NOT EXISTS harvest_items (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  available TEXT NOT NULL,
  icon TEXT NOT NULL,
  color TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE harvest_items ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read harvest_items" ON harvest_items FOR SELECT USING (true);
CREATE POLICY "Authenticated users can manage harvest_items" ON harvest_items FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

INSERT INTO harvest_items (name, description, available, icon, color, sort_order) VALUES
('Eieren van Geredde Kippen', 'Onze kippen leven vrij in het bos. Scharreleieren met een verhaal — elke doos financiert nieuw natuurherstel.', 'Jaarlijks', 'Egg', 'bg-amber-100 text-amber-700', 1),
('Seizoensgroenten', 'Chemievrije groenten uit de kruidlaag en bodembedekkers van onze Agroforestry. Wat het bos geeft, delen we.', 'Lente t/m Herfst', 'Carrot', 'bg-green-100 text-green-600', 2),
('Fruit & Noten', 'Appels, peren, walnoten en bessen uit de boom- en struiklaag. Lokaal, vers en vol smaak.', 'Zomer t/m Winter', 'Apple', 'bg-red-100 text-red-600', 3);

-- ============================================================
-- 5. UPDATES
-- ============================================================
CREATE TABLE IF NOT EXISTS updates (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  icon TEXT NOT NULL,
  color TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE updates ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read updates" ON updates FOR SELECT USING (true);
CREATE POLICY "Authenticated users can manage updates" ON updates FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

INSERT INTO updates (title, description, icon, color, sort_order) VALUES
('Nieuwe boom geplant!', 'Er is vandaag een nieuwe walnootboom geplant op jouw stukje grond.', 'Trees', 'bg-green-100 text-green-600', 1),
('Vogelnestkastje geplaatst', 'Een pimpelmees heeft zijn intrek genomen in een nieuw nestkastje nabij jouw m².', 'Squirrel', 'bg-orange-100 text-orange-600', 2),
('Bodemherstel update', 'De stikstofwaarden in de bodem zijn met 15% gedaald sinds de start.', 'ArrowUpRight', 'bg-blue-100 text-blue-600', 3);

-- ============================================================
-- 6. CROWDFUNDING
-- ============================================================
CREATE TABLE IF NOT EXISTS crowdfunding (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  project_name TEXT NOT NULL,
  target INTEGER NOT NULL,
  current INTEGER DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE crowdfunding ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read crowdfunding" ON crowdfunding FOR SELECT USING (true);
CREATE POLICY "Authenticated users can manage crowdfunding" ON crowdfunding FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

INSERT INTO crowdfunding (project_name, target, current) VALUES
('Tilburg, Project I', 10000, 0);

-- ============================================================
-- 7. COMMUNITY STATS
-- ============================================================
CREATE TABLE IF NOT EXISTS community_stats (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  label TEXT NOT NULL,
  value TEXT NOT NULL,
  icon TEXT NOT NULL,
  color TEXT NOT NULL,
  sort_order INTEGER DEFAULT 0,
  updated_at TIMESTAMPTZ DEFAULT now()
);

ALTER TABLE community_stats ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can read community_stats" ON community_stats FOR SELECT USING (true);
CREATE POLICY "Authenticated users can manage community_stats" ON community_stats FOR ALL USING (auth.role() = 'authenticated') WITH CHECK (auth.role() = 'authenticated');

INSERT INTO community_stats (label, value, icon, color, sort_order) VALUES
('Actieve Guards', '0', 'Users', 'text-forest', 1),
('m² Geadopteerd', '0', 'Leaf', 'text-green-600', 2),
('Vrijwilligersdagen', '0', 'Calendar', 'text-blue-600', 3),
('Kippen Gered', '0', 'Heart', 'text-earth', 4);
