import { GetUserOrders } from '@/api/order';

export interface UserOrder {
  _id: string;
  orderNumber: string;
  serviceType: 'followers' | 'likes' | 'views' | 'comments';
  quality: 'general' | 'premium';
  quantity: number;
  price: number;
  status: 'pending' | 'processing' | 'completed' | 'partial' | 'canceled' | 'failed';
  paymentStatus: 'pending' | 'completed' | 'failed' | 'refunded';
  socialUsername: string;
  postUrl?: string;
  createdAt: string;
  updatedAt: string;
  completedAt?: string;
  category?: string;
}

export interface OrdersResponse {
  success: boolean;
  count: number;
  pagination: {
    page: number;
    limit: number;
    total: number;
    pages: number;
  };
  data: UserOrder[];
  message?: string;
}

export const fetchUserOrders = async (): Promise<OrdersResponse> => {
  try {
    const response = await GetUserOrders();
    
    if (response.success) {
      return {
        success: true,
        count: response.count || 0,
        pagination: response.pagination || { page: 1, limit: 10, total: 0, pages: 0 },
        data: response.data || []
      };
    } else {
      return {
        success: false,
        count: 0,
        pagination: { page: 1, limit: 10, total: 0, pages: 0 },
        data: [],
        message: response.message || 'Failed to fetch orders'
      };
    }
  } catch (error) {
    console.error('Error fetching user orders:', error);
    return {
      success: false,
      count: 0,
      pagination: { page: 1, limit: 10, total: 0, pages: 0 },
      data: [],
      message: 'An error occurred while fetching orders'
    };
  }
};

// Helper function to get service display name
export const getServiceDisplayName = (serviceType: string, quality: string): string => {
  const qualityText = quality === 'premium' ? 'Premium' : 'General';
  
  switch (serviceType) {
    case 'followers':
      return `${qualityText} Followers`;
    case 'likes':
      return `${qualityText} Likes`;
    case 'views':
      return `${qualityText} Views`;
    case 'comments':
      return `${qualityText} Comments`;
    default:
      return `${qualityText} ${serviceType}`;
  }
};

// Helper function to get status display name
export const getStatusDisplayName = (status: string): string => {
  switch (status) {
    case 'pending':
      return 'Pending';
    case 'processing':
      return 'Processing';
    case 'completed':
      return 'Completed';
    case 'partial':
      return 'Partial';
    case 'canceled':
      return 'Canceled';
    case 'failed':
      return 'Failed';
    default:
      return status;
  }
};

// Helper function to get status color class
export const getStatusColorClass = (status: string): string => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'processing':
      return 'bg-blue-100 text-blue-800';
    case 'completed':
      return 'bg-green-100 text-green-800';
    case 'partial':
      return 'bg-orange-100 text-orange-800';
    case 'canceled':
      return 'bg-red-100 text-red-800';
    case 'failed':
      return 'bg-gray-100 text-gray-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
}; 