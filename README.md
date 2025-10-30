# Facebook Ad Thief 🎨🤖

**Clone your competitor's best-performing Facebook ads and recreate them with your brand in minutes using AI.**

A full-stack web application built with Hono, Cloudflare Pages, Supabase, Apify, and Google Gemini 2.5 that automates the process of finding, analyzing, and recreating competitor Facebook ads with your own branding.

## 🌟 Features

### Currently Implemented
- ✅ **Facebook Ad Library Scraping** - Automatically scrapes competitor ads via Apify
- ✅ **AI-Powered Meta-Prompting** - Uses Gemini 2.5 Pro to analyze ads and generate editing instructions
- ✅ **Image Generation** - Gemini 2.5 Flash creates branded ad variations
- ✅ **Async Job Processing** - Handles 20+ ads without blocking using Cloudflare Workers async execution
- ✅ **Real-time Progress Tracking** - Live updates via polling every 3 seconds
- ✅ **Supabase Storage Integration** - Stores source and generated images
- ✅ **Prohibited Content Detection** - Auto-skips images flagged by Gemini safety filters
- ✅ **Batch Processing** - Processes multiple ads in parallel (configurable batch size)
- ✅ **Download Gallery** - View and download all generated ads
- ✅ **Event Logging** - Complete audit trail in database
- ✅ **Error Handling** - Graceful failures with retry capability

### Not Yet Implemented
- ⏳ Video ad generation
- ⏳ Multi-platform support (TikTok, Pinterest)
- ⏳ Copy/text rewrite
- ⏳ A/B testing bundles
- ⏳ Team workspaces
- ⏳ User authentication (currently anonymous)

## 🏗️ Architecture

### Tech Stack
- **Frontend**: HTML + TailwindCSS + Vanilla JS (served by Hono)
- **Backend**: Hono (Cloudflare Workers framework)
- **Database**: Supabase Postgres
- **Storage**: Supabase Storage
- **Scraping**: Apify Facebook Ad Library Actor
- **AI**: Google Gemini 2.5 Flash (meta-prompting + image generation)
- **Deployment**: Cloudflare Pages

### Data Flow
```
User Input (URL + Product Image)
    ↓
Job Created in Supabase
    ↓
Async Processing (Cloudflare Workers waitUntil)
    ↓
Apify Scrapes Facebook Ad Library
    ↓
For Each Ad (Parallel Batches):
    - Download competitor ad image
    - Generate meta-prompt (Gemini Pro)
    - Generate new image (Gemini Flash)
    - Upload to Supabase Storage
    - Save asset record
    ↓
Job Marked Complete
```

## 🗄️ Database Schema

### Tables
- **jobs** - Job metadata, status, progress counters
- **scraped_ads** - Competitor ads from Facebook
- **assets** - Generated output images
- **events** - Audit log for each job

See `supabase-schema.sql` for full schema.

## 🚀 Setup Instructions

### 1. Prerequisites
- Node.js 20+
- Supabase account
- Apify account
- Google Cloud account (Gemini API access)
- Cloudflare account (for deployment)

### 2. Supabase Setup

1. Create a new Supabase project at https://supabase.com
2. Run the schema in Supabase SQL Editor:
```bash
# Copy contents of supabase-schema.sql and run it in Supabase SQL Editor
```

3. Create storage bucket:
   - Go to Storage → Create bucket
   - Name: `ad-thief-images`
   - Public bucket: ✅ Yes
   - File size limit: 10MB

4. Get your credentials:
   - Project URL: `https://xxxxx.supabase.co`
   - Anon Key: Settings → API → anon public
   - Service Role Key: Settings → API → service_role (keep secret!)

### 3. API Keys Setup

