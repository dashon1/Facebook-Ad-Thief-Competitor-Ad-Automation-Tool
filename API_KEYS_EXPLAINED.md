# 🔑 API Keys Explained - What Each One Does

**Your Facebook Ad Thief app needs 7 API keys to work. Here's what each one does and where to get it.**

---

## 📋 Quick Overview

| API Key | What It Does | Required? | Cost |
|---------|--------------|-----------|------|
| **SUPABASE_URL** | Database connection | ✅ Yes | Free |
| **SUPABASE_ANON_KEY** | Database read access | ✅ Yes | Free |
| **SUPABASE_SERVICE_ROLE_KEY** | Database write access | ✅ Yes | Free |
| **APIFY_TOKEN** | Scrapes Facebook ads | ✅ Yes | $5 free credit |
| **GOOGLE_API_KEY** | AI image generation | ✅ Yes | Free tier (60 req/min) |
| **MAX_ADS_PER_JOB** | Configuration | ❌ No | N/A |
| **DEFAULT_BATCH_SIZE** | Configuration | ❌ No | N/A |

---

## 1️⃣ SUPABASE_URL

### What it does:
- **Connects to your database** where jobs, ads, and results are stored
- Without this, the app can't save or retrieve any data

### Where to get it:
```
https://ulspfbgslsxdzxhseraz.supabase.co
```

### How to get it (if you need to check):
1. Go to: https://supabase.com/dashboard
2. Select your project: `facebook-ad-thief`
3. Go to: **Settings** → **API**
4. Copy: **Project URL**

### Example value:
```
https://ulspfbgslsxdzxhseraz.supabase.co
```

---

## 2️⃣ SUPABASE_ANON_KEY

### What it does:
- **Public key** for reading data from database
- Allows the frontend to fetch job status, view results, etc.
- Safe to expose in browser (read-only access)

