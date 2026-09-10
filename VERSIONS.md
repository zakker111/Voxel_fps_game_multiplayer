# Voxel FPS - Version History

This document tracks all versions, features, and changes made to the Voxel FPS game.

---

## Version 1.0.0 - Initial Release (2024)

### 🎮 Core Features
- **First-Person Shooter Mechanics**
  - WASD movement with sprint (Shift) and crouch (Ctrl/C)
  - Mouse look with proper sensitivity
  - Jump mechanics with gravity
  - Collision detection with voxel world

- **Voxel World System**
  - 150x150 voxel terrain generation
  - Chunk-based rendering (16x16 chunks)
  - Multiple voxel types: Dirt, Stone, Grass, Built
  - Voxel durability system (3 HP per voxel)
  - Visual damage feedback (voxels darken as they take damage)

- **Weapons**
  - **Rifle**: WW2 bolt-action style with iron sights
    - Fire rate: 0.4s
    - Damage: 100 (headshot) / 34 (body)
    - Spread: 0.01
  - **SMG**: WW2 submachine gun with iron sights
    - Fire rate: 0.1s
    - Damage: 100 (headshot) / 34 (body)
    - Spread: 0.04
  - Toggle ADS (Aim Down Sights) with right-click
  - Iron sights only (no scopes)
  - Visual weapon models in first-person view

- **Tools**
  - **Pickaxe**: Harvests voxels (3 hits to destroy, adds to inventory)
  - **Spade**: Instant terrain removal (2 voxels per use, no harvest)
  - Building system with harvested materials

- **Team System**
  - Red vs Blue teams
  - 6 blue allies + 7 red enemies (bots)
  - Team-colored bots with distinct visuals
  - Team spawn zones (Blue: negative Z, Red: positive Z)
  - Team flags at base locations

### 🤖 Bot AI System
- **Behavior States**
  - Patrol: Roam team zone when no enemies
  - Engage: Move toward enemies at medium range
  - Strafe: Circle enemies while shooting
  - Crouch: Take cover, slightly better accuracy
  - Peek: Alternate crouch/stand to peek at enemies
  - Capture: Push toward enemy flag (CTF behavior)

- **Visual Features**
  - Walking animations (leg/arm swing, body bob)
  - Head tracking for enemies
  - Smooth rotation toward targets
  - Direction-aware facing
  - Visible weapon models

- **Combat**
  - Reduced accuracy (15% base) to prevent cheating feel
  - 20% headshot chance when hitting
  - Shooting delays (1.0-3.5 seconds)
  - Intentional misses for fairness

### 🏗️ Building & Destruction
- **Building Rules**
  - Maximum 12 blocks in air without support
  - L-shape support structures allowed
  - Must have path to ground within 12 blocks
  - Automatic collapse when support removed

- **Destruction Mechanics**
  - All terrain types destroyable by gunfire
  - 3 shots to destroy any voxel
  - Visual durability feedback (darkening)
  - Structural collapse physics
  - Localized collapse detection (only checks neighbors)

- **Tool Behavior**
  - Pickaxe: Collects voxels (+1 inventory)
  - Spade: Does NOT collect voxels
  - Shooting: Does NOT collect voxels

### 🚀 Performance Optimizations
- **Chunk-Based Rendering**
  - World divided into 16x16 chunks
  - Each chunk stores only its own voxels
  - ~880x faster chunk rebuilds (O(256) vs O(225,000))
  - Only dirty chunks are rebuilt

- **Deferred Rebuilds**
  - Batch voxel changes per frame
  - Maximum 2 chunks rebuilt per frame
  - Prevents frame drops during rapid destruction

- **Fast Color Updates**
  - Direct instance color modification
  - No full rebuild needed for damage visualization
  - Per-instance colors using Three.js

- **Optimized Collision Detection**
  - 9 collision points per height level
  - 4 height levels (feet, lower third, upper third, head)
  - Automatic push-out mechanism if stuck
  - Correct voxel coordinate mapping

