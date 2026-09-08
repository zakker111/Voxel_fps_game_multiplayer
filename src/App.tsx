import { useEffect, useRef, useState } from 'react';
import { Game, GameState } from './game/game';

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const gameRef = useRef<Game | null>(null);
  const [gameState, setGameState] = useState<GameState>({
    hp: 100, maxHp: 100, equipment: 'rifle', inventory: 0,
    isDead: false, respawnTimer: 0, hitMarker: false, targetInfo: '',
    message: '', messageTimer: 0, buildMode: false, buildValid: true,
    blueKills: 0, redKills: 0, isAiming: false,
  });
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!canvasRef.current || gameRef.current) return;
    const game = new Game(canvasRef.current);
    game.onStateChange = (state) => setGameState(state);
    game.start();
    gameRef.current = game;
    return () => { game.destroy(); };
  }, []);

  const handleStart = () => {
    if (canvasRef.current && gameRef.current) {
      gameRef.current.requestPointerLock(canvasRef.current);
      setStarted(true);
    }
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
      <canvas ref={canvasRef} className="w-full h-full" onClick={handleCanvasClick} onContextMenu={handleRightClick} />

      {!started && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/80 z-50">
          <div className="text-center max-w-3xl px-4">
            <h1 className="text-5xl font-bold text-white mb-3">🎮 Voxel FPS</h1>
            <p className="text-lg text-gray-300 mb-1">Red vs Blue — Capture the Flag</p>
            <p className="text-sm text-gray-400 mb-6">You are <span className="text-blue-400 font-bold">BLUE</span> team. Push to the <span className="text-red-400 font-bold">RED</span> flag!</p>
            <button onClick={handleStart} className="px-8 py-4 bg-[#00ff88] text-black font-bold text-xl rounded-xl hover:bg-[#00cc66] transition-colors">
              Click to Play
            </button>
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
                <p className="text-gray-300"><b>Mouse Wheel</b> — Switch equipment</p>
                <p className="text-gray-400 text-xs mt-2">1 headshot / 3 body shots to kill • Bots push toward enemy flag</p>
              </div>
            </div>
          </div>
        </div>
      )}

      {started && (
        <>
          {/* Scoreboard */}
          <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10">
            <div className="flex items-center bg-gray-900/90 rounded-xl overflow-hidden border-2 border-gray-700">
              <div className="px-5 py-2 bg-blue-900/40 flex items-center gap-2">
                <span className="text-blue-300 font-bold text-sm">BLUE</span>
                <span className="text-white font-bold text-xl">{gameState.blueKills}</span>
              </div>
              <div className="px-3 py-2 text-gray-500 font-bold">VS</div>
              <div className="px-5 py-2 bg-red-900/40 flex items-center gap-2">
                <span className="text-white font-bold text-xl">{gameState.redKills}</span>
                <span className="text-red-300 font-bold text-sm">RED</span>
              </div>
            </div>
          </div>

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
