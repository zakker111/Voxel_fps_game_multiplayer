import * as THREE from 'three';
import { VoxelWorld, VOXEL_BUILT, VOXEL_SIZE } from './world';
import { Player } from './player';
import { SoundManager } from './sounds';

export type EquipmentType = 'rifle' | 'smg' | 'spade' | 'pickaxe';
type Team = 'red' | 'blue';

export interface GameState {
  hp: number;
  maxHp: number;
  equipment: EquipmentType;
  inventory: number;
  isDead: boolean;
  respawnTimer: number;
  hitMarker: boolean;
  targetInfo: string;
  message: string;
  messageTimer: number;
  buildMode: boolean;
  buildValid: boolean;
  blueKills: number;
  redKills: number;
  isAiming: boolean;
}

interface Bot {
  mesh: THREE.Group;
  position: THREE.Vector3;
  velocity: THREE.Vector3;
  hp: number;
  maxHp: number;
  isDead: boolean;
  respawnTimer: number;
  targetPos: THREE.Vector3;
  moveTimer: number;
  shootTimer: number;
  headY: number;
  grounded: boolean;
  team: Team;
  nameTag: THREE.Sprite;
  isCrouching: boolean;
  crouchTimer: number;
  behaviorState: 'patrol' | 'engage' | 'strafe' | 'crouch' | 'peek' | 'capture' | 'retreat' | 'flank' | 'jumpdodge' | 'cover';
  behaviorTimer: number;
  strafeDirection: number;
  stuckTimer: number;
  lastPos: THREE.Vector3;
  // Animation parts
  leftLeg: THREE.Mesh;
  rightLeg: THREE.Mesh;
  leftArm: THREE.Mesh;
  rightArm: THREE.Mesh;
  head: THREE.Mesh;
  walkCycle: number;
  isMoving: boolean;
  targetYaw: number;
  currentYaw: number;
  // New AI fields
  jumpCooldown: number;
  skill: number; // 0-1, affects accuracy and reaction time
  aggression: number; // 0-1, how aggressive the bot is
  lastDamageTime: number;
  dodgeTimer: number;
  coverTimer: number;
}

interface Weapon {
  fireRate: number;
  lastFired: number;
  damage: { head: number; body: number };
  spread: number;
  name: string;
}

const TEAM_COLORS: Record<Team, { body: number; accent: number; legs: number; label: string }> = {
  red: { body: 0xcc2222, accent: 0xff4444, legs: 0x661111, label: 'RED' },
  blue: { body: 0x2244cc, accent: 0x4488ff, legs: 0x112266, label: 'BLUE' },
};

const BLUE_SPAWN_Z_MIN = -60;
const BLUE_SPAWN_Z_MAX = -30;
const RED_SPAWN_Z_MIN = 30;
const RED_SPAWN_Z_MAX = 60;
const SPAWN_X_RANGE = 40;

const BLUE_FLAG_POS = { x: 0, z: -80 };
const RED_FLAG_POS = { x: 0, z: 80 };

export class Game {
  scene: THREE.Scene;
  renderer: THREE.WebGLRenderer;
  world: VoxelWorld;
  player: Player;
  bots: Bot[] = [];
  equipment: EquipmentType = 'rifle';
  inventory: number = 0;
  lastActionTime: number = 0;
  isMouseDown: boolean = false;
  highlightMesh: THREE.Mesh;
  buildPreviewMesh: THREE.Mesh;
  muzzleFlash: THREE.PointLight;
  muzzleTimer: number = 0;
  hitMarkerTimer: number = 0;
  message: string = '';
  messageTimer: number = 0;
  blueKills: number = 0;
  redKills: number = 0;
  buildMode: boolean = false;
  clock: THREE.Clock;
  onStateChange: ((state: GameState) => void) | null = null;
  canvas: HTMLCanvasElement;
  playerTeam: Team = 'blue';
  sounds: SoundManager;

  weaponModels: Map<EquipmentType, THREE.Group> = new Map();
  currentWeaponModel: THREE.Group | null = null;
  weaponContainer: THREE.Group;
  isAiming: boolean = false;
  aimTransition: number = 0;

  hipPosition: THREE.Vector3 = new THREE.Vector3(0.3, -0.25, -0.5);
  adsPosition: THREE.Vector3 = new THREE.Vector3(0, -0.15, -0.35);
  
  // Pickaxe animation
  pickaxeAnimationTime: number = 0;
  isPickaxeAnimating: boolean = false;
  pickaxeAnimationDuration: number = 0.3;
  
  // Death animation
  deathAnimations: Map<string, { mesh: THREE.Group; timer: number; startPos: THREE.Vector3 }> = new Map();
  
  gameMode: 'multiplayer' | 'singleplayer' = 'multiplayer';
  private boundResize: () => void;
  private boundMouseDown: (e: MouseEvent) => void;
  private boundMouseUp: (e: MouseEvent) => void;
  private boundWheel: (e: WheelEvent) => void;
  private boundKeyDown: (e: KeyboardEvent) => void;
  private boundKeyUp: (e: KeyboardEvent) => void;
  private boundMouseMove: (e: MouseEvent) => void;

  weapons: Record<string, Weapon> = {
    rifle: { fireRate: 0.4, lastFired: 0, damage: { head: 100, body: 34 }, spread: 0.001, name: 'Rifle' },
    smg: { fireRate: 0.1, lastFired: 0, damage: { head: 100, body: 34 }, spread: 0.04, name: 'SMG' },
  };

  constructor(canvas: HTMLCanvasElement, mode: 'multiplayer' | 'singleplayer' = 'multiplayer') {
    console.log('Game constructor called, mode:', mode);
    this.canvas = canvas;
    this.clock = new THREE.Clock();
    this.sounds = new SoundManager();
    this.gameMode = mode;

    this.scene = new THREE.Scene();
    this.scene.background = new THREE.Color(0x87CEEB);
    this.scene.fog = new THREE.Fog(0x87CEEB, 60, 150);

    this.renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    const ambient = new THREE.AmbientLight(0xffffff, 0.6);
    this.scene.add(ambient);

    const sun = new THREE.DirectionalLight(0xffffff, 0.8);
    sun.position.set(30, 50, 20);
    sun.castShadow = true;
    sun.shadow.mapSize.set(1024, 1024); // Reduced for performance
    sun.shadow.camera.left = -50;
    sun.shadow.camera.right = 50;
    sun.shadow.camera.top = 50;
    sun.shadow.camera.bottom = -50;
    sun.shadow.camera.near = 1;
    sun.shadow.camera.far = 150;
    this.scene.add(sun);

    this.world = new VoxelWorld();
    this.scene.add(this.world.mesh);

    this.addTeamZoneMarkers();

    this.player = new Player(this.world);
    const blueSpawn = this.getSafeSpawnPos('blue');
    this.player.position.copy(blueSpawn);
    // Blue team faces toward red team (positive Z direction)
    this.player.yaw = Math.PI;
    this.player.updateCamera();

    const hlGeo = new THREE.BoxGeometry(VOXEL_SIZE + 0.02, VOXEL_SIZE + 0.02, VOXEL_SIZE + 0.02);
    const hlMat = new THREE.MeshBasicMaterial({ color: 0xffffff, wireframe: true, transparent: true, opacity: 0.6 });
    this.highlightMesh = new THREE.Mesh(hlGeo, hlMat);
    this.highlightMesh.visible = false;
    this.scene.add(this.highlightMesh);

    const bpGeo = new THREE.BoxGeometry(VOXEL_SIZE * 0.95, VOXEL_SIZE * 0.95, VOXEL_SIZE * 0.95);
    const bpMat = new THREE.MeshBasicMaterial({ color: 0x00ff88, transparent: true, opacity: 0.4 });
    this.buildPreviewMesh = new THREE.Mesh(bpGeo, bpMat);
    this.buildPreviewMesh.visible = false;
    this.scene.add(this.buildPreviewMesh);

    this.muzzleFlash = new THREE.PointLight(0xffaa00, 0, 5);
    this.scene.add(this.muzzleFlash);

    this.weaponContainer = new THREE.Group();
    this.player.camera.add(this.weaponContainer);
    this.scene.add(this.player.camera);

    this.createWeaponModels();
    this.switchWeaponModel('rifle');

    // Only spawn bots in multiplayer mode
    if (this.gameMode === 'multiplayer') {
      this.spawnTeamBots('blue', 6);
      this.spawnTeamBots('red', 7);
    }

    this.boundResize = this.onResize.bind(this);
    this.boundMouseDown = this.onMouseDown.bind(this);
    this.boundMouseUp = this.onMouseUp.bind(this);
    this.boundWheel = this.onWheel.bind(this);
    this.boundKeyDown = this.onKeyDown.bind(this);
    this.boundKeyUp = this.onKeyUp.bind(this);
    this.boundMouseMove = this.onMouseMove.bind(this);

    window.addEventListener('resize', this.boundResize);
    canvas.addEventListener('mousedown', this.boundMouseDown);
    canvas.addEventListener('mouseup', this.boundMouseUp);
    canvas.addEventListener('wheel', this.boundWheel);
    document.addEventListener('keydown', this.boundKeyDown);
    document.addEventListener('keyup', this.boundKeyUp);
    document.addEventListener('mousemove', this.boundMouseMove);
    canvas.addEventListener('contextmenu', (e) => e.preventDefault());
  }

