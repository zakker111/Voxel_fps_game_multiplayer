# 🚀 Quick Start Guide

## Installation

```bash
npm install
npm run build
```

## Playing the Game

### Option 1: Singleplayer / With Bots (No Server Needed)

```bash
npm run dev
```

Open http://localhost:5173 and choose:
- **🧪 Singleplayer** - Practice alone
- **🤖 With Bots** - Play against AI bots

### Option 2: Online Multiplayer (Server Required)

**Terminal 1 - Start Server:**
```bash
node start-server.js
```

**Terminal 2 - Start Client:**
```bash
npm run dev
```

Open http://localhost:5173 and click **🌐 Online Multiplayer**

## Network Multiplayer (Different Computers)

### On Server Computer:
```bash
npm install
npm run build
node start-server.js
```
Note your IP address (e.g., 192.168.1.100)

### On Client Computers:
1. Edit `src/game/game.ts` line ~1760:
   ```typescript
   this.networkClient = new NetworkClient('ws://YOUR_SERVER_IP:3000');
   ```
2. Build and run:
   ```bash
   npm install
   npm run build
   npm run dev
   ```
3. Open http://localhost:5173 and click **🌐 Online Multiplayer**

## Controls

- **WASD** - Move
- **Mouse** - Look
- **Left Click** - Shoot / Use tool
- **Right Click** - Aim / Build
- **1-4** - Switch weapons/tools
- **Space** - Jump
- **Shift** - Sprint

## Troubleshooting

**"Failed to connect to server"**
- Make sure server is running: `node start-server.js`
- Check firewall settings
- Verify IP address is correct

**Low FPS**
- Close other applications
- Update graphics drivers
- Reduce world size in `src/shared/types.ts`

## Need Help?

See [README.md](README.md) for detailed documentation.
