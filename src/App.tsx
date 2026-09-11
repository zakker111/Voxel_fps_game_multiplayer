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
  });
  const [started, setStarted] = useState(false);
  const [gameMode, setGameMode] = useState<'multiplayer' | 'singleplayer' | 'online' | null>(null);
  const [selectedTeam, setSelectedTeam] = useState<'red' | 'blue'>('blue');

  useEffect(() => {
    if (!canvasRef.current || gameRef.current || !gameMode) return;
    
    const canvas = canvasRef.current;
    console.log('Creating game with mode:', gameMode, 'team:', selectedTeam, 'canvas size:', canvas.width, canvas.height);
    
    // Ensure canvas has dimensions
    if (canvas.width === 0 || canvas.height === 0) {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
    
    const game = new Game(canvas, gameMode);
    game.onStateChange = (state) => setGameState(state);
    
    // Set team for online multiplayer
    if (gameMode === 'online') {
      game.playerTeam = selectedTeam;
      game.player.team = selectedTeam;
    }
    
    game.start();
    gameRef.current = game;
    console.log('Game created and started');
    
    // Auto-start when game is created
    game.requestPointerLock(canvas);
    setStarted(true);
    
    return () => { 
      console.log('Cleaning up game');
      game.destroy(); 
      gameRef.current = null;
    };
  }, [gameMode, selectedTeam]);

  const handleStart = (mode: 'multiplayer' | 'singleplayer' | 'online') => {
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
            <div className="flex gap-4 justify-center mb-6">
              <button onClick={() => handleStart('multiplayer')} className="px-8 py-4 bg-[#00ff88] text-black font-bold text-xl rounded-xl hover:bg-[#00cc66] transition-colors">
                🤖 With Bots
              </button>
              <button onClick={() => handleStart('online')} className="px-8 py-4 bg-purple-600 text-white font-bold text-xl rounded-xl hover:bg-purple-700 transition-colors">
                🌐 Online Multiplayer
              </button>
              <button onClick={() => handleStart('singleplayer')} className="px-8 py-4 bg-blue-600 text-white font-bold text-xl rounded-xl hover:bg-blue-700 transition-colors">
                🧪 Singleplayer
              </button>
            </div>
            
            {/* Team selection for online mode */}
            {gameMode === 'online' && !started && (
              <div className="mb-6 bg-gray-900/60 rounded-xl p-4 max-w-md mx-auto">
                <h3 className="text-white font-bold mb-3 text-center">Select Your Team</h3>
                <div className="flex gap-4 justify-center">
                  <button 
                    onClick={() => setSelectedTeam('blue')}
                    className={`px-6 py-3 rounded-xl font-bold text-lg transition-all ${
                      selectedTeam === 'blue' 
                        ? 'bg-blue-600 text-white ring-4 ring-blue-400' 
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    🔵 Blue Team
                  </button>
                  <button 
                    onClick={() => setSelectedTeam('red')}
                    className={`px-6 py-3 rounded-xl font-bold text-lg transition-all ${
                      selectedTeam === 'red' 
                        ? 'bg-red-600 text-white ring-4 ring-red-400' 
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    🔴 Red Team
                  </button>
                </div>
                <p className="text-gray-400 text-xs text-center mt-3">
                  {selectedTeam === 'blue' ? 'Spawn at south, push north to capture red flag' : 'Spawn at north, push south to capture blue flag'}
                </p>
              </div>
            )}
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
                    gameState.currentAmmo === 0 ? 'text-red-500' : 
                    gameState.currentAmmo < gameState.magazineSize * 0.3 ? 'text-yellow-500' : 
                    'text-white'
                  }`}>
                    {gameState.currentAmmo}
                  </span>
                  <span className="text-gray-500 text-sm">/ {gameState.magazineSize}</span>
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

          {/* Hit marker */}
          {gameState.hitMarker && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none z-20">
              <div className="w-6 h-6 relative">
                <div className="absolute top-0 left-0 w-2 h-0.5 bg-red-500 rotate-45 origin-left"></div>
                <div className="absolute top-0 right-0 w-2 h-0.5 bg-red-500 -rotate-45 origin-right"></div>
                <div className="absolute bottom-0 left-0 w-2 h-0.5 bg-red-500 -rotate-45 origin-left"></div>
                <div className="absolute bottom-0 right-0 w-2 h-0.5 bg-red-500 rotate-45 origin-right"></div>
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
