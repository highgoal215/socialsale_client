import { Helmet } from 'react-helmet-async';
import { type SEOData } from '@/services/seo-service';

interface SEOHeadProps {
  seoData: SEOData;
  children?: React.ReactNode;
}

const SEOHead: React.FC<SEOHeadProps> = ({ seoData, children }) => {
  const {
    title,
    description,
    keywords,
    ogTitle,
    ogDescription,
    ogImage,
    canonicalUrl,
    structuredData
  } = seoData;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      
      {/* Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={ogTitle || title} />
      <meta property="og:description" content={ogDescription || description} />
      {ogImage && <meta property="og:image" content={ogImage} />}
      <meta property="og:type" content="website" />
      <meta property="og:site_name" content="Likes.IO" />
      {canonicalUrl && <meta property="og:url" content={canonicalUrl} />}
      
      {/* Twitter Card Meta Tags */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:site" content="@LikesIO" />
      <meta name="twitter:title" content={ogTitle || title} />
      <meta name="twitter:description" content={ogDescription || description} />
      {ogImage && <meta name="twitter:image" content={ogImage} />}
      
      {/* Additional SEO Meta Tags */}
      <meta name="robots" content="index, follow" />
      <meta name="googlebot" content="index, follow" />
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {structuredData}
        </script>
      )}
      
      {/* Default Organization Structured Data */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Likes.IO",
          "description": "Leading social media growth service for Instagram, TikTok, and YouTube",
          "url": "http://localhost:5005",
          "logo": "http://localhost:5005/logo.png",
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+1-555-0123",
            "contactType": "Customer Service",
            "availableLanguage": "English"
          },
          "sameAs": [
            "https://twitter.com/LikesIO",
            "https://facebook.com/LikesIO",
            "https://instagram.com/LikesIO"
          ]
        })}
      </script>
      
      {children}
    </Helmet>
  );
};

export default SEOHead; 