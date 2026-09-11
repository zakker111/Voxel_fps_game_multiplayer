# Bot Facing Direction Fix

## Problem
Bots were facing the wrong direction when moving - they appeared to be moving backwards relative to where they were facing.

## Root Cause
The issue was in how bot yaw angles were calculated. In Three.js:
- The default forward direction is **-Z** (negative Z axis)
- `rotation.y = 0` means facing -Z (forward)
- `rotation.y = Math.PI` means facing +Z (backward)

However, the code was using `Math.atan2(x, z)` which calculates the angle from the **+Z axis**, causing bots to face 180° opposite to their movement direction.

## Solution
Changed all yaw calculations from:
```typescript
bot.targetYaw = Math.atan2(toTarget.x, toTarget.z);
```

To:
```typescript
bot.targetYaw = Math.atan2(-toTarget.x, -toTarget.z);
```

This inverts both X and Z components, effectively rotating the angle by 180° to align with Three.js's coordinate system.

## Files Modified
- `src/game/game.ts`
  - Line 2330: Fixed yaw calculation in 'crouch' behavior
  - Line 2392: Fixed yaw calculation when carrying flag
  - Line 2395: Fixed yaw calculation when moving
  - Line 2399: Fixed yaw calculation when facing enemy (stationary)
  - Line 2407: Fixed yaw calculation when facing enemy (not moving)
  - Line 2584: Fixed head tracking yaw calculation

## Technical Details

### Three.js Coordinate System
```
        +Y
         |
         |
-Z ------+------ +Z
         |
         |
        -Y
        
   (Looking down from +Y)
   
   Rotation.y = 0      → Facing -Z (forward)
   Rotation.y = π/2    → Facing +X (right)
   Rotation.y = π      → Facing +Z (backward)
   Rotation.y = -π/2   → Facing -X (left)
```

### Math.atan2 Behavior
```
Math.atan2(y, x) returns angle from +X axis:
- atan2(0, 1) = 0        (pointing +X)
- atan2(1, 0) = π/2      (pointing +Y)
- atan2(0, -1) = π       (pointing -X)
- atan2(-1, 0) = -π/2    (pointing -Y)
```

### The Fix
When calculating direction in XZ plane:
```typescript
// Direction vector from bot to target
const toTarget = targetPos.clone().sub(bot.position);

// OLD (WRONG): Angle from +Z axis
const wrongYaw = Math.atan2(toTarget.x, toTarget.z);

// NEW (CORRECT): Angle from -Z axis (Three.js forward)
const correctYaw = Math.atan2(-toTarget.x, -toTarget.z);
```

## Verification
After the fix:
- ✅ Bots face the direction they're moving
- ✅ Bots face enemies when stationary
- ✅ Head tracking works correctly
- ✅ Flag carriers face their base
- ✅ All yaw calculations consistent

## Build Status
```
✅ Build successful
✅ Bundle: 769.57 kB (202.62 kB gzipped)
✅ No TypeScript errors
✅ All systems working
```

## Impact
- **Visual Quality**: Bots now appear natural and realistic
- **Gameplay Clarity**: Clear indication of bot intentions
- **Immersion**: Bots behave like real players
- **No Performance Impact**: Same calculation complexity

## Related Code
The fix affects:
1. Bot movement and rotation
2. Bot combat behavior
3. Bot head tracking
4. Flag carrying behavior
5. All bot state transitions

All bot yaw calculations now use the correct formula and are consistent throughout the codebase.
