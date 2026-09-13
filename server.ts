import express from 'express';
import http from 'http';
import path from 'path';
import { WebSocketServer, WebSocket } from 'ws';
import { createServer as createViteServer } from 'vite';
import { ServerGame } from './src/server/serverGame';

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Health check endpoint
  app.get('/api/health', (_req, res) => {
    res.json({ status: 'ok' });
  });

  const server = http.createServer(app);

  // Create game instance & WebSocket server
  const game = new ServerGame();
  const wss = new WebSocketServer({ noServer: true });

  wss.on('connection', (ws: WebSocket) => {
    console.log('👤 Client connected');
    const playerId = game.addPlayer(ws);

    ws.on('message', (data: Buffer | string) => {
      try {
        const message = JSON.parse(data.toString());
        game.handleMessage(playerId, message);
      } catch (error) {
        console.error('❌ Error handling message:', error);
      }
    });

    ws.on('close', () => {
      console.log('👋 Client disconnected');
      game.removePlayer(playerId);
    });

    ws.on('error', (error) => {
      console.error('❌ WebSocket error:', error);
    });
  });

  // Handle WebSocket upgrade
  server.on('upgrade', (request, socket, head) => {
    const { url, headers } = request;
    // Don't intercept Vite HMR websocket in dev mode
    if (url?.startsWith('/@vite') || headers['sec-websocket-protocol'] === 'vite-hmr') {
      return;
    }
    wss.handleUpgrade(request, socket, head, (ws) => {
      wss.emit('connection', ws, request);
    });
  });

  // Game tick loop - 20 ticks per second
  const TICK_RATE = 20;
  const TICK_INTERVAL = 1000 / TICK_RATE;
  setInterval(() => {
    game.update(TICK_INTERVAL / 1000);
    game.broadcastState();
  }, TICK_INTERVAL);

  console.log(`⚙️  Game server loop started with tick rate: ${TICK_RATE}Hz`);

  // Vite middleware in dev / static in prod
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*all', (_req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  server.listen(PORT, '0.0.0.0', () => {
    console.log(`\n🎮 Voxel FPS Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer().catch((err) => {
  console.error('Failed to start server:', err);
  process.exit(1);
});
