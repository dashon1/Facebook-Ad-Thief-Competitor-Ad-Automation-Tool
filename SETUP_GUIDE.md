# Facebook Ad Thief - Complete Setup Guide

This guide will walk you through setting up the Facebook Ad Thief application from scratch.

## 📋 Prerequisites Checklist

Before you begin, make sure you have accounts for:

- [ ] **Supabase** - https://supabase.com (Free tier available)
- [ ] **Apify** - https://apify.com (Free $5 credit on signup)
- [ ] **Google Cloud** - https://ai.google.dev (Free tier: 60 req/min)
- [ ] **Cloudflare** - https://cloudflare.com (Free tier includes Workers)

## Step 1: Supabase Setup (15 minutes)

### 1.1 Create Supabase Project

1. Go to https://supabase.com/dashboard
2. Click "New Project"
3. Choose organization and fill in:
   - **Name**: `facebook-ad-thief`
   - **Database Password**: Generate a strong password (save it!)
   - **Region**: Choose closest to your users
4. Click "Create new project" and wait ~2 minutes

### 1.2 Create Database Schema

1. In your project, go to **SQL Editor**
2. Open the file `/home/user/webapp/supabase-schema.sql`
3. Copy ALL the contents
4. Paste into Supabase SQL Editor
5. Click "Run" button
6. You should see: "Success. No rows returned"

### 1.3 Create Storage Bucket

1. Go to **Storage** in left sidebar
2. Click "Create a new bucket"
3. Configure:
   - **Name**: `ad-thief-images`
   - **Public bucket**: ✅ ON
   - **File size limit**: 10485760 (10MB)
4. Click "Create bucket"

### 1.4 Get API Credentials

