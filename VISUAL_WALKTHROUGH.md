# 📸 Facebook Ad Thief - Visual Walkthrough

**Step-by-Step Guide with Screenshot Descriptions**

---

## 🎯 Complete Tutorial: Nike Ad Clone Example

**Goal**: Clone 5 Nike ads with your brand "Ara's DNA"  
**Time**: 5 minutes  
**Difficulty**: Beginner

---

## Step 1: Access the App

### Screenshot 1.1: Homepage
**URL**: `https://ad-thief.pages.dev`

**What You See**:
```
┌─────────────────────────────────────────────────┐
│                                                 │
│           🎨 Facebook Ad Thief 🤖              │
│                                                 │
│   Clone competitor Facebook ads with your       │
│   brand using AI in minutes                     │
│                                                 │
│   [Generate Inspired Creatives] ← Click This   │
│                                                 │
│   Features:                                     │
│   ✓ Facebook Ad Library Scraping                │
│   ✓ AI-Powered Image Generation                 │
│   ✓ Real-time Progress Tracking                 │
│   ✓ Download Gallery                            │
│                                                 │
└─────────────────────────────────────────────────┘
```

**Action**: Click the blue "Generate Inspired Creatives" button

---

## Step 2: Job Creation Form

### Screenshot 2.1: Empty Form
**URL**: `https://ad-thief.pages.dev/new`

**What You See**:
```
┌─────────────────────────────────────────────────┐
│ Create New Job                                  │
├─────────────────────────────────────────────────┤
│                                                 │
│ Facebook Ad Library or Page URL *               │
│ ┌─────────────────────────────────────────────┐ │
│ │ https://www.facebook.com/nike/              │ │
│ └─────────────────────────────────────────────┘ │
│                                                 │
│ Your Brand Name *                               │
│ ┌─────────────────────────────────────────────┐ │
│ │ Ara's DNA                                   │ │
│ └─────────────────────────────────────────────┘ │
│                                                 │
│ Your Product Image *                            │
│ ┌─────────────────────────────────────────────┐ │
│ │ [Choose File] No file chosen                │ │
│ └─────────────────────────────────────────────┘ │
│                                                 │
│ ▼ Advanced Settings                             │
│                                                 │
│ Max Ads to Process: [5     ]                    │
│ Batch Size:         [2     ]                    │
│                                                 │
│           [Generate Inspired Creatives]         │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

### Screenshot 2.2: Filled Form (Before Upload)

**Fields Entered**:
```
URL: https://www.facebook.com/nike/
Brand: Ara's DNA
Image: [Not uploaded yet]
Max Ads: 5
Batch Size: 2
```

**What It Looks Like**:
```
┌─────────────────────────────────────────────────┐
│ Create New Job                                  │
├─────────────────────────────────────────────────┤
│                                                 │
│ Facebook Ad Library or Page URL *               │
│ ┌─────────────────────────────────────────────┐ │
│ │ https://www.facebook.com/nike/     ✓        │ │ ← Green checkmark
│ └─────────────────────────────────────────────┘ │
│                                                 │
│ Your Brand Name *                               │
│ ┌─────────────────────────────────────────────┐ │
│ │ Ara's DNA                          ✓        │ │ ← Green checkmark
│ └─────────────────────────────────────────────┘ │
│                                                 │
│ Your Product Image *                            │
│ ┌─────────────────────────────────────────────┐ │
│ │ [Choose File] No file chosen       ⚠        │ │ ← Red warning
│ └─────────────────────────────────────────────┘ │
│   ^ Click here to upload                        │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

### Screenshot 2.3: File Upload Dialog

**Action**: Click "Choose File"

