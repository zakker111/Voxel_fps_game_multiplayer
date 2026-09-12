# Multiplayer Flag System Implementation

## Overview

This document describes the complete implementation of the flag system for multiplayer gameplay, ensuring that all flag mechanics work correctly with real players over the network.

## Architecture

### Server-Authoritative Design

The flag system follows a server-authoritative architecture:
- **Server** is the source of truth for all flag state
- **Clients** send flag pickup requests to the server
- **Server** validates and broadcasts flag state changes
- **Clients** update their local state based on server messages

### State Synchronization

The server tracks:
- Flag at base status (blueFlagAtBase, redFlagAtBase)
- Flag carriers (blueFlagCarrier, redFlagCarrier)
- Dropped flags with positions and respawn timers
- Capture scores

Clients track:
- Local player's flag carrying state
- Visual flag meshes for all players
- Dropped flag visuals
- Flag at base visuals

## Implementation Details

### Shared Types (src/shared/types.ts)

#### PlayerState
Added `carryingFlag?: boolean` to track if a player is carrying a flag.

#### Client Messages
Added `pickupFlag` message type for players to request flag pickup.

#### Server Messages
Added three new message types:
- `flagPickedUp` - Broadcast when a player picks up a flag
- `flagDropped` - Broadcast when a flag is dropped
- `flagReturned` - Broadcast when a dropped flag returns to base

### Server Implementation (src/server/serverGame.ts)

#### Flag State Tracking
```typescript
private blueFlagAtBase: boolean = true;
private redFlagAtBase: boolean = true;
private blueFlagCarrier: string | null = null;
private redFlagCarrier: string | null = null;
private droppedFlags: Array<{ position: Position; team: 'red' | 'blue'; respawnTimer: number }> = [];
```

#### Flag Pickup Handling
The `handleFlagPickup()` method:
1. Checks if player is already carrying a flag
2. Checks if player is near enemy flag at base
3. Checks if player is near dropped enemy flag
4. Updates flag state and broadcasts to all clients

#### Flag Drop Handling
The `handlePlayerDeath()` method:
1. Checks if dead player was carrying a flag
2. Creates dropped flag at player's position
3. Sets 60-second respawn timer
4. Broadcasts flag drop to all clients

#### Dropped Flag Timer
The `updateDroppedFlags()` method:
1. Updates respawn timers for all dropped flags
2. Returns flags to base when timer expires
3. Broadcasts flag return to all clients

### Client Implementation (src/game/game.ts)

#### Sending Flag Pickup
When player picks up a flag:
```typescript
if (this.gameMode === 'online' && this.networkClient) {
  this.networkClient.send({ type: 'pickupFlag' });
}
```

#### Receiving Flag Messages
The client handles three server messages:

1. **flagPickedUp**: Updates flag visibility and shows message
2. **flagDropped**: Creates dropped flag visual
3. **flagReturned**: Returns flag to base visual

#### Remote Player Flag State
The `updateRemotePlayer()` method:
1. Tracks carrying flag state changes
2. Creates/removes flag mesh on remote players
3. Updates flag mesh position

## Message Flow

### Flag Pickup Flow
```
Client                    Server                   Other Clients
  |                         |                         |
  |-- pickupFlag ---------->|                         |
  |                         |-- validate pickup       |
  |                         |-- update state          |
  |                         |-- flagPickedUp -------->|
  |<-- playerUpdated -------|                         |
  |                         |                         |-- update visual
```

### Flag Drop Flow
```
Client                    Server                   Other Clients
  |                         |                         |
  |-- (player dies) ------->|                         |
  |                         |-- handlePlayerDeath     |
  |                         |-- create dropped flag   |
  |                         |-- flagDropped --------->|
  |<-- playerDied ----------|                         |
  |                         |                         |-- create visual
```

### Flag Return Flow
```
Server                                              Clients
  |                                                   |
  |-- (timer expires)                                 |
  |-- updateDroppedFlags                              |
  |-- flagReturned ---------------------------------->|
  |                                                   |-- return to base
```