1. **Apify** (https://apify.com)
   - Sign up and get API token
   - Recommended actor: `curious_coder/facebook-ads-library-scraper`
   - Pricing: ~$0.75 per 1000 ads

2. **Google Gemini** (https://ai.google.dev)
   - Create API key in Google AI Studio
   - Enable Gemini API
   - Free tier: 60 requests/minute

### 4. Local Development

1. Clone and install:
```bash
cd /home/user/webapp
npm install
```

2. Create `.dev.vars` file:
```bash
cp .dev.vars.example .dev.vars
# Edit .dev.vars with your credentials
```

3. Build the project:
```bash
npm run build
```

4. Start development server:
```bash
# Option 1: Using PM2 (recommended)
fuser -k 3000/tcp 2>/dev/null || true
pm2 start ecosystem.config.cjs
pm2 logs --nostream

# Option 2: Direct wrangler
npm run dev:sandbox
```

5. Test the app:
```bash
curl http://localhost:3000
# Or visit http://localhost:3000 in browser
```

### 5. Production Deployment

1. Install wrangler CLI:
```bash
npm install -g wrangler
```

2. Login to Cloudflare:
```bash
wrangler login
```

3. Set production secrets:
```bash
cd /home/user/webapp

# Set all secrets (you'll be prompted for values)
wrangler pages secret put SUPABASE_URL
wrangler pages secret put SUPABASE_ANON_KEY
wrangler pages secret put SUPABASE_SERVICE_ROLE_KEY
wrangler pages secret put APIFY_TOKEN
wrangler pages secret put GOOGLE_API_KEY
wrangler pages secret put MAX_ADS_PER_JOB  # Optional, default: 20
wrangler pages secret put DEFAULT_BATCH_SIZE  # Optional, default: 5
```

4. Deploy to Cloudflare Pages:
```bash
npm run build
npx wrangler pages deploy dist --project-name facebook-ad-thief
```

5. Your app will be live at:
   - `https://facebook-ad-thief.pages.dev`

## 📡 API Endpoints

### `POST /api/jobs`
Create a new ad cloning job

**Request Body:**
```json
{
  "sourceUrl": "https://www.facebook.com/ads/library/?active_status=all&...",
  "brandName": "Your Brand",
  "productImage": "data:image/png;base64,iVBORw0KG...",
  "maxAds": 20,
  "batchSize": 5
}
```

**Response:**
```json
{
  "jobId": "uuid-here",
  "message": "Job created successfully and processing started"
}
```

### `GET /api/jobs/:id`
Get job status and results

**Response:**
```json
{
  "id": "uuid",
  "status": "generating",
  "total_ads": 20,
  "processed_ads": 15,
  "successful_ads": 13,
  "failed_ads": 2,
  "assets": [...],
  "recent_events": [...]
}
```

### `GET /api/jobs/:id/assets`
Get all generated assets for a job

### `POST /api/jobs/:id/retry`
Retry a failed job

### `GET /api/health`
Health check endpoint

## 📊 Current Functional URIs

| Path | Method | Description |
|------|--------|-------------|
| `/` | GET | Landing page with feature overview |
| `/new` | GET | Job creation form |
| `/jobs/:id` | GET | Job status and gallery page |
| `/api/jobs` | POST | Create new job |
| `/api/jobs/:id` | GET | Get job status |
| `/api/jobs/:id/assets` | GET | Get job assets |
| `/api/jobs/:id/retry` | POST | Retry failed job |
| `/api/health` | GET | Health check |

## 🎯 Usage Guide

### Step 1: Find Competitor Ads
1. Go to https://www.facebook.com/ads/library/
2. Search for your competitor (e.g., "Athletic Greens" or "AG1")
3. Copy the URL from your browser

### Step 2: Submit Job
1. Visit `/new` page
2. Paste the Facebook Ad Library URL
3. Enter your brand name
4. Upload your product image (PNG/JPG, max 10MB)
5. Configure advanced options (optional):
   - Max ads: How many ads to process (1-50)
   - Batch size: Parallel processing (1-10)
6. Click "Generate Inspired Creatives"

### Step 3: Monitor Progress
1. You'll be redirected to `/jobs/:id` page
2. Watch real-time progress:
   - Status updates every 3 seconds
   - Progress bar shows completion
   - Stats show total, processed, successful, failed
3. Wait 2-5 minutes for completion (depends on batch size)

### Step 4: Download Results
1. Generated ads appear in gallery as they complete
2. Click individual download icons for single images
3. Click "Download All" for bulk download
4. Images are permanently stored in Supabase

## ⚙️ Configuration

### Environment Variables

| Variable | Required | Default | Description |
|----------|----------|---------|-------------|
| `SUPABASE_URL` | ✅ Yes | - | Your Supabase project URL |
| `SUPABASE_ANON_KEY` | ✅ Yes | - | Supabase anon public key |
| `SUPABASE_SERVICE_ROLE_KEY` | ✅ Yes | - | Supabase service role key |
| `APIFY_TOKEN` | ✅ Yes | - | Apify API token |
| `GOOGLE_API_KEY` | ✅ Yes | - | Google Gemini API key |
| `MAX_ADS_PER_JOB` | ❌ No | 20 | Maximum ads to process per job |
| `DEFAULT_BATCH_SIZE` | ❌ No | 5 | Default parallel batch size |

### Performance Tuning

**Batch Size vs. Speed:**
- Batch size 1: Slowest, most reliable
- Batch size 5: Balanced (recommended)
- Batch size 10: Fastest, higher failure rate

**Cost Optimization:**
- Apify: ~$0.75 per 1000 ads
- Gemini: Free tier (60 req/min), then pay-as-you-go
- Supabase: Free tier includes 500MB storage
- Cloudflare: Free tier includes 100k req/day

## 🔧 Troubleshooting

### Job Stuck in "Queued"
- Check logs in Supabase Events table
- Verify all environment variables are set
- Ensure Apify token is valid

### "Prohibited Content" Errors
- Gemini safety filters flagged the content
- These are automatically skipped
- Try different competitor ads

### Storage Upload Failures
- Check Supabase storage bucket exists and is public
- Verify service role key has storage permissions
- Check file size < 10MB

### Scraping Returns 0 Ads
- Verify Facebook Ad Library URL is correct
- Competitor may have no active ads
- Try different search query

## 📈 Monitoring

### Logs
- **Database Events**: `SELECT * FROM events WHERE job_id = 'xxx' ORDER BY created_at DESC`
- **Cloudflare Logs**: Visit Cloudflare Dashboard → Pages → Logs
- **PM2 Logs** (local): `pm2 logs webapp --nostream`

### Metrics to Track
- Average job completion time
- Success rate (successful_ads / total_ads)
- Prohibited content rate
- API costs per job

## 🚧 Known Limitations

1. **Cloudflare Workers CPU Time**: 30s max per request
   - Mitigated by async processing with `waitUntil`
   - Long jobs may timeout on first request

2. **Gemini Safety Filters**: Conservative filtering
   - ~10-20% of ads may be flagged as prohibited
   - No appeals process currently

3. **Apify Rate Limits**: 30 req/min on free tier
   - Jobs process sequentially
   - Large batches may take longer

4. **No Authentication**: Currently anonymous
   - Anyone can create jobs
   - Add Supabase Auth for production

## 📝 Recommended Next Steps

1. **Add Authentication**
   - Implement Supabase Auth
   - Add user quotas/limits
   - Enable RLS policies

2. **Improve UX**
   - WebSocket real-time updates (replace polling)
   - Better error messages
   - Favorite/organize generated ads

3. **Add Features**
   - Text copy rewrite
   - Multiple brand kits
   - Comparison mode (before/after)
   - Export to ad platforms (Facebook, Google)

4. **Optimize Performance**
   - Cache product images
   - Dedupe identical source ads
   - Cloudflare Workers Durable Objects for coordination

5. **Analytics**
   - Track user behavior
   - Monitor costs per job
   - A/B test generation prompts

## 📦 Deployment Status

- **Platform**: Cloudflare Pages
- **Status**: ⏳ Ready for deployment
- **Last Updated**: 2025-10-30

## 🔐 Security Notes

- ⚠️ Service role key must be kept secret
- ⚠️ No RLS enabled by default (add for production)
- ⚠️ File uploads not virus scanned
- ⚠️ No rate limiting on API endpoints
- ✅ Uses HTTPS by default (Cloudflare)
- ✅ Environment variables stored securely in Cloudflare

## 📄 License

This tool is for ideation purposes only. Always respect intellectual property rights and platform policies before publishing generated ads.

## 🤝 Contributing

Contributions welcome! Please:
1. Fork the repo
2. Create feature branch
3. Test thoroughly
4. Submit PR with description

---

**Built with ❤️ using Hono + Cloudflare + Supabase + Google Gemini**
