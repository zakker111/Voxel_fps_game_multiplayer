# Voxel FPS - Multiplayer Setup Guide

**Version:** 1.0.4  
**Last Updated:** 2026-09-08

A multiplayer voxel-based first-person shooter with capture-the-flag gameplay.

## 🎮 Game Modes

1. **With Bots** - Play against AI bots (6 blue allies + 7 red enemies)
2. **Online Multiplayer** - Play against real players over the network
3. **Singleplayer** - Practice mode without enemies

## 📋 Prerequisites

- Node.js 18+ and npm
- Modern web browser with WebGL support
- For multiplayer: ability to run a server (local or remote)

## 🚀 Quick Start

### Installation

```bash
# Install dependencies
npm install

# Build the project
npm run build
```

### Running the Game

You have two options:

#### Option 1: Client Only (Singleplayer/Bots)

```bash
# Start development server
npm run dev

# Open http://localhost:5173 in your browser
```

This runs the game in client-only mode. You can play:
- **Singleplayer** - No enemies
- **With Bots** - Play against AI bots

#### Option 2: Full Multiplayer (Server + Client)

**Terminal 1 - Start the Game Server:**
```bash
npm run server
```

The server will start on port 3000 by default.

**Terminal 2 - Start the Client:**
```bash
npm run dev
```

Open http://localhost:5173 and select **"Online Multiplayer"** to connect to the server.

## 🌐 Multiplayer Setup

### Local Multiplayer (Same Computer)

1. Open two terminal windows
2. In Terminal 1: `npm run server`
3. In Terminal 2: `npm run dev`
4. Open http://localhost:5173 in two browser windows
5. In both windows, click **"Online Multiplayer"**
6. Players will be assigned to teams automatically

### Network Multiplayer (Different Computers)

#### On the Server Computer:

1. Install dependencies: `npm install`
2. Build the project: `npm run build`
3. Start the server: `npm run server`
4. Note your computer's IP address (e.g., 192.168.1.100)

#### On Client Computers:

1. Install dependencies: `npm install`
2. Build the project: `npm run build`
3. Start the client: `npm run dev`
4. Open http://localhost:5173
5. Click **"Online Multiplayer"**

**Note:** By default, the client connects to `ws://localhost:3000`. To connect to a remote server, you need to modify the connection URL in `src/game/game.ts`:

```typescript
// Find this line in initializeNetwork():
this.networkClient = new NetworkClient('ws://localhost:3000');

// Change to your server's IP:
this.networkClient = new NetworkClient('ws://192.168.1.100:3000');
```

Then rebuild: `npm run build`

### Port Forwarding (Internet Play)

To play over the internet, you'll need to forward port 3000 on your router:

1. Access your router's admin panel (usually 192.168.1.1)
2. Find "Port Forwarding" or "Virtual Server" settings
3. Forward port 3000 (TCP) to your computer's local IP
4. Players connect using your public IP address

**Find your public IP:** Visit https://whatismyipaddress.com

## 🎯 Controls

### Movement
- **WASD** - Move
- **Mouse** - Look around
- **Space** - Jump
- **Shift** - Sprint
- **Ctrl/C** - Crouch

### Equipment
- **1** - 🎯 Rifle (10-round magazine, accurate, iron sights)
- **2** - 💨 SMG (30-round magazine, fast fire rate, iron sights)
- **3** - 🪣 Spade (dig 2 blocks instantly)
- **4** - ⛏️ Pickaxe (harvest blocks, 3 hits)

### Actions
- **Left Click** - Shoot / Use tool
- **Right Click** - Toggle iron sights (weapons) / Build (tools)
- **R** - Reload weapon (rifle/smg only)
- **Mouse Wheel** - Switch equipment
- **ESC** - Release mouse cursor

### Accuracy Tips
- **Standing still** - Base accuracy
- **Walking** - Slightly less accurate
- **Running/Sprinting** - Much less accurate
- **Crouching** - More accurate
- **Aiming (Right Click)** - Most accurate (70% spread reduction)

## 🔫 Weapon System

### Rifle
- **Magazine Size:** 10 rounds
- **Reload Time:** 2.0 seconds
- **Fire Rate:** 0.4 seconds
- **Damage:** 100 (headshot) / 34 (body)
- **Accuracy:** Very high (0.0005 spread)
- **Features:** Iron sights, reload animation, unlimited ammo

### SMG
- **Magazine Size:** 30 rounds
- **Reload Time:** 1.5 seconds
- **Fire Rate:** 0.1 seconds
- **Damage:** 100 (headshot) / 34 (body)
- **Accuracy:** Moderate (0.04 spread)
- **Features:** Iron sights, reload animation, unlimited ammo

### Reloading
- Press **R** to reload weapons
- Weapons auto-reload when magazine is empty
- Reload animation plays during reload
- Cannot reload while shooting
- Tools (spade/pickaxe) cannot be reloaded

## 🏗️ Building System

### How to Build

1. **Harvest blocks** with pickaxe (key 4)
   - Left-click on blocks to damage them
   - 3 hits to destroy a block
   - Destroyed blocks are added to your inventory

2. **Place blocks** with any tool
   - Right-click to place a block
   - Blocks must be placed adjacent to existing blocks
   - Maximum 20 blocks above ground level
   - Structures need support (12-block rule)