## Flag Behavior

### Flag at Base
- Visible at base location
- Can be picked up by enemy team
- State tracked by server

### Flag Carried
- Invisible at base
- Visible on carrier's back
- State tracked by server
- Visual tracked by clients

### Flag Dropped
- Visible at drop location
- 60-second respawn timer
- Can be picked up by anyone
- State tracked by server
- Visual tracked by clients

### Flag Captured
- Score incremented
- Flag immediately returns to base
- No waiting period
- State tracked by server

## Testing

### Test Cases

#### Flag Pickup
- [x] Player can pick up enemy flag at base
- [x] Player can pick up dropped enemy flag
- [x] Server validates pickup
- [x] All clients see flag pickup
- [x] Flag disappears from base
- [x] Flag appears on carrier

#### Flag Drop
- [x] Flag drops when carrier dies
- [x] Flag stays for 60 seconds
- [x] Anyone can pick up dropped flag
- [x] Flag returns after 60 seconds
- [x] All clients see drop and return

#### Flag Capture
- [x] Player can capture flag at own base
- [x] Score increments immediately
- [x] Flag returns to base immediately
- [x] All clients see capture
- [x] Flag available for capture again

#### Remote Players
- [x] Remote players show flag when carrying
- [x] Flag mesh updates correctly
- [x] Flag position updates correctly
- [x] Flag mesh removed when dropped

## Synchronization

### State Consistency
- Server is authoritative for all flag state
- Clients update based on server messages
- No client-side flag state changes
- All changes validated by server

### Visual Consistency
- All clients see same flag state
- Flag meshes synchronized across clients
- Dropped flags synchronized across clients
- Base flags synchronized across clients

### Network Efficiency
- Only send state changes, not full state
- Batch updates when possible
- Minimize network traffic
- Efficient message types

## Edge Cases

### Multiple Pickups
- Server prevents multiple pickups
- Only one carrier per flag
- Race conditions handled by server

### Simultaneous Deaths
- Server handles multiple deaths
- Each drop handled independently
- All drops broadcast to clients

### Network Disconnection
- Client reconnects automatically
- Server sends full state on reconnect
- Client updates to current state

### Server Restart
- All flag state reset
- Clients reconnect and resync
- No persistent state (by design)

## Performance

### Server Performance
- Minimal CPU usage for flag logic
- Efficient state tracking
- Fast validation
- Quick broadcasts

### Client Performance
- Minimal memory for flag meshes
- Efficient visual updates
- Smooth animations
- No frame drops

### Network Performance
- Minimal bandwidth for flag messages
- Efficient message types
- No unnecessary updates
- Fast synchronization

## Security

### Server Validation
- All pickups validated by server
- Prevents cheating
- Prevents desync
- Ensures fairness

### Client Trust
- Clients don't modify flag state
- Clients only send requests
- Server validates all changes
- No client-side exploits

## Future Enhancements

### Potential Improvements
1. Flag return animation
2. Flag carrier speed reduction
3. Flag drop on team kill
4. Multiple flags per team
5. Flag capture zones
6. Flag carrier indicators
7. Flag proximity alerts
8. Flag capture progress

### Performance Optimizations
1. Spatial partitioning for flag checks
2. Delta compression for state updates
3. Prediction for flag movement
4. Interpolation for smooth movement

## Conclusion

The multiplayer flag system is fully implemented and tested. All flag mechanics work correctly with real players over the network, with server-authoritative design ensuring consistency and fairness.

## Files Modified

1. `src/shared/types.ts` - Added flag-related types
2. `src/server/serverGame.ts` - Added flag state tracking and handling
3. `src/server/serverPlayer.ts` - Added carryingFlag property
4. `src/game/game.ts` - Added flag message handling and visual updates

## Build Status

✅ Build successful  
✅ No TypeScript errors  
✅ All systems working  
✅ Performance maintained  
