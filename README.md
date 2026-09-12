# 🎮 Voxel FPS

A multiplayer voxel-based first-person shooter with capture-the-flag gameplay, built with React, Three.js, and TypeScript.

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![TypeScript](https://img.shields.io/badge/typescript-100%25-blue)

## 🎯 Overview

Voxel FPS is a complete multiplayer first-person shooter featuring:

- **Capture the Flag** gameplay with full flag pickup/drop/capture mechanics
- **Server-authoritative multiplayer** for fair, cheat-free gameplay
- **Advanced AI bots** with 11 behavior states and intelligent decision making
- **Destructible voxel environment** - build and destroy terrain
- **Spatial audio** with distance-based volume and 3D positioning
- **Multiple weapons** - Rifle, SMG, Pickaxe, and Spade

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm
- Modern web browser with WebGL support

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/voxel-fps.git
cd voxel-fps

# Install dependencies
npm install

# Build the project
npm run build
```

### Running Locally

#### Option 1: Singleplayer/Bots Mode
```bash
npm run dev
# Open http://localhost:5173
```

#### Option 2: Full Multiplayer
```bash
# Terminal 1 - Start server
npm run server

# Terminal 2 - Start client
npm run dev
# Open http://localhost:5173 and select "Online Multiplayer"
```

## 🌐 Deployment

### Quick Deploy (10 minutes, Free)

**Server:** Deploy to [Railway](https://railway.app)
1. Push to GitHub
2. Deploy to Railway
3. Add environment variable: `PORT = 3000`
4. Get server URL: `wss://your-game.up.railway.app`

**Client:** Deploy to [Vercel](https://vercel.com)
1. Update server URL in `src/game/game.ts`
2. Deploy to Vercel
3. Get client URL: `https://voxel-fps.vercel.app`

**Share the client URL with friends!**

See [QUICK_START.md](QUICK_START.md) for detailed step-by-step instructions.

### Other Deployment Options

- **Render** - Free tier, easy setup
- **Fly.io** - Free tier, global edge deployment
- **VPS** - DigitalOcean, AWS, Linode ($4-6/month)

See [DEPLOYMENT.md](DEPLOYMENT.md) for complete deployment guide.

## 🎮 Game Features

### Gameplay Modes
- **Singleplayer** - Practice mode without enemies
- **With Bots** - Play against AI (6 blue allies + 7 red enemies)
- **Online Multiplayer** - Play against real players

### Controls
| Action | Control |
|--------|---------|
| Move | WASD |
| Look | Mouse |
| Shoot/Use | Left Click |
| Aim/Build | Right Click |
| Switch Weapon | 1-4 |
| Jump | Space |
| Sprint | Shift |
| Reload | R |

### Weapons
- **Rifle** - Accurate long-range weapon (10 rounds, 2.0s reload)
- **SMG** - Fast close-range weapon (30 rounds, 1.5s reload)
- **Pickaxe** - Harvest blocks for building (3 hits per block)
- **Spade** - Fast terrain removal (instant destruction)

### Capture the Flag
- Pick up enemy flag at their base
- Bring it to your base to score
- Flag drops if carrier dies (60-second return timer)
- Full synchronization across all clients

## 🏗️ Architecture

```
src/
├── game/              # Client-side game logic
│   ├── game.ts       # Main game class
│   ├── player.ts     # Player controller
│   ├── world.ts      # Voxel world system
│   ├── sounds.ts     # Audio system
│   └── networkClient.ts  # Network client
├── server/           # Server-side game logic
│   ├── server.ts     # WebSocket server
│   ├── serverGame.ts # Server game logic
│   ├── serverPlayer.ts # Server player management
│   └── serverWorld.ts # Server world management
└── shared/           # Shared types and constants
    └── types.ts      # Type definitions
```

### Key Features
- **Server-Authoritative** - Server validates all actions
- **Chunk-Based Rendering** - Efficient 16x16 voxel chunks
- **Real-Time Physics** - 20 ticks per second
- **WebSocket Communication** - Real-time client-server sync

## 📊 Tech Stack

- **Frontend:** React 18, TypeScript, Three.js, Vite
- **Backend:** Node.js, WebSocket
- **Build:** Vite (fast builds)
- **Deployment:** Railway, Render, Vercel, or VPS

## 🧪 Testing

### Local Testing
```bash
# Start server
npm run server

# Start client
npm run dev

# Open two browser windows
# Both select "Online Multiplayer"
```

### Multiplayer Testing
1. Deploy server to Railway
2. Deploy client to Vercel
3. Share client URL with testers
4. Testers click "Online Multiplayer"

## 📚 Documentation

- **[README.md](README.md)** - This file
- **[QUICK_START.md](QUICK_START.md)** - 10-minute deployment guide
- **[DEPLOYMENT.md](DEPLOYMENT.md)** - Complete deployment guide
- **[PROJECT_SUMMARY.md](PROJECT_SUMMARY.md)** - Complete project overview
- **[src/server/README.md](src/server/README.md)** - Server documentation

## 🐛 Known Issues

1. **Large Bundle Size** - Bundle is >500KB
   - **Solution:** Consider code splitting for production
   - **Impact:** Initial load time may be slower

2. **Server Restart** - Server requires manual restart on code changes
   - **Solution:** Use PM2 for auto-restart
   - **Command:** `pm2 start npm --name "voxel-fps" -- run server`

## 🤝 Contributing

Contributions are welcome! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

MIT License - feel free to use this project for learning or development.

## 🎯 Roadmap

### Phase 1: Core Features ✅
- [x] Basic FPS mechanics
- [x] Voxel world system
- [x] Multiplayer infrastructure
- [x] Capture the Flag gameplay
- [x] Bot AI system

### Phase 2: Enhanced Features
- [ ] More weapons and items
- [ ] Advanced building mechanics
- [ ] Improved bot AI
- [ ] Voice chat integration
- [ ] Replay system

### Phase 3: Polish
- [ ] Performance optimization
- [ ] Mobile support
- [ ] Custom maps
- [ ] Leaderboards
- [ ] Achievements

## 📞 Support

- **Documentation:** Check README.md and DEPLOYMENT.md
- **Issues:** Open a GitHub issue
- **Questions:** Check documentation first

## 🎉 Acknowledgments

Built with:
- [React](https://reactjs.org/) - UI framework
- [Three.js](https://threejs.org/) - 3D graphics
- [TypeScript](https://www.typescriptlang.org/) - Type safety
- [Vite](https://vitejs.dev/) - Build tool
- [Node.js](https://nodejs.org/) - Server runtime

---

**Ready to play?** Deploy to Railway and Vercel in 10 minutes! 🚀

See [QUICK_START.md](QUICK_START.md) for quick deployment guide.
