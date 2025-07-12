
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';
import { 
  Bell, 
  CheckCircle, 
  Package, 
  CreditCard, 
  MessageCircle, 
  Settings, 
  Trash2, 
  RefreshCw,
  AlertCircle,
  X
} from 'lucide-react';
import { useNotificationContext } from '@/contexts/NotificationContext';
import ClientNotificationTest from '@/components/ClientNotificationTest';

// Helper function to get notification icon and color
const getNotificationIcon = (type: string) => {
  switch (type) {
    case 'order_update':
      return { icon: Package, color: 'text-orange-500', bgColor: 'bg-orange-100 dark:bg-orange-900/20' };
    case 'payment':
      return { icon: CreditCard, color: 'text-blue-500', bgColor: 'bg-blue-100 dark:bg-blue-900/20' };
    case 'support':
      return { icon: MessageCircle, color: 'text-purple-500', bgColor: 'bg-purple-100 dark:bg-purple-900/20' };
    case 'promo':
      return { icon: Bell, color: 'text-yellow-500', bgColor: 'bg-yellow-100 dark:bg-yellow-900/20' };
    case 'system':
      return { icon: AlertCircle, color: 'text-red-500', bgColor: 'bg-red-100 dark:bg-red-900/20' };
    default:
      return { icon: Bell, color: 'text-gray-500', bgColor: 'bg-gray-100 dark:bg-gray-800' };
  }
};

// Helper function to format timestamp
const formatTimestamp = (timestamp: string) => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) return 'Just now';
  if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
  if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)}h ago`;
  if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)}d ago`;
  
  return date.toLocaleDateString();
};

