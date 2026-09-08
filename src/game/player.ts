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
    this.position = new THREE.Vector3(0, groundY + 0.1, 0);
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
    this.position.set(spawnX, groundY + 0.1, spawnZ);
    this.velocity.set(0, 0, 0);
    this.yaw = 0;
    this.pitch = 0;
  }

  private isPointInSolid(x: number, y: number, z: number): boolean {
    const vx = Math.floor(x + 0.5);
    const vy = Math.floor(y + 0.5);
    const vz = Math.floor(z + 0.5);
    return this.world.isSolid(vx, vy, vz);
  }

  private checkCollisionAt(pos: THREE.Vector3): boolean {
    const r = this.radius;
    const h = this.currentHeight;

    const yChecks = [
      pos.y + 0.05,
      pos.y + h * 0.5,
      pos.y + h - 0.05,
    ];

    for (const cy of yChecks) {
      const points = [
        [pos.x, pos.z],
        [pos.x - r, pos.z - r],
        [pos.x + r, pos.z - r],
        [pos.x - r, pos.z + r],
        [pos.x + r, pos.z + r],
      ];
      for (const [cx, cz] of points) {
        if (this.isPointInSolid(cx, cy, cz)) return true;
      }
    }
    return false;
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

    this.velocity.y -= this.gravity * dt;
    if (this.velocity.y < -30) this.velocity.y = -30;

    const newPos = this.position.clone();

    newPos.x += this.velocity.x * dt;
    if (this.checkCollisionAt(newPos)) {
      newPos.x = this.position.x;
      this.velocity.x = 0;
    }

    newPos.z += this.velocity.z * dt;
    if (this.checkCollisionAt(newPos)) {
      newPos.z = this.position.z;
      this.velocity.z = 0;
    }

    newPos.y += this.velocity.y * dt;
    if (this.checkCollisionAt(newPos)) {
      if (this.velocity.y < 0) {
        this.isGrounded = true;
        const groundY = this.findGroundBelow(newPos.x, newPos.z);
        newPos.y = groundY + 0.01;
      } else {
        newPos.y = this.position.y;
      }
      this.velocity.y = 0;
    } else {
      const groundY = this.findGroundBelow(newPos.x, newPos.z);
      if (this.velocity.y <= 0 && newPos.y - groundY < 0.15) {
        newPos.y = groundY + 0.01;
        this.velocity.y = 0;
        this.isGrounded = true;
      } else {
        this.isGrounded = false;
      }
    }

    if (newPos.y < -10) {
      const safeY = this.world.getGroundHeight(0, 0);
      newPos.set(0, safeY + 1, 0);
      this.velocity.set(0, 0, 0);
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
