import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Star, Shield, Zap, Users, Clock, Heart, TrendingUp, Loader2 } from 'lucide-react';
import FAQSection from '@/components/FAQSection';
import BenefitsSection from '@/components/BenefitsSection';
import ServiceHowItWorks from '@/components/ServiceHowItWorks';
import ServiceTestimonials from '@/components/ServiceTestimonials';
import { useServices } from '@/hooks/useServices';

const TikTokLikes = () => {
  const [selectedPackage, setSelectedPackage] = useState('');
  const navigate = useNavigate();

  // Fetch TikTok likes services from backend
  const { services, loading, error } = useServices({
    category: 'TikTok',
    type: 'likes',
    active: true
  });

  // Transform backend data to match frontend structure
  const packages = services.map(service => ({
    id: service._id || service.id,
    likes: service.quantity || service.minQuantity,
    price: `$${service.price}`,
    popular: service.popular || false,
    description: service.description,
    features: service.features || []
  }));

  const handleOrderClick = () => {
    if (selectedPackage) {
      const pkg = packages.find(p => p.id === selectedPackage);
      if (pkg) {
        navigate(`/post-selection?service=TikTok Likes&package=${pkg.likes}&price=${pkg.price}`);
      }
    }
  };

  const features = [
    { icon: <Check className="h-5 w-5 text-green-500" />, text: "100% Real TikTok Likes" },
    { icon: <Shield className="h-5 w-5 text-blue-500" />, text: "Safe & Secure Delivery" },
    { icon: <Zap className="h-5 w-5 text-yellow-500" />, text: "Instant Start" },
    { icon: <Star className="h-5 w-5 text-purple-500" />, text: "24/7 Customer Support" },
  ];

  const benefits = [
    {
      icon: <Heart className="h-6 w-6" />,
      title: "Real Active Likes",
      description: "All likes come from genuine, active TikTok accounts that engage with content regularly."
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "100% Safe & Secure",
      description: "Our methods are completely safe and comply with TikTok's terms of service. No risk to your account."
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Fast Delivery",
      description: "See results within minutes. We start processing your order immediately after payment."
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Boost Engagement",
      description: "More likes lead to increased visibility and help your videos reach the For You page."
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Attract More Viewers",
      description: "Videos with high like counts naturally attract more organic engagement and followers."
    },
    {
      icon: <Star className="h-6 w-6" />,
      title: "24/7 Support",
      description: "Our customer support team is available round the clock to help you with any questions."
    }
  ];

  const testimonials = [
    {
      name: "Maya Chen",
      role: "Content Creator",
      image: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "My TikTok videos started getting way more organic likes after I boosted them. The algorithm picked them up!"
    },
    {
      name: "Jake Miller",
      role: "Comedian",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "Fast delivery and real likes! My comedy skits are now reaching thousands more people."
    },
    {
      name: "Sofia Rodriguez",
      role: "Fitness Influencer",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "The likes helped my workout videos gain traction. Now I have a growing fitness community!"
    }
  ];

  const faqs = [
    {
      question: "Are the TikTok likes real?",
      answer: "Yes, all our TikTok likes are 100% real and come from active TikTok accounts. We never use bots or fake profiles."
    },
    {
      question: "How quickly will I receive my likes?",
      answer: "We typically start delivering likes within 15-30 minutes of your order. Most orders are completed within 1-2 hours."
    },
    {
      question: "Is it safe for my TikTok account?",
      answer: "Absolutely! Our methods are completely safe and comply with TikTok's terms of service. We use gradual delivery to ensure your account remains secure."
    },
    {
      question: "Do you need my TikTok password?",
      answer: "No, we never ask for your password. We only need the link to your TikTok video to deliver the likes."
    },
    {
      question: "What if the likes drop?",
      answer: "We offer a 30-day refill guarantee. If any likes drop within 30 days, we'll replace them for free."
    },
    {
      question: "Can I split likes across multiple videos?",
      answer: "Currently, each order is for a single video. If you want to boost multiple videos, please place separate orders for each."
    }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <div className="pt-20 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="text-center">
                <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-purple-600" />
                <p className="text-gray-600 dark:text-gray-300">Loading TikTok Likes services...</p>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Navbar />
        <div className="pt-20 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                TikTok <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Likes</span>
              </h1>
              <p className="text-xl text-red-600 dark:text-red-400 mb-4">Error loading services: {error}</p>
              <Button onClick={() => window.location.reload()}>Try Again</Button>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <div className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 dark:text-white mb-6">
              Buy TikTok <span className="bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">Likes</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Boost your TikTok videos with real, high-quality likes. Increase engagement and reach more people.
            </p>
          </div>

          {/* Features */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-3 bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm">
                {feature.icon}
                <span className="text-sm font-medium text-gray-900 dark:text-white">{feature.text}</span>
              </div>
            ))}
          </div>

          {/* Package Selection */}
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-900 dark:text-white mb-8">
              Choose Your Package
            </h2>
            
            {packages.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 dark:text-gray-300 text-lg">No TikTok Likes packages available at the moment.</p>
                <p className="text-gray-500 dark:text-gray-400 mt-2">Please check back later or contact support.</p>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {packages.map((pkg) => (
                    <Card 
                      key={pkg.id}
                      className={`relative cursor-pointer transition-all duration-200 ${
                        selectedPackage === pkg.id 
                          ? 'ring-2 ring-purple-500 shadow-lg' 
                          : 'hover:shadow-md'
                      } ${pkg.popular ? 'border-purple-500' : ''}`}
                      onClick={() => setSelectedPackage(pkg.id)}
                    >
                      {pkg.popular && (
                        <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-purple-500">
                          Most Popular
                        </Badge>
                      )}
                      <CardHeader className="text-center">
                        <CardTitle className="text-2xl font-bold text-purple-600">
                          {pkg.likes} Likes
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="text-center">
                        <div className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                          {pkg.price}
                        </div>
                        <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                          <li>✓ High-Quality Likes</li>
                          <li>✓ Fast Delivery</li>
                          <li>✓ 30-Day Refill Guarantee</li>
                          <li>✓ 24/7 Support</li>
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="text-center">
                  <Button 
                    size="lg"
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3"
                    disabled={!selectedPackage}
                    onClick={handleOrderClick}
                  >
                    {selectedPackage ? `Order ${packages.find(p => p.id === selectedPackage)?.likes} Likes` : 'Select a Package'}
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <BenefitsSection benefits={benefits} />
      <ServiceHowItWorks />
      <ServiceTestimonials testimonials={testimonials} platform="TikTok" />
      <FAQSection faqs={faqs} />

      <Footer />
    </div>
  );
};

export default TikTokLikes;
