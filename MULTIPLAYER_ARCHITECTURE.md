# Multiplayer Architecture Documentation

## Overview

This document outlines the multiplayer architecture for the Voxel FPS game. The game has been designed with multiplayer in mind from the start, with server-authoritative architecture ensuring fair gameplay and preventing cheating.

## Architecture Overview

### Server-Client Model

```
┌─────────────────┐                    ┌─────────────────┐
│   Client 1      │◄──────────────────►│                 │
│   (Browser)     │    WebSocket       │                 │
└─────────────────┘                    │                 │
                                       │   Game Server   │
┌─────────────────┐                    │   (Node.js)     │
│   Client 2      │◄──────────────────►│                 │
│   (Browser)     │    WebSocket       │                 │
└─────────────────┘                    │                 │
                                       │                 │
┌─────────────────┐                    │                 │
│   Client 3      │◄──────────────────►│                 │
│   (Browser)     │    WebSocket       │                 │
└─────────────────┘                    └─────────────────┘
```

### Key Principles

1. **Server Authority**: All game logic runs on the server
2. **Client Prediction**: Clients predict their own movement for responsiveness
3. **State Synchronization**: Server broadcasts state changes to all clients
4. **Chunk-Based World**: World divided into 16x16 chunks for efficient updates
5. **Event-Driven**: Only send changes, not full state every frame

## Server Implementation

### Files

- `src/server/server.ts` - Express + WebSocket server entry point
- `src/server/serverGame.ts` - Main game logic and state management
- `src/server/serverPlayer.ts` - Player state and physics
- `src/server/serverWorld.ts` - Voxel world with chunk system
- `src/shared/types.ts` - Shared types between client and server

### Server Game Loop

```typescript
// 20 ticks per second
const TICK_RATE = 20;
const TICK_INTERVAL = 1000 / TICK_RATE;

setInterval(() => {
  game.update(TICK_INTERVAL / 1000);  // Update physics
  game.broadcastState();               // Send state to clients
}, TICK_INTERVAL);
```

### Player Management

Each player has:
- Unique ID
- Position, rotation, velocity
- Health, team, equipment
- Input state (movement, actions)

**Server-side physics:**
```typescript
player.update(dt, world) {
  // Apply input
  // Calculate movement
  // Check collisions
  // Apply gravity
  // Update position
}
```

### Voxel World

**Chunk System:**
- World divided into 16x16 chunks
- Each chunk tracks dirty state
- Only dirty chunks are sent to clients
- Neighboring chunks marked dirty when edges change

**Voxel Operations:**
```typescript
// Shooting
world.damageVoxel(x, y, z, damage)
  -> Returns true if destroyed
  -> Marks chunk dirty
  -> Broadcasts change to all clients

// Building
world.setVoxel(x, y, z, type, durability)
  -> Checks canBuild()
  -> Updates chunk
  -> Broadcasts change

// Collapse
world.collapseDisconnected()
  -> BFS from ground (y=0)
  -> Removes unconnected voxels
  -> Returns list of changes
```

## Network Protocol

### Client → Server Messages

```typescript
type ClientMessage =
  | { type: 'join'; team: 'red' | 'blue' }
  | { type: 'playerInput'; input: PlayerInput }
  | { type: 'shoot'; origin: Position; direction: Position }
  | { type: 'useTool'; tool: 'pickaxe' | 'spade'; target: Position }
  | { type: 'build'; position: Position }
  | { type: 'disconnect' }
```

### Server → Client Messages

```typescript
type ServerMessage =
  | { type: 'playerJoined'; playerId: string; state: PlayerState }
  | { type: 'playerLeft'; playerId: string }
  | { type: 'playerUpdated'; playerId: string; state: PlayerState }
  | { type: 'voxelChanged'; change: VoxelChange }
  | { type: 'playerDamaged'; playerId: string; damage: number }
  | { type: 'playerDied'; playerId: string; killerId?: string }
  | { type: 'playerRespawned'; playerId: string; position: Position }
  | { type: 'hitConfirmed'; targetId: string; damage: number; isHeadshot: boolean }
  | { type: 'inventoryUpdated'; inventory: number }
```

