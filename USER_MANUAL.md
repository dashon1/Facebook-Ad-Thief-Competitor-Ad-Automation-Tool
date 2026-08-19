# 📖 Facebook Ad Thief - Complete User Manual

**Version**: 1.0  
**Last Updated**: August 19, 2026  
**App URL**: https://ad-thief.pages.dev

---

## 📋 Table of Contents

1. [Introduction](#introduction)
2. [What Does This App Do?](#what-does-this-app-do)
3. [Getting Started](#getting-started)
4. [Step-by-Step Tutorial](#step-by-step-tutorial)
5. [Understanding the Interface](#understanding-the-interface)
6. [Advanced Features](#advanced-features)
7. [Troubleshooting](#troubleshooting)
8. [Best Practices](#best-practices)
9. [FAQs](#faqs)
10. [Cost & Limits](#cost--limits)

---

## 🎯 Introduction

### What is Facebook Ad Thief?

Facebook Ad Thief is an AI-powered tool that helps you:
- **Find** your competitor's best-performing Facebook ads
- **Analyze** what makes them successful
- **Recreate** them with YOUR brand, product, and style
- **Download** professional ad creatives ready to use

**Use Cases:**
- 🎨 Marketing agencies creating ad variations for clients
- 🚀 E-commerce brands studying competitor strategies
- 💡 Advertisers seeking creative inspiration
- 📊 Marketers A/B testing different ad styles

---

## 🤖 What Does This App Do?

### The Process (Automated for You)

```
1. You provide a Facebook Page URL (e.g., Nike)
   ↓
2. App scrapes all active ads from that page
   ↓
3. AI analyzes each ad's design, style, and layout
   ↓
4. AI recreates each ad with YOUR brand and product
   ↓
5. You download professional ad creatives
```

### Example:

**Input:**
- Competitor: Nike's Facebook Page
- Your Brand: "Ara's DNA"
- Your Product: [Your product image]

**Output:**
- 5-20 professional ad images
- Same style as Nike's ads
- But featuring YOUR brand and product
- Ready to download and use

---

## 🚀 Getting Started

### Prerequisites

Before you start, you need:

1. **Internet Connection** ✅
2. **A Web Browser** (Chrome, Firefox, Safari, Edge)
3. **A Product Image** (PNG or JPG, under 10MB)
4. **Competitor's Facebook Page URL**

### Finding a Competitor's Facebook Page

**Method 1: Direct Search**
1. Go to https://www.facebook.com
2. Search for competitor brand (e.g., "Nike")
3. Click on their official page
4. Copy URL from address bar
5. Example: `https://www.facebook.com/nike/`

**Method 2: From Facebook Ad Library**
1. Go to https://www.facebook.com/ads/library/
2. Search for competitor
3. Click any ad
4. Click "Page" link in ad details
5. Copy page URL

---

## 📚 Step-by-Step Tutorial

### Tutorial 1: Your First Ad Clone (Beginner)

**Time Required**: 5-10 minutes  
**Skill Level**: Beginner  
**What You'll Learn**: How to clone Nike ads with your brand

#### Step 1: Open the App

1. Open your web browser
2. Go to: **https://ad-thief.pages.dev**
3. You'll see the homepage

#### Step 2: Start a New Job

1. Click the **"Generate Inspired Creatives"** button
2. Or navigate to: https://ad-thief.pages.dev/new
3. You'll see the job creation form

#### Step 3: Enter Facebook Page URL

**Field**: "Facebook Ad Library or Page URL"

**What to Enter**:
```
https://www.facebook.com/nike/
```

**Important Rules**:
- ✅ Use Facebook Page URLs (e.g., `/nike/`)
- ❌ Don't use Ad Library search URLs
- ✅ URL must end with `/`
- ✅ Remove any extra parameters

**Working Examples**:
```
https://www.facebook.com/nike/
https://www.facebook.com/adidas/
https://www.facebook.com/ComplexSneakers/
https://www.facebook.com/cocacola/
```

**Non-Working Examples** (Don't Use):
```
❌ https://www.facebook.com/ads/library/?q=nike
❌ https://www.facebook.com/ads/library/?active_status=all&q=nike
```

#### Step 4: Enter Your Brand Name

**Field**: "Your Brand Name"

**What to Enter**:
```
Ara's DNA
```

**Notes**:
- This will appear on all generated ads
- Use your actual brand name
- Can include spaces and special characters
- Case-sensitive (will appear exactly as typed)

**Examples**:
- `Ara's DNA`
- `My Awesome Brand`
- `John's Coffee Shop`
- `TechStart Inc.`

#### Step 5: Upload Your Product Image

**Field**: "Your Product Image"

**Requirements**:
- Format: PNG or JPG
- Size: Maximum 10MB
- Recommended: 1080x1080px or higher
- Background: Transparent or clean preferred

**Tips**:
1. Click **"Choose File"** button
2. Select your product image
3. Wait for preview to appear
4. Image should be clear and high-quality

**Best Product Images**:
- ✅ Clear product shot on clean background
- ✅ Professional lighting
- ✅ High resolution (1080px+)
- ✅ Transparent background (PNG)
- ❌ Blurry or low-quality images
- ❌ Cluttered backgrounds

#### Step 6: Configure Advanced Settings (Optional)

**Max Ads to Process**:
- Default: 20
- Range: 1-50
- Recommendation for first test: **5**

**Batch Size**:
- Default: 5
- Range: 1-10
- Recommendation for first test: **2**

**What This Means**:
- **Max Ads**: How many competitor ads to process
- **Batch Size**: How many to process in parallel
- Smaller batch = slower but more reliable
- Larger batch = faster but may have more failures

**Recommended Settings for First Test**:
```
Max Ads: 5
Batch Size: 2
```

This will:
- Process 5 Nike ads
- Generate 5 branded versions
- Take 3-5 minutes
- Cost ~$0.03 (Apify fees)

#### Step 7: Submit the Job

1. Review all your inputs:
   - URL: `https://www.facebook.com/nike/`
   - Brand: `Ara's DNA`
   - Product image: [Uploaded]
   - Max Ads: `5`
   - Batch Size: `2`

2. Click **"Generate Inspired Creatives"** button

3. You'll be redirected to the job status page

#### Step 8: Monitor Progress

**What You'll See**:

The job goes through these stages:

**Stage 1: Queued** (5-10 seconds)
```
Status: ⏳ Queued
Progress: 0%
Message: "Job is queued and will start processing soon"
```

**Stage 2: Scraping** (30-60 seconds)
```
Status: 🔍 Scraping
Progress: 10%
Message: "Scraping Facebook Ad Library"
Total Ads: 0 (will update when scraping completes)
```

**Stage 3: Generating** (2-4 minutes)
```
Status: 🎨 Generating
Progress: 40% → 80% → 95%
Total Ads: 5
Processed: 2 → 4 → 5
Successful: 2 → 4 → 5
Failed: 0
```

**Stage 4: Done** (Complete!)
```
Status: ✅ Done
Progress: 100%
Total Ads: 5
Successful: 5
Failed: 0
```

**Real-time Updates**:
- Page auto-refreshes every 3 seconds
- Progress bar updates automatically
- No need to refresh manually
- Gallery appears as ads are generated

#### Step 9: View Generated Ads

**When Status = "Done"**:

You'll see a gallery with:
- **Original Ads**: Competitor's ads (left column)
- **Generated Ads**: Your branded versions (right column)

**Each Gallery Item Shows**:
- Thumbnail preview
- Download button
- Original source indicator

#### Step 10: Download Your Ads

**Option 1: Download Individual Ads**
1. Find the ad you like
2. Click the **download icon** (⬇️)
3. Image saves to your Downloads folder
4. Filename: `asset-[id].png`

**Option 2: Download All Ads**
1. Scroll to top of gallery
2. Click **"Download All"** button
3. All images download as individual files
4. Or download as ZIP (if enabled)

#### Step 11: Use Your Ads

**Your generated ads are now ready to:**
- 📱 Post on social media
- 💰 Use in Facebook Ads
- 📊 A/B test different styles
- 🎨 Edit further in Photoshop/Canva
- 💾 Save to your brand asset library

**Important**: Always comply with:
- Facebook's advertising policies
- Intellectual property laws
- Platform terms of service

---

### Tutorial 2: Advanced Job (Intermediate)

**Time Required**: 10-20 minutes  
**Skill Level**: Intermediate  
**What You'll Learn**: Batch processing, retry logic, cost optimization

#### Scenario: Process 20 Adidas Ads

**Goal**: Clone 20 Adidas ads for your athletic wear brand

**Settings**:
```
URL: https://www.facebook.com/adidas/
Brand Name: FitLife Athletics
Product Image: [Your athletic shoe/apparel]
Max Ads: 20
Batch Size: 5
```

**Expected Results**:
- Time: 5-10 minutes
- Cost: ~$0.12 (Apify)
- Output: 20 branded ad creatives

**Process**:
1. Submit job with above settings
2. Monitor progress (takes longer than Tutorial 1)
3. Review results:
   - Successful: 18-20 ads
   - Failed: 0-2 ads (due to safety filters)
4. Download successful ads
5. Retry failed ads if needed (see Retry section)

#### Understanding Batch Processing

**Batch Size Impact**:

| Batch Size | Speed | Reliability | Best For |
|------------|-------|-------------|----------|
| 1 | Slowest | Highest | Testing, debugging |
| 2-3 | Slow | High | First-time users |
| 5 | Balanced | Good | **Recommended** |
| 7-10 | Fast | Lower | Experienced users |

**Recommendation**: Start with batch size 5, adjust based on results

---

## 🖥️ Understanding the Interface

### Homepage (`/`)

**Elements**:
- **Hero Section**: App title and description
- **Features List**: What the app does
- **CTA Button**: "Generate Inspired Creatives"
- **Footer**: Links and credits

**Actions**:
- Click CTA to start new job

### Job Creation Form (`/new`)

**Form Fields**:

1. **Facebook URL** (Required)
   - Input type: Text
   - Validation: Must be valid URL
   - Placeholder: `https://www.facebook.com/nike/`

2. **Brand Name** (Required)
   - Input type: Text
   - Validation: 1-100 characters
   - Placeholder: `Your Brand Name`

3. **Product Image** (Required)
   - Input type: File
   - Validation: PNG/JPG, max 10MB
   - Preview: Shows after upload

4. **Max Ads** (Optional)
   - Input type: Number
   - Default: 20
   - Range: 1-50

5. **Batch Size** (Optional)
   - Input type: Number
   - Default: 5
   - Range: 1-10

**Submit Button**: "Generate Inspired Creatives"

### Job Status Page (`/jobs/:id`)

**Header Section**:
- Job ID
- Current status badge
- Progress bar (0-100%)

**Stats Section**:
```
Total Ads: 5
Processed: 4
Successful: 3
Failed: 1
```

**Actions Section**:
- Retry button (if failed)
- Download All button
- Back to Home button

**Gallery Section**:
- Grid layout (2 columns on desktop, 1 on mobile)
- Original ad (left) vs Generated ad (right)
- Download buttons for each ad

**Events Log** (Advanced):
- Collapsible section
- Shows all processing events
- Timestamps and messages
- Useful for debugging

---

## ⚙️ Advanced Features

### Feature 1: Retry Failed Jobs

**When to Use**:
- Job status shows "failed"
- Some ads failed to generate
- Temporary API errors

**How to Retry**:
1. Go to job status page
2. Click **"Retry Failed Ads"** button
3. Job restarts with same settings
4. Only processes failed ads
5. Monitor new progress

**Example**:
```
Original Job:
- Total: 20
- Successful: 18
- Failed: 2

After Retry:
- Total: 20
- Successful: 20
- Failed: 0
```

### Feature 2: Event Logging

**What It Does**:
Tracks every step of job processing

**How to Access**:
1. Go to job status page
2. Scroll to bottom
3. Click **"Show Event Log"**
4. View chronological events

**Event Types**:
- `info`: Normal progress updates
- `error`: Failures and issues
- `warning`: Non-critical issues

**Example Events**:
```
[2026-08-19 19:00:00] INFO: Job created
[2026-08-19 19:00:05] INFO: Scraping Facebook Ad Library
[2026-08-19 19:00:35] INFO: Successfully scraped 5 ads
[2026-08-19 19:00:40] INFO: Starting batch 1 (2 ads)
[2026-08-19 19:02:15] INFO: Batch 1 complete
[2026-08-19 19:02:20] INFO: Starting batch 2 (2 ads)
[2026-08-19 19:03:55] INFO: Batch 2 complete
[2026-08-19 19:04:00] INFO: Job complete
```

### Feature 3: Prohibited Content Handling

**What It Does**:
Automatically skips ads flagged by AI safety filters

**When It Happens**:
- Adult content
- Violence or weapons
- Hate speech
- Copyrighted characters

**How It Works**:
1. AI detects prohibited content
2. Ad is marked as "failed"
3. Logged in events: "Prohibited content detected"
4. Processing continues with next ad
5. No action needed from you

**Statistics**:
- ~10-20% of ads may be flagged
- More common with certain niches
- Not an error, just AI being cautious

### Feature 4: Real-time Progress

**How It Works**:
- Page polls server every 3 seconds
- Updates progress bar automatically
- Shows new ads as they're generated
- No manual refresh needed

**What You See**:
- Progress bar moves smoothly
- Stats update live
- Gallery fills gradually
- Status badge changes

---

## 🔧 Troubleshooting

### Problem 1: Job Stuck in "Queued"

**Symptoms**:
- Status: "Queued"
- Time: More than 1 minute
- Progress: 0%

**Solutions**:
1. Wait 2-3 minutes (may be server load)
2. Check event log for errors
3. Refresh page
4. If still stuck after 5 minutes, contact support

**Prevention**:
- Usually resolves itself
- May indicate API key issues

### Problem 2: Job Stuck in "Scraping"

**Symptoms**:
- Status: "Scraping"
- Time: More than 5 minutes
- Total Ads: Still 0

**Solutions**:
1. **Check URL Format**:
   - ✅ Should be: `https://www.facebook.com/nike/`
   - ❌ Not: `https://www.facebook.com/ads/library/?q=nike`

2. **Verify Page Has Ads**:
   - Visit the Facebook page
   - Look for "Ads" in transparency section
   - If no ads exist, scraping returns 0

3. **Try Different URL**:
   - Use tested URL: `https://www.facebook.com/ComplexSneakers/`
   - These are verified to work

4. **Check Event Log**:
   - Look for error messages
   - May show "No ads found"

**Prevention**:
- Always use Facebook Page URLs
- Test with Nike/Adidas first
- Verify page has active ads

### Problem 3: "No Ads Found"

**Error Message**:
"No ads found in Facebook Ad Library"

**Causes**:
1. **Wrong URL Format** (Most Common)
   - Using Ad Library search URL instead of page URL
   
2. **Page Has No Ads**
   - Competitor isn't running ads currently
   
3. **Private/Restricted Ads**
   - Some ads aren't in public library

**Solutions**:
1. **Fix URL Format**:
   ```
   ❌ https://www.facebook.com/ads/library/?q=nike
   ✅ https://www.facebook.com/nike/
   ```

2. **Try Verified URLs**:
   - `https://www.facebook.com/nike/`
   - `https://www.facebook.com/ComplexSneakers/`
   - These always have ads

3. **Check Page Manually**:
   - Visit page on Facebook
   - Click "Ads" in transparency
   - If you see ads, URL should work

### Problem 4: "Prohibited Content" Errors

**Error in Events**:
"Image generation failed: Prohibited content detected"

**What It Means**:
- Google Gemini's safety filters blocked the content
- This is automatic and can't be overridden
- Specific ad is skipped, job continues

**Common Triggers**:
- Adult/suggestive content
- Violent imagery
- Copyrighted characters (Disney, Marvel, etc.)
- Political content
- Medical/pharmaceutical ads

**Solutions**:
1. **Accept and Continue**:
   - This is normal (10-20% of ads)
   - Job continues with other ads
   - Download successful ads

2. **Choose Different Competitor**:
   - Some industries trigger filters more
   - Try family-friendly brands

3. **Increase Max Ads**:
   - If processing 20 ads, some will pass
   - Even if 5 fail, you get 15 success

**Not a Bug**: This is Google's safety system working as intended

### Problem 5: Upload Fails

**Symptoms**:
- Product image won't upload
- "Upload failed" error
- Image preview doesn't appear

**Solutions**:
1. **Check File Size**:
   - Max: 10MB
   - Compress if needed
   - Use tinypng.com or similar

2. **Check File Format**:
   - Allowed: PNG, JPG, JPEG
   - Not allowed: GIF, BMP, WEBP, SVG
   - Convert if needed

3. **Check File Name**:
   - Avoid special characters
   - Keep it simple: `product.png`

4. **Try Different Browser**:
   - Chrome usually works best
   - Clear cache and try again

### Problem 6: Downloads Not Working

**Symptoms**:
- Click download button
- Nothing happens
- Or gets error

**Solutions**:
1. **Check Browser Settings**:
   - Allow downloads from site
   - Disable popup blocker for this site

2. **Try Right-Click**:
   - Right-click image
   - "Save Image As..."

3. **Use Different Browser**:
   - Chrome/Firefox recommended

4. **Check Storage Space**:
   - Ensure device has space

---

## 💡 Best Practices

### 1. Choosing the Right Competitor

**Good Competitors**:
- ✅ Well-known brands (Nike, Adidas, Coca-Cola)
- ✅ Similar industry to yours
- ✅ Active advertisers (many current ads)
- ✅ Similar target audience

**Poor Competitors**:
- ❌ Brands with no active ads
- ❌ Completely different industry
- ❌ Low-quality ad creatives
- ❌ Brands in different markets

**How to Find Good Competitors**:
1. List your top 5 competitors
2. Check Facebook Ad Library for each
3. Choose one with 10+ active ads
4. Ensure they're in your industry

### 2. Preparing Your Product Image

**Best Practices**:
1. **Resolution**: 1080x1080px minimum
2. **Format**: PNG with transparent background
3. **Quality**: Professional product photography
4. **Lighting**: Well-lit, no shadows
5. **Background**: Clean or transparent

**Tools for Preparation**:
- **Remove Background**: remove.bg
- **Resize**: canva.com, photopea.com
- **Compress**: tinypng.com
- **Edit**: Photoshop, GIMP

**Example Good Images**:
- Product on white background
- Professional product shot
- Transparent background PNG
- High resolution, sharp focus

### 3. Optimizing Settings for Your Goal

**Goal: Quick Test (First Time)**
```
Max Ads: 3-5
Batch Size: 2
Expected Time: 2-3 minutes
Expected Cost: ~$0.02-$0.03
```

**Goal: Comprehensive Research**
```
Max Ads: 20-30
Batch Size: 5
Expected Time: 5-10 minutes
Expected Cost: ~$0.12-$0.18
```

**Goal: Specific Ad Styles**
```
Max Ads: 10
Batch Size: 3
Expected Time: 3-5 minutes
Expected Cost: ~$0.06
```

**Goal: Maximum Speed**
```
Max Ads: 50
Batch Size: 10
Expected Time: 8-12 minutes
Expected Cost: ~$0.30
Risk: Higher failure rate
```

### 4. Working with Results

**After Downloading Ads**:

1. **Review Quality**:
   - Check each ad carefully
   - Some may need manual editing
   - AI isn't perfect

2. **Edit if Needed**:
   - Use Canva, Photoshop, or Figma
   - Adjust text placement
   - Tweak colors/fonts
   - Add your own copy

3. **Test Multiple Versions**:
   - Don't use just one style
   - A/B test different ads
   - Track performance

4. **Respect Copyright**:
   - Don't copy text verbatim
   - Don't use trademarked elements
   - Inspiration only, not copying

### 5. Cost Optimization

**Save Money**:
1. **Start Small**: Test with 5 ads first
2. **Use Batch Size 5**: Sweet spot for speed vs. reliability
3. **Avoid Retries**: Get settings right first time
4. **Process Similar Brands Together**: Plan your jobs

**Apify Pricing** (approximate):
```
1,000 ads = $5.80
100 ads = $0.58
50 ads = $0.29
20 ads = $0.12
10 ads = $0.06
5 ads = $0.03
```

**Free Tier**:
- Apify: $5 free credit (first ~860 ads free)
- Gemini: Free tier (60 req/min)
- After free tier, pay-as-you-go

---

## ❓ FAQs

### General Questions

**Q: Is this legal?**
A: Yes, for inspiration and research. Facebook's Ad Library is public data. However:
- ✅ Using for inspiration and learning
- ✅ Creating similar styles with your brand
- ❌ Don't copy text/slogans exactly
- ❌ Don't use trademarked elements
- ❌ Always follow platform policies

**Q: How long does it take?**
A: Depends on job size:
- 5 ads: 2-3 minutes
- 10 ads: 3-5 minutes
- 20 ads: 5-10 minutes
- 50 ads: 10-15 minutes

**Q: How much does it cost?**
A: Very cheap:
- 5 ads: ~$0.03
- 20 ads: ~$0.12
- 50 ads: ~$0.30
- Free tier: First ~860 ads free (Apify $5 credit)

**Q: What image quality do I get?**
A: High quality:
- Resolution: Up to 1024x1024px
- Format: PNG with transparency
- Quality: AI-generated, professional-looking
- May need minor editing for perfection

**Q: Can I edit the generated ads?**
A: Yes! Download and edit in:
- Canva (easiest)
- Photoshop (professional)
- Figma (collaborative)
- Any image editor

### Technical Questions

**Q: Why do some ads fail?**
A: Common reasons:
- Google's safety filters (most common)
- Poor quality source images
- API rate limits
- Temporary network issues
- Usually 10-20% failure rate is normal

**Q: Can I process the same competitor multiple times?**
A: Yes! Each job is independent:
- Different brand names
- Different product images
- Different ad selections

**Q: How long are results stored?**
A: Permanently:
- Images stored in Supabase
- Job records never deleted
- Access anytime with job URL
- Bookmark job page to return later

**Q: Can I share results with my team?**
A: Yes:
- Share job URL
- Anyone with URL can view/download
- No login required (currently)
- Consider adding auth for privacy

### Usage Questions

**Q: What's the best competitor to start with?**
A: Recommended for first test:
- Nike: `https://www.facebook.com/nike/`
- Adidas: `https://www.facebook.com/adidas/`
- Complex Sneakers: `https://www.facebook.com/ComplexSneakers/`
These always have ads and work reliably

**Q: Can I use this for client work?**
A: Yes, perfect for:
- Marketing agencies
- Freelance designers
- Social media managers
- Ad consultants
Just ensure final ads comply with platform policies

**Q: How do I find my industry's top advertisers?**
A:
1. Go to Facebook Ad Library
2. Search your industry keywords
3. Note brands with most ads
4. Use their Facebook page URLs

**Q: What if my competitor has no ads?**
A: Try:
- Checking Ad Library manually
- Using different competitor
- Trying broader search
- Using verified test URLs first

---

## 💰 Cost & Limits

### Current Pricing (Pay-as-you-go)

**Apify** (Scraping):
- $5.80 per 1,000 ads
- $0.58 per 100 ads
- $0.12 per 20 ads
- $0.03 per 5 ads
- Free tier: $5 credit (~860 ads free)

**Google Gemini** (AI Generation):
- Free tier: 60 requests per minute
- Plenty for most users
- Pay-as-you-go after free tier
- Very affordable

**Supabase** (Storage):
- Free tier: 500MB storage
- Thousands of images
- Free for most users

**Cloudflare** (Hosting):
- Free tier: 100,000 requests/day
- More than enough

### Daily Limits

**Default Limits** (can be adjusted):
- Max ads per job: 50
- Max batch size: 10
- Max concurrent jobs: 5 (recommended)
- Max image size: 10MB

**API Rate Limits**:
- Apify: 30 requests/min (free tier)
- Gemini: 60 requests/min (free tier)
- Usually not an issue for normal usage

### Cost Examples

**Example 1: Small Test**
```
Job: 5 Nike ads
Cost: $0.03 (Apify only)
Time: 2-3 minutes
Output: 5 branded ads
```

**Example 2: Standard Job**
```
Job: 20 competitor ads
Cost: $0.12 (Apify only)
Time: 5-10 minutes
Output: 18-20 branded ads
```

**Example 3: Large Campaign**
```
Job: 50 ads × 3 competitors
Cost: $0.90 (Apify only)
Time: 30-40 minutes
Output: 135-150 branded ads
```

### Free Tier Breakdown

**What's Free**:
- ✅ First ~860 ads (Apify $5 credit)
- ✅ All AI generation (Gemini free tier)
- ✅ Unlimited storage (under 500MB)
- ✅ Unlimited downloads

**What You Pay For** (after free tier):
- Only Apify scraping ($5.80 per 1,000 ads)
- Everything else remains free

**Recommendation**:
- Start with free tier
- Monitor costs in Apify dashboard
- Upgrade when needed

---

## 📞 Support & Resources

### Getting Help

**Documentation**:
- This User Manual
- README.md in GitHub
- SETUP_GUIDE.md for setup
- TROUBLESHOOTING.md for issues

**Links**:
- App: https://ad-thief.pages.dev
- GitHub: https://github.com/dashon1/Facebook-Ad-Thief-Competitor-Ad-Automation-Tool
- Apify: https://apify.com
- Gemini: https://ai.google.dev

### Tips for Success

1. **Start Small**: First job with 5 ads
2. **Use Verified URLs**: Nike, Adidas work reliably
3. **High-Quality Product Images**: Professional photos work best
4. **Be Patient**: AI takes time to generate quality
5. **Review Results**: Not all generated ads are perfect
6. **Edit as Needed**: Use Canva/Photoshop for touch-ups
7. **Respect Copyright**: Inspiration only, not copying
8. **Test Multiple Styles**: Don't rely on one competitor

---

## ✅ Quick Reference Card

### Essential URLs
```
App Homepage: https://ad-thief.pages.dev
Create Job: https://ad-thief.pages.dev/new
```

### Working Test URLs
```
Nike: https://www.facebook.com/nike/
Adidas: https://www.facebook.com/adidas/
Complex: https://www.facebook.com/ComplexSneakers/
Coca-Cola: https://www.facebook.com/cocacola/
```

### Recommended Settings (First Time)
```
Max Ads: 5
Batch Size: 2
Time: 3-5 minutes
Cost: ~$0.03
```

### Troubleshooting Checklist
```
□ Using Facebook Page URL (not Ad Library search)?
□ URL ends with / ?
□ Product image under 10MB?
□ Image format is PNG or JPG?
□ Brand name entered?
□ Waited at least 3 minutes?
□ Checked event log for errors?
```

---

## 📄 Legal Disclaimer

This tool is provided for **ideation and research purposes only**.

**You Must**:
- ✅ Use generated ads as inspiration
- ✅ Comply with all platform policies
- ✅ Respect intellectual property rights
- ✅ Create original content and copy
- ✅ Follow advertising regulations

**You Must Not**:
- ❌ Copy text/slogans verbatim
- ❌ Use trademarked elements without permission
- ❌ Violate Facebook's ad policies
- ❌ Infringe on copyrights
- ❌ Make false or misleading claims

**Liability**: Users are solely responsible for ensuring their use of generated ads complies with all applicable laws and platform policies.

---

**End of User Manual**

**Version**: 1.0  
**Created**: August 19, 2026  
**Built with**: Hono + Cloudflare + Supabase + Google Gemini  
**Questions?** Check README.md or contact support

---

🎉 **Ready to create amazing ads!** Visit https://ad-thief.pages.dev to get started!
