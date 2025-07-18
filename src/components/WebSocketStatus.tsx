import React, { useState, useEffect } from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Wifi, WifiOff, RefreshCw, AlertCircle, CheckCircle } from 'lucide-react';
import socketService from '@/services/socket-service';

interface ConnectionInfo {
  isConnected: boolean;
  reconnectAttempts: number;
  socketId: string | undefined;
  transport: string | undefined;
}

const WebSocketStatus: React.FC = () => {
  const [connectionInfo, setConnectionInfo] = useState<ConnectionInfo>({
    isConnected: false,
    reconnectAttempts: 0,
    socketId: undefined,
    transport: undefined
  });
  const [lastError, setLastError] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updateConnectionInfo = () => {
      setConnectionInfo(socketService.getConnectionInfo());
    };

    const handleConnect = () => {
      updateConnectionInfo();
      setLastError(null);
    };

    const handleDisconnect = () => {
      updateConnectionInfo();
    };

    const handleError = (error: any) => {
      setLastError(error.message || 'Connection error');
      updateConnectionInfo();
    };

    // Initial connection info
    updateConnectionInfo();

    // Subscribe to socket events
    socketService.onConnect(handleConnect);
    socketService.onDisconnect(handleDisconnect);
    socketService.onError(handleError);

    // Update connection info periodically
    const interval = setInterval(updateConnectionInfo, 2000);

    return () => {
      socketService.offConnect(handleConnect);
      socketService.offDisconnect(handleDisconnect);
      socketService.offError(handleError);
      clearInterval(interval);
    };
  }, []);

  const handleReconnect = () => {
    socketService.disconnect();
    setTimeout(() => {
      socketService.connect();
    }, 1000);
  };

  const handleToggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  if (!isVisible) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={handleToggleVisibility}
          variant="outline"
          size="sm"
          className="bg-white/80 backdrop-blur-sm border-gray-200 hover:bg-white"
        >
          <Wifi className={`h-4 w-4 mr-2 ${connectionInfo.isConnected ? 'text-green-500' : 'text-red-500'}`} />
          Socket Status
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 w-80">
      <Card className="bg-white/95 backdrop-blur-sm border-gray-200 shadow-lg">
        <CardHeader className="pb-3">
          <div className="flex items-center justify-between">
            <CardTitle className="text-sm font-semibold">WebSocket Status</CardTitle>
            <Button
              onClick={handleToggleVisibility}
              variant="ghost"
              size="sm"
              className="h-6 w-6 p-0"
            >
              ×
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {/* Connection Status */}
          <div className="flex items-center justify-between">
            <span className="text-sm text-gray-600">Status:</span>
            <Badge 
              variant={connectionInfo.isConnected ? "default" : "destructive"}
              className="text-xs"
            >
              {connectionInfo.isConnected ? (
                <>
                  <CheckCircle className="h-3 w-3 mr-1" />
                  Connected
                </>
              ) : (
                <>
                  <WifiOff className="h-3 w-3 mr-1" />
                  Disconnected
                </>
              )}
            </Badge>
          </div>

          {/* Socket ID */}
          {connectionInfo.socketId && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Socket ID:</span>
              <span className="text-xs text-gray-500 font-mono">
                {connectionInfo.socketId.slice(0, 8)}...
              </span>
            </div>
          )}

          {/* Transport */}
          {connectionInfo.transport && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Transport:</span>
              <Badge variant="outline" className="text-xs">
                {connectionInfo.transport}
              </Badge>
            </div>
          )}

          {/* Reconnect Attempts */}
          {connectionInfo.reconnectAttempts > 0 && (
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600">Reconnect Attempts:</span>
              <span className="text-xs text-orange-600">
                {connectionInfo.reconnectAttempts}
              </span>
            </div>
          )}

          {/* Error Display */}
          {lastError && (
            <Alert className="border-red-200 bg-red-50">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-xs text-red-800">
                {lastError}
              </AlertDescription>
            </Alert>
          )}

          {/* Actions */}
          <div className="flex gap-2 pt-2">
            <Button
              onClick={handleReconnect}
              size="sm"
              variant="outline"
              className="flex-1"
            >
              <RefreshCw className="h-3 w-3 mr-1" />
              Reconnect
            </Button>
            <Button
              onClick={() => socketService.connect()}
              size="sm"
              variant="outline"
              className="flex-1"
            >
              <Wifi className="h-3 w-3 mr-1" />
              Connect
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default WebSocketStatus; 