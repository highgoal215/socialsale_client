import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { getSEOSetting, getCachedSEOSetting, type SEOData } from '@/services/seo-service';

// Route to pageId mapping
const routeToPageId: Record<string, string> = {
  '/': 'home',
  '/about': 'about',
  '/contact': 'contact',
  '/blog': 'blog',
  '/reviews': 'reviews',
  '/faq': 'faq',
  '/privacy': 'privacy',
  '/terms': 'terms',
  '/buy-instagram-followers': 'instagram-followers',
  '/buy-instagram-likes': 'instagram-likes',
  '/buy-instagram-views': 'instagram-views',
  '/buy-instagram-comments': 'instagram-comments',
  '/buy-tiktok-followers': 'tiktok-followers',
  '/buy-tiktok-likes': 'tiktok-likes',
  '/buy-tiktok-views': 'tiktok-views',
  '/buy-tiktok-comments': 'tiktok-comments',
  '/buy-youtube-subscribers': 'youtube-subscribers',
  '/buy-youtube-likes': 'youtube-likes',
  '/buy-youtube-views': 'youtube-views',
  '/buy-youtube-comments': 'youtube-comments',
};

// Default SEO fallback
const defaultSEO: SEOData = {
  title: 'Likes.IO - #1 Social Media Growth Service | Instagram, TikTok & YouTube',
  description: 'Boost your social media presence with Likes.IO! Get real Instagram followers, TikTok views, YouTube subscribers & more. Trusted by 100K+ creators.',
  keywords: 'Instagram followers, TikTok views, YouTube subscribers, social media growth, buy followers, increase engagement, social media marketing',
  ogTitle: 'Likes.IO - #1 Social Media Growth Service | Real Followers & Subscribers',
  ogDescription: 'Grow your Instagram, TikTok & YouTube with real followers, subscribers, likes & views. Trusted by 100K+ creators. Safe, affordable & instant results.',
  ogImage: 'https://api.likes.io/og-image.png',
  // ogImage: 'https://api.likes.io/og-image.png',
  canonicalUrl: 'https://api.likes.io', // Update with your production URL
  // canonicalUrl: 'https://api.likes.io',
};

export const useSEO = (customPageId?: string) => {
  const location = useLocation();
  const [seoData, setSeoData] = useState<SEOData>(defaultSEO);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const updateSEO = async () => {
      setIsLoading(true);
      
      // Determine pageId
      let pageId = customPageId;
      if (!pageId) {
        pageId = routeToPageId[location.pathname];
      }

      if (!pageId) {
        // Use default SEO for unknown routes
        // //console.log('No pageId found for route:', location.pathname, '- using default SEO');
        setSeoData(defaultSEO);
        setIsLoading(false);
        return;
      }

      // //console.log('Updating SEO for pageId:', pageId, 'route:', location.pathname);

      // Check cache first
      const cachedData = getCachedSEOSetting(pageId);
      if (cachedData) {
        // //console.log('Using cached SEO data for:', pageId);
        setSeoData(cachedData);
        setIsLoading(false);
        return;
      }

      // Fetch from API
      try {
        const data = await getSEOSetting(pageId);
        if (data) {
          // //console.log('Successfully loaded SEO data for:', pageId);
          setSeoData(data);
        } else {
          // Fallback to default SEO if no data found
          // //console.log('No SEO data found for:', pageId, '- using default SEO');
          setSeoData(defaultSEO);
        }
      } catch (error) {
        console.error('Error fetching SEO data for pageId:', pageId, error);
        setSeoData(defaultSEO);
      } finally {
        setIsLoading(false);
      }
    };

    updateSEO();
  }, [location.pathname, customPageId]);

  return { seoData, isLoading };
};

// Hook for blog posts with dynamic SEO
export const useBlogSEO = (blogPost?: { title: string; excerpt?: string; content: string; author: string; createdAt: string; tags?: string[] }) => {
  const { seoData: baseSEO } = useSEO('blog');
  const [blogSEO, setBlogSEO] = useState<SEOData>(baseSEO);

  useEffect(() => {
    if (blogPost) {
      // Create dynamic SEO for blog post
      const dynamicSEO: SEOData = {
        title: `${blogPost.title} | Likes.IO Blog`,
        description: blogPost.excerpt || blogPost.content.substring(0, 150) + '...',
        keywords: blogPost.tags?.join(', ') || 'social media growth, Instagram, TikTok, YouTube',
        ogTitle: blogPost.title,
        ogDescription: blogPost.excerpt || blogPost.content.substring(0, 150) + '...',
        ogImage: 'https://api.likes.io/blog-og.jpg',
        canonicalUrl: `https://api.likes.io/blog/${blogPost.title.toLowerCase().replace(/\s+/g, '-')}`,
        structuredData: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "headline": blogPost.title,
          "description": blogPost.excerpt || blogPost.content.substring(0, 150),
          "author": {
            "@type": "Person",
            "name": blogPost.author
          },
          "datePublished": blogPost.createdAt,
          "dateModified": blogPost.createdAt,
          "publisher": {
            "@type": "Organization",
            "name": "Likes.IO",
            "logo": {
              "@type": "ImageObject",
              "url": "https://api.likes.io/logo.png"
            }
          },
          "mainEntityOfPage": {
            "@type": "WebPage",
            "@id": `https://api.likes.io/blog/${blogPost.title.toLowerCase().replace(/\s+/g, '-')}`
          }
        })
      };
      setBlogSEO(dynamicSEO);
    } else {
      setBlogSEO(baseSEO);
    }
  }, [blogPost, baseSEO]);

  return { seoData: blogSEO, isLoading: false };
}; 