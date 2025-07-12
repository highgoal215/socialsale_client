import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useNotificationContext } from '@/contexts/NotificationContext';
import { useToast } from '@/hooks/use-toast';
import { Bell, RefreshCw, CheckCircle, AlertCircle } from 'lucide-react';

const NotificationTest: React.FC = () => {
  const { 
    notifications, 
    unreadCount, 
    loading, 
    error, 
    fetchNotifications, 
    refreshUnreadCount 
  } = useNotificationContext();
  const { toast } = useToast();
  const [testing, setTesting] = useState(false);

  const handleTestToast = () => {
    toast({
      title: "Test Notification",
      description: "This is a test toast notification to verify the system is working.",
      duration: 5000,
    });
  };

  const handleRefreshData = async () => {
    setTesting(true);
    try {
      await Promise.all([
        fetchNotifications(),
        refreshUnreadCount()
      ]);
      toast({
        title: "Success",
        description: "Notification data refreshed successfully!",
      });
    } catch (err) {
      toast({
        title: "Error",
        description: "Failed to refresh notification data.",
        variant: "destructive",
      });
    } finally {
      setTesting(false);
    }
  };

  const handleTestRealTime = () => {
    toast({
      title: "Real-time Test",
      description: "This simulates a real-time notification. Check if it appears in your notification list!",
      duration: 8000,
    });
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Bell className="h-5 w-5" />
          Notification System Test
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Status Display */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Connection Status:</span>
            <Badge variant={error ? "destructive" : "default"}>
              {error ? "Error" : "Connected"}
            </Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Unread Count:</span>
            <Badge variant="secondary">{unreadCount}</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Total Notifications:</span>
            <Badge variant="outline">{notifications.length}</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Loading State:</span>
            <Badge variant={loading ? "default" : "secondary"}>
              {loading ? "Loading..." : "Idle"}
            </Badge>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-md">
            <div className="flex items-center gap-2">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <span className="text-sm text-red-800">{error}</span>
            </div>
          </div>
        )}

        {/* Test Buttons */}
        <div className="space-y-2">
          <Button 
            onClick={handleRefreshData} 
            disabled={testing}
            className="w-full"
            variant="outline"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${testing ? 'animate-spin' : ''}`} />
            {testing ? 'Refreshing...' : 'Refresh Data'}
          </Button>
          
          <Button 
            onClick={handleTestToast} 
            className="w-full"
            variant="outline"
          >
            <Bell className="h-4 w-4 mr-2" />
            Test Toast Notification
          </Button>
          
          <Button 
            onClick={handleTestRealTime} 
            className="w-full"
            variant="outline"
          >
            <CheckCircle className="h-4 w-4 mr-2" />
            Test Real-time Notification
          </Button>
        </div>

        {/* Recent Notifications Preview */}
        {notifications.length > 0 && (
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Recent Notifications:</h4>
            <div className="space-y-1 max-h-32 overflow-y-auto">
              {notifications.slice(0, 3).map((notification) => (
                <div 
                  key={notification._id} 
                  className={`p-2 rounded text-xs ${
                    !notification.read 
                      ? 'bg-purple-50 border border-purple-200' 
                      : 'bg-gray-50 border border-gray-200'
                  }`}
                >
                  <div className="font-medium">{notification.title}</div>
                  <div className="text-gray-600 truncate">{notification.message}</div>
                </div>
              ))}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default NotificationTest; 