import * as THREE from 'three';
import { VoxelWorld, VOXEL_BUILT, VOXEL_SIZE } from './world';
import { Player } from './player';
import { SoundManager } from './sounds';
import { NetworkClient } from './networkClient';
import { PlayerState, PlayerInput, Position } from '../shared/types';

// Game Constants
const VERSION = "1.4.0"; // Spectator fix, Bot AI overhaul, Footsteps, Spawn dist
const FPS = 60;
const DT = 1 / FPS;
const GRAVITY = 30;
const JUMP_FORCE = 12;
const MOVE_SPEED = 6;
const SPRINT_MULTI = 1.6;
const CROUCH_MULTI = 0.4;
const REACH = 5;
const MOUSE_SENS = 0.002;
const FOV = 75;
const SKY_COLOR = 0x87CEEB;
const FOG_COLOR = 0x87CEEB;
const RENDER_DISTANCE = 60;
const CHUNK_SIZE = 16;
const TEXTURE_SCALE = 16;

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
  isSpectating: boolean;
  isOnline?: boolean;
  connectedPlayersCount?: number;
  isNetworkConnected?: boolean;
  localPlayerId?: string | null;
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
  burstRemaining: number;
  burstTimer: number;
  headY: number;
  grounded: boolean;
  team: Team;
  name: string;
  role: 'attacker' | 'defender' | 'flanker' | 'support';
  laneOffset: number;
  nameTag: THREE.Sprite;
  isCrouching: boolean;
  crouchTimer: number;
  behaviorState: string;
  behaviorTimer: number;
  strafeDirection: number;
  stuckTimer: number;
  lastPos: THREE.Vector3;
  jumpCooldown: number;
  skill: number;
  aggression: number;
  lastDamageTime: number;
  dodgeTimer: number;
  coverTimer: number;
  weapon: 'rifle' | 'smg';
  weaponMesh: THREE.Group | null;
  isAiming: boolean;
  aimTransition: number;
  carryingFlag: boolean;
  flagMesh: THREE.Group | null;
  lookAroundTimer: number;
  lookAroundTarget: number;
  walkCycle: number;
  // Human-like behavior properties
  hasSpade: boolean;
  isDigging: boolean;
  digTimer: number;
  digTarget: { x: number; y: number; z: number } | null;
  trenchDepth: number;
  isInTrench: boolean;
  panicLevel: number;
  confidence: number;
  suppressionTimer: number;
  lastSeenEnemy: THREE.Vector3 | null;
  memoryPosition: THREE.Vector3 | null;
  memoryTimer: number;
  flankRoute: Array<{ x: number; z: number }> | null;
  flankProgress: number;
  squadId: number;
  isLeading: boolean;
  // Building behavior properties
  hasBlocks: boolean;
  inventoryBlocks: number;
  isBuilding: boolean;
  buildTimer: number;
  buildTarget: { x: number; y: number; z: number } | null;
}

interface Flag {
  team: Team;
  basePos: { x: number; z: number };
  currentPos: THREE.Vector3;
  carrier: { isPlayer: boolean; bot?: Bot; name: string } | null;
  isDropped: boolean;
  dropTimer: number;
  mesh: THREE.Group;
  clothMesh: THREE.Mesh;
  light: THREE.PointLight;
}

interface Weapon {
  fireRate: number;
  lastFired: number;
  damage: { head: number; body: number };
  spread: number;
  name: string;
  magazineSize: number;
  currentAmmo: number;
  reloadTime: number;
  isReloading: boolean;
  reloadStartTime: number;
}

const TEAM_COLORS: Record<Team, { body: number; accent: number; legs: number; label: string }> = {
  red: { body: 0xcc2222, accent: 0xff4444, legs: 0x661111, label: 'RED' },
  blue: { body: 0x2244cc, accent: 0x4488ff, legs: 0x112266, label: 'BLUE' },
};

