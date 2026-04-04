-- Martinez Auto Repair — initial schema
-- leads: contact form submissions

CREATE TABLE IF NOT EXISTS leads (
  id          UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at  TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  name        TEXT        NOT NULL CHECK (char_length(name) <= 100),
  email       TEXT        NOT NULL CHECK (char_length(email) <= 255),
  phone       TEXT        CHECK (char_length(phone) <= 20),
  service     TEXT        CHECK (char_length(service) <= 100),
  message     TEXT        NOT NULL CHECK (char_length(message) <= 2000),
  locale      TEXT        NOT NULL DEFAULT 'en' CHECK (locale IN ('en', 'es')),
  source_page TEXT
);

ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- No public read or insert — API route uses service_role key which bypasses RLS
CREATE POLICY "service_role_only" ON leads
  FOR ALL
  USING (auth.role() = 'service_role');

CREATE INDEX IF NOT EXISTS leads_created_at_idx ON leads (created_at DESC);

-- posts: blog content managed via Supabase dashboard

CREATE TABLE IF NOT EXISTS posts (
  id                UUID        DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at        TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  updated_at        TIMESTAMPTZ DEFAULT NOW() NOT NULL,
  slug              TEXT        NOT NULL UNIQUE,
  title_en          TEXT        NOT NULL,
  title_es          TEXT        NOT NULL,
  excerpt_en        TEXT        CHECK (char_length(excerpt_en) <= 300),
  excerpt_es        TEXT        CHECK (char_length(excerpt_es) <= 300),
  body_en           TEXT,
  body_es           TEXT,
  published         BOOLEAN     NOT NULL DEFAULT false,
  published_at      TIMESTAMPTZ,
  author            TEXT        NOT NULL DEFAULT 'Martinez Auto',
  featured_image_url TEXT,
  tags              TEXT[]
);

ALTER TABLE posts ENABLE ROW LEVEL SECURITY;

-- Public can read published posts
CREATE POLICY "public_read_published" ON posts
  FOR SELECT
  USING (published = true);

CREATE UNIQUE INDEX IF NOT EXISTS posts_slug_idx ON posts (slug);
CREATE INDEX IF NOT EXISTS posts_published_at_idx ON posts (published_at DESC);
CREATE INDEX IF NOT EXISTS posts_published_idx ON posts (published);

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER posts_updated_at
  BEFORE UPDATE ON posts
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