## Client-Side Adaptation

### What Needs to Change

The current client code (`src/game/`) needs to be adapted:

1. **Remove Bot AI** - Replace with networked players
2. **Add Networking Layer** - WebSocket client
3. **Client Prediction** - Predict movement, reconcile with server
4. **Interpolation** - Smooth other players' movement
5. **Handle Server Messages** - Update state based on server events

### Client Architecture

```
┌─────────────────────────────────────┐
│         Client Application          │
├─────────────────────────────────────┤
│  Input Handler                      │
│    ↓                                │
│  Client Prediction                  │
│    ↓                                │
│  Network Layer (WebSocket)          │
│    ↓                                │
│  State Reconciliation               │
│    ↓                                │
│  Interpolation                      │
│    ↓                                │
│  Rendering                          │
└─────────────────────────────────────┘
```

### Implementation Steps

#### Step 1: Create Network Client

```typescript
// src/game/network.ts
export class NetworkClient {
  private ws: WebSocket;
  private messageHandlers: Map<string, Function> = new Map();

  connect(url: string) {
    this.ws = new WebSocket(url);
    this.ws.onmessage = (event) => {
      const message = JSON.parse(event.data);
      const handler = this.messageHandlers.get(message.type);
      if (handler) handler(message);
    };
  }

  send(message: ClientMessage) {
    this.ws.send(JSON.stringify(message));
  }

  onMessage(type: string, handler: Function) {
    this.messageHandlers.set(type, handler);
  }
}
```

#### Step 2: Client Prediction

```typescript
// In game.ts
class Game {
  private predictedPosition: Position;
  private serverPosition: Position;
  
  update(dt: number) {
    // Apply local input immediately (prediction)
    this.applyInput(this.localInput);
    this.predictedPosition = this.player.position;
    
    // Send input to server
    this.network.send({
      type: 'playerInput',
      input: this.localInput
    });
    
    // Reconcile with server state
    if (this.serverPosition) {
      const diff = distance(this.predictedPosition, this.serverPosition);
      if (diff > 0.1) {
        // Server correction needed
        this.player.position = this.serverPosition;
      }
    }
  }
  
  onServerMessage(message: ServerMessage) {
    if (message.type === 'playerUpdated') {
      if (message.playerId === this.localPlayerId) {
        this.serverPosition = message.state.position;
      }
    }
  }
}
```

#### Step 3: Interpolate Other Players

```typescript
// Smooth movement of other players
class RemotePlayer {
  private previousPosition: Position;
  private targetPosition: Position;
  private interpolationTime: number = 0;
  private interpolationDuration: number = 0.1; // 100ms

  update(dt: number) {
    this.interpolationTime += dt;
    const t = Math.min(this.interpolationTime / this.interpolationDuration, 1);
    
    // Lerp between previous and target
    this.position = lerp(this.previousPosition, this.targetPosition, t);
  }

  onServerUpdate(state: PlayerState) {
    this.previousPosition = this.position;
    this.targetPosition = state.position;
    this.interpolationTime = 0;
  }
}
```

#### Step 4: Handle Voxel Changes

```typescript
// In game.ts
onServerMessage(message: ServerMessage) {
  if (message.type === 'voxelChanged') {
    const { x, y, z, type, durability } = message.change;
    this.world.setVoxel(x, y, z, type, durability);
    // Chunk automatically marked dirty
  }
}
```

#### Step 5: Shooting and Combat

```typescript
// Client sends shoot request
shoot() {
  const origin = this.player.getEyePosition();
  const direction = this.player.getAimDirection();
  
  this.network.send({
    type: 'shoot',
    origin,
    direction
  });
}

// Server validates and broadcasts hits
onServerMessage(message: ServerMessage) {
  if (message.type === 'hitConfirmed') {
    // Show hit marker
    this.showHitMarker(message.isHeadshot);
    this.sounds.hitMarker();
  }
}
```

## Performance Optimizations

### Network Optimization

