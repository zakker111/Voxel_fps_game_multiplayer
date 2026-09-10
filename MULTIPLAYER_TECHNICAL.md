# Multiplayer Architecture Documentation

## Overview

The Voxel FPS game uses a **client-server architecture** with WebSocket communication for real-time multiplayer gameplay. The server is authoritative for all game logic, preventing cheating and ensuring consistency across all clients.

## Architecture Diagram

```
┌─────────────────┐         ┌─────────────────┐         ┌─────────────────┐
│   Client 1      │◄───────►│                 │◄───────►│   Client 2      │
│   (Browser)     │  WS     │   Game Server   │  WS     │   (Browser)     │
└─────────────────┘         │   (Node.js)     │         └─────────────────┘
                            │                 │
                            │  - Authoritative│
                            │  - Physics      │         ┌─────────────────┐
                            │  - Combat       │◄───────►│   Client 3      │
                            │  - World State  │  WS     │   (Browser)     │
                            └─────────────────┘         └─────────────────┘
```

## Key Components

### 1. Server (`src/server/`)

#### `server.ts`
- Express HTTP server for serving static files
- WebSocket server for real-time communication
- Game loop running at 20 ticks per second
- Manages player connections

#### `serverGame.ts`
- Authoritative game logic
- Player management (join, leave, update)
- Combat resolution (hits, damage, kills)
- Voxel manipulation (destroy, build)
- State broadcasting to all clients

#### `serverPlayer.ts`
- Player state management
- Physics simulation (server-side)
- Collision detection
- Input processing

#### `serverWorld.ts`
- Voxel world management
- Chunk-based storage
- Raycasting for combat
- Structural integrity checks

### 2. Client (`src/game/`)

#### `game.ts`
- Main game logic
- Rendering with Three.js
- Local player control
- Remote player interpolation
- Network message handling

#### `networkClient.ts`
- WebSocket connection management
- Message sending/receiving
- Reconnection logic
- Helper methods for common messages

#### `player.ts`
- Local player physics (client-side prediction)
- Camera control
- Input handling

#### `world.ts`
- Voxel world rendering
- Chunk-based mesh generation
- Local voxel modifications

### 3. Shared (`src/shared/`)

#### `types.ts`
- Message type definitions
- Game constants
- Player state interface
- Position/rotation types

## Network Protocol

### Client → Server Messages

```typescript
// Join game
{ type: 'join', team: 'red' | 'blue' }

// Send player input (50ms intervals)
{ 
  type: 'playerInput', 
  input: {
    moveX: number,      // -1 to 1
    moveZ: number,      // -1 to 1
    jump: boolean,
    crouch: boolean,
    sprint: boolean,
    yaw: number,        // radians
    pitch: number       // radians
  }
}

// Shoot weapon
{ 
  type: 'shoot', 
  origin: Position,     // where bullet starts
  direction: Position   // direction vector
}

// Use tool
{ 
  type: 'useTool', 
  tool: 'pickaxe' | 'spade', 
  target: Position      // voxel position
}

// Build voxel
{ 
  type: 'build', 
  position: Position    // where to place block
}
```

### Server → Client Messages

```typescript
// Player joined
{ 
  type: 'playerJoined', 
  playerId: string, 
  state: PlayerState 
}

// Player left
{ 
  type: 'playerLeft', 
  playerId: string 
}

// Player state update
{ 
  type: 'playerUpdated', 
  playerId: string, 
  state: PlayerState 
}

// Voxel changed
{ 
  type: 'voxelChanged', 
  change: {
    x: number,
    y: number,
    z: number,
    type: number,
    durability: number
  }
}

// Hit confirmed (client shot hit someone)
{ 
  type: 'hitConfirmed', 
  targetId: string, 
  damage: number, 
  isHeadshot: boolean 
}

// Player damaged
{ 
  type: 'playerDamaged', 
  playerId: string, 
  damage: number, 
  attackerId?: string 
}

// Player died
{ 
  type: 'playerDied', 
  playerId: string, 
  killerId?: string 
}

// Player respawned
{ 
  type: 'playerRespawned', 
  playerId: string, 
  position: Position 
}

// Inventory updated
{ 
  type: 'inventoryUpdated', 
  inventory: number 
}
```

## Data Flow

### Player Movement

```
Client                              Server
  │                                    │
  │  1. Player presses WASD            │
  │                                    │
  │  2. Client predicts movement       │
  │     (instant response)             │
  │                                    │
  │  3. Send input to server ─────────►│
  │     (every 50ms)                   │
  │                                    │
  │                          4. Server validates input
  │                                     │
  │                          5. Server simulates physics
  │                                     │
  │                          6. Server checks collisions
  │                                     │
  │  7. Receive updated state ◄─────────│
  │     (every 50ms)                    │
  │                                     │
  │  8. Client reconciles              │
  │     (corrects prediction if needed) │
  │                                     │
  │  9. Render remote players          │
  │     (interpolated for smoothness)   │
```

