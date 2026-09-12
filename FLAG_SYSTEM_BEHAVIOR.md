# Flag System Behavior Documentation

## Overview

The flag system in the Voxel FPS game follows Capture the Flag (CTF) mechanics with specific rules for flag capture, dropping, and returning to base.

## Flag States

A flag can be in one of three states:

1. **At Base** - Flag is at its team's base, ready to be captured
2. **Carried** - Flag is being carried by a player or bot
3. **Dropped** - Flag is on the ground where the carrier died

## Flag Capture Mechanics

### Capturing a Flag

When a player or bot brings the enemy flag to their own base:

1. **Immediate Scoring**: The capture score is incremented immediately
2. **Immediate Return**: The flag immediately returns to its base
3. **No Delay**: There is no waiting period - the flag is immediately available again

**Example:**
- Blue player picks up Red flag
- Blue player brings Red flag to Blue base
- Blue team scores 1 point
- Red flag immediately returns to Red base
- Red flag is immediately available to be captured again

### Code Implementation

```typescript
// When player captures flag
if (this.player.carryingFlag && this.isInCaptureZone(this.player.position, this.playerTeam)) {
  this.player.carryingFlag = false;
  
  // Increment score
  if (this.playerTeam === 'blue') {
    this.blueCaptures++;
    // Return red flag to base immediately
    this.redFlagAtBase = true;
    if (this.redFlagMesh) {
      this.redFlagMesh.visible = true;
      this.redFlagMesh.position.set(RED_FLAG_POS.x, ...);
    }
  }
  
  this.showMessage(`🏆 ${this.playerTeam.toUpperCase()} CAPTURED THE FLAG!`);
}
```

## Flag Dropping Mechanics

### Dropping a Flag

When a player or bot dies while carrying a flag:

1. **Flag Drops**: The flag drops at the carrier's death location
2. **60-Second Timer**: The flag stays on the ground for 60 seconds
3. **Pickup Available**: Any player/bot can pick up the dropped flag during this time
4. **Auto-Return**: After 60 seconds, the flag automatically returns to its base

**Example:**
- Blue player picks up Red flag
- Blue player dies while carrying Red flag
- Red flag drops at Blue player's death location
- Red flag stays on ground for 60 seconds
- Any player can pick up the dropped Red flag
- After 60 seconds, Red flag returns to Red base (if not picked up)

### Code Implementation

```typescript
// When carrier dies
private dropPlayerFlag(): void {
  if (this.player.carryingFlag) {
    this.player.carryingFlag = false;
    const enemyFlagTeam = this.playerTeam === 'blue' ? 'red' : 'blue';
    
    // Create dropped flag at death location
    this.createDroppedFlag(this.player.position.clone(), enemyFlagTeam);
    this.showMessage(`💀 ${this.playerTeam.toUpperCase()} dropped the flag!`);
  }
}

// Create dropped flag with 60-second timer
private createDroppedFlag(position: THREE.Vector3, team: Team): void {
  // Create visual flag mesh
  const flagMesh = new THREE.Mesh(...);
  this.scene.add(flagMesh);
  
  // Add to dropped flags with 60-second timer
  this.droppedFlags.push({
    mesh: flagMesh,
    position: position.clone(),
    team: team,
    respawnTimer: 60 // 60 seconds
  });
}

// Update dropped flags every frame
private updateDroppedFlags(dt: number): void {
  for (let i = this.droppedFlags.length - 1; i >= 0; i--) {
    const droppedFlag = this.droppedFlags[i];
    droppedFlag.respawnTimer -= dt;
    
    // Animate flag (rotate and bob)
    droppedFlag.mesh.rotation.y += dt * 2;
    
    // After 60 seconds, return to base
    if (droppedFlag.respawnTimer <= 0) {
      this.scene.remove(droppedFlag.mesh);
      this.droppedFlags.splice(i, 1);
      
      // Return flag to base
      if (droppedFlag.team === 'blue') {
        this.blueFlagAtBase = true;
        this.blueFlagMesh.visible = true;
        this.blueFlagMesh.position.set(BLUE_FLAG_POS.x, ...);
      } else {
        this.redFlagAtBase = true;
        this.redFlagMesh.visible = true;
        this.redFlagMesh.position.set(RED_FLAG_POS.x, ...);
      }
      
      this.showMessage(`🚩 ${droppedFlag.team.toUpperCase()} flag returned to base!`);
    }
  }
}
```

## Visual Feedback

### Flag at Base
- Flag is visible at the base location
- Flag stands upright
- Flag can be picked up by enemy team

### Flag Carried
- Flag disappears from base
- Flag appears on carrier's back (visual mesh)
- Flag rotates to face movement direction
- Message: "🚩 [TEAM] picked up the enemy flag!"