  private onResize(): void {
    this.player.camera.aspect = window.innerWidth / window.innerHeight;
    this.player.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  private isPointerLocked(): boolean {
    return document.pointerLockElement === this.canvas;
  }

  private onMouseDown(e: MouseEvent): void {
    if (!this.isPointerLocked()) return;
    if (e.button === 0) {
      this.isMouseDown = true;
      this.performAction();
    } else if (e.button === 2) {
      if (this.equipment === 'rifle' || this.equipment === 'smg') {
        this.isAiming = !this.isAiming;
        this.performAction();
      } else {
        this.buildMode = true;
        this.tryBuild();
      }
    }
  }

  private onMouseUp(e: MouseEvent): void {
    if (e.button === 0) this.isMouseDown = false;
    if (e.button === 2) this.buildMode = false;
  }

  private onWheel(e: WheelEvent): void {
    const items: EquipmentType[] = ['rifle', 'smg', 'spade', 'pickaxe'];
    const idx = items.indexOf(this.equipment);
    this.sounds.weaponSwitch();
    if (e.deltaY > 0) {
      this.equipment = items[(idx + 1) % items.length];
    } else {
      this.equipment = items[(idx - 1 + items.length) % items.length];
    }
    this.switchWeaponModel(this.equipment);
    this.isAiming = false;
    this.emitState();
  }

  private onKeyDown(e: KeyboardEvent): void {
    if (e.code === 'Digit1') { this.equipment = 'rifle'; this.sounds.weaponSwitch(); this.switchWeaponModel('rifle'); this.isAiming = false; this.emitState(); }
    if (e.code === 'Digit2') { this.equipment = 'smg'; this.sounds.weaponSwitch(); this.switchWeaponModel('smg'); this.isAiming = false; this.emitState(); }
    if (e.code === 'Digit3') { this.equipment = 'spade'; this.sounds.weaponSwitch(); this.switchWeaponModel('spade'); this.isAiming = false; this.emitState(); }
    if (e.code === 'Digit4') { this.equipment = 'pickaxe'; this.sounds.weaponSwitch(); this.switchWeaponModel('pickaxe'); this.isAiming = false; this.emitState(); }
    this.player.handleKeyDown(e.code);
  }

  private onKeyUp(e: KeyboardEvent): void {
    this.player.handleKeyUp(e.code);
  }

  private onMouseMove(e: MouseEvent): void {
    if (document.pointerLockElement) {
      this.player.handleMouseMove(e.movementX, e.movementY);
    }
  }

  requestPointerLock(canvas: HTMLCanvasElement): void {
    console.log('Requesting pointer lock...');
    canvas.requestPointerLock().then(() => {
      console.log('Pointer lock acquired');
    }).catch((err) => {
      console.error('Pointer lock failed:', err);
    });
  }

  private performAction(): void {
    if (this.player.isDead) return;
    if (!this.isPointerLocked()) return;
    const now = performance.now() / 1000;

    if (this.equipment === 'rifle' || this.equipment === 'smg') {
      this.shoot(now);
    } else if (this.equipment === 'pickaxe') {
      this.usePickaxe(now);
    } else if (this.equipment === 'spade') {
      this.useSpade(now);
    }
  }

  private shoot(now: number): void {
    const weapon = this.weapons[this.equipment];
    if (now - weapon.lastFired < weapon.fireRate) return;
    weapon.lastFired = now;

    if (this.equipment === 'rifle') this.sounds.rifleShot();
    else if (this.equipment === 'smg') this.sounds.smgShot();

    this.muzzleFlash.intensity = 3;
    this.muzzleFlash.position.copy(this.player.camera.position);
    this.muzzleTimer = 0.05;

    const dir = this.player.getAimDirection();
    
    // Offset bullet origin slightly forward to align with weapon sights
    // This simulates the bullet coming from the weapon muzzle, not the eye
    const muzzleOffset = this.isAiming ? 0.8 : 0.5;
    const origin = this.player.camera.position.clone().add(dir.clone().multiplyScalar(muzzleOffset));
    
    const spreadMultiplier = this.isAiming ? 0.3 : 1.0;
    const actualSpread = weapon.spread * spreadMultiplier;
    dir.x += (Math.random() - 0.5) * actualSpread;
    dir.y += (Math.random() - 0.5) * actualSpread;
    dir.z += (Math.random() - 0.5) * actualSpread;
    dir.normalize();

    let hitBot = false;
    let closestDist = Infinity;
    let closestBot: Bot | null = null;
    let isHeadshot = false;

    for (const bot of this.bots) {
      if (bot.isDead || bot.team === this.playerTeam) continue;

      const botCenter = bot.position.clone();
      botCenter.y += bot.headY * 0.5;

      const toBot = botCenter.clone().sub(origin);
      const dot = toBot.dot(dir);
      if (dot < 0) continue;

      const closest = origin.clone().add(dir.clone().multiplyScalar(dot));
      const dist = closest.distanceTo(botCenter);

      const headCenter = bot.position.clone();
      headCenter.y += bot.headY * (bot.isCrouching ? 0.7 : 1.0);
      const headDist = closest.distanceTo(headCenter);
      const hitHead = headDist < 0.3;
      const hitBody = dist < 0.5;

      if ((hitHead || hitBody) && dot < closestDist) {
        closestDist = dot;
        closestBot = bot;
        isHeadshot = hitHead && !hitBody;
        hitBot = true;
      }
    }

    // Check for voxel hits if no bot was hit
    if (!hitBot) {
      const voxelHit = this.world.raycast(origin, dir, 100);
      if (voxelHit) {
        const voxel = this.world.getVoxel(voxelHit.voxelPos.x, voxelHit.voxelPos.y, voxelHit.voxelPos.z);
        if (voxel) {
          const { x, y, z } = voxelHit.voxelPos;
          // Damage any voxel (not just built ones)
          const result = this.world.damageVoxel(x, y, z, 1);
          
          if (result.destroyed) {
            // Chunk automatically marked dirty by setVoxel
            this.sounds.voxelBreak();
            this.showMessage('Voxel destroyed!');
            if (result.collapsed > 0) {
              this.sounds.collapse();
              this.showMessage(`Structure collapsed! (${result.collapsed} voxels)`);
            }
          } else {
            // Fast color update (no rebuild!)
            const remaining = this.world.getVoxel(x, y, z);
            if (remaining) {
              this.world.updateVoxelColor(x, y, z, remaining.type, remaining.durability);
              this.showMessage(`Voxel damaged! (${remaining.durability}/3 HP)`);
            }
            this.sounds.voxelBreak();
          }
        }
      }
    }

    if (hitBot && closestBot) {
      const dmg = isHeadshot ? weapon.damage.head : weapon.damage.body;
      closestBot.hp -= dmg;
      this.hitMarkerTimer = 0.2;
      this.sounds.hitMarker();
      
      // Trigger dodge behavior
      closestBot.lastDamageTime = performance.now() / 1000;
      closestBot.dodgeTimer = 0.5;

      if (closestBot.hp <= 0) {
        closestBot.isDead = true;
        closestBot.respawnTimer = 8;
        
        // Start death animation instead of hiding immediately
        this.deathAnimations.set(closestBot.mesh.uuid, {
          mesh: closestBot.mesh,
          timer: 0,
          startPos: closestBot.mesh.position.clone()
        });
        
        this.blueKills++;
        this.sounds.killSound();
        this.showMessage(`Eliminated ${TEAM_COLORS[closestBot.team].label} bot! ${isHeadshot ? '🎯 HEADSHOT!' : ''}`);
      } else {
        this.showMessage(`Hit! ${closestBot.hp} HP remaining`);
      }
    }
  }

  private usePickaxe(now: number): void {
    if (now - this.lastActionTime < 0.3) return;
    this.lastActionTime = now;
    this.sounds.pickaxeHit();

    // Trigger pickaxe animation
    this.pickaxeAnimationTime = 0;
    this.isPickaxeAnimating = true;

    const dir = this.player.getAimDirection();
    const origin = this.player.camera.position.clone().add(dir.clone().multiplyScalar(0.5));
    const hit = this.world.raycast(origin, dir, 5);

    if (hit && this.world.canDig(hit.voxelPos.x, hit.voxelPos.y, hit.voxelPos.z)) {
      const { x, y, z } = hit.voxelPos;
      const result = this.world.damageVoxel(x, y, z, 1);

      if (result.destroyed) {
        // Chunk automatically marked dirty by setVoxel
        this.sounds.voxelBreak();
        this.inventory++;
        this.showMessage(`+1 voxel (Inventory: ${this.inventory})`);
        if (result.collapsed > 0) {
          this.sounds.collapse();
          this.showMessage(`Structure collapsed! (${result.collapsed} voxels)`);
        }
      } else {
        // Fast color update (no rebuild!)
        const v = this.world.getVoxel(x, y, z);
        if (v) {
          this.world.updateVoxelColor(x, y, z, v.type, v.durability);
          this.showMessage(`Durability: ${v.durability}/3`);
        }
        this.sounds.voxelBreak();
      }
    }
    this.emitState();
  }

  private useSpade(now: number): void {
    if (now - this.lastActionTime < 0.3) return;
    this.lastActionTime = now;
    this.sounds.spadeHit();

    const dir = this.player.getAimDirection();
    const origin = this.player.camera.position.clone().add(dir.clone().multiplyScalar(0.5));
    const hit = this.world.raycast(origin, dir, 5);

    if (hit) {
      let totalCollapsed = 0;
      let anyDestroyed = false;
      for (let i = 0; i < 2; i++) {
        const vx = hit.voxelPos.x + Math.round(hit.normal.x) * i;
        const vy = hit.voxelPos.y + Math.round(hit.normal.y) * i;
        const vz = hit.voxelPos.z + Math.round(hit.normal.z) * i;
        if (this.world.canDig(vx, vy, vz)) {
          const result = this.world.damageVoxel(vx, vy, vz, 3); // Spade destroys instantly
          if (result.destroyed) {
            anyDestroyed = true;
            totalCollapsed += result.collapsed;
          }
        }
      }
      if (anyDestroyed) {
        // Chunk automatically marked dirty by setVoxel
        this.sounds.voxelBreak();
        if (totalCollapsed > 0) {
          this.sounds.collapse();
          this.showMessage(`Structure collapsed! (${totalCollapsed} voxels)`);
        }
      }
    }
    this.emitState();
  }

  private tryBuild(): void {
    if (this.player.isDead) return;
    if (this.inventory <= 0) {
      this.showMessage('No voxels in inventory!');
      return;
    }

    const dir = this.player.getAimDirection();
    const origin = this.player.camera.position.clone().add(dir.clone().multiplyScalar(0.5));
    const hit = this.world.raycast(origin, dir, 6);

    if (hit) {
      const px = hit.voxelPos.x + Math.round(hit.normal.x);
      const py = hit.voxelPos.y + Math.round(hit.normal.y);
      const pz = hit.voxelPos.z + Math.round(hit.normal.z);

      if (!this.world.isSolid(px, py, pz) && this.world.canBuild(px, py, pz)) {
        const voxelCenter = new THREE.Vector3(px + 0.5, py + 0.5, pz + 0.5);
        const playerMin = this.player.position.clone().sub(new THREE.Vector3(this.player.radius, 0, this.player.radius));
        const playerMax = this.player.position.clone().add(new THREE.Vector3(this.player.radius, this.player.currentHeight, this.player.radius));

        if (voxelCenter.x >= playerMin.x && voxelCenter.x <= playerMax.x &&
            voxelCenter.y >= playerMin.y && voxelCenter.y <= playerMax.y &&
            voxelCenter.z >= playerMin.z && voxelCenter.z <= playerMax.z) {
          this.showMessage('Cannot build here (in the way)');
          return;
        }

        this.world.setVoxel(px, py, pz, VOXEL_BUILT, 3);
        this.inventory--;
        // Chunk automatically marked dirty by setVoxel
        this.sounds.buildPlace();
        this.showMessage(`Built! (Inventory: ${this.inventory})`);
      } else if (this.world.isSolid(px, py, pz)) {
        this.showMessage('Position occupied');
      } else {
        this.showMessage('Build limit reached (20 blocks up)');
      }
    }
    this.emitState();
  }

  private showMessage(msg: string): void {
    this.message = msg;
    this.messageTimer = 2;
  }

  private getSafeSpawnPos(team: Team): THREE.Vector3 {
    const zMin = team === 'blue' ? BLUE_SPAWN_Z_MIN : RED_SPAWN_Z_MIN;
    const zMax = team === 'blue' ? BLUE_SPAWN_Z_MAX : RED_SPAWN_Z_MAX;

    for (let attempt = 0; attempt < 20; attempt++) {
      const x = (Math.random() - 0.5) * SPAWN_X_RANGE * 2;
      const z = zMin + Math.random() * (zMax - zMin);
      const groundY = this.world.getGroundHeight(x, z);

      const ix = Math.floor(x + 0.5);
      const iz = Math.floor(z + 0.5);
      const iyFeet = Math.floor(groundY + 0.5);
      const iyHead = Math.floor(groundY + 1.7 + 0.5);

      if (!this.world.isSolid(ix, iyFeet, iz) && !this.world.isSolid(ix, iyHead, iz)) {
        return new THREE.Vector3(x, groundY + 0.05, z);
      }
    }
    const fallbackZ = team === 'blue' ? -15 : 15;
    const fallbackGround = this.world.getGroundHeight(0, fallbackZ);
    return new THREE.Vector3(0, fallbackGround + 2, fallbackZ);
  }

  private spawnTeamBots(team: Team, count: number): void {
    const botNames = team === 'blue'
      ? ['Alpha', 'Bravo', 'Charlie', 'Delta', 'Echo', 'Foxtrot']
      : ['Viper', 'Cobra', 'Shadow', 'Hawk', 'Raven', 'Ghost', 'Phantom'];

    for (let i = 0; i < count; i++) {
      const pos = this.getSafeSpawnPos(team);
      const { group, leftLeg, rightLeg, leftArm, rightArm, head } = this.createBotMesh(team);
      group.position.copy(pos);
      // Set initial facing direction based on team
      // Blue team faces toward red team (positive Z), Red team faces toward blue team (negative Z)
      const initialYaw = team === 'blue' ? Math.PI : 0;
      group.rotation.y = initialYaw;
      this.scene.add(group);

      const nameTag = this.createNameTag(team, botNames[i] || `Bot${i}`);
      nameTag.position.y = 2.6;
      group.add(nameTag);

      this.bots.push({
        mesh: group,
        position: pos.clone(),
        velocity: new THREE.Vector3(),
        hp: 100,
        maxHp: 100,
        isDead: false,
        respawnTimer: 0,
        targetPos: pos.clone(),
        moveTimer: 2 + Math.random() * 3,
        shootTimer: 2 + Math.random() * 3,
        headY: 1.8,
        grounded: false,
        team,
        nameTag,
        isCrouching: false,
        crouchTimer: 0,
        behaviorState: 'patrol',
        leftLeg,
        rightLeg,
        leftArm,
        rightArm,
        head,
        walkCycle: Math.random() * Math.PI * 2,
        isMoving: false,
        targetYaw: team === 'blue' ? Math.PI : 0,
        currentYaw: team === 'blue' ? Math.PI : 0,
        behaviorTimer: 3 + Math.random() * 4,
        strafeDirection: Math.random() > 0.5 ? 1 : -1,
        stuckTimer: 0,
        lastPos: pos.clone(),
        // New AI fields
        jumpCooldown: 0,
        skill: 0.5 + Math.random() * 0.5, // 0.5-1.0 skill level
        aggression: 0.4 + Math.random() * 0.6, // 0.4-1.0 aggression
        lastDamageTime: 0,
        dodgeTimer: 0,
        coverTimer: 0,
      });
    }
  }

  private createBotMesh(team: Team): { group: THREE.Group; leftLeg: THREE.Mesh; rightLeg: THREE.Mesh; leftArm: THREE.Mesh; rightArm: THREE.Mesh; head: THREE.Mesh } {
    const colors = TEAM_COLORS[team];
    const group = new THREE.Group();

    const bodyGeo = new THREE.BoxGeometry(0.6, 0.8, 0.4);
    const bodyMat = new THREE.MeshLambertMaterial({ color: colors.body });
    const body = new THREE.Mesh(bodyGeo, bodyMat);
    body.position.y = 1.1;
    group.add(body);

    const headGeo = new THREE.BoxGeometry(0.4, 0.4, 0.4);
    const headMat = new THREE.MeshLambertMaterial({ color: 0xffdbac });
    const head = new THREE.Mesh(headGeo, headMat);
    head.position.y = 1.8;
    group.add(head);

    const helmetGeo = new THREE.BoxGeometry(0.45, 0.2, 0.45);
    const helmetMat = new THREE.MeshLambertMaterial({ color: colors.accent });
    const helmet = new THREE.Mesh(helmetGeo, helmetMat);
    helmet.position.y = 2.05;
    group.add(helmet);

    // Legs with pivot point at hip for animation
    const legGeo = new THREE.BoxGeometry(0.2, 0.6, 0.25);
    const legMat = new THREE.MeshLambertMaterial({ color: colors.legs });
    const leftLeg = new THREE.Mesh(legGeo, legMat);
    leftLeg.position.set(-0.15, 0.3, 0);
    group.add(leftLeg);

    const rightLeg = new THREE.Mesh(legGeo, legMat);
    rightLeg.position.set(0.15, 0.3, 0);
    group.add(rightLeg);

    // Arms with pivot at shoulder
    const armGeo = new THREE.BoxGeometry(0.18, 0.6, 0.2);
    const armMat = new THREE.MeshLambertMaterial({ color: colors.body });
    const leftArm = new THREE.Mesh(armGeo, armMat);
    leftArm.position.set(-0.4, 1.1, 0);
    group.add(leftArm);

    const rightArm = new THREE.Mesh(armGeo, armMat);
    rightArm.position.set(0.4, 1.1, 0);
    group.add(rightArm);

    // Weapon - more visible and realistic
    const weaponGroup = new THREE.Group();
    
    // Main barrel
    const wBarrelGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.6, 8);
    const wBarrelMat = new THREE.MeshLambertMaterial({ color: 0x1a1a1a });
    const wBarrel = new THREE.Mesh(wBarrelGeo, wBarrelMat);
    wBarrel.rotation.x = Math.PI / 2;
    wBarrel.position.set(0, 0, -0.3);
    weaponGroup.add(wBarrel);
    
    // Receiver
    const wReceiverGeo = new THREE.BoxGeometry(0.12, 0.1, 0.25);
    const wReceiverMat = new THREE.MeshLambertMaterial({ color: 0x2a2a2a });
    const wReceiver = new THREE.Mesh(wReceiverGeo, wReceiverMat);
    wReceiver.position.set(0, 0, 0);
    weaponGroup.add(wReceiver);
    
    // Stock
    const wStockGeo = new THREE.BoxGeometry(0.08, 0.12, 0.2);
    const wStockMat = new THREE.MeshLambertMaterial({ color: 0x4a3520 });
    const wStock = new THREE.Mesh(wStockGeo, wStockMat);
    wStock.position.set(0, -0.02, 0.2);
    weaponGroup.add(wStock);
    
    // Magazine
    const wMagGeo = new THREE.BoxGeometry(0.06, 0.15, 0.08);
    const wMagMat = new THREE.MeshLambertMaterial({ color: 0x1a1a1a });
    const wMag = new THREE.Mesh(wMagGeo, wMagMat);
    wMag.position.set(0, -0.12, 0);
    weaponGroup.add(wMag);
    
    weaponGroup.position.set(0.45, 1.1, -0.2);
    group.add(weaponGroup);

    return { group, leftLeg, rightLeg, leftArm, rightArm, head };
  }

