import { useEffect, useRef, useState } from 'react';
import { Game, GameState } from './game/game';

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameRef = useRef<Game | null>(null);
  const [gameState, setGameState] = useState<GameState>({
    hp: 100, maxHp: 100, equipment: 'rifle', inventory: 0,
    isDead: false, respawnTimer: 0, hitMarker: false, targetInfo: '',
    message: '', messageTimer: 0, buildMode: false, buildValid: true,
    blueKills: 0, redKills: 0, blueCaptures: 0, redCaptures: 0, isAiming: false,
    currentAmmo: 10, magazineSize: 10, isReloading: false,
    playerCarryingFlag: false, flagCarrierName: '',
    isSpectating: false,
  });
  const [started, setStarted] = useState(false);
  const [gameMode, setGameMode] = useState<'multiplayer' | 'singleplayer' | 'online' | null>(null);
  const [selectedTeam, setSelectedTeam] = useState<'red' | 'blue'>('blue');
  const [isPointerLocked, setIsPointerLocked] = useState(false);

  useEffect(() => {
    const handleLockChange = () => {
      setIsPointerLocked(!!document.pointerLockElement);
    };
    document.addEventListener('pointerlockchange', handleLockChange);
    return () => document.removeEventListener('pointerlockchange', handleLockChange);
  }, []);

  useEffect(() => {
    if (!canvasRef.current || gameRef.current || !gameMode) return;
    
    const canvas = canvasRef.current;
    console.log('Creating game with mode:', gameMode, 'team:', selectedTeam, 'canvas size:', canvas.width, canvas.height);
    
    // Ensure canvas has dimensions
    if (canvas.width === 0 || canvas.height === 0) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    
    // Create game after a small delay to ensure canvas is ready
    setTimeout(() => {
      if (!canvasRef.current || gameRef.current) return;
      
      const game = new Game(canvasRef.current, gameMode, selectedTeam);
      game.onStateChange = (state) => setGameState(state);
      
      game.start();
      gameRef.current = game;
      console.log('Game created and started with mode:', gameMode, 'team:', selectedTeam);
      
      // Auto-start when game is created
      game.requestPointerLock(canvasRef.current);
      setStarted(true);
    }, 100);
    
    return () => { 
      console.log('Cleaning up game');
      if (gameRef.current) {
        gameRef.current.destroy(); 
        gameRef.current = null;
      }
    };
  }, [gameMode, selectedTeam]);

  const handleStart = (mode: 'multiplayer' | 'singleplayer' | 'online', team: 'red' | 'blue' = 'blue') => {
    setSelectedTeam(team);
    setGameMode(mode);
  };

  const handleCanvasClick = () => {
    if (canvasRef.current && gameRef.current && !document.pointerLockElement) {
      gameRef.current.requestPointerLock(canvasRef.current);
    }
  };

  const handleRightClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (gameRef.current) gameRef.current.handleBuildClick();
  };

  const equipmentNames: Record<string, string> = {
    rifle: '🎯 Rifle', smg: '💨 SMG', spade: '🪣 Spade', pickaxe: '⛏️ Pickaxe',
  };
  const equipmentKeys: Record<string, string> = {
    rifle: '1', smg: '2', spade: '3', pickaxe: '4',
  };

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-black">
      <canvas ref={canvasRef} className="w-full h-full block" onClick={handleCanvasClick} onContextMenu={handleRightClick} />

      {!started && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-50">
          <div className="text-center max-w-3xl px-4">
            <h1 className="text-5xl font-bold text-white mb-3">🎮 Voxel FPS</h1>
            <p className="text-lg text-gray-300 mb-1">Red vs Blue — Capture the Flag</p>
            <p className="text-sm text-gray-400 mb-6">You are <span className="text-blue-400 font-bold">BLUE</span> team. Push to the <span className="text-red-400 font-bold">RED</span> flag!</p>
            <div className="flex flex-wrap gap-3 justify-center mb-6">
              <button onClick={() => handleStart('multiplayer', 'blue')} className="px-6 py-3.5 bg-[#00ff88] text-black font-bold text-lg rounded-xl hover:bg-[#00cc66] transition-colors shadow-lg cursor-pointer">
                🤖 Play vs Bots
              </button>
              <button onClick={() => handleStart('online', 'blue')} className="px-6 py-3.5 bg-blue-600 text-white font-bold text-lg rounded-xl hover:bg-blue-500 transition-colors shadow-lg cursor-pointer flex items-center gap-2">
                <span>🌐</span> Join Online (Blue Team)
              </button>
              <button onClick={() => handleStart('online', 'red')} className="px-6 py-3.5 bg-red-600 text-white font-bold text-lg rounded-xl hover:bg-red-500 transition-colors shadow-lg cursor-pointer flex items-center gap-2">
                <span>🌐</span> Join Online (Red Team)
              </button>
              <button onClick={() => { handleStart('multiplayer'); setTimeout(() => gameRef.current?.toggleSpectator(), 300); }} className="px-6 py-3.5 bg-indigo-600 text-white font-bold text-lg rounded-xl hover:bg-indigo-500 transition-colors shadow-lg cursor-pointer flex items-center gap-2">
                <span>🎥</span> AI Spectator
              </button>
              <button onClick={() => handleStart('singleplayer')} className="px-5 py-3.5 bg-gray-700 text-gray-200 font-bold text-base rounded-xl hover:bg-gray-600 transition-colors shadow-lg cursor-pointer">
                🧪 Free Sandbox
              </button>
            </div>
            
            <p className="text-xs text-purple-300/80 mb-2">
              💡 <b>Multiplayer Testing:</b> Open this app in 2 browser tabs or windows, choose Blue on one and Red on the other!
            </p>
            <div className="mt-6 bg-gray-900/60 rounded-xl p-5 text-left max-w-xl mx-auto text-sm">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h4 className="text-[#00ff88] font-bold mb-2">Movement</h4>
                  <p className="text-gray-300">WASD - Move</p>
                  <p className="text-gray-300">Mouse - Look</p>
                  <p className="text-gray-300">Space - Jump</p>
                  <p className="text-gray-300">Shift - Sprint</p>
                  <p className="text-gray-300">Ctrl/C - Crouch</p>
                </div>
                <div>
                  <h4 className="text-[#00ff88] font-bold mb-2">Equipment</h4>
                  <p className="text-gray-300"><b>1</b> 🎯 Rifle (WW2 iron sights)</p>
                  <p className="text-gray-300"><b>2</b> 💨 SMG (WW2 iron sights)</p>
                  <p className="text-gray-300"><b>3</b> 🪣 Spade (dig 2 blocks)</p>
                  <p className="text-gray-300"><b>4</b> ⛏️ Pickaxe (harvest)</p>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-700">
                <p className="text-gray-300"><b>Left Click</b> — Shoot / Use tool</p>
                <p className="text-gray-300"><b>Right Click</b> — Toggle iron sights / Build</p>
                <p className="text-gray-300"><b>R</b> — Reload weapon</p>
                <p className="text-gray-300"><b>Mouse Wheel</b> — Switch equipment</p>
                <div className="mt-2 text-xs text-gray-400 space-y-1">
                  <p>🎯 1 headshot / 3 body shots to kill</p>
                  <p>🔫 Rifle: 10 rounds | SMG: 30 rounds (unlimited ammo)</p>
                  <p>🏃 Running + shooting = less accurate | 🧎 Crouching = more accurate</p>
                  <p>🏗️ <b>How to build:</b> Harvest blocks with pickaxe (4), then right-click to place</p>
                  <p>💥 All terrain is destroyable by gunfire (3 shots per voxel)</p>
                  <p>🧪 Singleplayer mode: No bots, test building & combat freely</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {started && (
        <>
          {/* Quick Preview & Spectator Toolbar (Top Left) */}
          <div className="absolute top-4 left-4 z-40 flex items-center gap-2">
            {!isPointerLocked && !gameState.isSpectating && (
              <div 
                onClick={handleCanvasClick}
                className="bg-gray-900/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-gray-700 text-xs text-gray-300 flex items-center gap-2 cursor-pointer hover:bg-gray-800 transition-colors shadow-lg"
                title="Click anywhere to lock pointer aim"
              >
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
                <span><b>Click Canvas</b> to Lock Aim</span>
                <span className="text-gray-500">|</span>
                <span className="text-gray-400">Drag/Arrows to turn</span>
              </div>
            )}
            
            <button
              onClick={() => gameRef.current?.toggleSpectator()}
              className={`px-3 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-1.5 shadow-lg cursor-pointer ${
                gameState.isSpectating
                  ? 'bg-indigo-600 hover:bg-indigo-500 text-white ring-2 ring-indigo-400'
                  : 'bg-gray-900/80 hover:bg-gray-800 text-gray-300 border border-gray-700'
              }`}
            >
              <span>🎥</span>
              <span>{gameState.isSpectating ? 'Exit Spectator (P)' : 'Spectate AI (P)'}</span>
            </button>
          </div>

          {/* Spectator Mode Active Banner */}
          {gameState.isSpectating && (
            <div className="absolute top-16 left-1/2 -translate-x-1/2 z-30 bg-indigo-950/80 border border-indigo-500/50 backdrop-blur-md px-5 py-2 rounded-full shadow-2xl flex items-center gap-2 text-xs text-indigo-200">
              <span className="w-2 h-2 rounded-full bg-indigo-400 animate-ping"></span>
              <span>🎥 <b>SPECTATOR CAMERA ACTIVE</b> — Tracking live battle action & flag carriers (Press <b>P</b> to play)</span>
            </div>
          )}

          {/* Online Multiplayer Live Status */}
          {gameMode === 'online' && (
            <div className="absolute top-4 right-4 z-30 flex flex-col items-end gap-1.5">
              <div className="bg-gray-900/90 backdrop-blur-md px-3.5 py-2 rounded-xl border border-purple-500/50 shadow-xl flex items-center gap-2.5 text-xs text-white">
                <span className={`w-2.5 h-2.5 rounded-full ${gameState.isNetworkConnected ? 'bg-emerald-400 animate-pulse' : 'bg-amber-400'}`}></span>
                <span className="font-semibold">
                  {gameState.isNetworkConnected ? `Live Server: ${gameState.connectedPlayersCount || 1} Player${(gameState.connectedPlayersCount || 1) > 1 ? 's' : ''}` : 'Connecting to Server...'}
                </span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider ${selectedTeam === 'blue' ? 'bg-blue-950 text-blue-300 border border-blue-800' : 'bg-red-950 text-red-300 border border-red-800'}`}>
                  {selectedTeam} Team
                </span>
              </div>
              {(gameState.connectedPlayersCount || 1) <= 1 && (
                <div className="bg-black/80 backdrop-blur-md px-3 py-1.5 rounded-lg border border-gray-700 text-[11px] text-gray-300 max-w-xs text-right">
                  💡 Open in a 2nd tab/window to test 1v1 PvP & flags!
                </div>
              )}
            </div>
          )}
          {/* Scoreboard - only in multiplayer */}
          {(gameMode === 'multiplayer' || gameMode === 'online') && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
              <div className="flex flex-col items-center gap-2">
                <div className="flex items-center bg-gray-900/90 rounded-xl overflow-hidden border-2 border-gray-700">
                  <div className="px-5 py-2 bg-blue-900/40 flex flex-col items-center gap-1">
                    <span className="text-blue-300 font-bold text-sm">BLUE</span>
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col items-center">
                        <span className="text-gray-400 text-xs">Kills</span>
                        <span className="text-white font-bold text-xl">{gameState.blueKills}</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-gray-400 text-xs">Flags</span>
                        <span className="text-yellow-400 font-bold text-xl">{gameState.blueCaptures}</span>
                      </div>
                    </div>
                  </div>
                  <div className="px-3 py-2 text-gray-500 font-bold">VS</div>
                  <div className="px-5 py-2 bg-red-900/40 flex flex-col items-center gap-1">
                    <span className="text-red-300 font-bold text-sm">RED</span>
                    <div className="flex items-center gap-3">
                      <div className="flex flex-col items-center">
                        <span className="text-gray-400 text-xs">Kills</span>
                        <span className="text-white font-bold text-xl">{gameState.redKills}</span>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className="text-gray-400 text-xs">Flags</span>
                        <span className="text-yellow-400 font-bold text-xl">{gameState.redCaptures}</span>
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Flag carrier indicator */}
                {gameState.flagCarrierName && (
                  <div className="bg-yellow-900/90 px-4 py-2 rounded-lg border-2 border-yellow-500 animate-pulse">
                    <span className="text-yellow-300 font-bold text-sm">
                      🚩 Flag Carrier: {gameState.flagCarrierName}
                    </span>
                  </div>
                )}
              </div>
            </div>
          )}
          
          {/* Singleplayer mode indicator */}
          {gameMode === 'singleplayer' && (
            <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
              <div className="bg-blue-900/80 rounded-xl px-6 py-2 border-2 border-blue-600">
                <span className="text-blue-200 font-bold text-sm">🧪 SINGLEPLAYER MODE</span>
              </div>
            </div>
          )}

          {/* Health */}
          <div className="absolute bottom-8 left-8 z-10">
            <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl px-5 py-3 border-2 border-gray-700">
              <div className="flex items-center gap-3">
                <div className="w-32 h-3 bg-gray-700 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all" style={{
                    width: `${(gameState.hp / gameState.maxHp) * 100}%`,
                    background: gameState.hp > 50 ? '#00ff88' : gameState.hp > 25 ? '#ffcc00' : '#ff3366',
                  }}></div>
                </div>
                <span className="text-white font-bold text-lg">{gameState.hp}</span>
              </div>
            </div>
          </div>

          {/* Equipment */}
          <div className="absolute bottom-8 right-8 z-10">
            <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl px-5 py-3 border-2 border-gray-700">
              <div className="space-y-1">
                {(['rifle', 'smg', 'spade', 'pickaxe'] as const).map((item) => (
                  <div key={item} className={`flex items-center gap-2 px-2 py-1 rounded text-sm ${
                    gameState.equipment === item ? 'bg-[#00ff88]/20 text-[#00ff88]' : 'text-gray-400'
                  }`}>
                    <span className="font-mono w-3">{equipmentKeys[item]}</span>
                    <span>{equipmentNames[item]}</span>
                    {gameState.equipment === item && <span className="ml-auto">●</span>}
                  </div>
                ))}
              </div>
              {(gameState.equipment === 'rifle' || gameState.equipment === 'smg') && (
                <div className="text-xs text-gray-500 mt-2 pt-1 border-t border-gray-700">
                  {gameState.isAiming ? '🎯 Iron Sights' : 'Right-click to aim'}
                </div>
              )}
            </div>
          </div>

          {/* Ammo Counter */}
          {(gameState.equipment === 'rifle' || gameState.equipment === 'smg') && (
            <div className="absolute bottom-32 right-8 z-10">
              <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl px-5 py-3 border-2 border-gray-700">
                <div className="text-gray-400 text-xs mb-1">Ammo</div>
                <div className="flex items-baseline gap-2">
                  <span className={`text-2xl font-bold ${
                    (gameState.currentAmmo ?? 0) === 0 ? 'text-red-500' : 
                    (gameState.currentAmmo ?? 0) < (gameState.magazineSize ?? 10) * 0.3 ? 'text-yellow-500' : 
                    'text-white'
                  }`}>
                    {gameState.currentAmmo ?? 0}
                  </span>
                  <span className="text-gray-500 text-sm">/ {gameState.magazineSize ?? 0}</span>
                </div>
                {gameState.isReloading && (
                  <div className="text-xs text-yellow-500 mt-1 animate-pulse">
                    🔄 Reloading...
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Inventory */}
          <div className="absolute top-8 right-8 z-10">
            <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl px-5 py-3 border-2 border-gray-700">
              <div className="text-gray-400 text-xs">Inventory</div>
              <div className="text-white font-bold text-xl">📦 {gameState.inventory}</div>
            </div>
          </div>

          {/* Crosshair */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-10">
            <div className="relative w-8 h-8">
              {gameState.isAiming && <div className="absolute inset-0 rounded-full border-2 border-white/30"></div>}
              <div className="absolute top-1/2 left-0 w-3 h-0.5 bg-white -translate-y-1/2"></div>
              <div className="absolute top-1/2 right-0 w-3 h-0.5 bg-white -translate-y-1/2"></div>
              <div className="absolute left-1/2 top-0 w-0.5 h-3 bg-white -translate-x-1/2"></div>
              <div className="absolute left-1/2 bottom-0 w-0.5 h-3 bg-white -translate-x-1/2"></div>
              <div className="absolute top-1/2 left-1/2 w-1 h-1 bg-white rounded-full -translate-x-1/2 -translate-y-1/2"></div>
            </div>
          </div>

          {/* Hit marker - flashes red on target hit, auto-fades */}
          {gameState.hitMarker && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-30">
              <div className="w-6 h-6 relative">
                <div className="absolute top-0 left-0 w-2.5 h-0.5 bg-red-500 shadow-[0_0_6px_#ef4444] rotate-45 origin-left"></div>
                <div className="absolute top-0 right-0 w-2.5 h-0.5 bg-red-500 shadow-[0_0_6px_#ef4444] -rotate-45 origin-right"></div>
                <div className="absolute bottom-0 left-0 w-2.5 h-0.5 bg-red-500 shadow-[0_0_6px_#ef4444] -rotate-45 origin-left"></div>
                <div className="absolute bottom-0 right-0 w-2.5 h-0.5 bg-red-500 shadow-[0_0_6px_#ef4444] rotate-45 origin-right"></div>
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-red-500 shadow-[0_0_8px_#ef4444]"></div>
              </div>
            </div>
          )}

          {/* Message */}
          {gameState.message && gameState.messageTimer > 0 && (
            <div className="absolute top-1/3 left-1/2 -translate-x-1/2 z-10">
              <div className="bg-gray-900/80 backdrop-blur-sm rounded-xl px-6 py-3 border border-gray-700">
                <p className="text-white font-medium text-center">{gameState.message}</p>
              </div>
            </div>
          )}

          {/* Target info */}
          {gameState.targetInfo && (
            <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-10">
              <div className="bg-gray-900/60 rounded-lg px-3 py-1">
                <p className="text-gray-300 text-xs">{gameState.targetInfo}</p>
              </div>
            </div>
          )}

          {/* Death screen */}
          {gameState.isDead && (
            <div className="absolute inset-0 flex items-center justify-center bg-red-900/40 z-30">
              <div className="text-center">
                <h2 className="text-4xl font-bold text-white mb-2">☠️ ELIMINATED</h2>
                <p className="text-gray-300">Respawning in {Math.ceil(gameState.respawnTimer)}s</p>
                <p className="text-gray-400 text-sm mt-2">BLUE {gameState.blueKills} — {gameState.redKills} RED</p>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default App;
