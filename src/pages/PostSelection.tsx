import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Instagram, Youtube, Video, Image, Link, ArrowLeft, ArrowRight, CheckCircle, AlertCircle, Music } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

interface PostSelectionData {
  type: 'image' | 'video' | 'account';
  url: string;
  platform: 'instagram' | 'tiktok' | 'youtube';
  description?: string;
}

const PostSelection = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [selectedData, setSelectedData] = useState<PostSelectionData>({
    type: 'image',
    url: '',
    platform: 'instagram',
    description: ''
  });
  const [isValidating, setIsValidating] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);
  const [validationSuccess, setValidationSuccess] = useState(false);

  // Get service details from URL params
  const service = searchParams.get('service') || 'Instagram Views';
  const packageAmount = searchParams.get('package') || '5';
  const price = searchParams.get('price') || '$6.99';
  const quality = searchParams.get('quality') || 'general'; // Get quality from URL params

  // Determine platform and service type
  const platform = service.includes('Instagram') ? 'instagram' : 
                   service.includes('TikTok') ? 'tiktok' : 'youtube';
  
  const serviceType = service.includes('Followers') || service.includes('Subscribers') ? 'account' :
                     service.includes('Views') ? 'video' : 'image';

  useEffect(() => {
    // Set default values based on service
    setSelectedData(prev => ({
      ...prev,
      platform,
      type: serviceType
    }));
  }, [platform, serviceType]);

  const validateUrl = async (url: string, type: string, platform: string) => {
    setIsValidating(true);
    setValidationError(null);
    setValidationSuccess(false);

    try {
      // Basic URL validation
      const urlPattern = /^https?:\/\/.+/;
      if (!urlPattern.test(url)) {
        throw new Error('Please enter a valid URL starting with http:// or https://');
      }

      // Platform-specific validation
      if (platform === 'instagram') {
        if (type === 'account') {
          if (!url.includes('instagram.com/')) {
            throw new Error('Please enter a valid Instagram profile URL');
          }
        } else {
          if (!url.includes('instagram.com/p/') && !url.includes('instagram.com/reel/')) {
            throw new Error('Please enter a valid Instagram post or reel URL');
          }
        }
      } else if (platform === 'tiktok') {
        if (!url.includes('tiktok.com/')) {
          throw new Error('Please enter a valid TikTok video URL');
        }
      } else if (platform === 'youtube') {
        if (type === 'account') {
          if (!url.includes('youtube.com/') && !url.includes('youtube.com/@')) {
            throw new Error('Please enter a valid YouTube channel URL');
          }
        } else {
          if (!url.includes('youtube.com/watch')) {
            throw new Error('Please enter a valid YouTube video URL');
          }
        }
      }

      // Simulate API validation (replace with actual API call)
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setValidationSuccess(true);
      setValidationError(null);
    } catch (error: any) {
      setValidationError(error.message);
      setValidationSuccess(false);
    } finally {
      setIsValidating(false);
    }
  };

  const handleUrlChange = (url: string) => {
    setSelectedData(prev => ({ ...prev, url }));
    setValidationError(null);
    setValidationSuccess(false);
  };

  const handleContinue = () => {
    if (!selectedData.url) {
      setValidationError('Please enter a URL');
      return;
    }

    if (!validationSuccess) {
      validateUrl(selectedData.url, selectedData.type, selectedData.platform);
      return;
    }

    // Navigate to checkout with post selection data
    const params = new URLSearchParams({
      service,
      package: packageAmount,
      price,
      quality, // Pass quality to checkout
      postUrl: selectedData.url,
      postType: selectedData.type,
      platform: selectedData.platform,
      description: selectedData.description || ''
    });
    
    navigate(`/checkout?${params.toString()}`);
  };

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'instagram':
        return <Instagram className="h-5 w-5 text-pink-500" />;
      case 'tiktok':
        return <Music className="h-5 w-5 text-purple-500" />;
      case 'youtube':
        return <Youtube className="h-5 w-5 text-red-500" />;
      default:
        return <Link className="h-5 w-5 text-gray-500" />;
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'image':
        return <Image className="h-5 w-5 text-blue-500" />;
      case 'video':
        return <Video className="h-5 w-5 text-green-500" />;
      case 'account':
        return <Instagram className="h-5 w-5 text-purple-500" />;
      default:
        return <Link className="h-5 w-5 text-gray-500" />;
    }
  };

  const getPlaceholderText = () => {
    if (platform === 'instagram') {
      if (serviceType === 'account') {
        return 'https://instagram.com/yourusername';
      }
      return 'https://instagram.com/p/your-post-id or https://instagram.com/reel/your-reel-id';
    } else if (platform === 'tiktok') {
      return 'https://tiktok.com/@username/video/video-id';
    } else if (platform === 'youtube') {
      if (serviceType === 'account') {
        return 'https://youtube.com/@your-channel or https://youtube.com/channel/channel-id';
      }
      return 'https://youtube.com/watch?v=video-id';
    }
    return 'Enter URL here...';
  };

  const getHelpText = () => {
    if (platform === 'instagram') {
      if (serviceType === 'account') {
        return 'Enter your Instagram profile URL (e.g., https://instagram.com/yourusername)';
      }
      return 'Enter the URL of your Instagram post or reel that you want to boost';
    } else if (platform === 'tiktok') {
      return 'Enter the URL of your TikTok video that you want to boost';
    } else if (platform === 'youtube') {
      if (serviceType === 'account') {
        return 'Enter your YouTube channel URL';
      }
      return 'Enter the URL of your YouTube video that you want to boost';
    }
    return '';
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />
      
      <div className="pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Select Your {service.includes('Followers') || service.includes('Subscribers') ? 'Account' : 'Post'}
            </h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">
              Choose the {service.includes('Followers') || service.includes('Subscribers') ? 'account' : 'post'} you want to boost
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Order Summary */}
            <div className="lg:col-span-1">
              <Card className="h-fit">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {getPlatformIcon(platform)}
                    Order Summary
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{service}</h3>
                      <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">{price}</span>
                    </div>
                    <p className="text-gray-600 dark:text-gray-300">{packageAmount} {service.split(' ')[1]}</p>
                  </div>
                  
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Real, high-quality engagement</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>24/48 hour delivery</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                    <CheckCircle className="h-4 w-4 text-green-500" />
                    <span>Money-back guarantee</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Post Selection Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    {getTypeIcon(selectedData.type)}
                    {service.includes('Followers') || service.includes('Subscribers') ? 'Account Selection' : 'Post Selection'}
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Platform and Type Display */}
                  <div className="flex items-center gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
                    <div className="flex items-center gap-2">
                      {getPlatformIcon(platform)}
                      <span className="font-medium capitalize">{platform}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      {getTypeIcon(selectedData.type)}
                      <span className="font-medium capitalize">{selectedData.type}</span>
                    </div>
                    <Badge variant="secondary">{service}</Badge>
                  </div>

                  {/* URL Input */}
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      {service.includes('Followers') || service.includes('Subscribers') ? 'Account URL' : 'Post URL'}
                    </label>
                    <div className="relative">
                      <Input
                        type="url"
                        placeholder={getPlaceholderText()}
                        value={selectedData.url}
                        onChange={(e) => handleUrlChange(e.target.value)}
                        className={`pr-10 ${validationError ? 'border-red-500' : validationSuccess ? 'border-green-500' : ''}`}
                      />
                      {isValidating && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-purple-600"></div>
                        </div>
                      )}
                      {validationSuccess && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          <CheckCircle className="h-4 w-4 text-green-500" />
                        </div>
                      )}
                      {validationError && (
                        <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                          <AlertCircle className="h-4 w-4 text-red-500" />
                        </div>
                      )}
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                      {getHelpText()}
                    </p>
                    {validationError && (
                      <p className="text-sm text-red-600 dark:text-red-400">{validationError}</p>
                    )}
                    {validationSuccess && (
                      <p className="text-sm text-green-600 dark:text-green-400">URL validated successfully!</p>
                    )}
                  </div>

                  {/* Optional Description */}
                  {/* <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      Additional Notes (Optional)
                    </label>
                    <textarea
                      placeholder="Any special instructions or notes for your order..."
                      value={selectedData.description}
                      onChange={(e) => setSelectedData(prev => ({ ...prev, description: e.target.value }))}
                      className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                      rows={3}
                    />
                  </div> */}

                  {/* Action Buttons */}
                  <div className="flex justify-between pt-4">
                    <Button
                      variant="outline"
                      onClick={() => navigate(-1)}
                      className="flex items-center gap-2"
                    >
                      <ArrowLeft className="h-4 w-4" />
                      Back
                    </Button>
                    <Button
                      onClick={handleContinue}
                      disabled={!selectedData.url || isValidating}
                      className="flex items-center gap-2"
                    >
                      Continue to Checkout
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default PostSelection; 