### 🎯 Game Modes
- **Multiplayer Mode**: Full game with 6 blue allies + 7 red enemies
- **Singleplayer Mode**: No bots, test building & combat freely

### 🔊 Audio System
- Weapon sounds (rifle, SMG)
- Hit marker sounds
- Kill confirmation sounds
- Tool sounds (pickaxe, spade)
- Building placement sounds
- Voxel destruction sounds
- Structural collapse sounds
- Death and respawn sounds

### 📊 HUD & UI
- Team scoreboard (Blue vs Red)
- Health bar with color coding
- Equipment selector with active indicator
- Inventory counter
- Enhanced crosshair with ADS indicator
- Hit markers
- Kill messages
- Death screen with respawn timer
- Target info display
- Build mode indicator

### 🛡️ Anti-Cheat & Fairness
- Server-authoritative architecture (ready for multiplayer)
- Reduced bot accuracy to prevent cheating feel
- Intentional bot misses
- Proper hit validation
- Rate limiting on weapons

### 📁 Project Structure
```
src/
├── game/
│   ├── game.ts          # Main game logic
│   ├── player.ts        # Player controller
│   ├── world.ts         # Voxel world with chunks
│   └── sounds.ts        # Sound effects
├── server/
│   ├── server.ts        # WebSocket server
│   ├── serverGame.ts    # Server game logic
│   ├── serverPlayer.ts  # Server player physics
│   └── serverWorld.ts   # Server voxel world
├── shared/
│   └── types.ts         # Shared types
└── App.tsx              # React UI
```

### 📚 Documentation
- MULTIPLAYER_ARCHITECTURE.md - Complete multiplayer system design
- PERFORMANCE_AND_BUILDING_RULES.md - Optimization details
- PROJECT_SUMMARY.md - Project overview
- VERSIONS.md - This file

### 🐛 Bug Fixes
- Fixed voxel coordinate calculation in collision detection
- Fixed chunk rebuild performance (880x faster)
- Fixed localized collapse detection
- Fixed player clipping through voxels
- Fixed black voxel rendering issue
- Fixed bot movement and AI behavior
- Fixed building system validation
- Fixed inventory collection (only pickaxe collects)

### 🎨 Visual Improvements
- WW2-style weapon models (rifle, SMG)
- Iron sights (no scopes)
- Bot walking animations
- Voxel damage visualization
- Team-colored bots
- Enhanced crosshair
- Team zone markers
- Team flags

### 🔧 Technical Details
- **Rendering**: Three.js with InstancedMesh
- **Physics**: Custom voxel-based collision
- **Networking**: WebSocket (server ready)
- **State Management**: React with TypeScript
- **Performance**: 60 FPS with rapid voxel destruction
- **Map Size**: 150x150 voxels
- **Chunk Size**: 16x16 voxels
- **Max Build Height**: 20 blocks above ground
- **Max Dig Depth**: 20 blocks below ground

---

## Version 1.1.0 - Multiplayer Implementation (Planned)

### 🌐 Planned Features
- **Network Client**
  - WebSocket connection to server
  - Client-side prediction
  - State reconciliation
  - Latency compensation

- **Player Interpolation**
  - Smooth movement of remote players
  - Position interpolation
  - Rotation interpolation

- **Multiplayer Combat**
  - Server-authoritative hit detection
  - Damage validation
  - Kill tracking
  - Respawn synchronization

- **Voxel Synchronization**
  - Real-time voxel changes
  - Chunk-based updates
  - Conflict resolution

- **Team Management**
  - Team selection UI
  - Team balancing
  - Score tracking

### 🎯 Planned Improvements
- **Performance**
  - Network optimization
  - Bandwidth reduction
  - Message batching
  - Compression

- **Gameplay**
  - Lobby system
  - Matchmaking
  - Round system
  - Score limits

- **UI/UX**
  - Player list
  - Chat system
  - Kill feed
  - Scoreboard

---

## Version 1.2.0 - Advanced Features (Planned)

### 🎮 Planned Features
- **More Weapons**
  - Shotgun
  - Sniper rifle
  - Explosives

