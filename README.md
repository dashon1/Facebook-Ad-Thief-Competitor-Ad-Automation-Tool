# Facebook Ad Thief 🎭✨

> Transform your competitor's winning ads into your own brand's creative gold. AI-powered ad recreation in minutes.

**Paste your competitor's ad page → Get on-brief, brand-safe variants for your product in minutes.**

---

## 🎯 Project Overview

**Facebook Ad Thief** is an AI-powered web application that:
- Scrapes competitor ads from Facebook Ad Library
- Uses Google Gemini 2.5 to analyze and recreate ads with your branding
- Generates campaign-ready creative assets automatically
- Saves hours of design time and thousands in creative costs

### Currently Completed Features

✅ **Job Creation** - Simple form to input competitor URL and product image  
✅ **Facebook Ad Scraping** - Automated scraping via Apify  
✅ **AI Meta-Prompting** - Gemini 2.5 Flash analyzes and creates detailed editing prompts  
✅ **Image Generation** - Gemini 2.5 Flash recreates ads with your brand  
✅ **Async Processing** - Background job processing with real-time status updates  
✅ **Storage Integration** - Supabase Storage for all images  
✅ **Beautiful UI** - Responsive design with Tailwind CSS  
✅ **Error Handling** - Prohibited content detection and graceful failures  
✅ **Progress Tracking** - Real-time job status with polling  

### Features Not Yet Implemented

⏳ **Batch ZIP Downloads** - Currently download images individually  
⏳ **User Authentication** - Currently no auth (all jobs are public)  
⏳ **Cloudflare Queues** - Using direct async calls (works for MVP)  
⏳ **Video Ad Support** - Only static images for now  

---

## 🚀 Quick Start

### Prerequisites

1. **Supabase Account** - Free tier works fine
2. **Apify Account** - For Facebook Ad Library scraping
3. **Google AI Studio Account** - For Gemini API access
4. **Node.js 18+** - For local development

### Setup Steps

#### 1. Clone and Install

```bash
git clone <your-repo-url>
cd webapp
npm install
```

#### 2. Set Up Supabase