**What You See** (OS file picker):
```
┌─────────────────────────────────────────────────┐
│ Open                                            │
├─────────────────────────────────────────────────┤
│ Look in: ▼ Documents                            │
│                                                 │
│ 📁 Pictures                                     │
│   📁 Product Photos                             │
│     📄 product-shoe.png         (1.2 MB)       │ ← Select this
│     📄 product-bottle.jpg       (800 KB)       │
│     📄 product-bag.png          (2.5 MB)       │
│                                                 │
│ File name: product-shoe.png                     │
│ File type: Images (*.png, *.jpg)                │
│                                                 │
│                       [Cancel]  [Open]          │
└─────────────────────────────────────────────────┘
```

**Action**: Select your product image and click "Open"

---

### Screenshot 2.4: Form with Uploaded Image

**After Upload**:
```
┌─────────────────────────────────────────────────┐
│ Create New Job                                  │
├─────────────────────────────────────────────────┤
│                                                 │
│ Facebook Ad Library or Page URL *               │
│ ┌─────────────────────────────────────────────┐ │
│ │ https://www.facebook.com/nike/              │ │
│ └─────────────────────────────────────────────┘ │
│                                                 │
│ Your Brand Name *                               │
│ ┌─────────────────────────────────────────────┐ │
│ │ Ara's DNA                                   │ │
│ └─────────────────────────────────────────────┘ │
│                                                 │
│ Your Product Image *                            │
│ ┌─────────────────────────────────────────────┐ │
│ │ ✓ product-shoe.png (1.2 MB)                 │ │
│ └─────────────────────────────────────────────┘ │
│                                                 │
│ Preview:                                        │
│ ┌─────────────────┐                             │
│ │                 │                             │
│ │   [Your Shoe]   │ ← Image preview             │
│ │                 │                             │
│ └─────────────────┘                             │
│                                                 │
│ ▼ Advanced Settings                             │
│                                                 │
│ Max Ads to Process: [5     ]                    │
│ Batch Size:         [2     ]                    │
│                                                 │
│     [Generate Inspired Creatives] ← Ready!      │
│                                                 │
└─────────────────────────────────────────────────┘
```

**Action**: Click "Generate Inspired Creatives" button

---

## Step 3: Job Processing

### Screenshot 3.1: Job Created (Queued)
**URL**: `https://ad-thief.pages.dev/jobs/abc123-def456`

**What You See** (First 5 seconds):
```
┌─────────────────────────────────────────────────┐
│ Job Status                                      │
│ ID: abc123-def456                               │
├─────────────────────────────────────────────────┤
│                                                 │
│ Status: ⏳ Queued                               │
│                                                 │
│ Progress: ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ 0%     │
│                                                 │
│ ┌─────────────────────────────────────────────┐ │
│ │ Total Ads:       0                          │ │
│ │ Processed:       0                          │ │
│ │ Successful:      0                          │ │
│ │ Failed:          0                          │ │
│ └─────────────────────────────────────────────┘ │
│                                                 │
│ Message: Job is queued and will start          │
│          processing soon...                     │
│                                                 │
│ ⟳ Auto-refreshing every 3 seconds              │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

### Screenshot 3.2: Scraping Phase
**After ~10 seconds**:

```
┌─────────────────────────────────────────────────┐
│ Job Status                                      │
│ ID: abc123-def456                               │
├─────────────────────────────────────────────────┤
│                                                 │
│ Status: 🔍 Scraping                            │
│                                                 │
│ Progress: ████░░░░░░░░░░░░░░░░░░░░░░░░░░ 10%   │
│                                                 │
│ ┌─────────────────────────────────────────────┐ │
│ │ Total Ads:       0  ← Will update soon      │ │
│ │ Processed:       0                          │ │
│ │ Successful:      0                          │ │
│ │ Failed:          0                          │ │
│ └─────────────────────────────────────────────┘ │
│                                                 │
│ Message: Scraping Facebook Ad Library for      │
│          Nike ads...                            │
│                                                 │
│ Latest Event:                                   │
│ [INFO] Starting Apify scrape for                │
│        https://www.facebook.com/nike/           │
│                                                 │
│ ⟳ Auto-refreshing every 3 seconds              │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

