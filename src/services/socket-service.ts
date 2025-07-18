import { io, Socket } from 'socket.io-client';
import config from '@/config/environment';

class SocketService {
  private socket: Socket | null = null;
  private isConnected = false;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = config.socketReconnectAttempts;
  private reconnectDelay = config.socketReconnectDelay;
  private connectionTimeout = config.socketTimeout;

  // Event listeners
  private newNotificationListeners: Array<(notification: any) => void> = [];
  private connectListeners: Array<() => void> = [];
  private disconnectListeners: Array<() => void> = [];
  private errorListeners: Array<(error: any) => void> = [];

  private initializeSocket() {
    if (this.socket) {
      this.socket.disconnect();
    }

    if (config.enableWebSocketDebug) {
      console.log('🔌 Initializing socket connection to:', config.backendUrl);
    }

    this.socket = io(config.backendUrl, {
      transports: ['websocket', 'polling'],
      autoConnect: false,
      reconnection: true,
      reconnectionAttempts: this.maxReconnectAttempts,
      reconnectionDelay: this.reconnectDelay,
      timeout: this.connectionTimeout,
      forceNew: true,
      withCredentials: true
    });

    this.setupEventListeners();
  }

  private setupEventListeners() {
    if (!this.socket) return;

    this.socket.on('connect', () => {
      if (config.enableWebSocketDebug) {
        console.log('🔌 Socket connected successfully:', this.socket?.id);
      }
      this.isConnected = true;
      this.reconnectAttempts = 0;
      this.connectListeners.forEach(listener => listener());
    });

    this.socket.on('disconnect', (reason) => {
      if (config.enableWebSocketDebug) {
        console.log('🔌 Socket disconnected:', reason);
      }
      this.isConnected = false;
      this.disconnectListeners.forEach(listener => listener());
    });

    this.socket.on('connect_error', (error) => {
      console.error('🔌 Socket connection error:', error);
      this.reconnectAttempts++;
      this.errorListeners.forEach(listener => listener(error));
      
      if (this.reconnectAttempts >= this.maxReconnectAttempts) {
        console.error('🔌 Max reconnection attempts reached');
        this.errorListeners.forEach(listener => listener(new Error('Max reconnection attempts reached')));
      }
    });

    this.socket.on('reconnect', (attemptNumber) => {
      if (config.enableWebSocketDebug) {
        console.log('🔌 Socket reconnected after', attemptNumber, 'attempts');
      }
      this.isConnected = true;
      this.reconnectAttempts = 0;
      this.connectListeners.forEach(listener => listener());
    });

    this.socket.on('reconnect_error', (error) => {
      console.error('🔌 Socket reconnection error:', error);
      this.errorListeners.forEach(listener => listener(error));
    });

    this.socket.on('reconnect_failed', () => {
      console.error('🔌 Socket reconnection failed');
      this.errorListeners.forEach(listener => listener(new Error('Reconnection failed')));
    });

    // Listen for new notifications
    this.socket.on('new_notification', (notification) => {
      if (config.enableWebSocketDebug) {
        console.log('🔌 Received new notification:', notification);
      }
      this.newNotificationListeners.forEach(listener => listener(notification));
    });

    // Handle transport errors
    this.socket.on('error', (error) => {
      console.error('🔌 Socket error:', error);
      this.errorListeners.forEach(listener => listener(error));
    });
  }

  public connect() {
    if (!config.socketEnabled) {
      if (config.enableWebSocketDebug) {
        console.log('🔌 Socket connection disabled by configuration');
      }
      return;
    }

    try {
      if (config.enableWebSocketDebug) {
        console.log('🔌 Attempting to connect to socket server...');
      }
      this.initializeSocket();
      if (this.socket && !this.isConnected) {
        this.socket.connect();
        
        // Set a timeout to check if connection was successful
        setTimeout(() => {
          if (!this.isConnected) {
            if (config.enableWebSocketDebug) {
              console.warn('🔌 Socket connection timeout - trying fallback transport');
            }
            this.tryFallbackTransport();
          }
        }, this.connectionTimeout);
      }
    } catch (error) {
      console.error('🔌 Socket connection error:', error);
      this.errorListeners.forEach(listener => listener(error));
    }
  }

  private tryFallbackTransport() {
    if (!this.socket) return;
    
    if (config.enableWebSocketDebug) {
      console.log('🔌 Trying fallback transport (polling)');
    }
    this.socket.io.opts.transports = ['polling'];
    this.socket.connect();
  }

  public disconnect() {
    if (this.socket) {
      if (config.enableWebSocketDebug) {
        console.log('🔌 Disconnecting socket');
      }
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
    }
  }

  public joinUserRoom(userId: string) {
    if (this.socket && this.isConnected) {
      if (config.enableWebSocketDebug) {
        console.log('🔌 Joining user room:', userId);
      }
      this.socket.emit('join-user', userId);
    } else {
      if (config.enableWebSocketDebug) {
        console.warn('🔌 Cannot join user room - socket not connected');
      }
    }
  }

  public leaveUserRoom(userId: string) {
    if (this.socket && this.isConnected) {
      if (config.enableWebSocketDebug) {
        console.log('🔌 Leaving user room:', userId);
      }
      this.socket.emit('leave-user', userId);
    }
  }

  // Event listener methods
  public onNewNotification(callback: (notification: any) => void) {
    this.newNotificationListeners.push(callback);
  }

  public offNewNotification(callback: (notification: any) => void) {
    this.newNotificationListeners = this.newNotificationListeners.filter(
      listener => listener !== callback
    );
  }

  public onConnect(callback: () => void) {
    this.connectListeners.push(callback);
  }

  public offConnect(callback: () => void) {
    this.connectListeners = this.connectListeners.filter(
      listener => listener !== callback
    );
  }

  public onDisconnect(callback: () => void) {
    this.disconnectListeners.push(callback);
  }

  public offDisconnect(callback: () => void) {
    this.disconnectListeners = this.disconnectListeners.filter(
      listener => listener !== callback
    );
  }

  public onError(callback: (error: any) => void) {
    this.errorListeners.push(callback);
  }

  public offError(callback: (error: any) => void) {
    this.errorListeners = this.errorListeners.filter(
      listener => listener !== callback
    );
  }

  // Utility methods
  public getSocket(): Socket | null {
    return this.socket;
  }

  public getConnectionStatus(): boolean {
    return this.isConnected;
  }

  public getConnectionInfo() {
    return {
      isConnected: this.isConnected,
      reconnectAttempts: this.reconnectAttempts,
      socketId: this.socket?.id,
      transport: this.socket?.io?.engine?.transport?.name,
      config: {
        backendUrl: config.backendUrl,
        socketEnabled: config.socketEnabled,
        socketTimeout: config.socketTimeout
      }
    };
  }
}

const socketService = new SocketService();

export default socketService; 