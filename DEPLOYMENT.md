# 🚀 Deployment Guide - Voxel FPS

This guide will help you deploy the Voxel FPS game to get a public link.

## 🎯 Quick Deployment Options

### Option 1: Railway (Recommended - Free Tier Available)
**Best for:** Full-stack deployment with WebSocket support

1. **Sign up at [Railway](https://railway.app/)**
2. **Install Railway CLI:**
   ```bash
   npm install -g @railway/cli
   ```

3. **Login:**
   ```bash
   railway login
   ```

4. **Initialize project:**
   ```bash
   railway init
   ```

5. **Deploy:**
   ```bash
   railway up
   ```

6. **Get your public URL:**
   ```bash
   railway domain
   ```

**Your game will be live at:** `https://your-app-name.up.railway.app`

---

### Option 2: Render (Free Tier)
**Best for:** Easy deployment with automatic HTTPS

1. **Push your code to GitHub**

2. **Sign up at [Render](https://render.com/)**

3. **Create New Web Service:**
   - Connect your GitHub repository
   - Build Command: `npm install && npm run build`
   - Start Command: `npm run server`
   - Environment Variables:
     - `NODE_ENV`: `production`
     - `PORT`: `3000`

4. **Deploy** - Render will automatically build and deploy

**Your game will be live at:** `https://your-app-name.onrender.com`

---

### Option 3: Vercel + Separate Server
**Best for:** Fast frontend with separate backend

#### Frontend (Vercel):
1. **Sign up at [Vercel](https://vercel.com/)**
2. **Install Vercel CLI:**
   ```bash
   npm install -g vercel
   ```
3. **Deploy frontend:**
   ```bash
   vercel
   ```

#### Backend (Railway/Render):
Deploy the server separately using Option 1 or 2

**Update client to connect to your server:**
Edit `src/game/game.ts` line 2181:
```typescript
this.networkClient = new NetworkClient('wss://your-server-url.up.railway.app');
```

---

### Option 4: Fly.io (Free Tier)
**Best for:** Global distribution

1. **Sign up at [Fly.io](https://fly.io/)**
2. **Install Fly CLI:**
   ```bash
   curl -L https://fly.io/install.sh | sh
   ```
3. **Login:**
   ```bash
   fly auth login
   ```
4. **Launch app:**
   ```bash
   fly launch
   ```
5. **Deploy:**
   ```bash
   fly deploy
   ```

**Your game will be live at:** `https://your-app-name.fly.dev`

---

## 📋 Pre-Deployment Checklist

### 1. Build the Project
```bash
npm install
npm run build
```

### 2. Test Locally
```bash
# Terminal 1 - Start server
npm run server

# Terminal 2 - Start client
npm run dev
```

### 3. Update Server URL for Production
Edit `src/game/game.ts` line 2181:
```typescript
// Change from localhost to your deployed server URL
this.networkClient = new NetworkClient('wss://your-server-url.com');
```

### 4. Environment Variables
Create `.env` file:
```env
NODE_ENV=production
PORT=3000
```

---

## 🔧 Server Configuration

### For Production Server

The server is configured to:
- Serve static files from `dist/` folder
- Handle WebSocket connections
- Run on port 3000 (configurable via PORT env var)

### Update Server URL in Client

After deploying your server, update the client to connect to it:

**File:** `src/game/game.ts` (line 2181)
```typescript
// Before (localhost)
this.networkClient = new NetworkClient('ws://localhost:3000');

// After (production)
this.networkClient = new NetworkClient('wss://your-server.up.railway.app');
```

Then rebuild:
```bash
npm run build
```

---

## 🌐 Deployment Steps (Step-by-Step)

### Complete Deployment to Railway

1. **Prepare your code:**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Install Railway CLI:**
   ```bash
   npm install -g @railway/cli
   ```

3. **Login to Railway:**
   ```bash
   railway login
   ```

4. **Create new project:**
   ```bash
   railway init
   # Follow prompts to name your project
   ```

5. **Deploy:**
   ```bash
   railway up
   ```

6. **Get public URL:**
   ```bash
   railway domain
   ```

7. **Update client to use production server:**
   - Edit `src/game/game.ts` line 2181
   - Change `ws://localhost:3000` to your Railway URL
   - Rebuild: `npm run build`
   - Redeploy: `railway up`

---

## 🎮 Testing Your Deployment

### 1. Test Singleplayer Mode
- Open your public URL
- Click "Singleplayer"
- Verify game loads and works

### 2. Test With Bots Mode
- Click "With Bots"
- Verify bots spawn and behave correctly

### 3. Test Online Multiplayer
- Open your URL in two different browsers
- Click "Online Multiplayer" in both
- Verify players can see each other
- Test shooting, building, and movement

---

## 🔍 Troubleshooting

### WebSocket Connection Failed
**Problem:** Client can't connect to server

**Solution:**
1. Check server is running
2. Verify WebSocket URL is correct (use `wss://` for HTTPS)
3. Check CORS settings
4. Verify firewall allows WebSocket connections

### Build Fails
**Problem:** `npm run build` fails

**Solution:**
```bash
# Clear cache and reinstall
rm -rf node_modules package-lock.json
npm install
npm run build
```

### Server Won't Start
**Problem:** Server crashes on startup

**Solution:**
1. Check logs: `railway logs` or `render logs`
2. Verify PORT environment variable is set
3. Check all dependencies are installed
4. Verify TypeScript compilation: `npm run typecheck`

### Multiplayer Not Working
**Problem:** Players can't see each other

**Solution:**
1. Verify both clients connect to same server
2. Check WebSocket connection in browser console
3. Verify server is broadcasting state updates
4. Check browser console for errors

---

## 📊 Free Tier Limits

### Railway
- **Free tier:** $5 credit/month
- **Estimated usage:** ~100-200 hours/month for small game
- **WebSocket:** Supported
- **Custom domain:** Free

### Render
- **Free tier:** 750 hours/month
- **Spins down:** After 15 minutes of inactivity
- **WebSocket:** Supported
- **Custom domain:** Free

### Vercel
- **Free tier:** 100 GB bandwidth/month
- **Serverless functions:** 100 GB-hours/month
- **WebSocket:** Requires separate server
- **Custom domain:** Free

### Fly.io
- **Free tier:** 3 shared VMs
- **Bandwidth:** 100 GB/month
- **WebSocket:** Supported
- **Custom domain:** Free

---

## 🚀 Advanced Deployment

### Custom Domain

1. **Buy a domain** (Namecheap, GoDaddy, etc.)

2. **Configure DNS:**
   - Add CNAME record pointing to your deployment URL
   - Example: `play.yourgame.com` → `your-app.up.railway.app`

3. **Enable HTTPS:**
   - Most platforms provide free SSL certificates
   - Railway/Render/Vercel auto-configure HTTPS

### Multiple Servers (Scaling)

For large player counts, consider:
1. **Load balancer** (nginx, HAProxy)
2. **Multiple server instances**
3. **Redis for state sharing**
4. **Database for persistence**

### Monitoring

Add monitoring to track:
- Player count
- Server performance
- Error rates
- WebSocket connections

**Tools:**
- [Sentry](https://sentry.io/) - Error tracking
- [Datadog](https://www.datadoghq.com/) - Monitoring
- [LogRocket](https://logrocket.com/) - Session replay

---

## 📝 Post-Deployment

### 1. Share Your Game
Once deployed, share your public URL:
```
https://your-game.up.railway.app
```

### 2. Update Documentation
Update README.md with your public URL:
```markdown
## 🎮 Play Now!

**Public URL:** https://your-game.up.railway.app
```

### 3. Monitor Performance
- Check server logs regularly
- Monitor player count
- Watch for errors
- Gather player feedback

---

## 🎯 Quick Start Commands

### Local Development
```bash
# Install dependencies
npm install

# Start server (Terminal 1)
npm run server

# Start client (Terminal 2)
npm run dev
```

### Build for Production
```bash
npm install
npm run build
```

### Deploy to Railway
```bash
railway login
railway init
railway up
railway domain
```

### Deploy to Render
1. Push to GitHub
2. Connect to Render
3. Set build/start commands
4. Deploy

---

## 💡 Tips

1. **Test locally first** before deploying
2. **Use environment variables** for configuration
3. **Enable HTTPS** for WebSocket connections
4. **Monitor logs** for debugging
5. **Start with free tier** to test
6. **Scale up** as player count grows

---

## 🆘 Need Help?

### Documentation
- [Railway Docs](https://docs.railway.app/)
- [Render Docs](https://render.com/docs)
- [Vercel Docs](https://vercel.com/docs)
- [Fly.io Docs](https://fly.io/docs/)

### Common Issues
- Check browser console for errors
- Verify WebSocket URL is correct
- Ensure server is running
- Check firewall settings

---

## ✅ Success Checklist

- [ ] Code builds successfully (`npm run build`)
- [ ] Server runs locally (`npm run server`)
- [ ] Client runs locally (`npm run dev`)
- [ ] Multiplayer works locally
- [ ] Deployed to hosting platform
- [ ] Public URL accessible
- [ ] WebSocket connection works
- [ ] All game modes work
- [ ] HTTPS enabled
- [ ] Custom domain configured (optional)

---

**Your game is ready for deployment! Choose a platform and follow the steps above to get your public link.** 🚀
