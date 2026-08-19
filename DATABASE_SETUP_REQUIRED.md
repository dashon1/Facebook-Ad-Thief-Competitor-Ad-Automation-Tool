# ⚠️ DATABASE SETUP REQUIRED

## Issue Found
The app returns "Failed to create job" because the **Supabase database tables need to be set up**.

Your API keys ARE configured correctly in Cloudflare. The issue is that the database schema needs to be initialized in your Supabase project.

## Steps to Fix (5 minutes)

### 1. Go to Supabase SQL Editor
1. Visit: https://supabase.com/dashboard/project/YOUR_PROJECT/sql
2. Replace `YOUR_PROJECT` with your actual Supabase project ID (from the SUPABASE_URL)

### 2. Run the Table Creation Script
Copy and paste the contents of `create_tables.sql` into the SQL editor and click **Run**.

This creates the 4 required tables:
- `jobs` - Stores job information
- `scraped_ads` - Stores Facebook ads data
- `assets` - Stores generated creatives
- `events` - Stores job processing logs

### 3. Disable Row Level Security
Copy and paste the contents of `disable_rls.sql` into the SQL editor and click **Run**.

This allows your API keys to read/write to the tables.

### 4. Verify Setup
After running both SQL scripts, the query at the end of `disable_rls.sql` should show:
```
tablename     | rowsecurity
--------------+------------
jobs          | f
scraped_ads   | f
assets        | f
events        | f
```
(The `f` means false = RLS is disabled ✅)

## Alternative: Use Supabase Dashboard

Instead of SQL editor, you can also:
1. Go to **Table Editor** in Supabase Dashboard
2. Create tables manually using the schema from `supabase-schema.sql`
3. Go to **Authentication → Policies** and ensure no RLS policies are blocking service role key

## After Setup

Once the database is initialized:
1. **Refresh the app**: https://ad-thief.pages.dev
2. **Test job creation** with any Facebook Ad Library URL
3. The app should now work correctly! 🎉

## Files to Use
- `/home/user/webapp/create_tables.sql` - Creates the database tables
- `/home/user/webapp/disable_rls.sql` - Disables Row Level Security
- `/home/user/webapp/supabase-schema.sql` - Complete schema reference

## Why This Happens
Supabase projects start with empty databases. The API keys give access, but the tables must be created separately. This is a one-time setup that persists forever.

---

**Once the database is set up, the app will work perfectly with your existing API key configuration!** ✅
