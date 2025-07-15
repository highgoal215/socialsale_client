
import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Shield, CheckCircle, Clock } from 'lucide-react';

const Order = () => {
  const [searchParams] = useSearchParams();
  const service = searchParams.get('service') || 'Instagram Followers';
  const package_param = searchParams.get('package') || '500';
  const price = searchParams.get('price') || '$9.99';

  const [formData, setFormData] = useState({
    username: '',
    postUrl: '',
    email: '',
    additionalInfo: ''
  });

  // Check if postUrl is required for this service type (not needed for Followers/Subscribers)
  const requiresPostUrl = !service.includes('Followers') && !service.includes('Subscribers');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!formData.username) {
      alert('Please provide your username.');
      return;
    }
    
    if (!formData.email) {
      alert('Please provide your email address.');
      return;
    }
    
    // Check if postUrl is required for this service type
    if (requiresPostUrl && !formData.postUrl) {
      alert('Post/Video URL is required for this service type.');
      return;
    }
    
    alert('Order submitted successfully! You will receive a confirmation email shortly.');
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <div className="pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Complete Your Order
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              You're just one step away from boosting your social media presence!
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {/* Order Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl text-purple-600">Order Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-b pb-4">
                  <h3 className="font-semibold text-lg">{service}</h3>
                  <p className="text-gray-600 dark:text-gray-300">{package_param} {service.includes('Followers') ? 'Followers' : service.includes('Subscribers') ? 'Subscribers' : service.includes('Likes') ? 'Likes' : service.includes('Views') ? 'Views' : 'Comments'}</p>
                </div>
                
                <div className="flex justify-between items-center text-lg">
                  <span>Total:</span>
                  <span className="font-bold text-purple-600">{price}</span>
                </div>

                <div className="space-y-3 pt-4">
                  <div className="flex items-center space-x-2">
                    <CheckCircle className="h-5 w-5 text-green-500" />
                    <span className="text-sm">High-Quality Results</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Clock className="h-5 w-5 text-blue-500" />
                    <span className="text-sm">Fast Delivery</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Shield className="h-5 w-5 text-purple-500" />
                    <span className="text-sm">Safe & Secure</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Order Form */}
            <Card>
              <CardHeader>
                <CardTitle className="text-2xl">Order Details</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <Label htmlFor="username">
                      {service.includes('Instagram') ? 'Instagram Username' : service.includes('TikTok') ? 'TikTok Username' : 'YouTube Username'} *
                    </Label>
                    <Input
                      id="username"
                      name="username"
                      placeholder={`@your${service.includes('Instagram') ? 'instagram' : service.includes('TikTok') ? 'tiktok' : 'youtube'}`}
                      value={formData.username}
                      onChange={handleInputChange}
                      required
                      className="mt-1"
                    />
                  </div>

                  {/* Post/Video URL field - Required for Likes, Views, Comments; Not needed for Followers */}
                  {requiresPostUrl && (
                    <div>
                      <Label htmlFor="postUrl">Post/Video URL *</Label>
                      <Input
                        id="postUrl"
                        name="postUrl"
                        type="url"
                        placeholder="https://instagram.com/p/your-post-id"
                        value={formData.postUrl}
                        onChange={handleInputChange}
                        required
                        className="mt-1"
                      />
                      <p className="text-sm text-gray-500 mt-1">
                        {service.includes('Instagram') && 'Enter the URL of your Instagram post'}
                        {service.includes('TikTok') && 'Enter the URL of your TikTok video'}
                        {service.includes('YouTube') && 'Enter the URL of your YouTube video'}
                      </p>
                    </div>
                  )}

                  <div>
                    <Label htmlFor="email">Email Address *</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="additionalInfo">Additional Information (Optional)</Label>
                    <Textarea
                      id="additionalInfo"
                      name="additionalInfo"
                      placeholder="Any special requests or instructions..."
                      value={formData.additionalInfo}
                      onChange={handleInputChange}
                      className="mt-1"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white py-3"
                    size="lg"
                  >
                    Complete Order - {price}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Order;
