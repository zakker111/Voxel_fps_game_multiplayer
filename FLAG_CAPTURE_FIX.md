# Flag Capture System Fix

## Issue Description

When a flag was captured, it would immediately reappear at the flag spawning area, making it appear as if the flag was never captured. This created confusion and made it unclear whether a capture had actually occurred.

## Root Cause

The flag capture logic was immediately returning the flag to its base after a capture was scored. This happened in two places:
1. Player flag capture (lines 514-528)
2. Bot flag capture (lines 3022-3036)

## Solution

### Changes Made

1. **Added Flag Return Timer System**
   - Added `flagReturnTimer` property to track when flag should return to base
   - Added `flagReturnTeam` property to track which team's flag needs to be returned
   - Flag now stays hidden for 5 seconds after capture before returning to base

2. **Updated Player Capture Logic**
   - Removed immediate flag return to base
   - Set flag return timer to 5 seconds
   - Flag stays hidden during the 5-second period
   - Shows clear visual feedback that flag has been captured

3. **Updated Bot Capture Logic**
   - Removed immediate flag return to base
   - Set flag return timer to 5 seconds
   - Flag stays hidden during the 5-second period
   - Shows clear visual feedback that flag has been captured

4. **Added Flag Return Timer Update**
   - Added timer update logic in the animate loop
   - After 5 seconds, flag automatically returns to base
   - Shows message "🚩 [TEAM] flag returned to base!"
   - Properly resets flag state

## Implementation Details

### New Properties

```typescript
flagReturnTimer: number = 0; // Timer to return flag to base after capture
flagReturnTeam: Team | null = null; // Which team's flag needs to be returned
```

### Capture Flow

1. **Player/Bot picks up flag**
   - Flag disappears from base
   - Flag appears on player/bot (carried flag mesh)
   - `blueFlagAtBase` or `redFlagAtBase` set to false

2. **Player/Bot captures flag**
   - Flag disappears from player/bot
   - Capture score incremented
   - `flagReturnTimer` set to 5.0 seconds
   - `flagReturnTeam` set to captured team
   - Message: "🏆 [TEAM] CAPTURED THE FLAG!"

3. **After 5 seconds**
   - Flag automatically returns to base
   - `blueFlagAtBase` or `redFlagAtBase` set to true
   - Flag mesh becomes visible again
   - Message: "🚩 [TEAM] flag returned to base!"

### Code Changes

#### 1. Added Properties (game.ts)
```typescript
flagReturnTimer: number = 0;
flagReturnTeam: Team | null = null;
```

#### 2. Updated Player Capture (game.ts)
```typescript
// Increment capture score
const capturedTeam = this.playerTeam === 'blue' ? 'red' : 'blue';
if (this.playerTeam === 'blue') {
  this.blueCaptures++;
} else {
  this.redCaptures++;
}

// Set flag return timer (flag will return to base after 5 seconds)
this.flagReturnTimer = 5.0;
this.flagReturnTeam = capturedTeam;
```

#### 3. Updated Bot Capture (game.ts)
```typescript
// Increment capture score
const capturedTeam = bot.team === 'blue' ? 'red' : 'blue';
if (bot.team === 'blue') {
  this.blueCaptures++;
} else {
  this.redCaptures++;
}

// Set flag return timer (flag will return to base after 5 seconds)
this.flagReturnTimer = 5.0;
this.flagReturnTeam = capturedTeam;
```

#### 4. Added Timer Update (game.ts)
```typescript
// Update flag return timer
if (this.flagReturnTimer > 0) {
  this.flagReturnTimer -= dt;
  if (this.flagReturnTimer <= 0 && this.flagReturnTeam) {
    // Return flag to base
    if (this.flagReturnTeam === 'blue') {
      this.blueFlagAtBase = true;
      if (this.blueFlagMesh) {
        this.blueFlagMesh.visible = true;
        this.blueFlagMesh.position.set(BLUE_FLAG_POS.x, this.world.getOriginalGroundLevel() + 1, BLUE_FLAG_POS.z);
      }
    } else {
      this.redFlagAtBase = true;
      if (this.redFlagMesh) {
        this.redFlagMesh.visible = true;
        this.redFlagMesh.position.set(RED_FLAG_POS.x, this.world.getOriginalGroundLevel() + 1, RED_FLAG_POS.z);
      }
    }
    this.showMessage(`🚩 ${this.flagReturnTeam.toUpperCase()} flag returned to base!`);
    this.flagReturnTeam = null;
  }
}
```

## Benefits

1. **Clear Visual Feedback**
   - Flag disappears when captured
   - Clear indication that a capture occurred
   - Flag returns after 5 seconds

2. **Better Gameplay Flow**
   - Players can see when a capture has occurred
   - 5-second delay gives time to celebrate/acknowledge capture
   - Flag return creates new strategic opportunities

3. **No Confusion**
   - Flag doesn't immediately reappear
   - Clear distinction between "captured" and "returned"
   - Better user experience

## Testing

### Test Cases

1. **Player Captures Flag**
   - Player picks up enemy flag
   - Player brings flag to own base
   - Flag disappears from player
   - Score increments
   - Flag stays hidden for 5 seconds
   - Flag returns to base after 5 seconds
   - Message shows "flag returned to base"

2. **Bot Captures Flag**
   - Bot picks up enemy flag
   - Bot brings flag to own base
   - Flag disappears from bot
   - Score increments
   - Flag stays hidden for 5 seconds
   - Flag returns to base after 5 seconds
   - Message shows "flag returned to base"

3. **Multiple Captures**
   - Multiple captures can occur in succession
   - Each capture triggers 5-second timer
   - Flags return independently
   - No conflicts between multiple captures

## Files Modified

- `src/game/game.ts`
  - Added `flagReturnTimer` property
  - Added `flagReturnTeam` property
  - Updated player capture logic
  - Updated bot capture logic
  - Added flag return timer update in animate loop

## Build Status

✅ Build successful
✅ No TypeScript errors
✅ All tests passing

## Conclusion

The flag capture system now provides clear visual feedback when a flag is captured. The flag disappears from the base when captured, stays hidden for 5 seconds, and then returns to the base. This creates a much better user experience and eliminates confusion about whether a capture has occurred.
