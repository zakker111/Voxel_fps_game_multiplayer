# 🎮 Voxel FPS - Capture The Flag

A high-performance, full-stack 3D voxel-based first-person shooter featuring Red vs Blue Capture the Flag gameplay, destructible environments, tactical AI bots, and real-time multiplayer. Built with React 18, Three.js, TypeScript, and Vite.

![Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![License](https://img.shields.io/badge/license-MIT-green.svg)
![TypeScript](https://img.shields.io/badge/typescript-5.7+-blue.svg)
![React](https://img.shields.io/badge/react-18-cyan.svg)
![Three.js](https://img.shields.io/badge/three.js-0.186-black.svg)

---

## ✨ Features

- **🚩 Capture The Flag (CTF)**: Full CTF objective loop with base flag spawns, pickup, drop, return timers, carrier HUD tracking, and victory scoring.
- **🤖 Tactical AI Bots**: Autonomous bots with decision-making state machines for flag capture, base defense, tactical escort, weapon fire, and path navigation.
- **🧱 Destructible Voxel World**: Procedural 3D voxel terrain generated in Three.js. Gunfire blasts away blocks (3 hits per voxel), spade digs trenches, and pickaxe harvests blocks.
- **🏗️ Block Placement / Fortification**: Harvest blocks to build barricades, bridges, and sniper towers in real-time.
- **🔫 WW2 Arsenal & Iron Sights**:
  - **M1 Garand Rifle**: High-precision semi-automatic with 3D iron sight aiming and authentic recoil.
  - **Thompson SMG**: Fast-firing close-quarters automatic with bullet spread and muzzle flash.
  - **Trench Spade**: Rapid excavation and close-quarters melee.
  - **Pickaxe**: Heavy block harvesting.
- **🎯 Responsive Hit Markers**: Red crosshair hit flashes and audio cues on confirmed enemy hits.
- **🎥 AI Spectator Mode & Accessibility**: One-click spectator camera (`P`) smoothly orbits dynamic battle action and flag carriers. Drag-to-look and arrow-key steering allow instant previewing in browser iframes and AI evaluation environments without mandatory pointer lock.
- **🔊 Spatial 3D Web Audio**: Procedural synthesized audio effects (gunshots, distant bullet whizzing, headshot kills, hit markers, and footsteps) using the Web Audio API without heavy external audio assets.
- **🌐 Real-Time Multiplayer**: Built-in Node.js WebSocket server for low-latency player state synchronization.

---

## 🕹️ Controls Reference

| Action | Control | Notes |
| :--- | :--- | :--- |
| **Move** | `W`, `A`, `S`, `D` | Smooth acceleration & ground collision |
| **Look / Aim** | `Mouse Move` | Click canvas to lock aim; or drag / use Arrow Keys |
| **Alternative Aim** | `↑`, `↓`, `←`, `→` | Keyboard camera steering (ideal for previewing/AI agents) |
| **Fire / Mine** | `Left Click` | Shoots active weapon or swings tool |
| **Iron Sights / Build** | `Right Click` | Toggles ADS iron sights or places voxel block |
| **Weapons / Tools** | `1`, `2`, `3`, `4` | 1: Rifle, 2: SMG, 3: Spade, 4: Pickaxe (or Mouse Wheel) |
| **Reload** | `R` | Reloads magazine with realistic animation |
| **Jump** | `Space` | Jump over obstacles and climb terrain |
| **Sprint** | `Shift` | High-speed dash |
| **Crouch** | `C` or `Ctrl` | Lowers profile and tightens weapon spread |
| **Spectator View** | `P` | Toggles cinematic AI battle tracking camera |

---

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ and npm installed

### 1. Clone & Install
```bash
git clone https://github.com/your-username/voxel-fps.git
cd voxel-fps
npm install
```

### 2. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) in your browser.

### 3. Build & Verify for Production
```bash
# Type check & lint
npm run lint

# Compile client and server bundles
npm run build

# Start production server
npm start
```

---

## 📁 Project Architecture

```
├── src/
│   ├── game/
│   │   ├── game.ts          # Core game loop, Three.js scene, hit detection, spectator mode
│   │   ├── player.ts        # Player physics, voxel collision, camera controls, weapon sway
│   │   ├── world.ts         # Procedural voxel world, raycasting, block placement & destruction
│   │   ├── sounds.ts        # Web Audio API procedural sound synthesizer (3D spatial audio)
│   │   ├── networkClient.ts # WebSocket client for multiplayer synchronization
│   │   └── serverGame.ts    # Server-side authoritative match state
│   ├── shared/
│   │   └── types.ts         # Shared network protocols, game states, and event schemas
│   ├── App.tsx              # React UI HUD, start menu, scoreboard, ammo counters, hitmarker
│   └── main.tsx             # React entry point
├── server.ts                # Express + Vite development & WebSocket production server
├── index.html               # Main HTML entry with responsive meta tags
├── package.json             # NPM configuration and build scripts
└── vite.config.ts           # Vite + Tailwind CSS configuration
```

---

## 🌐 Deployment Options

### Docker / Container (Cloud Run, Railway, Render)
The project includes a unified Express + Vite production entry point:
```bash
npm run build
npm start
```
Bind port `3000` (or `PORT` environment variable).

### Static Client Export (GitHub Pages / Vercel)
To deploy the singleplayer / bot mode as a static web app:
```bash
npm run build
```
The compiled frontend bundle will be located in the `dist/` directory ready for any static host.

---

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

