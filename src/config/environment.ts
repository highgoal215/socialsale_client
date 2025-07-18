// Environment configuration
export const config = {
  // Backend API URL
  backendUrl: import.meta.env.VITE_BACKEND_URL || 'https://api.likes.io',
  
  // Environment
  nodeEnv: import.meta.env.VITE_NODE_ENV || 'development',
  
  // Socket Configuration
  socketEnabled: import.meta.env.VITE_SOCKET_ENABLED !== 'false',
  socketTimeout: parseInt(import.meta.env.VITE_SOCKET_TIMEOUT || '10000'),
  socketReconnectAttempts: parseInt(import.meta.env.VITE_SOCKET_RECONNECT_ATTEMPTS || '5'),
  socketReconnectDelay: parseInt(import.meta.env.VITE_SOCKET_RECONNECT_DELAY || '1000'),
  
  // Feature Flags
  enableWebSocketDebug: import.meta.env.VITE_ENABLE_WEBSOCKET_DEBUG === 'true',
  enableNotifications: import.meta.env.VITE_ENABLE_NOTIFICATIONS !== 'false',
  
  // Development flags
  isDevelopment: import.meta.env.DEV,
  isProduction: import.meta.env.PROD,
};

// Validate configuration
export const validateConfig = () => {
  const errors: string[] = [];
  
  if (!config.backendUrl) {
    errors.push('VITE_BACKEND_URL is required');
  }
  
  if (config.socketTimeout < 1000) {
    errors.push('VITE_SOCKET_TIMEOUT must be at least 1000ms');
  }
  
  if (config.socketReconnectAttempts < 1) {
    errors.push('VITE_SOCKET_RECONNECT_ATTEMPTS must be at least 1');
  }
  
  if (errors.length > 0) {
    console.error('Configuration errors:', errors);
    return false;
  }
  
  return true;
};

export default config; 