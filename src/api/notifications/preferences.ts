import axios from "axios";

// const Backend_URL = import.meta.env.VITE_BACKEND_URL || 'https://likes.io/api/client';
const Backend_URL = import.meta.env.VITE_BACKEND_URL || 'https://likes.io/api';

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

// Get notification preferences response
interface GetPreferencesResponse {
  success: boolean;
  data?: NotificationPreferences;
  message?: string;
}

// Update notification preferences response
interface UpdatePreferencesResponse {
  success: boolean;
  data?: NotificationPreferences;
  message?: string;
}

// Get User Notification Preferences
export const GetNotificationPreferences = async (): Promise<GetPreferencesResponse> => {
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
    const response = await axios.get(`${Backend_URL}/notification-preferences`, {
      headers: {
        Authorization: `Bearer ${cleanToken}`,
      },
      withCredentials: true,
    });
    
    // console.log("Notification preferences retrieved successfully:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Get Notification Preferences Error:", error);
    
    if (error.response) {
      const errorMessage = error.response.data?.message || 
                         error.response.data?.error || 
                         'Failed to retrieve notification preferences';
      
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
        message: 'An error occurred while retrieving notification preferences' 
      };
    }
  }
};

// Update User Notification Preferences
export const UpdateNotificationPreferences = async (preferences: Partial<NotificationPreferences>): Promise<UpdatePreferencesResponse> => {
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
    const response = await axios.put(`${Backend_URL}/notification-preferences`, preferences, {
      headers: {
        Authorization: `Bearer ${cleanToken}`,
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    });
    
    // console.log("Notification preferences updated successfully:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Update Notification Preferences Error:", error);
    
    if (error.response) {
      const errorMessage = error.response.data?.message || 
                         error.response.data?.error || 
                         'Failed to update notification preferences';
      
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
        message: 'An error occurred while updating notification preferences' 
      };
    }
  }
}; 