import { io, Socket } from 'socket.io-client';

const API_URL = import.meta.env.VITE_BACKEND_URL || 'https://api.likes.io';

class SocketService {
  private socket: Socket | null = null;
  private isConnected = false;
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectDelay = 1000;

  // Event listeners
  private newNotificationListeners: Array<(notification: any) => void> = [];
  private connectListeners: Array<() => void> = [];
  private disconnectListeners: Array<() => void> = [];

  private initializeSocket() {
    if (this.socket) {
      this.socket.disconnect();
    }

    this.socket = io(API_URL, {
      transports: ['websocket', 'polling'],
      autoConnect: false,
      reconnection: true,
      reconnectionAttempts: this.maxReconnectAttempts,
      reconnectionDelay: this.reconnectDelay,
    });

    this.setupEventListeners();
  }

  private setupEventListeners() {
    if (!this.socket) return;

    this.socket.on('connect', () => {
      console.log('🔌 Socket connected to server');
      this.isConnected = true;
      this.reconnectAttempts = 0;
      this.connectListeners.forEach(listener => listener());
    });

    this.socket.on('disconnect', () => {
      console.log('🔌 Socket disconnected from server');
      this.isConnected = false;
      this.disconnectListeners.forEach(listener => listener());
    });

    this.socket.on('connect_error', (error) => {
      console.error('🔌 Socket connection error:', error);
      this.reconnectAttempts++;
      
      if (this.reconnectAttempts >= this.maxReconnectAttempts) {
        console.error('🔌 Max reconnection attempts reached');
      }
    });

    this.socket.on('reconnect', (attemptNumber) => {
      console.log(`🔌 Socket reconnected after ${attemptNumber} attempts`);
      this.isConnected = true;
      this.reconnectAttempts = 0;
    });

    this.socket.on('reconnect_error', (error) => {
      console.error('🔌 Socket reconnection error:', error);
    });

    // Listen for new notifications
    this.socket.on('new_notification', (notification) => {
      console.log('🔔 Received real-time notification:', notification);
      this.newNotificationListeners.forEach(listener => listener(notification));
    });
  }

  public connect() {
    try {
      this.initializeSocket();
      if (this.socket && !this.isConnected) {
        this.socket.connect();
      }
    } catch (error) {
      console.error('🔌 Socket connection error:', error);
    }
  }

  public disconnect() {
    if (this.socket) {
      this.socket.disconnect();
      this.socket = null;
      this.isConnected = false;
    }
  }

  public joinUserRoom(userId: string) {
    if (this.socket && this.isConnected) {
      console.log(`🔌 Joining user room: ${userId}`);
      this.socket.emit('join-user', userId);
    }
  }

  public leaveUserRoom(userId: string) {
    if (this.socket && this.isConnected) {
      console.log(`🔌 Leaving user room: ${userId}`);
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

  // Utility methods
  public getSocket(): Socket | null {
    return this.socket;
  }

  public getConnectionStatus(): boolean {
    return this.isConnected;
  }
}

const socketService = new SocketService();

export default socketService; 