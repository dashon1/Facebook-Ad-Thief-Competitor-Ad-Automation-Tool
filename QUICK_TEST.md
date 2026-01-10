# Quick Test Guide - Facebook Ad Thief

## 🚀 Ready to Test?

Your app is LIVE and updated with the working Apify actor! Here's how to test it right now:

## Option 1: Production Test (Recommended)

### 1️⃣ Open the App
👉 **https://ad-thief.pages.dev**

### 2️⃣ Fill in the Form

**Facebook Ad Library URL** (choose one):
```
https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=ALL&q=nike
```
or
```
https://www.facebook.com/ComplexSneakers/
```
or
```
https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=ALL&q=athletic greens
```

**Brand Name**:
```
My Awesome Brand
```

**Product Image**:
- Upload any product image (PNG/JPG, up to 10MB)
- Or use this sample: Search Google Images for "product shot" and download any

**Advanced Options** (optional):
- Max Ads: `5` (for faster testing)
- Batch Size: `2` (for faster testing)

### 3️⃣ Click "Generate Inspired Creatives"

You should see:
- ✅ Job created successfully
- ✅ Progress page opens
- ✅ Status updates every 3 seconds
- ✅ Scraping → Prompting → Generating → Saving → Done
- ✅ Gallery of generated ads appears

## Option 2: API Test (Advanced)

### Test via cURL:

```bash
# 1. Health check
curl https://ad-thief.pages.dev/api/health

# Expected output:
# {"status":"healthy","timestamp":"2026-01-10T..."}

# 2. Create a test job
curl -X POST https://ad-thief.pages.dev/api/jobs \
  -H "Content-Type: application/json" \
  -d '{
    "sourceUrl": "https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=ALL&q=nike",
    "brandName": "Test Brand",
    "productImage": "data:image/png;base64,iVBORw0KGgoAAAANS...",
    "maxAds": 3,
    "batchSize": 2
  }'

# Expected output:
# {"jobId":"uuid-here","message":"Job created successfully and processing started"}

# 3. Check job status
curl https://ad-thief.pages.dev/api/jobs/{jobId}
```

## 📊 What to Expect

### Timeline:
- **0-30s**: Scraping Facebook Ad Library (Apify)
- **30s-2m**: Analyzing ads with Gemini AI
- **2m-5m**: Generating branded images (depends on batch size)
- **Total**: 2-5 minutes for 5-20 ads

### Success Indicators:
- ✅ Status changes from "queued" → "scraping" → "generating" → "done"
- ✅ Processed ads count increases
- ✅ Gallery shows original vs generated images
- ✅ Download buttons work

### Common Issues:

#### 1. "Failed to create job"
**Cause**: Supabase API keys or database tables missing

**Fix**:
```bash
# Check Cloudflare secrets
wrangler pages secret list --project-name ad-thief

# Should show: SUPABASE_URL, SUPABASE_ANON_KEY, SUPABASE_SERVICE_ROLE_KEY
```

#### 2. "No ads found"
**Cause**: Invalid Facebook Ad Library URL

**Fix**: Use one of the working test URLs above (Nike, Complex Sneakers, Athletic Greens)

#### 3. Job stuck in "scraping"
**Cause**: Apify token issue or actor error

**Fix**:
```bash
# Test Apify token directly
curl "https://api.apify.com/v2/acts/apify~facebook-ads-scraper?token=YOUR_TOKEN"

# Should return 200 OK with actor info
```

#### 4. "Prohibited content detected"
**Cause**: Gemini safety filters detected inappropriate content

**Result**: Ad is automatically skipped (this is normal behavior)

## 🔍 Monitoring

### Check PM2 Logs (Local):
```bash
# Watch logs in real-time
pm2 logs webapp

# Check for errors only
pm2 logs webapp --err

# Non-blocking log check
pm2 logs webapp --nostream
```

### Check Supabase (Database):
1. Go to https://supabase.com/dashboard/project/ulspfbgslsxdzxhseraz/editor
2. Open **Table Editor**
3. Check these tables:
   - `jobs` - Should have your test job
   - `scraped_ads` - Should have ~5-20 ads
   - `assets` - Should have generated images
   - `events` - Should have log entries

### Check Supabase Storage:
1. Go to https://supabase.com/dashboard/project/ulspfbgslsxdzxhseraz/storage/buckets/ad-thief-images
2. You should see folders:
   - `source-ads/` - Original Facebook ads
   - `generated-ads/` - Your branded versions
   - `product-images/` - Your uploaded product image

## 🎯 Success Checklist

After testing, you should have:

- [ ] Job created successfully (status 201)
- [ ] Job ID returned
- [ ] Status page loads
- [ ] Progress updates every 3 seconds
- [ ] Status changes: queued → scraping → generating → done
- [ ] Scraped ads appear in database
- [ ] Generated ads appear in gallery
- [ ] Images are viewable and downloadable
- [ ] No critical errors in logs
- [ ] Supabase storage has images

## 📈 Performance Metrics

**Expected Performance**:
- Scraping: ~2-5 seconds per ad (Apify)
- Meta-prompting: ~3-5 seconds per ad (Gemini)
- Image generation: ~8-12 seconds per ad (Gemini)
- Total: ~13-22 seconds per ad

**For 5 ads with batch size 2**:
- Total time: ~2-3 minutes
- Parallel processing: 2 ads at a time
- Sequential batches: 3 batches (2+2+1)

**For 20 ads with batch size 5**:
- Total time: ~5-8 minutes
- Parallel processing: 5 ads at a time
- Sequential batches: 4 batches (5+5+5+5)

## 🐛 Debug Mode

If you want more detailed logs:

```bash
# Local development
cd /home/user/webapp
pm2 logs webapp --lines 100

# Look for these log messages:
# ✓ "Starting Apify scrape for URL: ..."
# ✓ "Apify run started with ID: ..."
# ✓ "Successfully scraped X ads"
# ✓ "Processing batch 1/N"
# ✓ "Job completed! Generated X ads"
```

## 💡 Pro Tips

1. **Start small**: Test with 3-5 ads first to verify everything works
2. **Use working URLs**: The Nike and Complex Sneakers URLs are tested and work
3. **Monitor credits**: Check Apify usage at https://console.apify.com/account/usage
4. **Check Gemini quota**: Free tier is 60 req/min (sufficient for batch size 5)
5. **Be patient**: First run might take longer due to cold starts

## 📞 Need Help?

If something doesn't work:

1. **Check the error message** in the UI
2. **Open browser console** (F12) for detailed errors
3. **Check PM2 logs** for backend errors
4. **Verify all environment variables** are set
5. **Test Apify actor directly** in Apify Console
6. **Check Supabase tables** for data issues

## 🎉 Next Steps After Successful Test

Once you've verified everything works:

1. **Increase limits**: Try 10-20 ads
2. **Test different brands**: Nike, Adidas, Apple, etc.
3. **Upload your real product**: Use your actual product images
4. **Share with team**: Send them the https://ad-thief.pages.dev link
5. **Monitor costs**: Track Apify and Gemini usage
6. **Add custom domain** (optional): Use Cloudflare Pages custom domains

---

**Ready to test?** 👉 https://ad-thief.pages.dev

**Questions?** Check APIFY_ACTOR_UPDATE.md for detailed troubleshooting.