  private createNameTag(team: Team, name: string): THREE.Sprite {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 64;
    const ctx = canvas.getContext('2d')!;
    ctx.fillStyle = team === 'blue' ? '#4488ff' : '#ff4444';
    ctx.font = 'bold 32px Arial';
    ctx.textAlign = 'center';
    ctx.fillText(name, 128, 40);

    const texture = new THREE.CanvasTexture(canvas);
    const mat = new THREE.SpriteMaterial({ map: texture, transparent: true });
    const sprite = new THREE.Sprite(mat);
    sprite.scale.set(2, 0.5, 1);
    return sprite;
  }

  private createWeaponModels(): void {
    // Rifle - WW2 bolt action with iron sights
    const rifle = new THREE.Group();

    const rifleBody = new THREE.Mesh(
      new THREE.BoxGeometry(0.06, 0.06, 0.45),
      new THREE.MeshLambertMaterial({ color: 0x2a2a2a })
    );
    rifleBody.position.set(0, 0, -0.1);
    rifle.add(rifleBody);

    const rifleBarrel = new THREE.Mesh(
      new THREE.CylinderGeometry(0.015, 0.015, 0.5, 8),
      new THREE.MeshLambertMaterial({ color: 0x1a1a1a })
    );
    rifleBarrel.rotation.x = Math.PI / 2;
    rifleBarrel.position.set(0, 0.01, -0.55);
    rifle.add(rifleBarrel);

    const rifleStock = new THREE.Mesh(
      new THREE.BoxGeometry(0.06, 0.1, 0.25),
      new THREE.MeshLambertMaterial({ color: 0x5c3a1e })
    );
    rifleStock.position.set(0, -0.02, 0.22);
    rifle.add(rifleStock);

    // Iron sights
    const rearSight = new THREE.Mesh(
      new THREE.BoxGeometry(0.03, 0.025, 0.01),
      new THREE.MeshLambertMaterial({ color: 0x111111 })
    );
    rearSight.position.set(0, 0.055, 0.05);
    rifle.add(rearSight);

    const frontSight = new THREE.Mesh(
      new THREE.BoxGeometry(0.015, 0.03, 0.01),
      new THREE.MeshLambertMaterial({ color: 0x111111 })
    );
    frontSight.position.set(0, 0.055, -0.45);
    rifle.add(frontSight);

    const rifleMag = new THREE.Mesh(
      new THREE.BoxGeometry(0.04, 0.06, 0.1),
      new THREE.MeshLambertMaterial({ color: 0x2a2a2a })
    );
    rifleMag.position.set(0, -0.06, -0.05);
    rifle.add(rifleMag);

    rifle.position.copy(this.hipPosition);
    this.weaponModels.set('rifle', rifle);

    // SMG - WW2 Thompson style with iron sights
    const smg = new THREE.Group();

    const smgBody = new THREE.Mesh(
      new THREE.BoxGeometry(0.07, 0.07, 0.25),
      new THREE.MeshLambertMaterial({ color: 0x2a2a2a })
    );
    smgBody.position.set(0, 0, -0.05);
    smg.add(smgBody);

    const smgBarrel = new THREE.Mesh(
      new THREE.CylinderGeometry(0.015, 0.015, 0.25, 8),
      new THREE.MeshLambertMaterial({ color: 0x1a1a1a })
    );
    smgBarrel.rotation.x = Math.PI / 2;
    smgBarrel.position.set(0, 0.01, -0.3);
    smg.add(smgBarrel);

    const smgStock = new THREE.Mesh(
      new THREE.BoxGeometry(0.05, 0.08, 0.12),
      new THREE.MeshLambertMaterial({ color: 0x5c3a1e })
    );
    smgStock.position.set(0, -0.01, 0.15);
    smg.add(smgStock);

    // Iron sights
    const smgRearSight = new THREE.Mesh(
      new THREE.BoxGeometry(0.025, 0.02, 0.01),
      new THREE.MeshLambertMaterial({ color: 0x111111 })
    );
    smgRearSight.position.set(0, 0.055, 0.0);
    smg.add(smgRearSight);

    const smgFrontSight = new THREE.Mesh(
      new THREE.BoxGeometry(0.012, 0.025, 0.01),
      new THREE.MeshLambertMaterial({ color: 0x111111 })
    );
    smgFrontSight.position.set(0, 0.055, -0.25);
    smg.add(smgFrontSight);

    const smgMag = new THREE.Mesh(
      new THREE.CylinderGeometry(0.035, 0.035, 0.12, 8),
      new THREE.MeshLambertMaterial({ color: 0x1a1a1a })
    );
    smgMag.position.set(0, -0.1, 0.02);
    smg.add(smgMag);

    const smgGrip = new THREE.Mesh(
      new THREE.BoxGeometry(0.04, 0.08, 0.04),
      new THREE.MeshLambertMaterial({ color: 0x5c3a1e })
    );
    smgGrip.position.set(0, -0.08, 0.08);
    smg.add(smgGrip);

    smg.position.copy(this.hipPosition);
    this.weaponModels.set('smg', smg);

    // Spade
    const spade = new THREE.Group();
    const spadeHandle = new THREE.Mesh(
      new THREE.CylinderGeometry(0.02, 0.02, 0.5, 8),
      new THREE.MeshLambertMaterial({ color: 0x6b4423 })
    );
    spadeHandle.position.set(0, 0, -0.2);
    spade.add(spadeHandle);

    const spadeBlade = new THREE.Mesh(
      new THREE.BoxGeometry(0.15, 0.02, 0.2),
      new THREE.MeshLambertMaterial({ color: 0x888888 })
    );
    spadeBlade.position.set(0, -0.25, -0.45);
    spadeBlade.rotation.x = -0.3;
    spade.add(spadeBlade);

    spade.position.copy(this.hipPosition);
    this.weaponModels.set('spade', spade);

    // Pickaxe
    const pickaxe = new THREE.Group();
    const pickHandle = new THREE.Mesh(
      new THREE.CylinderGeometry(0.02, 0.02, 0.5, 8),
      new THREE.MeshLambertMaterial({ color: 0x6b4423 })
    );
    pickHandle.position.set(0, 0, -0.2);
    pickaxe.add(pickHandle);

    const pickHead = new THREE.Mesh(
      new THREE.BoxGeometry(0.25, 0.04, 0.04),
      new THREE.MeshLambertMaterial({ color: 0x666666 })
    );
    pickHead.position.set(0, 0.25, -0.45);
    pickaxe.add(pickHead);

    pickaxe.position.copy(this.hipPosition);
    this.weaponModels.set('pickaxe', pickaxe);
  }

