const axios = require('axios');

const BACKEND_URL = 'http://localhost:5005/api';

async function testReviewIntegration() {
  console.log('🧪 Testing Review System Integration...\n');

  try {
    // Test 1: Health check
    console.log('1. Testing backend health...');
    const healthResponse = await axios.get(`${BACKEND_URL}/health`);
    console.log('✅ Backend is running:', healthResponse.data.status);
    console.log('   Environment:', healthResponse.data.environment);
    console.log('   Uptime:', Math.round(healthResponse.data.uptime), 'seconds\n');

    // Test 2: LeaveReview API health
    console.log('2. Testing LeaveReview API health...');
    const reviewHealthResponse = await axios.get(`${BACKEND_URL}/leavereview/health`);
    console.log('✅ LeaveReview API is working:', reviewHealthResponse.data.message);
    console.log('   Timestamp:', reviewHealthResponse.data.timestamp, '\n');

    // Test 3: Get public reviews
    console.log('3. Testing public reviews endpoint...');
    const publicReviewsResponse = await axios.get(`${BACKEND_URL}/leavereview/public`);
    console.log('✅ Public reviews endpoint working');
    console.log('   Reviews found:', publicReviewsResponse.data.count || 0);
    console.log('   Success:', publicReviewsResponse.data.success, '\n');

    // Test 4: Submit a test review
    console.log('4. Testing review submission...');
    const testReview = {
      username: 'Test User',
      email: 'test@example.com',
      serviceUsed: 'Instagram Followers',
      rating: 5,
      reviewTitle: 'Great Service!',
      content: 'This is a test review to verify the integration is working properly.'
    };

    const submitResponse = await axios.post(`${BACKEND_URL}/leavereview`, testReview);
    console.log('✅ Review submission successful');
    console.log('   Review ID:', submitResponse.data.data._id);
    console.log('   Status:', submitResponse.data.data.status);
    console.log('   Message:', submitResponse.data.message, '\n');

    // Test 5: Vote for helpful review
    console.log('5. Testing helpful vote...');
    const reviewId = submitResponse.data.data._id;
    const voteResponse = await axios.put(`${BACKEND_URL}/leavereview/${reviewId}/helpful`);
    console.log('✅ Helpful vote successful');
    console.log('   Helpful votes:', voteResponse.data.data.helpfulVotes);
    console.log('   Message:', voteResponse.data.message, '\n');

    console.log('🎉 All tests passed! Review system integration is working correctly.');
    console.log('\n📝 Summary:');
    console.log('   - Backend server: ✅ Running');
    console.log('   - LeaveReview API: ✅ Working');
    console.log('   - Public reviews: ✅ Accessible');
    console.log('   - Review submission: ✅ Functional');
    console.log('   - Helpful voting: ✅ Working');

  } catch (error) {
    console.error('❌ Test failed:', error.message);
    
    if (error.response) {
      console.error('   Status:', error.response.status);
      console.error('   Data:', error.response.data);
    }
    
    console.log('\n🔧 Troubleshooting:');
    console.log('   1. Make sure the backend server is running on port 5005');
    console.log('   2. Check if MongoDB is connected');
    console.log('   3. Verify all required environment variables are set');
    console.log('   4. Check the server logs for any errors');
  }
}

// Run the test
testReviewIntegration(); 