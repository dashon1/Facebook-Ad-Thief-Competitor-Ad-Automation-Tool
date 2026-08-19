# 🔧 Production Error Fix - "Failed to create job"

**Issue**: App shows "Failed to create job" error when trying to create jobs

**Date**: August 19, 2026

---

## ✅ FIXED ISSUES

### Issue 1: Invalid URL Validation (FIXED)

**Problem**: App was rejecting Facebook Page URLs like `https://www.facebook.com/nike/`

**Error Message**: "Invalid Facebook Ad Library URL"

**Root Cause**: Validation was checking for `/ads/library/` in URL, but the app actually uses Facebook Page URLs

**Fix Applied**:
```typescript
// OLD (wrong):
if (!body.sourceUrl.includes('facebook.com/ads/library')) {
  return c.json({ error: 'Invalid Facebook Ad Library URL' }, 400)
}

// NEW (correct):
if (!body.sourceUrl.includes('facebook.com')) {
  return c.json({ error: 'Invalid Facebook URL' }, 400)
}
```

**Status**: ✅ Fixed and deployed

---

## ⚠️ REMAINING ISSUE

### Issue 2: Supabase Connection on Cloudflare Pages

**Problem**: "Failed to create job" error after validation passes

**Root Cause**: Cloudflare Pages environment variables not configured

**What's Missing**:
The production Cloudflare Pages deployment needs these secrets configured:

```
SUPABASE_URL=https://ulspfbgslsxdzxhseraz.supabase.co
SUPABASE_ANON_KEY=eyJhbGc...
SUPABASE_SERVICE_ROLE_KEY=eyJhbGc...
APIFY_TOKEN=apify_api_...
GOOGLE_API_KEY=AIzaSy...
MAX_ADS_PER_JOB=20
DEFAULT_BATCH_SIZE=5
```

---

## 🔑 HOW TO FIX PRODUCTION

### Option 1: Manual Configuration (Recommended)

**Via Cloudflare Dashboard**:
1. Go to https://dash.cloudflare.com
2. Navigate to: Pages → ad-thief → Settings → Environment variables
3. Add each secret:
   - `SUPABASE_URL`
   - `SUPABASE_ANON_KEY`
   - `SUPABASE_SERVICE_ROLE_KEY`
   - `APIFY_TOKEN`
   - `GOOGLE_API_KEY`
   - `MAX_ADS_PER_JOB`
   - `DEFAULT_BATCH_SIZE`
4. Redeploy the project

**Values**:
```bash
SUPABASE_URL=https://ulspfbgslsxdzxhseraz.supabase.co
SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVsc3BmYmdzbHN4ZHp4aHNlcmF6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzU4MzYyNDcsImV4cCI6MjA1MTQxMjI0N30.7-uV0d9gS7s2x_BRNBzFzZ6HiNTaHLCpMzxLk4m7uEo
SUPABASE_SERVICE_ROLE_KEY=[Get from .dev.vars file]
APIFY_TOKEN=[Get from .dev.vars file]
GOOGLE_API_KEY=[Get from .dev.vars file]
MAX_ADS_PER_JOB=20
DEFAULT_BATCH_SIZE=5
```

### Option 2: Using Wrangler CLI

```bash
cd /home/user/webapp

# Set each secret
wrangler pages secret put SUPABASE_URL --project-name ad-thief
# Enter value when prompted

wrangler pages secret put SUPABASE_ANON_KEY --project-name ad-thief
# Enter value when prompted

wrangler pages secret put SUPABASE_SERVICE_ROLE_KEY --project-name ad-thief
# Enter value when prompted

wrangler pages secret put APIFY_TOKEN --project-name ad-thief
# Enter value when prompted

wrangler pages secret put GOOGLE_API_KEY --project-name ad-thief
# Enter value when prompted

wrangler pages secret put MAX_ADS_PER_JOB --project-name ad-thief
# Enter: 20

wrangler pages secret put DEFAULT_BATCH_SIZE --project-name ad-thief
# Enter: 5

# After all secrets are set, redeploy
npm run build
npx wrangler pages deploy dist --project-name ad-thief
```

---

## 📋 WHERE TO GET SECRET VALUES

**Supabase Credentials**:
- URL: `https://ulspfbgslsxdzxhseraz.supabase.co`
- Anon Key: See above
- Service Role Key: Check `.dev.vars` file or Supabase dashboard