### Building Rules

- **Support Rule**: Blocks in the air need support within 12 blocks
- **L-Shape Support**: Structures can extend horizontally if supported
- **Collapse**: Removing support causes structures to collapse
- **All terrain is destructible**: Shooting damages voxels (3 shots to destroy)

## 🤖 Bot AI

Bots have advanced AI with multiple behaviors:

- **Patrol** - Move around the map
- **Engage** - Attack enemies
- **Strafe** - Circle enemies while shooting
- **Cover** - Take cover behind obstacles
- **Flank** - Attack from the side
- **Retreat** - Fall back when low health
- **Jump Dodge** - Jump to avoid incoming fire

Bots are aware of their surroundings:
- Detect edges and avoid falling
- Find cover when under fire
- Navigate around obstacles
- Coordinate with teammates

## 🔧 Configuration

### Server Configuration

Edit `src/server/server.ts`:

```typescript
const PORT = process.env.PORT || 3000; // Change port
const TICK_RATE = 20; // Server tick rate (Hz)
```

### Client Configuration

Edit `src/game/game.ts`:

```typescript
// Network settings
inputSendRate: number = 50; // ms between input sends (lower = more bandwidth)

// Server connection
this.networkClient = new NetworkClient('ws://localhost:3000'); // Change server URL
```

### Game Constants

Edit `src/shared/types.ts`:

```typescript
export const WORLD_SIZE = 250; // World size in voxels
export const PLAYER_SPEED = 5; // Player movement speed
export const JUMP_FORCE = 8; // Jump height
export const GRAVITY = 20; // Gravity strength
```

## 📊 Performance

### Optimizations

- **Chunk-based rendering**: Only rebuild changed chunks
- **Instanced rendering**: Efficient voxel rendering
- **Deferred rebuilds**: Batch voxel changes
- **Network throttling**: Send input at 20Hz (50ms intervals)
- **Interpolation**: Smooth remote player movement

### System Requirements

**Minimum:**
- CPU: Dual-core 2GHz
- RAM: 4GB
- GPU: WebGL 2.0 support
- Network: 1 Mbps

**Recommended:**
- CPU: Quad-core 3GHz
- RAM: 8GB
- GPU: Dedicated graphics card
- Network: 10 Mbps

## 🐛 Troubleshooting

### "Failed to connect to server"

**Problem:** Client can't connect to server

**Solutions:**
1. Make sure server is running: `npm run server`
2. Check server console for errors
3. Verify the connection URL in `src/game/game.ts`
4. Check firewall settings
5. For network play, ensure port 3000 is forwarded

### Laggy multiplayer

**Problem:** Multiplayer feels laggy

**Solutions:**
1. Reduce `inputSendRate` in `src/game/game.ts` (default: 50ms)
2. Reduce `TICK_RATE` in `src/server/server.ts` (default: 20Hz)
3. Check network connection quality
4. Close other bandwidth-heavy applications

### Low FPS

**Problem:** Game runs slowly

**Solutions:**
1. Reduce world size in `src/shared/types.ts`
2. Lower render distance
3. Update graphics drivers
4. Close other applications
5. Reduce shadow quality

### Bots not moving

**Problem:** Bots are stuck or not moving

**Solutions:**
1. Check browser console for errors
2. Verify bot AI is enabled (multiplayer mode only)
3. Restart the game
4. Check for collision issues

## 📁 Project Structure

```
voxel-fps/
├── src/
│   ├── game/              # Client-side game code
│   │   ├── game.ts        # Main game logic
│   │   ├── player.ts      # Player controller
│   │   ├── world.ts       # Voxel world & chunks
│   │   ├── networkClient.ts # Network client
│   │   └── sounds.ts      # Sound effects
│   ├── server/            # Server-side code
│   │   ├── server.ts      # WebSocket server
│   │   ├── serverGame.ts  # Server game logic
│   │   ├── serverPlayer.ts # Server player management
│   │   └── serverWorld.ts # Server world management
│   ├── shared/            # Shared code
│   │   └── types.ts       # Shared types & constants
│   ├── App.tsx            # React UI
│   └── main.tsx           # Entry point
├── package.json
├── tsconfig.json
└── README.md
```

## 🎓 Development

### Adding New Features

1. **New weapon**: Edit `src/game/game.ts` weapon definitions
2. **New bot behavior**: Edit `src/game/game.ts` bot AI logic
3. **New game mode**: Add to `GameMode` type and update UI
4. **New network message**: Add to `src/shared/types.ts`

### Testing Multiplayer Locally

```bash
# Terminal 1
npm run server

# Terminal 2
npm run dev

# Open two browser windows at http://localhost:5173
# Click "Online Multiplayer" in both
```

### Debugging

Enable debug logging:

```typescript
// In src/game/game.ts
console.log('Debug:', variable);

// In browser console
// Check Network tab for WebSocket messages
```

## 📝 License

MIT License - Feel free to use and modify!

## 🤝 Contributing

Contributions are welcome! Please:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📞 Support

For issues and questions:
- Check the troubleshooting section
- Review the code comments
- Check browser console for errors

## 🎉 Credits

Built with:
- Three.js - 3D rendering
- React - UI framework
- TypeScript - Type safety
- WebSocket - Real-time networking

---

**Enjoy the game! 🎮**