1. Go to **Settings** → **API**
2. Copy these values (you'll need them soon):
   ```
   Project URL: https://xxxxxxxxxxxxx.supabase.co
   anon public key: eyJhbGc...
   service_role key: eyJhbGc... (⚠️ Keep this secret!)
   ```

## Step 2: Apify Setup (5 minutes)

### 2.1 Create Account

1. Go to https://console.apify.com/sign-up
2. Sign up (you get $5 free credit)
3. Verify your email

### 2.2 Get API Token

1. Go to https://console.apify.com/account/integrations
2. Under "API tokens", copy your **Personal API token**
3. Save it (you'll use this as `APIFY_TOKEN`)

### 2.3 Test the Actor (Optional)

1. Go to https://apify.com/apify/facebook-ads-scraper (Official Apify Scraper)
2. Click "Try for free"
3. Test with any of these URLs:
   - By keyword: `https://www.facebook.com/ads/library/?active_status=all&ad_type=all&country=ALL&q=nike`
   - By page: `https://www.facebook.com/ComplexSneakers/`
4. Should scrape ~20 ads successfully

**Pricing**: 
- Free tier: $5.80 per 1,000 ads
- Paid plans: Starting at $5.00 per 1,000 ads (Starter plan)

## Step 3: Google Gemini API Setup (5 minutes)

### 3.1 Get API Key

1. Go to https://ai.google.dev/
2. Click "Get API key in Google AI Studio"
3. Sign in with Google account
4. Click "Create API key"
5. Select or create a Google Cloud project
6. Copy the API key (looks like: `AIzaSyB...`)

### 3.2 Verify Access

You can test in browser console:
```bash
curl "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent?key=YOUR_API_KEY" \
  -H 'Content-Type: application/json' \
  -d '{"contents":[{"parts":[{"text":"Hello"}]}]}'
```

## Step 4: Configure Local Environment

### 4.1 Update .dev.vars File

1. Open `/home/user/webapp/.dev.vars`
2. Replace placeholders with your actual credentials:

```bash
# Supabase Configuration
SUPABASE_URL=https://xxxxxxxxxxxxx.supabase.co
SUPABASE_ANON_KEY=eyJhbGc...your_anon_key
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...your_service_role_key

# Apify Configuration
APIFY_TOKEN=apify_api_xxx...your_token

# Google Gemini API Configuration
GOOGLE_API_KEY=AIzaSyB...your_api_key

# App Configuration
MAX_ADS_PER_JOB=20
DEFAULT_BATCH_SIZE=5
```

### 4.2 Rebuild and Restart

```bash
cd /home/user/webapp
npm run build
fuser -k 3000/tcp 2>/dev/null || true
pm2 restart webapp
```

## Step 5: Test the Application

### 5.1 Access the App

1. Visit: https://3000-irgxrvheitlo7ix59mqah-3844e1b6.sandbox.novita.ai
2. You should see the landing page with "Facebook Ad Thief"

### 5.2 Test Job Creation

1. Click "Start Creating Ads"
2. Enter this test URL:
   ```
   https://www.facebook.com/ads/library/?active_status=all&ad_type=all&country=ALL&q=athletic%20greens&search_type=keyword_unordered
   ```
3. Enter brand name: `Test Brand`
4. Upload any product image (PNG/JPG)
5. Click "Generate Inspired Creatives"

### 5.3 Monitor Progress

1. You'll be redirected to `/jobs/{job-id}`
2. Watch the status change:
   - Queued → Scraping → Generating → Done
3. Check Supabase tables to verify data:
   ```sql
   SELECT * FROM jobs ORDER BY created_at DESC LIMIT 1;
   SELECT * FROM events WHERE job_id = 'YOUR_JOB_ID';
   ```

### 5.4 Troubleshooting

**If job gets stuck:**
```sql
-- Check events table for errors
SELECT * FROM events WHERE job_id = 'YOUR_JOB_ID' ORDER BY created_at DESC;

-- Check job error field
SELECT status, error FROM jobs WHERE id = 'YOUR_JOB_ID';
```

**Common issues:**
- ❌ "Missing SUPABASE_URL" → Check .dev.vars has correct values
- ❌ Job stays "queued" → Check PM2 logs: `pm2 logs webapp --nostream`
- ❌ Apify timeout → Increase timeout in `src/lib/apify.ts` line 53
- ❌ Gemini "prohibited" → Normal, ~10-20% of ads get flagged

## Step 6: Production Deployment (Optional)

### 6.1 Install Wrangler CLI

```bash
npm install -g wrangler
wrangler login
```

### 6.2 Set Production Secrets

```bash
cd /home/user/webapp

# You'll be prompted to enter each value
wrangler pages secret put SUPABASE_URL
wrangler pages secret put SUPABASE_ANON_KEY
wrangler pages secret put SUPABASE_SERVICE_ROLE_KEY
wrangler pages secret put APIFY_TOKEN
wrangler pages secret put GOOGLE_API_KEY
```

### 6.3 Deploy

```bash
npm run build
npx wrangler pages deploy dist --project-name facebook-ad-thief
```

Your app will be live at: `https://facebook-ad-thief.pages.dev`

## 🎯 Usage Tips

### Best Practices

1. **Start Small**: Test with `maxAds: 5` before running full batches
2. **Monitor Costs**: 
   - Apify: ~$0.75 per 1000 ads
   - Gemini: Free tier is generous (60 req/min)
3. **Quality Product Images**: Use high-res, clear product shots for best results
4. **Brand Name**: Use exact capitalization (e.g., "ThriveMax" not "thrivemax")

### Cost Estimation

For processing 20 competitor ads:
- **Apify**: $0.015 (20 ads × $0.00075)
- **Gemini**: $0.00 (free tier)
- **Supabase**: $0.00 (free tier)
- **Cloudflare**: $0.00 (free tier)
- **Total**: ~$0.02 per job ✨

### Performance Tuning

**Batch Size Impact:**
| Batch Size | Time | Reliability | Recommended For |
|------------|------|-------------|-----------------|
| 1 | ~10 min | ⭐⭐⭐⭐⭐ | First test run |
| 3 | ~5 min | ⭐⭐⭐⭐ | Conservative |
| 5 | ~3 min | ⭐⭐⭐ | **Default** |
| 10 | ~2 min | ⭐⭐ | Speed priority |

## 🔍 Debugging Checklist

If things aren't working:

- [ ] Check PM2 status: `pm2 status`
- [ ] Check PM2 logs: `pm2 logs webapp --nostream`
- [ ] Verify env vars loaded: Look for "Using vars defined in .dev.vars" in logs
- [ ] Test Supabase connection:
  ```bash
  curl "https://YOUR_PROJECT.supabase.co/rest/v1/jobs" \
    -H "apikey: YOUR_ANON_KEY"
  ```
- [ ] Test Apify token:
  ```bash
  curl "https://api.apify.com/v2/acts?token=YOUR_TOKEN"
  ```
- [ ] Test Gemini API:
  ```bash
  curl "https://generativelanguage.googleapis.com/v1beta/models?key=YOUR_KEY"
  ```

## 📚 Additional Resources

- **Supabase Docs**: https://supabase.com/docs
- **Apify Docs**: https://docs.apify.com/
- **Gemini API Docs**: https://ai.google.dev/docs
- **Hono Docs**: https://hono.dev/
- **Cloudflare Pages**: https://developers.cloudflare.com/pages/

## 🆘 Getting Help

If you're stuck:

1. Check the logs first: `pm2 logs webapp --nostream`
2. Check Supabase events table: `SELECT * FROM events ORDER BY created_at DESC LIMIT 50;`
3. Verify all API keys are valid
4. Try with a single ad first: `maxAds: 1`

## ✅ Success Criteria

You've successfully set up the app when:

- ✅ Landing page loads at localhost:3000
- ✅ Job creation form accepts input
- ✅ Job progresses through: queued → scraping → generating → done
- ✅ Generated images appear in gallery
- ✅ Images stored in Supabase Storage
- ✅ Can download individual images

---

**Congratulations! 🎉 Your Facebook Ad Thief is ready to clone competitor ads!**
