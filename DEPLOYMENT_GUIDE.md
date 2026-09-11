# 🌍 Complete Server Deployment Guide

This guide explains how to deploy your Voxel FPS game server online so players from anywhere can connect and play.

---

## 📋 Prerequisites

Before deploying, ensure you have:
- ✅ Your game code pushed to GitHub
- ✅ A GitHub account
- ✅ Basic command line knowledge
- ✅ (Optional) A domain name (for custom URLs)

---

## 🚀 Deployment Options

### Option 1: Railway (⭐ Recommended - Easiest)

**Why Railway?**
- Free tier available ($5 credit/month)
- Automatic HTTPS
- Easy deployment from GitHub
- No credit card required for free tier
- Fast deployment (~2 minutes)

**Step-by-Step Guide:**

1. **Create Railway Account**
   ```
   1. Go to https://railway.app
   2. Click "Start on Railway"
   3. Sign up with GitHub
   ```

2. **Deploy Your Server**
   ```
   1. Click "New Project"
   2. Select "Deploy from GitHub repo"
   3. Select your voxel-fps repository
   4. Railway detects it's a Node.js app automatically
   ```

3. **Configure Environment**
   ```
   1. Go to your project settings
   2. Go to "Variables" tab
   3. Add variable: PORT = 3000
   ```

4. **Deploy**
   ```
   1. Click "Deploy"
   2. Wait for deployment (~2 minutes)
   3. Your server is now live!
   ```

5. **Get Your Server URL**
   ```
   1. Go to "Settings" tab
   2. Find "Networking" section
   3. Your URL will be like: wss://your-game.up.railway.app
   ```

6. **Update Client**
   ```typescript
   // In src/game/game.ts, find initializeNetwork():
   this.networkClient = new NetworkClient('wss://your-game.up.railway.app');
   ```

7. **Rebuild and Deploy Client**
   ```bash
   npm run build
   # Upload dist/ folder to Vercel/Netlify/GitHub Pages
   ```

**Cost:** Free tier includes $5 credit/month (plenty for small games)

---

### Option 2: Render (Free Tier)

**Why Render?**
- Completely free tier
- Automatic HTTPS
- Easy GitHub integration
- Good for small projects

**Step-by-Step Guide:**

1. **Create Render Account**
   ```
   1. Go to https://render.com
   2. Click "Get Started"
   3. Sign up with GitHub
   ```

2. **Create Web Service**
   ```
   1. Click "New" → "Web Service"
   2. Connect your GitHub repository
   3. Configure settings:
      - Name: voxel-fps-server
      - Region: Choose closest to you
      - Branch: main
      - Root Directory: (leave empty)
      - Environment: Node
      - Build Command: npm install && npm run build
      - Start Command: npm run server
   ```

3. **Add Environment Variables**
   ```
   1. Go to "Environment" tab
   2. Add: PORT = 3000
   ```

4. **Deploy**
   ```
   1. Click "Create Web Service"
   2. Wait for deployment (~3-5 minutes)
   ```

5. **Get Your Server URL**
   ```
   Your URL will be like: wss://voxel-fps-server.onrender.com
   ```

6. **Update Client and Deploy**
   ```typescript
   // Update server URL in client code
   this.networkClient = new NetworkClient('wss://voxel-fps-server.onrender.com');
   
   // Rebuild and deploy client
   npm run build
   ```

**Cost:** Free tier (750 hours/month)

---

### Option 3: Fly.io (Free Tier)

**Why Fly.io?**
- Free tier available
- Global edge deployment
- Good performance
- Docker-based (flexible)

**Step-by-Step Guide:**

1. **Install Fly CLI**
   ```bash
   # macOS/Linux
   curl -L https://fly.io/install.sh | sh
   
   # Windows (PowerShell)
   iwr https://fly.io/install.ps1 -useb | iex
   ```

2. **Login to Fly**
   ```bash
   fly auth login
   ```

3. **Launch Your App**
   ```bash
   # In your project directory
   fly launch
   
   # Answer prompts:
   # - App name: voxel-fps-server (or choose your own)
   # - Region: Choose closest to you
   # - Database: No
   ```

4. **Configure for Node.js**
   ```bash
   # Fly will create a fly.toml file
   # Edit it to ensure it's configured for Node.js
   ```

5. **Deploy**
   ```bash
   fly deploy
   ```

6. **Get Your Server URL**
   ```
   Your URL will be like: wss://voxel-fps-server.fly.dev
   ```