### Screenshot 3.3: Scraping Complete, Generating Starts
**After ~40 seconds**:

```
┌─────────────────────────────────────────────────┐
│ Job Status                                      │
│ ID: abc123-def456                               │
├─────────────────────────────────────────────────┤
│                                                 │
│ Status: 🎨 Generating                          │
│                                                 │
│ Progress: ████████████░░░░░░░░░░░░░░░░░░ 40%   │
│                                                 │
│ ┌─────────────────────────────────────────────┐ │
│ │ Total Ads:       5  ← Found 5 Nike ads!     │ │
│ │ Processed:       2  ← Processing batch 1    │ │
│ │ Successful:      2                          │ │
│ │ Failed:          0                          │ │
│ └─────────────────────────────────────────────┘ │
│                                                 │
│ Message: Generating branded ad variations...   │
│                                                 │
│ Latest Events:                                  │
│ [INFO] Successfully scraped 5 ads               │
│ [INFO] Starting batch 1 (2 ads)                 │
│ [INFO] Generating ad 1 of 5...                  │
│ [INFO] Generating ad 2 of 5...                  │
│                                                 │
│ Gallery (2 so far):                             │
│ ┌─────────┐ ┌─────────┐                        │
│ │ Nike Ad │ │  Your   │                        │
│ │  #1     │ │Branded  │                        │
│ │Original │ │ Version │                        │
│ │    [⬇]  │ │   [⬇]   │                        │
│ └─────────┘ └─────────┘                        │
│ ┌─────────┐ ┌─────────┐                        │
│ │ Nike Ad │ │  Your   │                        │
│ │  #2     │ │Branded  │                        │
│ │Original │ │ Version │                        │
│ │    [⬇]  │ │   [⬇]   │                        │
│ └─────────┘ └─────────┘                        │
│                                                 │
│ ⟳ Auto-refreshing every 3 seconds              │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

### Screenshot 3.4: More Progress
**After ~2 minutes**:

```
┌─────────────────────────────────────────────────┐
│ Job Status                                      │
│ ID: abc123-def456                               │
├─────────────────────────────────────────────────┤
│                                                 │
│ Status: 🎨 Generating                          │
│                                                 │
│ Progress: ████████████████████████░░░░░░ 80%   │
│                                                 │
│ ┌─────────────────────────────────────────────┐ │
│ │ Total Ads:       5                          │ │
│ │ Processed:       4  ← Almost done!          │ │
│ │ Successful:      4                          │ │
│ │ Failed:          0                          │ │
│ └─────────────────────────────────────────────┘ │
│                                                 │
│ Message: Processing batch 2...                 │
│                                                 │
│ Gallery (4 ads completed):                      │
│ [Grid of 4 original + 4 branded ads shown]     │
│                                                 │
│ ⟳ Auto-refreshing every 3 seconds              │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

### Screenshot 3.5: Complete!
**After ~3-4 minutes**:

