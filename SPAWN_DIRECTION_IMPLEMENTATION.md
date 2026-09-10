# Spawn Direction Implementation

## Overview
Implemented proper spawn facing directions for all players and bots to ensure they face each other at the start of the game.

## Changes Made

### 1. Player Spawn Direction
**File:** `src/game/game.ts` (line 187-189)
- Set player's initial yaw to `Math.PI` (180 degrees)
- Blue team player now faces positive Z direction (toward red team)
- Calls `updateCamera()` to apply the rotation immediately

**File:** `src/game/player.ts` (line 116)
- Updated `respawn()` method to set `yaw = Math.PI`
- Player always respawns facing toward enemy team

**File:** `src/game/player.ts` (line 324)
- Changed `updateCamera()` from private to public
- Allows game.ts to update camera after setting initial yaw

### 2. Bot Spawn Direction
**File:** `src/game/game.ts` (line 591-594)
- Added initial yaw calculation based on team:
  - Blue bots: `Math.PI` (face positive Z, toward red)
  - Red bots: `0` (face negative Z, toward blue)
- Applied rotation to bot mesh immediately after creation

**File:** `src/game/game.ts` (line 627-628)
- Set `targetYaw` and `currentYaw` in bot initialization:
  - Blue bots: `Math.PI`
  - Red bots: `0`

### 3. Bot Respawn Direction
**File:** `src/game/game.ts` (line 985-990)
- Updated respawn logic to set correct yaw based on team
- Sets `mesh.rotation.y` to team-appropriate yaw
- Updates `targetYaw` and `currentYaw` to maintain facing direction

## Technical Details

### Coordinate System
- **Blue team spawn zone:** Z = -60 to -30 (negative Z side)
- **Red team spawn zone:** Z = 30 to 60 (positive Z side)
- **Blue flag:** Z = -80
- **Red flag:** Z = 80

### Yaw Values
- `yaw = 0`: Facing negative Z (default forward)
- `yaw = Math.PI`: Facing positive Z (180 degrees)
- `yaw = Math.PI/2`: Facing negative X
- `yaw = -Math.PI/2`: Facing positive X

### Team Facing Directions
- **Blue team** (negative Z side) faces **positive Z** (toward red team)
- **Red team** (positive Z side) faces **negative Z** (toward blue team)

## Benefits

1. **Immediate Engagement**: Players and bots face each other from spawn, leading to faster combat
2. **Tactical Clarity**: Clear understanding of enemy direction
3. **Consistent Experience**: Same facing direction on respawn
4. **Better AI Behavior**: Bots start with correct orientation for pathfinding

## Testing

### Initial Spawn
- ✅ Player spawns facing positive Z (toward red team)
- ✅ Blue bots spawn facing positive Z (toward red team)
- ✅ Red bots spawn facing negative Z (toward blue team)

### Respawn
- ✅ Player respawns facing positive Z
- ✅ Bots respawn facing correct direction based on team
- ✅ Death animation rotation is properly reset

### Visual Verification
- ✅ Player camera shows correct forward direction
- ✅ Bot meshes display correct rotation
- ✅ Name tags remain properly oriented

## Performance Impact
- **Minimal**: Only affects initial spawn/respawn
- **No runtime overhead**: Yaw values are set once
- **No memory impact**: Uses existing rotation properties

## Compatibility
- ✅ Works in singleplayer mode
- ✅ Works in multiplayer mode
- ✅ Compatible with existing AI behavior
- ✅ No breaking changes to existing systems

## Future Enhancements
Potential improvements for future versions:
1. Add spawn rotation randomization within a cone (±30 degrees)
2. Implement spawn protection period where players can't be damaged
3. Add visual spawn effects (particles, sounds)
4. Consider team-specific spawn points with different orientations