### Flag Dropped
- Flag appears on the ground at death location
- Flag rotates and bobs (visual animation)
- Message: "💀 [TEAM] dropped the flag!"
- After 60 seconds: "🚩 [TEAM] flag returned to base!"

### Flag Captured
- Flag disappears from carrier
- Score increments
- Flag immediately returns to base
- Message: "🏆 [TEAM] CAPTURED THE FLAG!"

## Game Flow Examples

### Scenario 1: Successful Capture
1. Blue player picks up Red flag at Red base
2. Blue player carries Red flag back to Blue base
3. Blue player enters Blue capture zone
4. Blue team scores 1 point
5. Red flag immediately returns to Red base
6. Red flag is immediately available again

### Scenario 2: Flag Drop and Pickup
1. Blue player picks up Red flag
2. Blue player dies while carrying Red flag
3. Red flag drops at Blue player's death location
4. Red flag stays on ground for 60 seconds
5. Another Blue player picks up the dropped Red flag
6. Blue player carries Red flag to Blue base
7. Blue team scores 1 point
8. Red flag immediately returns to Red base

### Scenario 3: Flag Drop and Auto-Return
1. Blue player picks up Red flag
2. Blue player dies while carrying Red flag
3. Red flag drops at Blue player's death location
4. No one picks up the dropped Red flag
5. After 60 seconds, Red flag automatically returns to Red base
6. Red flag is available to be captured again

## Key Differences

### Captured Flag
- Returns to base **immediately**
- No waiting period
- Score is awarded
- Available for capture immediately

### Dropped Flag
- Stays on ground for **60 seconds**
- Can be picked up by anyone during this time
- No score awarded for dropping
- Returns to base automatically after 60 seconds (if not picked up)

## Implementation Details

### State Tracking

```typescript
// Flag state tracking
blueFlagAtBase: boolean = true;  // Is blue flag at base?
redFlagAtBase: boolean = true;   // Is red flag at base?

// Dropped flags tracking
droppedFlags: Array<{
  mesh: THREE.Mesh;
  position: THREE.Vector3;
  team: Team;
  respawnTimer: number;  // 60 seconds
}> = [];

// Player/Bot carrying flag
player.carryingFlag: boolean = false;
bot.carryingFlag: boolean = false;
```

### Pickup Logic

```typescript
// Player can pick up flag if:
// 1. Not already carrying a flag
// 2. Not dead
// 3. Enemy flag is at base OR there's a dropped enemy flag nearby

if (!this.player.carryingFlag && !this.player.isDead) {
  // Check if enemy flag is at base
  if (enemyFlagAtBase) {
    if (distToFlag < 2) {
      this.player.carryingFlag = true;
      // Create carried flag mesh
    }
  }
  
  // Check for dropped flags
  for (const droppedFlag of this.droppedFlags) {
    if (droppedFlag.team === enemyFlagTeam) {
      if (distToFlag < 2) {
        this.player.carryingFlag = true;
        // Remove dropped flag
      }
    }
  }
}
```

## Performance Considerations

### Dropped Flags
- Maximum dropped flags: Limited by gameplay (usually 1-2 at a time)
- Each dropped flag has a visual mesh that rotates and bobs
- Dropped flags are automatically cleaned up after 60 seconds
- Memory usage: Minimal (only active dropped flags)

### Flag Return
- Captured flags return immediately (no performance impact)
- Dropped flags use a timer that decrements each frame
- Timer check is O(1) per dropped flag
- Cleanup is O(n) where n = number of dropped flags (usually small)

## Testing Checklist

### Flag Capture
- [ ] Flag can be picked up from base
- [ ] Flag can be carried by player/bot
- [ ] Flag can be captured at own base
- [ ] Score increments on capture
- [ ] Flag returns to base immediately after capture
- [ ] Message displays on capture

### Flag Drop
- [ ] Flag drops when carrier dies
- [ ] Flag stays on ground for 60 seconds
- [ ] Flag can be picked up by anyone during 60 seconds
- [ ] Flag returns to base after 60 seconds (if not picked up)
- [ ] Message displays on drop
- [ ] Message displays on auto-return

### Visual Feedback
- [ ] Flag visible at base when available
- [ ] Flag visible on carrier's back when carried
- [ ] Flag visible on ground when dropped
- [ ] Flag rotates and bobs when dropped
- [ ] Flag disappears from base when carried
- [ ] Flag disappears from carrier when captured/dropped

### Edge Cases
- [ ] Multiple dropped flags can exist simultaneously
- [ ] Flag can be captured immediately after returning to base
- [ ] Flag can be picked up immediately after dropping
- [ ] Carrier can die immediately after picking up flag
- [ ] Multiple players can attempt to pick up same dropped flag

## Conclusion

The flag system provides clear, immediate feedback for captures while allowing strategic gameplay with dropped flags. The 60-second timer for dropped flags adds strategic depth, while immediate return for captured flags keeps the game flowing.