1. Create a new Supabase project at [supabase.com](https://supabase.com)
2. Go to SQL Editor and run the schema from `supabase-schema.sql`
3. Create storage bucket:
   - Go to Storage → Create bucket
   - Name: `ad-thief-images`
   - Public bucket: YES
4. Copy your Supabase credentials

#### 3. Configure Environment Variables

Create `.dev.vars` file in the project root:

```bash
# Supabase Configuration
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_ANON_KEY=your_anon_key_here
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key_here

# Apify Configuration (get free API token from apify.com)
APIFY_TOKEN=your_apify_token_here

# Google Gemini API (get free key from aistudio.google.com)
GOOGLE_API_KEY=your_google_api_key_here

# Optional: App Configuration
MAX_ADS_PER_JOB=20
DEFAULT_BATCH_SIZE=5
```

#### 4. Build and Run Locally

```bash
# Build the project
npm run build

# Start development server with PM2
fuser -k 3000/tcp 2>/dev/null || true
pm2 start ecosystem.config.cjs

# Check logs
pm2 logs webapp --nostream

# Test it works
curl http://localhost:3000
```

Open http://localhost:3000 in your browser!

---

## 📋 API Documentation

### Functional Entry Points

#### `POST /api/jobs` - Create New Job
```json
{
  "sourceUrl": "https://www.facebook.com/ads/library/?id=...",
  "productImage": "data:image/png;base64,...",
  "brandName": "Thrive Mix",
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

#### `GET /api/jobs/:id` - Get Job Status
Returns complete job details including:
- Status (queued, scraping, generating, done, failed)
- Progress (processed_ads / total_ads)
- Assets (generated images)
- Recent events (logs)

#### `GET /api/jobs/:id/assets` - Get All Assets
Returns array of generated images with metadata

#### `PATCH /api/jobs/:id/assets/:assetId` - Update Asset
Toggle favorite status:
```json
{
  "favorited": true
}
```

---

## 🗄️ Data Architecture

### Database Tables (Supabase Postgres)

**jobs** - Main job records
- id, source_url, product_image_url, brand_name
- status, total_ads, processed_ads, successful_ads, failed_ads
- created_at, updated_at, completed_at

**scraped_ads** - Individual competitor ads
- id, job_id, source_image_url, position, status

**assets** - Generated images
- id, job_id, scraped_ad_id, file_url, storage_path
- prohibited, favorited, created_at

**events** - Audit logs
- id, job_id, level (info/warn/error), message, context

### Storage (Supabase Storage)

**Bucket:** `ad-thief-images` (public)
- `products/{jobId}/` - Uploaded product images
- `source/{jobId}/` - Downloaded competitor ads
- `generated/{jobId}/` - AI-generated creatives

---

## 🎨 User Guide

### How to Use

1. **Navigate to** https://your-app.pages.dev
2. **Click** "Create Your First Job"
3. **Enter** Facebook Ad Library URL for your competitor
4. **Upload** your product image (PNG/JPG, max 10MB)
5. **Enter** your brand name
6. **Click** "Generate Inspired Creatives"
7. **Wait** 2-5 minutes while AI processes
8. **Download** your campaign-ready ad creatives!

### Finding Competitor Ads

1. Go to [Facebook Ad Library](https://www.facebook.com/ads/library)
2. Search for your competitor brand (e.g., "Athletic Greens")
3. Click on their profile
4. Copy the URL from your browser address bar
5. Paste into Facebook Ad Thief

---

## 🚀 Deployment

### Deploy to Cloudflare Pages

```bash
# Build the project
npm run build

# Deploy to Cloudflare (first time)
npm run deploy:prod

# Set environment variables
npx wrangler pages secret put SUPABASE_URL --project-name webapp
npx wrangler pages secret put SUPABASE_ANON_KEY --project-name webapp
npx wrangler pages secret put SUPABASE_SERVICE_ROLE_KEY --project-name webapp
npx wrangler pages secret put APIFY_TOKEN --project-name webapp
npx wrangler pages secret put GOOGLE_API_KEY --project-name webapp
```

Your app will be live at: `https://webapp.pages.dev`

---

## 🏗️ Tech Stack

- **Frontend:** Hono JSX, Tailwind CSS, Vanilla JS
- **Backend:** Hono (Cloudflare Workers)
- **Database:** Supabase (PostgreSQL)
- **Storage:** Supabase Storage
- **AI:** Google Gemini 2.5 Flash
- **Scraping:** Apify (Facebook Ad Library Actor)
- **Deployment:** Cloudflare Pages

---

## 📊 Recommended Next Steps

### High Priority
1. Implement Cloudflare Queues for better job processing
2. Add user authentication (Supabase Auth)
3. Implement batch ZIP download functionality
4. Add rate limiting and quota management

### Medium Priority
5. Add video ad support
6. Implement copy/text rewriting for ads
7. Add brand style memory (fonts, colors, guidelines)
8. Create admin dashboard for monitoring

### Low Priority
9. Multi-platform support (TikTok, Pinterest)
10. Team workspaces and collaboration
11. A/B testing bundle generation
12. Webhook notifications for job completion

---

## 🔒 Legal & Ethics

**Important Disclaimers:**

- This tool creates **inspired-by** layouts for ideation purposes
- **NOT for trademark infringement** - verify usage rights before publishing
- **Respect copyright** - use for competitive research and inspiration only
- **Follow platform policies** - ensure ads comply with Facebook's rules
- **Brand safety** - review all generated content before use

---

## 📈 Current Deployment Status

**Platform:** Cloudflare Pages  
**Status:** ✅ Ready to Deploy  
**Last Updated:** 2025-10-30

### Production URLs
- **App:** (Deploy first to get URL)
- **API:** `https://your-app.pages.dev/api`
- **GitHub:** (Not yet pushed)

---

## 🐛 Known Issues

1. **Gemini Safety Filters** - Some ads may be flagged as prohibited (expected behavior, we skip these)
2. **Apify Rate Limits** - Scraping may fail if hitting API limits (retry works)
3. **Long Processing Times** - 20 ads takes ~3-5 minutes (async processing helps)

---

## 🤝 Contributing

This project is built for learning and demonstration. Feel free to:
- Report issues
- Suggest features
- Submit pull requests
- Use as inspiration for your own projects

---

## 📝 License

MIT License - Use freely for commercial and personal projects.

---

## 🙏 Credits

Built with inspiration from the n8n Facebook Ad Thief workflow.

Powered by:
- [Hono](https://hono.dev) - Fast web framework
- [Google Gemini](https://ai.google.dev) - AI image generation
- [Apify](https://apify.com) - Web scraping
- [Supabase](https://supabase.com) - Backend as a service
- [Cloudflare](https://cloudflare.com) - Edge deployment

---

**Questions? Issues? Feedback?** Open an issue or reach out!

🎭 Happy ad stealing! ✨