1. **Delta Compression**: Only send changed data
2. **Interest Management**: Only send relevant chunks
3. **Message Batching**: Combine multiple updates
4. **Compression**: Use binary protocols (MessagePack/Protobuf)

### Chunk Synchronization

```typescript
// Only send dirty chunks
broadcastDirtyChunks() {
  const dirtyChunks = this.world.getDirtyChunks();
  for (const chunk of dirtyChunks) {
    this.broadcast({
      type: 'chunkUpdated',
      chunk
    });
  }
}
```

### Bandwidth Reduction

- **Position quantization**: Send positions as integers (multiply by 100)
- **Rotation compression**: Send as 2 bytes instead of floats
- **State snapshots**: Send full state every 5 seconds, deltas in between

## Security Considerations

### Anti-Cheat Measures

1. **Server Authority**: All game logic on server
2. **Input Validation**: Validate all client inputs
3. **Rate Limiting**: Prevent spam (shoot cooldowns)
4. **Movement Validation**: Check for teleportation/speed hacks
5. **Hit Validation**: Server calculates hits, not client

### Example: Shoot Validation

```typescript
handleShoot(playerId: string, origin: Position, direction: Position) {
  const player = this.players.get(playerId);
  
  // Validate cooldown
  const now = Date.now() / 1000;
  const weapon = WEAPONS[player.equipment];
  if (now - this.lastShootTime.get(playerId) < weapon.fireRate) {
    return; // Rate limit
  }
  
  // Validate origin is near player
  const distance = distance3D(origin, player.position);
  if (distance > 2) {
    return; // Suspicious
  }
  
  // Server calculates hit
  const hit = this.world.raycast(origin, direction, 100);
  // ... rest of logic
}
```

## Deployment

### Server Setup

```bash
# Install dependencies
npm install

# Build
npm run build

# Run server
npm run server
```

### Environment Variables

```bash
PORT=3000              # Server port
TICK_RATE=20           # Server tick rate
MAX_PLAYERS=32         # Max concurrent players
```

### Scaling

For multiple servers:
- Use Redis for shared state
- Load balancer for WebSocket connections
- Region-based servers for low latency

## Testing Multiplayer

### Local Testing

```bash
# Terminal 1: Start server
npm run server

# Terminal 2: Start client
npm run dev

# Open multiple browser tabs
http://localhost:5173
```

### Stress Testing

- Test with 32+ concurrent players
- Rapid voxel destruction
- Large-scale building
- Network latency simulation

## Current Status

### ✅ Implemented (Server)

- [x] WebSocket server
- [x] Player management
- [x] Server-authoritative physics
- [x] Chunk-based voxel world
- [x] Voxel destruction/building
- [x] Combat system
- [x] Team system
- [x] Structural collapse

### 🔄 In Progress

- [ ] Client networking layer
- [ ] Client prediction
- [ ] State reconciliation
- [ ] Player interpolation
- [ ] Remove bot AI
- [ ] UI for team selection

### 📋 TODO

- [ ] Lobby system
- [ ] Matchmaking
- [ ] Chat system
- [ ] Score tracking
- [ ] Round system
- [ ] Anti-cheat validation
- [ ] Performance profiling
- [ ] Network optimization

## Next Steps

1. **Create Network Client** - `src/game/network.ts`
2. **Add Client Prediction** - Modify `src/game/game.ts`
3. **Implement Interpolation** - Create `src/game/remotePlayer.ts`
4. **Remove Bot AI** - Delete bot code from `game.ts`
5. **Add Team Selection UI** - Modify `src/App.tsx`
6. **Test with Multiple Clients** - Open multiple browser tabs
7. **Optimize Network** - Add compression, batching
8. **Deploy Server** - Set up production server

## Conclusion

The server-side architecture is complete and ready for multiplayer. The chunk-based voxel system ensures efficient synchronization, and the server-authoritative design prevents cheating. The next phase is adapting the client to work with the server, implementing prediction/interpolation, and removing the bot AI.

All optimizations made (chunk system, deferred rebuilds, shared geometry) will work seamlessly in multiplayer because they're implemented on the server side. The client will receive chunk updates and only rebuild what's necessary.
