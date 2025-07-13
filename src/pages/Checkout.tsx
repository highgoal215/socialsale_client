
import React, { useState, useEffect } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { CreditCard, Wallet, Bitcoin, Shield, CheckCircle } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { ProcessSocialOrderPayment } from '@/api/order';

const Checkout = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [selectedPackage, setSelectedPackage] = useState('');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    postUrl: '',
    email: '',
    cardNumber: '',
    expiryDate: '',
    cvc: '',
    cardholderName: ''
  });

  // Get package details from URL params
  const service = searchParams.get('service') || 'Instagram Views';
  const packageAmount = searchParams.get('package') || '5K';
  const price = searchParams.get('price') || '$6.99';

  useEffect(() => {
    if (service && packageAmount) {
      setSelectedPackage(`${service} - ${packageAmount}`);
    }
  }, [service, packageAmount]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Basic validation
    if (!formData.username || !formData.email) {
      alert('Please fill in all required fields.');
      return;
    }
    
    // Check if postUrl is required for all service types
    if (!formData.postUrl) {
      alert('Post/Video URL is required for all service types.');
      return;
    }
    
    if (paymentMethod === 'card') {
      if (!formData.cardNumber || !formData.expiryDate || !formData.cvc || !formData.cardholderName) {
        alert('Please fill in all card payment details.');
        return;
      }
    }
    
    setIsProcessing(true);
    
    try {
      // Map service name to service type
      const mapServiceType = (serviceName: string): string => {
        const serviceMap: { [key: string]: string } = {
          'Instagram Followers': 'followers',
          'Instagram Likes': 'likes',
          'Instagram Views': 'views',
          'Instagram Comments': 'comments',
          'TikTok Followers': 'followers',
          'TikTok Likes': 'likes',
          'TikTok Views': 'views',
          'TikTok Comments': 'comments',
          'YouTube Followers': 'followers',
          'YouTube Likes': 'likes',
          'YouTube Views': 'views',
          'YouTube Comments': 'comments'
        };
        return serviceMap[serviceName] || 'followers';
      };


      
      // Parse quantity from package amount (e.g., "5K" -> 5000)
      const parseQuantity = (packageAmount: string): number => {
        const num = packageAmount.replace(/[^\d.]/g, '');
        if (packageAmount.includes('K')) {
          return parseInt(num) * 1000;
        } else if (packageAmount.includes('M')) {
          return parseInt(num) * 1000000;
        }
        return parseInt(num);
      };

      // Prepare payment data
      const paymentData = {
        socialUsername: formData.username,
        email: formData.email,
        paymentMethod: paymentMethod as 'card' | 'paypal' | 'crypto',
        serviceType: mapServiceType(service),
        quality: 'general' as 'general' | 'premium', // Default to general, can be enhanced later
        quantity: parseQuantity(packageAmount),
        postUrl: formData.postUrl,
        // Card payment details
        ...(paymentMethod === 'card' && {
          cardNumber: formData.cardNumber,
          expiryDate: formData.expiryDate,
          cvcNumber: formData.cvc,
          cardholderName: formData.cardholderName
        }),
        // Crypto payment details (can be enhanced later)
        ...(paymentMethod === 'crypto' && {
          cryptoType: 'bitcoin' as 'bitcoin' | 'ethereum' | 'usdc'
        })
      };

      console.log('Processing payment:', paymentData);
      
      const result = await ProcessSocialOrderPayment(paymentData);
      
      if (result.success) {
        alert('Payment processed successfully! Your order will be delivered within 24 hours.');
        // Redirect to tracking page or order confirmation
        navigate('/tracking');
      } else {
        alert(`Payment failed: ${result.message}`);
      }
    } catch (error) {
      console.error('Payment processing error:', error);
      alert('An error occurred while processing your payment. Please try again.');
    } finally {
      setIsProcessing(false);
    }
  };

  const packages = [
    { id: 'views-1k', name: '1K Instagram Views', price: 1.99 },
    { id: 'views-2.5k', name: '2.5K Instagram Views', price: 3.99 },
    { id: 'views-5k', name: '5K Instagram Views', price: 6.99 },
    { id: 'views-10k', name: '10K Instagram Views', price: 12.99 },
    { id: 'views-25k', name: '25K Instagram Views', price: 29.99 },
    { id: 'views-50k', name: '50K Instagram Views', price: 54.99 },
  ];

  const selectedPkg = packages.find(pkg => pkg.name.includes(packageAmount)) || packages[2];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <Navbar />
      
      <div className="pt-20 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">Secure Checkout</h1>
            <p className="text-lg text-gray-600 dark:text-gray-300">Complete your order safely and securely</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Order Summary */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm h-fit">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Order Summary</h2>

              {/* Selected Package Display */}
              <div className="mb-6 p-4 bg-purple-50 dark:bg-purple-900/20 rounded-lg">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white">{service}</h3>
                  <span className="text-2xl font-bold text-purple-600 dark:text-purple-400">{price}</span>
                </div>
                <p className="text-gray-600 dark:text-gray-300">{packageAmount} {service.split(' ')[1]}</p>
              </div>

              {/* Package Selection Options */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
                  Or choose a different package:
                </label>
                <div className="space-y-2 max-h-40 overflow-y-auto">
                  {packages.map((pkg) => (
                    <label key={pkg.id} className="flex items-center p-2 rounded hover:bg-gray-50 dark:hover:bg-gray-700">
                      <input
                        type="radio"
                        name="package"
                        value={pkg.id}
                        checked={selectedPackage.includes(pkg.name.split(' ')[0])}
                        onChange={() => setSelectedPackage(pkg.name)}
                        className="h-4 w-4 text-purple-600 focus:ring-purple-500"
                      />
                      <span className="ml-3 flex-1 flex justify-between text-sm">
                        <span className="text-gray-900 dark:text-white">{pkg.name}</span>
                        <span className="font-bold text-purple-600 dark:text-purple-400">${pkg.price}</span>
                      </span>
                    </label>
                  ))}
                </div>
              </div>


              {/* Guarantees */}
              <div className="mt-6 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                <div className="space-y-2">
                  <div className="flex items-center text-sm text-green-800 dark:text-green-300">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    <span>100% Money-Back Guarantee</span>
                  </div>
                  <div className="flex items-center text-sm text-green-800 dark:text-green-300">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    <span>Real & Active Users</span>
                  </div>
                  <div className="flex items-center text-sm text-green-800 dark:text-green-300">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    <span>Fast Delivery (24-48 hours)</span>
                  </div>
                  <div className="flex items-center text-sm text-green-800 dark:text-green-300">
                    <CheckCircle className="h-4 w-4 mr-2" />
                    <span>24/7 Customer Support</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Payment Form */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Payment Information</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Account Details */}
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-4">Account Details</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        {service.includes('Instagram') ? 'Instagram Username' : service.includes('TikTok') ? 'TikTok Username' : 'YouTube Username'}
                      </label>
                      <Input 
                        name="username"
                        placeholder={`@your${service.includes('Instagram') ? 'instagram' : service.includes('TikTok') ? 'tiktok' : 'youtube'}`}
                        value={formData.username}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    {/* Post/Video URL field - Required for all services */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Post/Video URL (Required)
                      </label>
                      <Input 
                        name="postUrl"
                        placeholder="https://instagram.com/p/your-post-id"
                        value={formData.postUrl}
                        onChange={handleInputChange}
                        required
                      />
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {service.includes('Instagram') && 'Enter the URL of your Instagram post'}
                        {service.includes('TikTok') && 'Enter the URL of your TikTok video'}
                        {service.includes('YouTube') && 'Enter the URL of your YouTube video'}
                      </p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Email Address
                      </label>
                      <Input 
                        name="email"
                        type="email"
                        placeholder="your@email.com"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                </div>

                {/* Payment Method Selection */}
                <div>
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-4">Payment Method</h3>
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('card')}
                      className={`p-4 border rounded-lg flex flex-col items-center transition-all ${
                        paymentMethod === 'card' 
                          ? 'border-purple-600 bg-purple-50 dark:bg-purple-900/20 text-purple-600' 
                          : 'border-gray-200 dark:border-gray-600 hover:border-gray-300'
                      }`}
                    >
                      <CreditCard className="h-6 w-6 mb-2" />
                      <span className="text-sm font-medium">Card</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('paypal')}
                      className={`p-4 border rounded-lg flex flex-col items-center transition-all ${
                        paymentMethod === 'paypal' 
                          ? 'border-purple-600 bg-purple-50 dark:bg-purple-900/20 text-purple-600' 
                          : 'border-gray-200 dark:border-gray-600 hover:border-gray-300'
                      }`}
                    >
                      <Wallet className="h-6 w-6 mb-2" />
                      <span className="text-sm font-medium">PayPal</span>
                    </button>
                    <button
                      type="button"
                      onClick={() => setPaymentMethod('crypto')}
                      className={`p-4 border rounded-lg flex flex-col items-center transition-all ${
                        paymentMethod === 'crypto' 
                          ? 'border-purple-600 bg-purple-50 dark:bg-purple-900/20 text-purple-600' 
                          : 'border-gray-200 dark:border-gray-600 hover:border-gray-300'
                      }`}
                    >
                      <Bitcoin className="h-6 w-6 mb-2" />
                      <span className="text-sm font-medium">Crypto</span>
                    </button>
                  </div>
                </div>

                {/* Payment Forms */}
                {paymentMethod === 'card' && (
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Card Number
                      </label>
                      <Input 
                        name="cardNumber"
                        placeholder="1234 5678 9012 3456"
                        value={formData.cardNumber}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          Expiry Date
                        </label>
                        <Input 
                          name="expiryDate"
                          placeholder="MM/YY"
                          value={formData.expiryDate}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                          CVC
                        </label>
                        <Input 
                          name="cvc"
                          placeholder="123"
                          value={formData.cvc}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                        Cardholder Name
                      </label>
                      <Input 
                        name="cardholderName"
                        placeholder="John Doe"
                        value={formData.cardholderName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>
                )}

                {paymentMethod === 'paypal' && (
                  <div className="p-6 bg-blue-50 dark:bg-blue-900/20 rounded-lg text-center">
                    <p className="text-blue-800 dark:text-blue-300 mb-4">You will be redirected to PayPal to complete your payment securely.</p>
                    <Button type="button" className="bg-blue-600 hover:bg-blue-700 text-white">
                      Continue with PayPal
                    </Button>
                  </div>
                )}

                {paymentMethod === 'crypto' && (
                  <div className="p-6 bg-orange-50 dark:bg-orange-900/20 rounded-lg">
                    <p className="text-orange-800 dark:text-orange-300 mb-4">Select your preferred cryptocurrency:</p>
                    <div className="grid grid-cols-3 gap-3">
                      <Button type="button" variant="outline">Bitcoin</Button>
                      <Button type="button" variant="outline">Ethereum</Button>
                      <Button type="button" variant="outline">USDC</Button>
                    </div>
                  </div>
                )}

                {/* Security Notice */}
                <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <Shield className="h-5 w-5 text-green-600" />
                  <p className="text-sm text-gray-700 dark:text-gray-300">
                    Your payment information is secure and encrypted with 256-bit SSL technology.
                  </p>
                </div>

                {/* Complete Order Button */}
                <Button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white text-lg py-4 rounded-lg font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
                  size="lg"
                >
                  {isProcessing ? 'Processing Payment...' : `Complete Order - ${price}`}
                </Button>

                <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
                  By completing this order, you agree to our{' '}
                  <Link to="/terms" className="text-purple-600 hover:underline">Terms of Service</Link>{' '}
                  and{' '}
                  <Link to="/privacy" className="text-purple-600 hover:underline">Privacy Policy</Link>.
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Checkout;
