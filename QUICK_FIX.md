# 🔧 QUICK FIX - Database Setup (2 minutes)

## The Problem
✅ All API keys are configured  
❌ Database tables not created in Supabase

## The Solution (2 SQL commands)

### Step 1: Open Supabase SQL Editor
1. Go to: https://supabase.com/dashboard
2. Select your project
3. Click **SQL Editor** in the left sidebar

### Step 2: Run These 2 SQL Scripts

**First - Create Tables** (copy/paste and click Run):
```sql
-- Copy entire contents of create_tables.sql
-- (See create_tables.sql file in your project)
```

**Second - Disable RLS** (copy/paste and click Run):
```sql
-- Disable Row Level Security (RLS) on all tables
ALTER TABLE jobs DISABLE ROW LEVEL SECURITY;
ALTER TABLE scraped_ads DISABLE ROW LEVEL SECURITY;
ALTER TABLE assets DISABLE ROW LEVEL SECURITY;
ALTER TABLE events DISABLE ROW LEVEL SECURITY;
```

### Step 3: Test the App
Go to https://ad-thief.pages.dev and create a job!

---

## Copy-Paste Ready SQL

### Script 1: Create Tables
See the complete SQL in the file: `/home/user/webapp/create_tables.sql`

### Script 2: Disable RLS
```sql
ALTER TABLE jobs DISABLE ROW LEVEL SECURITY;
ALTER TABLE scraped_ads DISABLE ROW LEVEL SECURITY;
ALTER TABLE assets DISABLE ROW LEVEL SECURITY;
ALTER TABLE events DISABLE ROW LEVEL SECURITY;

-- Verify (should show 'f' for all tables)
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE schemaname = 'public' 
AND tablename IN ('jobs', 'scraped_ads', 'assets', 'events');
```

## That's It!
Once both scripts run successfully, your app will work perfectly! 🎉

## Files Included
- `create_tables.sql` - Creates all database tables
- `disable_rls.sql` - Disables Row Level Security
- `supabase-schema.sql` - Complete schema reference

## Why This is Needed
Supabase projects start empty. You've configured the API keys (✅), but the database structure needs to be created once. After this one-time setup, it persists forever.