  private switchWeaponModel(type: EquipmentType): void {
    if (this.currentWeaponModel) {
      this.weaponContainer.remove(this.currentWeaponModel);
    }
    const newWeapon = this.weaponModels.get(type);
    if (newWeapon) {
      this.weaponContainer.add(newWeapon);
      this.currentWeaponModel = newWeapon;
      newWeapon.position.copy(this.hipPosition);
    }
  }

  private addTeamZoneMarkers(): void {
    const blueMarkerGeo = new THREE.PlaneGeometry(100, 60);
    const blueMarkerMat = new THREE.MeshBasicMaterial({ color: 0x2244cc, transparent: true, opacity: 0.05, side: THREE.DoubleSide });
    const blueMarker = new THREE.Mesh(blueMarkerGeo, blueMarkerMat);
    blueMarker.rotation.x = -Math.PI / 2;
    blueMarker.position.set(0, this.world.getOriginalGroundLevel() + 0.02, -45);
    this.scene.add(blueMarker);

    const redMarkerGeo = new THREE.PlaneGeometry(100, 60);
    const redMarkerMat = new THREE.MeshBasicMaterial({ color: 0xcc2222, transparent: true, opacity: 0.05, side: THREE.DoubleSide });
    const redMarker = new THREE.Mesh(redMarkerGeo, redMarkerMat);
    redMarker.rotation.x = -Math.PI / 2;
    redMarker.position.set(0, this.world.getOriginalGroundLevel() + 0.02, 45);
    this.scene.add(redMarker);

    this.addTeamFlag(BLUE_FLAG_POS.x, BLUE_FLAG_POS.z, 0x2244cc, 'BLUE BASE');
    this.addTeamFlag(RED_FLAG_POS.x, RED_FLAG_POS.z, 0xcc2222, 'RED BASE');
  }

