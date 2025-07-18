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
import SEOHead from '@/components/SEOHead';
import { useSEO } from '@/hooks/useSEO';

const InstagramFollowers = () => {
  const { seoData } = useSEO();
  const [selectedPackage, setSelectedPackage] = useState('');
  const navigate = useNavigate();

  // Fetch Instagram followers services from backend
  const { services, loading, error } = useServices({
    category: 'Instagram',
    type: 'followers',
    active: true
  });

  // Transform backend data to match frontend structure
  const packages = services.map(service => ({
    id: service._id || service.id,
    followers: service.quantity || service.minQuantity,
    price: `$${service.price}`,
    popular: service.popular || false,
    description: service.description,
    features: service.features || []
  }));

  const handleOrderClick = () => {
    if (selectedPackage) {
      const pkg = packages.find(p => p.id === selectedPackage);
      if (pkg) {
        navigate(`/post-selection?service=Instagram Followers&package=${pkg.followers}&price=${pkg.price}`);
      }
    }
  };

  const benefits = [
    {
      icon: "🚀",
      title: "Instant Growth",
      description: "See your follower count increase within minutes of placing your order."
    },
    {
      icon: "🔒",
      title: "100% Safe",
      description: "Our methods are completely safe and won't risk your Instagram account."
    },
    {
      icon: "💰",
      title: "Affordable Pricing",
      description: "Get premium Instagram followers at prices that won't break the bank."
    },
    {
      icon: "🎯",
      title: "Real Followers",
      description: "Gain authentic followers that actually engage with your content."
    },
    {
      icon: "📈",
      title: "Proven Results",
      description: "Join thousands of satisfied customers who have successfully grown their Instagram presence."
    },
    {
      icon: "🛡️",
      title: "Money-Back Guarantee",
      description: "Not satisfied? We offer a 30-day money-back guarantee on all our services."
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Instagram Influencer",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "Likes.IO helped me grow from 1K to 50K followers in just 3 months! The engagement is real and my brand partnerships have increased significantly."
    },
    {
      name: "Mike Chen",
      role: "Business Owner",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "As a business owner, having more Instagram followers builds credibility. Likes.IO delivered exactly what they promised - real, active followers."
    },
    {
      name: "Emma Rodriguez",
      role: "Content Creator",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "I was struggling to grow my Instagram following. After using Likes.IO, I'm now getting organic growth and brand collaboration offers!"
    }
  ];

  const faqs = [
    {
      question: "How quickly will I receive my Instagram followers?",
      answer: "Most orders start delivering within 30 minutes to 2 hours. Full delivery typically completes within 24-48 hours depending on the quantity ordered."
    },
    {
      question: "Are the followers real and safe?",
      answer: "Yes, we provide real followers from active Instagram accounts. Our methods are completely safe and won't risk your account in any way."
    },
    {
      question: "Do I need to provide my Instagram password?",
      answer: "No, we never ask for your password. We only need your Instagram username to deliver the followers to your account."
    },
    {
      question: "What if I'm not satisfied with the service?",
      answer: "We offer a 30-day money-back guarantee. If you're not completely satisfied with our Instagram followers service, we'll refund your purchase."
    },
    {
      question: "Do you offer different quality levels?",
      answer: "Yes, we offer both general and premium quality Instagram followers. Premium followers come from higher-quality accounts with better engagement rates."
    },
    {
      question: "Will these followers help me get more organic growth?",
      answer: "Absolutely! Having more followers increases your account's credibility and can help attract more organic followers and engagement."
    }
  ];

  return (
    <>
      <SEOHead seoData={seoData} />
      <div className="min-h-screen bg-white dark:bg-gray-950">
        <Navbar />

        {/* Hero Section */}
        <div className="pt-20 pb-16 bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
                Buy Instagram Followers
              </h1>
              <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
                Grow your Instagram following with real, active followers. Increase your reach, build credibility, and attract more organic engagement.
              </p>
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <Shield className="h-4 w-4 mr-1 text-green-500" />
                  <span>100% Safe & Secure</span>
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <Zap className="h-4 w-4 mr-1 text-yellow-500" />
                  <span>Instant Delivery</span>
                </div>
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <Star className="h-4 w-4 mr-1 text-purple-500" />
                  <span>Premium Quality</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Pricing Section */}
        <div className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Choose Your Instagram Followers Package
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Select the perfect package to grow your Instagram following
              </p>
            </div>

            {loading ? (
              <div className="text-center py-12">
                <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-purple-600" />
                <p className="text-gray-600 dark:text-gray-300">Loading packages...</p>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-red-600 dark:text-red-400 mb-4">Failed to load packages. Please try again.</p>
                <Button onClick={() => window.location.reload()}>Retry</Button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                {packages.map((pkg) => (
                  <Card 
                    key={pkg.id} 
                    className={`relative cursor-pointer transition-all duration-300 hover:shadow-xl ${
                      selectedPackage === pkg.id ? 'ring-2 ring-purple-500 shadow-lg' : ''
                    } ${pkg.popular ? 'border-purple-500' : ''}`}
                    onClick={() => setSelectedPackage(pkg.id)}
                  >
                    {pkg.popular && (
                      <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-purple-600 to-blue-600">
                        Most Popular
                      </Badge>
                    )}
                    <CardHeader className="text-center">
                      <CardTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                        {pkg.followers.toLocaleString()} Followers
                      </CardTitle>
                      <div className="text-3xl font-bold text-purple-600">
                        {pkg.price}
                      </div>
                      <p className="text-gray-600 dark:text-gray-400">
                        {pkg.description}
                      </p>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-3 mb-6">
                        <li className="flex items-center text-sm">
                          <Check className="h-4 w-4 mr-2 text-green-500" />
                          Real Instagram followers
                        </li>
                        <li className="flex items-center text-sm">
                          <Check className="h-4 w-4 mr-2 text-green-500" />
                          Instant delivery
                        </li>
                        <li className="flex items-center text-sm">
                          <Check className="h-4 w-4 mr-2 text-green-500" />
                          100% safe & secure
                        </li>
                        <li className="flex items-center text-sm">
                          <Check className="h-4 w-4 mr-2 text-green-500" />
                          Money-back guarantee
                        </li>
                      </ul>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}

            {/* Order Button */}
            <div className="text-center">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-4 text-lg"
                onClick={handleOrderClick}
                disabled={!selectedPackage}
              >
                {selectedPackage ? 'Order Now' : 'Select a Package'}
              </Button>
            </div>
          </div>
        </div>

        {/* Benefits Section */}
        <BenefitsSection
          title="Why Choose Our Instagram Followers Service?"
          subtitle="Experience the benefits that make us the #1 choice for Instagram growth"
          benefits={benefits}
        />

        {/* How It Works */}
        <ServiceHowItWorks />

        {/* Testimonials */}
        <ServiceTestimonials
          testimonials={testimonials}
          platform="Instagram"
          title="What Our Customers Say"
          subtitle="Join thousands of satisfied customers who have grown their Instagram following"
        />

        {/* FAQ Section */}
        <FAQSection
          title="Frequently Asked Questions"
          faqs={faqs}
        />

        <Footer />
      </div>
    </>
  );
};

export default InstagramFollowers;