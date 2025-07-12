import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  Bell, 
  CheckCircle, 
  X, 
  RefreshCw,
  AlertCircle,
  Wifi,
  WifiOff,
  TestTube
} from 'lucide-react';
import { useNotificationContext } from '@/contexts/NotificationContext';
import socketService from '@/services/socket-service';

const ClientNotificationTest = () => {
  const {
    notifications,
    unreadCount,
    loading,
    error,
    preferences,
    fetchNotifications,
    markAsRead,
    markAllAsRead,
    deleteNotification,
    clearAllNotifications,
    updatePreferences,
    refreshUnreadCount
  } = useNotificationContext();

  const [testResults, setTestResults] = useState<{
    apiConnection: boolean;
    socketConnection: boolean;
    preferencesLoaded: boolean;
    notificationsLoaded: boolean;
    lastTestTime: string;
  }>({
    apiConnection: false,
    socketConnection: false,
    preferencesLoaded: false,
    notificationsLoaded: false,
    lastTestTime: ''
  });

  const [isRunningTests, setIsRunningTests] = useState(false);

  const runComprehensiveTest = async () => {
    setIsRunningTests(true);
    const results = {
      apiConnection: false,
      socketConnection: false,
      preferencesLoaded: false,
      notificationsLoaded: false,
      lastTestTime: new Date().toLocaleString()
    };

    try {
      // Test 1: API Connection
      console.log('🧪 Testing API Connection...');
      await fetchNotifications();
      results.apiConnection = true;
      console.log('✅ API Connection: PASSED');

      // Test 2: Socket Connection
      console.log('🧪 Testing Socket Connection...');
      const socketStatus = socketService.getConnectionStatus();
      results.socketConnection = socketStatus;
      console.log(`✅ Socket Connection: ${socketStatus ? 'CONNECTED' : 'DISCONNECTED'}`);

      // Test 3: Preferences Loaded
      console.log('🧪 Testing Preferences Loaded...');
      results.preferencesLoaded = preferences && Object.keys(preferences).length > 0;
      console.log(`✅ Preferences Loaded: ${results.preferencesLoaded ? 'YES' : 'NO'}`);

      // Test 4: Notifications Loaded
      console.log('🧪 Testing Notifications Loaded...');
      results.notificationsLoaded = Array.isArray(notifications);
      console.log(`✅ Notifications Loaded: ${results.notificationsLoaded ? 'YES' : 'NO'}`);

    } catch (error) {
      console.error('❌ Test failed:', error);
    } finally {
      setTestResults(results);
      setIsRunningTests(false);
    }
  };

  const testMarkAsRead = async () => {
    if (notifications.length > 0) {
      const firstUnread = notifications.find(n => !n.read);
      if (firstUnread) {
        await markAsRead(firstUnread._id);
        console.log('✅ Mark as Read Test: PASSED');
      }
    }
  };

  const testDeleteNotification = async () => {
    if (notifications.length > 0) {
      await deleteNotification(notifications[0]._id);
      console.log('✅ Delete Notification Test: PASSED');
    }
  };

  const testUpdatePreferences = async () => {
    const newPreferences = {
      orderUpdates: !preferences.orderUpdates,
      payments: preferences.payments,
      support: preferences.support,
      promotions: preferences.promotions,
      system: preferences.system,
      inApp: preferences.inApp,
      email: preferences.email,
      push: preferences.push
    };
    await updatePreferences(newPreferences);
    console.log('✅ Update Preferences Test: PASSED');
  };

  const getTestStatusColor = (passed: boolean) => {
    return passed ? 'text-green-600' : 'text-red-600';
  };

  const getTestStatusIcon = (passed: boolean) => {
    return passed ? <CheckCircle className="h-4 w-4" /> : <X className="h-4 w-4" />;
  };

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TestTube className="h-5 w-5" />
            Client Notification System Test
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4">
            <Button
              onClick={runComprehensiveTest}
              disabled={isRunningTests}
              className="flex items-center gap-2"
            >
              <RefreshCw className={`h-4 w-4 ${isRunningTests ? 'animate-spin' : ''}`} />
              {isRunningTests ? 'Running Tests...' : 'Run Comprehensive Test'}
            </Button>
            
            <div className="flex items-center gap-2">
              <Wifi className={`h-4 w-4 ${testResults.socketConnection ? 'text-green-600' : 'text-red-600'}`} />
              <span className="text-sm">
                Socket: {testResults.socketConnection ? 'Connected' : 'Disconnected'}
              </span>
            </div>
          </div>

          {/* Test Results */}
          <div className="grid grid-cols-2 gap-4">
            <div className={`flex items-center gap-2 p-3 rounded-lg border ${
              testResults.apiConnection ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
            }`}>
              {getTestStatusIcon(testResults.apiConnection)}
              <span className={`text-sm font-medium ${getTestStatusColor(testResults.apiConnection)}`}>
                API Connection
              </span>
            </div>

            <div className={`flex items-center gap-2 p-3 rounded-lg border ${
              testResults.socketConnection ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
            }`}>
              {getTestStatusIcon(testResults.socketConnection)}
              <span className={`text-sm font-medium ${getTestStatusColor(testResults.socketConnection)}`}>
                Socket Connection
              </span>
            </div>

            <div className={`flex items-center gap-2 p-3 rounded-lg border ${
              testResults.preferencesLoaded ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
            }`}>
              {getTestStatusIcon(testResults.preferencesLoaded)}
              <span className={`text-sm font-medium ${getTestStatusColor(testResults.preferencesLoaded)}`}>
                Preferences Loaded
              </span>
            </div>

            <div className={`flex items-center gap-2 p-3 rounded-lg border ${
              testResults.notificationsLoaded ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'
            }`}>
              {getTestStatusIcon(testResults.notificationsLoaded)}
              <span className={`text-sm font-medium ${getTestStatusColor(testResults.notificationsLoaded)}`}>
                Notifications Loaded
              </span>
            </div>
          </div>

          {testResults.lastTestTime && (
            <p className="text-xs text-gray-500">
              Last test run: {testResults.lastTestTime}
            </p>
          )}
        </CardContent>
      </Card>

      {/* Individual Test Actions */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Individual Tests</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex flex-wrap gap-2">
            <Button
              onClick={testMarkAsRead}
              variant="outline"
              size="sm"
              disabled={notifications.length === 0}
            >
              Test Mark as Read
            </Button>
            
            <Button
              onClick={testDeleteNotification}
              variant="outline"
              size="sm"
              disabled={notifications.length === 0}
            >
              Test Delete Notification
            </Button>
            
            <Button
              onClick={testUpdatePreferences}
              variant="outline"
              size="sm"
            >
              Test Update Preferences
            </Button>
            
            <Button
              onClick={refreshUnreadCount}
              variant="outline"
              size="sm"
            >
              Test Refresh Count
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Current Status */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Current Status</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Total Notifications:</span>
            <Badge variant="secondary">{notifications.length}</Badge>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Unread Count:</span>
            <Badge variant={unreadCount > 0 ? "destructive" : "secondary"}>
              {unreadCount}
            </Badge>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Loading State:</span>
            <Badge variant={loading ? "destructive" : "secondary"}>
              {loading ? "Loading" : "Ready"}
            </Badge>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Socket Status:</span>
            <Badge variant={socketService.getConnectionStatus() ? "default" : "destructive"}>
              {socketService.getConnectionStatus() ? "Connected" : "Disconnected"}
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* Error Display */}
      {error && (
        <Alert className="border-red-200 bg-red-50">
          <AlertCircle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-800">
            {error}
          </AlertDescription>
        </Alert>
      )}
    </div>
  );
};

export default ClientNotificationTest; 