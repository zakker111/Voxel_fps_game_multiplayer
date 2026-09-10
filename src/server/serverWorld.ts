import {
  WORLD_SIZE,
  CHUNK_SIZE,
  GROUND_LEVEL,
  MAX_BUILD_UP,
  MAX_DIG_DOWN,
  VOXEL_AIR,
  VOXEL_DIRT,
  VOXEL_STONE,
  VOXEL_GRASS,
  VOXEL_BUILT,
  Position,
  VoxelChange,
} from '../shared/types';

interface VoxelData {
  type: number;
  durability: number;
}

interface Chunk {
  voxels: Map<string, VoxelData>;
  dirty: boolean;
}

export class ServerWorld {
  private chunks: Map<string, Chunk> = new Map();

  constructor() {
    this.generateTerrain();
    console.log('Server world initialized');
  }

  private getChunkKey(chunkX: number, chunkZ: number): string {
    return `${chunkX},${chunkZ}`;
  }

  private getVoxelKey(x: number, y: number, z: number): string {
    return `${x},${y},${z}`;
  }

  private getChunkCoords(x: number, z: number): { chunkX: number; chunkZ: number } {
    return {
      chunkX: Math.floor(x / CHUNK_SIZE),
      chunkZ: Math.floor(z / CHUNK_SIZE),
    };
  }

  private getOrCreateChunk(chunkX: number, chunkZ: number): Chunk {
    const key = this.getChunkKey(chunkX, chunkZ);
    let chunk = this.chunks.get(key);
    if (!chunk) {
      chunk = { voxels: new Map(), dirty: true };
      this.chunks.set(key, chunk);
    }
    return chunk;
  }

  private generateTerrain(): void {
    const half = WORLD_SIZE / 2;
    
    for (let x = -half; x < half; x++) {
      for (let z = -half; z < half; z++) {
        const height = GROUND_LEVEL + Math.floor(Math.sin(x * 0.1) * Math.cos(z * 0.1) * 2);
        
        for (let y = 0; y <= height; y++) {
          let type = VOXEL_DIRT;
          if (y === height) type = VOXEL_GRASS;
          else if (y < height - 2) type = VOXEL_STONE;
          
          this.setVoxel(x, y, z, type, 3);
        }
      }
    }
    
    console.log('Terrain generated');
  }

  getVoxel(x: number, y: number, z: number): VoxelData | null {
    const { chunkX, chunkZ } = this.getChunkCoords(x, z);
    const chunk = this.chunks.get(this.getChunkKey(chunkX, chunkZ));
    if (!chunk) return null;
    
    return chunk.voxels.get(this.getVoxelKey(x, y, z)) || null;
  }

  setVoxel(x: number, y: number, z: number, type: number, durability: number = 3): void {
    const { chunkX, chunkZ } = this.getChunkCoords(x, z);
    const chunk = this.getOrCreateChunk(chunkX, chunkZ);
    
    if (type === VOXEL_AIR) {
      chunk.voxels.delete(this.getVoxelKey(x, y, z));
    } else {
      chunk.voxels.set(this.getVoxelKey(x, y, z), { type, durability });
    }
    
    chunk.dirty = true;
    
    // Mark neighboring chunks dirty if on edge
    const localX = x - chunkX * CHUNK_SIZE;
    const localZ = z - chunkZ * CHUNK_SIZE;
    
    if (localX === 0) this.markChunkDirty(chunkX - 1, chunkZ);
    if (localX === CHUNK_SIZE - 1) this.markChunkDirty(chunkX + 1, chunkZ);
    if (localZ === 0) this.markChunkDirty(chunkX, chunkZ - 1);
    if (localZ === CHUNK_SIZE - 1) this.markChunkDirty(chunkX, chunkZ + 1);
  }

  private markChunkDirty(chunkX: number, chunkZ: number): void {
    const chunk = this.chunks.get(this.getChunkKey(chunkX, chunkZ));
    if (chunk) {
      chunk.dirty = true;
    }
  }

  isSolid(x: number, y: number, z: number): boolean {
    const voxel = this.getVoxel(x, y, z);
    return voxel !== null && voxel.type !== VOXEL_AIR;
  }

  getGroundHeight(x: number, z: number): number {
    const ix = Math.floor(x);
    const iz = Math.floor(z);
    
    for (let y = GROUND_LEVEL + MAX_BUILD_UP; y >= 0; y--) {
      if (this.isSolid(ix, y, iz)) {
        return y + 1;
      }
    }
    
    return 0;
  }

  canDig(x: number, y: number, z: number): boolean {
    return y >= GROUND_LEVEL - MAX_DIG_DOWN;
  }

  canBuild(x: number, y: number, z: number): boolean {
    return y <= GROUND_LEVEL + MAX_BUILD_UP && !this.isSolid(x, y, z);
  }

  damageVoxel(x: number, y: number, z: number, damage: number): boolean {
    const voxel = this.getVoxel(x, y, z);
    if (!voxel) return false;
    
    voxel.durability -= damage;
    
    if (voxel.durability <= 0) {
      this.setVoxel(x, y, z, VOXEL_AIR, 0);
      return true;
    }
    
    return false;
  }

