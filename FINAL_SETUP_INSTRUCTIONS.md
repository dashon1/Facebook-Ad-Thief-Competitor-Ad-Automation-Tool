# 🎯 FINAL SETUP - Copy & Paste This SQL (2 Minutes)

I apologize for the confusion. Unfortunately, I cannot execute SQL directly in your Supabase database because:
1. The REST API doesn't expose a direct SQL execution endpoint
2. The RPC function `exec_sql` doesn't exist by default
3. psql/PostgreSQL CLI tools aren't available in this environment

**BUT - Here's the super simple solution:**

---

## ✅ STEP 1: Open Supabase SQL Editor

Click this link: **https://supabase.com/dashboard/project/ulspfbgslsxdzxhseraz/sql/new**

---

## ✅ STEP 2: Copy This Entire SQL Code

Select all the code below (Ctrl+A), copy it (Ctrl+C):

```sql
-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Jobs table
CREATE TABLE IF NOT EXISTS jobs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID,
    source_url TEXT NOT NULL,
    product_image_url TEXT NOT NULL,
    brand_name TEXT DEFAULT 'Your Brand',
    max_ads INTEGER DEFAULT 20,
    batch_size INTEGER DEFAULT 5,
    status TEXT CHECK (status IN ('queued', 'scraping', 'prompting', 'generating', 'saving', 'done', 'failed')) DEFAULT 'queued',
    total_ads INTEGER DEFAULT 0,
    processed_ads INTEGER DEFAULT 0,
    successful_ads INTEGER DEFAULT 0,
    failed_ads INTEGER DEFAULT 0,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW(),
    completed_at TIMESTAMPTZ,
    error JSONB
);

-- Scraped ads table  
CREATE TABLE IF NOT EXISTS scraped_ads (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    job_id UUID NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
    source_image_url TEXT NOT NULL,
    position INTEGER,
    meta JSONB,
    status TEXT CHECK (status IN ('pending', 'processing', 'completed', 'failed', 'prohibited')) DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Assets table
CREATE TABLE IF NOT EXISTS assets (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    job_id UUID NOT NULL REFERENCES jobs(id) ON DELETE CASCADE,
    scraped_ad_id UUID REFERENCES scraped_ads(id) ON DELETE SET NULL,
    file_url TEXT NOT NULL,
    storage_path TEXT,
    mime_type TEXT DEFAULT 'image/png',
    width INTEGER,
    height INTEGER,
    size_bytes INTEGER,
    prohibited BOOLEAN DEFAULT FALSE,
    favorited BOOLEAN DEFAULT FALSE,
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Events table
CREATE TABLE IF NOT EXISTS events (
    id BIGSERIAL PRIMARY KEY,
    job_id UUID REFERENCES jobs(id) ON DELETE CASCADE,
    level TEXT CHECK (level IN ('info', 'warn', 'error')) DEFAULT 'info',
    message TEXT NOT NULL,
    context JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes
CREATE INDEX IF NOT EXISTS idx_jobs_status ON jobs(status);
CREATE INDEX IF NOT EXISTS idx_jobs_created_at ON jobs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_scraped_ads_job_id ON scraped_ads(job_id);
CREATE INDEX IF NOT EXISTS idx_scraped_ads_status ON scraped_ads(status);
CREATE INDEX IF NOT EXISTS idx_assets_job_id ON assets(job_id);
CREATE INDEX IF NOT EXISTS idx_assets_scraped_ad_id ON assets(scraped_ad_id);
CREATE INDEX IF NOT EXISTS idx_events_job_id ON events(job_id);
CREATE INDEX IF NOT EXISTS idx_events_created_at ON events(created_at DESC);

-- Update trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_jobs_updated_at
    BEFORE UPDATE ON jobs
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();
```

---

## ✅ STEP 3: Paste in SQL Editor

1. Click in the SQL editor (big text area)
2. Clear any existing text (Ctrl+A, then Delete)
3. Paste the code (Ctrl+V)
4. Click the **"Run"** button (bottom right)

---

## ✅ STEP 4: Verify Success

You should see: **"Success. No rows returned"**

That's it! Takes 30 seconds.

---

## ✅ STEP 5: Test Your App

After running the SQL, go to: **https://ad-thief.pages.dev**

Fill in the form and click "Generate Inspired Creatives"

It will work! 🎉

---

## 🔍 Why I Can't Do This Automatically

Supabase doesn't provide a programmatic SQL execution API for security reasons. The only way to execute SQL is:
1. Through their web dashboard (manual)
2. Through direct PostgreSQL connection (requires connection string with password, which we don't have configured)

**The fastest way is the web dashboard - just 2 minutes!**

---

## 💡 Alternative: If You Want Me To Do Everything

If you want me to be able to set up databases automatically in the future, you would need to:

1. **Share Supabase Database Connection String** (from Project Settings → Database)
   - Looks like: `postgresql://postgres:[PASSWORD]@...supabase.co:5432/postgres`
   
2. **Install PostgreSQL CLI** in this environment
   - Then I could run: `psql "connection_string" -f create_tables.sql`

But for now, the web dashboard is the fastest! Just copy, paste, click Run. Done! ✅

---

**Ready? Open the link, paste the SQL, click Run!** 🚀

https://supabase.com/dashboard/project/ulspfbgslsxdzxhseraz/sql/new
