import * as THREE from 'three';
import { VoxelWorld, VOXEL_BUILT, VOXEL_SIZE } from './world';
import { Player } from './player';
import { SoundManager } from './sounds';
import { NetworkClient } from './networkClient';
import { PlayerState, PlayerInput, Position } from '../shared/types';

export type EquipmentType = 'rifle' | 'smg' | 'spade' | 'pickaxe';
type Team = 'red' | 'blue';
type GameMode = 'multiplayer' | 'singleplayer' | 'online';

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
  blueCaptures: number;
  redCaptures: number;
  isAiming: boolean;
  currentAmmo: number;
  magazineSize: number;
  isReloading: boolean;
  playerCarryingFlag: boolean;
  flagCarrierName: string;
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
  behaviorState: 'patrol' | 'engage' | 'strafe' | 'crouch' | 'peek' | 'capture' | 'retreat' | 'flank' | 'jumpdodge' | 'cover' | 'escort';
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
  weapon: 'rifle' | 'smg'; // Bot's equipped weapon
  weaponMesh: THREE.Group | null; // Visual weapon model
  isAiming: boolean; // Is bot aiming down sights
  aimTransition: number; // 0-1 for smooth aiming transition
  // CTF flag system
  carryingFlag: boolean; // Is bot carrying enemy flag
  flagMesh: THREE.Group | null; // Visual flag mesh when carrying
  
  // Human-like behavior
  lookAroundTimer: number; // Timer for looking around when idle
  lookAroundTarget: number; // Target head rotation for looking around
}

interface Weapon {
  fireRate: number;
  lastFired: number;
  damage: { head: number; body: number };
  spread: number;
  name: string;
  magazineSize: number;
  currentAmmo: number;
  reloadTime: number; // seconds
  isReloading: boolean;
  reloadStartTime: number;
}

const TEAM_COLORS: Record<Team, { body: number; accent: number; legs: number; label: string }> = {
  red: { body: 0xcc2222, accent: 0xff4444, legs: 0x661111, label: 'RED' },
  blue: { body: 0x2244cc, accent: 0x4488ff, legs: 0x112266, label: 'BLUE' },
};

