# Facebook Ad Thief - Quick Start ⚡

## 🎯 Your App is Live!

**Sandbox URL:** https://3000-irgxrvheitlo7ix59mqah-3844e1b6.sandbox.novita.ai

---

## ⚠️ Before You Start

You need API keys from these services (all have free tiers):

1. **Supabase** (database + storage) - https://supabase.com
2. **Apify** (web scraping) - https://apify.com  
3. **Google AI Studio** (Gemini API) - https://aistudio.google.com

---

## 🚀 Setup in 5 Minutes

### Step 1: Create Supabase Project
```bash
1. Go to supabase.com → New Project
2. SQL Editor → Run supabase-schema.sql
3. Storage → Create bucket: ad-thief-images (PUBLIC)
4. Settings → API → Copy URL + keys
```

### Step 2: Get API Keys
```bash
- Apify: Settings → Integrations → Copy token
- Google: aistudio.google.com → Get API Key
```

### Step 3: Configure Environment
Create `/home/user/webapp/.dev.vars`:
```bash
SUPABASE_URL=https://YOUR_PROJECT.supabase.co
SUPABASE_ANON_KEY=your_key
SUPABASE_SERVICE_ROLE_KEY=your_key
APIFY_TOKEN=your_token
GOOGLE_API_KEY=your_key
```

### Step 4: Restart Service
```bash
cd /home/user/webapp
pm2 restart webapp
```

---

## 🧪 Test It!

### Get a Test URL
1. Go to https://www.facebook.com/ads/library
2. Search "Athletic Greens"
3. Click their profile
4. Copy URL from address bar

### Create Your First Job
1. Open: https://3000-irgxrvheitlo7ix59mqah-3844e1b6.sandbox.novita.ai
2. Click "Create Your First Job"
3. Paste Facebook URL
4. Upload product image
5. Enter brand name
6. Click "Generate Inspired Creatives"
7. Wait 3-5 minutes
8. Download your AI-generated ads!

---

## 📂 Key Files

```
webapp/
├── .dev.vars              ← CREATE THIS (your API keys)
├── supabase-schema.sql    ← Run in Supabase SQL Editor
├── SETUP_GUIDE.md         ← Detailed setup instructions
└── README.md              ← Full documentation
```

---

## 🐛 Quick Fixes

**Service not responding?**
```bash
pm2 restart webapp
pm2 logs webapp --nostream
```

**Job fails?**
- Check `.dev.vars` has all API keys
- Verify Supabase schema was run
- Check storage bucket exists and is public

**Can't access app?**
- URL: https://3000-irgxrvheitlo7ix59mqah-3844e1b6.sandbox.novita.ai
- Health check: /api/health

---

## 💰 Costs

- **Supabase:** FREE (up to 500MB storage)
- **Apify:** ~$0.75 per 1000 ads
- **Google Gemini:** FREE (1500 requests/day)

**Total for testing:** ~$0.00 - $2.00

---

## 🎓 Learn More

- Full docs: `README.md`
- Detailed setup: `SETUP_GUIDE.md`
- API docs: See README.md section

---

**Ready? Let's generate some ads!** 🚀

Visit: https://3000-irgxrvheitlo7ix59mqah-3844e1b6.sandbox.novita.ai