7. **Update Client and Deploy**
   ```typescript
   this.networkClient = new NetworkClient('wss://voxel-fps-server.fly.dev');
   npm run build
   ```

**Cost:** Free tier (3 shared VMs)

---

### Option 4: VPS (DigitalOcean, AWS, Linode, etc.)

**Why VPS?**
- Full control
- Best performance
- Scalable
- Custom domain support

**Step-by-Step Guide (DigitalOcean Example):**

1. **Create a VPS**
   ```
   1. Go to https://digitalocean.com
   2. Create a Droplet
   3. Choose: Ubuntu 22.04 LTS
   4. Choose plan: Basic ($4-6/month)
   5. Choose region closest to you
   6. Add SSH key
   7. Create Droplet
   ```

2. **SSH Into Your Server**
   ```bash
   ssh root@your-server-ip
   ```

3. **Install Node.js**
   ```bash
   # Update system
   apt update && apt upgrade -y
   
   # Install Node.js 18
   curl -fsSL https://deb.nodesource.com/setup_18.x | bash -
   apt install -y nodejs
   
   # Verify installation
   node --version  # Should show v18.x.x
   npm --version   # Should show 9.x.x
   ```

4. **Install Git**
   ```bash
   apt install -y git
   ```

5. **Clone Your Repository**
   ```bash
   cd /var/www
   git clone https://github.com/yourusername/voxel-fps.git
   cd voxel-fps
   ```

6. **Install Dependencies**
   ```bash
   npm install
   ```

7. **Build the Project**
   ```bash
   npm run build
   ```

8. **Install PM2 (Process Manager)**
   ```bash
   npm install -g pm2
   ```

9. **Start the Server**
   ```bash
   pm2 start npm --name "voxel-fps" -- run server
   ```

10. **Save PM2 Configuration**
    ```bash
    pm2 save
    pm2 startup
    # Copy and run the command it gives you
    ```

11. **Configure Firewall**
    ```bash
    # Install UFW if not installed
    apt install -y ufw
    
    # Allow SSH
    ufw allow ssh
    
    # Allow port 3000
    ufw allow 3000
    
    # Enable firewall
    ufw enable
    ```

12. **Get Your Server URL**
    ```
    Your URL will be: wss://your-server-ip:3000
    Example: wss://123.45.67.89:3000
    ```

13. **Update Client and Deploy**
    ```typescript
    this.networkClient = new NetworkClient('wss://123.45.67.89:3000');
    npm run build
    ```

**Cost:** $4-6/month for basic VPS

---

### Option 5: Heroku (Free Tier - Limited)

**Note:** Heroku's free tier is limited, but good for testing.

**Step-by-Step Guide:**

1. **Install Heroku CLI**
   ```bash
   # macOS
   brew tap heroku/brew && brew install heroku
   
   # Windows
   npm install -g heroku
   
   # Linux
   curl https://cli-assets.heroku.com/install.sh | sh
   ```

2. **Login to Heroku**
   ```bash
   heroku login
   ```

3. **Create Heroku App**
   ```bash
   heroku create voxel-fps-server
   ```

4. **Deploy**
   ```bash
   git push heroku main
   ```

5. **Get Your Server URL**
   ```
   Your URL will be: wss://voxel-fps-server.herokuapp.com
   ```

**Cost:** Free tier (limited hours/month)

---

## 🔧 Updating Client for Online Server

After deploying your server, you need to update the client to connect to it:

### Step 1: Update Server URL

Edit `src/game/game.ts`:

```typescript
// Find the initializeNetwork() method
private initializeNetwork(): void {
  console.log('Initializing network for online multiplayer');
  
  // Change this line:
  this.networkClient = new NetworkClient('ws://localhost:3000');
  
  // To your server URL (use wss:// for HTTPS):
  this.networkClient = new NetworkClient('wss://your-server-url.com');
  
  // ... rest of the code
}
```

### Step 2: Rebuild Client

```bash
npm run build
```

### Step 3: Deploy Client

Upload the `dist/` folder to your hosting service:

**Vercel:**
```bash
npm install -g vercel
vercel
```

**Netlify:**
```bash
npm install -g netlify-cli
netlify deploy --prod
```

**GitHub Pages:**
```bash
# Push dist/ folder to gh-pages branch
git subtree push --prefix dist origin gh-pages
```

---

## 🌐 Hosting Client Online

### Vercel (Recommended)

