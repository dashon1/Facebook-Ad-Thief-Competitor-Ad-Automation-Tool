# Facebook Ad Thief - Quick Start (5 Minutes)

The fastest way to get started with Facebook Ad Thief.

## 🚀 What You'll Build

An AI-powered app that:
1. Scrapes competitor Facebook ads
2. Recreates them with YOUR branding using Google Gemini
3. Stores results in Supabase

## ⚡ Super Fast Setup

### 1. Get API Keys (5 minutes)

**Supabase** (https://supabase.com):
- Create project → Get URL + anon key + service role key
- Run `supabase-schema.sql` in SQL Editor
- Create bucket: `ad-thief-images` (public)

**Apify** (https://console.apify.com):
- Sign up → Copy API token

**Google Gemini** (https://ai.google.dev):
- Get API key from Google AI Studio

### 2. Configure App

Edit `/home/user/webapp/.dev.vars`:
```bash
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=eyJ...
SUPABASE_SERVICE_ROLE_KEY=eyJ...
APIFY_TOKEN=apify_api_...
GOOGLE_API_KEY=AIzaSy...
```

### 3. Start Server

```bash
cd /home/user/webapp
npm run build
fuser -k 3000/tcp 2>/dev/null || true
pm2 start ecosystem.config.cjs
```

### 4. Test It!

Visit: **https://3000-irgxrvheitlo7ix59mqah-3844e1b6.sandbox.novita.ai**

Test URL:
```
https://www.facebook.com/ads/library/?active_status=all&ad_type=all&country=ALL&q=athletic%20greens&search_type=keyword_unordered
```

## 🎯 How It Works

```
User → Paste competitor ad URL + Upload product image
  ↓
Apify scrapes Facebook Ad Library (30s)
  ↓
For each ad (parallel):
  1. Gemini Pro analyzes → creates editing prompt
  2. Gemini Flash generates → new branded image
  ↓
Results in Supabase Storage → Download gallery
```

## 📊 What You'll See

**Status Progression:**
```
Queued → Scraping → Generating → Done
(0%)     (10%)      (50-90%)    (100%)
```

**Typical Timeline:**
- 5 ads: ~1 minute
- 10 ads: ~2 minutes
- 20 ads: ~3-5 minutes

## 🔧 If Something Breaks

```bash
# Check logs
pm2 logs webapp --nostream

# Restart server
pm2 restart webapp

# Check database
psql $SUPABASE_URL -c "SELECT * FROM events ORDER BY created_at DESC LIMIT 10;"
```

## 💰 Cost (20 ads)

- Apify: $0.015
- Gemini: Free
- Supabase: Free
- Cloudflare: Free
- **Total**: ~$0.02 ✨

## 🎉 That's It!

You now have a working AI ad cloner. See `SETUP_GUIDE.md` for detailed configuration.

---

**Current Status**: ✅ App running at https://3000-irgxrvheitlo7ix59mqah-3844e1b6.sandbox.novita.ai
