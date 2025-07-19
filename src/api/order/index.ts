import axios from "axios"

// const Backend_URL = import.meta.env.BACKEND_URL || 'http://localhost:5005/api';
const Backend_URL = import.meta.env.BACKEND_URL || 'http://localhost:5005/api';

// Map frontend service names to backend service types
const mapServiceType = (serviceName: string): string => {
  const serviceMap: { [key: string]: string } = {
    'Instagram Followers': 'followers',
    'Instagram Likes': 'likes',
    'Instagram Views': 'views',
    'Instagram Comments': 'likes', // Comments might map to likes
    'TikTok Followers': 'followers',
    'TikTok Likes': 'likes',
    'TikTok Views': 'views',
    'TikTok Comments': 'likes',
    'YouTube Subscribers': 'subscribers',
    'YouTube Likes': 'likes',
    'YouTube Views': 'views',
    'YouTube Comments': 'likes'
  };
  
  return serviceMap[serviceName] || 'followers'; // Default to followers
};

// Order form data interface
interface OrderFormData {
  service: string;
  package: string;
  price: string;
  postUrl: string;
  socialUsername: string;
  email: string;
  additionalInfo?: string;
  serviceQuality?: string;
  deliverySpeed?: string;
}

// Send Order Request Function
export const SendOrderRequest = async (formData: OrderFormData) => {
  // //console.log("Send Order Request Function:", formData);
  
  const UserToken = localStorage.getItem('userToken');
  const cleanToken = UserToken?.replace(/^"|"$/g, '');
  
  // Prepare the request payload
  const requestPayload = {
    socialUsername: formData.socialUsername,
    serviceType: mapServiceType(formData.service), // Backend expects: 'followers', 'likes', 'views'
    quality: formData.serviceQuality === 'premium' ? 'premium' : 'general', // Backend expects: 'general', 'premium'
    quantity: parseInt(formData.package) || 0,
    price: parseFloat(formData.price.replace('$', '')) || 0, // Convert price string to number
    postUrl: formData.postUrl,
    // Optional fields that backend might need
    serviceId: null, // Backend will find this based on serviceType and quality
    supplierPrice: parseFloat(formData.price.replace('$', '')) || 0, // Same as price for now
    orderNotes: formData.additionalInfo || ''
  };
  
  // //console.log("Request payload being sent to backend:", requestPayload);
  // //console.log("Original service name:", formData.service);
  // //console.log("Mapped service type:", mapServiceType(formData.service));
  // //console.log("Service quality being sent:", requestPayload.quality);
  // //console.log("Quantity being sent:", requestPayload.quantity);
  
  try {
    const response = await axios.post(`${Backend_URL}/orders`, requestPayload, {
      headers: {
        ...(cleanToken && { Authorization: `Bearer ${cleanToken}` }),
      },
      withCredentials: true,
    });
    // 
    // //console.log("Order request sent successfully:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Send Order Request Error:", error);
    
    // Handle axios error response
    if (error.response) {
      console.error("Error response data:", error.response.data);
      console.error("Error response status:", error.response.status);
      console.error("Full error response:", error.response);
      
      // Try to extract more specific error information
      const errorMessage = error.response.data?.message || 
                         error.response.data?.error || 
                         error.response.data?.detail ||
                         'Failed to submit order';
      
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
        message: 'An error occurred while submitting your order' 
      };
    }
  }
}

// Get User Orders Function (for authenticated users)
export const GetUserOrders = async () => {
  const UserToken = localStorage.getItem('userToken');
  const cleanToken = UserToken?.replace(/^"|"$/g, '');
  
  if (!UserToken) {
    console.warn('No user token found');
    return { success: false, message: 'Authentication required' };
  }

  try {
    const response = await axios.get(`${Backend_URL}/orders/user`, {
      headers: {
        Authorization: `Bearer ${cleanToken}`,
      },
      withCredentials: true,
    });
    
    // //console.log("User orders retrieved successfully:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Get User Orders Error:", error);
    
    if (error.response) {
      const errorMessage = error.response.data?.message || 
                         error.response.data?.error || 
                         'Failed to retrieve orders';
      
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
        message: 'An error occurred while retrieving your orders' 
      };
    }
  }
}

