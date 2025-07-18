const io = require('socket.io-client');

// Configuration
const BACKEND_URL = process.env.BACKEND_URL || 'https://api.likes.io';
const TIMEOUT = 10000;

console.log('🔌 Testing WebSocket connection to:', BACKEND_URL);

// Create socket connection
const socket = io(BACKEND_URL, {
  transports: ['websocket', 'polling'],
  timeout: TIMEOUT,
  forceNew: true
});

// Connection event handlers
socket.on('connect', () => {
  console.log('✅ Connected successfully!');
  console.log('📊 Connection details:');
  console.log('   - Socket ID:', socket.id);
  console.log('   - Transport:', socket.io.engine.transport.name);
  console.log('   - Protocol:', socket.io.engine.protocol);
  
  // Test joining a user room
  socket.emit('join-user', 'test-user-123');
  console.log('👤 Joined test user room');
  
  // Disconnect after successful test
  setTimeout(() => {
    console.log('🔌 Disconnecting...');
    socket.disconnect();
    process.exit(0);
  }, 2000);
});

socket.on('connect_error', (error) => {
  console.error('❌ Connection failed:', error.message);
  console.error('🔍 Error details:', error);
  
  if (error.message.includes('CORS')) {
    console.log('💡 CORS issue detected. Check backend CORS configuration.');
  }
  
  if (error.message.includes('timeout')) {
    console.log('💡 Connection timeout. Check if backend server is running.');
  }
  
  process.exit(1);
});

socket.on('disconnect', (reason) => {
  console.log('🔌 Disconnected:', reason);
});

socket.on('error', (error) => {
  console.error('❌ Socket error:', error);
});

// Timeout handler
setTimeout(() => {
  if (!socket.connected) {
    console.error('❌ Connection timeout after', TIMEOUT, 'ms');
    console.log('💡 Possible issues:');
    console.log('   - Backend server not running');
    console.log('   - Wrong port or URL');
    console.log('   - Network connectivity issues');
    console.log('   - Firewall blocking connection');
    process.exit(1);
  }
}, TIMEOUT);

// Handle process termination
process.on('SIGINT', () => {
  console.log('\n🔌 Shutting down...');
  socket.disconnect();
  process.exit(0);
});

console.log('⏳ Attempting to connect...'); 