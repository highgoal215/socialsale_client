import axios from "axios"

// const Backend_URL = import.meta.env.VITE_BACKEND_URL || 'https://api.likes.io/api/client';
const Backend_URL = import.meta.env.VITE_BACKEND_URL || 'https://api.likes.io/api/client';

// Notification interface
interface Notification {
  _id: string;
  userId: string;
  type: 'order_update' | 'payment' | 'support' | 'promo' | 'system';
  title: string;
  message: string;
  read: boolean;
  createdAt: string;
  updatedAt: string;
}

// Get user notifications parameters
interface GetNotificationsParams {
  read?: boolean;
  type?: string;
  limit?: number;
}

// Get user notifications response
interface GetNotificationsResponse {
  success: boolean;
  count: number;
  unreadCount: number;
  data: Notification[];
  message?: string;
}

// Get User Notifications Function
export const GetUserNotifications = async (params: GetNotificationsParams = {}): Promise<GetNotificationsResponse> => {
  const UserToken = localStorage.getItem('userToken');
  const cleanToken = UserToken?.replace(/^"|"$/g, '');
  
  if (!UserToken) {
    console.warn('No user token found');
    return { 
      success: false, 
      count: 0, 
      unreadCount: 0, 
      data: [], 
      message: 'Authentication required' 
    };
  }

  try {
    // Build query parameters
    const queryParams = new URLSearchParams();
    if (params.read !== undefined) {
      queryParams.append('read', params.read.toString());
    }
    if (params.type) {
      queryParams.append('type', params.type);
    }
    if (params.limit) {
      queryParams.append('limit', params.limit.toString());
    }

    const url = `${Backend_URL}/notifications${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    
    const response = await axios.get(url, {
      headers: {
        Authorization: `Bearer ${cleanToken}`,
      },
      withCredentials: true,
    });
    
    // console.log("User notifications retrieved successfully:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Get User Notifications Error:", error);
    
    if (error.response) {
      const errorMessage = error.response.data?.message || 
                         error.response.data?.error || 
                         'Failed to retrieve notifications';
      
      return { 
        success: false, 
        count: 0, 
        unreadCount: 0, 
        data: [], 
        message: errorMessage 
      };
    } else if (error.request) {
      return { 
        success: false, 
        count: 0, 
        unreadCount: 0, 
        data: [], 
        message: 'Network error. Please check your connection.' 
      };
    } else {
      return { 
        success: false, 
        count: 0, 
        unreadCount: 0, 
        data: [], 
        message: 'An error occurred while retrieving notifications' 
      };
    }
  }
}

// Mark notification as read response
interface MarkAsReadResponse {
  success: boolean;
  message?: string;
  data?: Notification;
}

// Get single notification response
interface GetNotificationResponse {
  success: boolean;
  data?: Notification;
  message?: string;
}

// Get Single Notification Function
export const GetNotification = async (notificationId: string): Promise<GetNotificationResponse> => {
  const UserToken = localStorage.getItem('userToken');
  const cleanToken = UserToken?.replace(/^"|"$/g, '');
  
  if (!UserToken) {
    console.warn('No user token found');
    return { 
      success: false, 
      message: 'Authentication required' 
    };
  }

  try {
    const response = await axios.get(`${Backend_URL}/notifications/${notificationId}`, {
      
        headers: {
        Authorization: `Bearer ${cleanToken}`,
      },
      withCredentials: true,
    });
    
    // console.log("Notification retrieved successfully:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Get Notification Error:", error);
    
    if (error.response) {
      const errorMessage = error.response.data?.message || 
                         error.response.data?.error || 
                         'Failed to retrieve notification';
      
      return { 
        success: false, 
        message: errorMessage 
      };
    } else if (error.request) {
      return { 
        success: false, 
        message: 'Network error. Please check your connection.' 
      };
    } else {
      return { 
        success: false, 
        message: 'An error occurred while retrieving notification' 
      };
    }
  }
}

// Mark notification as read response
interface MarkAsReadResponse {
  success: boolean;
  message?: string;
  data?: Notification;
}

// Mark Notification as Read Function
export const MarkNotificationAsRead = async (notificationId: string): Promise<MarkAsReadResponse> => {
  const UserToken = localStorage.getItem('userToken');
  const cleanToken = UserToken?.replace(/^"|"$/g, '');
  
  if (!UserToken) {
    console.warn('No user token found');
    return { 
      success: false, 
      message: 'Authentication required' 
    };
  }

  try {
    const response = await axios.patch(`${Backend_URL}/notifications/${notificationId}/read`, {}, {
      headers: {
        Authorization: `Bearer ${cleanToken}`,
      },
      withCredentials: true,
    });
    
    // console.log("Notification marked as read successfully:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Mark Notification as Read Error:", error);
    
    if (error.response) {
      const errorMessage = error.response.data?.message || 
                         error.response.data?.error || 
                         'Failed to mark notification as read';
      
      return { 
        success: false, 
        message: errorMessage 
      };
    } else if (error.request) {
      return { 
        success: false, 
        message: 'Network error. Please check your connection.' 
      };
    } else {
      return { 
        success: false, 
        message: 'An error occurred while marking notification as read' 
      };
    }
  }
}

// Mark all notifications as read response
interface MarkAllAsReadResponse {
  success: boolean;
  message?: string;
  updatedCount?: number;
}

// Mark All Notifications as Read Function
export const MarkAllNotificationsAsRead = async (): Promise<MarkAllAsReadResponse> => {
  const UserToken = localStorage.getItem('userToken');
  const cleanToken = UserToken?.replace(/^"|"$/g, '');
  
  if (!UserToken) {
    console.warn('No user token found');
    return { 
      success: false, 
      message: 'Authentication required' 
    };
  }

  try {
    const response = await axios.patch(`${Backend_URL}/notifications/mark-all-read`, {}, {
      headers: {
        Authorization: `Bearer ${cleanToken}`,
      },
      withCredentials: true,
    });
    
    // console.log("All notifications marked as read successfully:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Mark All Notifications as Read Error:", error);
    
    if (error.response) {
      const errorMessage = error.response.data?.message || 
                         error.response.data?.error || 
                         'Failed to mark all notifications as read';
      
      return { 
        success: false, 
        message: errorMessage 
      };
    } else if (error.request) {
      return { 
        success: false, 
        message: 'Network error. Please check your connection.' 
      };
    } else {
      return { 
        success: false, 
        message: 'An error occurred while marking all notifications as read' 
      };
    }
  }
}

// Delete notification response
interface DeleteNotificationResponse {
  success: boolean;
  message?: string;
  data?: {};
}

// Delete Notification Function
export const DeleteNotification = async (notificationId: string): Promise<DeleteNotificationResponse> => {
  const UserToken = localStorage.getItem('userToken');
  const cleanToken = UserToken?.replace(/^"|"$/g, '');
  
  if (!UserToken) {
    console.warn('No user token found');
    return { 
      success: false, 
      message: 'Authentication required' 
    };
  }

  try {
    const response = await axios.delete(`${Backend_URL}/notifications/${notificationId}`, {
      headers: {
        Authorization: `Bearer ${cleanToken}`,
      },
      withCredentials: true,
    });
    
    // console.log("Notification deleted successfully:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Delete Notification Error:", error);
    
    if (error.response) {
      const errorMessage = error.response.data?.message || 
                         error.response.data?.error || 
                         'Failed to delete notification';
      
      return { 
        success: false, 
        message: errorMessage 
      };
    } else if (error.request) {
      return { 
        success: false, 
        message: 'Network error. Please check your connection.' 
      };
    } else {
      return { 
        success: false, 
        message: 'An error occurred while deleting notification' 
      };
    }
  }
}

// Clear all notifications response
interface ClearAllNotificationsResponse {
  success: boolean;
  message?: string;
  deletedCount?: number;
}

// Clear All Notifications Function
export const ClearAllNotifications = async (): Promise<ClearAllNotificationsResponse> => {
  const UserToken = localStorage.getItem('userToken');
  const cleanToken = UserToken?.replace(/^"|"$/g, '');
  
  if (!UserToken) {
    console.warn('No user token found');
    return { 
      success: false, 
      message: 'Authentication required' 
    };
  }

  try {
    const response = await axios.delete(`${Backend_URL}/notifications`, {
      headers: {
        Authorization: `Bearer ${cleanToken}`,
      },
      withCredentials: true,
    });
    
    // console.log("All notifications cleared successfully:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Clear All Notifications Error:", error);
    
    if (error.response) {
      const errorMessage = error.response.data?.message || 
                         error.response.data?.error || 
                         'Failed to clear all notifications';
      
      return { 
        success: false, 
        message: errorMessage 
      };
    } else if (error.request) {
      return { 
        success: false, 
        message: 'Network error. Please check your connection.' 
      };
    } else {
      return { 
        success: false, 
        message: 'An error occurred while clearing all notifications' 
      };
    }
  }
}

// Get unread count response
interface GetUnreadCountResponse {
  success: boolean;
  unreadCount: number;
  message?: string;
}

// Get Unread Count Function
export const GetUnreadCount = async (): Promise<GetUnreadCountResponse> => {
  const UserToken = localStorage.getItem('userToken');
  const cleanToken = UserToken?.replace(/^"|"$/g, '');
  
  if (!UserToken) {
    console.warn('No user token found');
    return { 
      success: false, 
      unreadCount: 0, 
      message: 'Authentication required' 
    };
  }

  try {
    const response = await axios.get(`${Backend_URL}/notifications/unread-count`, {
      headers: {
        Authorization: `Bearer ${cleanToken}`,
      },
      withCredentials: true,
    });
    
    // console.log("Unread count retrieved successfully:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Get Unread Count Error:", error);
    
    if (error.response) {
      const errorMessage = error.response.data?.message || 
                         error.response.data?.error || 
                         'Failed to retrieve unread count';
      
      return { 
        success: false, 
        unreadCount: 0, 
        message: errorMessage 
      };
    } else if (error.request) {
      return { 
        success: false, 
        unreadCount: 0, 
        message: 'Network error. Please check your connection.' 
      };
    } else {
      return { 
        success: false, 
        unreadCount: 0, 
        message: 'An error occurred while retrieving unread count' 
      };
    }
  }
} 