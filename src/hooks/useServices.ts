import { useState, useEffect } from 'react';
import { GetServices, ServiceQueryParams, ServiceResponse } from '@/api/service';

interface UseServicesReturn {
  services: any[];
  loading: boolean;
  error: string | null;
  refetch: () => void;
}

export const useServices = (params?: ServiceQueryParams): UseServicesReturn => {
  const [services, setServices] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchServices = async () => {
    try {
      setLoading(true);
      setError(null);
      const response: ServiceResponse = await GetServices(params);
      setServices(response.data || []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch services');
      setServices([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchServices();
  }, [params?.type, params?.category, params?.quality, params?.popular, params?.active]);

  return {
    services,
    loading,
    error,
    refetch: fetchServices
  };
}; 