- **Vehicle System**
  - drivable vehicles
  - Vehicle combat
  - Vehicle physics

- **Advanced Building**
  - More block types
  - Building templates
  - Building undo/redo

- **Map Editor**
  - Custom map creation
  - Map sharing
  - Map voting

### 🤖 Bot Improvements
- **Advanced AI**
  - Pathfinding
  - Tactical positioning
  - Team coordination
  - Difficulty levels

- **Bot Customization**
  - Custom bot names
  - Bot loadouts
  - Bot behavior settings

---

## Version 2.0.0 - Major Update (Planned)

### 🌍 World Expansion
- **Larger Maps**
  - 300x300 voxel worlds
  - Multiple biomes
  - Procedural generation

- **Environmental Features**
  - Weather system
  - Day/night cycle
  - Dynamic lighting

### 🎯 Game Modes
- **Capture the Flag**
  - Flag mechanics
  - Flag carriers
  - Flag return system

- **Team Deathmatch**
  - Kill limits
  - Time limits
  - Respawn protection

- **King of the Hill**
  - Control points
  - Scoring system
  - Point capture

### 🏆 Progression System
- **Player Stats**
  - Kill/death ratio
  - Accuracy tracking
  - Building stats
  - Play time

- **Unlockables**
  - Weapon skins
  - Player cosmetics
  - Emotes
  - Titles

---

## Version 3.0.0 - Community Features (Planned)

### 👥 Social Features
- **Friends System**
  - Friend list
  - Party system
  - Invites

- **Clan System**
  - Clan creation
  - Clan wars
  - Clan rankings

### 🎨 User-Generated Content
- **Custom Maps**
  - Map editor
  - Map sharing
  - Map ratings

- **Custom Game Modes**
  - Scriptable game modes
  - Custom rules
  - Mod support

---

## Version History Legend

### Version Numbering
- **MAJOR** (X.0.0): Breaking changes, major new features
- **MINOR** (0.X.0): New features, backward compatible
- **PATCH** (0.0.X): Bug fixes, minor improvements

### Status Indicators
- ✅ **Completed**: Feature fully implemented and tested
- 🔄 **In Progress**: Feature being developed
- 📋 **Planned**: Feature scheduled for future version
- 💡 **Idea**: Feature under consideration

### Categories
- 🎮 **Gameplay**: Core game mechanics
- 🤖 **AI**: Bot and NPC systems
- 🏗️ **Building**: Construction and destruction
- 🚀 **Performance**: Optimization and speed
- 🎯 **Combat**: Weapons and fighting
- 🔊 **Audio**: Sound effects and music
- 📊 **UI**: Interface and HUD
- 🛡️ **Security**: Anti-cheat and validation
- 🎨 **Visual**: Graphics and effects
- 🌐 **Networking**: Multiplayer features
- 📚 **Documentation**: Guides and references
- 🐛 **Bug Fixes**: Issue resolutions

---

## Development Notes

### Current Focus
- Stabilize singleplayer experience
- Fix remaining bugs
- Optimize performance
- Prepare for multiplayer implementation

### Known Issues
- None currently reported

### Next Steps
1. Implement network client
2. Add client prediction
3. Create player interpolation
4. Remove bot AI for multiplayer
5. Add team selection UI
6. Test with multiple clients

### Performance Targets
- **FPS**: 60 FPS stable
- **Map Size**: 150x150 voxels
- **Players**: 32+ concurrent (multiplayer)
- **Network**: <100ms latency acceptable
- **Bandwidth**: <50 KB/s per player

---

## Contributing

When adding new features or fixing bugs:
1. Update this file with version number
2. Document all changes
3. Test thoroughly
4. Update relevant documentation
5. Commit with clear message

---

## License

MIT License - See LICENSE file for details

---

## Contact

For issues, questions, or contributions:
- Check documentation files
- Review code comments
- Test locally before deploying

---

**Last Updated**: 2024
**Current Version**: 1.0.0
**Next Version**: 1.1.0 (Multiplayer)
