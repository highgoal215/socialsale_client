import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { 
  GetUserNotifications, 
  MarkNotificationAsRead, 
  MarkAllNotificationsAsRead, 
  DeleteNotification, 
  ClearAllNotifications, 
  GetUnreadCount 
} from '@/api/notifications';
import { 
  GetNotificationPreferences, 
  UpdateNotificationPreferences 
} from '@/api/notifications/preferences';
import { useAuth } from './AuthContext';
import socketService from '@/services/socket-service';

// Notification interface
interface Notification {
  _id: string;
  userId: string;
  type: 'order_update' | 'payment' | 'support' | 'promo' | 'system';
  title: string;
  message: string;
  read: boolean;
  readAt?: string;
  link?: string;
  relatedId?: string;
  onModel?: string;
  createdAt: string;
  updatedAt: string;
}

// Notification preferences interface
interface NotificationPreferences {
  orderUpdates: boolean;
  payments: boolean;
  support: boolean;
  promotions: boolean;
  system: boolean;
  inApp: boolean;
  email: boolean;
  push: boolean;
  frequency: 'immediate' | 'hourly' | 'daily' | 'weekly';
  quietHours?: {
    enabled: boolean;
    start: string;
    end: string;
    timezone: string;
  };
  emailPreferences?: {
    orderUpdates: boolean;
    payments: boolean;
    support: boolean;
    promotions: boolean;
    system: boolean;
  };
}

// Context interface
interface NotificationContextProps {
  notifications: Notification[];
  unreadCount: number;
  loading: boolean;
  error: string | null;
  preferences: NotificationPreferences;
  fetchNotifications: () => Promise<void>;
  markAsRead: (id: string) => Promise<void>;
  markAllAsRead: () => Promise<void>;
  deleteNotification: (id: string) => Promise<void>;
  clearAllNotifications: () => Promise<void>;
  updatePreferences: (preferences: Partial<NotificationPreferences>) => Promise<void>;
  refreshUnreadCount: () => Promise<void>;
}

