import * as THREE from 'three';

export const VOXEL_AIR = 0;
export const VOXEL_DIRT = 1;
export const VOXEL_STONE = 2;
export const VOXEL_GRASS = 3;
export const VOXEL_BUILT = 4;

export const WORLD_SIZE = 150;
export const GROUND_LEVEL = 8;
export const MAX_BUILD_UP = 20;
export const MAX_DIG_DOWN = 20;
export const VOXEL_SIZE = 1;
export const CHUNK_SIZE = 16;

export interface VoxelData {
  type: number;
  durability: number;
}

interface Chunk {
  mesh: THREE.InstancedMesh | null;
  dirty: boolean;
  minX: number;
  maxX: number;
  minZ: number;
  maxZ: number;
}

export class VoxelWorld {
  voxels: Map<string, VoxelData> = new Map();
  mesh: THREE.Group;
  chunks: Map<string, Chunk> = new Map();
  
  private static sharedGeometry: THREE.BoxGeometry | null = null;

  constructor() {
    console.log('VoxelWorld constructor started');
    this.mesh = new THREE.Group();
    
    if (!VoxelWorld.sharedGeometry) {
      VoxelWorld.sharedGeometry = new THREE.BoxGeometry(VOXEL_SIZE, VOXEL_SIZE, VOXEL_SIZE);
    }
    
    this.generateTerrain();
    console.log('Terrain generated, voxels:', this.voxels.size);
    this.initializeChunks();
    this.rebuildAllChunks();
    console.log('All chunks rebuilt');
  }

  private key(x: number, y: number, z: number): string {
    return `${x},${y},${z}`;
  }

  getVoxel(x: number, y: number, z: number): VoxelData | null {
    return this.voxels.get(this.key(x, y, z)) || null;
  }

  setVoxel(x: number, y: number, z: number, type: number, durability = 3): void {
    const k = this.key(x, y, z);
    if (type === VOXEL_AIR) {
      this.voxels.delete(k);
    } else {
      this.voxels.set(k, { type, durability });
    }
    // Mark chunk dirty
    this.markChunkDirty(x, z);
  }

