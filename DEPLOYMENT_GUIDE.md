# Facebook Ad Thief - Deployment Guide

## 🚀 How to Publish Your App

There are **3 ways** to deploy this app to make it publicly accessible:

---

## **Option 1: Cloudflare Pages (Direct Deploy)** ⚡ FASTEST

### Prerequisites
- Cloudflare account (free): https://dash.cloudflare.com/sign-up
- Cloudflare API token

### Step-by-Step

#### 1. Get Cloudflare API Token

1. Go to https://dash.cloudflare.com/profile/api-tokens
2. Click **"Create Token"**
3. Select template: **"Edit Cloudflare Workers"**
4. Click **"Continue to summary"** → **"Create Token"**
5. **Copy the token** (you'll only see it once!)

#### 2. Configure Sandbox Deploy Tab

1. **In your sidebar**, click the **"Deploy"** tab
2. Paste your Cloudflare API token
3. Click **"Save"**

#### 3. Deploy via Command Line

```bash
# Navigate to project
cd /home/user/webapp

# Build the project
npm run build

# Login to Cloudflare (will open browser)
npx wrangler login

# Create Cloudflare Pages project (first time only)
npx wrangler pages project create facebook-ad-thief \
  --production-branch main \
  --compatibility-date 2025-10-30

# Deploy to Cloudflare
npx wrangler pages deploy dist --project-name facebook-ad-thief
```

#### 4. Set Environment Variables (CRITICAL!)

```bash
# Set all your API keys as secrets
npx wrangler pages secret put SUPABASE_URL --project-name facebook-ad-thief
# When prompted, paste: https://your-project.supabase.co

npx wrangler pages secret put SUPABASE_ANON_KEY --project-name facebook-ad-thief
# When prompted, paste your anon key

npx wrangler pages secret put SUPABASE_SERVICE_ROLE_KEY --project-name facebook-ad-thief
# When prompted, paste your service role key

npx wrangler pages secret put APIFY_TOKEN --project-name facebook-ad-thief
# When prompted, paste your Apify token

npx wrangler pages secret put GOOGLE_API_KEY --project-name facebook-ad-thief
# When prompted, paste your Gemini API key

# Optional configuration
npx wrangler pages secret put MAX_ADS_PER_JOB --project-name facebook-ad-thief
# Enter: 20

npx wrangler pages secret put DEFAULT_BATCH_SIZE --project-name facebook-ad-thief
# Enter: 5
```

#### 5. Access Your App

Your app will be live at:
```
https://facebook-ad-thief.pages.dev
```

Or with a unique ID:
```
https://abc123.facebook-ad-thief.pages.dev
```

---

## **Option 2: Cloudflare Pages (via GitHub)** 🔗 RECOMMENDED

This option enables automatic deployments when you push code changes.

### Prerequisites
- GitHub account: https://github.com
- Cloudflare account: https://dash.cloudflare.com

### Step-by-Step

#### 1. Push Code to GitHub

```bash
cd /home/user/webapp

# Initialize git (already done)
git status

# Set up GitHub authentication in sidebar "GitHub" tab
# Then create a new repository on GitHub: facebook-ad-thief

# Add remote and push
git remote add origin https://github.com/YOUR_USERNAME/facebook-ad-thief.git
git push -u origin main
```

#### 2. Connect Cloudflare to GitHub

1. Go to https://dash.cloudflare.com
2. Click **"Workers & Pages"** → **"Create application"**
3. Click **"Pages"** tab → **"Connect to Git"**
4. Authorize Cloudflare to access GitHub
5. Select repository: **facebook-ad-thief**
6. Configure build settings:
   - **Framework preset**: None
   - **Build command**: `npm run build`
   - **Build output directory**: `dist`
7. Click **"Save and Deploy"**

#### 3. Set Environment Variables

1. In Cloudflare dashboard, go to your Pages project
2. Click **"Settings"** → **"Environment variables"**
3. Add these variables:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `APIFY_TOKEN`
   - `GOOGLE_API_KEY`
   - `MAX_ADS_PER_JOB` (optional, default: 20)
   - `DEFAULT_BATCH_SIZE` (optional, default: 5)

#### 4. Redeploy

Click **"Deployments"** → **"Retry deployment"**

Your app will be live at:
```
https://facebook-ad-thief.pages.dev
```

**Bonus**: Every time you push to GitHub, Cloudflare auto-deploys! 🎉

---

## **Option 3: Manual Deploy (Any Static Host)** 🌐

You can deploy the built files to any static hosting service:

### Compatible Hosts
- Vercel
- Netlify  
- GitHub Pages
- AWS S3 + CloudFront
- Google Cloud Storage

### Step-by-Step (Example: Vercel)

```bash
# Build the project
cd /home/user/webapp
npm run build

# Install Vercel CLI
npm install -g vercel

# Deploy
cd dist
vercel --prod
```

**Note**: You'll need to configure environment variables in each host's dashboard.

---

## 🔐 **Important: Environment Variables**

**CRITICAL**: Your app won't work without these environment variables set in production:

| Variable | Where to Get | Required |
|----------|--------------|----------|
| `SUPABASE_URL` | https://supabase.com/dashboard → Settings → API | ✅ Yes |
| `SUPABASE_ANON_KEY` | https://supabase.com/dashboard → Settings → API | ✅ Yes |
| `SUPABASE_SERVICE_ROLE_KEY` | https://supabase.com/dashboard → Settings → API | ✅ Yes |
| `APIFY_TOKEN` | https://console.apify.com/account/integrations | ✅ Yes |
| `GOOGLE_API_KEY` | https://ai.google.dev/ | ✅ Yes |
| `MAX_ADS_PER_JOB` | N/A (default: 20) | ❌ No |
| `DEFAULT_BATCH_SIZE` | N/A (default: 5) | ❌ No |

**⚠️ Never commit .dev.vars to GitHub! It's already in .gitignore.**

---

## 🧪 **Testing Your Deployment**

After deployment, test these:

### 1. Health Check
```bash
curl https://your-app.pages.dev/api/health
```
Should return:
```json
{"status":"healthy","timestamp":"2025-10-30T..."}
```

### 2. Create Test Job

Visit: `https://your-app.pages.dev/new`

Use this test URL:
```
https://www.facebook.com/ads/library/?active_status=all&ad_type=all&country=ALL&q=athletic%20greens&search_type=keyword_unordered
```

### 3. Monitor Logs

**Cloudflare Dashboard**:
- Go to your Pages project
- Click "Functions"
- View real-time logs

**Supabase**:
```sql
SELECT * FROM events ORDER BY created_at DESC LIMIT 50;
```

---

## 🐛 **Common Deployment Issues**

### Issue: "Missing environment variable"
**Fix**: Set all required environment variables in Cloudflare dashboard

### Issue: "Build failed"
**Fix**: Ensure you're using Node.js 18+
```bash
node --version  # Should be 18.0.0 or higher
```

### Issue: Job stays in "queued" status
**Fix**: 
1. Check Cloudflare Functions logs
2. Verify all API keys are correct
3. Test each API key individually

### Issue: "Prohibited content" for all images
**Fix**: 
1. Gemini API key might be invalid
2. Try different competitor ads
3. Check Gemini API quotas: https://ai.google.dev/

---

## 📊 **Post-Deployment Checklist**

- [ ] App loads at public URL
- [ ] Landing page displays correctly
- [ ] Job creation form works
- [ ] Test job completes successfully
- [ ] Images appear in gallery
- [ ] Download works
- [ ] Database records created in Supabase
- [ ] Images stored in Supabase Storage
- [ ] Logs appear in events table

---

## 🎯 **Quick Deploy Commands**

Copy-paste these for fastest deployment:

```bash
# 1. Build
cd /home/user/webapp && npm run build

# 2. Deploy to Cloudflare
npx wrangler pages deploy dist --project-name facebook-ad-thief

# 3. Set secrets (run each line separately)
npx wrangler pages secret put SUPABASE_URL --project-name facebook-ad-thief
npx wrangler pages secret put SUPABASE_ANON_KEY --project-name facebook-ad-thief
npx wrangler pages secret put SUPABASE_SERVICE_ROLE_KEY --project-name facebook-ad-thief
npx wrangler pages secret put APIFY_TOKEN --project-name facebook-ad-thief
npx wrangler pages secret put GOOGLE_API_KEY --project-name facebook-ad-thief

# 4. Visit your app
echo "Visit: https://facebook-ad-thief.pages.dev"
```

---

## 🌐 **Custom Domain (Optional)**

### Add Custom Domain to Cloudflare Pages

1. Go to your Pages project in Cloudflare dashboard
2. Click **"Custom domains"**
3. Click **"Set up a custom domain"**
4. Enter your domain (e.g., `ad-thief.yourdomain.com`)
5. Follow DNS setup instructions
6. Wait for SSL certificate (automatic, ~1 minute)

Your app will be accessible at your custom domain! 🎉

---

## 💡 **Pro Tips**

1. **Use Cloudflare Pages** - It's the easiest and most compatible with this app
2. **Set up GitHub integration** - Auto-deploy on every push
3. **Monitor costs** - Set up billing alerts in Apify/Gemini
4. **Enable RLS** - Add Supabase Row Level Security for production
5. **Add authentication** - Implement user auth to prevent abuse

---

## 📞 **Need Help?**

- Cloudflare Docs: https://developers.cloudflare.com/pages/
- Wrangler CLI: https://developers.cloudflare.com/workers/wrangler/
- Supabase: https://supabase.com/docs
- Project Issues: Check `events` table in Supabase

---

**🎉 Your app is ready to publish! Choose the deployment option that works best for you.**
