import * as THREE from 'three';
import { VoxelWorld } from './world';

export class Player {
  camera: THREE.PerspectiveCamera;
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  yaw: number = 0;
  pitch: number = 0;
  hp: number = 100;
  maxHp: number = 100;
  isDead: boolean = false;
  isGrounded: boolean = false;
  isSprinting: boolean = false;
  isCrouching: boolean = false;
  height: number = 1.7;
  crouchHeight: number = 1.2;
  radius: number = 0.3;
  speed: number = 5;
  sprintMultiplier: number = 1.6;
  crouchMultiplier: number = 0.5;
  jumpForce: number = 8;
  gravity: number = 20;
  sensitivity: number = 0.002;
  respawnTimer: number = 0;
  targetInfo: string = '';

  private keys: Set<string> = new Set();
  private crouchKeyPressed: boolean = false;
  private world: VoxelWorld;

  constructor(world: VoxelWorld) {
    this.world = world;
    const groundY = world.getGroundHeight(0, 0);
    this.position = new THREE.Vector3(0, groundY, 0);
    this.velocity = new THREE.Vector3(0, 0, 0);
    this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 200);
    this.updateCamera();
  }

  get currentHeight(): number {
    return this.isCrouching ? this.crouchHeight : this.height;
  }

  getForward(): THREE.Vector3 {
    return new THREE.Vector3(-Math.sin(this.yaw), 0, -Math.cos(this.yaw)).normalize();
  }

  getRight(): THREE.Vector3 {
    return new THREE.Vector3(Math.cos(this.yaw), 0, -Math.sin(this.yaw)).normalize();
  }

  getAimDirection(): THREE.Vector3 {
    const dir = new THREE.Vector3(0, 0, -1);
    dir.applyEuler(new THREE.Euler(this.pitch, this.yaw, 0, 'YXZ'));
    return dir.normalize();
  }

  handleKeyDown(code: string): void {
    this.keys.add(code.toLowerCase());
    if (code === 'Space') this.jump();
    if (code === 'ShiftLeft' || code === 'ShiftRight') this.isSprinting = true;
    if ((code === 'ControlLeft' || code === 'ControlRight' || code === 'KeyC') && !this.crouchKeyPressed) {
      this.crouchKeyPressed = true;
      this.isCrouching = !this.isCrouching;
    }
  }

  handleKeyUp(code: string): void {
    this.keys.delete(code.toLowerCase());
    if (code === 'ShiftLeft' || code === 'ShiftRight') this.isSprinting = false;
    if (code === 'ControlLeft' || code === 'ControlRight' || code === 'KeyC') {
      this.crouchKeyPressed = false;
    }
  }

  handleMouseMove(dx: number, dy: number): void {
    if (this.isDead) return;
    this.yaw -= dx * this.sensitivity;
    this.pitch -= dy * this.sensitivity;
    this.pitch = Math.max(-Math.PI / 2 + 0.01, Math.min(Math.PI / 2 - 0.01, this.pitch));
  }

  jump(): void {
    if (this.isDead) return;
    if (this.isGrounded) {
      this.velocity.y = this.jumpForce;
      this.isGrounded = false;
    }
  }

  takeDamage(amount: number): void {
    if (this.isDead) return;
    this.hp -= amount;
    if (this.hp <= 0) {
      this.hp = 0;
      this.die();
    }
  }

  die(): void {
    this.isDead = true;
    this.respawnTimer = 6;
  }

  respawn(): void {
    this.isDead = false;
    this.hp = this.maxHp;
    const spawnX = (Math.random() - 0.5) * 20;
    const spawnZ = (Math.random() - 0.5) * 20;
    const groundY = this.world.getGroundHeight(spawnX, spawnZ);
    this.position.set(spawnX, groundY, spawnZ);
    this.velocity.set(0, 0, 0);
    this.yaw = 0;
    this.pitch = 0;
  }

  private isPointInSolid(x: number, y: number, z: number): boolean {
    // Voxels are centered at integer coordinates
    const vx = Math.floor(x);
    const vy = Math.floor(y);
    const vz = Math.floor(z);
    return this.world.isSolid(vx, vy, vz);
  }

  private checkCollisionAt(pos: THREE.Vector3): boolean {
    const r = this.radius;
    const h = this.currentHeight;

    // Check at feet, middle, and head level
    // Use actual feet position (pos.y) not offset
    const yChecks = [
      pos.y,                 // At feet level
      pos.y + h * 0.5,       // Middle
      pos.y + h - 0.1,       // Just below head
    ];

    for (const cy of yChecks) {
      // Check 9 points: center + 8 around the radius
      const points = [
        [pos.x, pos.z],                    // Center
        [pos.x - r, pos.z],                // Left
        [pos.x + r, pos.z],                // Right
        [pos.x, pos.z - r],                // Front
        [pos.x, pos.z + r],                // Back
        [pos.x - r * 0.7, pos.z - r * 0.7], // Diagonal corners
        [pos.x + r * 0.7, pos.z - r * 0.7],
        [pos.x - r * 0.7, pos.z + r * 0.7],
        [pos.x + r * 0.7, pos.z + r * 0.7],
      ];
      for (const [cx, cz] of points) {
        if (this.isPointInSolid(cx, cy, cz)) return true;
      }
    }
    return false;
  }

  // Check if player is standing on ground (feet touching solid)
  private isOnGround(pos: THREE.Vector3): boolean {
    const r = this.radius;
    // Check just below feet
    const belowY = pos.y - 0.05;
    
    const points = [
      [pos.x, pos.z],
      [pos.x - r, pos.z],
      [pos.x + r, pos.z],
      [pos.x, pos.z - r],
      [pos.x, pos.z + r],
    ];
    
    for (const [cx, cz] of points) {
      if (this.isPointInSolid(cx, belowY, cz)) return true;
    }
    return false;
  }

  // Push player out of solid voxels if stuck
  private pushOutOfSolids(pos: THREE.Vector3): THREE.Vector3 {
    const result = pos.clone();
    const r = this.radius;
    const h = this.currentHeight;

    // Check if player is currently inside a solid
    if (!this.checkCollisionAt(result)) {
      return result; // Not stuck, return as-is
    }

    // Try to push player out in each direction
    const pushDistance = 0.1;
    const directions = [
      [pushDistance, 0, 0],
      [-pushDistance, 0, 0],
      [0, 0, pushDistance],
      [0, 0, -pushDistance],
      [0, pushDistance, 0],
    ];

    for (const [dx, dy, dz] of directions) {
      const testPos = result.clone();
      testPos.x += dx;
      testPos.y += dy;
      testPos.z += dz;
      
      if (!this.checkCollisionAt(testPos)) {
        return testPos; // Found a non-colliding position
      }
    }

    // If still stuck, move up until free
    for (let i = 0; i < 10; i++) {
      result.y += 0.5;
      if (!this.checkCollisionAt(result)) {
        return result;
      }
    }

    return result;
  }

  private findGroundBelow(x: number, z: number): number {
    return this.world.getGroundHeight(x, z);
  }

  update(dt: number): void {
    if (this.isDead) {
      this.respawnTimer -= dt;
      if (this.respawnTimer <= 0) {
        this.respawn();
      }
      this.updateCamera();
      return;
    }

    // First, check if player is stuck and push them out
    if (this.checkCollisionAt(this.position)) {
      const pushedPos = this.pushOutOfSolids(this.position);
      this.position.copy(pushedPos);
    }

    const moveDir = new THREE.Vector3(0, 0, 0);
    const forward = this.getForward();
    const right = this.getRight();

    if (this.keys.has('keyw')) moveDir.add(forward);
    if (this.keys.has('keys')) moveDir.sub(forward);
    if (this.keys.has('keya')) moveDir.sub(right);
    if (this.keys.has('keyd')) moveDir.add(right);

    if (moveDir.length() > 0) moveDir.normalize();

    let speed = this.speed;
    if (this.isSprinting && !this.isCrouching) speed *= this.sprintMultiplier;
    if (this.isCrouching) speed *= this.crouchMultiplier;

    this.velocity.x = moveDir.x * speed;
    this.velocity.z = moveDir.z * speed;

    // Check if on ground BEFORE applying gravity
    this.isGrounded = this.isOnGround(this.position);

    // Only apply gravity if not grounded
    if (!this.isGrounded) {
      this.velocity.y -= this.gravity * dt;
      if (this.velocity.y < -30) this.velocity.y = -30;
    } else {
      // Reset vertical velocity when on ground
      this.velocity.y = 0;
    }

    const newPos = this.position.clone();

    // Move X axis with collision detection
    newPos.x += this.velocity.x * dt;
    if (this.checkCollisionAt(newPos)) {
      newPos.x = this.position.x;
      this.velocity.x = 0;
    }

    // Move Z axis with collision detection
    newPos.z += this.velocity.z * dt;
    if (this.checkCollisionAt(newPos)) {
      newPos.z = this.position.z;
      this.velocity.z = 0;
    }

    // Move Y axis with collision detection
    newPos.y += this.velocity.y * dt;
    if (this.checkCollisionAt(newPos)) {
      if (this.velocity.y < 0) {
        // Falling and hit something - snap to ground
        this.isGrounded = true;
        const groundY = this.findGroundBelow(newPos.x, newPos.z);
        newPos.y = groundY;
      } else {
        // Hit ceiling
        newPos.y = this.position.y;
      }
      this.velocity.y = 0;
    }

    // Safety: if player falls too far, teleport to safe location
    if (newPos.y < -10) {
      const safeY = this.world.getGroundHeight(0, 0);
      newPos.set(0, safeY, 0);
      this.velocity.set(0, 0, 0);
    }

    // Final check: if still colliding, push out again
    if (this.checkCollisionAt(newPos)) {
      const pushedPos = this.pushOutOfSolids(newPos);
      newPos.copy(pushedPos);
    }

    this.position.copy(newPos);
    this.updateCamera();
  }

  private updateCamera(): void {
    this.camera.position.copy(this.position);
    this.camera.position.y += this.currentHeight * 0.85;
    this.camera.rotation.set(this.pitch, this.yaw, 0, 'YXZ');
  }

  getEyePosition(): THREE.Vector3 {
    return new THREE.Vector3(
      this.position.x,
      this.position.y + this.currentHeight * 0.85,
      this.position.z
    );
  }
}