### Where to get it:
Already known:
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVsc3BmYmdzbHN4ZHp4aHNlcmF6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU4MzYyNDcsImV4cCI6MjA1MTQxMjI0N30.7-uV0d9gS7s2x_BRNBzFzZ6HiNTaHLCpMzxLk4m7uEo
```

### How to get it (if you need to check):
1. Go to: https://supabase.com/dashboard
2. Select your project: `facebook-ad-thief`
3. Go to: **Settings** → **API**
4. Copy: **anon public** key

### Example value:
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

## 3️⃣ SUPABASE_SERVICE_ROLE_KEY

### What it does:
- **Secret key** with full database access (read AND write)
- Allows backend to create jobs, save scraped ads, upload images
- **Must be kept secret** - never expose in frontend code

### Where to get it:
Check your `.dev.vars` file:
```bash
cat /home/user/webapp/.dev.vars | grep SUPABASE_SERVICE_ROLE_KEY
```

Or get it from Supabase dashboard:
1. Go to: https://supabase.com/dashboard
2. Select your project: `facebook-ad-thief`
3. Go to: **Settings** → **API**
4. Copy: **service_role** key (click to reveal)

### Example value:
```
eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVsc3BmYmdzbHN4ZHp4aHNlcmF6Iiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTczNTgzNjI0NywiZXhwIjoyMDUxNDEyMjQ3fQ...
```

### ⚠️ IMPORTANT:
- **Keep this secret**
- Never commit to git
- Never expose in frontend
- Has full database access

---

## 4️⃣ APIFY_TOKEN

### What it does:
- **Scrapes competitor ads** from Facebook Ad Library
- Connects to Apify service to run the scraping actor
- Returns ads as JSON data (images, text, metadata)

### Why you need it:
Without this, the app can't find any competitor ads to clone!

### Where to get it:
1. Go to: https://console.apify.com/account/integrations
2. Sign in (or create free account)
3. Find: **Personal API tokens**
4. Copy your token (starts with `apify_api_`)

Or check your `.dev.vars` file:
```bash
cat /home/user/webapp/.dev.vars | grep APIFY_TOKEN
```

### Example value:
```
apify_api_1234567890abcdefghijklmnopqrstuvwxyz
```

### Cost:
- **Free tier**: $5 credit (~860 ads free)
- **After that**: $5.80 per 1,000 ads (~$0.12 per 20 ads)

### What happens without it:
- Job gets stuck in "scraping" status
- Error: "Apify actor start failed"
- No ads found

---

## 5️⃣ GOOGLE_API_KEY

### What it does:
- **Powers the AI** that generates new ad images
- Uses Google Gemini 2.5 Flash to:
  - Analyze competitor ad styles
  - Generate meta-prompts
  - Create new ads with your branding

### Why you need it:
Without this, the app can't generate any new ads!

### Where to get it:
1. Go to: https://ai.google.dev
2. Sign in with Google account
3. Click: **Get API key**
4. Create new API key or use existing
5. Copy key (starts with `AIzaSy`)

Or check your `.dev.vars` file:
```bash
cat /home/user/webapp/.dev.vars | grep GOOGLE_API_KEY
```

### Example value:
```
AIzaSyAbCdEfGhIjKlMnOpQrStUvWxYz1234567
```

### Cost:
- **Free tier**: 60 requests per minute
- **After that**: Pay-as-you-go (very affordable)
- For 20 ads: Usually stays within free tier

### What happens without it:
- Job gets stuck in "generating" status  
- Error: "Image generation failed"
- No branded ads created

---

## 6️⃣ MAX_ADS_PER_JOB

### What it does:
- **Limits** maximum ads processed per job
- Prevents accidentally processing too many ads (high costs)
- Default: 20 ads

### Where to set it:
Just enter the number: `20`

### Not in .dev.vars?
That's OK! Just set it to: **20**

### Why it's needed:
- Protects from runaway costs
- Ensures reasonable job completion times
- User can still request fewer ads (1-50)

### Example value:
```
20
```

---

## 7️⃣ DEFAULT_BATCH_SIZE

### What it does:
- **Controls** how many ads are processed in parallel
- Smaller batch = slower but more reliable
- Larger batch = faster but may fail more often
- Default: 5 ads at a time

### Where to set it:
Just enter the number: `5`

### Not in .dev.vars?
That's OK! Just set it to: **5**

### Why it's needed:
- Balances speed vs reliability
- Prevents overwhelming APIs
- Reduces rate limit errors

### Example value:
```
5
```

---

## 📥 How to Get ALL Your Values

### Method 1: Check .dev.vars File
```bash
cat /home/user/webapp/.dev.vars
```

This file has ALL your API keys already configured for local development!

### Method 2: Dashboard Links

**Supabase** (3 keys):
- Dashboard: https://supabase.com/dashboard
- Project: facebook-ad-thief
- Go to: Settings → API

**Apify** (1 key):
- Dashboard: https://console.apify.com/account/integrations
- Look for: Personal API tokens

**Google Gemini** (1 key):
- Dashboard: https://ai.google.dev
- Click: Get API key

**Config values** (2 settings):
- MAX_ADS_PER_JOB: `20`
- DEFAULT_BATCH_SIZE: `5`

---

## 🔒 Security Notes

### ✅ Safe to expose (public):
- SUPABASE_URL ✅
- SUPABASE_ANON_KEY ✅
- MAX_ADS_PER_JOB ✅
- DEFAULT_BATCH_SIZE ✅

### 🔐 Must keep secret:
- SUPABASE_SERVICE_ROLE_KEY 🔒 (full database access)
- APIFY_TOKEN 🔒 (charges to your account)
- GOOGLE_API_KEY 🔒 (charges to your account)

### How Cloudflare keeps them safe:
- Stored encrypted
- Never exposed in browser
- Only accessible to backend code
- Not visible in page source

---

## 💰 Cost Summary

| Service | Free Tier | After Free Tier |
|---------|-----------|-----------------|
| **Supabase** | 500 MB storage | Free for most users |
| **Apify** | $5 credit (~860 ads) | $5.80 per 1,000 ads |
| **Google Gemini** | 60 req/min | Pay-as-you-go (cheap) |
| **Cloudflare** | 100k req/day | Free for most |

**Typical job (20 ads)**:
- Apify: ~$0.12
- Gemini: Free (under 60 req/min)
- Supabase: Free
- Cloudflare: Free
- **Total**: ~$0.12

---

## ❓ FAQ

### Q: Where do I find these keys?
**A**: All in `/home/user/webapp/.dev.vars` file!

### Q: Are these the same keys for local and production?
**A**: YES! Use the same keys for both.

### Q: What if I don't have a .dev.vars file?
**A**: Check the dashboards listed above to get new keys.

### Q: Will these keys be exposed to users?
**A**: NO! Cloudflare keeps them encrypted and server-side only.

### Q: Do I need to pay for these services?
**A**: Most stay free. Only Apify charges after $5 free credit.

### Q: What if my Apify credit runs out?
**A**: Jobs will fail. Add payment method in Apify dashboard.

### Q: Can I use different keys for testing?
**A**: Yes, but easier to use same keys for local and production.

---

## 🎯 Quick Copy-Paste Guide

**To see all your keys right now**:
```bash
cat /home/user/webapp/.dev.vars
```

**To set them in Cloudflare (Option 2)**:
```bash
cd /home/user/webapp

# Get values from .dev.vars, then:
wrangler pages secret put SUPABASE_URL --project-name ad-thief
# Paste: https://ulspfbgslsxdzxhseraz.supabase.co

wrangler pages secret put SUPABASE_ANON_KEY --project-name ad-thief  
# Paste: eyJhbGc... (from .dev.vars)

wrangler pages secret put SUPABASE_SERVICE_ROLE_KEY --project-name ad-thief
# Paste: eyJhbGc... (from .dev.vars)

wrangler pages secret put APIFY_TOKEN --project-name ad-thief
# Paste: apify_api_... (from .dev.vars)

wrangler pages secret put GOOGLE_API_KEY --project-name ad-thief
# Paste: AIzaSy... (from .dev.vars)

wrangler pages secret put MAX_ADS_PER_JOB --project-name ad-thief
# Enter: 20

wrangler pages secret put DEFAULT_BATCH_SIZE --project-name ad-thief
# Enter: 5

# Redeploy
npm run build
npx wrangler pages deploy dist --project-name ad-thief
```

---

## ✅ Verification

After setting all keys, verify they're configured:

```bash
wrangler pages secret list --project-name ad-thief
```

Should show:
```
SUPABASE_URL
SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
APIFY_TOKEN
GOOGLE_API_KEY
MAX_ADS_PER_JOB
DEFAULT_BATCH_SIZE
```

If all 7 are listed, you're done! ✅

---

**Ready to configure?** Just copy the values from `.dev.vars` and follow the guide above! 🚀
