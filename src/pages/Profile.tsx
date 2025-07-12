import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { User, CreditCard, History, Settings, Wallet, Bitcoin, LogOut, LayoutDashboard, Bell, Loader2 } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import ChangePasswordModal from '@/components/ChangePasswordModal';
import NotificationTest from '@/components/NotificationTest';
import { fetchUserOrders, getServiceDisplayName, getStatusDisplayName, getStatusColorClass, UserOrder } from '@/services/order-service';

const Profile = () => {
  const navigate = useNavigate();
  const { user, logout, updateProfile, isLoading } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [depositAmount, setDepositAmount] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('stripe');
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);
  const [isUpdatingProfile, setIsUpdatingProfile] = useState(false);

  const [firstName, setFirstName] = useState<string>("");
  const [lastName, setLastName] = useState<string>("");
  const [orders, setOrders] = useState<UserOrder[]>([]);
  const [isLoadingOrders, setIsLoadingOrders] = useState(false);
  const [ordersError, setOrdersError] = useState<string | null>(null);

  // Initialize firstName and lastName when user data is available
  useEffect(() => {
    if (user?.username) {
      const nameParts = user.username.split(' ');
      setFirstName(nameParts[0] || '');
      setLastName(nameParts.slice(1).join(' ') || '');
    }
  }, [user]);

  // Fetch user orders when overview or history tab is active
  useEffect(() => {
    if (activeTab === 'history' || activeTab === 'overview') {
      fetchOrders();
    }
  }, [activeTab, toast]);

  const fetchOrders = async () => {
    setIsLoadingOrders(true);
    setOrdersError(null);
    
    try {
      const response = await fetchUserOrders();
      
      if (response.success) {
        setOrders(response.data);
      } else {
        setOrdersError(response.message || 'Failed to load orders');
        toast({
          title: "Error",
          description: response.message || 'Failed to load orders',
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error('Error fetching orders:', error);
      setOrdersError('An error occurred while loading orders');
      toast({
        title: "Error",
        description: 'An error occurred while loading orders',
        variant: "destructive",
      });
    } finally {
      setIsLoadingOrders(false);
    }
  };

  const handleLogout = () => {
    logout();
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate('/');
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: LayoutDashboard },
    { id: 'deposit', label: 'Deposit Balance', icon: CreditCard },
    { id: 'history', label: 'Order History', icon: History },
    { id: 'profile', label: 'Profile Settings', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
  ];

  // Calculate order statistics for overview
  const totalOrders = orders.length;
  const completedOrders = orders.filter(order => order.status === 'completed').length;
  const totalSpent = orders.reduce((sum, order) => sum + order.price, 0);

  const getInitials = (name: string) => {
    if (!name || typeof name !== 'string') {
      return 'U';
    }
    return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase();
  };

  // Update Profile Function
  const UpdateProfile = async () => {
    if (!user) {
      toast({
        title: "Error!",
        description: "User not found. Please log in again.",
      });
      return;
    }
    
    const username = firstName + " " + lastName;
    
    // Check if there are any changes
    if (username.trim() === user.username) {
      toast({
        title: "No Changes",
        description: "No changes detected. Please make changes before saving.",
      });
      return;
    }

    setIsUpdatingProfile(true);
    
    try {
      const response = await updateProfile(user.id, username);

      if (response.success === true) {
        toast({
          title: "Success!",
          description: response.message,
        });
      } else {
        toast({
          title: "Error!",
          description: response.message,
        });
      }
    } catch (error) {
      toast({
        title: "Error!",
        description: "An error occurred while updating your profile. Please try again.",
      });
    } finally {
      setIsUpdatingProfile(false);
    }
  }

  // Show loading state while user data is being fetched
  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <div className="pt-20 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center h-64">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600 mx-auto mb-4"></div>
                <p className="text-gray-600 dark:text-gray-300">Loading profile...</p>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  // Redirect if user is not authenticated
  if (!user) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />

      <div className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                <div className="text-center mb-6">
                  <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white text-2xl font-bold mx-auto mb-3">
                    {user ? getInitials(user.username) : 'U'}
                  </div>
                  <h3 className="font-bold text-gray-900 dark:text-white">
                    {user ? user.username : 'User'}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">{user?.email || 'user@example.com'}</p>
                </div>

                <nav className="space-y-2">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`w-full flex items-center px-3 py-2 rounded-lg text-left transition-colors ${activeTab === tab.id
                        ? 'bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 font-medium'
                        : 'text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                        }`}
                    >
                      <tab.icon className="h-5 w-5 mr-3" />
                      {tab.label}
                    </button>
                  ))}

                  <div className="pt-4 border-t border-gray-200 dark:border-gray-600">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center px-3 py-2 rounded-lg text-left transition-colors text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20"
                    >
                      <LogOut className="h-5 w-5 mr-3" />
                      Logout
                    </button>
                  </div>
                </nav>
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Overview Tab */}
              {activeTab === 'overview' && (
                <div className="space-y-6">
                  <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Account Overview</h2>

                    <div className="grid md:grid-cols-3 gap-6 mb-8">
                      <div className="text-center p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-1">${user?.balance?.toFixed(2) || '0.00'}</div>
                        <div className="text-green-700 dark:text-green-300">Account Balance</div>
                      </div>
                      <div className="text-center p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">{totalOrders}</div>
                        <div className="text-blue-700 dark:text-blue-300">Total Orders</div>
                      </div>
                      <div className="text-center p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                        <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-1">${totalSpent.toFixed(2)}</div>
                        <div className="text-purple-700 dark:text-purple-300">Total Spent</div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <h3 className="font-semibold mb-3 text-gray-900 dark:text-white">Recent Activity</h3>
                        <div className="space-y-3">
                          {orders.slice(0, 3).map((order) => (
                            <div key={order._id} className="flex justify-between items-center p-3 bg-gray-50 dark:bg-gray-700 rounded-lg">
                              <span className="text-sm text-gray-900 dark:text-white">
                                {getServiceDisplayName(order.serviceType, order.quality)} - {order.quantity.toLocaleString()}
                              </span>
                              <span className={`text-sm ${getStatusColorClass(order.status)}`}>
                                {getStatusDisplayName(order.status)}
                              </span>
                            </div>
                          ))}
                          {orders.length === 0 && (
                            <div className="text-center py-4 text-gray-500 dark:text-gray-400">
                              <p className="text-sm">No recent activity</p>
                            </div>
                          )}
                        </div>
                      </div>

                      <div>
                        <h3 className="font-semibold mb-3 text-gray-900 dark:text-white">Quick Actions</h3>
                        <div className="space-y-2">
                          <Button
                            onClick={() => setActiveTab('deposit')}
                            variant="outline"
                            className="w-full justify-start"
                          >
                            <CreditCard className="h-4 w-4 mr-2" />
                            Add Funds
                          </Button>
                          <Button variant="outline" className="w-full justify-start">
                            <History className="h-4 w-4 mr-2" />
                            View Orders
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Deposit Tab */}
              {activeTab === 'deposit' && (
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Deposit Balance</h2>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                          Deposit Amount
                        </label>
                        <Input
                          type="number"
                          placeholder="Enter amount"
                          value={depositAmount}
                          onChange={(e) => setDepositAmount(e.target.value)}
                          className="text-lg"
                        />
                        <div className="flex gap-2 mt-2">
                          {[25, 50, 100, 200].map((amount) => (
                            <Button
                              key={amount}
                              variant="outline"
                              size="sm"
                              onClick={() => setDepositAmount(amount.toString())}
                            >
                              ${amount}
                            </Button>
                          ))}
                        </div>
                      </div>

                      <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                          Payment Method
                        </label>
                        <div className="grid grid-cols-3 gap-3">
                          <button
                            onClick={() => setPaymentMethod('stripe')}
                            className={`p-3 border rounded-lg flex flex-col items-center ${paymentMethod === 'stripe' ? 'border-purple-600 bg-purple-50 dark:bg-purple-900/20' : 'border-gray-200 dark:border-gray-600'
                              }`}
                          >
                            <CreditCard className="h-6 w-6 mb-1" />
                            <span className="text-sm font-medium text-gray-900 dark:text-white">Card</span>
                          </button>
                          <button
                            onClick={() => setPaymentMethod('paypal')}
                            className={`p-3 border rounded-lg flex flex-col items-center ${paymentMethod === 'paypal' ? 'border-purple-600 bg-purple-50 dark:bg-purple-900/20' : 'border-gray-200 dark:border-gray-600'
                              }`}
                          >
                            <Wallet className="h-6 w-6 mb-1" />
                            <span className="text-sm font-medium text-gray-900 dark:text-white">PayPal</span>
                          </button>
                          <button
                            onClick={() => setPaymentMethod('crypto')}
                            className={`p-3 border rounded-lg flex flex-col items-center ${paymentMethod === 'crypto' ? 'border-purple-600 bg-purple-50 dark:bg-purple-900/20' : 'border-gray-200 dark:border-gray-600'
                              }`}
                          >
                            <Bitcoin className="h-6 w-6 mb-1" />
                            <span className="text-sm font-medium text-gray-900 dark:text-white">Crypto</span>
                          </button>
                        </div>
                      </div>

                      <Button
                        className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                        disabled={!depositAmount}
                      >
                        Deposit ${depositAmount || '0.00'}
                      </Button>
                    </div>

                    <div>
                      <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4 mb-6">
                        <h3 className="font-semibold mb-3 text-gray-900 dark:text-white">Current Balance</h3>
                        <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">${user?.balance?.toFixed(2) || '0.00'}</div>
                        <p className="text-sm text-gray-600 dark:text-gray-300">Available for orders</p>
                      </div>

                      <div className="space-y-4">
                        <div className="flex items-center p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                          <div className="w-2 h-2 bg-blue-500 rounded-full mr-3"></div>
                          <span className="text-sm text-gray-900 dark:text-white">Instant processing</span>
                        </div>
                        <div className="flex items-center p-3 bg-green-50 dark:bg-green-900/20 rounded-lg">
                          <div className="w-2 h-2 bg-green-500 rounded-full mr-3"></div>
                          <span className="text-sm text-gray-900 dark:text-white">Secure payments</span>
                        </div>
                        <div className="flex items-center p-3 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                          <div className="w-2 h-2 bg-purple-500 rounded-full mr-3"></div>
                          <span className="text-sm text-gray-900 dark:text-white">No hidden fees</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Order History Tab */}
              {activeTab === 'history' && (
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Order History</h2>
                    <Button 
                      onClick={fetchOrders} 
                      variant="outline" 
                      size="sm"
                      disabled={isLoadingOrders}
                    >
                      {isLoadingOrders ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Refreshing...
                        </>
                      ) : (
                        'Refresh'
                      )}
                    </Button>
                  </div>

                  {isLoadingOrders ? (
                    <div className="flex justify-center items-center h-64">
                      <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
                      <span className="ml-2 text-lg text-gray-600 dark:text-gray-300">Loading orders...</span>
                    </div>
                  ) : ordersError ? (
                    <div className="text-center py-8">
                      <p className="text-red-600 dark:text-red-400 mb-4">{ordersError}</p>
                      <Button onClick={fetchOrders} variant="outline">
                        Try Again
                      </Button>
                    </div>
                  ) : orders.length === 0 ? (
                    <div className="text-center py-8">
                      <p className="text-gray-600 dark:text-gray-300 mb-4">No orders found</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">Your order history will appear here once you place orders.</p>
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead className="bg-gray-50 dark:bg-gray-700">
                          <tr>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Order Number</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Service</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Quality</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Price</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Status</th>
                            <th className="px-4 py-3 text-left text-sm font-medium text-gray-700 dark:text-gray-300">Date</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-200 dark:divide-gray-600">
                          {orders.map((order) => (
                            <tr key={order._id} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                              <td className="px-4 py-3 text-sm font-medium text-gray-900 dark:text-white">
                                {order.orderNumber || `#${order._id.slice(-8)}`}
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                                {getServiceDisplayName(order.serviceType, order.quality)} - {order.quantity.toLocaleString()}
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-900 dark:text-white capitalize">
                                {order.quality}
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                                ${order.price.toFixed(2)}
                              </td>
                              <td className="px-4 py-3">
                                <span className={`inline-block px-2 py-1 rounded-full text-xs font-medium ${getStatusColorClass(order.status)}`}>
                                  {getStatusDisplayName(order.status)}
                                </span>
                              </td>
                              <td className="px-4 py-3 text-sm text-gray-900 dark:text-white">
                                {new Date(order.createdAt).toLocaleDateString()}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}
                </div>
              )}

              {/* Notifications Tab */}
              {activeTab === 'notifications' && (
                <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Notification System Test</h2>
                  <div className="flex justify-center">
                    <NotificationTest />
                  </div>
                </div>
              )}

              {/* Profile Tab */}
              {activeTab === 'profile' && (
                <div className="bg-white rounded-xl p-6 shadow-sm dark:bg-gray-800">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6 dark:text-white">Account Settings</h2>

                  <div className="space-y-6">
                    <div>
                      <h3 className="font-semibold mb-3">Personal Information</h3>
                      <div className="grid md:grid-cols-2 gap-4">
                        <Input 
                          placeholder="First Name" 
                          value={firstName} 
                          onChange={(e) => setFirstName(e.target.value)} 
                        />
                        <Input 
                          placeholder="Last Name" 
                          value={lastName} 
                          onChange={(e) => setLastName(e.target.value)} 
                        />
                        <Input placeholder="Email" value={user?.email || ''} disabled />
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-3">Security</h3>
                      <div className="space-y-3">
                        <Button 
                          variant="outline" 
                          onClick={() => setIsChangePasswordOpen(true)}
                        >
                          Change Password
                        </Button>
                      </div>
                    </div>

                    <div>
                      <h3 className="font-semibold mb-3">Notifications</h3>
                      <div className="space-y-3">
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-3" defaultChecked />
                          <span>Email notifications for order updates</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-3" defaultChecked />
                          <span>Marketing emails and promotions</span>
                        </label>
                      </div>
                    </div>

                    <Button 
                      onClick={() => UpdateProfile()} 
                      disabled={isUpdatingProfile}
                      className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                    >
                      {isUpdatingProfile ? (
                        <>
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Saving...
                        </>
                      ) : (
                        'Save Changes'
                      )}
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <ChangePasswordModal 
        isOpen={isChangePasswordOpen}
        onClose={() => setIsChangePasswordOpen(false)}
      />

      <Footer />
    </div>
  );
};

export default Profile;