const NotificationContext = createContext<NotificationContextProps | undefined>(undefined);

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { user } = useAuth();
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [preferences, setPreferences] = useState<NotificationPreferences>({
    orderUpdates: true,
    payments: true,
    support: true,
    promotions: true,
    system: true,
    inApp: true,
    email: false,
    push: false,
    frequency: 'immediate',
    quietHours: {
      enabled: false,
      start: '22:00',
      end: '08:00',
      timezone: 'UTC'
    },
    emailPreferences: {
      orderUpdates: false,
      payments: true,
      support: true,
      promotions: false,
      system: true
    }
  });

  // Fetch notifications from API
  const fetchNotifications = useCallback(async () => {
    if (!user) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const response = await GetUserNotifications();
      if (response.success) {
        setNotifications(response.data);
        setUnreadCount(response.unreadCount);
      } else {
        setError(response.message || 'Failed to fetch notifications');
      }
    } catch (err) {
      setError('Failed to fetch notifications');
      console.error('Fetch notifications error:', err);
    } finally {
      setLoading(false);
    }
  }, [user]);

  // Mark single notification as read
  const markAsRead = useCallback(async (id: string) => {
    try {
      const response = await MarkNotificationAsRead(id);
      if (response.success) {
        setNotifications(prev => 
          prev.map(notif => 
            notif._id === id ? { ...notif, read: true, readAt: new Date().toISOString() } : notif
          )
        );
        setUnreadCount(prev => Math.max(0, prev - 1));
      } else {
        setError(response.message || 'Failed to mark notification as read');
      }
    } catch (err) {
      setError('Failed to mark notification as read');
      console.error('Mark as read error:', err);
    }
  }, []);

  // Mark all notifications as read
  const markAllAsRead = useCallback(async () => {
    try {
      const response = await MarkAllNotificationsAsRead();
      if (response.success) {
        setNotifications(prev => 
          prev.map(notif => ({ ...notif, read: true, readAt: new Date().toISOString() }))
        );
        setUnreadCount(0);
      } else {
        setError(response.message || 'Failed to mark all notifications as read');
      }
    } catch (err) {
      setError('Failed to mark all notifications as read');
      console.error('Mark all as read error:', err);
    }
  }, []);

  // Delete single notification
  const deleteNotification = useCallback(async (id: string) => {
    try {
      const response = await DeleteNotification(id);
      if (response.success) {
        const deletedNotification = notifications.find(n => n._id === id);
        setNotifications(prev => prev.filter(notif => notif._id !== id));
        if (deletedNotification && !deletedNotification.read) {
          setUnreadCount(prev => Math.max(0, prev - 1));
        }
      } else {
        setError(response.message || 'Failed to delete notification');
      }
    } catch (err) {
      setError('Failed to delete notification');
      console.error('Delete notification error:', err);
    }
  }, [notifications]);

  // Clear all notifications
  const clearAllNotifications = useCallback(async () => {
    try {
      const response = await ClearAllNotifications();
      if (response.success) {
        setNotifications([]);
        setUnreadCount(0);
      } else {
        setError(response.message || 'Failed to clear all notifications');
      }
    } catch (err) {
      setError('Failed to clear all notifications');
      console.error('Clear all notifications error:', err);
    }
  }, []);

  // Update notification preferences
  const updatePreferences = useCallback(async (newPreferences: Partial<NotificationPreferences>) => {
    try {
      const response = await UpdateNotificationPreferences(newPreferences);
      if (response.success && response.data) {
        setPreferences(response.data);
      } else {
        setError(response.message || 'Failed to update preferences');
      }
    } catch (err) {
      setError('Failed to update preferences');
      console.error('Update preferences error:', err);
    }
  }, []);

  // Fetch notification preferences
  const fetchPreferences = useCallback(async () => {
    if (!user) return;
    
    try {
      const response = await GetNotificationPreferences();
      if (response.success && response.data) {
        setPreferences(response.data);
      }
    } catch (err) {
      console.error('Fetch preferences error:', err);
    }
  }, [user]);

  // Refresh unread count
  const refreshUnreadCount = useCallback(async () => {
    if (!user) return;
    
    try {
      const response = await GetUnreadCount();
      if (response.success) {
        setUnreadCount(response.unreadCount);
      }
    } catch (err) {
      console.error('Refresh unread count error:', err);
    }
  }, [user]);

  // Fetch notifications and preferences on mount and when user changes
  useEffect(() => {
    if (user) {
      fetchNotifications();
      fetchPreferences();
    } else {
      setNotifications([]);
      setUnreadCount(0);
    }
  }, [user, fetchNotifications, fetchPreferences]);

  // Set up real-time notifications and polling
  useEffect(() => {
    if (!user) {
      socketService.disconnect();
      return;
    }

    // Connect to socket for real-time notifications
    // console.log('🔌 Connecting to Socket.IO for real-time notifications...');
    socketService.connect();
    
    // Join user room for real-time notifications
    socketService.joinUserRoom(user.id);

    // Handle new notifications from socket
    const handleNewNotification = (notification: any) => {
      // console.log('🔔 Received real-time notification:', notification);
      setNotifications(prev => [notification, ...prev]);
      setUnreadCount(prev => prev + 1);
    };

    // Handle socket connection events
    const handleConnect = () => {
      // console.log('✅ Socket.IO connected successfully');
    };

    const handleDisconnect = () => {
      // console.log('❌ Socket.IO disconnected');
    };

    // Set up socket event listeners
    socketService.onNewNotification(handleNewNotification);
    socketService.onConnect(handleConnect);
    socketService.onDisconnect(handleDisconnect);

    // Set up polling as fallback (every 60 seconds)
    const interval = setInterval(refreshUnreadCount, 60000);

    // Cleanup function
    return () => {
      // console.log('🔌 Cleaning up Socket.IO listeners...');
      socketService.offNewNotification(handleNewNotification);
      socketService.offConnect(handleConnect);
      socketService.offDisconnect(handleDisconnect);
      socketService.leaveUserRoom(user.id);
      socketService.disconnect();
      clearInterval(interval);
    };
  }, [user, refreshUnreadCount]);

  const value: NotificationContextProps = {
    notifications,
    unreadCount,
    loading,
    error,
    preferences,
    fetchNotifications,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAllNotifications,
    updatePreferences,
    refreshUnreadCount
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotificationContext = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotificationContext must be used within a NotificationProvider');
  }
  return context;
}; 