  isSolid(x: number, y: number, z: number): boolean {
    const v = this.getVoxel(x, y, z);
    return v !== null && v.type !== VOXEL_AIR;
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
          this.setVoxel(x, y, z, type);
        }
      }
    }
  }

  getGroundHeight(x: number, z: number): number {
    const ix = Math.floor(x);
    const iz = Math.floor(z);
    for (let y = GROUND_LEVEL + MAX_BUILD_UP + 5; y >= 0; y--) {
      if (this.isSolid(ix, y, iz)) {
        return y + 0.5;
      }
    }
    return 0;
  }

  getOriginalGroundLevel(): number {
    return GROUND_LEVEL + 0.5;
  }

  canDig(x: number, y: number, z: number): boolean {
    return y >= GROUND_LEVEL - MAX_DIG_DOWN;
  }

  canBuild(x: number, y: number, z: number): boolean {
    return y <= GROUND_LEVEL + MAX_BUILD_UP;
  }

  damageVoxel(x: number, y: number, z: number, damage: number): boolean {
    const v = this.getVoxel(x, y, z);
    if (!v) return false;
    v.durability -= damage;
    if (v.durability <= 0) {
      this.setVoxel(x, y, z, VOXEL_AIR);
      return true;
    }
    // Update color without full rebuild
    this.updateVoxelColor(x, y, z, v.type, v.durability);
    return false;
  }

  findDisconnectedGroups(): Set<string> {
    const toCollapse = new Set<string>();
    const visited = new Set<string>();

    const allPositions = new Set<string>();
    for (const [k, v] of this.voxels) {
      if (v.type !== VOXEL_AIR) allPositions.add(k);
    }

    const queue: string[] = [];
    for (const [k, v] of this.voxels) {
      if (v.type === VOXEL_AIR) continue;
      const parts = k.split(',');
      const y = parseInt(parts[1]);
      if (y === 0) {
        visited.add(k);
        queue.push(k);
      }
    }

    while (queue.length > 0) {
      const current = queue.shift()!;
      const parts = current.split(',');
      const x = parseInt(parts[0]);
      const y = parseInt(parts[1]);
      const z = parseInt(parts[2]);

      const neighbors = [
        [x + 1, y, z], [x - 1, y, z],
        [x, y + 1, z], [x, y - 1, z],
        [x, y, z + 1], [x, y, z - 1],
      ];

      for (const [nx, ny, nz] of neighbors) {
        const nk = this.key(nx, ny, nz);
        if (allPositions.has(nk) && !visited.has(nk)) {
          visited.add(nk);
          queue.push(nk);
        }
      }
    }

    for (const pos of allPositions) {
      if (!visited.has(pos)) {
        toCollapse.add(pos);
      }
    }

    return toCollapse;
  }

  collapseDisconnected(): number {
    const disconnected = this.findDisconnectedGroups();
    for (const k of disconnected) {
      this.voxels.delete(k);
    }
    if (disconnected.size > 0) {
      // Mark all affected chunks dirty
      for (const k of disconnected) {
        const parts = k.split(',');
        const x = parseInt(parts[0]);
        const z = parseInt(parts[2]);
        this.markChunkDirty(x, z);
      }
    }
    return disconnected.size;
  }

  // Chunk management
  private getChunkKey(x: number, z: number): string {
    const chunkX = Math.floor(x / CHUNK_SIZE);
    const chunkZ = Math.floor(z / CHUNK_SIZE);
    return `${chunkX},${chunkZ}`;
  }

  private initializeChunks(): void {
    const half = WORLD_SIZE / 2;
    const minChunkX = Math.floor(-half / CHUNK_SIZE);
    const maxChunkX = Math.floor(half / CHUNK_SIZE);
    const minChunkZ = Math.floor(-half / CHUNK_SIZE);
    const maxChunkZ = Math.floor(half / CHUNK_SIZE);

    for (let cx = minChunkX; cx <= maxChunkX; cx++) {
      for (let cz = minChunkZ; cz <= maxChunkZ; cz++) {
        const key = `${cx},${cz}`;
        this.chunks.set(key, {
          mesh: null,
          dirty: true,
          minX: cx * CHUNK_SIZE,
          maxX: (cx + 1) * CHUNK_SIZE - 1,
          minZ: cz * CHUNK_SIZE,
          maxZ: (cz + 1) * CHUNK_SIZE - 1,
        });
      }
    }
  }

  private markChunkDirty(x: number, z: number): void {
    const key = this.getChunkKey(x, z);
    const chunk = this.chunks.get(key);
    if (chunk) {
      chunk.dirty = true;
    }

    // Also mark neighboring chunks dirty if on edge
    const localX = ((x % CHUNK_SIZE) + CHUNK_SIZE) % CHUNK_SIZE;
    const localZ = ((z % CHUNK_SIZE) + CHUNK_SIZE) % CHUNK_SIZE;

    if (localX === 0) this.markChunkDirtyByCoord(x - 1, z);
    if (localX === CHUNK_SIZE - 1) this.markChunkDirtyByCoord(x + 1, z);
    if (localZ === 0) this.markChunkDirtyByCoord(x, z - 1);
    if (localZ === CHUNK_SIZE - 1) this.markChunkDirtyByCoord(x, z + 1);
  }

  private markChunkDirtyByCoord(x: number, z: number): void {
    const key = this.getChunkKey(x, z);
    const chunk = this.chunks.get(key);
    if (chunk) {
      chunk.dirty = true;
    }
  }

  private getBaseColor(type: number): number {
    const colors: Record<number, number> = {
      [VOXEL_DIRT]: 0x8B6914,
      [VOXEL_STONE]: 0x808080,
      [VOXEL_GRASS]: 0x4a8c3f,
      [VOXEL_BUILT]: 0xc4a35a,
    };
    return colors[type] || 0xffffff;
  }

  private getColorWithDurability(type: number, durability: number): THREE.Color {
    const baseColor = this.getBaseColor(type);
    const factor = durability / 3;
    const r = ((baseColor >> 16) & 0xFF) / 255 * factor;
    const g = ((baseColor >> 8) & 0xFF) / 255 * factor;
    const b = (baseColor & 0xFF) / 255 * factor;
    return new THREE.Color(r, g, b);
  }

  private rebuildChunk(key: string): void {
    const chunk = this.chunks.get(key);
    if (!chunk) return;

    // Remove old mesh
    if (chunk.mesh) {
      this.mesh.remove(chunk.mesh);
      chunk.mesh.dispose();
      chunk.mesh = null;
    }

    // Collect exposed voxels in this chunk
    const positions: { x: number; y: number; z: number; type: number; durability: number }[] = [];

    for (const [k, v] of this.voxels) {
      if (v.type === VOXEL_AIR) continue;
      const parts = k.split(',');
      const x = parseInt(parts[0]);
      const y = parseInt(parts[1]);
      const z = parseInt(parts[2]);

      // Check if voxel is in this chunk
      if (x < chunk.minX || x > chunk.maxX || z < chunk.minZ || z > chunk.maxZ) continue;

      const exposed = !this.isSolid(x + 1, y, z) || !this.isSolid(x - 1, y, z) ||
        !this.isSolid(x, y + 1, z) || !this.isSolid(x, y - 1, z) ||
        !this.isSolid(x, y, z + 1) || !this.isSolid(x, y, z - 1);

      if (!exposed) continue;

      positions.push({ x, y, z, type: v.type, durability: v.durability });
    }

    if (positions.length === 0) return;

    // Create InstancedMesh for this chunk
    const mesh = new THREE.InstancedMesh(
      VoxelWorld.sharedGeometry!,
      new THREE.MeshLambertMaterial({ vertexColors: false }),
      positions.length
    );

    const matrix = new THREE.Matrix4();
    const color = new THREE.Color();

    for (let i = 0; i < positions.length; i++) {
      const p = positions[i];
      matrix.setPosition(p.x, p.y, p.z);
      mesh.setMatrixAt(i, matrix);

      color.copy(this.getColorWithDurability(p.type, p.durability));
      mesh.setColorAt(i, color);
    }

    mesh.instanceMatrix.needsUpdate = true;
    if (mesh.instanceColor) {
      mesh.instanceColor.needsUpdate = true;
    }
    mesh.castShadow = false;
    mesh.receiveShadow = true;

    chunk.mesh = mesh;
    this.mesh.add(mesh);
  }

  private rebuildAllChunks(): void {
    for (const [key, chunk] of this.chunks) {
      this.rebuildChunk(key);
      chunk.dirty = false;
    }
  }

  updateVoxelColor(x: number, y: number, z: number, type: number, durability: number): void {
    const key = this.getChunkKey(x, z);
    const chunk = this.chunks.get(key);
    if (!chunk || !chunk.mesh) return;

    // Find the voxel index in this chunk's mesh
    // This is expensive, so we'll just mark the chunk dirty instead
    chunk.dirty = true;
  }

  // Call once per frame to handle deferred rebuilds
  update(): void {
    // Only rebuild dirty chunks (max 2 per frame to spread load)
    let rebuilt = 0;
    for (const [key, chunk] of this.chunks) {
      if (chunk.dirty && rebuilt < 2) {
        this.rebuildChunk(key);
        chunk.dirty = false;
        rebuilt++;
      }
    }
  }

  raycast(origin: THREE.Vector3, direction: THREE.Vector3, maxDist: number): {
    hit: boolean;
    position: THREE.Vector3;
    normal: THREE.Vector3;
    voxelPos: { x: number; y: number; z: number };
    distance: number;
  } | null {
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

    let normal = new THREE.Vector3();
    let dist = 0;

    for (let i = 0; i < maxDist * 3; i++) {
      if (this.isSolid(voxelX, voxelY, voxelZ)) {
        return {
          hit: true,
          position: new THREE.Vector3(voxelX, voxelY, voxelZ),
          normal: normal.clone(),
          voxelPos: { x: voxelX, y: voxelY, z: voxelZ },
          distance: dist,
        };
      }

      if (tMaxX < tMaxY) {
        if (tMaxX < tMaxZ) {
          voxelX += stepX;
          dist = tMaxX;
          tMaxX += tDeltaX;
          normal.set(-stepX, 0, 0);
        } else {
          voxelZ += stepZ;
          dist = tMaxZ;
          tMaxZ += tDeltaZ;
          normal.set(0, 0, -stepZ);
        }
      } else {
        if (tMaxY < tMaxZ) {
          voxelY += stepY;
          dist = tMaxY;
          tMaxY += tDeltaY;
          normal.set(0, -stepY, 0);
        } else {
          voxelZ += stepZ;
          dist = tMaxZ;
          tMaxZ += tDeltaZ;
          normal.set(0, 0, -stepZ);
        }
      }

      if (dist > maxDist) break;
    }

    return null;
  }
}