```
┌─────────────────────────────────────────────────┐
│ Job Status                                      │
│ ID: abc123-def456                               │
├─────────────────────────────────────────────────┤
│                                                 │
│ Status: ✅ Done                                │
│                                                 │
│ Progress: ████████████████████████████████ 100% │
│                                                 │
│ ┌─────────────────────────────────────────────┐ │
│ │ Total Ads:       5                          │ │
│ │ Processed:       5                          │ │
│ │ Successful:      5  ← All succeeded! 🎉    │ │
│ │ Failed:          0                          │ │
│ └─────────────────────────────────────────────┘ │
│                                                 │
│ Message: Job completed successfully!            │
│                                                 │
│                   [Download All Ads]            │
│                   [Back to Home]                │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

## Step 4: Gallery View

### Screenshot 4.1: Full Gallery
**Scroll down on job page**:

```
┌─────────────────────────────────────────────────┐
│ Generated Ad Gallery (5 pairs)                  │
├─────────────────────────────────────────────────┤
│                                                 │
│ Ad 1 of 5:                                      │
│ ┌────────────────────┐  ┌────────────────────┐ │
│ │                    │  │                    │ │
│ │   ORIGINAL NIKE    │  │   YOUR BRANDED     │ │
│ │     AD IMAGE       │  │    AD IMAGE        │ │
│ │                    │  │                    │ │
│ │  [Nike Swoosh]     │  │  [Ara's DNA Logo]  │ │
│ │  "Just Do It"      │  │  "Ara's DNA"       │ │
│ │                    │  │                    │ │
│ │  Product: Shoe     │  │  Product: YOUR     │ │
│ │  Style: Sporty     │  │          PRODUCT   │ │
│ │                    │  │  Same style ✓      │ │
│ │        [⬇ Download]│  │      [⬇ Download]  │ │
│ └────────────────────┘  └────────────────────┘ │
│                                                 │
│ Ad 2 of 5:                                      │
│ ┌────────────────────┐  ┌────────────────────┐ │
│ │                    │  │                    │ │
│ │   ORIGINAL NIKE    │  │   YOUR BRANDED     │ │
│ │     AD IMAGE       │  │    AD IMAGE        │ │
│ │                    │  │                    │ │
│ │  [Different Nike]  │  │  [Ara's DNA]       │ │
│ │  "Run Faster"      │  │  "Ara's DNA"       │ │
│ │                    │  │                    │ │
│ │  Product: Apparel  │  │  Product: YOUR     │ │
│ │  Style: Action     │  │          PRODUCT   │ │
│ │                    │  │  Same style ✓      │ │
│ │        [⬇ Download]│  │      [⬇ Download]  │ │
│ └────────────────────┘  └────────────────────┘ │
│                                                 │
│ ... (3 more ad pairs below)                     │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

## Step 5: Download

### Screenshot 5.1: Individual Download
**Click a download button**:

```
Browser Download Bar:
┌─────────────────────────────────────────────────┐
│ ⬇ Downloading: asset-abc123.png                │
│ ████████████████████████████░░░░░░░  80%       │
│                                                 │
│ From: ad-thief.pages.dev                        │
│ Size: 1.2 MB                                    │
│                                                 │
│                        [Cancel] [Show in Folder]│
└─────────────────────────────────────────────────┘
```

---

### Screenshot 5.2: Download Complete
**After download finishes**:

```
Your Downloads Folder:
┌─────────────────────────────────────────────────┐
│ 📁 Downloads                                    │
├─────────────────────────────────────────────────┤
│                                                 │
│ 📄 asset-abc123.png              1.2 MB        │ ← Downloaded!
│    Modified: Just now                           │
│                                                 │
│ 📄 asset-def456.png              980 KB        │
│    Modified: Just now                           │
│                                                 │
│ 📄 asset-ghi789.png              1.5 MB        │
│    Modified: Just now                           │
│                                                 │
│ ... (more downloaded ads)                       │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

### Screenshot 5.3: Download All
**Click "Download All Ads" button**:

```
Multiple Downloads:
┌─────────────────────────────────────────────────┐
│ ⬇ Multiple files downloading (5)               │
├─────────────────────────────────────────────────┤
│                                                 │
│ asset-001.png    ████████████████████ Done     │
│ asset-002.png    ████████████████████ Done     │
│ asset-003.png    ████████████░░░░░░░  Downloading│
│ asset-004.png    ████░░░░░░░░░░░░░░░  Downloading│
│ asset-005.png    ░░░░░░░░░░░░░░░░░░░  Queued   │
│                                                 │
└─────────────────────────────────────────────────┘
```

---

## 🎉 Success!

### Final Result
**You now have**:

```
📁 Your Downloads/
  ├── asset-001.png  (Nike style ad with YOUR brand)
  ├── asset-002.png  (Nike style ad with YOUR brand)
  ├── asset-003.png  (Nike style ad with YOUR brand)
  ├── asset-004.png  (Nike style ad with YOUR brand)
  └── asset-005.png  (Nike style ad with YOUR brand)
```

**Each image**:
- ✅ Professional quality (1024x1024px)
- ✅ Your brand name ("Ara's DNA")
- ✅ Your product image
- ✅ Nike's ad style replicated
- ✅ Ready to use immediately

---

## 📱 Mobile View Differences

### Mobile Homepage
```
┌─────────────────────┐
│                     │
│  🎨 FB Ad Thief 🤖 │
│                     │
│ Clone competitor    │
│ ads with AI         │
│                     │
│ [Get Started] ←Tap  │
│                     │
│ Features:           │
│ • Scraping         │
│ • AI Generation    │
│ • Downloads        │
│                     │
└─────────────────────┘
```

### Mobile Form (Stacked)
```
┌─────────────────────┐
│ Create Job          │
├─────────────────────┤
│                     │
│ Facebook URL *      │
│ ┌─────────────────┐ │
│ │ facebook.com/   │ │
│ │ nike/           │ │
│ └─────────────────┘ │
│                     │
│ Brand Name *        │
│ ┌─────────────────┐ │
│ │ Ara's DNA       │ │
│ └─────────────────┘ │
│                     │
│ Product Image *     │
│ [Choose File]       │
│                     │
│ ▼ Advanced          │
│                     │
│ [Generate Ads]      │
│                     │
└─────────────────────┘
```

### Mobile Gallery (Single Column)
```
┌─────────────────────┐
│ Gallery             │
├─────────────────────┤
│                     │
│ Ad 1 - Original     │
│ ┌─────────────────┐ │
│ │                 │ │
│ │  Nike Ad        │ │
│ │                 │ │
│ └─────────────────┘ │
│     [⬇ Download]    │
│                     │
│ Ad 1 - Branded      │
│ ┌─────────────────┐ │
│ │                 │ │
│ │  Your Brand     │ │
│ │                 │ │
│ └─────────────────┘ │
│     [⬇ Download]    │
│                     │
│ Ad 2 - Original     │
│ ┌─────────────────┐ │
│ ...                 │
│                     │
└─────────────────────┘
```

---

## 🔍 Key UI Elements Reference

### Status Badges
```
⏳ Queued    = Gray badge, waiting
🔍 Scraping  = Blue badge, finding ads
🎨 Generating = Purple badge, creating
✅ Done      = Green badge, complete
❌ Failed    = Red badge, error
```

### Progress Bars
```
Empty:     ░░░░░░░░░░░░░░░░░░░░░░░░░░░░░ 0%
Quarter:   ███████░░░░░░░░░░░░░░░░░░░░░░ 25%
Half:      ██████████████░░░░░░░░░░░░░░ 50%
Complete:  ████████████████████████████ 100%
```

### Buttons
```
Primary:   [Generate Inspired Creatives]  ← Blue
Secondary: [Download All]                 ← Gray
Download:  [⬇]                            ← Small icon
Retry:     [🔄 Retry]                     ← Orange
```

---

## ✅ Visual Checklist

**Before submitting**, verify you see:
- ✅ Green checkmarks next to URL and Brand fields
- ✅ Image preview appears after upload
- ✅ "Generate" button is blue and enabled

**During processing**, verify you see:
- ✅ Status badge changes (Queued → Scraping → Generating)
- ✅ Progress bar moves forward
- ✅ "Auto-refreshing" message appears
- ✅ Gallery items appear as they complete

**After completion**, verify you see:
- ✅ Status: "Done" with green badge
- ✅ Progress: 100%
- ✅ All ads in gallery (original + branded pairs)
- ✅ Download buttons on each ad
- ✅ "Download All" button at top

---

**End of Visual Walkthrough**

**Next**: Open https://ad-thief.pages.dev and follow these screenshots!