  private addTeamFlag(x: number, z: number, color: number, _label: string): void {
    const groundY = this.world.getGroundHeight(x, z);
    const poleGeo = new THREE.CylinderGeometry(0.05, 0.05, 4, 6);
    const poleMat = new THREE.MeshLambertMaterial({ color: 0x888888 });
    const pole = new THREE.Mesh(poleGeo, poleMat);
    pole.position.set(x, groundY + 2, z);
    pole.castShadow = true;
    this.scene.add(pole);

    const flagGeo = new THREE.PlaneGeometry(1.5, 1);
    const flagMat = new THREE.MeshLambertMaterial({ color, side: THREE.DoubleSide });
    const flag = new THREE.Mesh(flagGeo, flagMat);
    flag.position.set(x + 0.8, groundY + 3.5, z);
    this.scene.add(flag);
  }

  private findNearestEnemy(bot: Bot): { pos: THREE.Vector3; isPlayer: boolean; bot?: Bot } | null {
    let nearest: { pos: THREE.Vector3; isPlayer: boolean; bot?: Bot } | null = null;
    let nearestDist = Infinity;

    if (bot.team !== this.playerTeam && !this.player.isDead) {
      const dist = bot.position.distanceTo(this.player.position);
      if (dist < nearestDist) {
        nearestDist = dist;
        nearest = { pos: this.player.position.clone(), isPlayer: true };
      }
    }

    for (const other of this.bots) {
      if (other.isDead || other.team === bot.team) continue;
      const dist = bot.position.distanceTo(other.position);
      if (dist < nearestDist) {
        nearestDist = dist;
        nearest = { pos: other.position.clone(), isPlayer: false, bot: other };
      }
    }

    return nearest;
  }

  private botCanMoveTo(x: number, z: number, botY: number): boolean {
    const bx = Math.floor(x + 0.5);
    const bz = Math.floor(z + 0.5);
    const bodyY = Math.floor(botY + 0.5);
    const headY = Math.floor(botY + 1.5);

    if (this.world.isSolid(bx, bodyY, bz)) return false;
    if (this.world.isSolid(bx, headY, bz)) return false;

    return true;
  }