// Get Order Status Function
export const GetOrderStatus = async (orderId: string) => {
  const UserToken = localStorage.getItem('userToken');
  const cleanToken = UserToken?.replace(/^"|"$/g, '');
  
  if (!UserToken) {
    console.warn('No user token found');
    return { success: false, message: 'Authentication required' };
  }

  try {
    const response = await axios.get(`${Backend_URL}/orders/${orderId}/status`, {
      headers: {
        Authorization: `Bearer ${cleanToken}`,
      },
      withCredentials: true,
    });
    
    // //console.log("Order status retrieved successfully:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Get Order Status Error:", error);
    
    if (error.response) {
      const errorMessage = error.response.data?.message || 
                         error.response.data?.error || 
                         'Failed to retrieve order status';
      
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
        message: 'An error occurred while retrieving order status' 
      };
    }
  }
} 

// Payment form data interface
interface PaymentFormData {
  socialUsername: string;
  email: string;
  paymentMethod: 'card' | 'paypal' | 'crypto';
  // Card payment details
  cardNumber?: string;
  expiryDate?: string;
  cvcNumber?: string;
  cardholderName?: string;
  // Crypto payment details
  cryptoType?: 'bitcoin' | 'ethereum' | 'usdc';
  // Service details
  serviceType: string;
  quality: string;
  quantity: number;
  postUrl?: string;
}

// Process Social Order Payment Function
export const ProcessSocialOrderPayment = async (paymentData: PaymentFormData) => {
  // //console.log("Process Social Order Payment Function:", paymentData);
  
  const UserToken = localStorage.getItem('userToken');
  const cleanToken = UserToken?.replace(/^"|"$/g, '');
  
  // Prepare the request payload
  const requestPayload = {
    socialUsername: paymentData.socialUsername,
    email: paymentData.email,
    paymentMethod: paymentData.paymentMethod,
    // Card payment details
    cardNumber: paymentData.cardNumber,
    expiryDate: paymentData.expiryDate,
    cvcNumber: paymentData.cvcNumber,
    cardholderName: paymentData.cardholderName,
    // Crypto payment details
    cryptoType: paymentData.cryptoType,
    // Service details
    serviceType: paymentData.serviceType,
    quality: paymentData.quality,
    quantity: paymentData.quantity,
    postUrl: paymentData.postUrl
  };
  
  // //console.log("Payment request payload being sent to backend:", requestPayload);
  
      try {
        // //console.log("Processing payment with payload:", requestPayload);
      const response = await axios.post(`${Backend_URL}/social-order-payments/process`, requestPayload, {
        headers: {
          ...(cleanToken && { Authorization: `Bearer ${cleanToken}` }),
        },
      });
    
    // //console.log("Payment processed successfully:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Process Social Order Payment Error:", error);
    
    // Handle axios error response
    if (error.response) {
      console.error("Error response data:", error.response.data);
      console.error("Error response status:", error.response.status);
      console.error("Full error response:", error.response);
      
      // Try to extract more specific error information
      const errorMessage = error.response.data?.message || 
                         error.response.data?.error || 
                         error.response.data?.detail ||
                         'Failed to process payment';
      
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
        message: 'An error occurred while processing your payment' 
      };
    }
  }
} 

// Order tracking parameters interface
interface OrderTrackingParams {
  // Filtering parameters
  status?: string;
  category?: string;
  type?: string;
  username?: string;
  dateFrom?: string;
  dateTo?: string;
  sort?: string;
  // Pagination parameters
  page?: number;
  limit?: number;
}

