import { getSEOSetting, getBulkSEOSettings } from '../services/seo-service';

export const testSEOIntegration = async () => {
  //console.log('🧪 Testing SEO Integration...');
  
  try {
    // Test single SEO setting fetch
    //console.log('\n📄 Testing single SEO setting fetch...');
    const homeSEO = await getSEOSetting('home');
    if (homeSEO) {
      //console.log('✅ Home page SEO loaded successfully');
      //console.log('   Title:', homeSEO.title);
      //console.log('   Description:', homeSEO.description);
    } else {
      //console.log('❌ Home page SEO not found or inactive');
    }

    // Test bulk SEO settings fetch
    //console.log('\n📚 Testing bulk SEO settings fetch...');
    const bulkSEO = await getBulkSEOSettings(['home', 'about', 'contact']);
    if (bulkSEO.size > 0) {
      //console.log(`✅ Bulk SEO loaded successfully (${bulkSEO.size} pages)`);
      bulkSEO.forEach((seo, pageId) => {
        //console.log(`   ${pageId}: ${seo.title}`);
      });
    } else {
      //console.log('❌ Bulk SEO not found or all inactive');
    }

    // Test non-existent page
    //console.log('\n🔍 Testing non-existent page...');
    const nonExistentSEO = await getSEOSetting('non-existent-page');
    if (!nonExistentSEO) {
      //console.log('✅ Correctly handled non-existent page');
    } else {
      //console.log('❌ Unexpectedly found SEO for non-existent page');
    }

    //console.log('\n🎉 SEO Integration Test Completed!');
    
  } catch (error) {
    console.error('❌ SEO Integration Test Failed:', error);
  }
};

export const validateMetaTags = () => {
  //console.log('🔍 Validating Meta Tags...\n');

  const metaTags = {
    title: document.title,
    description: document.querySelector('meta[name="description"]')?.getAttribute('content'),
    ogTitle: document.querySelector('meta[property="og:title"]')?.getAttribute('content'),
    ogDescription: document.querySelector('meta[property="og:description"]')?.getAttribute('content'),
    canonical: document.querySelector('link[rel="canonical"]')?.getAttribute('href'),
  };

  //console.log('Current Meta Tags:');
  Object.entries(metaTags).forEach(([key, value]) => {
    if (value) {
      //console.log(`   ${key}: ${value}`);
    } else {
      //console.log(`   ${key}: ❌ Missing`);
    }
  });

  return metaTags;
};

// Function to check if React Helmet is working
export const checkHelmetIntegration = () => {
  //console.log('🎯 Checking React Helmet Integration...\n');

  const helmet = document.querySelector('[data-react-helmet]');
  if (helmet) {
    //console.log('✅ React Helmet is properly integrated');
  } else {
    //console.log('❌ React Helmet integration not found');
  }

  return !!helmet;
}; 