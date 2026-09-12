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

const BLUE_SPAWN_Z_MIN = -100;
const BLUE_SPAWN_Z_MAX = -90;
const RED_SPAWN_Z_MIN = 90;
const RED_SPAWN_Z_MAX = 100;
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

  blueFlagMesh: THREE.Mesh | null = null;
  redFlagMesh: THREE.Mesh | null = null;
  blueFlagAtBase: boolean = true;
  redFlagAtBase: boolean = true;
  droppedFlags: Array<{ mesh: THREE.Mesh; position: THREE.Vector3; team: Team; respawnTimer: number }> = [];
  captureZoneSize: number = 4;

  private lastFlagCheckTime: number = 0;
  private flagCheckInterval: number = 0.1;

  private lastBotUpdateTime: number = 0;
  private botUpdateInterval: number = 0.05;
  private currentBotUpdateIndex: number = 0;
  private botsPerBatch: number = 4;

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
  };

  constructor(canvas: HTMLCanvasElement, mode: GameMode = 'multiplayer') {
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
    sun.shadow.mapSize.set(1024, 1024);
    sun.shadow.camera.left = -50;
    sun.shadow.camera.right = 50;
    sun.shadow.camera.top = 50;
    sun.shadow.camera.bottom = -50;
    this.scene.add(sun);

    this.world = new VoxelWorld();
    this.scene.add(this.world.mesh);

    this.addTeamZoneMarkers();

    this.player = new Player(this.world);
    this.player.team = 'blue';
    const blueSpawn = this.getSafeSpawnPos('blue');
    this.player.position.copy(blueSpawn);
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

    this.createFlags();
    this.createCaptureZones();

    if (this.gameMode === 'multiplayer') {
      this.spawnTeamBots('blue', 6);
      this.spawnTeamBots('red', 7);
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
    const blueFlagGeo = new THREE.CylinderGeometry(0.1, 0.1, 2, 8);
    const blueFlagMat = new THREE.MeshLambertMaterial({ color: 0x4488ff });
    this.blueFlagMesh = new THREE.Mesh(blueFlagGeo, blueFlagMat);
    this.blueFlagMesh.position.set(BLUE_FLAG_POS.x, this.world.getGroundHeight(BLUE_FLAG_POS.x, BLUE_FLAG_POS.z) + 1, BLUE_FLAG_POS.z);
    this.scene.add(this.blueFlagMesh);

    const redFlagGeo = new THREE.CylinderGeometry(0.1, 0.1, 2, 8);
    const redFlagMat = new THREE.MeshLambertMaterial({ color: 0xff4444 });
    this.redFlagMesh = new THREE.Mesh(redFlagGeo, redFlagMat);
    this.redFlagMesh.position.set(RED_FLAG_POS.x, this.world.getGroundHeight(RED_FLAG_POS.x, RED_FLAG_POS.z) + 1, RED_FLAG_POS.z);
    this.scene.add(this.redFlagMesh);
  }

  private createCaptureZones(): void {
    // Capture zones are visual only
  }

  private spawnTeamBots(team: Team, count: number): void {
    for (let i = 0; i < count; i++) {
      const pos = this.getSafeSpawnPos(team);
      const botMesh = this.createBotMesh(team);
      botMesh.position.copy(pos);
      this.scene.add(botMesh);

      const nameTag = this.createNameTag(team, `Bot${i}`);
      nameTag.position.y = 2.6;
      botMesh.add(nameTag);

      this.bots.push({
        mesh: botMesh,
        position: pos.clone(),
        velocity: new THREE.Vector3(),
        hp: 100, maxHp: 100,
        isDead: false, respawnTimer: 0,
        targetPos: pos.clone(),
        moveTimer: 2 + Math.random() * 3,
        shootTimer: 2 + Math.random() * 3,
        headY: 1.8, grounded: false,
        team, nameTag,
        isCrouching: false, crouchTimer: 0,
        behaviorState: 'patrol', behaviorTimer: 3 + Math.random() * 4,
        strafeDirection: Math.random() > 0.5 ? 1 : -1,
        stuckTimer: 0, lastPos: pos.clone(),
        jumpCooldown: 0, skill: 0.5 + Math.random() * 0.5,
        aggression: 0.4 + Math.random() * 0.6,
        lastDamageTime: 0, dodgeTimer: 0, coverTimer: 0,
        weapon: Math.random() > 0.5 ? 'rifle' : 'smg',
        weaponMesh: null,
        isAiming: false, aimTransition: 0,
        carryingFlag: false, flagMesh: null,
        lookAroundTimer: 0, lookAroundTarget: 0,
        walkCycle: Math.random() * Math.PI * 2,
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
    this.networkClient = new NetworkClient('ws://localhost:3000');
    this.networkClient.onConnect(() => {
      this.showMessage('Connected to server!');
      this.networkClient!.sendJoin('blue');
    });
    this.networkClient.connect().catch(() => {
      this.showMessage('Failed to connect to server');
    });
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
    if (now - weapon.lastFired < weapon.fireRate) return;
    if (weapon.currentAmmo <= 0) return;
    weapon.lastFired = now;
    weapon.currentAmmo--;

    const dir = this.player.getAimDirection();
    const muzzlePos = this.player.camera.position.clone().add(dir.clone().multiplyScalar(0.5));
    
    this.createMuzzleFlash(muzzlePos, dir.clone());
    this.createBulletTracer(muzzlePos, dir.clone());
    
    // Play appropriate sound based on weapon
    if (this.equipment === 'rifle') {
      this.sounds.rifleShot();
    } else if (this.equipment === 'smg') {
      this.sounds.smgShot();
    }

    const hit = this.world.raycast(muzzlePos, dir, 100);
    if (hit) {
      const voxel = this.world.getVoxel(hit.voxelPos.x, hit.voxelPos.y, hit.voxelPos.z);
      if (voxel) {
        const destroyed = this.world.damageVoxel(hit.voxelPos.x, hit.voxelPos.y, hit.voxelPos.z, 1);
        if (destroyed) {
          this.world.updateVoxelColor(hit.voxelPos.x, hit.voxelPos.y, hit.voxelPos.z, 0, 0);
        }
      }
    }

    for (const bot of this.bots) {
      if (bot.isDead || bot.team === this.playerTeam) continue;
      const dist = this.player.position.distanceTo(bot.position);
      if (dist < 50) {
        const toBot = bot.position.clone().sub(this.player.position);
        const dot = toBot.dot(dir);
        if (dot > 0 && dot < 50) {
          const closest = this.player.position.clone().add(dir.clone().multiplyScalar(dot));
          const distToBot = closest.distanceTo(bot.position);
          if (distToBot < 1) {
            bot.hp -= 34;
            this.hitMarkerTimer = 0.2;
            this.sounds.hitMarker();
            if (bot.hp <= 0) {
              bot.isDead = true;
              bot.mesh.visible = false;
              this.blueKills++;
              this.sounds.killSound();
            }
          }
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
      const destroyed = this.world.damageVoxel(hit.voxelPos.x, hit.voxelPos.y, hit.voxelPos.z, 3);
      if (destroyed) {
        this.inventory++;
        this.world.updateVoxelColor(hit.voxelPos.x, hit.voxelPos.y, hit.voxelPos.z, 0, 0);
        this.sounds.pickaxeHit();
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
      this.world.damageVoxel(hit.voxelPos.x, hit.voxelPos.y, hit.voxelPos.z, 3);
      this.world.updateVoxelColor(hit.voxelPos.x, hit.voxelPos.y, hit.voxelPos.z, 0, 0);
      this.sounds.spadeHit();
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
      }
    }
  }

  private startReload(): void {
    const weapon = this.weapons[this.equipment];
    if (weapon.isReloading || weapon.currentAmmo === weapon.magazineSize) return;
    weapon.isReloading = true;
    weapon.reloadStartTime = performance.now() / 1000;
    this.isReloadAnimating = true;
    this.reloadAnimationTime = 0;
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

    if (this.currentWeaponModel) {
      const targetPos = this.isAiming ? this.adsPosition : this.hipPosition;
      this.currentWeaponModel.position.lerp(targetPos, Math.min(dt * 10, 1));
    }

    if (this.isReloadAnimating) {
      this.reloadAnimationTime += dt;
      if (this.reloadAnimationTime >= this.reloadAnimationDuration) {
        const weapon = this.weapons[this.equipment];
        weapon.currentAmmo = weapon.magazineSize;
        weapon.isReloading = false;
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

    this.updateBots(dt);

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

    // Check player
    if (bot.team !== this.playerTeam && !this.player.isDead) {
      const dist = bot.position.distanceTo(this.player.position);
      if (dist < nearestDist) {
        nearestDist = dist;
        nearest = { pos: this.player.position.clone(), isPlayer: true };
      }
    }

    // Check other bots
    for (const otherBot of this.bots) {
      if (otherBot === bot || otherBot.isDead || otherBot.team === bot.team) continue;
      const dist = bot.position.distanceTo(otherBot.position);
      if (dist < nearestDist) {
        nearestDist = dist;
        nearest = { pos: otherBot.position.clone(), isPlayer: false, bot: otherBot };
      }
    }

    return nearest;
  }

  private updateBots(dt: number): void {
    const startIndex = this.currentBotUpdateIndex;
    const endIndex = Math.min(startIndex + this.botsPerBatch, this.bots.length);
    
    for (let i = startIndex; i < endIndex; i++) {
      const bot = this.bots[i];
      if (bot.isDead) {
        bot.respawnTimer -= dt;
        if (bot.respawnTimer <= 0) {
          bot.isDead = false;
          bot.hp = bot.maxHp;
          bot.mesh.visible = true;
          const spawnPos = this.getSafeSpawnPos(bot.team);
          bot.position.copy(spawnPos);
          bot.mesh.position.copy(bot.position);
        }
        continue;
      }

      // Find nearest enemy
      const enemyTarget = this.findNearestEnemy(bot);
      const distToEnemy = enemyTarget ? bot.position.distanceTo(enemyTarget.pos) : Infinity;

      // Update behavior state
      bot.behaviorTimer -= dt;
      if (bot.behaviorTimer <= 0) {
        bot.behaviorTimer = 2 + Math.random() * 3;
        
        if (enemyTarget && distToEnemy < 20) {
          // Close range - strafe or engage
          const roll = Math.random();
          if (roll < 0.4) {
            bot.behaviorState = 'strafe';
            bot.strafeDirection = Math.random() > 0.5 ? 1 : -1;
          } else if (roll < 0.7) {
            bot.behaviorState = 'crouch';
            bot.crouchTimer = 1 + Math.random() * 2;
          } else {
            bot.behaviorState = 'engage';
          }
        } else if (enemyTarget && distToEnemy < 40) {
          // Medium range - engage or patrol
          const roll = Math.random();
          if (roll < 0.5 * bot.aggression) {
            bot.behaviorState = 'engage';
          } else {
            bot.behaviorState = 'patrol';
          }
        } else {
          // No enemy - patrol
          bot.behaviorState = 'patrol';
        }
      }

      // Execute behavior
      bot.moveTimer -= dt;
      if (bot.moveTimer <= 0) {
        bot.moveTimer = 2 + Math.random() * 3;
        
        if (bot.behaviorState === 'engage' && enemyTarget) {
          // Move toward enemy
          bot.targetPos.copy(enemyTarget.pos);
        } else if (bot.behaviorState === 'strafe' && enemyTarget) {
          // Strafe around enemy
          const toEnemy = enemyTarget.pos.clone().sub(bot.position);
          const perpX = -toEnemy.z * bot.strafeDirection;
          const perpZ = toEnemy.x * bot.strafeDirection;
          bot.targetPos.set(
            bot.position.x + perpX * 0.8,
            bot.position.y,
            bot.position.z + perpZ * 0.8
          );
        } else {
          // Patrol - random movement
          const angle = Math.random() * Math.PI * 2;
          const dist = 5 + Math.random() * 10;
          bot.targetPos.set(
            bot.position.x + Math.cos(angle) * dist,
            bot.position.y,
            bot.position.z + Math.sin(angle) * dist
          );
        }
      }

      // Move toward target
      const toTarget = bot.targetPos.clone().sub(bot.position);
      toTarget.y = 0;
      if (toTarget.length() > 0.5) {
        toTarget.normalize();
        const speed = bot.isCrouching ? 2 : 4;
        bot.position.x += toTarget.x * speed * dt;
        bot.position.z += toTarget.z * speed * dt;
        
        // Smooth rotation toward target
        const targetYaw = Math.atan2(toTarget.x, toTarget.z);
        const currentYaw = bot.mesh.rotation.y;
        let yawDiff = targetYaw - currentYaw;
        while (yawDiff > Math.PI) yawDiff -= Math.PI * 2;
        while (yawDiff < -Math.PI) yawDiff += Math.PI * 2;
        bot.mesh.rotation.y += yawDiff * Math.min(dt * 10, 1);
      }

      // Update ground height
      const groundY = this.world.getGroundHeight(bot.position.x, bot.position.z);
      bot.position.y = groundY;
      bot.mesh.position.copy(bot.position);

      // Walking animation - legs and arms swing
      const isMoving = toTarget.length() > 0.5;
      if (isMoving) {
        const walkSpeed = bot.isCrouching ? 6 : 10;
        bot.walkCycle += dt * walkSpeed;
        const swing = Math.sin(bot.walkCycle) * 0.5;
        
        // Get leg and arm meshes
        const children = bot.mesh.children;
        const leftLeg = children.find(c => c.position.x < -0.1 && c.position.y < 1);
        const rightLeg = children.find(c => c.position.x > 0.1 && c.position.y < 1);
        const leftArm = children.find(c => c.position.x < -0.3 && c.position.y > 0.8);
        const rightArm = children.find(c => c.position.x > 0.3 && c.position.y > 0.8);
        
        if (leftLeg) leftLeg.rotation.x = swing;
        if (rightLeg) rightLeg.rotation.x = -swing;
        if (leftArm) leftArm.rotation.x = -swing * 0.7;
        if (rightArm) rightArm.rotation.x = swing * 0.7;
        
        // Body bob
        const bob = Math.abs(Math.sin(bot.walkCycle * 2)) * 0.05;
        bot.mesh.position.y += bob;
      } else {
        // Reset animations when not moving
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

      // Head tracking - look at enemy when in combat
      if (enemyTarget && distToEnemy < 35) {
        const head = bot.mesh.children.find(c => c.position.y > 1.7 && c.position.y < 2.0);
        if (head) {
          const toEnemy = enemyTarget.pos.clone().sub(bot.position);
          const headYaw = Math.atan2(toEnemy.x, toEnemy.z) - bot.mesh.rotation.y;
          let normalizedHeadYaw = Math.atan2(Math.sin(headYaw), Math.cos(headYaw));
          const clampedHeadYaw = Math.max(-1.05, Math.min(1.05, normalizedHeadYaw));
          head.rotation.y += (clampedHeadYaw - head.rotation.y) * Math.min(dt * 8, 1);
        }
      }

      // Shooting
      bot.shootTimer -= dt;
      if (bot.shootTimer <= 0 && enemyTarget && distToEnemy < 40) {
        bot.shootTimer = 1 + Math.random() * 2;
        
        // Check line of sight
        const toEnemy = enemyTarget.pos.clone().sub(bot.position);
        const dir = toEnemy.normalize();
        const hit = this.world.raycast(bot.position.clone().add(new THREE.Vector3(0, 1.5, 0)), dir, 40);
        
          if (!hit || hit.distance > 40) {
            // No obstacle - shoot
            if (enemyTarget.isPlayer) {
              // Shoot at player
              const accuracy = 0.3 + bot.skill * 0.3;
              if (Math.random() < accuracy) {
                const damage = 20 + Math.random() * 15;
                this.player.takeDamage(damage);
                this.hitMarkerTimer = 0.2;
                this.sounds.hitMarker();
                
                if (this.player.isDead) {
                  this.redKills++;
                  this.sounds.killSound();
                }
              }
            }
          }      }

      // Update crouch state
      if (bot.behaviorState === 'crouch') {
        bot.crouchTimer -= dt;
        bot.isCrouching = true;
        if (bot.crouchTimer <= 0) {
          bot.isCrouching = false;
          bot.behaviorState = 'patrol';
        }
      } else {
        bot.isCrouching = false;
      }
    }

    this.currentBotUpdateIndex = endIndex >= this.bots.length ? 0 : endIndex;
  }

  handleBuildClick(): void {
    this.tryBuild();
  }

  private emitState(): void {
    if (this.onStateChange) {
      const weapon = this.weapons[this.equipment];
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
        currentAmmo: weapon.currentAmmo,
        magazineSize: weapon.magazineSize,
        isReloading: weapon.isReloading,
        playerCarryingFlag: this.player.carryingFlag,
        flagCarrierName: this.player.carryingFlag ? 'You' : '',
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
