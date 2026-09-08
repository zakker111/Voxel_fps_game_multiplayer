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

export interface VoxelData {
  type: number;
  durability: number;
}

export class VoxelWorld {
  voxels: Map<string, VoxelData> = new Map();
  mesh: THREE.Group;

  constructor() {
    this.mesh = new THREE.Group();
    this.generateTerrain();
    this.rebuildMesh();
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
      this.rebuildMesh();
    }
    return disconnected.size;
  }

  // Performance: Single InstancedMesh with per-instance colors
  private instancedMesh: THREE.InstancedMesh | null = null;
  private voxelIndexMap: Map<string, number> = new Map();
  private static sharedGeometry: THREE.BoxGeometry | null = null;
  private static sharedMaterial: THREE.MeshLambertMaterial | null = null;
  private needsRebuild: boolean = false;
  
  // Mark mesh as needing rebuild (deferred to next frame)
  markDirty(): void {
    this.needsRebuild = true;
  }
  
  // Call once per frame to handle deferred rebuilds
  update(): void {
    if (this.needsRebuild) {
      this.needsRebuild = false;
      this.rebuildMesh();
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

  rebuildMesh(): void {
    // Clean up old mesh
    if (this.instancedMesh) {
      this.mesh.remove(this.instancedMesh);
      this.instancedMesh.dispose();
      this.instancedMesh = null;
    }
    this.voxelIndexMap.clear();

    // Collect exposed voxels
    const positions: { x: number; y: number; z: number; type: number; durability: number }[] = [];
    
    for (const [k, v] of this.voxels) {
      if (v.type === VOXEL_AIR) continue;
      const parts = k.split(',');
      const x = parseInt(parts[0]);
      const y = parseInt(parts[1]);
      const z = parseInt(parts[2]);

      const exposed = !this.isSolid(x + 1, y, z) || !this.isSolid(x - 1, y, z) ||
        !this.isSolid(x, y + 1, z) || !this.isSolid(x, y - 1, z) ||
        !this.isSolid(x, y, z + 1) || !this.isSolid(x, y, z - 1);

      if (!exposed) continue;
      
      positions.push({ x, y, z, type: v.type, durability: v.durability });
    }

    if (positions.length === 0) return;

    // Create shared geometry/material (reuse across rebuilds)
    if (!VoxelWorld.sharedGeometry) {
      VoxelWorld.sharedGeometry = new THREE.BoxGeometry(VOXEL_SIZE, VOXEL_SIZE, VOXEL_SIZE);
    }
    if (!VoxelWorld.sharedMaterial) {
      VoxelWorld.sharedMaterial = new THREE.MeshLambertMaterial({ vertexColors: false });
    }

    // Create single InstancedMesh with per-instance colors
    this.instancedMesh = new THREE.InstancedMesh(
      VoxelWorld.sharedGeometry,
      VoxelWorld.sharedMaterial,
      positions.length
    );

    const matrix = new THREE.Matrix4();
    const color = new THREE.Color();

    for (let i = 0; i < positions.length; i++) {
      const p = positions[i];
      matrix.setPosition(p.x, p.y, p.z);
      this.instancedMesh.setMatrixAt(i, matrix);
      
      // Set per-instance color based on type and durability
      color.copy(this.getColorWithDurability(p.type, p.durability));
      this.instancedMesh.setColorAt(i, color);
      
      // Track index for fast updates
      this.voxelIndexMap.set(this.key(p.x, p.y, p.z), i);
    }

    this.instancedMesh.instanceMatrix.needsUpdate = true;
    if (this.instancedMesh.instanceColor) {
      this.instancedMesh.instanceColor.needsUpdate = true;
    }
    this.instancedMesh.castShadow = false; // Disabled for performance
    this.instancedMesh.receiveShadow = true;
    this.mesh.add(this.instancedMesh);
  }
  
  // Fast color update for damaged voxels (no full rebuild!)
  updateVoxelColor(x: number, y: number, z: number, type: number, durability: number): void {
    if (!this.instancedMesh) return;
    const key = this.key(x, y, z);
    const index = this.voxelIndexMap.get(key);
    if (index === undefined) return;
    
    const color = this.getColorWithDurability(type, durability);
    this.instancedMesh.setColorAt(index, color);
    if (this.instancedMesh.instanceColor) {
      this.instancedMesh.instanceColor.needsUpdate = true;
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