1. Go to https://vercel.com
2. Sign up with GitHub
3. Click "New Project"
4. Import your GitHub repository
5. Vercel auto-detects Vite
6. Click "Deploy"
7. Your site will be live at: `https://your-project.vercel.app`

### Netlify

1. Go to https://netlify.com
2. Sign up with GitHub
3. Click "Add new site" → "Import an existing project"
4. Choose your GitHub repository
5. Configure:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Click "Deploy site"
7. Your site will be live at: `https://your-site.netlify.app`

### GitHub Pages

1. Push your code to GitHub
2. Go to repository settings
3. Go to "Pages" section
4. Source: Deploy from branch
5. Branch: `main` / folder: `/dist`
6. Save
7. Your site will be at: `https://username.github.io/repo-name`

---

## 🔒 SSL/HTTPS Setup

Most hosting platforms provide free HTTPS automatically:
- ✅ Railway: Automatic HTTPS
- ✅ Render: Automatic HTTPS
- ✅ Fly.io: Automatic HTTPS
- ✅ Vercel: Automatic HTTPS
- ✅ Netlify: Automatic HTTPS
- ✅ GitHub Pages: Automatic HTTPS

For VPS, you can use Let's Encrypt:
```bash
# Install Certbot
apt install certbot

# Get SSL certificate
certbot --nginx -d yourdomain.com
```

---

## 📊 Performance Comparison

| Platform | Free Tier | Cost After | Setup Time | Performance |
|----------|-----------|------------|------------|-------------|
| Railway | $5 credit | ~$5/month | 2 min | ⭐⭐⭐⭐⭐ |
| Render | 750 hrs | ~$7/month | 3 min | ⭐⭐⭐⭐ |
| Fly.io | 3 VMs | ~$5/month | 5 min | ⭐⭐⭐⭐⭐ |
| VPS | None | $4-6/month | 30 min | ⭐⭐⭐⭐⭐ |
| Heroku | Limited | ~$7/month | 5 min | ⭐⭐⭐ |

---

## 🎯 Recommended Setup

**For Testing/Small Groups:**
- **Server:** Railway (free tier)
- **Client:** Vercel (free)
- **Total Cost:** $0

**For Medium Groups:**
- **Server:** Railway or Fly.io ($5/month)
- **Client:** Vercel or Netlify (free)
- **Total Cost:** ~$5/month

**For Large Groups/Production:**
- **Server:** VPS (DigitalOcean $6/month)
- **Client:** Vercel Pro ($20/month) or custom domain
- **Total Cost:** ~$26/month

---

## 🐛 Troubleshooting

### "Failed to connect to server"

**Check:**
1. Server is running: Check deployment logs
2. URL is correct: Use `wss://` for HTTPS
3. Firewall: Ensure port 3000 is open
4. CORS: Not an issue for WebSocket

### "WebSocket connection failed"

**Check:**
1. URL format: `wss://your-server.com` (not `ws://` for HTTPS)
2. Server is deployed and running
3. No typos in the URL
4. Server logs for errors

### "Client can't connect"

**Check:**
1. Client is built with correct server URL
2. Client is deployed and accessible
3. Browser console for errors
4. Network tab for WebSocket connection

---

## 📝 Quick Deployment Checklist

### Server Deployment
- [ ] Code pushed to GitHub
- [ ] Chosen hosting platform
- [ ] Created account
- [ ] Deployed server
- [ ] Got server URL (wss://...)
- [ ] Tested server connection

### Client Deployment
- [ ] Updated server URL in code
- [ ] Rebuilt client (`npm run build`)
- [ ] Chosen hosting platform
- [ ] Deployed client
- [ ] Got client URL (https://...)
- [ ] Tested client connection

### Testing
- [ ] Opened client in browser
- [ ] Selected "Online Multiplayer"
- [ ] Connected to server successfully
- [ ] Tested gameplay with another player
- [ ] Verified all features work

---

## 🎉 You're Done!

Your game is now live and playable online! Share your client URL with friends and start playing together.

**Example URLs:**
- Server: `wss://voxel-fps.up.railway.app`
- Client: `https://voxel-fps.vercel.app`

**Share the client URL with your friends and enjoy playing together!** 🎮

---

## 📞 Support

If you encounter issues:
1. Check the troubleshooting section above
2. Check deployment platform logs
3. Check browser console for errors
4. Verify all URLs are correct
5. Ensure ports are open

---

**Last Updated:** 2026-09-08  
**Version:** 1.0.7
