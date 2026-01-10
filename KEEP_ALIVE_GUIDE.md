# 🔄 Keep Your App Awake - Complete Guide

## 🎯 Understanding the Problem

### What's Happening?
- **Cloudflare Pages (Production)**: https://ad-thief.pages.dev - **NEVER SLEEPS** ✅
- **Local Sandbox (Development)**: http://localhost:3000 - **SLEEPS after inactivity** ⚠️

### The Confusion
You're experiencing the sandbox environment sleeping, NOT your live Cloudflare Pages app. Your production app at **https://ad-thief.pages.dev** is ALWAYS awake and never sleeps!

---

## ✅ Your LIVE App (Never Sleeps)

### Production URL
**https://ad-thief.pages.dev**

### Status
- ✅ **Always online** - 24/7/365
- ✅ **No wake-up needed** - Instant response
- ✅ **Global CDN** - Fast from anywhere
- ✅ **No maintenance** - Cloudflare handles everything

### How to Use It
Just bookmark and visit: **https://ad-thief.pages.dev**

**This is the URL you should use for regular work!**

---

## 💻 Local Sandbox (Development Only)

### When to Use Local Sandbox
Only use `localhost:3000` when:
- You're actively developing/testing changes
- You need to debug something
- You're making code updates

### DO NOT use localhost for regular work!

---

## 🚀 Best Practices - How to Avoid "Sleeping" Issues

### Option 1: Use Production App (RECOMMENDED)
**Always use**: https://ad-thief.pages.dev

**Benefits**:
- ✅ Never sleeps
- ✅ No setup required
- ✅ Always latest deployed version
- ✅ Same experience everywhere
- ✅ Shareable with team/clients

### Option 2: Wake Up Local Dev Server (When Needed)
If you need to test locally:

```bash
# Quick restart command
cd /home/user/webapp && pm2 restart webapp

# Or full restart
fuser -k 3000/tcp 2>/dev/null || true
cd /home/user/webapp && pm2 start ecosystem.config.cjs

# Check status
pm2 list
```

---

## 🔧 Quick Restart Commands

### Method 1: PM2 Restart (Fastest)
```bash
cd /home/user/webapp && pm2 restart webapp
```

### Method 2: Full Restart
```bash
# Kill port 3000
fuser -k 3000/tcp 2>/dev/null || true

# Restart with PM2
cd /home/user/webapp && pm2 start ecosystem.config.cjs

# Wait 3 seconds then test
sleep 3 && curl http://localhost:3000/api/health
```

### Method 3: Nuclear Option (If nothing works)
```bash
# Kill all PM2 processes
pm2 delete all

# Clean port
fuser -k 3000/tcp 2>/dev/null || true

# Rebuild and restart
cd /home/user/webapp && npm run build
cd /home/user/webapp && pm2 start ecosystem.config.cjs
```

---

## 📱 Bookmarks You Should Have

### Primary (Production - Use This!)
- **App**: https://ad-thief.pages.dev
- **Health**: https://ad-thief.pages.dev/api/health

### Secondary (Development Only)
- **Local**: http://localhost:3000 (sandbox only)

### Management
- **Cloudflare Dashboard**: https://dash.cloudflare.com/
- **Supabase Dashboard**: https://supabase.com/dashboard

---

## 🎯 Workflow Recommendation

### For Regular Use (Creating Jobs)
1. **Bookmark** https://ad-thief.pages.dev
2. **Visit** the bookmark whenever you need to create ads
3. **Done!** No wake-up, no waiting, always fast

### For Development (Making Changes)
1. **Make code changes** in sandbox
2. **Test locally** at http://localhost:3000
3. **Build**: `npm run build`
4. **Deploy**: `wrangler pages deploy dist --project-name ad-thief`
5. **Use production** at https://ad-thief.pages.dev

---

## 🐛 Troubleshooting

### Issue: "localhost:3000 not responding"
**Solution**: This is normal! Use production instead: https://ad-thief.pages.dev

If you MUST use local:
```bash
pm2 restart webapp
```

### Issue: "Changes not showing on production"
**Solution**: Redeploy
```bash
cd /home/user/webapp && npm run build
source /home/user/.bashrc && npx wrangler pages deploy dist --project-name ad-thief
```

### Issue: "Can't remember the URL"
**Solution**: It's right here!
```
Production: https://ad-thief.pages.dev
Local Dev: http://localhost:3000 (sandbox only)
```

---

## 🎉 Key Takeaways

### ✅ DO
- Use **https://ad-thief.pages.dev** for all regular work
- Bookmark the production URL
- Share the production URL with others
- Use local dev only when actively developing

### ❌ DON'T
- Use localhost:3000 for regular work
- Worry about production "sleeping" (it never does!)
- Try to keep sandbox alive 24/7 (unnecessary)
- Share localhost URLs (only works in sandbox)

---

## 📊 URL Comparison

| Feature | Production (pages.dev) | Local (localhost:3000) |
|---------|------------------------|------------------------|
| Always Online | ✅ Yes | ❌ Sleeps |
| Fast Load | ✅ Global CDN | ⚠️ Sandbox only |
| Shareable | ✅ Yes | ❌ No |
| Latest Code | ✅ After deploy | ✅ Immediate |
| Use For | Regular work | Development |

---

## 🚀 Quick Start Checklist

When starting your work session:

### Regular Work Session
- [ ] Open bookmark: https://ad-thief.pages.dev
- [ ] Start creating jobs!
- [ ] Done! (No setup needed)

### Development Session
- [ ] Wake up local: `pm2 restart webapp`
- [ ] Make code changes
- [ ] Test at localhost:3000
- [ ] Deploy to production
- [ ] Test at https://ad-thief.pages.dev

---

## 💡 Pro Tip

**Create a browser bookmark folder** called "My Apps" with:
- Facebook Ad Thief: https://ad-thief.pages.dev
- Cloudflare Dashboard: https://dash.cloudflare.com/
- Supabase Dashboard: https://supabase.com/dashboard

This way you always have quick access to everything!

---

## 📞 Need Help?

If something's not working:
1. **First, try production**: https://ad-thief.pages.dev
2. **Check Cloudflare logs**: Dashboard → ad-thief → Logs
3. **Restart local if needed**: `pm2 restart webapp`
4. **Check PM2 status**: `pm2 list`

---

**Remember**: Your production app at **https://ad-thief.pages.dev** is ALWAYS awake and ready to use! 🎉

---

**Last Updated**: November 20, 2025
