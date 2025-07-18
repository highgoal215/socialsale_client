import axios from "axios";

// const Backend_URL = import.meta.env.BACKEND_URL || 'http://localhost:5005/api';
const Backend_URL = import.meta.env.BACKEND_URL || 'http://localhost:5005/api';

interface ServiceQueryParams {
  type?: string;
  quality?: string;
  popular?: boolean;
  active?: boolean;
  category?: string;
}

interface ServiceResponse {
  success: boolean;
  count: number;
  data: any[];
}

const GetServices = async (params?: ServiceQueryParams): Promise<ServiceResponse> => {
    const queryParams = new URLSearchParams();
    
    if (params) {
      if (params.type) queryParams.append('type', params.type);
      if (params.quality) queryParams.append('quality', params.quality);
      if (params.category) queryParams.append('category', params.category);
      if (params.popular !== undefined) queryParams.append('popular', params.popular.toString());
      if (params.active !== undefined) queryParams.append('active', params.active.toString());
    }
    
    const url = `${Backend_URL}/services${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    
    try {
        // console.log('Fetching services from:', url);
        const response = await axios.get(url);
        return response.data;
    } catch (error: any) {
        console.error('Error fetching services:', error.response?.status, error.response?.data);
        
        // If /services fails, try /service as fallback
        if (error.response?.status === 404) {
            const fallbackUrl = `${Backend_URL}/service${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
            // console.log('Trying fallback URL:', fallbackUrl);
            try {
                const fallbackResponse = await axios.get(fallbackUrl);
                return fallbackResponse.data;
            } catch (fallbackError: any) {
                console.error('Fallback URL also failed:', fallbackError.response?.status);
                throw fallbackError;
            }
        }
        
        throw error;
    }
}

export { GetServices };
export type { ServiceQueryParams, ServiceResponse };