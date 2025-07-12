
import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, Package, Clock, CheckCircle, AlertCircle, Loader2, ChevronDown } from 'lucide-react';
import { TrackOrders, TrackOrderById } from '@/api/order';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Tracking = () => {
  const [orderNumber, setOrderNumber] = useState('');
  const [selectedOrderId, setSelectedOrderId] = useState('');
  const [trackingResult, setTrackingResult] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingOrders, setIsLoadingOrders] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [allOrders, setAllOrders] = useState<any[]>([]);

  // Load all orders on component mount
  useEffect(() => {
    loadAllOrders();
  }, []);

  const loadAllOrders = async () => {
    setIsLoadingOrders(true);
    try {
      const result = await TrackOrders({ limit: 50 }); // Load first 50 orders
      if (result.success && result.data) {
        setAllOrders(result.data);
      }
    } catch (error) {
      console.error('Error loading orders:', error);
    } finally {
      setIsLoadingOrders(false);
    }
  };

  const handleSearch = async () => {
    if (!orderNumber.trim()) {
      setError('Please enter an order number');
      return;
    }

    setIsLoading(true);
    setError(null);
    setTrackingResult(null);

    try {
      // Clean the order number (remove # if present)
      const cleanOrderNumber = orderNumber.replace('#', '');
      
      // First, try to find the order in the already loaded orders
      const foundOrder = allOrders.find(order => 
        order._id === cleanOrderNumber || 
        order._id?.includes(cleanOrderNumber) ||
        order.socialUsername?.toLowerCase().includes(cleanOrderNumber.toLowerCase())
      );
      
      if (foundOrder) {
        // Transform backend data to frontend format
        const transformedResult = {
          orderNumber: foundOrder._id || cleanOrderNumber,
          service: `${foundOrder.serviceType || 'Unknown'} ${foundOrder.quality || ''}`,
          quantity: foundOrder.quantity?.toLocaleString() || '0',
          status: foundOrder.status || 'Pending',
          progress: calculateProgress(foundOrder.status),
          startDate: new Date(foundOrder.createdAt).toLocaleDateString(),
          estimatedCompletion: calculateEstimatedCompletion(foundOrder.createdAt, foundOrder.status),
          socialUsername: foundOrder.socialUsername,
          price: `$${foundOrder.price || 0}`,
          stages: generateOrderStages(foundOrder.status, foundOrder.createdAt)
        };
        
        setTrackingResult(transformedResult);
        setSelectedOrderId(foundOrder._id); // Update the dropdown selection
      } else {
        // If not found in loaded orders, try searching by username
        const searchResult = await TrackOrders({ username: cleanOrderNumber });
        
        if (searchResult.success && searchResult.data && searchResult.data.length > 0) {
          // Show first matching order
          const order = searchResult.data[0];
          const transformedResult = {
            orderNumber: order._id || cleanOrderNumber,
            service: `${order.serviceType || 'Unknown'} ${order.quality || ''}`,
            quantity: order.quantity?.toLocaleString() || '0',
            status: order.status || 'Pending',
            progress: calculateProgress(order.status),
            startDate: new Date(order.createdAt).toLocaleDateString(),
            estimatedCompletion: calculateEstimatedCompletion(order.createdAt, order.status),
            socialUsername: order.socialUsername,
            price: `$${order.price || 0}`,
            stages: generateOrderStages(order.status, order.createdAt)
          };
          
          setTrackingResult(transformedResult);
          setSelectedOrderId(order._id); // Update the dropdown selection
        } else {
          setError('Order not found. Please check the order number and try again.');
        }
      }
    } catch (error) {
      console.error('Tracking error:', error);
      setError('An error occurred while tracking your order. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleOrderSelect = async (orderId: string) => {
    if (!orderId) return;
    
    setIsLoading(true);
    setError(null);
    setTrackingResult(null);
    setSelectedOrderId(orderId);

    try {
      // Find the selected order from the already loaded orders
      const selectedOrder = allOrders.find(order => order._id === orderId);
      
      if (selectedOrder) {
        // Transform backend data to frontend format
        const transformedResult = {
          orderNumber: selectedOrder._id || orderId,
          service: `${selectedOrder.serviceType || 'Unknown'} ${selectedOrder.quality || ''}`,
          quantity: selectedOrder.quantity?.toLocaleString() || '0',
          status: selectedOrder.status || 'Pending',
          progress: calculateProgress(selectedOrder.status),
          startDate: new Date(selectedOrder.createdAt).toLocaleDateString(),
          estimatedCompletion: calculateEstimatedCompletion(selectedOrder.createdAt, selectedOrder.status),
          socialUsername: selectedOrder.socialUsername,
          price: `$${selectedOrder.price || 0}`,
          stages: generateOrderStages(selectedOrder.status, selectedOrder.createdAt)
        };
        
        setTrackingResult(transformedResult);
      } else {
        setError('Order not found. Please try selecting another order.');
      }
    } catch (error) {
      console.error('Tracking error:', error);
      setError('An error occurred while tracking your order. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Helper function to format order display text
  const formatOrderDisplay = (order: any) => {
    const service = `${order.serviceType || 'Unknown'} ${order.quality || ''}`;
    const quantity = order.quantity?.toLocaleString() || '0';
    const username = order.socialUsername || 'N/A';
    const date = new Date(order.createdAt).toLocaleDateString();
    const status = order.status || 'Pending';
    
    return `${service} - ${quantity} for ${username} (${date}) - ${status}`;
  };

  // Helper function to calculate progress based on status
  const calculateProgress = (status: string): number => {
    switch (status?.toLowerCase()) {
      case 'completed':
        return 100;
      case 'in_progress':
      case 'processing':
        return 75;
      case 'pending':
        return 25;
      case 'cancelled':
        return 0;
      default:
        return 50;
    }
  };

  // Helper function to calculate estimated completion
  const calculateEstimatedCompletion = (createdAt: string, status: string): string => {
    if (status?.toLowerCase() === 'completed') {
      return 'Completed';
    }
    
    const startDate = new Date(createdAt);
    const estimatedDate = new Date(startDate.getTime() + (3 * 24 * 60 * 60 * 1000)); // 3 days
    return estimatedDate.toLocaleDateString();
  };

  // Helper function to generate order stages
  const generateOrderStages = (status: string, createdAt: string): any[] => {
    const startDate = new Date(createdAt);
    const statusLower = status?.toLowerCase();
    
    const stages = [
      { 
        name: 'Order Placed', 
        completed: true, 
        date: startDate.toLocaleString() 
      },
      { 
        name: 'Payment Confirmed', 
        completed: ['pending', 'in_progress', 'processing', 'completed'].includes(statusLower), 
        date: statusLower !== 'pending' ? new Date(startDate.getTime() + 2 * 60 * 1000).toLocaleString() : null 
      },
      { 
        name: 'Processing Started', 
        completed: ['in_progress', 'processing', 'completed'].includes(statusLower), 
        date: ['in_progress', 'processing', 'completed'].includes(statusLower) ? new Date(startDate.getTime() + 4 * 60 * 60 * 1000).toLocaleString() : null 
      },
      { 
        name: 'Delivery In Progress', 
        completed: ['processing', 'completed'].includes(statusLower), 
        date: ['processing', 'completed'].includes(statusLower) ? new Date(startDate.getTime() + 24 * 60 * 60 * 1000).toLocaleString() : null 
      },
      { 
        name: 'Completed', 
        completed: statusLower === 'completed', 
        date: statusLower === 'completed' ? new Date(startDate.getTime() + 48 * 60 * 60 * 1000).toLocaleString() : null 
      }
    ];
    
    return stages;
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'Completed':
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case 'In Progress':
        return <Clock className="h-5 w-5 text-blue-500" />;
      case 'Pending':
        return <AlertCircle className="h-5 w-5 text-yellow-500" />;
      default:
        return <Package className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <div className="pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Order Tracking
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Track the status of your orders in real-time.
            </p>
          </div>

          {/* Search Form */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle>Track Your Order</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Order Selection Dropdown */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Select an Order
                  </label>
                  <Select value={selectedOrderId} onValueChange={handleOrderSelect}>
                    <SelectTrigger className="w-full">
                      <SelectValue placeholder={
                        isLoadingOrders 
                          ? "Loading orders..." 
                          : allOrders.length > 0 
                            ? "Choose an order to track" 
                            : "No orders available"
                      } />
                    </SelectTrigger>
                    <SelectContent>
                      {allOrders.map((order) => (
                        <SelectItem key={order._id} value={order._id}>
                          <div className="flex flex-col">
                            <span className="font-medium">{formatOrderDisplay(order)}</span>
                            <span className="text-xs text-gray-500">
                              ID: {order._id}
                            </span>
                          </div>
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Error Message */}
          {error && (
            <Card className="mb-8 border-red-200 bg-red-50 dark:bg-red-900/20">
              <CardContent className="pt-6">
                <div className="flex items-center gap-2 text-red-600 dark:text-red-400">
                  <AlertCircle className="h-5 w-5" />
                  <p>{error}</p>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Tracking Results */}
          {trackingResult && (
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {getStatusIcon(trackingResult.status)}
                    Order #{trackingResult.orderNumber}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <h3 className="font-semibold mb-2">Order Details</h3>
                      <p className="text-gray-600 dark:text-gray-300">Service: {trackingResult.service}</p>
                      <p className="text-gray-600 dark:text-gray-300">Quantity: {trackingResult.quantity}</p>
                      <p className="text-gray-600 dark:text-gray-300">Status: {trackingResult.status}</p>
                      {trackingResult.socialUsername && (
                        <p className="text-gray-600 dark:text-gray-300">Username: {trackingResult.socialUsername}</p>
                      )}
                      {trackingResult.price && (
                        <p className="text-gray-600 dark:text-gray-300">Price: {trackingResult.price}</p>
                      )}
                    </div>
                    <div>
                      <h3 className="font-semibold mb-2">Timeline</h3>
                      <p className="text-gray-600 dark:text-gray-300">Started: {trackingResult.startDate}</p>
                      <p className="text-gray-600 dark:text-gray-300">Est. Completion: {trackingResult.estimatedCompletion}</p>
                    </div>
                  </div>
                  
                  {/* Progress Bar */}
                  <div className="mt-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">Progress</span>
                      <span className="text-sm text-gray-600 dark:text-gray-300">{trackingResult.progress}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-gradient-to-r from-purple-600 to-blue-600 h-2 rounded-full transition-all duration-300"
                        style={{ width: `${trackingResult.progress}%` }}
                      ></div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Order Stages */}
              <Card>
                <CardHeader>
                  <CardTitle>Order Timeline</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {trackingResult.stages.map((stage: any, index: number) => (
                      <div key={index} className="flex items-center gap-4">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          stage.completed ? 'bg-green-500' : 'bg-gray-300'
                        }`}>
                          {stage.completed ? (
                            <CheckCircle className="h-5 w-5 text-white" />
                          ) : (
                            <div className="w-3 h-3 bg-white rounded-full"></div>
                          )}
                        </div>
                        <div className="flex-1">
                          <h4 className={`font-medium ${stage.completed ? 'text-gray-900 dark:text-white' : 'text-gray-500'}`}>
                            {stage.name}
                          </h4>
                          {stage.date && (
                            <p className="text-sm text-gray-600 dark:text-gray-300">{stage.date}</p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Help Section */}
          <Card>
            <CardHeader>
              <CardTitle>Need Help?</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <p className="text-gray-600 dark:text-gray-300">
                  Can't find your order? Here are a few ways to track it:
                </p>
                <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600">•</span>
                    <span>Use the dropdown above to select from your recent orders</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600">•</span>
                    <span>Enter your order number manually in the search box</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600">•</span>
                    <span>Check your email confirmation for the order number</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-purple-600">•</span>
                    <span>Contact support if you need assistance</span>
                  </li>
                </ul>
                {allOrders.length > 0 && (
                  <div className="mt-4 p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <p className="text-sm text-gray-600 dark:text-gray-300">
                      <strong>Available Orders:</strong> {allOrders.length} orders found
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Tracking;
