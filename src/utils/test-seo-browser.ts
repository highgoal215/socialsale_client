// Browser-based SEO test utility
// Run this in the browser console to test SEO integration

export const testSEOInBrowser = () => {
  //console.log('🧪 Testing SEO Integration in Browser...\n');

  // Test 1: Check if React Helmet is working
  //console.log('1. Checking React Helmet integration...');
  const helmetElements = document.querySelectorAll('[data-react-helmet]');
  if (helmetElements.length > 0) {
    //console.log('✅ React Helmet is properly integrated');
  } else {
    //console.log('❌ React Helmet integration not found');
  }

  // Test 2: Check meta tags
  //console.log('\n2. Checking meta tags...');
  const metaTags = {
    title: document.title,
    description: document.querySelector('meta[name="description"]')?.getAttribute('content'),
    ogTitle: document.querySelector('meta[property="og:title"]')?.getAttribute('content'),
    ogDescription: document.querySelector('meta[property="og:description"]')?.getAttribute('content'),
    ogImage: document.querySelector('meta[property="og:image"]')?.getAttribute('content'),
    canonical: document.querySelector('link[rel="canonical"]')?.getAttribute('href'),
    keywords: document.querySelector('meta[name="keywords"]')?.getAttribute('content'),
  };

  //console.log('Current Meta Tags:');
  Object.entries(metaTags).forEach(([key, value]) => {
    if (value) {
      //console.log(`   ✅ ${key}: ${value}`);
    } else {
      //console.log(`   ❌ ${key}: Missing`);
    }
  });

  // Test 3: Check structured data
  //console.log('\n3. Checking structured data...');
  const structuredData = document.querySelectorAll('script[type="application/ld+json"]');
  if (structuredData.length > 0) {
    //console.log(`✅ Found ${structuredData.length} structured data script(s)`);
    structuredData.forEach((script, index) => {
      try {
        const data = JSON.parse(script.textContent || '');
        //console.log(`   Script ${index + 1}: ${data['@type'] || 'Unknown type'}`);
      } catch (e) {
        //console.log(`   Script ${index + 1}: Invalid JSON`);
      }
    });
  } else {
    //console.log('❌ No structured data found');
  }

  // Test 4: Check current route mapping
  //console.log('\n4. Checking current route...');
  const currentPath = window.location.pathname;
  //console.log(`   Current path: ${currentPath}`);
  
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

  const expectedPageId = routeToPageId[currentPath];
  if (expectedPageId) {
    //console.log(`   Expected SEO page ID: ${expectedPageId}`);
  } else {
    //console.log(`   ❌ No SEO mapping found for path: ${currentPath}`);
  }

  // Test 5: Performance check
  //console.log('\n5. Performance check...');
  const startTime = performance.now();
  
  // Simulate SEO data fetch
  setTimeout(() => {
    const endTime = performance.now();
    const duration = endTime - startTime;
    //console.log(`   SEO data fetch simulation: ${duration.toFixed(2)}ms`);
    
    if (duration < 100) {
      //console.log('   ✅ SEO performance is good');
    } else {
      //console.log('   ⚠️ SEO performance could be improved');
    }
  }, 50);

  //console.log('\n🎉 SEO Browser Test Complete!');
  //console.log('\nTo test SEO changes:');
  //console.log('1. Navigate to different pages');
  //console.log('2. Check browser dev tools > Elements tab');
  //console.log('3. Look for updated meta tags in <head>');
  //console.log('4. Use browser dev tools > Network tab to see API calls');

  return metaTags;
};

// Auto-run test when imported
if (typeof window !== 'undefined') {
  // Only run in browser environment
  setTimeout(() => {
    //console.log('🔍 Auto-running SEO test...');
    testSEOInBrowser();
  }, 1000);
} 