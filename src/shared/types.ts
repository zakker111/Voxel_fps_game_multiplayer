// Shared types for client-server communication

export interface Position {
  x: number;
  y: number;
  z: number;
}

export interface Rotation {
  yaw: number;
  pitch: number;
}

export interface PlayerState {
  id: string;
  position: Position;
  rotation: Rotation;
  velocity: Position;
  hp: number;
  team: 'red' | 'blue';
  isDead: boolean;
  equipment: 'rifle' | 'smg' | 'pickaxe' | 'spade';
  isAiming: boolean;
  isCrouching: boolean;
  isSprinting: boolean;
  isShooting?: boolean;
}

export interface VoxelChange {
  x: number;
  y: number;
  z: number;
  type: number;
  durability: number;
}

export interface ChunkData {
  chunkX: number;
  chunkZ: number;
  voxels: VoxelChange[];
}

// Client -> Server messages
export type ClientMessage =
  | { type: 'join'; team: 'red' | 'blue' }
  | { type: 'playerInput'; input: PlayerInput }
  | { type: 'shoot'; origin: Position; direction: Position }
  | { type: 'useTool'; tool: 'pickaxe' | 'spade'; target: Position }
  | { type: 'build'; position: Position }
  | { type: 'disconnect' };

export interface PlayerInput {
  moveX: number;
  moveZ: number;
  jump: boolean;
  crouch: boolean;
  sprint: boolean;
  yaw: number;
  pitch: number;
}

// Server -> Client messages
export type ServerMessage =
  | { type: 'gameState'; state: GameState }
  | { type: 'playerJoined'; playerId: string; state: PlayerState }
  | { type: 'playerLeft'; playerId: string }
  | { type: 'playerUpdated'; playerId: string; state: PlayerState }
  | { type: 'voxelChanged'; change: VoxelChange }
  | { type: 'chunkUpdated'; chunk: ChunkData }
  | { type: 'playerDamaged'; playerId: string; damage: number; attackerId?: string }
  | { type: 'playerDied'; playerId: string; killerId?: string }
  | { type: 'playerRespawned'; playerId: string; position: Position }
  | { type: 'hitConfirmed'; targetId: string; damage: number; isHeadshot: boolean }
  | { type: 'inventoryUpdated'; inventory: number };

export interface GameState {
  players: Map<string, PlayerState>;
  scores: { red: number; blue: number };
  serverTime: number;
}

// Constants (shared between client and server)
export const WORLD_SIZE = 150;
export const CHUNK_SIZE = 16;
export const GROUND_LEVEL = 8;
export const MAX_BUILD_UP = 20;
export const MAX_DIG_DOWN = 20;
export const VOXEL_SIZE = 1;

export const VOXEL_AIR = 0;
export const VOXEL_DIRT = 1;
export const VOXEL_STONE = 2;
export const VOXEL_GRASS = 3;
export const VOXEL_BUILT = 4;

export const PLAYER_SPEED = 5;
export const SPRINT_MULTIPLIER = 1.6;
export const CROUCH_MULTIPLIER = 0.5;
export const JUMP_FORCE = 8;
export const GRAVITY = 20;
export const PLAYER_HEIGHT = 1.7;
export const CROUCH_HEIGHT = 1.2;
export const PLAYER_RADIUS = 0.3;

export const WEAPONS = {
  rifle: { fireRate: 0.4, damage: { head: 100, body: 34 }, spread: 0.01 },
  smg: { fireRate: 0.1, damage: { head: 100, body: 34 }, spread: 0.04 },
};

export const TOOLS = {
  pickaxe: { damage: 1, cooldown: 0.5, harvests: true },
  spade: { damage: 3, cooldown: 0.3, harvests: false, affectsMultiple: true },
};