**Apify Token**:
- Dashboard: https://console.apify.com/account/integrations
- Format: `apify_api_...`
- Check `.dev.vars` file

**Google API Key**:
- Dashboard: https://ai.google.dev
- Format: `AIzaSy...`
- Check `.dev.vars` file

---

## ✅ VERIFICATION STEPS

After setting environment variables:

### 1. Check Secrets Are Set
```bash
wrangler pages secret list --project-name ad-thief
```

Expected output:
```
SUPABASE_URL
SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY
APIFY_TOKEN
GOOGLE_API_KEY
MAX_ADS_PER_JOB
DEFAULT_BATCH_SIZE
```

### 2. Test Job Creation
```bash
curl -X POST https://ad-thief.pages.dev/api/jobs \
  -H "Content-Type: application/json" \
  -d '{
    "sourceUrl": "https://www.facebook.com/nike/",
    "brandName": "Test Brand",
    "productImage": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==",
    "maxAds": 5,
    "batchSize": 2
  }'
```

Expected output:
```json
{
  "jobId": "some-uuid",
  "message": "Job created successfully and processing started"
}
```

### 3. Visit Job Status
```
https://ad-thief.pages.dev/jobs/[jobId from response]
```

Should show job progressing through statuses:
- queued → scraping → generating → done

---

## 🐛 DEBUGGING

### If job creation still fails:

**1. Check Cloudflare Pages Logs**:
- Go to: https://dash.cloudflare.com
- Navigate to: Pages → ad-thief → Logs
- Look for error messages

**2. Check Supabase Connection**:
```bash
# Test from command line
curl "https://ulspfbgslsxdzxhseraz.supabase.co/rest/v1/jobs?select=*&limit=1" \
  -H "apikey: YOUR_ANON_KEY" \
  -H "Authorization: Bearer YOUR_ANON_KEY"
```

Should return `200 OK` with jobs data

**3. Verify Environment Variables**:
- Go to Cloudflare Pages → Settings → Environment variables
- Ensure all 7 secrets are present
- Ensure values don't have extra spaces or quotes

---

## 📱 QUICK FIX CHECKLIST

- [ ] Validation fix deployed (✅ Already done)
- [ ] Supabase URL set in Cloudflare
- [ ] Supabase Anon Key set in Cloudflare
- [ ] Supabase Service Role Key set in Cloudflare
- [ ] Apify Token set in Cloudflare
- [ ] Google API Key set in Cloudflare
- [ ] MAX_ADS_PER_JOB set to 20
- [ ] DEFAULT_BATCH_SIZE set to 5
- [ ] Project redeployed
- [ ] Test job creation works
- [ ] Job progresses to "done" status

---

## 🎯 CURRENT STATUS

| Issue | Status | Action Required |
|-------|--------|-----------------|
| URL Validation | ✅ Fixed | None - deployed |
| Environment Variables | ⚠️ Missing | Set in Cloudflare Pages |
| Local Development | ✅ Working | None |
| GitHub Sync | ✅ Synced | None |

---

## 🚀 NEXT STEPS

1. **Set Environment Variables** (10 minutes)
   - Follow Option 1 or Option 2 above
   - Use values from `.dev.vars` file

2. **Redeploy** (2 minutes)
   ```bash
   npm run build
   npx wrangler pages deploy dist --project-name ad-thief
   ```

3. **Test** (2 minutes)
   - Create test job via UI
   - Verify it progresses to completion

4. **Verify** (3 minutes)
   - Check job status page
   - Confirm ads are generated
   - Test downloads

**Total Time**: ~15-20 minutes

---

## 📞 SUPPORT

**If you need help setting environment variables**:
1. Read `.dev.vars` file in your local project
2. Copy values to Cloudflare Pages dashboard
3. Follow screenshots in DEPLOYMENT_GUIDE.md (if available)
4. Check Cloudflare Pages documentation: https://developers.cloudflare.com/pages/configuration/secrets/

**Local Testing Works Fine**:
- Local dev server on port 3000 works perfectly
- All features functional locally
- Issue is ONLY with production environment variables

---

**Status**: 🟡 **NEEDS ENVIRONMENT VARIABLES**

**Priority**: HIGH (blocks production usage)

**Estimated Fix Time**: 15-20 minutes

**Last Updated**: August 19, 2026
