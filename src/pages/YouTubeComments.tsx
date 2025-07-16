import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Check, Star, Shield, Zap, Users, Clock, MessageCircle, TrendingUp, Loader2 } from 'lucide-react';
import FAQSection from '@/components/FAQSection';
import BenefitsSection from '@/components/BenefitsSection';
import ServiceHowItWorks from '@/components/ServiceHowItWorks';
import ServiceTestimonials from '@/components/ServiceTestimonials';
import { useServices } from '@/hooks/useServices';

const YouTubeComments = () => {
  const [selectedPackage, setSelectedPackage] = useState('');
  const navigate = useNavigate();

  // Fetch YouTube comments services from backend
  const { services, loading, error } = useServices({
    category: 'YouTube',
    type: 'comments',
    active: true
  });

  // Transform backend data to match frontend structure
  const packages = services.map(service => ({
    id: service._id || service.id,
    comments: service.quantity || service.minQuantity,
    price: `$${service.price}`,
    popular: service.popular || false,
    description: service.description,
    features: service.features || []
  }));

  const handleOrderClick = () => {
    if (selectedPackage) {
      const pkg = packages.find(p => p.id === selectedPackage);
      if (pkg) {
        navigate(`/checkout?service=YouTube Comments&package=${pkg.comments}&price=${pkg.price}`);
      }
    }
  };

  const features = [
    { icon: <Check className="h-5 w-5 text-green-500" />, text: "100% Real YouTube Comments" },
    { icon: <Shield className="h-5 w-5 text-blue-500" />, text: "Safe & Secure Delivery" },
    { icon: <Zap className="h-5 w-5 text-yellow-500" />, text: "Custom Comments Available" },
    { icon: <Star className="h-5 w-5 text-purple-500" />, text: "24/7 Customer Support" },
  ];

  const benefits = [
    {
      icon: <MessageCircle className="h-6 w-6" />,
      title: "Real Engaging Comments",
      description: "All comments come from genuine YouTube users with authentic, relevant messages about your content."
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "100% Safe & Secure",
      description: "Our methods are completely safe and comply with YouTube's terms of service. No risk to your channel."
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Fast Delivery",
      description: "See results within 2-6 hours. We start processing your order immediately after payment."
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Algorithm Boost",
      description: "Comments increase engagement signals, helping YouTube's algorithm promote your content."
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Social Proof",
      description: "Active comment sections make your videos appear more engaging and encourage organic discussion."
    },
    {
      icon: <Star className="h-6 w-6" />,
      title: "24/7 Support",
      description: "Our customer support team is available round the clock to help you with any questions."
    }
  ];

  const testimonials = [
    {
      name: "Jessica Parker",
      role: "Cooking Channel",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "The comments on my recipe videos look so natural! They sparked real conversations with my viewers."
    },
    {
      name: "Tom Wilson",
      role: "Tech Reviewer",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "Perfect service! The comments helped boost engagement and my tech reviews are ranking higher now."
    },
    {
      name: "Lisa Rodriguez",
      role: "Travel Vlogger",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "Great quality comments that match my travel content perfectly. My videos feel more alive now!"
    }
  ];

  const faqs = [
    {
      question: "Are the YouTube comments real?",
      answer: "Yes, all our YouTube comments are written by real users. We provide authentic, relevant comments that match your video content."
    },
    {
      question: "Can I customize the comments?",
      answer: "Yes! You can provide specific instructions or themes for the comments, and we'll ensure they're relevant to your video content."
    },
    {
      question: "How quickly will I receive my comments?",
      answer: "We typically start delivering comments within 2-6 hours of your order. Comments are posted gradually to look natural."
    },
    {
      question: "Is it safe for my YouTube channel?",
      answer: "Absolutely! Our methods are completely safe and comply with YouTube's terms of service. Comments are posted naturally over time."
    },
    {
      question: "Do you need my YouTube password?",
      answer: "No, we never ask for your password. We only need the link to your YouTube video to deliver the comments."
    },
    {
      question: "What if I don't like some of the comments?",
      answer: "We ensure all comments are positive and relevant. However, if you're not satisfied, we offer revisions within 24 hours of delivery."
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
                <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-red-600" />
                <p className="text-gray-600 dark:text-gray-300">Loading YouTube Comments services...</p>
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
                YouTube <span className="bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">Comments</span>
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
              Buy YouTube <span className="bg-gradient-to-r from-red-600 to-red-500 bg-clip-text text-transparent">Comments</span>
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Boost your YouTube video engagement with real, high-quality comments. Create active discussions.
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
                <p className="text-gray-600 dark:text-gray-300 text-lg">No YouTube Comments packages available at the moment.</p>
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
                          ? 'ring-2 ring-red-500 shadow-lg' 
                          : 'hover:shadow-md'
                      } ${pkg.popular ? 'border-red-500' : ''}`}
                      onClick={() => setSelectedPackage(pkg.id)}
                    >
                      {pkg.popular && (
                        <Badge className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-red-500">
                          Most Popular
                        </Badge>
                      )}
                      <CardHeader className="text-center">
                        <CardTitle className="text-2xl font-bold text-red-600">
                          {pkg.comments} Comments
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="text-center">
                        <div className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                          {pkg.price}
                        </div>
                        <ul className="text-sm text-gray-600 dark:text-gray-300 space-y-2">
                          <li>✓ High-Quality Comments</li>
                          <li>✓ Custom Messages</li>
                          <li>✓ Natural Delivery</li>
                          <li>✓ 24/7 Support</li>
                        </ul>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                <div className="text-center">
                  <Button 
                    size="lg"
                    className="bg-gradient-to-r from-red-600 to-red-500 hover:from-red-700 hover:to-red-600 text-white px-8 py-3"
                    disabled={!selectedPackage}
                    onClick={handleOrderClick}
                  >
                    {selectedPackage ? `Order ${packages.find(p => p.id === selectedPackage)?.comments} Comments` : 'Select a Package'}
                  </Button>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      <BenefitsSection benefits={benefits} />
      <ServiceHowItWorks />
      <ServiceTestimonials testimonials={testimonials} platform="YouTube" />
      <FAQSection faqs={faqs} />

      <Footer />
    </div>
  );
};

export default YouTubeComments;
