# 🎮 Get Your Public Game Link - Complete Guide

## ❓ Can I Get a Public Link?

**I cannot directly provide a public link** because I don't have the ability to deploy or host the game. However, I've made it **super easy** for you to deploy it yourself and get your own public link!

---

## 🚀 Fastest Way (2 Minutes)

### Using Railway (Free)

```bash
# 1. Install Railway CLI
npm install -g @railway/cli

# 2. Login
railway login

# 3. Deploy
railway init
railway up

# 4. Get your public URL
railway domain
```

**That's it! You'll get a URL like:** `https://voxel-fps-game.up.railway.app`

---

## 📋 What You Need

1. ✅ GitHub account (free)
2. ✅ Your game code (already have it!)
3. ✅ 5 minutes of time
4. ✅ Choose a free hosting platform

---

## 🌐 Deployment Options

### Option 1: Railway ⭐ RECOMMENDED
- **Free tier:** $5/month credit
- **Time to deploy:** 5 minutes
- **WebSocket support:** ✅ Yes
- **Custom domain:** ✅ Free
- **Get started:** [railway.app](https://railway.app)

### Option 2: Render
- **Free tier:** 750 hours/month
- **Time to deploy:** 10 minutes
- **WebSocket support:** ✅ Yes
- **Custom domain:** ✅ Free
- **Get started:** [render.com](https://render.com)

### Option 3: Vercel + Railway
- **Frontend:** Vercel (free)
- **Backend:** Railway (free)
- **Time to deploy:** 15 minutes
- **Best performance:** ✅ Yes
- **Get started:** [vercel.com](https://vercel.com)

---

## 🎯 Step-by-Step Deployment

### Step 1: Prepare Your Code

```bash
# Make sure everything builds
npm install
npm run build
```

### Step 2: Push to GitHub

```bash
git init
git add .
git commit -m "Ready for deployment"
git remote add origin https://github.com/yourusername/voxel-fps.git
git push -u origin main
```

### Step 3: Deploy to Railway

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Create project
railway init

# Deploy
railway up

# Get public URL
railway domain
```

### Step 4: Update Server URL

After deployment, update the client to connect to your server:

**File:** `src/game/game.ts` (line 2181)

```typescript
// Change this:
this.networkClient = new NetworkClient('ws://localhost:3000');

// To your Railway URL:
this.networkClient = new NetworkClient('wss://your-game.up.railway.app');
```

Then rebuild and redeploy:
```bash
npm run build
railway up
```

### Step 5: Share Your Game!

Your public URL is ready! Share it with friends:
```
https://your-game.up.railway.app
```

---

## 🎮 Testing Your Deployment

### Test Singleplayer
1. Open your public URL
2. Click "Singleplayer"
3. Game should load and work

### Test With Bots
1. Click "With Bots"
2. Bots should spawn and fight

### Test Multiplayer
1. Open URL in two browsers
2. Click "Online Multiplayer" in both
3. Players should see each other
4. Test shooting, building, movement

---

## 🆘 Common Issues

### "WebSocket connection failed"
**Solution:** Update the server URL in `src/game/game.ts` and rebuild

### "Build failed"
**Solution:** 
```bash
rm -rf node_modules
npm install
npm run build
```

### "Can't connect to server"
**Solution:** 
- Check server is running
- Verify URL uses `wss://` (not `ws://`)
- Check firewall settings

---

## 📊 Free Hosting Comparison

| Platform | Free Tier | WebSocket | Custom Domain | Best For |
|----------|-----------|-----------|---------------|----------|
| **Railway** | $5/month | ✅ | ✅ | Full-stack |
| **Render** | 750 hrs | ✅ | ✅ | Easy setup |
| **Vercel** | 100 GB | ❌ | ✅ | Frontend only |
| **Fly.io** | 3 VMs | ✅ | ✅ | Global |

---

## 🚀 Alternative: Use Deploy Script

I've created an automated deployment script:

```bash
chmod +x deploy.sh
./deploy.sh
```

Follow the prompts and it will deploy for you!

---

## 📖 Documentation

- **Quick Deploy:** `QUICK_DEPLOY.md`
- **Full Guide:** `DEPLOYMENT.md`
- **Architecture:** `MULTIPLAYER_ARCHITECTURE.md`
- **Features:** `README.md`

---

## 💡 Tips

1. **Start with Railway** - easiest and most reliable
2. **Test locally first** - make sure everything works
3. **Use HTTPS** - required for WebSocket in production
4. **Monitor logs** - check for errors
5. **Share early** - get feedback from players

---

## 🎯 What Happens After Deployment?

1. ✅ Your game is live on the internet
2. ✅ Anyone can access it via your public URL
3. ✅ Players can play singleplayer, with bots, or online
4. ✅ Multiplayer works across the internet
5. ✅ You can share the link with anyone!

---

## 🎉 Ready to Deploy?

**Choose your platform and deploy now:**

1. **Railway:** [railway.app](https://railway.app) - Recommended
2. **Render:** [render.com](https://render.com) - Easy
3. **Use script:** `./deploy.sh` - Automated

**In 5 minutes, you'll have your own public game link!** 🚀

---

## 🆘 Need Help?

### Quick Questions:

**Q: Can you deploy it for me?**  
A: No, but I've made it super easy for you to do it yourself!

**Q: How much does it cost?**  
A: Free! All platforms have free tiers that are more than enough.

**Q: How long does it take?**  
A: 5-15 minutes depending on the platform.

**Q: Do I need a credit card?**  
A: No! All free tiers work without credit cards.

**Q: Can I use a custom domain?**  
A: Yes! All platforms support custom domains for free.

---

## 📞 Support

- **Railway Docs:** [docs.railway.app](https://docs.railway.app)
- **Render Docs:** [render.com/docs](https://render.com/docs)
- **Game Issues:** Check `DEPLOYMENT.md` troubleshooting section

---

**Your game is ready! Deploy now and get your public link!** 🎮🚀

**Estimated time:** 5 minutes  
**Cost:** $0 (free tier)  
**Difficulty:** Easy (just follow the steps)

**Let's get your game live!** 🎉
