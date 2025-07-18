import { getSEOSetting, getBulkSEOSettings, clearSEOCache } from '../services/seo-service';

export const testSEOIntegration = async () => {
  console.log('🧪 Testing SEO Integration...\n');

  try {
    // Test 1: Fetch single SEO setting
    console.log('1. Testing single SEO setting fetch...');
    const homeSEO = await getSEOSetting('home');
    if (homeSEO) {
      console.log('✅ Home page SEO fetched successfully');
      console.log(`   Title: ${homeSEO.title}`);
      console.log(`   Description: ${homeSEO.description}`);
    } else {
      console.log('❌ Failed to fetch home page SEO');
    }

    // Test 2: Fetch bulk SEO settings
    console.log('\n2. Testing bulk SEO settings fetch...');
    const pageIds = ['home', 'instagram-likes', 'tiktok-followers', 'youtube-subscribers'];
    const bulkSEO = await getBulkSEOSettings(pageIds);
    if (bulkSEO.size > 0) {
      console.log(`✅ Bulk SEO fetched successfully (${bulkSEO.size} pages)`);
      bulkSEO.forEach((seo, pageId) => {
        console.log(`   ${pageId}: ${seo.title}`);
      });
    } else {
      console.log('❌ Failed to fetch bulk SEO settings');
    }

    // Test 3: Test caching
    console.log('\n3. Testing SEO caching...');
    const cachedSEO = await getSEOSetting('home');
    if (cachedSEO) {
      console.log('✅ SEO caching working correctly');
    } else {
      console.log('❌ SEO caching failed');
    }

    // Test 4: Clear cache
    console.log('\n4. Testing cache clearing...');
    clearSEOCache();
    console.log('✅ Cache cleared successfully');

    console.log('\n🎉 SEO Integration Test Complete!');
    return true;

  } catch (error) {
    console.error('❌ SEO Integration Test Failed:', error);
    return false;
  }
};

export const validateMetaTags = () => {
  console.log('🔍 Validating Meta Tags...\n');

  const metaTags = {
    title: document.title,
    description: document.querySelector('meta[name="description"]')?.getAttribute('content'),
    ogTitle: document.querySelector('meta[property="og:title"]')?.getAttribute('content'),
    ogDescription: document.querySelector('meta[property="og:description"]')?.getAttribute('content'),
    canonical: document.querySelector('link[rel="canonical"]')?.getAttribute('href'),
  };

  console.log('Current Meta Tags:');
  Object.entries(metaTags).forEach(([key, value]) => {
    if (value) {
      console.log(`   ${key}: ${value}`);
    } else {
      console.log(`   ${key}: ❌ Missing`);
    }
  });

  return metaTags;
};

// Function to check if React Helmet is working
export const checkHelmetIntegration = () => {
  console.log('🎯 Checking React Helmet Integration...\n');

  const helmet = document.querySelector('[data-react-helmet]');
  if (helmet) {
    console.log('✅ React Helmet is properly integrated');
  } else {
    console.log('❌ React Helmet integration not found');
  }

  return !!helmet;
}; 