  private updateBots(dt: number): void {
    for (const bot of this.bots) {
      if (bot.isDead) {
        bot.respawnTimer -= dt;
        if (bot.respawnTimer <= 0) {
          bot.isDead = false;
          bot.hp = bot.maxHp;
          const spawnPos = this.getSafeSpawnPos(bot.team);
          bot.position.copy(spawnPos);
          bot.mesh.visible = true;
          bot.mesh.position.copy(bot.position);
          // Reset rotation and scale from death animation
          // Set initial facing direction based on team
          const respawnYaw = bot.team === 'blue' ? Math.PI : 0;
          bot.mesh.rotation.set(0, respawnYaw, 0);
          bot.mesh.scale.set(1, 1, 1);
          bot.targetYaw = respawnYaw;
          bot.currentYaw = respawnYaw;
          bot.velocity.set(0, 0, 0);
          bot.isCrouching = false;
          bot.behaviorState = 'patrol';
          bot.jumpCooldown = 0;
        }
        continue;
      }

      const enemyTarget = this.findNearestEnemy(bot);
      const distToEnemy = enemyTarget ? bot.position.distanceTo(enemyTarget.pos) : Infinity;
      const hpPercent = bot.hp / bot.maxHp;

      // Update cooldowns
      bot.jumpCooldown = Math.max(0, bot.jumpCooldown - dt);
      bot.dodgeTimer = Math.max(0, bot.dodgeTimer - dt);

      // Detect stuck
      const moveDist = bot.position.distanceTo(bot.lastPos);
      if (moveDist < 0.01) {
        bot.stuckTimer += dt;
      } else {
        bot.stuckTimer = 0;
      }
      bot.lastPos.copy(bot.position);

      if (bot.stuckTimer > 1.0) {
        // Jump when stuck
        if (bot.grounded && bot.jumpCooldown <= 0) {
          bot.velocity.y = 8;
          bot.jumpCooldown = 2;
        }
        bot.stuckTimer = 0;
        bot.behaviorState = 'capture';
        bot.moveTimer = 0;
      }

      bot.behaviorTimer -= dt;
      bot.moveTimer -= dt;

      // SMART DECISION MAKING
      if (bot.behaviorTimer <= 0) {
        bot.behaviorTimer = 1.5 + Math.random() * 2;

        // RETREAT when low HP
        if (hpPercent < 0.3 && enemyTarget && distToEnemy < 20) {
          bot.behaviorState = 'retreat';
          bot.behaviorTimer = 2 + Math.random() * 2;
        }
        // JUMP DODGE when being shot at
        else if (bot.dodgeTimer > 0 && bot.grounded && bot.jumpCooldown <= 0) {
          bot.behaviorState = 'jumpdodge';
          bot.behaviorTimer = 0.5;
        }
        // COMBAT BEHAVIORS
        else if (enemyTarget && distToEnemy < 15) {
          const roll = Math.random();
          if (roll < 0.4 * bot.aggression) {
            // Aggressive strafing
            bot.behaviorState = 'strafe';
            bot.strafeDirection = Math.random() > 0.5 ? 1 : -1;
            bot.behaviorTimer = 1 + Math.random() * 2;
          } else if (roll < 0.6) {
            // Flank the enemy
            bot.behaviorState = 'flank';
            bot.behaviorTimer = 2 + Math.random() * 2;
          } else if (roll < 0.75) {
            // Take cover
            bot.behaviorState = 'cover';
            bot.coverTimer = 1 + Math.random() * 1.5;
            bot.behaviorTimer = bot.coverTimer;
          } else if (roll < 0.9) {
            // Quick peek
            bot.behaviorState = 'peek';
            bot.crouchTimer = 0.3 + Math.random() * 0.5;
            bot.behaviorTimer = 0.5 + Math.random() * 0.5;
          } else {
            // Jump and strafe
            bot.behaviorState = 'jumpdodge';
            bot.behaviorTimer = 0.8;
          }
        }
        // MEDIUM RANGE
        else if (enemyTarget && distToEnemy < 35) {
          const roll = Math.random();
          if (roll < 0.35 * bot.aggression) {
            // Engage aggressively
            bot.behaviorState = 'engage';
            bot.behaviorTimer = 1.5 + Math.random() * 2;
          } else if (roll < 0.6) {
            // Strafe and shoot
            bot.behaviorState = 'strafe';
            bot.strafeDirection = Math.random() > 0.5 ? 1 : -1;
            bot.behaviorTimer = 2 + Math.random() * 2;
          } else if (roll < 0.75) {
            // Take cover
            bot.behaviorState = 'cover';
            bot.coverTimer = 1.5 + Math.random() * 2;
            bot.behaviorTimer = bot.coverTimer;
          } else if (roll < 0.9) {
            // Flank
            bot.behaviorState = 'flank';
            bot.behaviorTimer = 2 + Math.random() * 3;
          } else {
            // Capture objective
            bot.behaviorState = 'capture';
            bot.behaviorTimer = 3 + Math.random() * 2;
          }
        }
        // NO ENEMY - CAPTURE OBJECTIVE
        else {
          bot.behaviorState = 'capture';
          bot.behaviorTimer = 3 + Math.random() * 3;
        }
      }

      // EXECUTE BEHAVIOR
      switch (bot.behaviorState) {
        case 'patrol':
        case 'capture': {
          bot.isCrouching = false;
          if (bot.moveTimer <= 0) {
            bot.moveTimer = 1.5 + Math.random() * 2;
            const flagPos = bot.team === 'blue' ? RED_FLAG_POS : BLUE_FLAG_POS;
            const offset = bot.behaviorState === 'capture' ? 0.3 : 0;
            bot.targetPos.set(
              flagPos.x + (Math.random() - 0.5) * 40 * (1 - offset),
              bot.position.y,
              flagPos.z + (Math.random() - 0.5) * 30 * (1 - offset)
            );
          }
          break;
        }

        case 'engage':
          bot.isCrouching = false;
          if (enemyTarget && distToEnemy > 6) {
            bot.targetPos.copy(enemyTarget.pos);
          }
          break;

        case 'strafe':
          bot.isCrouching = false;
          if (enemyTarget) {
            const toEnemy = enemyTarget.pos.clone().sub(bot.position);
            const perpX = -toEnemy.z * bot.strafeDirection;
            const perpZ = toEnemy.x * bot.strafeDirection;
            bot.targetPos.set(
              bot.position.x + perpX * 0.8,
              bot.position.y,
              bot.position.z + perpZ * 0.8
            );
            // Jump while strafing sometimes
            if (bot.grounded && bot.jumpCooldown <= 0 && Math.random() < 0.02) {
              bot.velocity.y = 7;
              bot.jumpCooldown = 1.5;
            }
          }
          break;

        case 'flank':
          bot.isCrouching = false;
          if (enemyTarget) {
            // Move to side of enemy
            const toEnemy = enemyTarget.pos.clone().sub(bot.position);
            const flankAngle = Math.PI / 2 * (bot.strafeDirection > 0 ? 1 : -1);
            const flankX = Math.cos(flankAngle) * toEnemy.x - Math.sin(flankAngle) * toEnemy.z;
            const flankZ = Math.sin(flankAngle) * toEnemy.x + Math.cos(flankAngle) * toEnemy.z;
            bot.targetPos.set(
              enemyTarget.pos.x + flankX * 0.5,
              bot.position.y,
              enemyTarget.pos.z + flankZ * 0.5
            );
          }
          break;

        case 'retreat':
          bot.isCrouching = false;
          if (enemyTarget) {
            // Move away from enemy
            const awayFromEnemy = bot.position.clone().sub(enemyTarget.pos).normalize();
            bot.targetPos.set(
              bot.position.x + awayFromEnemy.x * 10,
              bot.position.y,
              bot.position.z + awayFromEnemy.z * 10
            );
            // Jump while retreating
            if (bot.grounded && bot.jumpCooldown <= 0 && Math.random() < 0.03) {
              bot.velocity.y = 8;
              bot.jumpCooldown = 1.5;
            }
          }
          break;

        case 'peek':
          bot.crouchTimer -= dt;
          bot.isCrouching = bot.crouchTimer > 0.2;
          if (bot.crouchTimer <= 0) {
            bot.behaviorState = 'strafe';
            bot.isCrouching = false;
            bot.strafeDirection = Math.random() > 0.5 ? 1 : -1;
          }
          bot.targetPos.copy(bot.position);
          break;

        case 'jumpdodge':
          bot.isCrouching = false;
          bot.dodgeTimer = 0;
          if (enemyTarget) {
            // Dodge perpendicular to enemy
            const toEnemy = enemyTarget.pos.clone().sub(bot.position);
            const dodgeX = -toEnemy.z * (Math.random() > 0.5 ? 1 : -1);
            const dodgeZ = toEnemy.x * (Math.random() > 0.5 ? 1 : -1);
            bot.targetPos.set(
              bot.position.x + dodgeX * 0.5,
              bot.position.y,
              bot.position.z + dodgeZ * 0.5
            );
            // Jump!
            if (bot.grounded && bot.jumpCooldown <= 0) {
              bot.velocity.y = 9;
              bot.jumpCooldown = 1;
            }
          }
          break;
          
        case 'cover':
          bot.coverTimer -= dt;
          bot.isCrouching = true;
          if (bot.coverTimer <= 0) {
            // Time to peek out and shoot
            bot.behaviorState = 'peek';
            bot.crouchTimer = 0.5 + Math.random() * 0.5;
            bot.isCrouching = false;
          } else {
            // Stay in cover, maybe move slightly
            if (Math.random() < 0.01 && bot.grounded && bot.jumpCooldown <= 0) {
              // Quick jump to reposition
              bot.velocity.y = 6;
              bot.jumpCooldown = 2;
            }
          }
          bot.targetPos.copy(bot.position);
          break;
      }

      // MOVEMENT
      const toTarget = bot.targetPos.clone().sub(bot.position);
      toTarget.y = 0;
      const distToTarget = toTarget.length();
      
      if (distToTarget > 0.5) {
        toTarget.normalize();
        // FASTER SPEED: 10 units/sec normal, 5 when crouching
        const speed = bot.isCrouching ? 5 : 10;
        const newX = bot.position.x + toTarget.x * speed * dt;
        const newZ = bot.position.z + toTarget.z * speed * dt;

        bot.isMoving = true;
        
        if (this.botCanMoveTo(newX, bot.position.z, bot.position.y)) {
          bot.position.x = newX;
        } else if (bot.grounded && bot.jumpCooldown <= 0) {
          // Jump over obstacle
          bot.velocity.y = 8;
          bot.jumpCooldown = 1.5;
        }
        
        if (this.botCanMoveTo(bot.position.x, newZ, bot.position.y)) {
          bot.position.z = newZ;
        }

        // Set target yaw based on situation
        if (enemyTarget && distToEnemy < 40) {
          const toEnemy = enemyTarget.pos.clone().sub(bot.position);
          bot.targetYaw = Math.atan2(toEnemy.x, toEnemy.z);
        } else {
          bot.targetYaw = Math.atan2(toTarget.x, toTarget.z);
        }
      } else {
        bot.isMoving = false;
        if (enemyTarget && distToEnemy < 40) {
          const toEnemy = enemyTarget.pos.clone().sub(bot.position);
          bot.targetYaw = Math.atan2(toEnemy.x, toEnemy.z);
        }
      }

      // GRAVITY & GROUND
      const groundY = this.world.getGroundHeight(bot.position.x, bot.position.z);
      if (bot.position.y > groundY + 0.1) {
        bot.velocity.y -= 20 * dt;
        bot.position.y += bot.velocity.y * dt;
        if (bot.position.y <= groundY) {
          bot.position.y = groundY;
          bot.velocity.y = 0;
          bot.grounded = true;
        }
      } else {
        bot.position.y = groundY;
        bot.velocity.y = 0;
        bot.grounded = true;
      }

      if (bot.position.y < -10) {
        bot.isDead = true;
        bot.respawnTimer = 2;
        bot.mesh.visible = false;
        continue;
      }

      // SHOOTING - MUCH BETTER ACCURACY
      bot.shootTimer -= dt;
      if (bot.shootTimer <= 0 && enemyTarget) {
        const dist = bot.position.distanceTo(enemyTarget.pos);
        if (dist < 50) {
          // Faster shooting, better accuracy
          bot.shootTimer = 0.6 + Math.random() * 1.5;

          // Base accuracy: 25% (up from 15%)
          let accuracy = 0.25;
          
          // Skill modifier
          accuracy *= (0.7 + bot.skill * 0.6); // 0.7-1.3x based on skill
          
          // Crouching bonus
          if (bot.isCrouching) accuracy *= 1.4;
          
          // Distance modifiers
          if (dist < 15) accuracy *= 1.3; // Close range bonus
          else if (dist < 25) accuracy *= 1.1; // Medium range
          else if (dist > 40) accuracy *= 0.7; // Long range penalty
          
          // Movement penalty
          if (bot.isMoving && !bot.grounded) accuracy *= 0.6; // Jumping penalty
          else if (bot.isMoving) accuracy *= 0.85; // Moving penalty

          const willHit = Math.random() < accuracy;

          if (willHit && enemyTarget.isPlayer) {
            const isHeadshot = Math.random() < 0.25; // 25% headshot chance
            const damage = isHeadshot ? 100 : 34;
            this.player.takeDamage(damage);
            // Mark player as recently damaged for dodge behavior
            if (this.player) {
              // We can't directly set lastDamageTime on player, but we track it
            }
            if (this.player.isDead) {
              this.redKills++;
              this.sounds.death();
              this.showMessage('You were eliminated by ' + TEAM_COLORS[bot.team].label + ' team!');
            }
          } else if (willHit && enemyTarget.bot) {
            const isHeadshot = Math.random() < 0.25;
            const damage = isHeadshot ? 100 : 34;
            enemyTarget.bot.hp -= damage;
            enemyTarget.bot.lastDamageTime = performance.now() / 1000;
            enemyTarget.bot.dodgeTimer = 0.5; // Trigger dodge
            if (enemyTarget.bot.hp <= 0) {
              enemyTarget.bot.isDead = true;
              enemyTarget.bot.respawnTimer = 8;
              enemyTarget.bot.mesh.visible = false;
              if (bot.team === 'blue') this.blueKills++;
              else this.redKills++;
            }
          }
        } else {
          bot.shootTimer = 0.3;
        }
      }

      // VISUAL UPDATES
      bot.mesh.position.copy(bot.position);
      
      // Crouch visual
      const targetScale = bot.isCrouching ? 0.7 : 1.0;
      const currentScale = bot.mesh.scale.y;
      bot.mesh.scale.y = currentScale + (targetScale - currentScale) * 0.2;
      bot.mesh.position.y = bot.position.y + (bot.isCrouching ? -0.3 : 0);
      
      // Smooth rotation
      const yawDiff = bot.targetYaw - bot.currentYaw;
      const normalizedDiff = Math.atan2(Math.sin(yawDiff), Math.cos(yawDiff));
      bot.currentYaw += normalizedDiff * Math.min(dt * 10, 1); // Faster rotation
      bot.mesh.rotation.y = bot.currentYaw;
      
      // Walking animation
      if (bot.isMoving && bot.grounded) {
        bot.walkCycle += dt * (bot.isCrouching ? 8 : 12); // Faster animation
        const swing = Math.sin(bot.walkCycle) * 0.6; // Bigger swing
        
        bot.leftLeg.rotation.x = swing;
        bot.rightLeg.rotation.x = -swing;
        bot.leftArm.rotation.x = -swing * 0.8;
        bot.rightArm.rotation.x = swing * 0.8;
        
        const bob = Math.abs(Math.sin(bot.walkCycle * 2)) * 0.08;
        bot.mesh.position.y += bob;
      } else {
        bot.leftLeg.rotation.x *= 0.9;
        bot.rightLeg.rotation.x *= 0.9;
        bot.leftArm.rotation.x *= 0.9;
        bot.rightArm.rotation.x *= 0.9;
      }
      
      // Head tracking
      if (enemyTarget && distToEnemy < 45) {
        const toEnemy = enemyTarget.pos.clone().sub(bot.position);
        const headYaw = Math.atan2(toEnemy.x, toEnemy.z) - bot.currentYaw;
        const normalizedHeadYaw = Math.atan2(Math.sin(headYaw), Math.cos(headYaw));
        const clampedHeadYaw = Math.max(-1.05, Math.min(1.05, normalizedHeadYaw));
        bot.head.rotation.y = bot.head.rotation.y + (clampedHeadYaw - bot.head.rotation.y) * Math.min(dt * 8, 1);
      } else {
        bot.head.rotation.y *= 0.95;
      }
    }
  }