const BLUE_SPAWN_Z_MIN = -120;
const BLUE_SPAWN_Z_MAX = -100;
const RED_SPAWN_Z_MIN = 100;
const RED_SPAWN_Z_MAX = 120;
const SPAWN_X_RANGE = 20;

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
  isSpectating: boolean = false;
  spectatorAngle: number = 0;
  spectatorPitch: number = 0;
  spectatorSpeed: number = 20;
  spectatorFlyUp: boolean = false;
  spectatorFlyDown: boolean = false;
  spectatorMoveForward: boolean = false;
  spectatorMoveBackward: boolean = false;
  spectatorMoveLeft: boolean = false;
  spectatorMoveRight: boolean = false;
  lastManualControlTime: number = 0;
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

  hipPosition: THREE.Vector3 = new THREE.Vector3(0.3, -0.3, -0.6);
  adsPosition: THREE.Vector3 = new THREE.Vector3(0, -0.2, -0.45);

  pickaxeAnimationTime: number = 0;
  isPickaxeAnimating: boolean = false;
  pickaxeAnimationDuration: number = 0.3;

  deathAnimations: Map<string, { mesh: THREE.Group; timer: number; startPos: THREE.Vector3 }> = new Map();

  bulletTracers: Array<{
    mesh: THREE.Mesh;
    velocity: THREE.Vector3;
    life: number;
    maxLife: number;
    hasWhizzed: boolean;
    hasImpacted: boolean;
  }> = [];

  collapseAnimations: Array<{
    mesh: THREE.Mesh;
    velocity: THREE.Vector3;
    angularVelocity: THREE.Vector3;
    life: number;
    maxLife: number;
  }> = [];

  reloadAnimationTime: number = 0;
  isReloadAnimating: boolean = false;
  reloadAnimationDuration: number = 1.5;

  bulletShells: Array<{
    mesh: THREE.Mesh;
    velocity: THREE.Vector3;
    rotationSpeed: THREE.Vector3;
    life: number;
    maxLife: number;
  }> = [];

  muzzleFlashes: Array<{
    light: THREE.PointLight;
    mesh: THREE.Mesh;
    life: number;
    maxLife: number;
  }> = [];

  blueFlag!: Flag;
  redFlag!: Flag;
  captureZoneSize: number = 4;

  gameMode: GameMode = 'multiplayer';

  networkClient: NetworkClient | null = null;
  remotePlayers: Map<string, { mesh: THREE.Group; state: PlayerState; targetPosition: THREE.Vector3; targetRotation: THREE.Euler; lastShootingTime: number }> = new Map();
  localPlayerId: string | null = null;
  lastInputSendTime: number = 0;
  inputSendRate: number = 50;

  private boundResize: () => void;
  private boundMouseDown: (e: MouseEvent) => void;
  private boundMouseUp: (e: MouseEvent) => void;
  private boundWheel: (e: WheelEvent) => void;
  private boundKeyDown: (e: KeyboardEvent) => void;
  private boundKeyUp: (e: KeyboardEvent) => void;
  private boundMouseMove: (e: MouseEvent) => void;

  weapons: Record<string, Weapon> = {
    rifle: {
      fireRate: 0.4, lastFired: 0, damage: { head: 100, body: 34 }, spread: 0.0005,
      name: 'Rifle', magazineSize: 10, currentAmmo: 10, reloadTime: 2.0,
      isReloading: false, reloadStartTime: 0
    },
    smg: {
      fireRate: 0.1, lastFired: 0, damage: { head: 100, body: 34 }, spread: 0.04,
      name: 'SMG', magazineSize: 30, currentAmmo: 30, reloadTime: 1.5,
      isReloading: false, reloadStartTime: 0
    },
    spade: {
      fireRate: 0.5, lastFired: 0, damage: { head: 40, body: 25 }, spread: 0,
      name: 'Spade', magazineSize: 0, currentAmmo: 0, reloadTime: 0,
      isReloading: false, reloadStartTime: 0
    },
    pickaxe: {
      fireRate: 0.5, lastFired: 0, damage: { head: 40, body: 25 }, spread: 0,
      name: 'Pickaxe', magazineSize: 0, currentAmmo: 0, reloadTime: 0,
      isReloading: false, reloadStartTime: 0
    },
  };

  constructor(canvas: HTMLCanvasElement, mode: GameMode = 'multiplayer', team: Team = 'blue') {
    try {
      console.log('Game constructor started');
    this.canvas = canvas;
    this.clock = new THREE.Clock();
    this.sounds = new SoundManager();
    this.gameMode = mode;
    this.playerTeam = team;

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
    sun.shadow.mapSize.set(1024, 1024);
    sun.shadow.camera.left = -50;
    sun.shadow.camera.right = 50;
    sun.shadow.camera.top = 50;
    sun.shadow.camera.bottom = -50;
    this.scene.add(sun);

    console.log('Creating world...');
    this.world = new VoxelWorld();
    this.scene.add(this.world.mesh);
    console.log('World created and added to scene');

    this.addTeamZoneMarkers();

    console.log('Creating player...');
    this.player = new Player(this.world);
    this.player.team = team;
    const spawnPos = this.getSafeSpawnPos(team);
    this.player.position.copy(spawnPos);
    this.player.yaw = team === 'blue' ? Math.PI : 0;
    this.player.updateCamera();
    console.log('Player created');

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

    this.createFlags();
    this.createCaptureZones();

    if (this.gameMode === 'multiplayer') {
      console.log('Spawning bots...');
      this.spawnTeamBots('blue', 6);
      this.spawnTeamBots('red', 7);
      console.log('Bots spawned');
    }

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
    } catch (error) {
      console.error('Error in game constructor:', error);
      throw error;
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
    this.scene.add(pole);

    const flagGeo = new THREE.PlaneGeometry(1.5, 1);
    const flagMat = new THREE.MeshLambertMaterial({ color, side: THREE.DoubleSide });
    const flag = new THREE.Mesh(flagGeo, flagMat);
    flag.position.set(x + 0.8, groundY + 3.5, z);
    this.scene.add(flag);
  }

  private getSafeSpawnPos(team: Team): THREE.Vector3 {
    const zMin = team === 'blue' ? BLUE_SPAWN_Z_MIN : RED_SPAWN_Z_MIN;
    const zMax = team === 'blue' ? BLUE_SPAWN_Z_MAX : RED_SPAWN_Z_MAX;
    const x = (Math.random() - 0.5) * SPAWN_X_RANGE * 2;
    const z = zMin + Math.random() * (zMax - zMin);
    const groundY = this.world.getGroundHeight(x, z);
    return new THREE.Vector3(x, groundY, z);
  }

  private createWeaponModels(): void {
    // Rifle - WW2 style with visible colors
    const rifle = new THREE.Group();
    const rifleBody = new THREE.Mesh(
      new THREE.BoxGeometry(0.08, 0.08, 0.55),
      new THREE.MeshStandardMaterial({ color: 0x5a5a5a, metalness: 0.7, roughness: 0.3 })
    );
    rifleBody.position.set(0, 0, -0.15);
    rifle.add(rifleBody);
    
    const rifleBarrel = new THREE.Mesh(
      new THREE.CylinderGeometry(0.025, 0.025, 0.6, 8),
      new THREE.MeshStandardMaterial({ color: 0x3a3a3a, metalness: 0.8, roughness: 0.2 })
    );
    rifleBarrel.rotation.x = Math.PI / 2;
    rifleBarrel.position.set(0, 0.01, -0.65);
    rifle.add(rifleBarrel);
    
    const rifleStock = new THREE.Mesh(
      new THREE.BoxGeometry(0.08, 0.12, 0.3),
      new THREE.MeshStandardMaterial({ color: 0x8B4513, metalness: 0.1, roughness: 0.8 })
    );
    rifleStock.position.set(0, -0.02, 0.25);
    rifle.add(rifleStock);
    
    rifle.position.copy(this.hipPosition);
    this.weaponModels.set('rifle', rifle);

    // SMG - Thompson style with visible colors
    const smg = new THREE.Group();
    const smgBody = new THREE.Mesh(
      new THREE.BoxGeometry(0.09, 0.09, 0.35),
      new THREE.MeshStandardMaterial({ color: 0x5a5a5a, metalness: 0.7, roughness: 0.3 })
    );
    smgBody.position.set(0, 0, -0.1);
    smg.add(smgBody);
    
    const smgBarrel = new THREE.Mesh(
      new THREE.CylinderGeometry(0.025, 0.025, 0.35, 8),
      new THREE.MeshStandardMaterial({ color: 0x3a3a3a, metalness: 0.8, roughness: 0.2 })
    );
    smgBarrel.rotation.x = Math.PI / 2;
    smgBarrel.position.set(0, 0.01, -0.4);
    smg.add(smgBarrel);
    
    const smgStock = new THREE.Mesh(
      new THREE.BoxGeometry(0.07, 0.1, 0.18),
      new THREE.MeshStandardMaterial({ color: 0x8B4513, metalness: 0.1, roughness: 0.8 })
    );
    smgStock.position.set(0, -0.01, 0.18);
    smg.add(smgStock);
    
    smg.position.copy(this.hipPosition);
    this.weaponModels.set('smg', smg);

    // Spade
    const spade = new THREE.Group();
    const spadeHandle = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.5, 8), new THREE.MeshLambertMaterial({ color: 0x6b4423 }));
    spadeHandle.position.set(0, 0, -0.2);
    spade.add(spadeHandle);
    const spadeBlade = new THREE.Mesh(new THREE.BoxGeometry(0.15, 0.02, 0.2), new THREE.MeshLambertMaterial({ color: 0x888888 }));
    spadeBlade.position.set(0, -0.25, -0.45);
    spade.add(spadeBlade);
    spade.position.copy(this.hipPosition);
    this.weaponModels.set('spade', spade);

    // Pickaxe
    const pickaxe = new THREE.Group();
    const pickHandle = new THREE.Mesh(new THREE.CylinderGeometry(0.02, 0.02, 0.5, 8), new THREE.MeshLambertMaterial({ color: 0x6b4423 }));
    pickHandle.position.set(0, 0, -0.2);
    pickaxe.add(pickHandle);
    const pickHead = new THREE.Mesh(new THREE.BoxGeometry(0.25, 0.04, 0.04), new THREE.MeshLambertMaterial({ color: 0x888888 }));
    pickHead.position.set(0, 0.25, -0.45);
    pickaxe.add(pickHead);
    pickaxe.position.copy(this.hipPosition);
    this.weaponModels.set('pickaxe', pickaxe);
  }

  private switchWeaponModel(type: EquipmentType): void {
    this.isReloadAnimating = false;
    this.reloadAnimationTime = 0;
    for (const key of Object.keys(this.weapons)) {
      this.weapons[key].isReloading = false;
    }
    if (this.currentWeaponModel) {
      this.weaponContainer.remove(this.currentWeaponModel);
    }
    const newWeapon = this.weaponModels.get(type);
    if (newWeapon) {
      this.weaponContainer.add(newWeapon);
      this.currentWeaponModel = newWeapon;
      newWeapon.position.copy(this.hipPosition);
      newWeapon.rotation.set(0, 0, 0);
    }
  }

  private createFlags(): void {
    this.blueFlag = this.createFlagObject('blue', BLUE_FLAG_POS);
    this.redFlag = this.createFlagObject('red', RED_FLAG_POS);
  }

  private createFlagObject(team: Team, pos: { x: number; z: number }): Flag {
    const group = new THREE.Group();
    const gY = this.world.getGroundHeight(pos.x, pos.z);
    group.position.set(pos.x, gY, pos.z);

    // Flagpole
    const poleGeo = new THREE.CylinderGeometry(0.06, 0.08, 4, 8);
    const poleMat = new THREE.MeshStandardMaterial({ color: 0x999999, roughness: 0.3, metalness: 0.7 });
    const pole = new THREE.Mesh(poleGeo, poleMat);
    pole.position.y = 2;
    group.add(pole);

    // Base pedestal
    const baseGeo = new THREE.CylinderGeometry(0.6, 0.8, 0.3, 12);
    const baseMat = new THREE.MeshStandardMaterial({ color: team === 'blue' ? 0x224488 : 0x882222 });
    const pedestal = new THREE.Mesh(baseGeo, baseMat);
    pedestal.position.y = 0.15;
    group.add(pedestal);

    // Flag banner cloth
    const flagColor = team === 'blue' ? 0x2277ff : 0xff2233;
    const clothGeo = new THREE.BoxGeometry(1.6, 0.9, 0.06);
    const clothMat = new THREE.MeshLambertMaterial({ color: flagColor });
    const cloth = new THREE.Mesh(clothGeo, clothMat);
    cloth.position.set(0.85, 3.3, 0);
    group.add(cloth);

    // Glowing sphere beacon on top
    const sphereGeo = new THREE.SphereGeometry(0.2, 12, 12);
    const sphereMat = new THREE.MeshBasicMaterial({ color: team === 'blue' ? 0x66aaff : 0xff6666 });
    const sphere = new THREE.Mesh(sphereGeo, sphereMat);
    sphere.position.y = 4.0;
    group.add(sphere);

    // Beacon point light for visibility across the battlefield
    const lightColor = team === 'blue' ? 0x4488ff : 0xff4444;
    const light = new THREE.PointLight(lightColor, 3, 22);
    light.position.y = 4.0;
    group.add(light);

    // Label sprite
    const labelSprite = this.createNameTag(team, team === 'blue' ? 'BLUE FLAG' : 'RED FLAG');
    labelSprite.position.set(0, 4.6, 0);
    labelSprite.scale.set(2.4, 0.6, 1);
    group.add(labelSprite);

    this.scene.add(group);

    return {
      team,
      basePos: { ...pos },
      currentPos: new THREE.Vector3(pos.x, gY, pos.z),
      carrier: null,
      isDropped: false,
      dropTimer: 0,
      mesh: group,
      clothMesh: cloth,
      light
    };
  }

  private resetFlagToBase(flag: Flag): void {
    const gY = this.world.getGroundHeight(flag.basePos.x, flag.basePos.z);
    flag.currentPos.set(flag.basePos.x, gY, flag.basePos.z);
    flag.mesh.position.copy(flag.currentPos);
    flag.carrier = null;
    flag.isDropped = false;
    flag.dropTimer = 0;
  }

  private updateFlags(dt: number): void {
    const flags = [this.blueFlag, this.redFlag];

    for (const flag of flags) {
      if (flag.carrier) {
        // Flag is currently carried
        const carrier = flag.carrier;
        let carrierPos: THREE.Vector3 | null = null;
        let carrierDead = false;
        let carrierTeam: Team;

        if (carrier.isPlayer) {
          carrierDead = this.player.isDead;
          carrierPos = this.player.position;
          carrierTeam = this.playerTeam;
        } else if (carrier.bot) {
          carrierDead = carrier.bot.isDead;
          carrierPos = carrier.bot.position;
          carrierTeam = carrier.bot.team;
        }

        if (carrierDead || !carrierPos) {
          // Carrier died: drop flag at location
          flag.carrier = null;
          flag.isDropped = true;
          flag.dropTimer = 30; // 30 seconds before auto-return
          if (carrier.isPlayer) this.player.carryingFlag = false;
          if (carrier.bot) carrier.bot.carryingFlag = false;
          this.showMessage(`🚩 ${flag.team.toUpperCase()} flag was dropped!`);
        } else {
          // Carrier is alive: attach flag to carrier
          flag.currentPos.set(carrierPos.x, carrierPos.y + 0.8, carrierPos.z);
          flag.mesh.position.copy(flag.currentPos);
          if (carrier.isPlayer) this.player.carryingFlag = true;
          if (carrier.bot) carrier.bot.carryingFlag = true;

          // Check if carrier reached their home base!
          const homeBase = carrierTeam! === 'blue' ? BLUE_FLAG_POS : RED_FLAG_POS;
          const distToHome = Math.hypot(carrierPos.x - homeBase.x, carrierPos.z - homeBase.z);

          if (distToHome < 5) {
            // CAPTURE!
            if (carrierTeam! === 'blue') {
              this.blueCaptures++;
              this.showMessage(`🎉 BLUE TEAM (${carrier.name}) CAPTURED THE RED FLAG!`);
            } else {
              this.redCaptures++;
              this.showMessage(`🚩 RED TEAM (${carrier.name}) CAPTURED THE BLUE FLAG!`);
            }

            this.sounds.capture();
            if (carrier.isPlayer) this.player.carryingFlag = false;
            if (carrier.bot) carrier.bot.carryingFlag = false;

            this.resetFlagToBase(flag);
          }
        }
      } else {
        // Flag is at base or dropped
        flag.mesh.position.copy(flag.currentPos);
        flag.clothMesh.rotation.y = Math.sin(performance.now() * 0.003) * 0.3;

        if (flag.isDropped) {
          flag.dropTimer -= dt;
          flag.light.intensity = 2 + Math.sin(performance.now() * 0.01) * 1.5; // pulsing glow
          if (flag.dropTimer <= 0) {
            this.resetFlagToBase(flag);
            this.showMessage(`🏳️ ${flag.team.toUpperCase()} flag returned to base`);
          }
        } else {
          flag.light.intensity = 3;
        }

        // Check if local player picks it up
        if (!this.player.isDead) {
          const distToPlayer = Math.hypot(this.player.position.x - flag.currentPos.x, this.player.position.z - flag.currentPos.z);
          if (distToPlayer < 3.5 && Math.abs(this.player.position.y - flag.currentPos.y) < 3.5) {
            if (this.playerTeam !== flag.team) {
              // Enemy flag - pick it up!
              flag.carrier = { isPlayer: true, name: 'You' };
              flag.isDropped = false;
              this.player.carryingFlag = true;
              this.sounds.capture();
              this.showMessage(`🚩 YOU TOOK THE ${flag.team.toUpperCase()} FLAG! Bring it to base!`);
            } else if (flag.isDropped) {
              // Friendly dropped flag - return it to base!
              this.resetFlagToBase(flag);
              this.sounds.respawn();
              this.showMessage(`🛡️ YOU RETURNED THE ${flag.team.toUpperCase()} FLAG TO BASE!`);
            }
          }
        }

        // Check if a bot picks it up
        if (!flag.carrier) {
          for (const bot of this.bots) {
            if (bot.isDead || bot.carryingFlag) continue;
            const distToBot = Math.hypot(bot.position.x - flag.currentPos.x, bot.position.z - flag.currentPos.z);
            if (distToBot < 3.5 && Math.abs(bot.position.y - flag.currentPos.y) < 3.5) {
              if (bot.team !== flag.team) {
                // Enemy bot picks up flag!
                flag.carrier = { isPlayer: false, bot, name: bot.name };
                flag.isDropped = false;
                bot.carryingFlag = true;
                this.sounds.weaponSwitch();
                this.showMessage(`🚩 ${bot.name} (${bot.team.toUpperCase()}) took the ${flag.team.toUpperCase()} flag!`);
                break;
              } else if (flag.isDropped) {
                // Friendly bot returns dropped flag!
                this.resetFlagToBase(flag);
                this.sounds.respawn();
                this.showMessage(`🛡️ ${bot.name} returned the ${flag.team.toUpperCase()} flag!`);
                break;
              }
            }
          }
        }
      }
    }
  }

  private createCaptureZones(): void {
    // Capture zones handled in updateFlags
  }

  private spawnTeamBots(team: Team, count: number): void {
    for (let i = 0; i < count; i++) {
      const pos = this.getSafeSpawnPos(team);
      const botMesh = this.createBotMesh(team);
      botMesh.position.copy(pos);
      this.scene.add(botMesh);

      const botName = `${team === 'blue' ? 'Blue' : 'Red'} Bot ${i + 1}`;
      const nameTag = this.createNameTag(team, botName);
      nameTag.position.y = 2.6;
      botMesh.add(nameTag);

      // Diverse roles: 40% attackers, 30% defenders, 20% flankers, 10% support
      let role: 'attacker' | 'defender' | 'flanker' | 'support';
      if (i === 0 || i === 1) {
        role = 'defender';
      } else if (i % 5 === 0) {
        role = 'support';
      } else if (i % 5 === 1 || i % 5 === 2) {
        role = 'flanker';
      } else {
        role = 'attacker';
      }
      
      const laneOffset = ((i % 3) - 1) * 8 + (Math.random() - 0.5) * 4;
      const hasSpade = Math.random() > 0.4; // 60% of bots have spades for digging

      this.bots.push({
        mesh: botMesh,
        position: pos.clone(),
        velocity: new THREE.Vector3(),
        hp: 100, maxHp: 100,
        isDead: false, respawnTimer: 0,
        targetPos: pos.clone(),
        moveTimer: 1 + Math.random() * 2,
        shootTimer: 1 + Math.random() * 2,
        burstRemaining: 0,
        burstTimer: 0,
        headY: 1.8, grounded: false,
        team, name: botName, role, laneOffset,
        nameTag,
        isCrouching: false, crouchTimer: 0,
        behaviorState: role === 'attacker' ? 'rushFlag' : 'defend',
        behaviorTimer: 2 + Math.random() * 3,
        strafeDirection: Math.random() > 0.5 ? 1 : -1,
        stuckTimer: 0, lastPos: pos.clone(),
        jumpCooldown: 0, skill: 0.6 + Math.random() * 0.4,
        aggression: 0.5 + Math.random() * 0.5,
        lastDamageTime: 0, dodgeTimer: 0, coverTimer: 0,
        weapon: Math.random() > 0.5 ? 'rifle' : 'smg',
        weaponMesh: null,
        isAiming: false, aimTransition: 0,
        carryingFlag: false, flagMesh: null,
        lookAroundTimer: 0, lookAroundTarget: 0,
        walkCycle: Math.random() * Math.PI * 2,
        // Human-like behavior initialization
        hasSpade,
        hasBlocks: Math.random() > 0.5, // 50% of bots have building blocks
        inventoryBlocks: Math.floor(Math.random() * 20) + 10,
        isDigging: false,
        digTimer: 0,
        digTarget: null,
        trenchDepth: 0,
        isInTrench: false,
        isBuilding: false,
        buildTimer: 0,
        buildTarget: null,
        panicLevel: 0,
        confidence: 0.7 + Math.random() * 0.3,
        suppressionTimer: 0,
        lastSeenEnemy: null,
        memoryPosition: null,
        memoryTimer: 0,
        flankRoute: null,
        flankProgress: 0,
        squadId: Math.floor(i / 3), // Group into squads of 3
        isLeading: i % 3 === 0,
      });
    }
  }

  private createBotMesh(team: Team): THREE.Group {
    const colors = TEAM_COLORS[team];
    const group = new THREE.Group();

    // Body (torso)
    const body = new THREE.Mesh(
      new THREE.BoxGeometry(0.6, 0.8, 0.4),
      new THREE.MeshLambertMaterial({ color: colors.body })
    );
    body.position.y = 1.1;
    group.add(body);

    // Head
    const head = new THREE.Mesh(
      new THREE.BoxGeometry(0.4, 0.4, 0.4),
      new THREE.MeshLambertMaterial({ color: 0xffdbac })
    );
    head.position.y = 1.8;
    group.add(head);

    // Helmet
    const helmet = new THREE.Mesh(
      new THREE.BoxGeometry(0.45, 0.2, 0.45),
      new THREE.MeshLambertMaterial({ color: colors.accent })
    );
    helmet.position.y = 2.05;
    group.add(helmet);

    // Left arm
    const leftArm = new THREE.Mesh(
      new THREE.BoxGeometry(0.18, 0.6, 0.2),
      new THREE.MeshLambertMaterial({ color: colors.body })
    );
    leftArm.position.set(-0.4, 1.1, 0);
    group.add(leftArm);

    // Right arm
    const rightArm = new THREE.Mesh(
      new THREE.BoxGeometry(0.18, 0.6, 0.2),
      new THREE.MeshLambertMaterial({ color: colors.body })
    );
    rightArm.position.set(0.4, 1.1, 0);
    group.add(rightArm);

    // Left leg
    const leftLeg = new THREE.Mesh(
      new THREE.BoxGeometry(0.2, 0.6, 0.25),
      new THREE.MeshLambertMaterial({ color: colors.legs })
    );
    leftLeg.position.set(-0.15, 0.3, 0);
    group.add(leftLeg);

    // Right leg
    const rightLeg = new THREE.Mesh(
      new THREE.BoxGeometry(0.2, 0.6, 0.25),
      new THREE.MeshLambertMaterial({ color: colors.legs })
    );
    rightLeg.position.set(0.15, 0.3, 0);
    group.add(rightLeg);

    // Weapon (rifle or SMG)
    const weapon = new THREE.Group();
    const weaponBody = new THREE.Mesh(
      new THREE.BoxGeometry(0.08, 0.08, 0.5),
      new THREE.MeshLambertMaterial({ color: 0x4a4a4a })
    );
    weapon.add(weaponBody);
    
    const weaponBarrel = new THREE.Mesh(
      new THREE.CylinderGeometry(0.025, 0.025, 0.3, 8),
      new THREE.MeshLambertMaterial({ color: 0x2a2a2a })
    );
    weaponBarrel.rotation.x = Math.PI / 2;
    weaponBarrel.position.z = -0.3;
    weapon.add(weaponBarrel);
    
    weapon.position.set(0.4, 1.1, -0.3);
    group.add(weapon);

    return group;
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

  private initializeNetwork(): void {
    this.networkClient = new NetworkClient();

    this.networkClient.onConnect(() => {
      this.showMessage(`Connected to game server as ${this.playerTeam.toUpperCase()}!`);
      this.networkClient!.sendJoin(this.playerTeam, {
        x: this.player.position.x,
        y: this.player.position.y,
        z: this.player.position.z,
      });
    });

    this.networkClient.onDisconnect(() => {
      this.showMessage('Disconnected from server. Reconnecting...');
    });

    // Handle full init message
    this.networkClient.onMessage('init', (msg: any) => {
      this.localPlayerId = msg.playerId;
      if (msg.captures) {
        this.blueCaptures = msg.captures.blue || 0;
        this.redCaptures = msg.captures.red || 0;
      }
      if (msg.scores) {
        this.blueKills = msg.scores.blue || 0;
        this.redKills = msg.scores.red || 0;
      }
      // Add existing players
      if (msg.players && Array.isArray(msg.players)) {
        for (const p of msg.players) {
          if (p.id !== this.localPlayerId) {
            this.addRemotePlayer(p.id, p.state);
          }
        }
      }
      if (typeof msg.inventory === 'number') {
        this.inventory = msg.inventory;
      }
      if (msg.voxelChanges && Array.isArray(msg.voxelChanges) && msg.voxelChanges.length > 0) {
        for (const change of msg.voxelChanges) {
          this.world.setVoxel(change.x, change.y, change.z, change.type, change.durability);
        }
        this.world.update(true);
      }
      this.showMessage(`🟢 Online Match Ready! (${this.playerTeam.toUpperCase()} Team)`);
    });

    // Handle player joined
    this.networkClient.onMessage('playerJoined', (msg: any) => {
      if (msg.playerId === this.localPlayerId) return;
      this.addRemotePlayer(msg.playerId, msg.state);
    });

    // Handle player left
    this.networkClient.onMessage('playerLeft', (msg: any) => {
      this.removeRemotePlayer(msg.playerId);
    });

    // Handle player updated
    this.networkClient.onMessage('playerUpdated', (msg: any) => {
      if (msg.playerId === this.localPlayerId) {
        if (msg.state?.hp !== undefined && msg.state.hp < this.player.hp) {
          this.player.hp = msg.state.hp;
          this.sounds.hurt();
        }
        return;
      }
      let remote = this.remotePlayers.get(msg.playerId);
      if (!remote) {
        this.addRemotePlayer(msg.playerId, msg.state);
        remote = this.remotePlayers.get(msg.playerId);
      }
      if (remote) {
        // If team changed, rebuild mesh and nametag with the correct team colors!
        if (remote.state.team !== msg.state.team) {
          this.scene.remove(remote.mesh);
          const mesh = this.createBotMesh(msg.state.team as Team);
          const nameTag = this.createNameTag(msg.state.team as Team, `Player ${msg.playerId.slice(-4)}`);
          nameTag.position.y = 2.6;
          mesh.add(nameTag);
          this.scene.add(mesh);
          remote.mesh = mesh;
        }
        remote.state = msg.state;
        remote.mesh.visible = !msg.state.isDead;
        remote.targetPosition.set(msg.state.position.x, msg.state.position.y, msg.state.position.z);
        remote.targetRotation.set(0, msg.state.rotation.yaw, 0, 'YXZ');
      }
    });

    // Handle remote player shot (muzzle flash, tracer, 3D sound)
    this.networkClient.onMessage('playerShot', (msg: any) => {
      if (msg.playerId === this.localPlayerId) return;
      this.renderRemotePlayerShot(msg.playerId, msg.origin, msg.direction, msg.weapon);
    });

    // Handle hit confirmed on enemy
    this.networkClient.onMessage('hitConfirmed', (msg: any) => {
      this.hitMarkerTimer = 0.25;
      this.sounds.hitMarker();
      if (msg.isHeadshot) {
        this.sounds.headshot();
      }
    });

    // Handle local player damaged
    this.networkClient.onMessage('playerDamaged', (msg: any) => {
      if (msg.playerId === this.localPlayerId) {
        this.player.takeDamage(msg.damage);
        this.sounds.hurt();
      } else {
        const remote = this.remotePlayers.get(msg.playerId);
        if (remote) {
          remote.state.hp = Math.max(0, remote.state.hp - msg.damage);
        }
      }
    });

    // Handle player died
    this.networkClient.onMessage('playerDied', (msg: any) => {
      if (msg.playerId === this.localPlayerId) {
        this.player.die();
        this.player.respawnTimer = 4;
        this.sounds.deathSound();
        this.showMessage('☠️ You were eliminated! Respawning in 4s...');
      } else {
        const remote = this.remotePlayers.get(msg.playerId);
        if (remote) {
          remote.mesh.visible = false;
          remote.state.isDead = true;
          remote.state.hp = 0;
        }
        if (msg.killerId === this.localPlayerId) {
          if (this.playerTeam === 'blue') this.blueKills++; else this.redKills++;
          this.sounds.killSound();
          this.showMessage(`🎯 You eliminated Player ${msg.playerId.slice(-4)}!`);
        }
      }
    });

    // Handle player respawned
    this.networkClient.onMessage('playerRespawned', (msg: any) => {
      if (msg.playerId === this.localPlayerId) {
        this.player.respawn(this.playerTeam, new THREE.Vector3(msg.position.x, msg.position.y, msg.position.z));
        this.sounds.respawn();
        this.showMessage('Respawned at base!');
      } else {
        const remote = this.remotePlayers.get(msg.playerId);
        if (remote) {
          remote.state.isDead = false;
          remote.state.hp = 100;
          remote.mesh.visible = true;
          remote.mesh.position.set(msg.position.x, msg.position.y, msg.position.z);
          remote.targetPosition.set(msg.position.x, msg.position.y, msg.position.z);
        }
      }
    });

    // Handle voxel changes from server
    this.networkClient.onMessage('voxelChanged', (msg: any) => {
      const { x, y, z, type, durability } = msg.change;
      const prevVoxel = this.world.getVoxel(x, y, z);
      this.world.setVoxel(x, y, z, type, durability);
      
      // If solid voxel with partial durability, update color immediately
      if (type !== 0 && durability < 3) {
        this.world.updateVoxelColor(x, y, z, type, durability);
      }

      // Audio feedback if within hearing range of the player
      const dist = this.player.camera.position.distanceTo(new THREE.Vector3(x, y, z));
      if (dist < 30) {
        if (type === 0 && prevVoxel && prevVoxel.type !== 0) {
          this.sounds.spadeHit();
        } else if (type === 4 && (!prevVoxel || prevVoxel.type === 0)) {
          this.sounds.buildPlace();
        }
      }
    });

    // Handle inventory updates from server
    this.networkClient.onMessage('inventoryUpdated', (msg: any) => {
      if (typeof msg.inventory === 'number') {
        this.inventory = msg.inventory;
      }
    });

    // Handle flag pickup
    this.networkClient.onMessage('flagPickedUp', (msg: any) => {
      const isLocal = msg.playerId === this.localPlayerId;
      const flag = msg.flagTeam === 'blue' ? this.blueFlag : this.redFlag;
      if (flag) {
        flag.isDropped = false;
        if (isLocal) {
          this.player.carryingFlag = true;
          this.sounds.flagPickup();
          this.showMessage(`🚩 YOU TOOK THE ${msg.flagTeam.toUpperCase()} FLAG! RUN TO BASE!`);
        } else {
          this.sounds.flagAlarm();
          this.showMessage(`⚠️ ${msg.flagTeam.toUpperCase()} FLAG TAKEN by Player ${msg.playerId.slice(-4)}!`);
        }
      }
    });

    // Handle flag dropped
    this.networkClient.onMessage('flagDropped', (msg: any) => {
      const flag = msg.flagTeam === 'blue' ? this.blueFlag : this.redFlag;
      if (flag) {
        flag.currentPos.set(msg.position.x, msg.position.y + 0.5, msg.position.z);
        flag.mesh.position.copy(flag.currentPos);
        flag.carrier = null;
        flag.isDropped = true;
        this.showMessage(`🚩 ${msg.flagTeam.toUpperCase()} FLAG DROPPED on the battlefield!`);
      }
    });

    // Handle flag returned
    this.networkClient.onMessage('flagReturned', (msg: any) => {
      const flag = msg.flagTeam === 'blue' ? this.blueFlag : this.redFlag;
      if (flag) {
        this.resetFlagToBase(flag);
        this.showMessage(`🛡️ ${msg.flagTeam.toUpperCase()} FLAG RETURNED TO BASE!`);
      }
    });

    // Handle flag captured
    this.networkClient.onMessage('flagCaptured', (msg: any) => {
      this.blueCaptures = msg.captures.blue;
      this.redCaptures = msg.captures.red;
      this.sounds.flagCapture();
      if (msg.playerId === this.localPlayerId) {
        this.showMessage(`🏆 YOU CAPTURED THE ENEMY FLAG! (+1 SCORE)`);
      } else {
        this.showMessage(`🏆 ${msg.team.toUpperCase()} TEAM SCORED A FLAG CAPTURE!`);
      }
    });

    // Handle spectator toggled from other players
    this.networkClient.onMessage('spectatorToggled', (msg: any) => {
      // Track remote player spectator state (for future use)
      console.log(`Player ${msg.playerId} ${msg.isSpectating ? 'entered' : 'exited'} spectator mode`);
    });

    this.networkClient.onMessage('footstep', (msg: any) => {
      // Play footstep sound for other players using SoundManager
      const pan = Math.sin(Math.atan2(msg.position?.x || 0, msg.position?.z || 0) - this.player.yaw);
      this.sounds.playFootstepRemote(msg.volume, msg.pitch, pan);
    });

    this.networkClient.connect().catch((err) => {
      console.error('Failed to connect to server:', err);
      this.showMessage('Failed to connect to server');
    });
  }

  private addRemotePlayer(id: string, state: PlayerState): void {
    if (this.remotePlayers.has(id)) return;
    const mesh = this.createBotMesh(state.team as Team);
    mesh.position.set(state.position.x, state.position.y, state.position.z);

    const nameTag = this.createNameTag(state.team as Team, `Player ${id.slice(-4)}`);
    nameTag.position.y = 2.6;
    mesh.add(nameTag);

    this.scene.add(mesh);
    this.remotePlayers.set(id, {
      mesh,
      state,
      targetPosition: new THREE.Vector3(state.position.x, state.position.y, state.position.z),
      targetRotation: new THREE.Euler(0, state.rotation.yaw, 0, 'YXZ'),
      lastShootingTime: 0,
    });
    this.showMessage(`🎮 Player ${id.slice(-4)} (${state.team.toUpperCase()}) joined!`);
  }

  private removeRemotePlayer(id: string): void {
    const remote = this.remotePlayers.get(id);
    if (remote) {
      this.scene.remove(remote.mesh);
      this.remotePlayers.delete(id);
      this.showMessage(`Player ${id.slice(-4)} left the game.`);
    }
  }

  private renderRemotePlayerShot(playerId: string, origin: Position, direction: Position, weaponType: string): void {
    const o = new THREE.Vector3(origin.x, origin.y, origin.z);
    const d = new THREE.Vector3(direction.x, direction.y, direction.z);
    this.createMuzzleFlash(o, d);
    this.createBulletTracer(o, d);
    this.createBulletShell(o, d);
    if (weaponType === 'smg') {
      this.sounds.smgShot();
    } else {
      this.sounds.rifleShot();
    }
  }

  private onResize(): void {
    this.player.camera.aspect = window.innerWidth / window.innerHeight;
    this.player.camera.updateProjectionMatrix();
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  private onMouseDown(e: MouseEvent): void {
    if (e.button === 0) {
      this.isMouseDown = true;
      this.performAction();
    } else if (e.button === 2) {
      if (this.equipment === 'rifle' || this.equipment === 'smg') {
        this.isAiming = !this.isAiming;
      } else {
        // Instant snappy block placement like Minecraft
        this.tryBuild();
      }
    }
  }

  private onMouseUp(e: MouseEvent): void {
    if (e.button === 0) this.isMouseDown = false;
    // No buildMode toggle needed - instant placement on right-click
  }

  private onWheel(e: WheelEvent): void {
    const items: EquipmentType[] = ['rifle', 'smg', 'spade', 'pickaxe'];
    const idx = items.indexOf(this.equipment);
    this.equipment = e.deltaY > 0 ? items[(idx + 1) % 4] : items[(idx - 1 + 4) % 4];
    this.switchWeaponModel(this.equipment);
    this.isAiming = false;
  }

  private onKeyDown(e: KeyboardEvent): void {
    if (e.code === 'Digit1') { this.equipment = 'rifle'; this.switchWeaponModel('rifle'); }
    if (e.code === 'Digit2') { this.equipment = 'smg'; this.switchWeaponModel('smg'); }
    if (e.code === 'Digit3') { this.equipment = 'spade'; this.switchWeaponModel('spade'); }
    if (e.code === 'Digit4') { this.equipment = 'pickaxe'; this.switchWeaponModel('pickaxe'); }
    if (e.code === 'KeyR') this.startReload();
    if (e.code === 'KeyP') {
      this.toggleSpectator();
      return; // Exit early to prevent other key handling
    }
    
    // Spectator mode controls - WASD for movement, Space/Shift for up/down, mouse for look
    if (this.isSpectating) {
      if (e.code === 'Space') this.spectatorFlyUp = true;
      if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') this.spectatorFlyDown = true;
      if (e.code === 'KeyW') this.spectatorMoveForward = true;
      if (e.code === 'KeyS') this.spectatorMoveBackward = true;
      if (e.code === 'KeyA') this.spectatorMoveLeft = true;
      if (e.code === 'KeyD') this.spectatorMoveRight = true;
      if (e.code === 'ArrowLeft') this.spectatorAngle += Math.PI / 8;
      if (e.code === 'ArrowRight') this.spectatorAngle -= Math.PI / 8;
      // Mark manual control
      this.lastManualControlTime = Date.now();
    } else {
      this.player.handleKeyDown(e.code);
    }
  }

  private onKeyUp(e: KeyboardEvent): void {
    if (this.isSpectating) {
      if (e.code === 'Space') this.spectatorFlyUp = false;
      if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') this.spectatorFlyDown = false;
      if (e.code === 'KeyW') this.spectatorMoveForward = false;
      if (e.code === 'KeyS') this.spectatorMoveBackward = false;
      if (e.code === 'KeyA') this.spectatorMoveLeft = false;
      if (e.code === 'KeyD') this.spectatorMoveRight = false;
    } else {
      this.player.handleKeyUp(e.code);
    }
  }

  private onMouseMove(e: MouseEvent): void {
    if (this.isSpectating) {
      // Spectator mode: rotate camera with mouse (yaw and pitch)
      this.spectatorAngle -= e.movementX * 0.003;
      this.spectatorPitch -= e.movementY * 0.003;
      // Clamp pitch to avoid flipping
      this.spectatorPitch = Math.max(-Math.PI / 2.5, Math.min(Math.PI / 2.5, this.spectatorPitch));
      // Mark that manual control was used recently
      this.lastManualControlTime = Date.now();
      return;
    }
    if (document.pointerLockElement) {
      this.player.handleMouseMove(e.movementX, e.movementY);
    } else if (this.isMouseDown) {
      // Drag-to-look when pointer lock is not active (essential for AI preview / iframe)
      this.player.handleMouseMove(e.movementX * 1.5, e.movementY * 1.5);
    }
  }

  toggleSpectator(): void {
    this.isSpectating = !this.isSpectating;
    if (this.isSpectating) {
      // Reset spectator controls when entering spectator mode
      this.spectatorFlyUp = false;
      this.spectatorFlyDown = false;
      this.spectatorMoveForward = false;
      this.spectatorMoveBackward = false;
      this.spectatorMoveLeft = false;
      this.spectatorMoveRight = false;
      this.spectatorPitch = 0;
      this.showMessage('🎥 Spectator Mode: WASD to move, Space/Shift for up/down, Mouse to look');
      
      // Send to server in online mode
      if (this.networkClient && this.networkClient.isConnected()) {
        this.networkClient.sendToggleSpectator();
      }
    } else {
      this.player.updateCamera();
      this.showMessage('🎯 Player First-Person: ON');
      
      // Send to server in online mode
      if (this.networkClient && this.networkClient.isConnected()) {
        this.networkClient.sendToggleSpectator();
      }
    }
  }

  requestPointerLock(canvas: HTMLCanvasElement): void {
    canvas.requestPointerLock();
  }

  private performAction(): void {
    if (this.player.isDead) return;
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
    if (!weapon || weapon.magazineSize === 0) return;
    if (weapon.isReloading) return;
    if (now - weapon.lastFired < weapon.fireRate) return;
    if (weapon.currentAmmo <= 0) {
      this.startReload();
      return;
    }
    weapon.lastFired = now;
    weapon.currentAmmo--;

    const dir = this.player.getAimDirection();
    const muzzlePos = this.player.camera.position.clone().add(dir.clone().multiplyScalar(0.5));
    
    this.createMuzzleFlash(muzzlePos, dir.clone());
    this.createBulletTracer(muzzlePos, dir.clone());
    this.createBulletShell(muzzlePos, dir.clone());
    
    // Play appropriate sound based on weapon
    if (this.equipment === 'rifle') {
      this.sounds.rifleShot();
    } else if (this.equipment === 'smg') {
      this.sounds.smgShot();
    }

    const hit = this.world.raycast(muzzlePos, dir, 100);
    const voxelDist = hit ? hit.distance : 100;
    if (hit) {
      const voxel = this.world.getVoxel(hit.voxelPos.x, hit.voxelPos.y, hit.voxelPos.z);
      if (voxel) {
        const destroyed = this.world.damageVoxel(hit.voxelPos.x, hit.voxelPos.y, hit.voxelPos.z, 1);
        if (destroyed) {
          this.world.updateVoxelColor(hit.voxelPos.x, hit.voxelPos.y, hit.voxelPos.z, 0, 0);
        }
      }
    }

    // Check hit on enemy remote players
    let hitRemoteId: string | null = null;
    let hitIsHeadshot = false;

    for (const [id, remote] of this.remotePlayers) {
      if (remote.state.isDead || remote.state.team === this.playerTeam) continue;
      const toRemote = remote.mesh.position.clone().sub(this.player.position);
      const dot = toRemote.dot(dir);
      if (dot > 0 && dot < 100 && dot < voxelDist) {
        const closestPoint = this.player.position.clone().add(dir.clone().multiplyScalar(dot));
        const horizontalDist = Math.hypot(closestPoint.x - remote.mesh.position.x, closestPoint.z - remote.mesh.position.z);
        const verticalDist = closestPoint.y - remote.mesh.position.y;
        if (horizontalDist < 0.75 && verticalDist >= -0.2 && verticalDist <= 2.3) {
          hitRemoteId = id;
          hitIsHeadshot = verticalDist >= 1.45;
          this.hitMarkerTimer = 0.25;
          this.sounds.hitMarker();
          if (hitIsHeadshot) this.sounds.headshot();
          break;
        }
      }
    }

    // Send shoot event to network server with hit candidate
    if (this.networkClient && this.networkClient.isConnected()) {
      this.networkClient.sendShoot(
        { x: muzzlePos.x, y: muzzlePos.y, z: muzzlePos.z },
        { x: dir.x, y: dir.y, z: dir.z },
        hitRemoteId ? { targetId: hitRemoteId, isHeadshot: hitIsHeadshot } : undefined
      );
    }

    // Check hit on enemy bots with realistic hitbox (head and body)
    for (const bot of this.bots) {
      if (bot.isDead || bot.team === this.playerTeam) continue;
      const toBot = bot.position.clone().sub(this.player.position);
      const dot = toBot.dot(dir);
      if (dot > 0 && dot < 60 && dot < voxelDist) {
        const closestPoint = this.player.position.clone().add(dir.clone().multiplyScalar(dot));
        const horizontalDist = Math.hypot(closestPoint.x - bot.position.x, closestPoint.z - bot.position.z);
        const verticalDist = closestPoint.y - bot.position.y;

        // Bot hitbox: horizontal radius 0.65m, vertical height 0 to 2.1m
        if (horizontalDist < 0.65 && verticalDist >= 0 && verticalDist <= 2.1) {
          const isHeadshot = verticalDist >= 1.5;
          const damage = isHeadshot ? weapon.damage.head : weapon.damage.body;

          bot.hp -= damage;
          this.hitMarkerTimer = 0.2;
          this.sounds.hitMarker();

          if (bot.hp <= 0) {
            bot.isDead = true;
            bot.mesh.visible = false;
            bot.respawnTimer = 6;
            if (this.playerTeam === 'blue') this.blueKills++; else this.redKills++;
            this.sounds.killSound();
            this.showMessage(`🎯 You killed ${bot.name} ${isHeadshot ? '(HEADSHOT!)' : ''}`);
          }
          break; // Bullet hit target
        }
      }
    }
  }

  private usePickaxe(now: number): void {
    if (now - this.lastActionTime < 0.3) return;
    this.lastActionTime = now;
    
    const dir = this.player.getAimDirection();
    const origin = this.player.camera.position.clone().add(dir.clone().multiplyScalar(0.5));
    const hit = this.world.raycast(origin, dir, 5);
    
    if (hit) {
      const result = this.world.damageVoxel(hit.voxelPos.x, hit.voxelPos.y, hit.voxelPos.z, 3);
      if (result.destroyed) {
        this.inventory++;
        this.sounds.pickaxeHit();
      }
      if (this.networkClient && this.networkClient.isConnected()) {
        this.networkClient.sendUseTool('pickaxe', { x: hit.voxelPos.x, y: hit.voxelPos.y, z: hit.voxelPos.z });
      }
    }
  }

  private useSpade(now: number): void {
    if (now - this.lastActionTime < 0.3) return;
    this.lastActionTime = now;
    
    const dir = this.player.getAimDirection();
    const origin = this.player.camera.position.clone().add(dir.clone().multiplyScalar(0.5));
    const hit = this.world.raycast(origin, dir, 5);
    
    if (hit) {
      // Dig trench: remove target voxel and the one below it (2 tiles)
      const vx = hit.voxelPos.x;
      const vy = hit.voxelPos.y;
      const vz = hit.voxelPos.z;
      
      // Destroy target voxel
      const result1 = this.world.damageVoxel(vx, vy, vz, 3);
      if (result1.destroyed) {
        this.inventory++;
      }
      
      // Destroy voxel below for trench effect
      const result2 = this.world.damageVoxel(vx, vy - 1, vz, 3);
      if (result2.destroyed) {
        this.inventory++;
      }
      
      this.sounds.spadeHit();
      if (this.networkClient && this.networkClient.isConnected()) {
        this.networkClient.sendUseTool('spade', { x: vx, y: vy, z: vz });
      }
    }
  }

  private tryBuild(): void {
    if (this.inventory <= 0) return;
    
    const dir = this.player.getAimDirection();
    const origin = this.player.camera.position.clone().add(dir.clone().multiplyScalar(0.5));
    const hit = this.world.raycast(origin, dir, 6);
    
    if (hit) {
      const px = hit.voxelPos.x + Math.round(hit.normal.x);
      const py = hit.voxelPos.y + Math.round(hit.normal.y);
      const pz = hit.voxelPos.z + Math.round(hit.normal.z);
      
      if (!this.world.isSolid(px, py, pz) && this.world.canBuild(px, py, pz)) {
        this.world.setVoxel(px, py, pz, VOXEL_BUILT, 3);
        this.inventory--;
        this.sounds.buildPlace();
        if (this.networkClient && this.networkClient.isConnected()) {
          this.networkClient.sendBuild({ x: px, y: py, z: pz });
        }
        
        // Add instant visual feedback - flash the placed block
        this.createBlockPlacementEffect(px, py, pz);
      }
    }
  }

  private createBlockPlacementEffect(x: number, y: number, z: number): void {
    // Create a quick flash effect at the placement location
    const flashGeo = new THREE.BoxGeometry(VOXEL_SIZE * 1.1, VOXEL_SIZE * 1.1, VOXEL_SIZE * 1.1);
    const flashMat = new THREE.MeshBasicMaterial({ color: 0x88ff88, transparent: true, opacity: 0.7 });
    const flashMesh = new THREE.Mesh(flashGeo, flashMat);
    flashMesh.position.set(x + 0.5, y + 0.5, z + 0.5);
    this.scene.add(flashMesh);
    
    // Animate the flash fading out
    const fadeOut = () => {
      flashMat.opacity -= 0.15;
      if (flashMat.opacity > 0) {
        requestAnimationFrame(fadeOut);
      } else {
        this.scene.remove(flashMesh);
        flashGeo.dispose();
        flashMat.dispose();
      }
    };
    requestAnimationFrame(fadeOut);
  }

  private startReload(): void {
    const weapon = this.weapons[this.equipment];
    if (!weapon || weapon.magazineSize === 0 || weapon.isReloading || weapon.currentAmmo === weapon.magazineSize) return;
    weapon.isReloading = true;
    weapon.reloadStartTime = performance.now() / 1000;
    this.isReloadAnimating = true;
    this.reloadAnimationTime = 0;
    this.reloadAnimationDuration = weapon.reloadTime;
    this.sounds.reload();
    if (this.networkClient && this.networkClient.isConnected()) {
      this.networkClient.sendReload();
    }
  }

  private createMuzzleFlash(position: THREE.Vector3, direction: THREE.Vector3): void {
    const light = new THREE.PointLight(0xffaa00, 5, 8);
    light.position.copy(position);
    this.scene.add(light);

    const flashGeo = new THREE.SphereGeometry(0.15, 8, 8);
    const flashMat = new THREE.MeshBasicMaterial({ color: 0xffcc00, transparent: true, opacity: 0.9 });
    const flashMesh = new THREE.Mesh(flashGeo, flashMat);
    flashMesh.position.copy(position);
    this.scene.add(flashMesh);

    this.muzzleFlashes.push({ light, mesh: flashMesh, life: 0, maxLife: 0.08 });
  }

  private createBulletTracer(origin: THREE.Vector3, direction: THREE.Vector3): void {
    const tracerGeo = new THREE.BoxGeometry(0.02, 0.02, 0.5);
    const tracerMat = new THREE.MeshBasicMaterial({ color: 0xffff00, transparent: true, opacity: 0.8 });
    const mesh = new THREE.Mesh(tracerGeo, tracerMat);
    mesh.position.copy(origin);
    this.scene.add(mesh);

    const velocity = direction.clone().multiplyScalar(200);
    this.bulletTracers.push({ mesh, velocity, life: 0, maxLife: 0.5, hasWhizzed: false, hasImpacted: false });
  }

  private createBulletShell(origin: THREE.Vector3, direction: THREE.Vector3): void {
    const shellGeo = new THREE.CylinderGeometry(0.01, 0.01, 0.03, 8);
    const shellMat = new THREE.MeshStandardMaterial({ color: 0xDAA520, metalness: 0.8, roughness: 0.2 });
    const mesh = new THREE.Mesh(shellGeo, shellMat);
    mesh.position.copy(origin);
    
    // Rotate shell to be horizontal
    mesh.rotation.z = Math.PI / 2;
    
    this.scene.add(mesh);

    // Eject shell to the right and slightly up
    const right = new THREE.Vector3(-direction.z, 0, direction.x).normalize();
    const velocity = right.multiplyScalar(3).add(new THREE.Vector3(0, 2, 0));
    const rotationSpeed = new THREE.Vector3(
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 10,
      (Math.random() - 0.5) * 10
    );

    this.bulletShells.push({ mesh, velocity, rotationSpeed, life: 0, maxLife: 2 });
  }

  private showMessage(msg: string): void {
    this.message = msg;
    this.messageTimer = 2;
  }

  start(): void {
    this.animate();
  }

  private animate = (): void => {
    requestAnimationFrame(this.animate);
    const dt = Math.min(this.clock.getDelta(), 0.05);

    this.player.update(dt);
    this.world.update();

    // Handle player death respawn timer
    if (this.player.isDead) {
      this.player.respawnTimer -= dt;
      if (this.player.respawnTimer <= 0) {
        this.player.respawn(this.playerTeam);
        // Reset weapon magazines
        for (const key of Object.keys(this.weapons)) {
          const w = this.weapons[key];
          if (w && w.magazineSize > 0) {
            w.currentAmmo = w.magazineSize;
            w.isReloading = false;
          }
        }
        // Reset inventory on respawn
        this.inventory = 0;
        // Reset flag carrying state
        this.player.carryingFlag = false;
        this.isReloadAnimating = false;
        this.sounds.respawn();
      }
    }

    // Continuous fire for SMG and tools while holding mouse button
    if (this.isMouseDown && !this.player.isDead) {
      if (this.equipment === 'smg' || this.equipment === 'pickaxe' || this.equipment === 'spade') {
        this.performAction();
      }
    }

    // ADS camera zoom
    const targetFov = this.isAiming ? (this.equipment === 'rifle' ? 45 : 55) : 75;
    if (Math.abs(this.player.camera.fov - targetFov) > 0.1) {
      this.player.camera.fov += (targetFov - this.player.camera.fov) * Math.min(dt * 12, 1);
      this.player.camera.updateProjectionMatrix();
    }

    if (this.currentWeaponModel) {
      const targetPos = this.isAiming ? this.adsPosition : this.hipPosition;
      this.currentWeaponModel.position.lerp(targetPos, Math.min(dt * 10, 1));
    }

    if (this.isReloadAnimating) {
      this.reloadAnimationTime += dt;
      if (this.reloadAnimationTime >= this.reloadAnimationDuration) {
        const weapon = this.weapons[this.equipment];
        if (weapon && weapon.magazineSize > 0) {
          weapon.currentAmmo = weapon.magazineSize;
          weapon.isReloading = false;
        }
        this.isReloadAnimating = false;
      }
    }

    for (let i = this.muzzleFlashes.length - 1; i >= 0; i--) {
      const flash = this.muzzleFlashes[i];
      flash.life += dt;
      if (flash.life >= flash.maxLife) {
        this.scene.remove(flash.light);
        this.scene.remove(flash.mesh);
        this.muzzleFlashes.splice(i, 1);
      }
    }

    for (let i = this.bulletTracers.length - 1; i >= 0; i--) {
      const tracer = this.bulletTracers[i];
      tracer.mesh.position.add(tracer.velocity.clone().multiplyScalar(dt));
      tracer.life += dt;
      if (tracer.life >= tracer.maxLife) {
        this.scene.remove(tracer.mesh);
        this.bulletTracers.splice(i, 1);
      }
    }

    // Update bullet shells
    for (let i = this.bulletShells.length - 1; i >= 0; i--) {
      const shell = this.bulletShells[i];
      shell.velocity.y -= 9.8 * dt; // Gravity
      shell.mesh.position.add(shell.velocity.clone().multiplyScalar(dt));
      shell.mesh.rotation.x += shell.rotationSpeed.x * dt;
      shell.mesh.rotation.y += shell.rotationSpeed.y * dt;
      shell.mesh.rotation.z += shell.rotationSpeed.z * dt;
      shell.life += dt;
      
      // Fade out in last 0.5 seconds
      if (shell.life > shell.maxLife - 0.5) {
        const opacity = (shell.maxLife - shell.life) / 0.5;
        (shell.mesh.material as THREE.MeshStandardMaterial).opacity = opacity;
      }
      
      if (shell.life >= shell.maxLife) {
        this.scene.remove(shell.mesh);
        this.bulletShells.splice(i, 1);
      }
    }

    this.updateFlags(dt);
    this.updateBots(dt);

    // Send network player input to server
    if (this.networkClient && this.networkClient.isConnected() && !this.player.isDead) {
      const now = performance.now();
      if (now - this.lastInputSendTime > this.inputSendRate) {
        this.lastInputSendTime = now;
        this.networkClient.sendPlayerInput({
          moveX: (this.player.hasKey('KeyD') ? 1 : 0) - (this.player.hasKey('KeyA') ? 1 : 0),
          moveZ: (this.player.hasKey('KeyW') ? 1 : 0) - (this.player.hasKey('KeyS') ? 1 : 0),
          jump: this.player.hasKey('Space'),
          crouch: this.player.isCrouching,
          sprint: this.player.isSprinting,
          yaw: this.player.yaw,
          pitch: this.player.pitch,
          position: { x: this.player.position.x, y: this.player.position.y, z: this.player.position.z },
          equipment: this.equipment,
          isAiming: this.isAiming,
        });
      }
    }

    // Smoothly interpolate remote players
    for (const [, remote] of this.remotePlayers) {
      remote.mesh.position.lerp(remote.targetPosition, Math.min(dt * 15, 1));
      remote.mesh.rotation.y = remote.targetRotation.y;

      const dist = remote.mesh.position.distanceTo(remote.targetPosition);
      const isMoving = dist > 0.05;
      // Bot mesh children: 0: body, 1: head, 2: helmet, 3: leftArm, 4: rightArm, 5: leftLeg, 6: rightLeg
      const leftArm = remote.mesh.children[3] as THREE.Mesh;
      const rightArm = remote.mesh.children[4] as THREE.Mesh;
      const leftLeg = remote.mesh.children[5] as THREE.Mesh;
      const rightLeg = remote.mesh.children[6] as THREE.Mesh;

      if (isMoving) {
        const swing = Math.sin(performance.now() * 0.01) * 0.45;
        if (leftLeg) leftLeg.rotation.x = swing;
        if (rightLeg) rightLeg.rotation.x = -swing;
        if (leftArm) leftArm.rotation.x = -swing;
        if (rightArm) rightArm.rotation.x = swing;
      } else {
        if (leftLeg) leftLeg.rotation.x = 0;
        if (rightLeg) rightLeg.rotation.x = 0;
        if (leftArm) leftArm.rotation.x = 0;
        if (rightArm) rightArm.rotation.x = 0;
      }
    }

    // Hit marker timer countdown (only flashes red on hit, then disappears)
    if (this.hitMarkerTimer > 0) {
      this.hitMarkerTimer -= dt;
      if (this.hitMarkerTimer <= 0) {
        this.hitMarkerTimer = 0;
      }
    }

    // Dynamic Spectator camera view with fly controls
    if (this.isSpectating) {
      // Auto-rotate only if no manual control was used in the last 3 seconds
      const timeSinceManualControl = Date.now() - this.lastManualControlTime;
      const isUsingControls = this.spectatorMoveForward || this.spectatorMoveBackward || 
                              this.spectatorMoveLeft || this.spectatorMoveRight || 
                              this.spectatorFlyUp || this.spectatorFlyDown;
      if (timeSinceManualControl > 3000 && !isUsingControls) {
        this.spectatorAngle += dt * 0.22;
      }
      
      let focusTarget = new THREE.Vector3(0, this.world.getOriginalGroundLevel() + 2, 0);
      if (this.redFlag?.carrier) {
        const carrierPos = this.redFlag.carrier.isPlayer ? this.player.position : this.redFlag.carrier.bot?.position;
        if (carrierPos) focusTarget = carrierPos.clone();
      } else if (this.blueFlag?.carrier) {
        const carrierPos = this.blueFlag.carrier.isPlayer ? this.player.position : this.blueFlag.carrier.bot?.position;
        if (carrierPos) focusTarget = carrierPos.clone();
      }

      const camDist = 30;
      const baseCamHeight = 18;
      let camY = focusTarget.y + baseCamHeight;
      
      // Apply fly up/down controls
      if (this.spectatorFlyUp) {
        camY += this.spectatorSpeed * dt;
      }
      if (this.spectatorFlyDown) {
        camY -= this.spectatorSpeed * dt;
      }
      
      // Calculate camera position based on angle and pitch
      const cosPitch = Math.cos(this.spectatorPitch);
      const sinPitch = Math.sin(this.spectatorPitch);
      
      // Horizontal distance adjusted by pitch
      const horizontalDist = camDist * cosPitch;
      const verticalOffset = camDist * sinPitch;
      
      const camX = focusTarget.x + Math.sin(this.spectatorAngle) * horizontalDist;
      const camZ = focusTarget.z + Math.cos(this.spectatorAngle) * horizontalDist;
      camY = camY + verticalOffset;
      
      // Ensure minimum height above ground
      const minGroundY = this.world.getGroundHeight(camX, camZ) + 2;
      camY = Math.max(minGroundY, camY);

      // Apply WASD movement relative to camera direction - move the focus point AND camera together
      const moveSpeed = 30 * dt;
      const forwardDir = new THREE.Vector3(Math.sin(this.spectatorAngle), 0, Math.cos(this.spectatorAngle));
      const rightDir = new THREE.Vector3(Math.cos(this.spectatorAngle), 0, -Math.sin(this.spectatorAngle));
      
      if (this.spectatorMoveForward) {
        focusTarget.add(forwardDir.clone().multiplyScalar(moveSpeed));
      }
      if (this.spectatorMoveBackward) {
        focusTarget.sub(forwardDir.clone().multiplyScalar(moveSpeed));
      }
      if (this.spectatorMoveLeft) {
        focusTarget.sub(rightDir.clone().multiplyScalar(moveSpeed));
      }
      if (this.spectatorMoveRight) {
        focusTarget.add(rightDir.clone().multiplyScalar(moveSpeed));
      }

      // Update camera position to orbit around the NEW focus target
      const finalCamX = focusTarget.x + Math.sin(this.spectatorAngle) * horizontalDist;
      const finalCamZ = focusTarget.z + Math.cos(this.spectatorAngle) * horizontalDist;
      
      this.player.camera.position.set(finalCamX, camY, finalCamZ);
      this.player.camera.lookAt(focusTarget.x, focusTarget.y + 1.5, focusTarget.z);
    } else {
      // First-person player camera
      this.player.updateCamera();
    }

    if (this.messageTimer > 0) {
      this.messageTimer -= dt;
      if (this.messageTimer <= 0) this.message = '';
    }

    this.emitState();
    this.renderer.render(this.scene, this.player.camera);
  };

  private findNearestEnemy(bot: Bot): { pos: THREE.Vector3; isPlayer: boolean; bot?: Bot } | null {
    let nearest: { pos: THREE.Vector3; isPlayer: boolean; bot?: Bot } | null = null;
    let nearestDist = Infinity;

    // Get bot's forward direction vector
    const botForward = new THREE.Vector3(Math.sin(bot.mesh.rotation.y), 0, Math.cos(bot.mesh.rotation.y));

    // Prioritize enemy flag carrier if our team's flag is stolen!
    const friendlyFlag = bot.team === 'blue' ? this.blueFlag : this.redFlag;
    if (friendlyFlag && friendlyFlag.carrier) {
      if (friendlyFlag.carrier.isPlayer && bot.team !== this.playerTeam && !this.player.isDead) {
        const dist = bot.position.distanceTo(this.player.position);
        if (dist < 75) {
          // Check if enemy is in front of bot (field of view check)
          const toEnemy = this.player.position.clone().sub(bot.position).normalize();
          const dotProduct = botForward.dot(toEnemy);
          if (dotProduct > 0.3) { // ~72 degree field of view
            return { pos: this.player.position.clone(), isPlayer: true };
          }
        }
      } else if (friendlyFlag.carrier.bot && !friendlyFlag.carrier.bot.isDead && friendlyFlag.carrier.bot.team !== bot.team) {
        const dist = bot.position.distanceTo(friendlyFlag.carrier.bot.position);
        if (dist < 75) {
          // Check if enemy is in front of bot (field of view check)
          const toEnemy = friendlyFlag.carrier.bot.position.clone().sub(bot.position).normalize();
          const dotProduct = botForward.dot(toEnemy);
          if (dotProduct > 0.3) { // ~72 degree field of view
            return { pos: friendlyFlag.carrier.bot.position.clone(), isPlayer: false, bot: friendlyFlag.carrier.bot };
          }
        }
      }
    }

    // Check player
    if (bot.team !== this.playerTeam && !this.player.isDead) {
      const dist = bot.position.distanceTo(this.player.position);
      if (dist < nearestDist) {
        // Check if player is in front of bot (field of view check)
        const toPlayer = this.player.position.clone().sub(bot.position).normalize();
        const dotProduct = botForward.dot(toPlayer);
        if (dotProduct > 0.3) { // ~72 degree field of view
          nearestDist = dist;
          nearest = { pos: this.player.position.clone(), isPlayer: true };
        }
      }
    }

    // Check other bots
    for (const otherBot of this.bots) {
      if (otherBot === bot || otherBot.isDead || otherBot.team === bot.team) continue;
      const dist = bot.position.distanceTo(otherBot.position);
      if (dist < nearestDist) {
        // Check if enemy bot is in front of bot (field of view check)
        const toEnemy = otherBot.position.clone().sub(bot.position).normalize();
        const dotProduct = botForward.dot(toEnemy);
        if (dotProduct > 0.3) { // ~72 degree field of view
          nearestDist = dist;
          nearest = { pos: otherBot.position.clone(), isPlayer: false, bot: otherBot };
        }
      }
    }

    return nearest;
  }

  private updateBots(dt: number): void {
    const friendlyFlag = (team: Team) => team === 'blue' ? this.blueFlag : this.redFlag;
    const enemyFlag = (team: Team) => team === 'blue' ? this.redFlag : this.blueFlag;

    // Update ALL bots every frame for responsive, fluid movement and action
    for (let i = 0; i < this.bots.length; i++) {
      const bot = this.bots[i];

      if (bot.isDead) {
        bot.respawnTimer -= dt;
        if (bot.respawnTimer <= 0) {
          bot.isDead = false;
          bot.hp = bot.maxHp;
          bot.mesh.visible = true;
          const spawnPos = this.getSafeSpawnPos(bot.team);
          bot.position.copy(spawnPos);
          bot.lastPos.copy(spawnPos);
          bot.stuckTimer = 0;
          bot.carryingFlag = false;
          bot.mesh.position.copy(bot.position);
          // Reset human-like states
          bot.isDigging = false;
          bot.digTimer = 0;
          bot.digTarget = null;
          bot.trenchDepth = 0;
          bot.isInTrench = false;
          bot.panicLevel = 0;
          bot.suppressionTimer = 0;
          bot.lastSeenEnemy = null;
          bot.memoryPosition = null;
          bot.flankRoute = null;
          bot.flankProgress = 0;
        }
        continue;
      }

      const eFlag = enemyFlag(bot.team);
      const fFlag = friendlyFlag(bot.team);
      const homeBasePos = bot.team === 'blue' ? BLUE_FLAG_POS : RED_FLAG_POS;

      // Find nearest enemy target
      const enemyTarget = this.findNearestEnemy(bot);
      const distToEnemy = enemyTarget ? bot.position.distanceTo(enemyTarget.pos) : Infinity;

      // Update human-like psychological states with more dynamic behavior
      if (enemyTarget && distToEnemy < 30) {
        bot.panicLevel = Math.min(1.0, bot.panicLevel + dt * 0.5);
        bot.suppressionTimer = 2.0; // Suppressed for 2 seconds when seeing enemy
        bot.lastSeenEnemy = enemyTarget.pos.clone();
        bot.confidence = Math.max(0.2, bot.confidence - dt * 0.1);
      } else {
        bot.panicLevel = Math.max(0, bot.panicLevel - dt * 0.2);
        bot.confidence = Math.min(1.0, bot.confidence + dt * 0.05);
      }
      if (bot.suppressionTimer > 0) bot.suppressionTimer -= dt;
      
      // Low confidence bots may retreat or take cover more often
      if (bot.confidence < 0.4 && bot.hp < 50 && !bot.carryingFlag) {
        // Retreat behavior: move away from enemy
        if (enemyTarget && Math.random() < 0.02) {
          const retreatDir = bot.position.clone().sub(enemyTarget.pos).normalize();
          bot.targetPos.set(
            bot.position.x + retreatDir.x * 20,
            0,
            bot.position.z + retreatDir.z * 20
          );
          bot.behaviorState = 'retreating';
        }
      }

      // Memory system - remember last seen enemy position
      if (bot.lastSeenEnemy) {
        bot.memoryTimer -= dt;
        if (bot.memoryTimer <= 0) {
          bot.lastSeenEnemy = null;
          bot.memoryPosition = null;
        }
      }

      // Tactical decision making with more patience and human-like behaviors
      if (bot.carryingFlag) {
        // PRIORITY 1: Bot is carrying enemy flag - rush straight home to capture!
        bot.targetPos.set(homeBasePos.x + bot.laneOffset * 0.3, 0, homeBasePos.z);
        bot.behaviorState = 'returnFlag';
        bot.isDigging = false; // Don't dig when carrying flag
      } else if (fFlag && fFlag.carrier) {
        // PRIORITY 2: Friendly flag is stolen! Intercept and kill enemy carrier!
        const carrierPos = fFlag.carrier.isPlayer ? this.player.position : fFlag.carrier.bot?.position;
        if (carrierPos && bot.position.distanceTo(carrierPos) < 90) {
          bot.targetPos.copy(carrierPos);
          bot.behaviorState = 'intercept';
          bot.isDigging = false;
        } else {
          bot.targetPos.set(eFlag.currentPos.x + bot.laneOffset, 0, eFlag.currentPos.z);
          bot.behaviorState = 'rushFlag';
        }
      } else if (eFlag && eFlag.carrier) {
        // PRIORITY 3: Ally has enemy flag! Escort teammate home!
        bot.targetPos.set(homeBasePos.x + bot.laneOffset, 0, homeBasePos.z);
        bot.behaviorState = 'escort';
      } else if (bot.role === 'flanker') {
        // FLANKER: Use flank routes to approach from sides
        if (!bot.flankRoute || bot.flankProgress >= bot.flankRoute.length) {
          // Generate new flank route
          const side = Math.random() > 0.5 ? 1 : -1;
          const flankDist = 40 + Math.random() * 20;
          bot.flankRoute = [
            { x: bot.position.x + side * 15, z: bot.position.z },
            { x: bot.position.x + side * 20, z: (bot.position.z + eFlag.currentPos.z) / 2 },
            { x: side * flankDist, z: eFlag.currentPos.z * 0.3 },
          ];
          bot.flankProgress = 0;
        }
        
        const waypoint = bot.flankRoute[bot.flankProgress];
        const distToWaypoint = Math.hypot(bot.position.x - waypoint.x, bot.position.z - waypoint.z);
        
        if (distToWaypoint < 5) {
          bot.flankProgress++;
          if (bot.flankProgress >= bot.flankRoute.length) {
            bot.flankRoute = null;
          }
        }
        
        if (waypoint) {
          bot.targetPos.set(waypoint.x, 0, waypoint.z);
          bot.behaviorState = 'flanking';
        }
        
        // Flankers may dig cover when under fire
        if (bot.suppressionTimer > 0 && bot.hasSpade && !bot.isDigging && Math.random() < 0.02) {
          bot.isDigging = true;
          bot.digTimer = 3 + Math.random() * 2;
          bot.digTarget = { 
            x: Math.floor(bot.position.x), 
            y: Math.floor(bot.position.y) - 1, 
            z: Math.floor(bot.position.z) 
          };
        } else if (!bot.isDigging && bot.suppressionTimer > 0 && Math.random() < 0.015 && bot.inventoryBlocks && bot.inventoryBlocks > 0) {
          // Build cover when suppressed and have blocks
          bot.isBuilding = true;
          bot.buildTimer = 3 + Math.random() * 2;
          bot.buildTarget = { 
            x: Math.floor(bot.position.x + (Math.random() - 0.5) * 2), 
            y: Math.floor(bot.position.y), 
            z: Math.floor(bot.position.z + (Math.random() - 0.5) * 2) 
          };
        }
        
      } else if (bot.role === 'support') {
        // SUPPORT: Stay back, provide covering fire, dig defensive positions
        const supportDist = 35 + Math.random() * 15;
        const angle = Math.atan2(bot.position.z - eFlag.currentPos.z, bot.position.x - eFlag.currentPos.x);
        bot.targetPos.set(
          eFlag.currentPos.x + Math.cos(angle) * supportDist,
          0,
          eFlag.currentPos.z + Math.sin(angle) * supportDist
        );
        bot.behaviorState = 'support';
        
        // Support bots dig trenches when not engaged
        if (bot.hasSpade && !bot.isDigging && !enemyTarget && Math.random() < 0.01) {
          bot.isDigging = true;
          bot.digTimer = 4 + Math.random() * 3;
          bot.digTarget = { 
            x: Math.floor(bot.position.x), 
            y: Math.floor(bot.position.y) - 1, 
            z: Math.floor(bot.position.z) 
          };
          bot.behaviorState = 'diggingTrench';
        }
        
      } else if (bot.role === 'attacker') {
        // PRIORITY 4: Attacker pushes for enemy flag but waits at distance
        const distToFlag = bot.position.distanceTo(eFlag.currentPos);
        if (distToFlag < 25) {
          // Too close, back off and patrol around
          const angle = Math.atan2(bot.position.z - eFlag.currentPos.z, bot.position.x - eFlag.currentPos.x);
          const holdDist = 25 + Math.random() * 10;
          bot.targetPos.set(
            eFlag.currentPos.x + Math.cos(angle) * holdDist,
            0,
            eFlag.currentPos.z + Math.sin(angle) * holdDist
          );
          bot.behaviorState = 'patrol';
        } else {
          bot.targetPos.set(eFlag.currentPos.x + bot.laneOffset, 0, eFlag.currentPos.z);
          bot.behaviorState = 'rushFlag';
        }
        
        // Attackers dig when suppressed and have spade
        if (bot.suppressionTimer > 0 && bot.hasSpade && !bot.isDigging && Math.random() < 0.03) {
          bot.isDigging = true;
          bot.digTimer = 2 + Math.random() * 2;
          bot.digTarget = { 
            x: Math.floor(bot.position.x), 
            y: Math.floor(bot.position.y) - 1, 
            z: Math.floor(bot.position.z) 
          };
          bot.behaviorState = 'diggingCover';
        }
        
      } else {
        // PRIORITY 5: Defender patrols friendly base area
        bot.moveTimer -= dt;
        if (bot.moveTimer <= 0) {
          bot.moveTimer = 3 + Math.random() * 3;
          const angle = Math.random() * Math.PI * 2;
          const dist = 8 + Math.random() * 16;
          bot.targetPos.set(homeBasePos.x + Math.cos(angle) * dist, 0, homeBasePos.z + Math.sin(angle) * dist);
        }
        bot.behaviorState = 'defend';
        
        // Defenders dig defensive trenches around base
        if (bot.hasSpade && !bot.isDigging && !enemyTarget && Math.random() < 0.015) {
          bot.isDigging = true;
          bot.digTimer = 5 + Math.random() * 3;
          bot.digTarget = { 
            x: Math.floor(homeBasePos.x + (Math.random() - 0.5) * 20), 
            y: Math.floor(this.world.getGroundHeight(homeBasePos.x + (Math.random() - 0.5) * 20, homeBasePos.z + (Math.random() - 0.5) * 20)) - 1, 
            z: Math.floor(homeBasePos.z + (Math.random() - 0.5) * 20) 
          };
          bot.behaviorState = 'diggingTrench';
        }
      }

      // Handle digging behavior
      if (bot.isDigging && bot.digTarget) {
        bot.digTimer -= dt;
        if (bot.digTimer <= 0) {
          // Complete digging - remove voxel
          const { x, y, z } = bot.digTarget;
          if (this.world.canDig(x, y, z)) {
            this.world.setVoxel(x, y, z, 0); // Set to air
            bot.trenchDepth++;
            bot.isInTrench = bot.trenchDepth >= 2;
            
            // Dig below too for deeper trench
            if (bot.trenchDepth % 2 === 0 && this.world.canDig(x, y - 1, z)) {
              this.world.setVoxel(x, y - 1, z, 0);
            }
            
            // Send dig command to server in online mode
            if (this.gameMode === 'online' && this.networkClient && this.networkClient.isConnected()) {
              this.networkClient.send({ type: 'useTool', tool: 'spade', target: { x, y, z } });
            }
          }
          
          // Stop digging after completing one block or if timer goes negative
          bot.isDigging = false;
          bot.digTarget = null;
          bot.digTimer = 0;
        } else {
          continue; // Skip movement while actively digging
        }
      }

      // Handle building behavior
      if (bot.isBuilding && bot.buildTarget) {
        bot.buildTimer -= dt;
        if (bot.buildTimer <= 0) {
          // Complete building - place voxel
          const { x, y, z } = bot.buildTarget;
          if (this.world.canBuild(x, y, z) && bot.inventoryBlocks > 0) {
            this.world.setVoxel(x, y, z, VOXEL_BUILT); // Place built block
            bot.inventoryBlocks--;
            
            // Send build command to server in online mode
            if (this.gameMode === 'online' && this.networkClient && this.networkClient.isConnected()) {
              this.networkClient.sendBuild({ x, y, z });
            }
          }
          
          // Stop building after completing one block
          bot.isBuilding = false;
          bot.buildTarget = null;
          bot.buildTimer = 0;
        } else {
          continue; // Skip movement while actively building
        }
      }

      // Movement Physics & Obstacle Handling
      const toTarget = bot.targetPos.clone().sub(bot.position);
      toTarget.y = 0;
      const distToTarget = toTarget.length();

      if (distToTarget > 0.8) {
        const moveDir = toTarget.clone().normalize();

        // High responsiveness and fast movement speed
        let speed = bot.carryingFlag ? 6.5 : (bot.role === 'attacker' ? 5.8 : 4.6);
        if (bot.isCrouching || bot.isInTrench) speed = 2.5;
        if (bot.suppressionTimer > 0) speed *= 0.7; // Move slower when suppressed

        // Obstacle avoidance: check ground height ahead
        const probeX = bot.position.x + moveDir.x * 0.8;
        const probeZ = bot.position.z + moveDir.z * 0.8;
        const probeGround = this.world.getGroundHeight(probeX, probeZ);
        const stepHeight = probeGround - bot.position.y;

        if (stepHeight > 1.25) {
          // Wall/obstacle ahead: deflect around obstacle using strafe direction
          const perpX = -moveDir.z * bot.strafeDirection;
          const perpZ = moveDir.x * bot.strafeDirection;
          moveDir.x = perpX;
          moveDir.z = perpZ;
        }

        const nextX = bot.position.x + moveDir.x * speed * dt;
        const nextZ = bot.position.z + moveDir.z * speed * dt;
        const groundY = this.world.getGroundHeight(nextX, nextZ);

        if (groundY - bot.position.y <= 1.35) {
          bot.position.x = nextX;
          bot.position.z = nextZ;
          bot.position.y = groundY;
        }

        // Stuck detection
        const distMoved = Math.hypot(bot.position.x - bot.lastPos.x, bot.position.z - bot.lastPos.z);
        if (distMoved < 0.04) {
          bot.stuckTimer += dt;
          if (bot.stuckTimer > 0.3) {
            bot.strafeDirection = -bot.strafeDirection;
            bot.position.y += 0.5;
            bot.stuckTimer = 0;
          }
        } else {
          bot.stuckTimer = 0;
          bot.lastPos.copy(bot.position);
        }

        // Yaw rotation: ALWAYS face movement direction when moving, face enemy only when shooting at close range
        let facingDir = moveDir.clone();
        
        // Only face enemy when in close combat AND actively shooting
        if (enemyTarget && distToEnemy < 25 && bot.shootCooldown <= 0 && bot.canSeeEnemy) {
          const toEnemy = enemyTarget.pos.clone().sub(bot.position);
          toEnemy.y = 0;
          if (toEnemy.length() > 0.1) facingDir = toEnemy.normalize();
        }

        const targetYaw = Math.atan2(facingDir.x, facingDir.z);
        const currentYaw = bot.mesh.rotation.y;
        let yawDiff = targetYaw - currentYaw;
        while (yawDiff > Math.PI) yawDiff -= Math.PI * 2;
        while (yawDiff < -Math.PI) yawDiff += Math.PI * 2;
        bot.mesh.rotation.y += yawDiff * Math.min(dt * 12, 1);

        // Walking animation
        bot.walkCycle += dt * (speed * 1.8);
        const swing = Math.sin(bot.walkCycle) * 0.5;
        const children = bot.mesh.children;
        const leftLeg = children.find(c => c.position.x < -0.1 && c.position.y < 1);
        const rightLeg = children.find(c => c.position.x > 0.1 && c.position.y < 1);
        const leftArm = children.find(c => c.position.x < -0.3 && c.position.y > 0.8);
        const rightArm = children.find(c => c.position.x > 0.3 && c.position.y > 0.8);

        if (leftLeg) leftLeg.rotation.x = swing;
        if (rightLeg) rightLeg.rotation.x = -swing;
        if (leftArm) leftArm.rotation.x = -swing * 0.7;
        if (rightArm) rightArm.rotation.x = swing * 0.7;
      } else {
        // Reset limbs
        const children = bot.mesh.children;
        const leftLeg = children.find(c => c.position.x < -0.1 && c.position.y < 1);
        const rightLeg = children.find(c => c.position.x > 0.1 && c.position.y < 1);
        const leftArm = children.find(c => c.position.x < -0.3 && c.position.y > 0.8);
        const rightArm = children.find(c => c.position.x > 0.3 && c.position.y > 0.8);
        if (leftLeg) leftLeg.rotation.x *= 0.9;
        if (rightLeg) rightLeg.rotation.x *= 0.9;
        if (leftArm) leftArm.rotation.x *= 0.9;
        if (rightArm) rightArm.rotation.x *= 0.9;
      }

      bot.mesh.position.copy(bot.position);

      // Head tracking towards enemy
      if (enemyTarget && distToEnemy < 35) {
        const head = bot.mesh.children.find(c => c.position.y > 1.7 && c.position.y < 2.0);
        if (head) {
          const toEnemy = enemyTarget.pos.clone().sub(bot.position);
          const headYaw = Math.atan2(toEnemy.x, toEnemy.z) - bot.mesh.rotation.y;
          let normalizedHeadYaw = Math.atan2(Math.sin(headYaw), Math.cos(headYaw));
          head.rotation.y = Math.max(-1.05, Math.min(1.05, normalizedHeadYaw));
        }
      }

      // Combat shooting logic with aggression-based behavior
      if (enemyTarget && distToEnemy < 45 && !bot.isDigging) {
        // Don't shoot while digging
        // More aggressive bots shoot more frequently
        const aggressionModifier = bot.aggression * 0.3; // High aggression = faster shooting
        
        if (bot.burstRemaining > 0) {
          bot.burstTimer -= dt;
          if (bot.burstTimer <= 0) {
            bot.burstRemaining--;
            bot.burstTimer = 0.11;
            this.executeBotShot(bot, enemyTarget);
          }
        } else {
          bot.shootTimer -= dt;
          if (bot.shootTimer <= 0) {
            if (bot.weapon === 'smg') {
              bot.burstRemaining = 3 + Math.floor(Math.random() * 3);
              bot.burstTimer = 0;
              bot.shootTimer = (1.0 + Math.random() * 0.8) * (1 - aggressionModifier);
            } else {
              this.executeBotShot(bot, enemyTarget);
              bot.shootTimer = (0.7 + Math.random() * 0.6) * (1 - aggressionModifier);
            }
          }
        }
      }
    }
  }

  private executeBotShot(bot: Bot, target: { pos: THREE.Vector3; isPlayer: boolean; bot?: Bot }): void {
    const origin = bot.position.clone().add(new THREE.Vector3(0, 1.4, 0));
    const toTarget = target.pos.clone().add(new THREE.Vector3(0, 1.2, 0)).sub(origin);
    const dist = toTarget.length();
    const dir = toTarget.clone().normalize();

    // Check line of sight
    const hit = this.world.raycast(origin, dir, 50);
    if (hit && hit.distance < dist - 0.5) {
      return; // Occluded by terrain
    }

    // Visual tracer and flash
    this.createMuzzleFlash(origin, dir);
    this.createBulletTracer(origin, dir);

    // Distant / 3D gunshot sound based on player distance
    const distToPlayer = bot.position.distanceTo(this.player.position);
    const pan = Math.sin(Math.atan2(bot.position.x - this.player.position.x, bot.position.z - this.player.position.z) - this.player.yaw);
    this.sounds.playDistantShot(bot.weapon, distToPlayer, pan);

    // Hit calculation with skill-based accuracy and shot misses
    // Base hit chance decreases with distance
    const baseHitChance = Math.max(0.25, 0.75 - dist / 60);
    // Apply bot skill (0.6-1.0)
    const skillMultiplier = bot.skill;
    // Apply aggression factor (more aggressive bots may shoot faster but less accurately)
    const aggressionFactor = 1.0 - (bot.aggression - 0.5) * 0.2; // High aggression = slightly less accurate
    // Calculate final hit chance
    const hitChance = baseHitChance * skillMultiplier * aggressionFactor;
    
    if (Math.random() < hitChance) {
      if (target.isPlayer) {
        const dmg = bot.weapon === 'rifle' ? 25 + Math.random() * 20 : 12 + Math.random() * 12;
        this.player.takeDamage(dmg);
        this.player.addCameraShake(0.15);
        this.sounds.hurt();

        if (this.player.isDead) {
          if (bot.team === 'red') this.redKills++; else this.blueKills++;
          this.sounds.killSound();
          this.showMessage(`☠️ You were killed by ${bot.name}!`);
        }
      } else if (target.bot) {
        const dmg = bot.weapon === 'rifle' ? 40 + Math.random() * 25 : 18 + Math.random() * 15;
        target.bot.hp -= dmg;

        if (target.bot.hp <= 0) {
          target.bot.isDead = true;
          target.bot.mesh.visible = false;
          target.bot.respawnTimer = 6;
          if (bot.team === 'blue') this.blueKills++; else this.redKills++;
          this.showMessage(`🎯 ${bot.name} eliminated ${target.bot.name}!`);
        }
      }
    }
  }

  handleBuildClick(): void {
    this.tryBuild();
  }

  private emitState(): void {
    if (this.onStateChange) {
      const weapon = this.weapons[this.equipment];
      let carrierName = '';
      if (this.player.carryingFlag) {
        carrierName = `You (${this.playerTeam.toUpperCase()})`;
      } else if (this.redFlag?.carrier) {
        carrierName = `${this.redFlag.carrier.name} (${this.redFlag.carrier.isPlayer ? this.playerTeam.toUpperCase() : this.redFlag.carrier.bot?.team.toUpperCase()})`;
      } else if (this.blueFlag?.carrier) {
        carrierName = `${this.blueFlag.carrier.name} (${this.blueFlag.carrier.isPlayer ? this.playerTeam.toUpperCase() : this.blueFlag.carrier.bot?.team.toUpperCase()})`;
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
        buildMode: false,  // Always false with instant placement
        buildValid: this.inventory > 0,
        blueKills: this.blueKills,
        redKills: this.redKills,
        blueCaptures: this.blueCaptures,
        redCaptures: this.redCaptures,
        isAiming: this.isAiming,
        currentAmmo: weapon ? weapon.currentAmmo : 0,
        magazineSize: weapon ? weapon.magazineSize : 0,
        isReloading: weapon ? weapon.isReloading : false,
        playerCarryingFlag: this.player.carryingFlag,
        flagCarrierName: carrierName,
        isSpectating: this.isSpectating,
        isOnline: this.gameMode === 'online',
        connectedPlayersCount: this.remotePlayers.size + 1,
        isNetworkConnected: this.networkClient ? this.networkClient.isConnected() : false,
        localPlayerId: this.localPlayerId,
      });
    }
  }

  destroy(): void {
    if (this.networkClient) {
      this.networkClient.disconnect();
    }
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
