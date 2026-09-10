# 🚀 Quick Start - Get Your Public Link

## Fastest Way to Deploy (5 minutes)

### Option 1: Railway (Recommended)

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

**Result:** `https://your-game.up.railway.app` 🎉

---

### Option 2: Render (Easiest)

1. Push code to GitHub
2. Go to [render.com](https://render.com)
3. Click "New Web Service"
4. Connect your repo
5. Set:
   - **Build:** `npm install && npm run build`
   - **Start:** `npm run server`
6. Click Deploy

**Result:** `https://your-game.onrender.com` 🎉

---

### Option 3: Use the Deploy Script

```bash
chmod +x deploy.sh
./deploy.sh
```

Follow the prompts and you're done!

---

## ⚠️ Important: Update Server URL

After deploying, you need to update the client to connect to your server:

1. Open `src/game/game.ts`
2. Find line 2181
3. Change:
   ```typescript
   // From:
   this.networkClient = new NetworkClient('ws://localhost:3000');
   
   // To:
   this.networkClient = new NetworkClient('wss://your-game.up.railway.app');
   ```
4. Rebuild and redeploy:
   ```bash
   npm run build
   railway up  # or your deployment command
   ```

---

## 🎮 Test Your Deployment

1. Open your public URL
2. Click "Singleplayer" - should work
3. Click "With Bots" - bots should appear
4. Open in another browser, click "Online Multiplayer"
5. You should see other players!

---

## 🆘 Troubleshooting

### "WebSocket connection failed"
- Make sure you updated the server URL in `src/game/game.ts`
- Use `wss://` (not `ws://`) for HTTPS sites
- Rebuild after changing the URL

### "Build failed"
```bash
rm -rf node_modules
npm install
npm run build
```

### "Server won't start"
- Check logs: `railway logs` or check Render dashboard
- Verify PORT environment variable is set
- Check all dependencies installed

---

## 📊 Free Tier Limits

| Platform | Free Tier | WebSocket | Best For |
|----------|-----------|-----------|----------|
| Railway | $5/month | ✅ | Full-stack |
| Render | 750 hrs/month | ✅ | Easy setup |
| Vercel | 100 GB bandwidth | ❌ (frontend only) | Fast frontend |
| Fly.io | 3 VMs | ✅ | Global distribution |

---

## 🎯 Next Steps

1. ✅ Deploy your game
2. ✅ Share the public URL with friends
3. ✅ Test multiplayer with real players
4. ✅ Monitor performance
5. ✅ Gather feedback

---

## 📖 Need More Help?

- **Full deployment guide:** See `DEPLOYMENT.md`
- **Architecture docs:** See `MULTIPLAYER_ARCHITECTURE.md`
- **Game features:** See `README.md`

---

**Your game is ready! Deploy now and share your public link!** 🚀
