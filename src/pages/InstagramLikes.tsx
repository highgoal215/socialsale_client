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

const InstagramLikes = () => {
  const { seoData } = useSEO();
  const [selectedPackage, setSelectedPackage] = useState('');
  const navigate = useNavigate();

  // Fetch Instagram likes services from backend
  const { services, loading, error } = useServices({
    category: 'Instagram',
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
        navigate(`/post-selection?service=Instagram Likes&package=${pkg.likes}&price=${pkg.price}`);
      }
    }
  };

  const benefits = [
    {
      icon: "🚀",
      title: "Instant Delivery",
      description: "Get your Instagram likes delivered within minutes of placing your order."
    },
    {
      icon: "🔒",
      title: "100% Safe",
      description: "Our methods are completely safe and won't risk your Instagram account."
    },
    {
      icon: "💰",
      title: "Affordable Pricing",
      description: "Get premium Instagram likes at prices that won't break the bank."
    },
    {
      icon: "🎯",
      title: "Real Engagement",
      description: "Gain authentic likes that actually boost your post's visibility and reach."
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
      text: "Likes.IO helped me boost my Instagram engagement significantly! My posts now get much more visibility and I'm attracting more organic followers."
    },
    {
      name: "Mike Chen",
      role: "Business Owner",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "As a business owner, Instagram likes are crucial for building credibility. Likes.IO delivered exactly what they promised - real, high-quality likes."
    },
    {
      name: "Emma Rodriguez",
      role: "Content Creator",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "I was struggling to get engagement on my Instagram posts. After using Likes.IO, my posts are now reaching more people and getting organic engagement!"
    }
  ];

  const faqs = [
    {
      question: "How quickly will I receive my Instagram likes?",
      answer: "Most orders start delivering within 30 minutes to 2 hours. Full delivery typically completes within 24-48 hours depending on the quantity ordered."
    },
    {
      question: "Are the likes real and safe?",
      answer: "Yes, we provide real likes from active Instagram accounts. Our methods are completely safe and won't risk your account in any way."
    },
    {
      question: "Can I choose which posts to get likes on?",
      answer: "Yes! You can specify the exact Instagram post URL where you want to receive the likes. Just provide the post link during checkout."
    },
    {
      question: "What if I'm not satisfied with the service?",
      answer: "We offer a 30-day money-back guarantee. If you're not completely satisfied with our Instagram likes service, we'll refund your purchase."
    },
    {
      question: "Do you offer different quality levels?",
      answer: "Yes, we offer both general and premium quality Instagram likes. Premium likes come from higher-quality accounts with better engagement rates."
    },
    {
      question: "Will these likes help my post reach more people?",
      answer: "Absolutely! Instagram's algorithm favors posts with higher engagement. More likes can help your post appear in more feeds and explore pages."
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
                Buy Instagram Likes
              </h1>
              <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-3xl mx-auto">
                Boost your Instagram posts with real, high-quality likes. Increase engagement, reach more people, and grow your Instagram presence today.
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
                Choose Your Instagram Likes Package
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300">
                Select the perfect package to boost your Instagram engagement
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
                        {pkg.likes.toLocaleString()} Likes
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
                          Real Instagram likes
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
          title="Why Choose Our Instagram Likes Service?"
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
          subtitle="Join thousands of satisfied customers who have boosted their Instagram engagement"
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

export default InstagramLikes;
