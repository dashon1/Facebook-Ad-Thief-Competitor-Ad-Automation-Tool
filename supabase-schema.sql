-- Facebook Ad Thief Database Schema
-- Run this in your Supabase SQL Editor

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

-- Assets (generated outputs) table
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

-- Events (logs) table
CREATE TABLE IF NOT EXISTS events (
    id BIGSERIAL PRIMARY KEY,
    job_id UUID REFERENCES jobs(id) ON DELETE CASCADE,
    level TEXT CHECK (level IN ('info', 'warn', 'error')) DEFAULT 'info',
    message TEXT NOT NULL,
    context JSONB,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Indexes for performance
CREATE INDEX IF NOT EXISTS idx_jobs_status ON jobs(status);
CREATE INDEX IF NOT EXISTS idx_jobs_created_at ON jobs(created_at DESC);
CREATE INDEX IF NOT EXISTS idx_scraped_ads_job_id ON scraped_ads(job_id);
CREATE INDEX IF NOT EXISTS idx_scraped_ads_status ON scraped_ads(status);
CREATE INDEX IF NOT EXISTS idx_assets_job_id ON assets(job_id);
CREATE INDEX IF NOT EXISTS idx_assets_scraped_ad_id ON assets(scraped_ad_id);
CREATE INDEX IF NOT EXISTS idx_events_job_id ON events(job_id);
CREATE INDEX IF NOT EXISTS idx_events_created_at ON events(created_at DESC);

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Trigger to automatically update updated_at
CREATE TRIGGER update_jobs_updated_at
    BEFORE UPDATE ON jobs
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS) - Optional, enable if using auth
-- ALTER TABLE jobs ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE scraped_ads ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE assets ENABLE ROW LEVEL SECURITY;
-- ALTER TABLE events ENABLE ROW LEVEL SECURITY;

-- RLS Policies (uncomment if using Supabase Auth)
-- CREATE POLICY "Users can view their own jobs" ON jobs
--     FOR SELECT USING (auth.uid() = user_id);
-- CREATE POLICY "Users can insert their own jobs" ON jobs
--     FOR INSERT WITH CHECK (auth.uid() = user_id);
-- CREATE POLICY "Users can update their own jobs" ON jobs
--     FOR UPDATE USING (auth.uid() = user_id);
