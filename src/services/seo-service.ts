import axios from 'axios';

const Backend_URL = import.meta.env.VITE_BACKEND_URL || 'https://api.likes.io/api';

export interface SEOSetting {
  _id: string;
  pageId: string;
  title: string;
  description: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  canonicalUrl?: string;
  structuredData?: string;
  isActive: boolean;
  lastUpdated: string;
}

export interface SEOData {
  title: string;
  description: string;
  keywords?: string;
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  canonicalUrl?: string;
  structuredData?: string;
}

// Cache for SEO settings to avoid repeated API calls
const seoCache = new Map<string, SEOSetting>();

export const getSEOSetting = async (pageId: string): Promise<SEOData | null> => {
  try {
    // Check cache first
    if (seoCache.has(pageId)) {
      const cached = seoCache.get(pageId);
      if (cached && cached.isActive) {
        return {
          title: cached.title,
          description: cached.description,
          keywords: cached.keywords,
          ogTitle: cached.ogTitle,
          ogDescription: cached.ogDescription,
          ogImage: cached.ogImage,
          canonicalUrl: cached.canonicalUrl,
          structuredData: cached.structuredData
        };
      }
    }

    // Fetch from API
    const response = await axios.get(`${Backend_URL}/seo-settings/${pageId}`);
    
    if (response.data.success && response.data.data) {
      const seoSetting = response.data.data;
      
      // Cache the result
      seoCache.set(pageId, seoSetting);
      
      if (seoSetting.isActive) {
        return {
          title: seoSetting.title,
          description: seoSetting.description,
          keywords: seoSetting.keywords,
          ogTitle: seoSetting.ogTitle,
          ogDescription: seoSetting.ogDescription,
          ogImage: seoSetting.ogImage,
          canonicalUrl: seoSetting.canonicalUrl,
          structuredData: seoSetting.structuredData
        };
      }
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching SEO settings:', error);
    return null;
  }
};

export const getBulkSEOSettings = async (pageIds: string[]): Promise<Map<string, SEOData>> => {
  try {
    const response = await axios.post(`${Backend_URL}/seo-settings/bulk`, { pageIds });
    
    if (response.data.success && response.data.data) {
      const seoSettings = response.data.data;
      const result = new Map<string, SEOData>();
      
      seoSettings.forEach((setting: SEOSetting) => {
        if (setting.isActive) {
          // Cache each setting
          seoCache.set(setting.pageId, setting);
          
          result.set(setting.pageId, {
            title: setting.title,
            description: setting.description,
            keywords: setting.keywords,
            ogTitle: setting.ogTitle,
            ogDescription: setting.ogDescription,
            ogImage: setting.ogImage,
            canonicalUrl: setting.canonicalUrl,
            structuredData: setting.structuredData
          });
        }
      });
      
      return result;
    }
    
    return new Map();
  } catch (error) {
    console.error('Error fetching bulk SEO settings:', error);
    return new Map();
  }
};

export const clearSEOCache = () => {
  seoCache.clear();
};

export const getCachedSEOSetting = (pageId: string): SEOData | null => {
  const cached = seoCache.get(pageId);
  if (cached && cached.isActive) {
    return {
      title: cached.title,
      description: cached.description,
      keywords: cached.keywords,
      ogTitle: cached.ogTitle,
      ogDescription: cached.ogDescription,
      ogImage: cached.ogImage,
      canonicalUrl: cached.canonicalUrl,
      structuredData: cached.structuredData
    };
  }
  return null;
}; 