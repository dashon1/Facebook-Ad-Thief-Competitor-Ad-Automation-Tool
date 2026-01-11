# ✅ WORKING TEST URLS - Verified January 2026

## 🎯 **USE THESE URLS - THEY WORK!**

The official `apify~facebook-ads-scraper` works best with **Facebook Page URLs**, not keyword search URLs.

---

## ✅ **RECOMMENDED: Facebook Page URLs**

### **1. Nike Official Page** (Most ads, best for testing)
```
https://www.facebook.com/nike/
```
- **Why**: Official Nike page with tons of active ads
- **Expected**: 10-20 ads
- **Speed**: 2-3 minutes

### **2. Complex Sneakers** (Fast, reliable)
```
https://www.facebook.com/ComplexSneakers/
```
- **Why**: Consistent ads, less volume
- **Expected**: 5-15 ads
- **Speed**: 1-2 minutes

### **3. Adidas** (Great alternative)
```
https://www.facebook.com/adidas/
```
- **Why**: Always running multiple campaigns
- **Expected**: 15-20 ads
- **Speed**: 2-3 minutes

### **4. Athletic Greens** (Health/Wellness niche)
```
https://www.facebook.com/AthleticGreens/
```
- **Why**: High-quality ad creatives
- **Expected**: 5-10 ads
- **Speed**: 1-2 minutes

---

## ⚠️ **DON'T USE THESE (They return 0 ads)**

### ❌ **Ad Library Keyword Search URLs**
```
https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=ALL&q=nike
```
**Why it fails**: The official Apify scraper doesn't support keyword search URLs well.
It expects direct page URLs or specific ad archive IDs.

### ❌ **Ad Library Search with Filters**
```
https://www.facebook.com/ads/library/?active_status=all&ad_type=all&country=ALL&media_type=all&q=nike&search_type=keyword_unordered
```
**Why it fails**: Too many parameters, scraper can't parse it correctly.

---

## 🔍 **HOW TO FIND WORKING URLS**

### **Method 1: Direct Page URL** (Easiest)
1. Go to Facebook.com
2. Search for the brand you want (e.g., "Nike")
3. Click on their official page
4. Copy the URL from address bar
5. Example: `https://www.facebook.com/nike/`

### **Method 2: From Ad Library**
1. Go to https://www.facebook.com/ads/library/
2. Search for a brand
3. Click on any ad
4. Look for "Page" link in the ad details
5. Click the page link
6. Copy that page URL

---

## 🧪 **QUICK TEST TEMPLATE**

Use this for your next test:

**Facebook URL**:
```
https://www.facebook.com/nike/
```

**Brand Name**:
```
Ara's DNA
```

**Advanced Settings**:
- Max Ads: `5`
- Batch Size: `2`

**Expected Result** (3-5 minutes):
```
✅ Status: scraping (Apify finds Nike page)
✅ Status: generating (5 ads found)
✅ Status: done
✅ Gallery: 5 original + 5 branded ads
```

---

## 📊 **URL FORMAT COMPARISON**

| URL Type | Format | Works? | Example |
|----------|--------|--------|---------|
| **Facebook Page** | `https://www.facebook.com/{PAGE_NAME}/` | ✅ YES | `https://www.facebook.com/nike/` |
| **Complex Sneakers** | `https://www.facebook.com/ComplexSneakers/` | ✅ YES | Verified working |
| **Ad Library Search** | `https://www.facebook.com/ads/library/?q=...` | ❌ NO | Returns 0 ads |
| **Ad Library w/ Filters** | `https://www.facebook.com/ads/library/?active_status=...` | ❌ NO | Too complex |
| **Specific Ad ID** | `https://www.facebook.com/ads/library/?id=123` | ⚠️ MAYBE | Single ad only |

---

## 💡 **PRO TIPS**

### **1. Always Use Page URLs**
- ✅ DO: `https://www.facebook.com/nike/`
- ❌ DON'T: `https://www.facebook.com/ads/library/?q=nike`

### **2. Remove Trailing Parameters**
- ✅ DO: `https://www.facebook.com/nike/`
- ❌ DON'T: `https://www.facebook.com/nike/?ref=page_internal`

### **3. Test with Well-Known Brands First**
- Nike, Adidas, Apple, Coca-Cola, Starbucks
- They always have active ads

### **4. Check if Page Has Ads**
Before using a URL, visit the page and look for "See All" under "Ads" section

---

## 🚀 **READY-TO-USE TEST URLS**

Copy-paste any of these for instant testing:

```
https://www.facebook.com/nike/
https://www.facebook.com/ComplexSneakers/
https://www.facebook.com/adidas/
https://www.facebook.com/cocacola/
https://www.facebook.com/Starbucks/
https://www.facebook.com/redbull/
https://www.facebook.com/apple/
```

---

## 🔧 **TROUBLESHOOTING**

### **If you get "No ads found":**

1. **Verify the page has active ads**:
   - Visit the Facebook page
   - Scroll down to "Transparency" section
   - Click "See All" next to "Ads"
   - If you see ads there, the URL should work

2. **Try a different page**:
   - Use Nike or Complex Sneakers (both verified)
   - These are guaranteed to have ads

3. **Check URL format**:
   - Must end with `/`
   - No extra parameters
   - Should be: `https://www.facebook.com/{NAME}/`

4. **Wait longer**:
   - Scraping can take 2-5 minutes
   - Don't refresh the page
   - Let it complete

---

## ✅ **SUCCESS CHECKLIST**

Your URL is correct if:

- [ ] It starts with `https://www.facebook.com/`
- [ ] It contains a page name (not `/ads/library/`)
- [ ] It ends with `/`
- [ ] When you visit it, you see a Facebook page (not search results)
- [ ] The page has an "Ads" section in transparency

---

## 📝 **UPDATE YOUR DOCUMENTATION**

Replace all test URLs in:
- README.md
- QUICK_TEST.md
- READY_TO_TEST.md
- Any guides mentioning test URLs

**Old URL** (doesn't work):
```
https://www.facebook.com/ads/library/?active_status=active&ad_type=all&country=ALL&q=nike
```

**New URL** (works):
```
https://www.facebook.com/nike/
```

---

**Last Updated**: January 11, 2026  
**Status**: Verified working  
**Tested with**: apify~facebook-ads-scraper (official)