  private updateHighlight(): void {
    if (this.player.isDead) {
      this.highlightMesh.visible = false;
      this.buildPreviewMesh.visible = false;
      return;
    }

    const dir = this.player.getAimDirection();
    const origin = this.player.camera.position.clone().add(dir.clone().multiplyScalar(0.5));
    const hit = this.world.raycast(origin, dir, 8);

    if (hit) {
      if (this.equipment === 'rifle' || this.equipment === 'smg') {
        this.highlightMesh.visible = false;
        this.buildPreviewMesh.visible = false;
      } else {
        this.highlightMesh.visible = true;
        this.highlightMesh.position.set(hit.voxelPos.x, hit.voxelPos.y, hit.voxelPos.z);
        this.buildPreviewMesh.visible = false;
      }

      const dist = hit.distance.toFixed(1);
      const v = this.world.getVoxel(hit.voxelPos.x, hit.voxelPos.y, hit.voxelPos.z);
      if (v) {
        const names: Record<number, string> = { 1: 'Dirt', 2: 'Stone', 3: 'Grass', 4: 'Built' };
        this.player.targetInfo = `${names[v.type] || 'Voxel'} | Durability: ${v.durability}/3 | ${dist}m`;
      }

      if (this.buildMode || (this.equipment !== 'rifle' && this.equipment !== 'smg')) {
        const px = hit.voxelPos.x + Math.round(hit.normal.x);
        const py = hit.voxelPos.y + Math.round(hit.normal.y);
        const pz = hit.voxelPos.z + Math.round(hit.normal.z);
        if (!this.world.isSolid(px, py, pz) && this.world.canBuild(px, py, pz)) {
          this.buildPreviewMesh.visible = true;
          this.buildPreviewMesh.position.set(px, py, pz);
        }
      }
    } else {
      this.highlightMesh.visible = false;
      this.buildPreviewMesh.visible = false;
      this.player.targetInfo = '';
    }
  }

