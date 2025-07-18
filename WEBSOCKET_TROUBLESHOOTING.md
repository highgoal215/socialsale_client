# WebSocket Connection Troubleshooting Guide

## Overview
This guide helps resolve WebSocket connection issues between the client and backend server.

## Common Issues and Solutions

### 1. WebSocket Connection Failed

**Error**: `WebSocket connection to 'ws://localhost:5005/socket.io/' failed`

**Causes**:
- Backend server not running
- Wrong port configuration
- CORS issues
- Network connectivity problems

**Solutions**:

#### A. Verify Backend Server
```bash
# Check if backend is running on port 5005
curl https://api.likes.io/api/health

# Expected response:
{
  "status": "OK",
  "timestamp": "2024-01-01T00:00:00.000Z",
  "uptime": 123.456,
  "environment": "development"
}
```

#### B. Check Port Configuration
- Backend should run on port 5005
- Client should run on port 9000
- Verify in `vite.config.ts` and `server.js`

#### C. CORS Configuration
Ensure backend CORS includes client origin:
```javascript
// In server.js
cors: {
  origin: [
    "http://localhost:9000",  // Client port
    "http://localhost:5173",  // Vite default
    "http://localhost:3000"   // Alternative
  ],
  credentials: true
}
```

### 2. Socket Transport Error

**Error**: `Socket connection error: TransportError: websocket error`

**Causes**:
- WebSocket transport not supported
- Proxy/firewall blocking WebSocket
- SSL/TLS issues

**Solutions**:

#### A. Enable Fallback Transport
The socket service automatically falls back to polling if WebSocket fails:
```javascript
// In socket-service.ts
transports: ['websocket', 'polling']
```

#### B. Check Network Configuration
- Disable VPN if using one
- Check firewall settings
- Try different network

#### C. Use HTTP Instead of HTTPS in Development
```javascript
// In environment.ts
backendUrl: 'https://api.likes.io'  // Not https
```

### 3. 404 Not Found Error

**Error**: `404 Error: User attempted to access non-existent route: /notifications`

**Cause**: Missing route in client routing configuration

**Solution**: Route has been added to `App.tsx`:
```javascript
<Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
```

## Debugging Tools

### 1. WebSocket Status Component
A debug component is available in the bottom-right corner showing:
- Connection status
- Socket ID
- Transport type
- Reconnect attempts
- Error messages

### 2. Browser Developer Tools
1. Open Developer Tools (F12)
2. Go to Network tab
3. Filter by "WS" (WebSocket)
4. Check for connection attempts and errors

### 3. Console Logging
Enable debug logging by setting environment variable:
```bash
VITE_ENABLE_WEBSOCKET_DEBUG=true
```

## Environment Configuration

### Required Environment Variables
```bash
# Backend URL
VITE_BACKEND_URL=https://api.likes.io

# Socket Configuration
VITE_SOCKET_ENABLED=true
VITE_SOCKET_TIMEOUT=10000
VITE_SOCKET_RECONNECT_ATTEMPTS=5
VITE_SOCKET_RECONNECT_DELAY=1000

# Debug
VITE_ENABLE_WEBSOCKET_DEBUG=true
```

### Configuration Validation
The app validates configuration on startup. Check console for errors.

## Testing Connection

### 1. Manual Connection Test
```javascript
// In browser console
import socketService from './src/services/socket-service';
socketService.connect();
//console.log(socketService.getConnectionInfo());
```

### 2. Backend Health Check
```bash
curl https://api.likes.io/api/health
```

### 3. Socket.IO Test
```bash
# Install socket.io-client globally
npm install -g socket.io-client

# Test connection
node -e "
const io = require('socket.io-client');
const socket = io('https://api.likes.io');
socket.on('connect', () => //console.log('Connected:', socket.id));
socket.on('connect_error', (err) => //console.log('Error:', err));
"
```

## Common Fixes

### 1. Restart Services
```bash
# Stop all services
# Start backend first
cd socialsale_backend
npm start

# Start client
cd socialsale_client
npm run dev
```

### 2. Clear Browser Cache
- Hard refresh (Ctrl+Shift+R)
- Clear browser cache
- Try incognito/private mode

### 3. Check Port Availability
```bash
# Check if port 5005 is in use
netstat -an | grep 5005

# Kill process if needed
lsof -ti:5005 | xargs kill -9
```

### 4. Update Dependencies
```bash
# Update socket.io-client
npm update socket.io-client

# Check for version conflicts
npm ls socket.io-client
```

## Production Considerations

### 1. SSL/TLS
- Use `wss://` instead of `ws://` in production
- Ensure SSL certificates are valid
- Configure reverse proxy correctly

### 2. Load Balancing
- Ensure sticky sessions for WebSocket connections
- Configure load balancer for WebSocket support

### 3. Monitoring
- Monitor WebSocket connection count
- Set up alerts for connection failures
- Log connection events

## Support

If issues persist:
1. Check browser console for detailed errors
2. Verify backend logs for connection attempts
3. Test with different browsers
4. Check network connectivity
5. Review firewall/proxy settings

## Quick Fix Checklist

- [ ] Backend server running on port 5005
- [ ] Client running on port 9000
- [ ] CORS configured correctly
- [ ] No firewall blocking connections
- [ ] Environment variables set correctly
- [ ] Browser cache cleared
- [ ] Dependencies up to date
- [ ] Network connectivity stable 