import { WebSocket } from 'ws';
import { ServerPlayer } from './serverPlayer';
import { ServerWorld } from './serverWorld';
import {
  ClientMessage,
  ServerMessage,
  PlayerState,
  Position,
  WEAPONS,
  TOOLS,
  VOXEL_AIR,
} from '../shared/types';

export class ServerGame {
  private players: Map<string, ServerPlayer> = new Map();
  private world: ServerWorld;
  private connections: Map<string, WebSocket> = new Map();
  private scores = { red: 0, blue: 0 };
  private lastShootTime: Map<string, number> = new Map();
  private lastToolTime: Map<string, number> = new Map();
  private inventories: Map<string, number> = new Map();

  constructor() {
    this.world = new ServerWorld();
    console.log('Server game initialized');
  }

  addPlayer(ws: WebSocket): string {
    const playerId = `player_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
    const spawnPos = this.getSpawnPosition('blue'); // Default to blue
    
    const player = new ServerPlayer(playerId, spawnPos, 'blue');
    this.players.set(playerId, player);
    this.connections.set(playerId, ws);
    this.inventories.set(playerId, 0);
    
    // Send initial state to the new player
    this.sendToPlayer(playerId, {
      type: 'playerJoined',
      playerId,
      state: player.getState(),
    });
    
    // Notify other players
    this.broadcastExcept(playerId, {
      type: 'playerJoined',
      playerId,
      state: player.getState(),
    });
    
    console.log(`Player ${playerId} joined (total: ${this.players.size})`);
    return playerId;
  }

  removePlayer(playerId: string): void {
    this.players.delete(playerId);
    this.connections.delete(playerId);
    this.inventories.delete(playerId);
    this.lastShootTime.delete(playerId);
    this.lastToolTime.delete(playerId);
    
    this.broadcast({
      type: 'playerLeft',
      playerId,
    });
    
    console.log(`Player ${playerId} left (total: ${this.players.size})`);
  }

  handleMessage(playerId: string, message: ClientMessage): void {
    const player = this.players.get(playerId);
    if (!player) return;

    switch (message.type) {
      case 'join':
        // Handle team selection
        const spawnPos = this.getSpawnPosition(message.team);
        player.position = spawnPos;
        player.team = message.team;
        this.broadcast({
          type: 'playerUpdated',
          playerId,
          state: player.getState(),
        });
        break;

      case 'playerInput':
        player.applyInput(message.input);
        break;

      case 'shoot':
        this.handleShoot(playerId, message.origin, message.direction);
        break;

      case 'useTool':
        this.handleUseTool(playerId, message.tool, message.target);
        break;

      case 'build':
        this.handleBuild(playerId, message.position);
        break;

      case 'disconnect':
        this.removePlayer(playerId);
        break;
    }
  }

  private handleShoot(playerId: string, origin: Position, direction: Position): void {
    const player = this.players.get(playerId);
    if (!player || player.isDead) return;

    const now = Date.now() / 1000;
    const weapon = WEAPONS[player.equipment as 'rifle' | 'smg'];
    if (!weapon) return;

    const lastTime = this.lastShootTime.get(playerId) || 0;
    if (now - lastTime < weapon.fireRate) return;
    
    this.lastShootTime.set(playerId, now);
    
    // Set shooting state for sound effects
    player.isShooting = true;
    setTimeout(() => {
      player.isShooting = false;
    }, 100); // Reset after 100ms

    // Raycast to find hit
    const hit = this.world.raycast(origin, direction, 100);
    if (!hit) return;

    // Check if hit a player
    for (const [targetId, target] of this.players) {
      if (targetId === playerId || target.isDead) continue;
      if (target.team === player.team) continue; // No friendly fire

      const distance = this.distanceToRay(target.position, origin, direction);
      if (distance < 0.5) {
        // Hit player
        const isHeadshot = hit.distance < 2 && Math.random() < 0.2;
        const damage = isHeadshot ? weapon.damage.head : weapon.damage.body;
        
        target.takeDamage(damage);
        
        // Notify attacker
        this.sendToPlayer(playerId, {
          type: 'hitConfirmed',
          targetId,
          damage,
          isHeadshot,
        });
        
        // Notify target
        this.sendToPlayer(targetId, {
          type: 'playerDamaged',
          playerId: targetId,
          damage,
          attackerId: playerId,
        });
        
        if (target.isDead) {
          if (player.team === 'red') {
            this.scores.red++;
          } else {
            this.scores.blue++;
          }
          this.broadcast({
            type: 'playerDied',
            playerId: targetId,
            killerId: playerId,
          });
          
          // Respawn after delay
          setTimeout(() => {
            const spawnPos = this.getSpawnPosition(target.team);
            target.respawn(spawnPos);
            this.broadcast({
              type: 'playerRespawned',
              playerId: targetId,
              position: spawnPos,
            });
          }, 6000);
        }
        
        return;
      }
    }

    // Hit voxel
    if (hit.voxelPos) {
      const { x, y, z } = hit.voxelPos;
      const destroyed = this.world.damageVoxel(x, y, z, 1);
      
      if (destroyed) {
        const voxel = this.world.getVoxel(x, y, z);
        this.broadcast({
          type: 'voxelChanged',
          change: {
            x,
            y,
            z,
            type: voxel ? voxel.type : VOXEL_AIR,
            durability: voxel ? voxel.durability : 0,
          },
        });
        
        // Check for collapse
        const collapsed = this.world.collapseDisconnected();
        for (const change of collapsed) {
          this.broadcast({
            type: 'voxelChanged',
            change,
          });
        }
      } else {
        const voxel = this.world.getVoxel(x, y, z);
        if (voxel) {
          this.broadcast({
            type: 'voxelChanged',
            change: {
              x,
              y,
              z,
              type: voxel.type,
              durability: voxel.durability,
            },
          });
        }
      }
    }
  }

  private handleUseTool(playerId: string, tool: 'pickaxe' | 'spade', target: Position): void {
    const player = this.players.get(playerId);
    if (!player || player.isDead) return;

    const now = Date.now() / 1000;
    const toolData = TOOLS[tool];
    
    const lastTime = this.lastToolTime.get(playerId) || 0;
    if (now - lastTime < toolData.cooldown) return;
    
    this.lastToolTime.set(playerId, now);

    const { x, y, z } = target;
    const destroyed = this.world.damageVoxel(x, y, z, toolData.damage);
    
    if (destroyed) {
      if (toolData.harvests) {
        const inventory = (this.inventories.get(playerId) || 0) + 1;
        this.inventories.set(playerId, inventory);
        this.sendToPlayer(playerId, {
          type: 'inventoryUpdated',
          inventory,
        });
      }
      
      const voxel = this.world.getVoxel(x, y, z);
      this.broadcast({
        type: 'voxelChanged',
        change: {
          x,
          y,
          z,
          type: voxel ? voxel.type : VOXEL_AIR,
          durability: voxel ? voxel.durability : 0,
        },
      });
      
      // Check for collapse
      const collapsed = this.world.collapseDisconnected();
      for (const change of collapsed) {
        this.broadcast({
          type: 'voxelChanged',
          change,
        });
      }
    } else {
      const voxel = this.world.getVoxel(x, y, z);
      if (voxel) {
        this.broadcast({
          type: 'voxelChanged',
          change: {
            x,
            y,
            z,
            type: voxel.type,
            durability: voxel.durability,
          },
        });
      }
    }
  }

  private handleBuild(playerId: string, position: Position): void {
    const player = this.players.get(playerId);
    if (!player || player.isDead) return;

    const inventory = this.inventories.get(playerId) || 0;
    if (inventory <= 0) return;

    const { x, y, z } = position;
    
    if (this.world.canBuild(x, y, z)) {
      this.world.setVoxel(x, y, z, 4, 3); // VOXEL_BUILT
      this.inventories.set(playerId, inventory - 1);
      
      this.sendToPlayer(playerId, {
        type: 'inventoryUpdated',
        inventory: inventory - 1,
      });
      
      this.broadcast({
        type: 'voxelChanged',
        change: {
          x,
          y,
          z,
          type: 4,
          durability: 3,
        },
      });
    }
  }

  update(dt: number): void {
    // Update all players
    for (const player of this.players.values()) {
      player.update(dt, this.world);
    }
  }

  broadcastState(): void {
    // Send individual player updates instead of full state
    for (const [playerId, player] of this.players) {
      this.broadcastExcept(playerId, {
        type: 'playerUpdated',
        playerId,
        state: player.getState(),
      });
    }
  }

  private getSpawnPosition(team: 'red' | 'blue'): Position {
    const half = 75;
    const zOffset = team === 'blue' ? -half + 10 : half - 10;
    const x = (Math.random() - 0.5) * 20;
    const z = zOffset + (Math.random() - 0.5) * 10;
    const y = this.world.getGroundHeight(x, z) + 1;
    return { x, y, z };
  }

  private distanceToRay(point: Position, rayOrigin: Position, rayDir: Position): number {
    const toPoint = {
      x: point.x - rayOrigin.x,
      y: point.y - rayOrigin.y,
      z: point.z - rayOrigin.z,
    };
    
    const dot = toPoint.x * rayDir.x + toPoint.y * rayDir.y + toPoint.z * rayDir.z;
    
    if (dot < 0) return Infinity;
    
    const closest = {
      x: rayOrigin.x + rayDir.x * dot,
      y: rayOrigin.y + rayDir.y * dot,
      z: rayOrigin.z + rayDir.z * dot,
    };
    
    const dx = point.x - closest.x;
    const dy = point.y - closest.y;
    const dz = point.z - closest.z;
    
    return Math.sqrt(dx * dx + dy * dy + dz * dz);
  }

  private sendToPlayer(playerId: string, message: ServerMessage): void {
    const ws = this.connections.get(playerId);
    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(message));
    }
  }

  private broadcast(message: ServerMessage): void {
    const data = JSON.stringify(message);
    for (const ws of this.connections.values()) {
      if (ws.readyState === WebSocket.OPEN) {
        ws.send(data);
      }
    }
  }

  private broadcastExcept(exceptPlayerId: string, message: ServerMessage): void {
    const data = JSON.stringify(message);
    for (const [playerId, ws] of this.connections) {
      if (playerId !== exceptPlayerId && ws.readyState === WebSocket.OPEN) {
        ws.send(data);
      }
    }
  }
}
