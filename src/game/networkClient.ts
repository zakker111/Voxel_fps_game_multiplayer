import { ClientMessage, ServerMessage, PlayerState, PlayerInput, Position } from '../shared/types';

export class NetworkClient {
  private ws: WebSocket | null = null;
  private messageHandlers: Map<string, (message: any) => void> = new Map();
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 2000;
  private serverUrl: string;
  private onConnectCallback: (() => void) | null = null;
  private onDisconnectCallback: (() => void) | null = null;

  constructor(serverUrl: string = 'ws://localhost:3000') {
    this.serverUrl = serverUrl;
  }

  connect(): Promise<void> {
    return new Promise((resolve, reject) => {
      try {
        console.log('Connecting to server:', this.serverUrl);
        this.ws = new WebSocket(this.serverUrl);

        this.ws.onopen = () => {
          console.log('Connected to server');
          this.reconnectAttempts = 0;
          if (this.onConnectCallback) {
            this.onConnectCallback();
          }
          resolve();
        };

        this.ws.onmessage = (event) => {
          try {
            const message: ServerMessage = JSON.parse(event.data);
            this.handleMessage(message);
          } catch (error) {
            console.error('Error parsing message:', error);
          }
        };

        this.ws.onclose = () => {
          console.log('Disconnected from server');
          if (this.onDisconnectCallback) {
            this.onDisconnectCallback();
          }
          this.attemptReconnect();
        };

        this.ws.onerror = (error) => {
          console.error('WebSocket error:', error);
          reject(error);
        };
      } catch (error) {
        console.error('Connection error:', error);
        reject(error);
      }
    });
  }

  private handleMessage(message: ServerMessage): void {
    const handler = this.messageHandlers.get(message.type);
    if (handler) {
      handler(message);
    } else {
      console.warn('No handler for message type:', message.type);
    }
  }

  private attemptReconnect(): void {
    if (this.reconnectAttempts < this.maxReconnectAttempts) {
      this.reconnectAttempts++;
      console.log(`Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})...`);
      setTimeout(() => {
        this.connect().catch((error) => {
          console.error('Reconnection failed:', error);
        });
      }, this.reconnectDelay);
    } else {
      console.error('Max reconnection attempts reached');
    }
  }

  send(message: ClientMessage): void {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message));
    } else {
      console.warn('Cannot send message: WebSocket not connected');
    }
  }

  onMessage(type: string, handler: (message: any) => void): void {
    this.messageHandlers.set(type, handler);
  }

  onConnect(callback: () => void): void {
    this.onConnectCallback = callback;
  }

  onDisconnect(callback: () => void): void {
    this.onDisconnectCallback = callback;
  }

  disconnect(): void {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }

  isConnected(): boolean {
    return this.ws !== null && this.ws.readyState === WebSocket.OPEN;
  }

  // Helper methods for common messages
  sendJoin(team: 'red' | 'blue'): void {
    this.send({ type: 'join', team });
  }

  sendPlayerInput(input: PlayerInput): void {
    this.send({ type: 'playerInput', input });
  }

  sendShoot(origin: Position, direction: Position): void {
    this.send({ type: 'shoot', origin, direction });
  }

  sendUseTool(tool: 'pickaxe' | 'spade', target: Position): void {
    this.send({ type: 'useTool', tool, target });
  }

  sendBuild(position: Position): void {
    this.send({ type: 'build', position });
  }
}
