# 🎮 Voxel FPS - Multiplayer Capture the Flag

A complete multiplayer voxel-based first-person shooter with capture-the-flag gameplay, built with React, Three.js, and TypeScript.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![TypeScript](https://img.shields.io/badge/typescript-100%25-blue)

## ✨ Features

- **🎯 Capture the Flag** - Complete CTF gameplay with flag pickup/drop/capture
- **🌐 Multiplayer** - Play with friends online or against AI bots
- **🤖 Advanced AI** - 11 behavior states with intelligent decision making
- **🔊 Spatial Audio** - Immersive 3D audio with distance-based volume
- **🏗️ Destructible Environment** - Build and destroy voxel terrain
- **🔫 Multiple Weapons** - Rifle, SMG, Pickaxe, and Spade

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Modern web browser with WebGL support

### Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd voxel-fps

# Install dependencies
npm install

# Build the project
npm run build
```

### Running Locally

#### Singleplayer/Bots Mode
```bash
npm run dev
# Open http://localhost:5173
```

#### Multiplayer Mode
```bash
# Terminal 1 - Start server
npm run server

# Terminal 2 - Start client
npm run dev
# Open http://localhost:5173 and select "Online Multiplayer"
```

## 🌐 Hosting for Others to Test

### Option 1: Railway (Recommended - Easiest)

**Step 1: Create Railway Account**
1. Go to https://railway.app
2. Sign up with GitHub

**Step 2: Deploy Your Game**
1. Push your code to GitHub
2. In Railway, click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Railway will automatically detect it's a Node.js app
5. Add environment variable: `PORT = 3000`
6. Click "Deploy"

**Step 3: Get Your Server URL**
1. After deployment, Railway gives you a URL like: `wss://your-game.up.railway.app`
2. Update client to use this URL:
   ```typescript
   // In src/game/game.ts
   this.networkClient = new NetworkClient('wss://your-game.up.railway.app');
   ```
3. Rebuild and deploy client

**Step 4: Deploy Client**
- Use Vercel, Netlify, or GitHub Pages for the client
- Update the server URL in the client code before building

### Option 2: Render (Free Tier)

**Step 1: Create Render Account**
1. Go to https://render.com
2. Sign up with GitHub

**Step 2: Deploy Server**
1. Click "New" → "Web Service"
2. Connect your GitHub repository
3. Configure:
   - **Name:** voxel-fps-server
   - **Environment:** Node
   - **Build Command:** `npm install && npm run build`
   - **Start Command:** `npm run server`
4. Add environment variable: `PORT = 3000`
5. Click "Create Web Service"

**Step 3: Get Server URL**
- Render gives you a URL like: `wss://voxel-fps-server.onrender.com`
- Update client code with this URL

### Option 3: Fly.io (Free Tier)

**Step 1: Install Fly CLI**
```bash
# macOS/Linux
curl -L https://fly.io/install.sh | sh

# Windows
powershell -Command "iwr https://fly.io/install.ps1 -useb | iex"
```

**Step 2: Login and Deploy**
```bash
fly auth login
fly launch
fly deploy
```

**Step 3: Get Server URL**
- Fly gives you a URL like: `wss://your-app.fly.dev`
- Update client code with this URL

### Option 4: VPS (DigitalOcean, AWS, etc.)

**Step 1: Set Up VPS**
1. Create a VPS (Ubuntu 20.04+ recommended)
2. SSH into your server
3. Install Node.js 18+:
   ```bash
   curl -fsSL https://deb.nodesource.com/setup_18.x | sudo -E bash -
   sudo apt-get install -y nodejs
   ```

**Step 2: Deploy Your Game**
```bash
# Clone your repository
git clone https://github.com/yourusername/voxel-fps.git
cd voxel-fps

# Install dependencies
npm install

# Build the project
npm run build

# Install PM2 (process manager)
sudo npm install -g pm2

# Start the server with PM2
pm2 start npm --name "voxel-fps" -- run server

# Save PM2 configuration
pm2 save
pm2 startup
```

**Step 3: Configure Firewall**
```bash
# Allow port 3000
sudo ufw allow 3000
sudo ufw reload
```

**Step 4: Get Server IP**
- Your server IP will be something like: `wss://123.45.67.89:3000`
- Update client code with this URL

---

## 🔧 Updating Client for Online Server

After deploying your server, update the client to connect to it:

**Step 1: Update Server URL**
Edit `src/game/game.ts`:
```typescript
// Find this line in initializeNetwork():
this.networkClient = new NetworkClient('ws://localhost:3000');

// Change to your server URL (use wss:// for HTTPS):
this.networkClient = new NetworkClient('wss://your-server-url.com');
```

**Step 2: Rebuild Client**
```bash
npm run build
```

**Step 3: Deploy Client**
Upload the `dist/` folder to your hosting service (Vercel, Netlify, GitHub Pages, etc.)

---

## 🌐 Hosting Client Online

### Vercel (Recommended)
1. Go to https://vercel.com
2. Sign up with GitHub
3. Import your repository
4. Vercel auto-detects Vite
5. Deploy!

### Netlify
1. Go to https://netlify.com
2. Sign up with GitHub
3. Drag and drop your `dist/` folder
4. Or connect your repository for auto-deploy

### GitHub Pages
1. Push your code to GitHub
2. Go to repository settings
3. Enable GitHub Pages
4. Select branch and folder
5. Your site will be at: `https://username.github.io/repo-name`

---

## 🎮 Controls

- **WASD** - Move
- **Mouse** - Look around
- **Left Click** - Shoot / Use tool
- **Right Click** - Aim down sights / Build
- **1-4** - Switch weapons/tools
- **Space** - Jump
- **Shift** - Sprint
- **R** - Reload

## 📋 Tech Stack

- **Frontend:** React, TypeScript, Three.js, Vite
- **Backend:** Node.js, WebSocket
- **Deployment:** Railway, Render, Vercel, or any VPS

## 🤝 Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## 📄 License

MIT License - feel free to use this project for learning or development.

## 🐛 Known Issues

- Large bundle size (>500KB) - consider code splitting for production
- Server requires manual restart on code changes (use PM2 for auto-restart)

## 📞 Support

- Open an issue on GitHub for bugs or questions
- Check the code comments for implementation details

---

**Ready to play?** Deploy to Railway or Render and share with friends! 🎮