// Order tracking result interface
interface OrderTrackingResult {
  success: boolean;
  count?: number;
  pagination?: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
  data?: any[];
  message?: string;
}

// Track Orders Function
export const TrackOrders = async (params: OrderTrackingParams = {}): Promise<OrderTrackingResult> => {
  // //console.log("Track Orders Function:", params);
  
  const UserToken = localStorage.getItem('userToken');
  const cleanToken = UserToken?.replace(/^"|"$/g, '');
  
  // Build query parameters
  const queryParams = new URLSearchParams();
  
  // Add filtering parameters
  if (params.status) queryParams.append('status', params.status);
  if (params.category) queryParams.append('category', params.category);
  if (params.type) queryParams.append('type', params.type);
  if (params.username) queryParams.append('username', params.username);
  if (params.dateFrom) queryParams.append('dateFrom', params.dateFrom);
  if (params.dateTo) queryParams.append('dateTo', params.dateTo);
  if (params.sort) queryParams.append('sort', params.sort);
  
  // Add pagination parameters
  if (params.page) queryParams.append('page', params.page.toString());
  if (params.limit) queryParams.append('limit', params.limit.toString());
  
  const url = `${Backend_URL}/orders/user/${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
  // //console.log("Tracking orders from URL:", url);
  
  try {
    const response = await axios.get(url, {
      headers: {
        ...(cleanToken && { Authorization: `Bearer ${cleanToken}` }),
      },
    });
    
    // //console.log("Orders tracked successfully:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Track Orders Error:", error);
    
    // Handle axios error response
    if (error.response) {
      console.error("Error response data:", error.response.data);
      console.error("Error response status:", error.response.status);
      
      // Handle specific error cases
      if (error.response.status === 401) {
        return { 
          success: false, 
          message: 'Authentication failed. Please try logging in again.' 
        };
      }
      
      if (error.response.status === 404) {
        return { 
          success: false, 
          message: 'No orders found with the specified criteria.' 
        };
      }
      
      // Try to extract more specific error information
      const errorMessage = error.response.data?.message || 
                         error.response.data?.error || 
                         error.response.data?.detail ||
                         'Failed to retrieve orders';
      
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
        message: 'An error occurred while retrieving orders' 
      };
    }
  }
}

// Track Order by ID Function (for specific order tracking)
export const TrackOrderById = async (orderId: string): Promise<OrderTrackingResult> => {
  // //console.log("Track Order by ID Function:", orderId);
  
  const UserToken = localStorage.getItem('userToken');
  const cleanToken = UserToken?.replace(/^"|"$/g, '');
  
  try {
    const response = await axios.get(`${Backend_URL}/orders/user/${orderId}`, {
      headers: {
        ...(cleanToken && { Authorization: `Bearer ${cleanToken}` }),
      },
    });
    
    // //console.log("Order tracked successfully:", response.data);
    return {
      success: true,
      data: [response.data.data || response.data]
    };
  } catch (error: any) {
    console.error("Track Order by ID Error:", error);
    
    // Handle axios error response
    if (error.response) {
      console.error("Error response data:", error.response.data);
      console.error("Error response status:", error.response.status);
      
      // Handle specific error cases
      if (error.response.status === 401) {
        return { 
          success: false, 
          message: 'Authentication failed. Please try logging in again.' 
        };
      }
      
      if (error.response.status === 403) {
        return { 
          success: false, 
          message: 'Access denied. You do not have permission to access this resource.' 
        };
      }
      
      if (error.response.status === 404) {
        return { 
          success: false, 
          message: 'Order not found. Please check the order number and try again.' 
        };
      }
      
      // Try to extract more specific error information
      const errorMessage = error.response.data?.message || 
                         error.response.data?.error || 
                         error.response.data?.detail ||
                         'Failed to retrieve order';
      
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
        message: 'An error occurred while retrieving the order' 
      };
    }
  }
} 