const BLUE_SPAWN_Z_MIN = -100;
const BLUE_SPAWN_Z_MAX = -90;
const RED_SPAWN_Z_MIN = 90;
const RED_SPAWN_Z_MAX = 100;
const SPAWN_X_RANGE = 20; // Increased from 10 to 20 to spread spawns further apart

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
  blueCaptures: number = 0;
  redCaptures: number = 0;
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

  hipPosition: THREE.Vector3 = new THREE.Vector3(0.35, -0.3, -0.6);
  adsPosition: THREE.Vector3 = new THREE.Vector3(0, -0.2, -0.45);
  
  // Pickaxe animation
  pickaxeAnimationTime: number = 0;
  isPickaxeAnimating: boolean = false;
  pickaxeAnimationDuration: number = 0.3;
  
  // Death animation
  deathAnimations: Map<string, { mesh: THREE.Group; timer: number; startPos: THREE.Vector3 }> = new Map();
  
  // Bullet tracers
  bulletTracers: Array<{
    mesh: THREE.Mesh;
    velocity: THREE.Vector3;
    life: number;
    maxLife: number;
    hasWhizzed: boolean;
    hasImpacted: boolean;
  }> = [];
  
  // Collapse animation
  collapseAnimations: Array<{
    mesh: THREE.Mesh;
    velocity: THREE.Vector3;
    angularVelocity: THREE.Vector3;
    life: number;
    maxLife: number;
  }> = [];
  
  // Reload animation
  reloadAnimationTime: number = 0;
  isReloadAnimating: boolean = false;
  reloadAnimationDuration: number = 1.5; // seconds
  
  // Bullet shell ejection system
  bulletShells: Array<{
    mesh: THREE.Mesh;
    velocity: THREE.Vector3;
    rotationSpeed: THREE.Vector3;
    life: number;
    maxLife: number;
  }> = [];
  
  // Muzzle flash system (visible to all players)
  muzzleFlashes: Array<{
    light: THREE.PointLight;
    mesh: THREE.Mesh;
    life: number;
    maxLife: number;
  }> = [];
  
  // CTF Flag System
  blueFlagMesh: THREE.Mesh | null = null; // Blue flag at base
  redFlagMesh: THREE.Mesh | null = null; // Red flag at base
  blueFlagAtBase: boolean = true; // Is blue flag at its base?
  redFlagAtBase: boolean = true; // Is red flag at its base?
  droppedFlags: Array<{ mesh: THREE.Mesh; position: THREE.Vector3; team: Team; respawnTimer: number }> = [];
  captureZoneSize: number = 4; // 4x4 capture zone
  
  gameMode: GameMode = 'multiplayer';
  
  // Multiplayer networking
  networkClient: NetworkClient | null = null;
  remotePlayers: Map<string, { mesh: THREE.Group; state: PlayerState; targetPosition: THREE.Vector3; targetRotation: THREE.Euler; lastShootingTime: number }> = new Map();
  localPlayerId: string | null = null;
  lastInputSendTime: number = 0;
  inputSendRate: number = 50; // ms between input sends
  
  private boundResize: () => void;
  private boundMouseDown: (e: MouseEvent) => void;
  private boundMouseUp: (e: MouseEvent) => void;
  private boundWheel: (e: WheelEvent) => void;
  private boundKeyDown: (e: KeyboardEvent) => void;
  private boundKeyUp: (e: KeyboardEvent) => void;
  private boundMouseMove: (e: MouseEvent) => void;

  weapons: Record<string, Weapon> = {
    rifle: { 
      fireRate: 0.4, 
      lastFired: 0, 
      damage: { head: 100, body: 34 }, 
      spread: 0.0005, 
      name: 'Rifle',
      magazineSize: 10,
      currentAmmo: 10,
      reloadTime: 2.0,
      isReloading: false,
      reloadStartTime: 0
    },
    smg: { 
      fireRate: 0.1, 
      lastFired: 0, 
      damage: { head: 100, body: 34 }, 
      spread: 0.04, 
      name: 'SMG',
      magazineSize: 30,
      currentAmmo: 30,
      reloadTime: 1.5,
      isReloading: false,
      reloadStartTime: 0
    },
  };

  constructor(canvas: HTMLCanvasElement, mode: GameMode = 'multiplayer') {
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
    this.player.team = 'blue'; // Explicitly set team
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

    // Initialize CTF flags
    this.createFlags();
    this.createCaptureZones();

    // Only spawn bots in multiplayer mode (with bots)
    if (this.gameMode === 'multiplayer') {
      this.spawnTeamBots('blue', 6);
      this.spawnTeamBots('red', 7);
    }

    // Initialize network for online multiplayer
    if (this.gameMode === 'online') {
      this.initializeNetwork();
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

  // CTF Flag System Methods
  private createFlags(): void {
    // Create blue flag at blue base
    const blueFlagGeo = new THREE.CylinderGeometry(0.1, 0.1, 2, 8);
    const blueFlagMat = new THREE.MeshLambertMaterial({ color: 0x4488ff });
    this.blueFlagMesh = new THREE.Mesh(blueFlagGeo, blueFlagMat);
    this.blueFlagMesh.position.set(BLUE_FLAG_POS.x, this.world.getGroundHeight(BLUE_FLAG_POS.x, BLUE_FLAG_POS.z) + 1, BLUE_FLAG_POS.z);
    this.scene.add(this.blueFlagMesh);

    // Create red flag at red base
    const redFlagGeo = new THREE.CylinderGeometry(0.1, 0.1, 2, 8);
    const redFlagMat = new THREE.MeshLambertMaterial({ color: 0xff4444 });
    this.redFlagMesh = new THREE.Mesh(redFlagGeo, redFlagMat);
    this.redFlagMesh.position.set(RED_FLAG_POS.x, this.world.getGroundHeight(RED_FLAG_POS.x, RED_FLAG_POS.z) + 1, RED_FLAG_POS.z);
    this.scene.add(this.redFlagMesh);
  }

  // Create a carried flag mesh that follows the carrier
  private createCarriedFlagMesh(team: Team): THREE.Group {
    const flagGroup = new THREE.Group();
    
    // Flag pole
    const poleGeo = new THREE.CylinderGeometry(0.05, 0.05, 1.5, 8);
    const poleMat = new THREE.MeshLambertMaterial({ color: 0x888888 });
    const pole = new THREE.Mesh(poleGeo, poleMat);
    pole.position.y = 0.75;
    flagGroup.add(pole);
    
    // Flag cloth (triangle shape)
    const flagColor = team === 'blue' ? 0x4488ff : 0xff4444;
    const flagGeo = new THREE.PlaneGeometry(0.6, 0.4);
    const flagMat = new THREE.MeshLambertMaterial({ 
      color: flagColor, 
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.9
    });
    const flag = new THREE.Mesh(flagGeo, flagMat);
    flag.position.set(0.3, 1.3, 0);
    flagGroup.add(flag);
    
    return flagGroup;
  }

  private createCaptureZones(): void {
    // Create blue capture zone (4x4 area)
    const blueZoneGeo = new THREE.PlaneGeometry(this.captureZoneSize, this.captureZoneSize);
    const blueZoneMat = new THREE.MeshBasicMaterial({ 
      color: 0x4488ff, 
      transparent: true, 
      opacity: 0.3,
      side: THREE.DoubleSide
    });
    const blueZone = new THREE.Mesh(blueZoneGeo, blueZoneMat);
    blueZone.rotation.x = -Math.PI / 2;
    blueZone.position.set(BLUE_FLAG_POS.x, this.world.getGroundHeight(BLUE_FLAG_POS.x, BLUE_FLAG_POS.z) + 0.05, BLUE_FLAG_POS.z);
    this.scene.add(blueZone);

    // Create red capture zone (4x4 area)
    const redZoneGeo = new THREE.PlaneGeometry(this.captureZoneSize, this.captureZoneSize);
    const redZoneMat = new THREE.MeshBasicMaterial({ 
      color: 0xff4444, 
      transparent: true, 
      opacity: 0.3,
      side: THREE.DoubleSide
    });
    const redZone = new THREE.Mesh(redZoneGeo, redZoneMat);
    redZone.rotation.x = -Math.PI / 2;
    redZone.position.set(RED_FLAG_POS.x, this.world.getGroundHeight(RED_FLAG_POS.x, RED_FLAG_POS.z) + 0.05, RED_FLAG_POS.z);
    this.scene.add(redZone);
  }

  private isInCaptureZone(position: THREE.Vector3, team: Team): boolean {
    const flagPos = team === 'blue' ? BLUE_FLAG_POS : RED_FLAG_POS;
    const halfSize = this.captureZoneSize / 2;
    return Math.abs(position.x - flagPos.x) <= halfSize && 
           Math.abs(position.z - flagPos.z) <= halfSize;
  }

  private createDroppedFlag(position: THREE.Vector3, team: Team): void {
    const flagGeo = new THREE.CylinderGeometry(0.1, 0.1, 2, 8);
    const flagMat = new THREE.MeshLambertMaterial({ color: team === 'blue' ? 0x4488ff : 0xff4444 });
    const flagMesh = new THREE.Mesh(flagGeo, flagMat);
    flagMesh.position.copy(position);
    flagMesh.position.y = this.world.getGroundHeight(position.x, position.z) + 1;
    this.scene.add(flagMesh);

    this.droppedFlags.push({
      mesh: flagMesh,
      position: position.clone(),
      team: team,
      respawnTimer: 60 // 60 seconds (1 minute) to respawn at base
    });
  }

  private checkFlagPickup(): void {
    // Check if player can pick up enemy flag
    if (!this.player.carryingFlag && !this.player.isDead) {
      const enemyFlagTeam = this.playerTeam === 'blue' ? 'red' : 'blue';
      const enemyFlagPos = enemyFlagTeam === 'blue' ? BLUE_FLAG_POS : RED_FLAG_POS;
      
      // Check if enemy flag is at base
      const enemyFlagAtBase = enemyFlagTeam === 'blue' ? this.blueFlagAtBase : this.redFlagAtBase;
      
      if (enemyFlagAtBase) {
        const distToFlag = Math.sqrt(
          Math.pow(this.player.position.x - enemyFlagPos.x, 2) +
          Math.pow(this.player.position.z - enemyFlagPos.z, 2)
        );
        
        if (distToFlag < 2) {
          this.player.carryingFlag = true;
          // Create and attach flag mesh to player
          this.player.flagMesh = this.createCarriedFlagMesh(enemyFlagTeam);
          this.player.flagMesh.position.set(0.5, 1.5, 0); // Position on player's back
          this.scene.add(this.player.flagMesh);
          
          if (enemyFlagTeam === 'blue') {
            this.blueFlagAtBase = false;
            if (this.blueFlagMesh) this.blueFlagMesh.visible = false;
          } else {
            this.redFlagAtBase = false;
            if (this.redFlagMesh) this.redFlagMesh.visible = false;
          }
          this.showMessage(`🚩 ${this.playerTeam.toUpperCase()} picked up the enemy flag!`);
        }
      }
      
      // Check dropped flags
      for (let i = this.droppedFlags.length - 1; i >= 0; i--) {
        const droppedFlag = this.droppedFlags[i];
        if (droppedFlag.team === enemyFlagTeam) {
          const distToFlag = this.player.position.distanceTo(droppedFlag.position);
          if (distToFlag < 2) {
            this.player.carryingFlag = true;
            // Create and attach flag mesh to player
            this.player.flagMesh = this.createCarriedFlagMesh(enemyFlagTeam);
            this.player.flagMesh.position.set(0.5, 1.5, 0);
            this.scene.add(this.player.flagMesh);
            
            // Remove dropped flag
            this.scene.remove(droppedFlag.mesh);
            droppedFlag.mesh.geometry.dispose();
            (droppedFlag.mesh.material as THREE.Material).dispose();
            this.droppedFlags.splice(i, 1);
            this.showMessage(`🚩 ${this.playerTeam.toUpperCase()} picked up the dropped flag!`);
          }
        }
      }
    }

    // Check if player captured the flag (brought enemy flag to own base)
    if (this.player.carryingFlag && this.isInCaptureZone(this.player.position, this.playerTeam)) {
      this.player.carryingFlag = false;
      // Remove flag mesh from player
      if (this.player.flagMesh) {
        this.scene.remove(this.player.flagMesh);
        this.player.flagMesh = null;
      }
      
      if (this.playerTeam === 'blue') {
        this.blueCaptures++;
        this.redFlagAtBase = true;
        if (this.redFlagMesh) {
          this.redFlagMesh.visible = true;
          this.redFlagMesh.position.set(RED_FLAG_POS.x, this.world.getGroundHeight(RED_FLAG_POS.x, RED_FLAG_POS.z) + 1, RED_FLAG_POS.z);
        }
      } else {
        this.redCaptures++;
        this.blueFlagAtBase = true;
        if (this.blueFlagMesh) {
          this.blueFlagMesh.visible = true;
          this.blueFlagMesh.position.set(BLUE_FLAG_POS.x, this.world.getGroundHeight(BLUE_FLAG_POS.x, BLUE_FLAG_POS.z) + 1, BLUE_FLAG_POS.z);
        }
      }
      this.showMessage(`🏆 ${this.playerTeam.toUpperCase()} CAPTURED THE FLAG!`);
      this.sounds.capture();
    }
  }

  private updateDroppedFlags(dt: number): void {
    for (let i = this.droppedFlags.length - 1; i >= 0; i--) {
      const droppedFlag = this.droppedFlags[i];
      droppedFlag.respawnTimer -= dt;
      
      // Rotate and bob flag for visual effect
      droppedFlag.mesh.rotation.y += dt * 2;
      const baseY = this.world.getGroundHeight(droppedFlag.position.x, droppedFlag.position.z) + 1;
      droppedFlag.mesh.position.y = baseY + Math.sin(Date.now() * 0.003) * 0.2;
      
      if (droppedFlag.respawnTimer <= 0) {
        // Return flag to base
        this.scene.remove(droppedFlag.mesh);
        droppedFlag.mesh.geometry.dispose();
        (droppedFlag.mesh.material as THREE.Material).dispose();
        this.droppedFlags.splice(i, 1);
        
        if (droppedFlag.team === 'blue') {
          this.blueFlagAtBase = true;
          if (this.blueFlagMesh) {
            this.blueFlagMesh.visible = true;
            this.blueFlagMesh.position.set(BLUE_FLAG_POS.x, this.world.getGroundHeight(BLUE_FLAG_POS.x, BLUE_FLAG_POS.z) + 1, BLUE_FLAG_POS.z);
          }
        } else {
          this.redFlagAtBase = true;
          if (this.redFlagMesh) {
            this.redFlagMesh.visible = true;
            this.redFlagMesh.position.set(RED_FLAG_POS.x, this.world.getGroundHeight(RED_FLAG_POS.x, RED_FLAG_POS.z) + 1, RED_FLAG_POS.z);
          }
        }
        this.showMessage(`🚩 ${droppedFlag.team.toUpperCase()} flag returned to base!`);
        this.sounds.capture();
      }
    }
  }

  private dropPlayerFlag(): void {
    if (this.player.carryingFlag) {
      this.player.carryingFlag = false;
      const enemyFlagTeam = this.playerTeam === 'blue' ? 'red' : 'blue';
      
      // Remove flag mesh from player
      if (this.player.flagMesh) {
        this.scene.remove(this.player.flagMesh);
        this.player.flagMesh = null;
      }
      
      // Create dropped flag at player's death location
      this.createDroppedFlag(this.player.position.clone(), enemyFlagTeam);
      this.showMessage(`💀 ${this.playerTeam.toUpperCase()} dropped the flag!`);
    }
  }

  private updateBotFlagLogic(bot: Bot, dt: number, enemyTarget: any, distToEnemy: number): void {
    const enemyFlagTeam = bot.team === 'blue' ? 'red' : 'blue';
    const enemyFlagPos = enemyFlagTeam === 'blue' ? BLUE_FLAG_POS : RED_FLAG_POS;
    const enemyFlagAtBase = enemyFlagTeam === 'blue' ? this.blueFlagAtBase : this.redFlagAtBase;

    // Check if bot can pick up enemy flag
    if (!bot.carryingFlag && enemyFlagAtBase) {
      const distToFlag = Math.sqrt(
        Math.pow(bot.position.x - enemyFlagPos.x, 2) +
        Math.pow(bot.position.z - enemyFlagPos.z, 2)
      );

      if (distToFlag < 2) {
        bot.carryingFlag = true;
        // Create and attach flag mesh to bot
        bot.flagMesh = this.createCarriedFlagMesh(enemyFlagTeam);
        bot.flagMesh.position.set(0.5, 1.5, 0); // Position on bot's back
        bot.mesh.add(bot.flagMesh); // Attach to bot mesh
        
        if (enemyFlagTeam === 'blue') {
          this.blueFlagAtBase = false;
          if (this.blueFlagMesh) this.blueFlagMesh.visible = false;
        } else {
          this.redFlagAtBase = false;
          if (this.redFlagMesh) this.redFlagMesh.visible = false;
        }
        this.showMessage(`🚩 ${bot.team.toUpperCase()} bot picked up the enemy flag!`);
      }
    }

    // Check dropped flags
    if (!bot.carryingFlag) {
      for (let i = this.droppedFlags.length - 1; i >= 0; i--) {
        const droppedFlag = this.droppedFlags[i];
        if (droppedFlag.team === enemyFlagTeam) {
          const distToFlag = bot.position.distanceTo(droppedFlag.position);
          if (distToFlag < 2) {
            bot.carryingFlag = true;
            // Create and attach flag mesh to bot
            bot.flagMesh = this.createCarriedFlagMesh(enemyFlagTeam);
            bot.flagMesh.position.set(0.5, 1.5, 0);
            bot.mesh.add(bot.flagMesh);
            
            // Remove dropped flag
            this.scene.remove(droppedFlag.mesh);
            droppedFlag.mesh.geometry.dispose();
            (droppedFlag.mesh.material as THREE.Material).dispose();
            this.droppedFlags.splice(i, 1);
            this.showMessage(`🚩 ${bot.team.toUpperCase()} bot picked up the dropped flag!`);
          }
        }
      }
    }

    // If carrying flag, prioritize returning to base
    if (bot.carryingFlag) {
      const ownFlagPos = bot.team === 'blue' ? BLUE_FLAG_POS : RED_FLAG_POS;
      const distToOwnBase = Math.sqrt(
        Math.pow(bot.position.x - ownFlagPos.x, 2) +
        Math.pow(bot.position.z - ownFlagPos.z, 2)
      );

      // Check if bot captured the flag
      if (this.isInCaptureZone(bot.position, bot.team)) {
        bot.carryingFlag = false;
        // Remove flag mesh from bot
        if (bot.flagMesh) {
          bot.mesh.remove(bot.flagMesh);
          bot.flagMesh = null;
        }
        
        if (bot.team === 'blue') {
          this.blueCaptures++;
          this.redFlagAtBase = true;
          if (this.redFlagMesh) {
            this.redFlagMesh.visible = true;
            this.redFlagMesh.position.set(RED_FLAG_POS.x, this.world.getGroundHeight(RED_FLAG_POS.x, RED_FLAG_POS.z) + 1, RED_FLAG_POS.z);
          }
        } else {
          this.redCaptures++;
          this.blueFlagAtBase = true;
          if (this.blueFlagMesh) {
            this.blueFlagMesh.visible = true;
            this.blueFlagMesh.position.set(BLUE_FLAG_POS.x, this.world.getGroundHeight(BLUE_FLAG_POS.x, BLUE_FLAG_POS.z) + 1, BLUE_FLAG_POS.z);
          }
        }
        this.showMessage(`🏆 ${bot.team.toUpperCase()} bot CAPTURED THE FLAG!`);
        this.sounds.capture();
      } else {
        // Move toward own base
        bot.targetPos.set(ownFlagPos.x, bot.position.y, ownFlagPos.z);
        bot.behaviorState = 'capture';
      }
    }
  }

  private dropBotFlag(bot: Bot): void {
    if (bot.carryingFlag) {
      bot.carryingFlag = false;
      const enemyFlagTeam = bot.team === 'blue' ? 'red' : 'blue';
      
      // Remove flag mesh from bot
      if (bot.flagMesh) {
        bot.mesh.remove(bot.flagMesh);
        bot.flagMesh = null;
      }
      
      // Create dropped flag at bot's death location
      this.createDroppedFlag(bot.position.clone(), enemyFlagTeam);
      this.showMessage(`💀 ${bot.team.toUpperCase()} bot dropped the flag!`);
    }
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
        // Right-click ONLY toggles ADS, does NOT shoot
        this.isAiming = !this.isAiming;
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
    if (e.code === 'KeyR') { this.startReload(); }
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

  private getWeaponMuzzlePosition(): THREE.Vector3 {
    if (!this.currentWeaponModel) {
      // Fallback to camera position if no weapon model
      return this.player.camera.position.clone();
    }
    
    // Get the weapon model's world position
    const weaponWorldPos = new THREE.Vector3();
    this.currentWeaponModel.getWorldPosition(weaponWorldPos);
    
    // Calculate muzzle offset based on weapon type
    // Rifle barrel is at z=-0.65, SMG barrel is at z=-0.4 (relative to weapon)
    const barrelOffsetZ = this.equipment === 'rifle' ? -0.65 : -0.4;
    const barrelOffsetY = 0.01; // Barrel is slightly above weapon center
    
    // Get weapon's world rotation
    const weaponWorldQuat = new THREE.Quaternion();
    this.currentWeaponModel.getWorldQuaternion(weaponWorldQuat);
    
    // Create muzzle offset vector in local space
    const muzzleOffsetLocal = new THREE.Vector3(0, barrelOffsetY, barrelOffsetZ);
    
    // Transform to world space
    const muzzlePos = muzzleOffsetLocal.applyQuaternion(weaponWorldQuat).add(weaponWorldPos);
    
    return muzzlePos;
  }

  private shoot(now: number): void {
    const weapon = this.weapons[this.equipment];
    
    // Safety check - should only be called for rifle/smg
    if (!weapon) return;
    
    // Can't shoot while reloading
    if (weapon.isReloading) {
      this.showMessage('Reloading...');
      return;
    }
    
    // Check magazine ammo
    if (weapon.currentAmmo <= 0) {
      this.showMessage('Magazine empty! Press R to reload');
      return;
    }
    
    if (now - weapon.lastFired < weapon.fireRate) return;
    weapon.lastFired = now;
    
    // Decrease ammo
    weapon.currentAmmo--;

    if (this.equipment === 'rifle') this.sounds.rifleShot();
    else if (this.equipment === 'smg') this.sounds.smgShot();

    // Get the actual muzzle position from the weapon model
    const dir = this.player.getAimDirection();
    const muzzlePos = this.getWeaponMuzzlePosition();
    
    // Create visible muzzle flash
    this.createMuzzleFlash(muzzlePos, dir.clone());
    
    // Also update the local muzzle flash light for camera effect
    this.muzzleFlash.intensity = 3;
    this.muzzleFlash.position.copy(muzzlePos);
    this.muzzleTimer = 0.05;

    // Add camera shake when shooting
    const shakeIntensity = this.equipment === 'rifle' ? 0.03 : 0.02;
    this.player.addCameraShake(shakeIntensity);
    
    // Create bullet tracer
    this.createBulletTracer(muzzlePos, dir.clone());
    
    // Eject bullet shell
    this.ejectBulletShell(muzzlePos, dir.clone());
    
    // Calculate accuracy based on movement state
    let spreadMultiplier = 1.0;
    
    // ADS bonus
    if (this.isAiming) {
      spreadMultiplier *= 0.3;
    }
    
    // Crouching bonus
    if (this.player.isCrouching) {
      spreadMultiplier *= 0.6;
    }
    
    // Movement penalty
    const horizontalSpeed = Math.sqrt(
      this.player.velocity.x * this.player.velocity.x + 
      this.player.velocity.z * this.player.velocity.z
    );
    
    if (horizontalSpeed > 0.5) {
      if (this.player.isSprinting) {
        spreadMultiplier *= 2.5; // Running/shooting very inaccurate
      } else {
        spreadMultiplier *= 1.5; // Walking/shooting less accurate
      }
    }
    
    const actualSpread = weapon.spread * spreadMultiplier;
    const shootDir = dir.clone();
    shootDir.x += (Math.random() - 0.5) * actualSpread;
    shootDir.y += (Math.random() - 0.5) * actualSpread;
    shootDir.z += (Math.random() - 0.5) * actualSpread;
    shootDir.normalize();
    
    // Auto-reload when magazine is empty
    if (weapon.currentAmmo <= 0) {
      this.startReload();
    }

    let hitBot = false;
    let closestDist = Infinity;
    let closestBot: Bot | null = null;
    let isHeadshot = false;

    for (const bot of this.bots) {
      if (bot.isDead || bot.team === this.playerTeam) continue;

      const botCenter = bot.position.clone();
      botCenter.y += bot.headY * 0.5;

      const toBot = botCenter.clone().sub(muzzlePos);
      const dot = toBot.dot(shootDir);
      if (dot < 0) continue;

      const closest = muzzlePos.clone().add(shootDir.clone().multiplyScalar(dot));
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
      const voxelHit = this.world.raycast(muzzlePos, shootDir, 100);
      if (voxelHit) {
        const voxel = this.world.getVoxel(voxelHit.voxelPos.x, voxelHit.voxelPos.y, voxelHit.voxelPos.z);
        if (voxel) {
          const { x, y, z } = voxelHit.voxelPos;
          
          // Check if voxel is in capture zone (indestructible)
          const isInBlueZone = this.isInCaptureZone(new THREE.Vector3(x, y, z), 'blue');
          const isInRedZone = this.isInCaptureZone(new THREE.Vector3(x, y, z), 'red');
          
          if (isInBlueZone || isInRedZone) {
            // Voxel is in capture zone, cannot be damaged
            return;
          }
          
          // Damage any voxel (not just built ones)
          const result = this.world.damageVoxel(x, y, z, 1);
          
          if (result.destroyed) {
            // Chunk automatically marked dirty by setVoxel
            this.sounds.voxelBreak();
            if (result.collapsed > 0) {
              this.sounds.collapse();
              // Trigger collapse animation
              this.createCollapseAnimation(result.collapsedVoxels);
            }
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
        closestBot.respawnTimer = 13; // Increased to 13 seconds to match player
        
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

  private startReload(): void {
    const weapon = this.weapons[this.equipment];
    
    // Can only reload weapons with magazines
    if (!weapon || this.equipment === 'spade' || this.equipment === 'pickaxe') {
      return;
    }
    
    if (weapon.isReloading || weapon.currentAmmo === weapon.magazineSize) return;
    
    weapon.isReloading = true;
    weapon.reloadStartTime = performance.now() / 1000;
    this.isReloadAnimating = true;
    this.reloadAnimationTime = 0;
    this.reloadAnimationDuration = weapon.reloadTime;
    
    this.sounds.reload();
    this.showMessage(`Reloading ${weapon.name}...`);
  }

  private updateReload(dt: number): void {
    const weapon = this.weapons[this.equipment];
    
    // Only process reload for weapons with magazines
    if (!weapon || this.equipment === 'spade' || this.equipment === 'pickaxe') {
      return;
    }
    
    if (weapon.isReloading) {
      const now = performance.now() / 1000;
      const elapsed = now - weapon.reloadStartTime;
      
      if (elapsed >= weapon.reloadTime) {
        // Reload complete
        weapon.currentAmmo = weapon.magazineSize;
        weapon.isReloading = false;
        this.isReloadAnimating = false;
        this.showMessage(`${weapon.name} reloaded!`);
      }
    }
    
    // Update reload animation
    if (this.isReloadAnimating) {
      this.reloadAnimationTime += dt;
      if (this.reloadAnimationTime >= this.reloadAnimationDuration) {
        this.isReloadAnimating = false;
        this.reloadAnimationTime = 0;
      }
    }
  }

  private createBulletTracer(origin: THREE.Vector3, direction: THREE.Vector3): void {
    // Create a small elongated box for the bullet tracer
    const tracerLength = 0.5;
    const tracerWidth = 0.02;
    const geometry = new THREE.BoxGeometry(tracerWidth, tracerWidth, tracerLength);
    const material = new THREE.MeshBasicMaterial({ 
      color: 0xffff00,
      transparent: true,
      opacity: 0.8
    });
    const mesh = new THREE.Mesh(geometry, material);
    
    // Position at origin
    mesh.position.copy(origin);
    
    // Rotate to face direction
    mesh.lookAt(origin.clone().add(direction));
    
    this.scene.add(mesh);
    
    // Add to tracers array with velocity and life
    const speed = 200; // units per second
    const velocity = direction.clone().multiplyScalar(speed);
    
    this.bulletTracers.push({
      mesh,
      velocity,
      life: 0,
      maxLife: 0.5, // 0.5 seconds lifetime
      hasWhizzed: false,
      hasImpacted: false
    });
  }

  private createMuzzleFlash(position: THREE.Vector3, direction: THREE.Vector3): void {
    // Create a bright point light for the flash
    const light = new THREE.PointLight(0xffaa00, 5, 8);
    light.position.copy(position);
    this.scene.add(light);
    
    // Create a visible flash mesh (sphere) for better visibility
    const flashGeometry = new THREE.SphereGeometry(0.15, 8, 8);
    const flashMaterial = new THREE.MeshBasicMaterial({
      color: 0xffcc00,
      transparent: true,
      opacity: 0.9,
    });
    const flashMesh = new THREE.Mesh(flashGeometry, flashMaterial);
    flashMesh.position.copy(position);
    
    // Add a directional stretch to make it look like a flash
    flashMesh.scale.set(1, 1, 2);
    flashMesh.lookAt(position.clone().add(direction));
    
    this.scene.add(flashMesh);
    
    this.muzzleFlashes.push({
      light,
      mesh: flashMesh,
      life: 0,
      maxLife: 0.08, // Very short flash duration
    });
  }
  
  private updateMuzzleFlashes(dt: number): void {
    for (let i = this.muzzleFlashes.length - 1; i >= 0; i--) {
      const flash = this.muzzleFlashes[i];
      
      // Update life
      flash.life += dt;
      
      // Fade out
      const progress = flash.life / flash.maxLife;
      const fadeOut = 1 - progress;
      
      flash.light.intensity = 5 * fadeOut;
      (flash.mesh.material as THREE.MeshBasicMaterial).opacity = 0.9 * fadeOut;
      
      // Scale down as it fades
      const scale = 1 + progress * 0.5;
      flash.mesh.scale.set(scale, scale, scale * 2);
      
      // Remove if expired
      if (flash.life >= flash.maxLife) {
        this.scene.remove(flash.light);
        this.scene.remove(flash.mesh);
        flash.mesh.geometry.dispose();
        (flash.mesh.material as THREE.Material).dispose();
        this.muzzleFlashes.splice(i, 1);
      }
    }
  }

  private ejectBulletShell(origin: THREE.Vector3, direction: THREE.Vector3): void {
    // Create a small cylinder for the bullet shell casing
    const shellRadius = 0.015;
    const shellLength = 0.04;
    const geometry = new THREE.CylinderGeometry(shellRadius, shellRadius, shellLength, 8);
    const material = new THREE.MeshStandardMaterial({ 
      color: 0xDAA520, // Golden brass color
      metalness: 0.8,
      roughness: 0.2
    });
    const mesh = new THREE.Mesh(geometry, material);
    
    // Calculate ejection port position (right side of weapon, slightly behind muzzle)
    // The ejection port is typically on the right side, about 0.2-0.3 units behind the muzzle
    const right = new THREE.Vector3(-direction.z, 0, direction.x).normalize();
    const backward = direction.clone().multiplyScalar(-0.25); // 0.25 units behind muzzle
    const rightOffset = right.clone().multiplyScalar(0.15); // 0.15 units to the right
    const upOffset = new THREE.Vector3(0, 0.05, 0); // Slightly up
    
    // Position at ejection port
    const ejectionPos = origin.clone()
      .add(backward)
      .add(rightOffset)
      .add(upOffset);
    
    mesh.position.copy(ejectionPos);
    
    // Calculate ejection direction (perpendicular to shooting direction, to the right and up)
    const up = new THREE.Vector3(0, 1, 0);
    
    // Eject upward and to the right with realistic velocity
    const ejectVelocity = right.clone().multiplyScalar(2.5 + Math.random() * 1.5);
    ejectVelocity.add(up.clone().multiplyScalar(3.5 + Math.random() * 1.5));
    
    // Add some randomness for natural variation
    ejectVelocity.x += (Math.random() - 0.5) * 0.8;
    ejectVelocity.y += (Math.random() - 0.5) * 0.8;
    ejectVelocity.z += (Math.random() - 0.5) * 0.8;
    
    // Random rotation speed for tumbling effect
    const rotationSpeed = new THREE.Vector3(
      (Math.random() - 0.5) * 12,
      (Math.random() - 0.5) * 12,
      (Math.random() - 0.5) * 12
    );
    
    this.scene.add(mesh);
    
    this.bulletShells.push({
      mesh,
      velocity: ejectVelocity,
      rotationSpeed,
      life: 0,
      maxLife: 2.0 // 2 seconds lifetime
    });
  }

  private updateBulletShells(dt: number): void {
    const gravity = 15; // Gravity acceleration
    
    for (let i = this.bulletShells.length - 1; i >= 0; i--) {
      const shell = this.bulletShells[i];
      
      // Update life
      shell.life += dt;
      
      // Apply gravity
      shell.velocity.y -= gravity * dt;
      
      // Update position
      shell.mesh.position.add(shell.velocity.clone().multiplyScalar(dt));
      
      // Update rotation
      shell.mesh.rotation.x += shell.rotationSpeed.x * dt;
      shell.mesh.rotation.y += shell.rotationSpeed.y * dt;
      shell.mesh.rotation.z += shell.rotationSpeed.z * dt;
      
      // Fade out in the last 0.5 seconds
      if (shell.life > shell.maxLife - 0.5) {
        const fadeProgress = (shell.life - (shell.maxLife - 0.5)) / 0.5;
        (shell.mesh.material as THREE.MeshLambertMaterial).opacity = 1.0 - fadeProgress;
        (shell.mesh.material as THREE.MeshLambertMaterial).transparent = true;
      }
      
      // Remove if expired
      if (shell.life >= shell.maxLife) {
        this.scene.remove(shell.mesh);
        shell.mesh.geometry.dispose();
        (shell.mesh.material as THREE.Material).dispose();
        this.bulletShells.splice(i, 1);
      }
    }
  }

  private updateBulletTracers(dt: number): void {
    for (let i = this.bulletTracers.length - 1; i >= 0; i--) {
      const tracer = this.bulletTracers[i];
      const prevPosition = tracer.mesh.position.clone();
      
      // Update position
      tracer.mesh.position.add(tracer.velocity.clone().multiplyScalar(dt));
      
      // Check if bullet passed near player (whizzing sound)
      const distToPlayer = tracer.mesh.position.distanceTo(this.player.position);
      if (distToPlayer < 3 && !tracer.hasWhizzed) {
        // Calculate direction for panning
        const toBullet = tracer.mesh.position.clone().sub(this.player.position);
        const playerForward = this.player.getAimDirection();
        const playerRight = new THREE.Vector3(-playerForward.z, 0, playerForward.x);
        const direction = toBullet.dot(playerRight) / Math.max(0.1, distToPlayer);
        
        this.sounds.bulletWhizz(distToPlayer, direction);
        tracer.hasWhizzed = true;
      }
      
      // Check for bullet impact (hit voxel)
      const voxelHit = this.world.raycast(prevPosition, tracer.velocity.clone().normalize(), tracer.velocity.length() * dt);
      if (voxelHit && !tracer.hasImpacted) {
        const impactDist = voxelHit.position.distanceTo(this.player.position);
        if (impactDist < 20) {
          // Calculate direction for panning
          const toImpact = voxelHit.position.clone().sub(this.player.position);
          const playerForward = this.player.getAimDirection();
          const playerRight = new THREE.Vector3(-playerForward.z, 0, playerForward.x);
          const direction = toImpact.dot(playerRight) / Math.max(0.1, impactDist);
          
          this.sounds.bulletImpact(impactDist, direction);
          tracer.hasImpacted = true;
        }
      }
      
      // Update life
      tracer.life += dt;
      
      // Fade out
      const lifeRatio = tracer.life / tracer.maxLife;
      (tracer.mesh.material as THREE.MeshBasicMaterial).opacity = 0.8 * (1 - lifeRatio);
      
      // Remove if expired
      if (tracer.life >= tracer.maxLife) {
        this.scene.remove(tracer.mesh);
        tracer.mesh.geometry.dispose();
        (tracer.mesh.material as THREE.Material).dispose();
        this.bulletTracers.splice(i, 1);
      }
    }
  }

  private createCollapseAnimation(voxels: Array<{ x: number; y: number; z: number; type: number }>): void {
    // Limit the number of animated voxels for performance
    const maxAnimated = Math.min(voxels.length, 50);
    const voxelsToAnimate = voxels.slice(0, maxAnimated);
    
    // Color mapping for voxel types
    const colorMap: Record<number, number> = {
      1: 0x8B4513, // Dirt - brown
      2: 0x808080, // Stone - gray
      3: 0x228B22, // Grass - green
      4: 0xDAA520, // Built - golden
    };
    
    for (const voxel of voxelsToAnimate) {
      // Create a small cube for the collapsing voxel
      const geometry = new THREE.BoxGeometry(0.8, 0.8, 0.8);
      const material = new THREE.MeshLambertMaterial({ 
        color: colorMap[voxel.type] || 0xffffff,
        transparent: true,
        opacity: 1.0
      });
      const mesh = new THREE.Mesh(geometry, material);
      
      // Position at the voxel location
      mesh.position.set(voxel.x + 0.5, voxel.y + 0.5, voxel.z + 0.5);
      
      this.scene.add(mesh);
      
      // Random velocity (falling down with some horizontal spread)
      const velocity = new THREE.Vector3(
        (Math.random() - 0.5) * 2, // X: random horizontal
        -Math.random() * 3 - 2,     // Y: falling down
        (Math.random() - 0.5) * 2  // Z: random horizontal
      );
      
      // Random angular velocity for rotation
      const angularVelocity = new THREE.Vector3(
        (Math.random() - 0.5) * 5,
        (Math.random() - 0.5) * 5,
        (Math.random() - 0.5) * 5
      );
      
      this.collapseAnimations.push({
        mesh,
        velocity,
        angularVelocity,
        life: 0,
        maxLife: 1.5 // 1.5 seconds animation
      });
    }
    
    // Show message if many voxels collapsed
    if (voxels.length > 0) {
      this.showMessage(`Structure collapsed! (${voxels.length} blocks)`);
    }
  }

  private updateCollapseAnimations(dt: number): void {
    const gravity = 15; // Gravity acceleration
    
    for (let i = this.collapseAnimations.length - 1; i >= 0; i--) {
      const anim = this.collapseAnimations[i];
      
      // Update life
      anim.life += dt;
      
      // Apply gravity to velocity
      anim.velocity.y -= gravity * dt;
      
      // Update position
      anim.mesh.position.add(anim.velocity.clone().multiplyScalar(dt));
      
      // Update rotation
      anim.mesh.rotation.x += anim.angularVelocity.x * dt;
      anim.mesh.rotation.y += anim.angularVelocity.y * dt;
      anim.mesh.rotation.z += anim.angularVelocity.z * dt;
      
      // Fade out in the last 0.5 seconds
      const fadeStart = anim.maxLife - 0.5;
      if (anim.life > fadeStart) {
        const fadeProgress = (anim.life - fadeStart) / 0.5;
        (anim.mesh.material as THREE.MeshLambertMaterial).opacity = 1.0 - fadeProgress;
      }
      
      // Remove if animation complete
      if (anim.life >= anim.maxLife) {
        this.scene.remove(anim.mesh);
        anim.mesh.geometry.dispose();
        (anim.mesh.material as THREE.Material).dispose();
        this.collapseAnimations.splice(i, 1);
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
      
      // Check if voxel is in capture zone (indestructible)
      const isInBlueZone = this.isInCaptureZone(new THREE.Vector3(x, y, z), 'blue');
      const isInRedZone = this.isInCaptureZone(new THREE.Vector3(x, y, z), 'red');
      
      if (isInBlueZone || isInRedZone) {
        // Voxel is in capture zone, cannot be damaged
        this.showMessage('Cannot damage capture zone!');
        return;
      }
      
      // Destroy voxel instantly (1 hit = 1 voxel)
      const result = this.world.damageVoxel(x, y, z, 3);

      if (result.destroyed) {
        // Chunk automatically marked dirty by setVoxel
        this.sounds.voxelBreak();
        this.inventory++;
        this.showMessage(`+1 voxel (Inventory: ${this.inventory})`);
        if (result.collapsed > 0) {
          this.sounds.collapse();
          // Trigger collapse animation
          this.createCollapseAnimation(result.collapsedVoxels);
        }
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
      const allCollapsedVoxels: Array<{ x: number; y: number; z: number; type: number }> = [];
      
      for (let i = 0; i < 2; i++) {
        const vx = hit.voxelPos.x + Math.round(hit.normal.x) * i;
        const vy = hit.voxelPos.y + Math.round(hit.normal.y) * i;
        const vz = hit.voxelPos.z + Math.round(hit.normal.z) * i;
        
        // Check if voxel is in capture zone (indestructible)
        const isInBlueZone = this.isInCaptureZone(new THREE.Vector3(vx, vy, vz), 'blue');
        const isInRedZone = this.isInCaptureZone(new THREE.Vector3(vx, vy, vz), 'red');
        
        if (isInBlueZone || isInRedZone) {
          // Voxel is in capture zone, cannot be damaged
          continue;
        }
        
        if (this.world.canDig(vx, vy, vz)) {
          const result = this.world.damageVoxel(vx, vy, vz, 3); // Spade destroys instantly
          if (result.destroyed) {
            anyDestroyed = true;
            totalCollapsed += result.collapsed;
            allCollapsedVoxels.push(...result.collapsedVoxels);
          }
        }
      }
      if (anyDestroyed) {
        // Chunk automatically marked dirty by setVoxel
        this.sounds.voxelBreak();
        if (totalCollapsed > 0) {
          this.sounds.collapse();
          // Trigger collapse animation
          this.createCollapseAnimation(allCollapsedVoxels);
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
      // Bot model is already rotated to face +Z by default
      // Blue team faces toward red team (positive Z), Red team faces toward blue team (negative Z)
      const initialYaw = team === 'blue' ? 0 : Math.PI;
      group.rotation.y = initialYaw;
      this.scene.add(group);

      const nameTag = this.createNameTag(team, botNames[i] || `Bot${i}`);
      nameTag.position.y = 2.6;
      group.add(nameTag);

      // Randomly assign weapon (rifle or SMG)
      const botWeapon = Math.random() > 0.5 ? 'rifle' : 'smg';
      const weaponMesh = this.createBotWeaponMesh(botWeapon);
      // Position weapon prominently in bot's hands (right hand, chest level, more forward)
      weaponMesh.position.set(0.3, 1.15, -0.4);
      // Tilt to look like holding weapon ready
      weaponMesh.rotation.x = -0.15;
      weaponMesh.rotation.y = 0.05; // Slight angle
      group.add(weaponMesh);

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
        targetYaw: team === 'blue' ? 0 : Math.PI,
        currentYaw: team === 'blue' ? 0 : Math.PI,
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
        weapon: botWeapon,
        weaponMesh: weaponMesh,
        isAiming: false,
        aimTransition: 0,
        // CTF flag system
        carryingFlag: false,
        flagMesh: null,
        // Human-like behavior
        lookAroundTimer: 0,
        lookAroundTarget: 0,
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

    // Rotate the entire group to face +Z (forward direction)
    // This fixes the backwards movement issue
    group.rotation.y = Math.PI;

    return { group, leftLeg, rightLeg, leftArm, rightArm, head };
  }

  private createBotWeaponMesh(weaponType: 'rifle' | 'smg'): THREE.Group {
    const weaponGroup = new THREE.Group();
    
    if (weaponType === 'rifle') {
      // Rifle - longer barrel, wooden stock, more visible
      const barrelGeo = new THREE.CylinderGeometry(0.05, 0.05, 1.0, 8);
      const barrelMat = new THREE.MeshLambertMaterial({ color: 0x1a1a1a });
      const barrel = new THREE.Mesh(barrelGeo, barrelMat);
      barrel.rotation.x = Math.PI / 2;
      barrel.position.set(0, 0, -0.5);
      weaponGroup.add(barrel);
      
      const receiverGeo = new THREE.BoxGeometry(0.15, 0.12, 0.4);
      const receiverMat = new THREE.MeshLambertMaterial({ color: 0x2a2a2a });
      const receiver = new THREE.Mesh(receiverGeo, receiverMat);
      receiver.position.set(0, 0, 0);
      weaponGroup.add(receiver);
      
      const stockGeo = new THREE.BoxGeometry(0.12, 0.15, 0.35);
      const stockMat = new THREE.MeshLambertMaterial({ color: 0x5c3a1e });
      const stock = new THREE.Mesh(stockGeo, stockMat);
      stock.position.set(0, -0.02, 0.35);
      weaponGroup.add(stock);
      
      // Magazine - more visible
      const magGeo = new THREE.BoxGeometry(0.08, 0.15, 0.1);
      const magMat = new THREE.MeshLambertMaterial({ color: 0x1a1a1a });
      const mag = new THREE.Mesh(magGeo, magMat);
      mag.position.set(0, -0.12, 0);
      weaponGroup.add(mag);
    } else {
      // SMG - shorter barrel, compact, more visible
      const barrelGeo = new THREE.CylinderGeometry(0.05, 0.05, 0.7, 8);
      const barrelMat = new THREE.MeshLambertMaterial({ color: 0x1a1a1a });
      const barrel = new THREE.Mesh(barrelGeo, barrelMat);
      barrel.rotation.x = Math.PI / 2;
      barrel.position.set(0, 0, -0.35);
      weaponGroup.add(barrel);
      
      const receiverGeo = new THREE.BoxGeometry(0.15, 0.13, 0.3);
      const receiverMat = new THREE.MeshLambertMaterial({ color: 0x2a2a2a });
      const receiver = new THREE.Mesh(receiverGeo, receiverMat);
      receiver.position.set(0, 0, 0);
      weaponGroup.add(receiver);
      
      const stockGeo = new THREE.BoxGeometry(0.1, 0.12, 0.2);
      const stockMat = new THREE.MeshLambertMaterial({ color: 0x3a3a3a });
      const stock = new THREE.Mesh(stockGeo, stockMat);
      stock.position.set(0, -0.01, 0.2);
      weaponGroup.add(stock);
      
      // Large magazine - very visible
      const magGeo = new THREE.BoxGeometry(0.1, 0.25, 0.12);
      const magMat = new THREE.MeshLambertMaterial({ color: 0x1a1a1a });
      const mag = new THREE.Mesh(magGeo, magMat);
      mag.position.set(0, -0.18, 0);
      weaponGroup.add(mag);
    }
    
    return weaponGroup;
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
    // Rifle - WW2 bolt action with iron sights, more visible
    const rifle = new THREE.Group();

    const rifleBody = new THREE.Mesh(
      new THREE.BoxGeometry(0.08, 0.08, 0.55),
      new THREE.MeshLambertMaterial({ color: 0x2a2a2a })
    );
    rifleBody.position.set(0, 0, -0.15);
    rifle.add(rifleBody);

    const rifleBarrel = new THREE.Mesh(
      new THREE.CylinderGeometry(0.025, 0.025, 0.6, 8),
      new THREE.MeshLambertMaterial({ color: 0x1a1a1a })
    );
    rifleBarrel.rotation.x = Math.PI / 2;
    rifleBarrel.position.set(0, 0.01, -0.65);
    rifle.add(rifleBarrel);

    const rifleStock = new THREE.Mesh(
      new THREE.BoxGeometry(0.08, 0.12, 0.3),
      new THREE.MeshLambertMaterial({ color: 0x5c3a1e })
    );
    rifleStock.position.set(0, -0.02, 0.25);
    rifle.add(rifleStock);

    // Iron sights - more visible
    const rearSight = new THREE.Mesh(
      new THREE.BoxGeometry(0.04, 0.035, 0.015),
      new THREE.MeshLambertMaterial({ color: 0x111111 })
    );
    rearSight.position.set(0, 0.065, 0.05);
    rifle.add(rearSight);

    const frontSight = new THREE.Mesh(
      new THREE.BoxGeometry(0.02, 0.04, 0.015),
      new THREE.MeshLambertMaterial({ color: 0x111111 })
    );
    frontSight.position.set(0, 0.065, -0.55);
    rifle.add(frontSight);

    const rifleMag = new THREE.Mesh(
      new THREE.BoxGeometry(0.06, 0.08, 0.12),
      new THREE.MeshLambertMaterial({ color: 0x2a2a2a })
    );
    rifleMag.position.set(0, -0.08, -0.05);
    rifle.add(rifleMag);

    rifle.position.copy(this.hipPosition);
    this.weaponModels.set('rifle', rifle);

    // SMG - WW2 Thompson style with iron sights, more visible
    const smg = new THREE.Group();

    const smgBody = new THREE.Mesh(
      new THREE.BoxGeometry(0.09, 0.09, 0.35),
      new THREE.MeshLambertMaterial({ color: 0x2a2a2a })
    );
    smgBody.position.set(0, 0, -0.1);
    smg.add(smgBody);

    const smgBarrel = new THREE.Mesh(
      new THREE.CylinderGeometry(0.025, 0.025, 0.35, 8),
      new THREE.MeshLambertMaterial({ color: 0x1a1a1a })
    );
    smgBarrel.rotation.x = Math.PI / 2;
    smgBarrel.position.set(0, 0.01, -0.4);
    smg.add(smgBarrel);

    const smgStock = new THREE.Mesh(
      new THREE.BoxGeometry(0.07, 0.1, 0.18),
      new THREE.MeshLambertMaterial({ color: 0x5c3a1e })
    );
    smgStock.position.set(0, -0.01, 0.18);
    smg.add(smgStock);

    // Iron sights - more visible
    const smgRearSight = new THREE.Mesh(
      new THREE.BoxGeometry(0.035, 0.03, 0.015),
      new THREE.MeshLambertMaterial({ color: 0x111111 })
    );
    smgRearSight.position.set(0, 0.065, 0.0);
    smg.add(smgRearSight);

    const smgFrontSight = new THREE.Mesh(
      new THREE.BoxGeometry(0.018, 0.035, 0.015),
      new THREE.MeshLambertMaterial({ color: 0x111111 })
    );
    smgFrontSight.position.set(0, 0.065, -0.35);
    smg.add(smgFrontSight);

    const smgMag = new THREE.Mesh(
      new THREE.CylinderGeometry(0.045, 0.045, 0.18, 8),
      new THREE.MeshLambertMaterial({ color: 0x1a1a1a })
    );
    smgMag.position.set(0, -0.12, 0.02);
    smg.add(smgMag);

    const smgGrip = new THREE.Mesh(
      new THREE.BoxGeometry(0.05, 0.1, 0.05),
      new THREE.MeshLambertMaterial({ color: 0x5c3a1e })
    );
    smgGrip.position.set(0, -0.1, 0.1);
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

    // Check if there's a wall at body or head height
    if (this.world.isSolid(bx, bodyY, bz)) {
      // Check if bot can step up (1 voxel step)
      const stepUpY = Math.floor(botY + 1.5);
      const stepUpHeadY = Math.floor(botY + 2.5);
      if (!this.world.isSolid(bx, stepUpY, bz) && !this.world.isSolid(bx, stepUpHeadY, bz)) {
        return true; // Can step up
      }
      return false; // Can't move or step up
    }
    if (this.world.isSolid(bx, headY, bz)) return false;

    return true;
  }

  // AI Awareness: Find nearby cover
  private findNearbyCover(bot: Bot, enemyPos: THREE.Vector3): THREE.Vector3 | null {
    const searchRadius = 10;
    const coverPositions: { pos: THREE.Vector3; score: number }[] = [];

    // Search in a grid around the bot
    for (let dx = -searchRadius; dx <= searchRadius; dx += 2) {
      for (let dz = -searchRadius; dz <= searchRadius; dz += 2) {
        const checkX = bot.position.x + dx;
        const checkZ = bot.position.z + dz;
        const groundY = this.world.getGroundHeight(checkX, checkZ);

        // Check if there's a wall/voxel nearby that can provide cover
        const hasCover = 
          this.world.isSolid(Math.floor(checkX + 1), Math.floor(groundY + 0.5), Math.floor(checkZ)) ||
          this.world.isSolid(Math.floor(checkX - 1), Math.floor(groundY + 0.5), Math.floor(checkZ)) ||
          this.world.isSolid(Math.floor(checkX), Math.floor(groundY + 0.5), Math.floor(checkZ + 1)) ||
          this.world.isSolid(Math.floor(checkX), Math.floor(groundY + 0.5), Math.floor(checkZ - 1));

        if (hasCover) {
          // Score based on distance to bot and how well it blocks enemy view
          const distToBot = Math.sqrt(dx * dx + dz * dz);
          const toEnemy = enemyPos.clone().sub(new THREE.Vector3(checkX, groundY, checkZ)).normalize();
          const coverDirection = new THREE.Vector3(dx, 0, dz).normalize();
          const alignment = Math.abs(toEnemy.dot(coverDirection));
          
          const score = (1 / (distToBot + 1)) * (1 + alignment);
          coverPositions.push({
            pos: new THREE.Vector3(checkX, groundY, checkZ),
            score
          });
        }
      }
    }

    if (coverPositions.length === 0) return null;

    // Return best cover position
    coverPositions.sort((a, b) => b.score - a.score);
    return coverPositions[0].pos;
  }

  // AI Awareness: Check for edges/cliffs
  private isNearEdge(bot: Bot): boolean {
    const checkDist = 1.5;
    const directions = [
      { x: checkDist, z: 0 },
      { x: -checkDist, z: 0 },
      { x: 0, z: checkDist },
      { x: 0, z: -checkDist }
    ];

    const currentY = this.world.getGroundHeight(bot.position.x, bot.position.z);

    for (const dir of directions) {
      const checkX = bot.position.x + dir.x;
      const checkZ = bot.position.z + dir.z;
      const checkY = this.world.getGroundHeight(checkX, checkZ);
      
      // If there's a significant drop, it's an edge
      if (currentY - checkY > 2) {
        return true;
      }
    }

    return false;
  }

  // AI Awareness: Check for obstacles in path
  private hasObstacleInPath(bot: Bot, targetPos: THREE.Vector3): boolean {
    const direction = targetPos.clone().sub(bot.position).normalize();
    const checkDist = 3;
    
    for (let i = 1; i <= checkDist; i++) {
      const checkX = bot.position.x + direction.x * i;
      const checkZ = bot.position.z + direction.z * i;
      const groundY = this.world.getGroundHeight(checkX, checkZ);
      
      // Check if there's a wall at body or head height
      if (this.world.isSolid(Math.floor(checkX + 0.5), Math.floor(groundY + 0.5), Math.floor(checkZ + 0.5)) ||
          this.world.isSolid(Math.floor(checkX + 0.5), Math.floor(groundY + 1.5), Math.floor(checkZ + 0.5))) {
        return true;
      }
    }

    return false;
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

      // CTF Flag Logic for Bots
      this.updateBotFlagLogic(bot, dt, enemyTarget, distToEnemy);

      // Update cooldowns
      bot.jumpCooldown = Math.max(0, bot.jumpCooldown - dt);
      bot.dodgeTimer = Math.max(0, bot.dodgeTimer - dt);

      // Detect stuck - improved detection
      const moveDist = bot.position.distanceTo(bot.lastPos);
      if (moveDist < 0.1) { // Increased threshold for better detection
        bot.stuckTimer += dt;
      } else {
        bot.stuckTimer = 0;
      }
      bot.lastPos.copy(bot.position);
      
      // Improved stuck recovery
      if (bot.stuckTimer > 0.5 && bot.grounded) {
        // Try multiple recovery strategies
        if (bot.jumpCooldown <= 0) {
          // Strategy 1: Jump and move in random direction
          bot.velocity.y = 9;
          bot.jumpCooldown = 1.5;
          
          const randomAngle = Math.random() * Math.PI * 2;
          const escapeX = bot.position.x + Math.cos(randomAngle) * 3;
          const escapeZ = bot.position.z + Math.sin(randomAngle) * 3;
          bot.targetPos.set(escapeX, bot.position.y, escapeZ);
          bot.stuckTimer = 0;
        } else {
          // Strategy 2: Try alternative path around obstacle
          const toTarget = bot.targetPos.clone().sub(bot.position);
          const currentAngle = Math.atan2(toTarget.z, toTarget.x);
          
          // Try 45 degrees left or right
          const tryLeft = Math.random() > 0.5;
          const alternativeAngle = currentAngle + (tryLeft ? Math.PI / 4 : -Math.PI / 4);
          const altX = bot.position.x + Math.cos(alternativeAngle) * 5;
          const altZ = bot.position.z + Math.sin(alternativeAngle) * 5;
          bot.targetPos.set(altX, bot.position.y, altZ);
          bot.stuckTimer = 0;
        }
      }

      // AI Awareness: Check for edges and avoid them
      if (this.isNearEdge(bot) && bot.grounded && bot.jumpCooldown <= 0) {
        // Jump away from edge
        bot.velocity.y = 8;
        bot.jumpCooldown = 2;
        // Move backward from edge
        const awayFromEdge = bot.position.clone().sub(bot.targetPos).normalize();
        bot.targetPos.copy(bot.position).add(awayFromEdge.multiplyScalar(5));
      }

      if (bot.stuckTimer > 1.0) {
        // Check if there's an obstacle in the path
        if (this.hasObstacleInPath(bot, bot.targetPos)) {
          // Try to find alternative path
          const alternativeAngle = (Math.random() > 0.5 ? 1 : -1) * Math.PI / 4;
          const toTarget = bot.targetPos.clone().sub(bot.position);
          const rotatedX = toTarget.x * Math.cos(alternativeAngle) - toTarget.z * Math.sin(alternativeAngle);
          const rotatedZ = toTarget.x * Math.sin(alternativeAngle) + toTarget.z * Math.cos(alternativeAngle);
          bot.targetPos.set(
            bot.position.x + rotatedX,
            bot.position.y,
            bot.position.z + rotatedZ
          );
        }
        
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

      // SMART DECISION MAKING - MORE TACTICAL
      if (bot.behaviorTimer <= 0) {
        bot.behaviorTimer = 2 + Math.random() * 3; // Longer decision cycles

        // RETREAT when low HP
        if (hpPercent < 0.3 && enemyTarget && distToEnemy < 25) {
          bot.behaviorState = 'retreat';
          bot.behaviorTimer = 3 + Math.random() * 2;
        }
        // JUMP DODGE when being shot at
        else if (bot.dodgeTimer > 0 && bot.grounded && bot.jumpCooldown <= 0) {
          bot.behaviorState = 'jumpdodge';
          bot.behaviorTimer = 0.5;
        }
        // ESCORT FLAG CARRIER - High priority
        else if (this.shouldEscortFlagCarrier(bot)) {
          bot.behaviorState = 'escort';
          bot.behaviorTimer = 2 + Math.random() * 2;
        }
        // CAPTURE FLAG - High priority when no enemy nearby or far away
        else if (!enemyTarget || distToEnemy > 30) {
          // 70% chance to capture flag when no immediate threat
          if (Math.random() < 0.7) {
            bot.behaviorState = 'capture';
            bot.behaviorTimer = 4 + Math.random() * 3;
          } else {
            bot.behaviorState = 'patrol';
            bot.behaviorTimer = 3 + Math.random() * 2;
          }
        }
        // COMBAT BEHAVIORS - MORE DEFENSIVE
        else if (enemyTarget && distToEnemy < 20) {
          const roll = Math.random();
          if (roll < 0.3) {
            // Take cover (INCREASED from 15%)
            bot.behaviorState = 'cover';
            bot.coverTimer = 2 + Math.random() * 2; // Longer cover time
            bot.behaviorTimer = bot.coverTimer;
          } else if (roll < 0.5) {
            // Peek and shoot
            bot.behaviorState = 'peek';
            bot.crouchTimer = 0.5 + Math.random() * 0.8;
            bot.behaviorTimer = 0.8 + Math.random() * 0.5;
          } else if (roll < 0.65 * bot.aggression) {
            // Strafe (only if aggressive)
            bot.behaviorState = 'strafe';
            bot.strafeDirection = Math.random() > 0.5 ? 1 : -1;
            bot.behaviorTimer = 1.5 + Math.random() * 2;
          } else if (roll < 0.75) {
            // Hold position and aim
            bot.behaviorState = 'crouch';
            bot.crouchTimer = 1.5 + Math.random() * 2;
            bot.behaviorTimer = bot.crouchTimer;
          } else {
            // Flank
            bot.behaviorState = 'flank';
            bot.behaviorTimer = 2 + Math.random() * 2;
          }
        }
        // MEDIUM RANGE - MORE TACTICAL
        else if (enemyTarget && distToEnemy < 40) {
          const roll = Math.random();
          if (roll < 0.35) {
            // Take cover (INCREASED)
            bot.behaviorState = 'cover';
            bot.coverTimer = 2.5 + Math.random() * 2.5; // Much longer cover
            bot.behaviorTimer = bot.coverTimer;
          } else if (roll < 0.5) {
            // Hold position and aim
            bot.behaviorState = 'crouch';
            bot.crouchTimer = 2 + Math.random() * 2.5;
            bot.behaviorTimer = bot.crouchTimer;
          } else if (roll < 0.65 * bot.aggression) {
            // Strafe (only if aggressive)
            bot.behaviorState = 'strafe';
            bot.strafeDirection = Math.random() > 0.5 ? 1 : -1;
            bot.behaviorTimer = 2 + Math.random() * 2;
          } else if (roll < 0.8) {
            // Peek
            bot.behaviorState = 'peek';
            bot.crouchTimer = 0.8 + Math.random() * 1;
            bot.behaviorTimer = 1 + Math.random() * 0.8;
          } else {
            // Flank or capture
            if (Math.random() > 0.5) {
              bot.behaviorState = 'flank';
              bot.behaviorTimer = 3 + Math.random() * 3;
            } else {
              bot.behaviorState = 'capture';
              bot.behaviorTimer = 4 + Math.random() * 3;
            }
          }
        }
        // NO ENEMY - CAPTURE OBJECTIVE
        else {
          bot.behaviorState = 'capture';
          bot.behaviorTimer = 4 + Math.random() * 4;
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
            
            // If in capture mode, be more direct and aggressive
            if (bot.behaviorState === 'capture') {
              // Move directly toward flag with slight variation
              const directness = 0.8 + Math.random() * 0.2; // 80-100% direct
              bot.targetPos.set(
                flagPos.x + (Math.random() - 0.5) * 10 * (1 - directness),
                bot.position.y,
                flagPos.z + (Math.random() - 0.5) * 10 * (1 - directness)
              );
            } else {
              // Patrol with more variation
              bot.targetPos.set(
                flagPos.x + (Math.random() - 0.5) * 40,
                bot.position.y,
                flagPos.z + (Math.random() - 0.5) * 30
              );
            }
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
            // Improved flanking: move to side of enemy while considering flag position
            const toEnemy = enemyTarget.pos.clone().sub(bot.position);
            const flankAngle = Math.PI / 2 * (bot.strafeDirection > 0 ? 1 : -1);
            const flankX = Math.cos(flankAngle) * toEnemy.x - Math.sin(flankAngle) * toEnemy.z;
            const flankZ = Math.sin(flankAngle) * toEnemy.x + Math.cos(flankAngle) * toEnemy.z;
            
            // Calculate flank position (5-10 units to the side of enemy)
            const flankDist = 5 + Math.random() * 5;
            let flankPosX = enemyTarget.pos.x + flankX * flankDist;
            let flankPosZ = enemyTarget.pos.z + flankZ * flankDist;
            
            // If carrying flag, try to flank toward own base instead
            if (bot.carryingFlag) {
              const ownFlagPos = bot.team === 'blue' ? BLUE_FLAG_POS : RED_FLAG_POS;
              const toBase = new THREE.Vector3(ownFlagPos.x - bot.position.x, 0, ownFlagPos.z - bot.position.z);
              const baseAngle = Math.atan2(toBase.z, toBase.x);
              flankPosX = bot.position.x + Math.cos(baseAngle + flankAngle * 0.3) * flankDist;
              flankPosZ = bot.position.z + Math.sin(baseAngle + flankAngle * 0.3) * flankDist;
            }
            
            bot.targetPos.set(
              flankPosX,
              bot.position.y,
              flankPosZ
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
          
          // AI Awareness: Find and move to nearby cover
          if (enemyTarget && bot.coverTimer > 0.5) {
            const coverPosition = this.findNearbyCover(bot, enemyTarget.pos);
            if (coverPosition) {
              const distToCover = bot.position.distanceTo(coverPosition);
              if (distToCover > 1) {
                // Move toward cover
                bot.targetPos.copy(coverPosition);
              } else {
                // Already in cover, stay put
                bot.targetPos.copy(bot.position);
              }
            }
          }

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
          break;

        case 'crouch':
          bot.isCrouching = true;
          bot.crouchTimer -= dt;
          if (bot.crouchTimer <= 0) {
            bot.behaviorState = 'capture';
            bot.isCrouching = false;
          }
          // Stay in place and face enemy
          bot.targetPos.copy(bot.position);
          if (enemyTarget) {
            const toEnemy = enemyTarget.pos.clone().sub(bot.position);
            bot.targetYaw = Math.atan2(-toEnemy.x, -toEnemy.z);
          }
          break;

        case 'escort':
          bot.isCrouching = false;
          // Find flag carrier position
          const flagCarrierPos = this.getFlagCarrierPosition(bot.team);
          if (flagCarrierPos) {
            // Move to position near flag carrier (3-5 units away)
            const toCarrier = flagCarrierPos.clone().sub(bot.position);
            const distToCarrier = toCarrier.length();
            
            if (distToCarrier > 5) {
              // Move toward flag carrier
              toCarrier.normalize();
              bot.targetPos.set(
                flagCarrierPos.x - toCarrier.x * 4,
                bot.position.y,
                flagCarrierPos.z - toCarrier.z * 4
              );
            } else {
              // Stay near flag carrier and face enemies
              bot.targetPos.copy(bot.position);
              if (enemyTarget) {
                const toEnemy = enemyTarget.pos.clone().sub(bot.position);
                bot.targetYaw = Math.atan2(-toEnemy.x, -toEnemy.z);
              }
            }
          } else {
            // No flag carrier, switch to capture
            bot.behaviorState = 'capture';
          }
          break;
      }

      // MOVEMENT - FIXED: Allow movement in both X and Z simultaneously
      const toTarget = bot.targetPos.clone().sub(bot.position);
      toTarget.y = 0;
      const distToTarget = toTarget.length();
      
      // Add small threshold to prevent micro-movements
      if (distToTarget > 0.3) {
        toTarget.normalize();
        // FASTER SPEED: 10 units/sec normal, 3 when crouching (slower)
        const speed = bot.isCrouching ? 3 : 10;
        const moveX = toTarget.x * speed * dt;
        const moveZ = toTarget.z * speed * dt;
        const newX = bot.position.x + moveX;
        const newZ = bot.position.z + moveZ;

        // Try to move in BOTH directions independently (not else if)
        let movedX = false;
        let movedZ = false;
        
        // Only move if the movement is significant enough
        if (Math.abs(moveX) > 0.01) {
          if (this.botCanMoveTo(newX, bot.position.z, bot.position.y)) {
            bot.position.x = newX;
            movedX = true;
          } else if (bot.grounded) {
            // Try to step up over 1-voxel obstacle
            const groundY = this.world.getGroundHeight(newX, bot.position.z);
            if (groundY > bot.position.y + 0.5 && groundY <= bot.position.y + 1.5) {
              bot.position.x = newX;
              bot.position.y = groundY;
              movedX = true;
            }
          }
        }
        
        if (Math.abs(moveZ) > 0.01) {
          if (this.botCanMoveTo(bot.position.x, newZ, bot.position.y)) {
            bot.position.z = newZ;
            movedZ = true;
          } else if (bot.grounded) {
            // Try to step up over 1-voxel obstacle
            const groundY = this.world.getGroundHeight(bot.position.x, newZ);
            if (groundY > bot.position.y + 0.5 && groundY <= bot.position.y + 1.5) {
              bot.position.z = newZ;
              bot.position.y = groundY;
              movedZ = true;
            }
          }
        }
        
        // Only set isMoving if actually moved
        bot.isMoving = movedX || movedZ;

        // Set target yaw - prioritize movement direction when moving, face enemy when stationary
        // Note: In Three.js, forward is -Z, so we use atan2(-x, -z) to get correct angle
        if (bot.carryingFlag) {
          // When carrying flag, ALWAYS face movement direction (toward own base)
          bot.targetYaw = Math.atan2(-toTarget.x, -toTarget.z);
        } else if (bot.isMoving) {
          // When moving, face movement direction
          bot.targetYaw = Math.atan2(-toTarget.x, -toTarget.z);
        } else if (enemyTarget && distToEnemy < 50) {
          // When stationary and in combat, face the enemy
          const toEnemy = enemyTarget.pos.clone().sub(bot.position);
          bot.targetYaw = Math.atan2(-toEnemy.x, -toEnemy.z);
        }
      } else {
        bot.isMoving = false;
        bot.stuckTimer = 0;
        // When not moving, ALWAYS face enemy if in combat range
        if (enemyTarget && distToEnemy < 50) {
          const toEnemy = enemyTarget.pos.clone().sub(bot.position);
          bot.targetYaw = Math.atan2(-toEnemy.x, -toEnemy.z);
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
        this.dropBotFlag(bot);
        bot.isDead = true;
        bot.respawnTimer = 13; // Increased to 13 seconds to match player
        bot.mesh.visible = false;
        continue;
      }

      // SHOOTING - MUCH BETTER ACCURACY
      bot.shootTimer -= dt;
      
      // Determine if bot should be aiming
      const shouldAim = enemyTarget !== null && distToEnemy < 35 && !bot.isMoving && bot.shootTimer <= 0.5;
      bot.isAiming = shouldAim;
      
      // Smooth aiming transition
      const aimTarget = shouldAim ? 1 : 0;
      bot.aimTransition += (aimTarget - bot.aimTransition) * Math.min(dt * 8, 1);
      
      if (bot.shootTimer <= 0 && enemyTarget) {
        const dist = bot.position.distanceTo(enemyTarget.pos);
        if (dist < 50) {
          // Use bot's weapon fire rate
          const weaponFireRate = bot.weapon === 'rifle' ? 0.4 : 0.1;
          bot.shootTimer = weaponFireRate + Math.random() * 0.5;
          
          // Play spatial gunshot sound for nearby players
          const distToPlayer = bot.position.distanceTo(this.player.position);
          if (distToPlayer < 100 && distToPlayer > 5) {
            // Calculate direction for panning (-1 = left, 1 = right)
            const toBot = bot.position.clone().sub(this.player.position);
            const playerForward = this.player.getAimDirection();
            const playerRight = new THREE.Vector3(-playerForward.z, 0, playerForward.x);
            const direction = toBot.dot(playerRight) / distToPlayer;
            this.sounds.playDistantShot(bot.weapon, distToPlayer, direction);
          }
          
          // Eject bullet shell from bot's weapon
          // Calculate bot's shooting direction (toward enemy)
          const botShootDir = enemyTarget.pos.clone().sub(bot.position).normalize();
          // Calculate muzzle position (at bot's weapon, slightly in front)
          const botMuzzlePos = bot.position.clone();
          botMuzzlePos.y += 1.15; // Weapon height
          botMuzzlePos.add(botShootDir.clone().multiplyScalar(0.5)); // In front of bot
          
          // Eject shell from bot's weapon
          this.ejectBulletShell(botMuzzlePos, botShootDir);
          
          // Create muzzle flash for bot
          this.createMuzzleFlash(botMuzzlePos, botShootDir);

          // Base accuracy: 25% (up from 15%)
          let accuracy = 0.25;
          
          // Skill modifier
          accuracy *= (0.7 + bot.skill * 0.6); // 0.7-1.3x based on skill
          
          // Crouching bonus
          if (bot.isCrouching) accuracy *= 1.4;
          
          // Aiming bonus (ADS)
          if (bot.isAiming) accuracy *= 1.5;
          
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
              this.dropPlayerFlag();
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
              this.dropBotFlag(enemyTarget.bot);
              enemyTarget.bot.isDead = true;
              enemyTarget.bot.respawnTimer = 13; // Increased to 13 seconds to match player
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
      // Only update mesh position if not in death animation
      if (!this.deathAnimations.has(bot.mesh.uuid)) {
        bot.mesh.position.copy(bot.position);
        
        // Crouch visual
        const targetScale = bot.isCrouching ? 0.7 : 1.0;
        const currentScale = bot.mesh.scale.y;
        bot.mesh.scale.y = currentScale + (targetScale - currentScale) * 0.2;
        bot.mesh.position.y = bot.position.y + (bot.isCrouching ? -0.3 : 0);
      }
      
      // Smooth rotation
      const yawDiff = bot.targetYaw - bot.currentYaw;
      const normalizedDiff = Math.atan2(Math.sin(yawDiff), Math.cos(yawDiff));
      bot.currentYaw += normalizedDiff * Math.min(dt * 10, 1); // Faster rotation
      bot.mesh.rotation.y = bot.currentYaw;
      
      // Weapon aiming animation - more dramatic and visible
      if (bot.weaponMesh) {
        const hipPosition = new THREE.Vector3(0.3, 1.15, -0.4);
        const aimPosition = new THREE.Vector3(0.1, 1.25, -0.5); // Move more forward and up when aiming
        
        // Store target position
        const targetPosition = new THREE.Vector3();
        targetPosition.lerpVectors(hipPosition, aimPosition, bot.aimTransition);
        
        // Smoothly interpolate current position towards target
        bot.weaponMesh.position.lerp(targetPosition, Math.min(dt * 12, 1));
        
        // Smooth rotation towards target (more dramatic tilt when aiming)
        const baseTilt = -0.15; // Base tilt for holding weapon
        const aimTilt = -0.35; // Much more tilt when aiming
        const targetRotationX = baseTilt + (aimTilt - baseTilt) * bot.aimTransition;
        bot.weaponMesh.rotation.x += (targetRotationX - bot.weaponMesh.rotation.x) * Math.min(dt * 12, 1);
        
        // Add slight Y rotation when aiming (weapon angles toward target)
        const baseYaw = 0.05;
        const aimYaw = 0.0; // Straight when aiming
        const targetRotationY = baseYaw + (aimYaw - baseYaw) * bot.aimTransition;
        bot.weaponMesh.rotation.y += (targetRotationY - bot.weaponMesh.rotation.y) * Math.min(dt * 12, 1);
      }
      
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
      
      // Head tracking - look at enemy when shooting
      if (enemyTarget && distToEnemy < 45 && bot.shootTimer <= 0.5) {
        // Calculate angle to enemy relative to bot's current body rotation
        const toEnemy = enemyTarget.pos.clone().sub(bot.position);
        const targetHeadYaw = Math.atan2(-toEnemy.x, -toEnemy.z);
        const headYaw = targetHeadYaw - bot.currentYaw;
        const normalizedHeadYaw = Math.atan2(Math.sin(headYaw), Math.cos(headYaw));
        
        // Clamp head rotation to ±70 degrees (±1.22 radians) - more range
        const clampedHeadYaw = Math.max(-1.22, Math.min(1.22, normalizedHeadYaw));
        
        // Smoothly interpolate head rotation (faster for combat)
        bot.head.rotation.y = bot.head.rotation.y + (clampedHeadYaw - bot.head.rotation.y) * Math.min(dt * 12, 1);
        
        // Look slightly down at enemy (pitch)
        const distToEnemyVertical = Math.abs(toEnemy.y);
        const targetPitch = distToEnemy < 10 ? -0.2 : -0.1; // Look down more when close
        bot.head.rotation.x += (targetPitch - bot.head.rotation.x) * Math.min(dt * 8, 1);
        
        // Reset look around timer when in combat
        bot.lookAroundTimer = 0;
      } else if (bot.isMoving) {
        // When moving, head faces forward with slight movement
        bot.head.rotation.y *= 0.92; // Smoothly return to center
        bot.head.rotation.x *= 0.95; // Return pitch to center
        bot.lookAroundTimer = 0;
      } else {
        // When stationary and not shooting, look around human-like (more dramatic)
        bot.lookAroundTimer -= dt;
        
        if (bot.lookAroundTimer <= 0) {
          // Set new look around target (random direction, more dramatic)
          bot.lookAroundTarget = (Math.random() - 0.5) * 2.0; // ±1.0 radians (±57 degrees)
          bot.lookAroundTimer = 1.5 + Math.random() * 2.5; // Look around every 1.5-4 seconds
          
          // Also add pitch variation (look up/down slightly)
          const pitchTarget = (Math.random() - 0.5) * 0.4; // ±0.2 radians (±11 degrees)
          bot.head.rotation.x += (pitchTarget - bot.head.rotation.x) * Math.min(dt * 3, 1);
        }
        
        // Smoothly interpolate to look around target (slower, more natural)
        bot.head.rotation.y += (bot.lookAroundTarget - bot.head.rotation.y) * Math.min(dt * 2.5, 1);
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
      // Show highlight for tools (not weapons)
      if (this.equipment === 'rifle' || this.equipment === 'smg') {
        this.highlightMesh.visible = false;
      } else {
        this.highlightMesh.visible = true;
        this.highlightMesh.position.set(hit.voxelPos.x, hit.voxelPos.y, hit.voxelPos.z);
      }

      const dist = hit.distance.toFixed(1);
      const v = this.world.getVoxel(hit.voxelPos.x, hit.voxelPos.y, hit.voxelPos.z);
      if (v) {
        const names: Record<number, string> = { 1: 'Dirt', 2: 'Stone', 3: 'Grass', 4: 'Built' };
        this.player.targetInfo = `${names[v.type] || 'Voxel'} | ${dist}m`;
      }

      // Show build preview when we have inventory and not using weapons
      if (this.inventory > 0 && this.equipment !== 'rifle' && this.equipment !== 'smg') {
        const px = hit.voxelPos.x + Math.round(hit.normal.x);
        const py = hit.voxelPos.y + Math.round(hit.normal.y);
        const pz = hit.voxelPos.z + Math.round(hit.normal.z);
        
        // Check if can build here
        const canBuildHere = !this.world.isSolid(px, py, pz) && this.world.canBuild(px, py, pz);
        
        // Check if not inside player
        const voxelCenter = new THREE.Vector3(px + 0.5, py + 0.5, pz + 0.5);
        const playerMin = this.player.position.clone().sub(new THREE.Vector3(this.player.radius, 0, this.player.radius));
        const playerMax = this.player.position.clone().add(new THREE.Vector3(this.player.radius, this.player.currentHeight, this.player.radius));
        const insidePlayer = voxelCenter.x >= playerMin.x && voxelCenter.x <= playerMax.x &&
                            voxelCenter.y >= playerMin.y && voxelCenter.y <= playerMax.y &&
                            voxelCenter.z >= playerMin.z && voxelCenter.z <= playerMax.z;
        
        if (canBuildHere && !insidePlayer) {
          this.buildPreviewMesh.visible = true;
          this.buildPreviewMesh.position.set(px, py, pz);
          // Green color for valid placement
          (this.buildPreviewMesh.material as THREE.MeshBasicMaterial).color.setHex(0x00ff00);
          (this.buildPreviewMesh.material as THREE.MeshBasicMaterial).opacity = 0.5;
        } else {
          this.buildPreviewMesh.visible = true;
          this.buildPreviewMesh.position.set(px, py, pz);
          // Red color for invalid placement
          (this.buildPreviewMesh.material as THREE.MeshBasicMaterial).color.setHex(0xff0000);
          (this.buildPreviewMesh.material as THREE.MeshBasicMaterial).opacity = 0.3;
        }
      } else {
        this.buildPreviewMesh.visible = false;
      }
    } else {
      this.highlightMesh.visible = false;
      this.buildPreviewMesh.visible = false;
      this.player.targetInfo = '';
    }
  }

  private shouldEscortFlagCarrier(bot: Bot): boolean {
    // Don't escort if this bot is carrying the flag
    if (bot.carryingFlag) return false;
    
    // Check if player is carrying the flag and is on the same team
    if (this.player.carryingFlag && this.player.team === bot.team) {
      return true;
    }
    
    // Check if any bot is carrying the flag and is on the same team
    for (const otherBot of this.bots) {
      if (otherBot.team === bot.team && otherBot.carryingFlag && otherBot !== bot) {
        return true;
      }
    }
    
    return false;
  }
  
  private getFlagCarrierPosition(team: 'red' | 'blue'): THREE.Vector3 | null {
    // Check if player is carrying the flag
    if (this.player.carryingFlag && this.player.team === team) {
      return this.player.position.clone();
    }
    
    // Check if any bot is carrying the flag
    for (const bot of this.bots) {
      if (bot.team === team && bot.carryingFlag) {
        return bot.position.clone();
      }
    }
    
    return null;
  }

  private checkFlagCaptures(): void {
    // Check if player captured the flag (brought enemy flag to own base)
    if (this.player.carryingFlag && !this.player.isDead) {
      // Check if player is in their own capture zone
      if (this.isInCaptureZone(this.player.position, this.playerTeam)) {
        if (this.playerTeam === 'blue') {
          this.blueCaptures++;
          this.showMessage('🏁 BLUE TEAM CAPTURED THE FLAG!');
        } else {
          this.redCaptures++;
          this.showMessage('🏁 RED TEAM CAPTURED THE FLAG!');
        }
        
        // Remove flag from player
        this.player.carryingFlag = false;
        if (this.player.flagMesh) {
          this.scene.remove(this.player.flagMesh);
          // Dispose of all children
          this.player.flagMesh.traverse((child) => {
            if (child instanceof THREE.Mesh) {
              child.geometry.dispose();
              if (child.material) {
                (child.material as THREE.Material).dispose();
              }
            }
          });
          this.player.flagMesh = null;
        }
        
        // Return the captured flag to its base
        const enemyFlagTeam = this.playerTeam === 'blue' ? 'red' : 'blue';
        if (enemyFlagTeam === 'blue') {
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
        
        // Respawn player at their base
        this.player.respawn(this.playerTeam);
        this.sounds.capture();
      }
    }
    
    // Check bot captures
    for (const bot of this.bots) {
      if (bot.isDead || !bot.carryingFlag) continue;
      
      // Check if bot is in their own capture zone
      if (this.isInCaptureZone(bot.position, bot.team)) {
        if (bot.team === 'blue') {
          this.blueCaptures++;
          this.showMessage('🏁 BLUE BOT CAPTURED THE FLAG!');
        } else {
          this.redCaptures++;
          this.showMessage('🏁 RED BOT CAPTURED THE FLAG!');
        }
        
        // Remove flag from bot
        bot.carryingFlag = false;
        if (bot.flagMesh) {
          bot.mesh.remove(bot.flagMesh);
          // Dispose of all children
          bot.flagMesh.traverse((child) => {
            if (child instanceof THREE.Mesh) {
              child.geometry.dispose();
              if (child.material) {
                (child.material as THREE.Material).dispose();
              }
            }
          });
          bot.flagMesh = null;
        }
        
        // Return the captured flag to its base
        const enemyFlagTeam = bot.team === 'blue' ? 'red' : 'blue';
        if (enemyFlagTeam === 'blue') {
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
        
        // Respawn bot at their base
        bot.isDead = true;
        bot.respawnTimer = 13; // Increased to 13 seconds to match player
        this.sounds.capture();
      }
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
    
    // Update player's carried flag position
    if (this.player.carryingFlag && this.player.flagMesh) {
      this.player.flagMesh.position.set(
        this.player.position.x + 0.5,
        this.player.position.y + 1.5,
        this.player.position.z
      );
      // Rotate flag to face movement direction
      if (this.player.velocity.length() > 0.1) {
        const angle = Math.atan2(this.player.velocity.x, this.player.velocity.z);
        this.player.flagMesh.rotation.y = angle;
      }
    }

    // CTF Flag System Updates
    this.checkFlagPickup();
    this.updateDroppedFlags(dt);

    const targetTransition = this.isAiming ? 1 : 0;
    this.aimTransition += (targetTransition - this.aimTransition) * Math.min(dt * 10, 1);

    if (this.currentWeaponModel) {
      const targetPos = new THREE.Vector3().lerpVectors(this.hipPosition, this.adsPosition, this.aimTransition);
      this.currentWeaponModel.position.lerp(targetPos, Math.min(dt * 10, 1));
      
      // Apply weapon sway
      this.currentWeaponModel.position.x += this.player.weaponSwayX;
      this.currentWeaponModel.position.y += this.player.weaponSwayY;
    }

    const targetFov = this.isAiming ? 50 : 75;
    this.player.camera.fov += (targetFov - this.player.camera.fov) * Math.min(dt * 10, 1);
    this.player.camera.updateProjectionMatrix();

    if (this.isMouseDown && !this.player.isDead && (this.equipment === 'rifle' || this.equipment === 'smg')) {
      this.shoot(performance.now() / 1000);
    }
    
    // Continuous pickaxe use
    if (this.isMouseDown && !this.player.isDead && this.equipment === 'pickaxe') {
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
    
    // Update reload animation
    this.updateReload(dt);
    
    // Animate weapon during reload - improved animation
    if (this.isReloadAnimating && this.currentWeaponModel && (this.equipment === 'rifle' || this.equipment === 'smg')) {
      const reloadProgress = this.reloadAnimationTime / this.reloadAnimationDuration;
      
      // Enhanced reload animation with more dramatic movement
      if (reloadProgress < 0.15) {
        // Phase 1: Tilt weapon down to expose magazine
        const tiltProgress = reloadProgress / 0.15;
        this.currentWeaponModel.rotation.x = tiltProgress * 0.4;
        this.currentWeaponModel.rotation.z = tiltProgress * 0.15;
        this.currentWeaponModel.position.y = this.hipPosition.y - tiltProgress * 0.15;
        this.currentWeaponModel.position.x = this.hipPosition.x - tiltProgress * 0.05;
      } else if (reloadProgress < 0.35) {
        // Phase 2: Magazine dropping out
        const dropProgress = (reloadProgress - 0.15) / 0.2;
        this.currentWeaponModel.rotation.x = 0.4 + dropProgress * 0.2;
        this.currentWeaponModel.rotation.z = 0.15;
        this.currentWeaponModel.position.y = this.hipPosition.y - 0.15 - dropProgress * 0.1;
        this.currentWeaponModel.position.x = this.hipPosition.x - 0.05;
      } else if (reloadProgress < 0.5) {
        // Phase 3: Pause (magazine out, hand moving to new mag)
        const pauseProgress = (reloadProgress - 0.35) / 0.15;
        this.currentWeaponModel.rotation.x = 0.6 - pauseProgress * 0.1;
        this.currentWeaponModel.rotation.z = 0.15 - pauseProgress * 0.05;
        this.currentWeaponModel.position.y = this.hipPosition.y - 0.25;
        this.currentWeaponModel.position.x = this.hipPosition.x - 0.05;
      } else if (reloadProgress < 0.7) {
        // Phase 4: Magazine inserting
        const insertProgress = (reloadProgress - 0.5) / 0.2;
        this.currentWeaponModel.rotation.x = 0.5 - insertProgress * 0.3;
        this.currentWeaponModel.rotation.z = 0.1 - insertProgress * 0.05;
        this.currentWeaponModel.position.y = this.hipPosition.y - 0.25 + insertProgress * 0.1;
        this.currentWeaponModel.position.x = this.hipPosition.x - 0.05 + insertProgress * 0.02;
      } else if (reloadProgress < 0.85) {
        // Phase 5: Slam magazine home
        const slamProgress = (reloadProgress - 0.7) / 0.15;
        this.currentWeaponModel.rotation.x = 0.2 - slamProgress * 0.15;
        this.currentWeaponModel.rotation.z = 0.05 - slamProgress * 0.03;
        this.currentWeaponModel.position.y = this.hipPosition.y - 0.15 + slamProgress * 0.1;
        this.currentWeaponModel.position.x = this.hipPosition.x - 0.03 + slamProgress * 0.02;
        
        // Add a small bump when magazine locks in
        if (slamProgress > 0.8) {
          const bumpProgress = (slamProgress - 0.8) / 0.2;
          this.currentWeaponModel.position.y += Math.sin(bumpProgress * Math.PI) * 0.02;
        }
      } else {
        // Phase 6: Return to ready position
        const returnProgress = (reloadProgress - 0.85) / 0.15;
        this.currentWeaponModel.rotation.x = 0.05 * (1 - returnProgress);
        this.currentWeaponModel.rotation.z = 0.02 * (1 - returnProgress);
        this.currentWeaponModel.position.y = this.hipPosition.y - 0.05 + returnProgress * 0.05;
        this.currentWeaponModel.position.x = this.hipPosition.x - 0.01 + returnProgress * 0.01;
      }
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

    // Update bullet tracers
    this.updateBulletTracers(dt);
    
    // Update bullet shells
    this.updateBulletShells(dt);
    
    // Update muzzle flashes
    this.updateMuzzleFlashes(dt);
    
    // Update collapse animations
    this.updateCollapseAnimations(dt);

    this.updateBots(dt);
    
    // Update network for online multiplayer
    if (this.gameMode === 'online') {
      this.sendPlayerInput();
      this.updateRemotePlayers(dt);
    }
    
    // Check for flag captures
    this.checkFlagCaptures();
    
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
      const weapon = this.weapons[this.equipment];
      
      // Find flag carrier name
      let flagCarrierName = '';
      if (this.player.carryingFlag) {
        flagCarrierName = 'You';
      } else {
        for (const bot of this.bots) {
          if (bot.carryingFlag) {
            flagCarrierName = `${bot.team.toUpperCase()} Bot`;
            break;
          }
        }
      }
      
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
        blueCaptures: this.blueCaptures,
        redCaptures: this.redCaptures,
        isAiming: this.isAiming,
        currentAmmo: weapon?.currentAmmo || 0,
        magazineSize: weapon?.magazineSize || 0,
        isReloading: weapon?.isReloading || false,
        playerCarryingFlag: this.player.carryingFlag,
        flagCarrierName: flagCarrierName,
      });
    }
  }

  // Network methods for online multiplayer
  private initializeNetwork(): void {
    console.log('Initializing network for online multiplayer');
    this.networkClient = new NetworkClient('ws://localhost:3000');
    
    this.networkClient.onConnect(() => {
      console.log('Connected to game server');
      this.showMessage('Connected to server!');
      // Join as blue team by default
      this.networkClient!.sendJoin('blue');
    });

    this.networkClient.onDisconnect(() => {
      console.log('Disconnected from game server');
      this.showMessage('Disconnected from server');
    });

    // Handle server messages
    this.networkClient.onMessage('playerJoined', (msg) => {
      console.log('Player joined:', msg.playerId);
      // Check if this is us (first playerJoined message we receive is ourselves)
      if (!this.localPlayerId) {
        this.localPlayerId = msg.playerId;
        this.playerTeam = msg.state.team;
        this.player.team = msg.state.team;
        console.log('This is us! ID:', msg.playerId, 'Team:', msg.state.team);
      } else if (msg.playerId !== this.localPlayerId) {
        this.createRemotePlayer(msg.playerId, msg.state);
      }
    });

    this.networkClient.onMessage('playerUpdated', (msg) => {
      this.updateRemotePlayer(msg.playerId, msg.state);
    });

    this.networkClient.onMessage('playerLeft', (msg) => {
      console.log('Player left:', msg.playerId);
      this.removeRemotePlayer(msg.playerId);
    });

    this.networkClient.onMessage('voxelChanged', (msg) => {
      this.handleVoxelChange(msg.change);
    });

    this.networkClient.onMessage('hitConfirmed', (msg) => {
      this.hitMarkerTimer = 0.2;
      this.sounds.hitMarker();
      this.showMessage(`Hit! ${msg.damage} damage${msg.isHeadshot ? ' (HEADSHOT!)' : ''}`);
    });

    this.networkClient.onMessage('playerDamaged', (msg) => {
      this.player.takeDamage(msg.damage);
    });

    this.networkClient.onMessage('playerDied', (msg) => {
      if (msg.playerId === this.localPlayerId) {
        this.player.die();
        this.sounds.death();
      }
    });

    this.networkClient.onMessage('playerRespawned', (msg) => {
      if (msg.playerId === this.localPlayerId) {
        this.player.respawn(this.playerTeam);
        this.sounds.respawn();
      }
    });

    this.networkClient.onMessage('inventoryUpdated', (msg) => {
      this.inventory = msg.inventory;
    });

    this.networkClient.onMessage('flagCaptured', (msg) => {
      // Update captures from server
      this.blueCaptures = msg.captures.blue;
      this.redCaptures = msg.captures.red;
      
      // Show capture message
      const teamName = msg.team === 'blue' ? 'BLUE' : 'RED';
      this.showMessage(`🏁 ${teamName} TEAM CAPTURED THE FLAG!`);
      this.sounds.capture();
    });

    // Connect to server
    this.networkClient.connect().catch((error) => {
      console.error('Failed to connect to server:', error);
      this.showMessage('Failed to connect to server. Make sure the server is running!');
    });
  }

  private createRemotePlayer(playerId: string, state: PlayerState): void {
    console.log('Creating remote player:', playerId);
    const mesh = this.createBotMesh(state.team).group;
    mesh.position.set(state.position.x, state.position.y, state.position.z);
    mesh.rotation.set(0, state.rotation.yaw, 0);
    this.scene.add(mesh);

    this.remotePlayers.set(playerId, {
      mesh,
      state,
      targetPosition: new THREE.Vector3(state.position.x, state.position.y, state.position.z),
      targetRotation: new THREE.Euler(0, state.rotation.yaw, 0),
      lastShootingTime: 0,
    });
  }

  private updateRemotePlayer(playerId: string, state: PlayerState): void {
    const remotePlayer = this.remotePlayers.get(playerId);
    if (!remotePlayer) {
      this.createRemotePlayer(playerId, state);
      return;
    }

    remotePlayer.state = state;
    remotePlayer.targetPosition.set(state.position.x, state.position.y, state.position.z);
    remotePlayer.targetRotation.set(0, state.rotation.yaw, 0);
  }

  private removeRemotePlayer(playerId: string): void {
    const remotePlayer = this.remotePlayers.get(playerId);
    if (remotePlayer) {
      this.scene.remove(remotePlayer.mesh);
      this.remotePlayers.delete(playerId);
    }
  }

  private updateRemotePlayers(dt: number): void {
    for (const [playerId, remotePlayer] of this.remotePlayers) {
      // Smooth interpolation
      const prevPosition = remotePlayer.mesh.position.clone();
      remotePlayer.mesh.position.lerp(remotePlayer.targetPosition, Math.min(dt * 10, 1));
      
      // Check if player is moving
      const moveDistance = remotePlayer.mesh.position.distanceTo(prevPosition);
      const isMoving = moveDistance > 0.01;
      
      // Smooth rotation
      const currentYaw = remotePlayer.mesh.rotation.y;
      const targetYaw = remotePlayer.targetRotation.y;
      const yawDiff = targetYaw - currentYaw;
      const normalizedDiff = Math.atan2(Math.sin(yawDiff), Math.cos(yawDiff));
      remotePlayer.mesh.rotation.y += normalizedDiff * Math.min(dt * 10, 1);

      // Update crouching visual
      const targetScale = remotePlayer.state.isCrouching ? 0.7 : 1.0;
      remotePlayer.mesh.scale.y += (targetScale - remotePlayer.mesh.scale.y) * Math.min(dt * 10, 1);

      // Find animation parts (legs, arms, head)
      const leftLeg = remotePlayer.mesh.children.find(child => 
        child instanceof THREE.Mesh && child.position.x < -0.1 && child.position.y < 0.5
      ) as THREE.Mesh | undefined;
      const rightLeg = remotePlayer.mesh.children.find(child => 
        child instanceof THREE.Mesh && child.position.x > 0.1 && child.position.y < 0.5
      ) as THREE.Mesh | undefined;
      const leftArm = remotePlayer.mesh.children.find(child => 
        child instanceof THREE.Mesh && child.position.x < -0.3 && child.position.y > 0.8
      ) as THREE.Mesh | undefined;
      const rightArm = remotePlayer.mesh.children.find(child => 
        child instanceof THREE.Mesh && child.position.x > 0.3 && child.position.y > 0.8
      ) as THREE.Mesh | undefined;

      // Walking animation
      if (isMoving && !remotePlayer.state.isCrouching) {
        // Initialize walk cycle if not exists
        if (!(remotePlayer as any).walkCycle) {
          (remotePlayer as any).walkCycle = 0;
        }
        (remotePlayer as any).walkCycle += dt * 12;
        const swing = Math.sin((remotePlayer as any).walkCycle) * 0.6;
        
        if (leftLeg) leftLeg.rotation.x = swing;
        if (rightLeg) rightLeg.rotation.x = -swing;
        if (leftArm) leftArm.rotation.x = -swing * 0.8;
        if (rightArm) rightArm.rotation.x = swing * 0.8;
        
        // Body bob
        const bob = Math.abs(Math.sin((remotePlayer as any).walkCycle * 2)) * 0.08;
        remotePlayer.mesh.position.y += bob;
      } else {
        // Reset animations when not moving
        if (leftLeg) leftLeg.rotation.x *= 0.9;
        if (rightLeg) rightLeg.rotation.x *= 0.9;
        if (leftArm) leftArm.rotation.x *= 0.9;
        if (rightArm) rightArm.rotation.x *= 0.9;
      }

      // Update aiming visual - find weapon mesh in the remote player mesh
      const aimTransition = remotePlayer.state.aimTransition || (remotePlayer.state.isAiming ? 1 : 0);
      const weaponMesh = remotePlayer.mesh.children.find(child => 
        child instanceof THREE.Group && child.children.length > 0
      ) as THREE.Group | undefined;
      
      if (weaponMesh) {
        // Animate weapon position based on aim transition - improved animation
        const hipPosition = new THREE.Vector3(0.3, 1.15, -0.4);
        const aimPosition = new THREE.Vector3(0.1, 1.25, -0.5);
        
        // Store target position
        const targetPosition = new THREE.Vector3();
        targetPosition.lerpVectors(hipPosition, aimPosition, aimTransition);
        
        // Smoothly interpolate current position towards target
        weaponMesh.position.lerp(targetPosition, Math.min(dt * 12, 1));
        
        // Smooth rotation towards target (more dramatic tilt when aiming)
        const baseTilt = -0.15;
        const aimTilt = -0.35;
        const targetRotationX = baseTilt + (aimTilt - baseTilt) * aimTransition;
        weaponMesh.rotation.x += (targetRotationX - weaponMesh.rotation.x) * Math.min(dt * 12, 1);
        
        // Add slight Y rotation when aiming
        const baseYaw = 0.05;
        const aimYaw = 0.0;
        const targetRotationY = baseYaw + (aimYaw - baseYaw) * aimTransition;
        weaponMesh.rotation.y += (targetRotationY - weaponMesh.rotation.y) * Math.min(dt * 12, 1);
      }

      // Head tracking for remote players - look around when idle
      const head = remotePlayer.mesh.children.find(child => 
        child instanceof THREE.Mesh && child.position.y > 1.7 && child.position.y < 1.9
      ) as THREE.Mesh | undefined;
      
      if (head) {
        // Initialize look around properties if not exists
        if (!(remotePlayer as any).lookAroundTimer) {
          (remotePlayer as any).lookAroundTimer = 0;
          (remotePlayer as any).lookAroundTarget = 0;
        }
        
        // When shooting, look forward
        if (remotePlayer.state.isShooting) {
          head.rotation.y *= 0.9; // Smoothly return to center
          (remotePlayer as any).lookAroundTimer = 0;
        } else if (isMoving) {
          // When moving, head faces forward
          head.rotation.y *= 0.92;
          (remotePlayer as any).lookAroundTimer = 0;
        } else {
          // When stationary, look around human-like
          (remotePlayer as any).lookAroundTimer -= dt;
          
          if ((remotePlayer as any).lookAroundTimer <= 0) {
            // Set new look around target
            (remotePlayer as any).lookAroundTarget = (Math.random() - 0.5) * 2.0;
            (remotePlayer as any).lookAroundTimer = 1.5 + Math.random() * 2.5;
            
            // Also add pitch variation
            const pitchTarget = (Math.random() - 0.5) * 0.4;
            head.rotation.x += (pitchTarget - head.rotation.x) * Math.min(dt * 3, 1);
          }
          
          // Smoothly interpolate to look around target
          head.rotation.y += ((remotePlayer as any).lookAroundTarget - head.rotation.y) * Math.min(dt * 2.5, 1);
        }
      }

      // Play shooting sound when remote player shoots
      if (remotePlayer.state.isShooting) {
        const now = performance.now();
        if (now - remotePlayer.lastShootingTime > 100) { // Prevent sound spam
          remotePlayer.lastShootingTime = now;
          
          // Calculate distance for volume
          const distance = remotePlayer.mesh.position.distanceTo(this.player.position);
          const maxDistance = 100;
          if (distance < maxDistance && distance > 5) {
            // Calculate direction for panning
            const toPlayer = remotePlayer.mesh.position.clone().sub(this.player.position);
            const playerForward = this.player.getAimDirection();
            const playerRight = new THREE.Vector3(-playerForward.z, 0, playerForward.x);
            const direction = toPlayer.dot(playerRight) / Math.max(0.1, distance);
            
            // Play spatial gunshot sound
            const weaponType = remotePlayer.state.equipment === 'rifle' ? 'rifle' : 'smg';
            this.sounds.playDistantShot(weaponType, distance, direction);
          }
          
          // Eject bullet shell from remote player's weapon
          // Calculate remote player's shooting direction (forward based on rotation)
          const remoteShootDir = new THREE.Vector3(0, 0, -1);
          remoteShootDir.applyAxisAngle(new THREE.Vector3(0, 1, 0), remotePlayer.mesh.rotation.y);
          
          // Calculate muzzle position (at remote player's weapon)
          const remoteMuzzlePos = remotePlayer.mesh.position.clone();
          remoteMuzzlePos.y += 1.15; // Weapon height
          remoteMuzzlePos.add(remoteShootDir.clone().multiplyScalar(0.5)); // In front
          
          // Eject shell
          this.ejectBulletShell(remoteMuzzlePos, remoteShootDir);
          
          // Create muzzle flash for remote player
          this.createMuzzleFlash(remoteMuzzlePos, remoteShootDir);
        }
      }
    }
  }

  private sendPlayerInput(): void {
    if (!this.networkClient || this.gameMode !== 'online') return;

    const now = performance.now();
    if (now - this.lastInputSendTime < this.inputSendRate) return;
    this.lastInputSendTime = now;

    const input: PlayerInput = {
      moveX: 0,
      moveZ: 0,
      jump: false,
      crouch: this.player.isCrouching,
      sprint: this.player.isSprinting,
      yaw: this.player.yaw,
      pitch: this.player.pitch,
    };

    // Calculate movement direction
    const forward = this.player.getForward();
    const right = this.player.getRight();
    
    // This is simplified - in a real implementation, you'd track which keys are pressed
    // For now, we'll send the current velocity as input
    if (this.player.velocity.length() > 0.1) {
      input.moveX = this.player.velocity.dot(right) / this.player.speed;
      input.moveZ = this.player.velocity.dot(forward) / this.player.speed;
    }

    this.networkClient.sendPlayerInput(input);
  }

  private handleVoxelChange(change: any): void {
    // setVoxel automatically marks chunks as dirty, which will be rebuilt in the next update()
    this.world.setVoxel(change.x, change.y, change.z, change.type, change.durability);
    // Also update the color immediately for visual feedback
    if (change.type !== 0) {
      this.world.updateVoxelColor(change.x, change.y, change.z, change.type, change.durability);
    }
  }

  // Change team for online multiplayer
  changeTeam(team: 'red' | 'blue'): void {
    if (this.gameMode !== 'online' || !this.networkClient) return;
    
    this.playerTeam = team;
    this.player.team = team;
    this.networkClient.sendJoin(team);
    
    // Respawn player in new team's spawn zone
    const spawnPos = this.getSafeSpawnPos(team);
    this.player.position.copy(spawnPos);
    this.player.yaw = team === 'blue' ? Math.PI : 0;
    this.player.updateCamera();
    
    this.showMessage(`Switched to ${team.toUpperCase()} team`);
  }

  destroy(): void {
    // Disconnect network client if in online mode
    if (this.networkClient) {
      this.networkClient.disconnect();
      this.networkClient = null;
    }
    
    // Clean up event listeners
    window.removeEventListener('resize', this.boundResize);
    this.canvas.removeEventListener('mousedown', this.boundMouseDown);
    this.canvas.removeEventListener('mouseup', this.boundMouseUp);
    this.canvas.removeEventListener('wheel', this.boundWheel);
    document.removeEventListener('keydown', this.boundKeyDown);
    document.removeEventListener('keyup', this.boundKeyUp);
    document.removeEventListener('mousemove', this.boundMouseMove);
    
    // Clean up bullet tracers
    for (const tracer of this.bulletTracers) {
      this.scene.remove(tracer.mesh);
      tracer.mesh.geometry.dispose();
      (tracer.mesh.material as THREE.Material).dispose();
    }
    this.bulletTracers = [];
    
    // Clean up bullet shells
    for (const shell of this.bulletShells) {
      this.scene.remove(shell.mesh);
      shell.mesh.geometry.dispose();
      (shell.mesh.material as THREE.Material).dispose();
    }
    this.bulletShells = [];
    
    // Clean up muzzle flashes
    for (const flash of this.muzzleFlashes) {
      this.scene.remove(flash.light);
      this.scene.remove(flash.mesh);
      flash.mesh.geometry.dispose();
      (flash.mesh.material as THREE.Material).dispose();
    }
    this.muzzleFlashes = [];
    
    // Clean up collapse animations
    for (const anim of this.collapseAnimations) {
      this.scene.remove(anim.mesh);
      anim.mesh.geometry.dispose();
      (anim.mesh.material as THREE.Material).dispose();
    }
    this.collapseAnimations = [];
    
    // Clean up death animations
    for (const [uuid, anim] of this.deathAnimations) {
      this.scene.remove(anim.mesh);
    }
    this.deathAnimations.clear();
    
    // Clean up remote players
    for (const [playerId, remotePlayer] of this.remotePlayers) {
      this.scene.remove(remotePlayer.mesh);
    }
    this.remotePlayers.clear();
    
    // Clean up bots
    for (const bot of this.bots) {
      this.scene.remove(bot.mesh);
    }
    this.bots = [];
    
    // Clean up world
    this.scene.remove(this.world.mesh);
    
    // Clean up scene
    while (this.scene.children.length > 0) {
      const child = this.scene.children[0];
      this.scene.remove(child);
      if ((child as THREE.Mesh).geometry) {
        (child as THREE.Mesh).geometry.dispose();
      }
      if ((child as THREE.Mesh).material) {
        ((child as THREE.Mesh).material as THREE.Material).dispose();
      }
    }
    
    // Dispose renderer
    this.renderer.dispose();
  }
}
