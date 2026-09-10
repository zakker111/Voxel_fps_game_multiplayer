import {
  PlayerState,
  Position,
  Rotation,
  PlayerInput,
  PLAYER_SPEED,
  SPRINT_MULTIPLIER,
  CROUCH_MULTIPLIER,
  JUMP_FORCE,
  GRAVITY,
  PLAYER_HEIGHT,
  CROUCH_HEIGHT,
  PLAYER_RADIUS,
} from '../shared/types';
import { ServerWorld } from './serverWorld';

export class ServerPlayer {
  id: string;
  position: Position;
  rotation: Rotation;
  velocity: Position;
  hp: number = 100;
  team: 'red' | 'blue';
  isDead: boolean = false;
  equipment: 'rifle' | 'smg' | 'pickaxe' | 'spade' = 'rifle';
  isAiming: boolean = false;
  isCrouching: boolean = false;
  isSprinting: boolean = false;
  isGrounded: boolean = false;
  isShooting: boolean = false;

  private input: PlayerInput = {
    moveX: 0,
    moveZ: 0,
    jump: false,
    crouch: false,
    sprint: false,
    yaw: 0,
    pitch: 0,
  };

  constructor(id: string, position: Position, team: 'red' | 'blue') {
    this.id = id;
    this.position = { ...position };
    this.rotation = { yaw: 0, pitch: 0 };
    this.velocity = { x: 0, y: 0, z: 0 };
    this.team = team;
  }

  applyInput(input: PlayerInput): void {
    this.input = input;
    this.rotation.yaw = input.yaw;
    this.rotation.pitch = input.pitch;
    this.isCrouching = input.crouch;
    this.isSprinting = input.sprint;
  }

  update(dt: number, world: ServerWorld): void {
    if (this.isDead) return;

    // Calculate movement direction
    const yaw = this.input.yaw;
    const forward = {
      x: -Math.sin(yaw),
      z: -Math.cos(yaw),
    };
    const right = {
      x: Math.cos(yaw),
      z: -Math.sin(yaw),
    };

    // Apply movement input
    let speed = PLAYER_SPEED;
    if (this.isSprinting && !this.isCrouching) speed *= SPRINT_MULTIPLIER;
    if (this.isCrouching) speed *= CROUCH_MULTIPLIER;

    const moveX = forward.x * this.input.moveZ + right.x * this.input.moveX;
    const moveZ = forward.z * this.input.moveZ + right.z * this.input.moveX;

    this.velocity.x = moveX * speed;
    this.velocity.z = moveZ * speed;

    // Apply gravity
    this.velocity.y -= GRAVITY * dt;

    // Calculate new position
    const newX = this.position.x + this.velocity.x * dt;
    const newY = this.position.y + this.velocity.y * dt;
    const newZ = this.position.z + this.velocity.z * dt;

    // Check collisions
    const currentHeight = this.isCrouching ? CROUCH_HEIGHT : PLAYER_HEIGHT;

    // Horizontal collision (X)
    if (!this.checkCollision(newX, this.position.y, this.position.z, currentHeight, world)) {
      this.position.x = newX;
    } else {
      this.velocity.x = 0;
    }

    // Horizontal collision (Z)
    if (!this.checkCollision(this.position.x, this.position.y, newZ, currentHeight, world)) {
      this.position.z = newZ;
    } else {
      this.velocity.z = 0;
    }

    // Vertical collision (Y)
    if (!this.checkCollision(this.position.x, newY, this.position.z, currentHeight, world)) {
      this.position.y = newY;
      this.isGrounded = false;
    } else {
      if (this.velocity.y < 0) {
        // Landing
        this.isGrounded = true;
        // Snap to ground
        const groundY = world.getGroundHeight(this.position.x, this.position.z);
        this.position.y = groundY + 0.1;
      }
      this.velocity.y = 0;
    }

    // Jump
    if (this.input.jump && this.isGrounded) {
      this.velocity.y = JUMP_FORCE;
      this.isGrounded = false;
    }

    // Prevent falling through world
    if (this.position.y < -10) {
      this.position.y = world.getGroundHeight(this.position.x, this.position.z) + 1;
      this.velocity.y = 0;
    }
  }

  private checkCollision(x: number, y: number, z: number, height: number, world: ServerWorld): boolean {
    const radius = PLAYER_RADIUS;
    
    // Check multiple points around the player
    for (let dy = 0; dy < height; dy += 0.5) {
      for (let dx = -radius; dx <= radius; dx += radius) {
        for (let dz = -radius; dz <= radius; dz += radius) {
          const checkX = Math.floor(x + dx);
          const checkY = Math.floor(y + dy);
          const checkZ = Math.floor(z + dz);
          
          if (world.isSolid(checkX, checkY, checkZ)) {
            return true;
          }
        }
      }
    }
    
    return false;
  }

  takeDamage(amount: number): void {
    this.hp -= amount;
    if (this.hp <= 0) {
      this.hp = 0;
      this.isDead = true;
    }
  }

  respawn(position: Position): void {
    this.position = { ...position };
    this.velocity = { x: 0, y: 0, z: 0 };
    this.hp = 100;
    this.isDead = false;
  }

  getState(): PlayerState {
    return {
      id: this.id,
      position: { ...this.position },
      rotation: { ...this.rotation },
      velocity: { ...this.velocity },
      hp: this.hp,
      team: this.team,
      isDead: this.isDead,
      equipment: this.equipment,
      isAiming: this.isAiming,
      isCrouching: this.isCrouching,
      isSprinting: this.isSprinting,
      isShooting: this.isShooting,
    };
  }
}