  raycast(origin: Position, direction: Position, maxDist: number): { voxelPos: Position; distance: number } | null {
    const EPSILON = 1e-8;
    const dx = Math.abs(direction.x) < EPSILON ? (direction.x >= 0 ? EPSILON : -EPSILON) : direction.x;
    const dy = Math.abs(direction.y) < EPSILON ? (direction.y >= 0 ? EPSILON : -EPSILON) : direction.y;
    const dz = Math.abs(direction.z) < EPSILON ? (direction.z >= 0 ? EPSILON : -EPSILON) : direction.z;

    const stepX = dx > 0 ? 1 : -1;
    const stepY = dy > 0 ? 1 : -1;
    const stepZ = dz > 0 ? 1 : -1;

    let voxelX = Math.floor(origin.x);
    let voxelY = Math.floor(origin.y);
    let voxelZ = Math.floor(origin.z);

    const tDeltaX = Math.abs(1 / dx);
    const tDeltaY = Math.abs(1 / dy);
    const tDeltaZ = Math.abs(1 / dz);

    let tMaxX = dx > 0 ? (voxelX + 1 - origin.x) * tDeltaX : (origin.x - voxelX) * tDeltaX;
    let tMaxY = dy > 0 ? (voxelY + 1 - origin.y) * tDeltaY : (origin.y - voxelY) * tDeltaY;
    let tMaxZ = dz > 0 ? (voxelZ + 1 - origin.z) * tDeltaZ : (origin.z - voxelZ) * tDeltaZ;

    let distance = 0;

    for (let i = 0; i < maxDist * 3; i++) {
      if (this.isSolid(voxelX, voxelY, voxelZ)) {
        return {
          voxelPos: { x: voxelX, y: voxelY, z: voxelZ },
          distance,
        };
      }

      if (tMaxX < tMaxY) {
        if (tMaxX < tMaxZ) {
          voxelX += stepX;
          distance = tMaxX;
          tMaxX += tDeltaX;
        } else {
          voxelZ += stepZ;
          distance = tMaxZ;
          tMaxZ += tDeltaZ;
        }
      } else {
        if (tMaxY < tMaxZ) {
          voxelY += stepY;
          distance = tMaxY;
          tMaxY += tDeltaY;
        } else {
          voxelZ += stepZ;
          distance = tMaxZ;
          tMaxZ += tDeltaZ;
        }
      }

      if (distance > maxDist) break;
    }

    return null;
  }

  collapseDisconnected(): VoxelChange[] {
    const changes: VoxelChange[] = [];
    const visited = new Set<string>();
    const queue: string[] = [];

    // Find all voxels connected to ground (y=0)
    for (const [chunkKey, chunk] of this.chunks) {
      for (const [voxelKey, voxel] of chunk.voxels) {
        const [x, y, z] = voxelKey.split(',').map(Number);
        
        if (y === 0 && voxel.type !== VOXEL_AIR) {
          visited.add(voxelKey);
          queue.push(voxelKey);
        }
      }
    }

    // BFS to find all connected voxels
    while (queue.length > 0) {
      const key = queue.shift()!;
      const [x, y, z] = key.split(',').map(Number);

      const neighbors = [
        [x + 1, y, z], [x - 1, y, z],
        [x, y + 1, z], [x, y - 1, z],
        [x, y, z + 1], [x, y, z - 1],
      ];

      for (const [nx, ny, nz] of neighbors) {
        const neighborKey = this.getVoxelKey(nx, ny, nz);
        if (!visited.has(neighborKey) && this.isSolid(nx, ny, nz)) {
          visited.add(neighborKey);
          queue.push(neighborKey);
        }
      }
    }

    // Remove all voxels not connected to ground
    for (const [chunkKey, chunk] of this.chunks) {
      for (const [voxelKey, voxel] of chunk.voxels) {
        if (!visited.has(voxelKey) && voxel.type !== VOXEL_AIR) {
          const [x, y, z] = voxelKey.split(',').map(Number);
          changes.push({
            x,
            y,
            z,
            type: VOXEL_AIR,
            durability: 0,
          });
          chunk.voxels.delete(voxelKey);
          chunk.dirty = true;
        }
      }
    }

    return changes;
  }

  getDirtyChunks(): { chunkX: number; chunkZ: number; voxels: VoxelChange[] }[] {
    const dirtyChunks: { chunkX: number; chunkZ: number; voxels: VoxelChange[] }[] = [];

    for (const [key, chunk] of this.chunks) {
      if (chunk.dirty) {
        const [chunkX, chunkZ] = key.split(',').map(Number);
        const voxels: VoxelChange[] = [];

        for (const [voxelKey, voxel] of chunk.voxels) {
          const [x, y, z] = voxelKey.split(',').map(Number);
          voxels.push({
            x,
            y,
            z,
            type: voxel.type,
            durability: voxel.durability,
          });
        }

        dirtyChunks.push({ chunkX, chunkZ, voxels });
        chunk.dirty = false;
      }
    }

    return dirtyChunks;
  }
}