### Combat Flow

```
Client A              Server              Client B
  │                      │                    │
  │  1. Click to shoot   │                    │
  │                      │                    │
  │  2. Send shoot ─────►│                    │
  │     (origin + dir)   │                    │
  │                      │                    │
  │             3. Server raycasts            │
  │                from origin                │
  │                      │                    │
  │             4. Check if hit               │
  │                Client B                   │
  │                      │                    │
  │                      │  5. Send hit ─────►│
  │                      │     confirmation   │
  │                      │                    │
  │  6. Show hit marker ◄┤                    │
  │                      │  7. Apply damage ◄─┤
  │                      │                    │
  │                      │  8. Update health  │
  │                      │     display        │
```

### Voxel Modification Flow

```
Client                              Server
  │                                    │
  │  1. Player destroys block          │
  │                                    │
  │  2. Send useTool ─────────────────►│
  │     (target position)              │
  │                                    │
  │                          3. Server validates
  │                             (range, cooldown)
  │                                    │
  │                          4. Server modifies world
  │                                    │
  │                          5. Server checks collapse
  │                                    │
  │  6. Receive voxelChanged ◄─────────│
  │                                    │
  │  7. Client updates local           │
  │     world and mesh                 │
```

## Client-Side Prediction

To reduce latency, the client predicts its own movement:

1. **Local Input**: Player presses WASD
2. **Immediate Response**: Client moves player instantly
3. **Send to Server**: Input sent every 50ms
4. **Server Validation**: Server simulates and validates
5. **Reconciliation**: Client corrects if prediction was wrong

This makes movement feel responsive while maintaining server authority.

## Remote Player Interpolation

Remote players are interpolated for smooth movement:

```typescript
// Store current and target positions
remotePlayer.currentPosition.lerp(remotePlayer.targetPosition, 0.1);

// Smooth rotation
const yawDiff = targetYaw - currentYaw;
remotePlayer.mesh.rotation.y += yawDiff * 0.1;
```

This prevents jittery movement despite network latency.

## Performance Optimizations

### Network
- **Input throttling**: Send input every 50ms (20 Hz)
- **State broadcasting**: Only send changed data
- **Compression**: Messages are JSON (could use MessagePack)

### Rendering
- **Chunk-based rendering**: Only rebuild changed chunks
- **Instanced meshes**: Efficient voxel rendering
- **Deferred rebuilds**: Batch voxel changes
- **LOD**: Could add level-of-detail for distant chunks

### Server
- **Tick rate**: 20 Hz (configurable)
- **Spatial queries**: Chunk-based voxel lookup
- **Batch updates**: Send multiple changes in one message

## Security Considerations

### Server Authority
- All game logic runs on server
- Client cannot modify game state directly
- Prevents speed hacks, teleportation, etc.

### Input Validation
- Server validates all client input
- Checks for impossible movements
- Rate limits actions (shooting, building)

### Anti-Cheat
- Server-side hit detection
- Movement validation
- Action cooldowns
- No client-side trust

## Scalability

### Current Limits
- **Players**: Tested with 10+ simultaneous players
- **World size**: 250x250 voxels
- **Tick rate**: 20 Hz

### Scaling Strategies
1. **Sharding**: Split world into multiple servers
2. **Interest management**: Only send relevant data
3. **Spatial partitioning**: Divide world into regions
4. **Load balancing**: Distribute players across servers

## Testing Multiplayer

### Local Testing
```bash
# Terminal 1
node start-server.js

# Terminal 2
npm run dev

# Open two browser windows
# Both connect to ws://localhost:3000
```

### Network Testing
```bash
# Server computer
node start-server.js
# Note IP: 192.168.1.100

# Client computer
# Edit game.ts: ws://192.168.1.100:3000
npm run dev
```

## Debugging

### Enable Logging
```typescript
// In networkClient.ts
console.log('Sent:', message);
console.log('Received:', message);
```

### Browser DevTools
- **Network tab**: View WebSocket messages
- **Console**: Check for errors
- **Performance**: Profile frame rate

### Server Logs
```bash
# Server prints:
# - Connection events
# - Player actions
# - Errors
```

## Future Improvements

1. **Binary protocol**: Use MessagePack instead of JSON
2. **Delta compression**: Only send changed fields
3. **Client-side prediction**: More advanced prediction
4. **Lag compensation**: Rewind time for hit detection
5. **Voice chat**: WebRTC integration
6. **Replay system**: Record and playback matches
7. **Spectator mode**: Watch matches
8. **Matchmaking**: Automated team balancing

## Conclusion

The multiplayer architecture provides:
- ✅ Low-latency gameplay with client-side prediction
- ✅ Smooth remote player movement with interpolation
- ✅ Server authority preventing cheating
- ✅ Scalable chunk-based world
- ✅ Efficient network communication

The system is production-ready for small to medium player counts (up to ~32 players per server).
