-- Disable Row Level Security (RLS) on all tables
-- This allows the API keys to access the tables

ALTER TABLE jobs DISABLE ROW LEVEL SECURITY;
ALTER TABLE scraped_ads DISABLE ROW LEVEL SECURITY;
ALTER TABLE assets DISABLE ROW LEVEL SECURITY;
ALTER TABLE events DISABLE ROW LEVEL SECURITY;

-- Verify RLS is disabled
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('jobs', 'scraped_ads', 'assets', 'events');