const Notifications = () => {
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
    updatePreferences
  } = useNotificationContext();

  const [filterType, setFilterType] = useState<'all' | string>('all');
  const [filterRead, setFilterRead] = useState<'all' | 'read' | 'unread'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Filter notifications
  const filteredNotifications = notifications.filter(notification => {
    const matchesType = filterType === 'all' || notification.type === filterType;
    const matchesRead = 
      filterRead === 'all' || 
      (filterRead === 'read' && notification.read) ||
      (filterRead === 'unread' && !notification.read);
    const matchesSearch = 
      notification.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notification.message.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesType && matchesRead && matchesSearch;
  });

  const handleMarkAsRead = async (id: string) => {
    await markAsRead(id);
  };

  const handleDeleteNotification = async (id: string) => {
    await deleteNotification(id);
  };

  const handleMarkAllAsRead = async () => {
    await markAllAsRead();
  };

  const handleClearAll = async () => {
    await clearAllNotifications();
  };

  const handleRefresh = async () => {
    await fetchNotifications();
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <div className="pt-20 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-2">
                Notifications
              </h1>
              <p className="text-gray-600 dark:text-gray-300">
                {unreadCount > 0 ? `You have ${unreadCount} unread notifications` : 'All caught up!'}
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button
                onClick={handleRefresh}
                variant="outline"
                size="sm"
                disabled={loading}
              >
                <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
                Refresh
              </Button>
              <Bell className="h-8 w-8 text-purple-600" />
            </div>
          </div>

          {/* Error Alert */}
          {error && (
            <Alert className="mb-6 border-red-200 bg-red-50 dark:bg-red-900/20">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-800 dark:text-red-200">
                {error}
                <Button
                  variant="ghost"
                  size="sm"
                  className="ml-2 h-auto p-0 text-red-800 dark:text-red-200 hover:text-red-900"
                  onClick={() => window.location.reload()}
                >
                  <X className="h-3 w-3" />
                </Button>
              </AlertDescription>
            </Alert>
          )}

          <div className="grid lg:grid-cols-4 gap-8">
            {/* Filters Sidebar */}
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Filters</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {/* Type Filter */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Type</label>
                    <select
                      value={filterType}
                      onChange={(e) => setFilterType(e.target.value)}
                      className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
                    >
                      <option value="all">All Types</option>
                      <option value="order_update">Order Updates</option>
                      <option value="payment">Payments</option>
                      <option value="support">Support</option>
                      <option value="promo">Promotions</option>
                      <option value="system">System</option>
                    </select>
                  </div>

                  {/* Read Status Filter */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Status</label>
                    <select
                      value={filterRead}
                      onChange={(e) => setFilterRead(e.target.value as 'all' | 'read' | 'unread')}
                      className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
                    >
                      <option value="all">All</option>
                      <option value="unread">Unread</option>
                      <option value="read">Read</option>
                    </select>
                  </div>

                  {/* Search */}
                  <div>
                    <label className="text-sm font-medium mb-2 block">Search</label>
                    <input
                      type="text"
                      placeholder="Search notifications..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full p-2 border rounded-md dark:bg-gray-800 dark:border-gray-700"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Actions */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Actions</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button
                    onClick={handleMarkAllAsRead}
                    variant="outline"
                    className="w-full"
                    disabled={unreadCount === 0 || loading}
                  >
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Mark All as Read
                  </Button>
                  <Button
                    onClick={handleClearAll}
                    variant="outline"
                    className="w-full"
                    disabled={notifications.length === 0 || loading}
                  >
                    <Trash2 className="h-4 w-4 mr-2" />
                    Clear All
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Notifications List */}
            <div className="lg:col-span-3 space-y-4">
              {loading ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <RefreshCw className="h-12 w-12 mx-auto mb-4 text-gray-400 animate-spin" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      Loading notifications...
                    </h3>
                  </CardContent>
                </Card>
              ) : filteredNotifications.length === 0 ? (
                <Card>
                  <CardContent className="p-8 text-center">
                    <Bell className="h-12 w-12 mx-auto mb-4 text-gray-400" />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
                      {notifications.length === 0 ? 'No notifications' : 'No matching notifications'}
                    </h3>
                    <p className="text-gray-600 dark:text-gray-300">
                      {notifications.length === 0 
                        ? "You're all caught up! New notifications will appear here."
                        : "Try adjusting your filters to see more notifications."
                      }
                    </p>
                  </CardContent>
                </Card>
              ) : (
                filteredNotifications.map((notification) => {
                  const { icon: Icon, color, bgColor } = getNotificationIcon(notification.type);
                  
                  return (
                    <Card 
                      key={notification._id} 
                      className={`transition-all duration-200 hover:shadow-md ${
                        !notification.read 
                          ? 'border-purple-200 bg-purple-50 dark:bg-purple-900/10' 
                          : ''
                      }`}
                    >
                      <CardContent className="p-4">
                        <div className="flex items-start gap-4">
                          <div className={`p-2 rounded-lg ${bgColor}`}>
                            <Icon className={`h-5 w-5 ${color}`} />
                          </div>
                          <div className="flex-1 min-w-0">
                            <div className="flex items-start justify-between">
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <h3 className={`font-medium ${
                                    !notification.read 
                                      ? 'text-gray-900 dark:text-white' 
                                      : 'text-gray-700 dark:text-gray-300'
                                  }`}>
                                    {notification.title}
                                  </h3>
                                  {!notification.read && (
                                    <Badge variant="secondary" className="text-xs">
                                      New
                                    </Badge>
                                  )}
                                </div>
                                <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">
                                  {notification.message}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {formatTimestamp(notification.createdAt)}
                                </p>
                              </div>
                              <div className="flex gap-2 ml-4">
                                {!notification.read && (
                                  <Button
                                    size="sm"
                                    variant="ghost"
                                    onClick={() => handleMarkAsRead(notification._id)}
                                    disabled={loading}
                                  >
                                    <CheckCircle className="h-4 w-4" />
                                  </Button>
                                )}
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  onClick={() => handleDeleteNotification(notification._id)}
                                  disabled={loading}
                                >
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              </div>
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })
              )}
            </div>

            {/* Notification Settings */}
            <div className="lg:col-span-4">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Settings className="h-5 w-5" />
                    Notification Preferences
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    {/* Notification Types */}
                    <div className="space-y-4">
                      <h4 className="font-medium text-gray-900 dark:text-white">Notification Types</h4>
                      
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Order Updates</span>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={preferences.orderUpdates}
                              onChange={(e) => updatePreferences({ orderUpdates: e.target.checked })}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                          </label>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Payment Notifications</span>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                                              checked={preferences.payments}
                onChange={(e) => updatePreferences({ payments: e.target.checked })}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                          </label>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Support Messages</span>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={preferences.support}
                              onChange={(e) => updatePreferences({ support: e.target.checked })}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                          </label>
                        </div>

                                                <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Promotions</span>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={preferences.promotions}
                              onChange={(e) => updatePreferences({ promotions: e.target.checked })}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                          </label>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">System Notifications</span>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={preferences.system}
                              onChange={(e) => updatePreferences({ system: e.target.checked })}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                          </label>
                        </div>
                      </div>
                    </div>

                    {/* Delivery Methods */}
                    <div className="space-y-4">
                      <h4 className="font-medium text-gray-900 dark:text-white">Delivery Methods</h4>
                      
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">In-App Notifications</span>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={preferences.inApp}
                              onChange={(e) => updatePreferences({ inApp: e.target.checked })}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                          </label>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Email Notifications</span>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                              checked={preferences.email}
                              onChange={(e) => updatePreferences({ email: e.target.checked })}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                          </label>
                        </div>

                        <div className="flex items-center justify-between">
                          <span className="text-sm font-medium">Push Notifications</span>
                          <label className="relative inline-flex items-center cursor-pointer">
                            <input
                              type="checkbox"
                                              checked={preferences.push}
                onChange={(e) => updatePreferences({ push: e.target.checked })}
                              className="sr-only peer"
                            />
                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-purple-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-purple-600"></div>
                          </label>
                        </div>
                      </div>

                      <div className="pt-4 border-t">
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          These settings control how you receive notifications. Changes are saved automatically.
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Client Notification Test */}
            <div className="lg:col-span-4">
              <ClientNotificationTest />
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Notifications;