  start(): void {
    console.log('Game starting...');
    this.animate();
  }

  private animate = (): void => {
    requestAnimationFrame(this.animate);
    const dt = Math.min(this.clock.getDelta(), 0.05);

    const wasDead = this.player.isDead;
    this.player.update(dt);
    this.world.update(); // Handle deferred mesh rebuilds
    if (wasDead && !this.player.isDead) {
      this.sounds.respawn();
    }

    const targetTransition = this.isAiming ? 1 : 0;
    this.aimTransition += (targetTransition - this.aimTransition) * Math.min(dt * 10, 1);

    if (this.currentWeaponModel) {
      const targetPos = new THREE.Vector3().lerpVectors(this.hipPosition, this.adsPosition, this.aimTransition);
      this.currentWeaponModel.position.lerp(targetPos, Math.min(dt * 10, 1));
    }

    const targetFov = this.isAiming ? 50 : 75;
    this.player.camera.fov += (targetFov - this.player.camera.fov) * Math.min(dt * 10, 1);
    this.player.camera.updateProjectionMatrix();

    if (this.isMouseDown && (this.equipment === 'rifle' || this.equipment === 'smg')) {
      this.shoot(performance.now() / 1000);
    }
    
    // Continuous pickaxe use
    if (this.isMouseDown && this.equipment === 'pickaxe') {
      this.usePickaxe(performance.now() / 1000);
    }
    
    // Update pickaxe animation
    if (this.isPickaxeAnimating) {
      this.pickaxeAnimationTime += dt;
      if (this.pickaxeAnimationTime >= this.pickaxeAnimationDuration) {
        this.isPickaxeAnimating = false;
        this.pickaxeAnimationTime = 0;
      }
      
      // Animate pickaxe swing
      if (this.currentWeaponModel && this.equipment === 'pickaxe') {
        const swingProgress = this.pickaxeAnimationTime / this.pickaxeAnimationDuration;
        const swingAngle = Math.sin(swingProgress * Math.PI) * 0.8;
        this.currentWeaponModel.rotation.x = -swingAngle;
        this.currentWeaponModel.position.z = this.hipPosition.z - swingAngle * 0.2;
      }
    } else if (this.currentWeaponModel && this.equipment === 'pickaxe') {
      // Reset pickaxe rotation when not animating
      this.currentWeaponModel.rotation.x *= 0.9;
      this.currentWeaponModel.position.z += (this.hipPosition.z - this.currentWeaponModel.position.z) * 0.1;
    }
    
    // Update death animations
    const deathAnimationDuration = 1.5;
    for (const [uuid, anim] of this.deathAnimations) {
      anim.timer += dt;
      const progress = Math.min(anim.timer / deathAnimationDuration, 1);
      
      // Sink into ground
      anim.mesh.position.y = anim.startPos.y - progress * 2;
      
      // Rotate and fall over
      anim.mesh.rotation.x = progress * Math.PI * 0.5;
      anim.mesh.rotation.z = Math.sin(progress * Math.PI) * 0.3;
      
      // Fade out (by scaling down)
      const scale = 1 - progress * 0.5;
      anim.mesh.scale.set(scale, scale, scale);
      
      // Remove when animation complete
      if (progress >= 1) {
        anim.mesh.visible = false;
        this.deathAnimations.delete(uuid);
      }
    }

    this.updateBots(dt);
    this.updateHighlight();

    if (this.muzzleTimer > 0) {
      this.muzzleTimer -= dt;
      if (this.muzzleTimer <= 0) this.muzzleFlash.intensity = 0;
    }
    if (this.hitMarkerTimer > 0) this.hitMarkerTimer -= dt;
    if (this.messageTimer > 0) {
      this.messageTimer -= dt;
      if (this.messageTimer <= 0) this.message = '';
    }

    this.emitState();
    this.renderer.render(this.scene, this.player.camera);
  };

  handleBuildClick(): void {
    this.tryBuild();
  }

  private emitState(): void {
    if (this.onStateChange) {
      this.onStateChange({
        hp: this.player.hp,
        maxHp: this.player.maxHp,
        equipment: this.equipment,
        inventory: this.inventory,
        isDead: this.player.isDead,
        respawnTimer: this.player.respawnTimer,
        hitMarker: this.hitMarkerTimer > 0,
        targetInfo: this.player.targetInfo || '',
        message: this.message,
        messageTimer: this.messageTimer,
        buildMode: this.buildMode,
        buildValid: this.inventory > 0,
        blueKills: this.blueKills,
        redKills: this.redKills,
        isAiming: this.isAiming,
      });
    }
  }

  destroy(): void {
    window.removeEventListener('resize', this.boundResize);
    this.canvas.removeEventListener('mousedown', this.boundMouseDown);
    this.canvas.removeEventListener('mouseup', this.boundMouseUp);
    this.canvas.removeEventListener('wheel', this.boundWheel);
    document.removeEventListener('keydown', this.boundKeyDown);
    document.removeEventListener('keyup', this.boundKeyUp);
    document.removeEventListener('mousemove', this.boundMouseMove);
    this.renderer.dispose();
  }
}
