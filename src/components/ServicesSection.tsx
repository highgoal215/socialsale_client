
import React from 'react';
import { Link } from 'react-router-dom';
import { Instagram, Heart, Eye, Users, ThumbsUp, Play, Youtube } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ServicesSection = () => {
  const instagramServices = [
    {
      icon: Heart,
      title: "Instagram Likes",
      description: "Boost your post engagement with real likes from active users.",
      price: 2.99,
      features: ["Real likes", "Instant delivery", "No password required"],
      checkoutParams: { service: "Instagram Likes", package: "500", price: "$2.99" }
    },
    {
      icon: Users,
      title: "Instagram Followers",
      description: "Grow your follower count with genuine, active Instagram users.",
      price: 4.99,
      features: ["Real followers", "Gradual delivery", "High retention rate"],
      checkoutParams: { service: "Instagram Followers", package: "500", price: "$4.99" }
    },
    {
      icon: Eye,
      title: "Instagram Views",
      description: "Increase your story and reel views for maximum visibility.",
      price: 1.99,
      features: ["Story & reel views", "Fast delivery", "Safe & secure"],
      checkoutParams: { service: "Instagram Views", package: "1K", price: "$1.99" }
    }
  ];

  const tiktokServices = [
    {
      icon: Users,
      title: "TikTok Followers",
      description: "Build your TikTok audience with real, engaged followers.",
      price: 3.99,
      features: ["Real followers", "Quality guarantee", "24/7 support"],
      checkoutParams: { service: "TikTok Followers", package: "500", price: "$3.99" }
    },
    {
      icon: ThumbsUp,
      title: "TikTok Likes",
      description: "Get more likes on your TikTok videos to boost engagement.",
      price: 2.49,
      features: ["Instant likes", "Real users", "Lifetime guarantee"],
      checkoutParams: { service: "TikTok Likes", package: "500", price: "$2.49" }
    },
    {
      icon: Play,
      title: "TikTok Views",
      description: "Increase your video views and reach a wider audience.",
      price: 1.49,
      features: ["High-quality views", "Fast delivery", "Safe methods"],
      checkoutParams: { service: "TikTok Views", package: "2.5K", price: "$1.49" }
    }
  ];

  const youtubeServices = [
    {
      icon: Users,
      title: "YouTube Subscribers",
      description: "Build your YouTube channel with real, engaged subscribers.",
      price: 5.99,
      features: ["Real subscribers", "Quality guarantee", "24/7 support"],
      checkoutParams: { service: "YouTube Subscribers", package: "100", price: "$5.99" }
    },
    {
      icon: ThumbsUp,
      title: "YouTube Likes",
      description: "Get more likes on your YouTube videos to boost engagement.",
      price: 3.49,
      features: ["Instant likes", "Real users", "Lifetime guarantee"],
      checkoutParams: { service: "YouTube Likes", package: "500", price: "$3.49" }
    },
    {
      icon: Play,
      title: "YouTube Views",
      description: "Increase your video views and reach a wider audience.",
      price: 2.99,
      features: ["High-quality views", "Fast delivery", "Safe methods"],
      checkoutParams: { service: "YouTube Views", package: "2.5K", price: "$2.99" }
    }
  ];

  const ServiceCard = ({ service, platform }: { service: any, platform: string }) => {
    const getCheckoutUrl = () => {
      const params = new URLSearchParams(service.checkoutParams);
      return `/checkout?${params.toString()}`;
    };

    return (
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 border border-gray-100 dark:border-gray-700 group hover:border-purple-200 dark:hover:border-purple-600">
        <div className="flex items-center justify-between mb-4">
          <div className={`inline-flex items-center justify-center w-12 h-12 rounded-lg ${
            platform === 'instagram' 
              ? 'bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400' 
              : platform === 'tiktok'
              ? 'bg-gray-900 dark:bg-gray-700 text-white'
              : 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400'
          } group-hover:scale-110 transition-transform duration-300`}>
            <service.icon className="h-6 w-6" />
          </div>
          <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">${service.price}</div>
        </div>

        <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-2">{service.title}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{service.description}</p>

        <ul className="space-y-2 mb-6">
          {service.features.map((feature: string, index: number) => (
            <li key={index} className="flex items-center text-sm text-gray-600 dark:text-gray-400">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full mr-2"></div>
              {feature}
            </li>
          ))}
        </ul>

        <Link to={getCheckoutUrl()}>
          <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
            Get Started
          </Button>
        </Link>
      </div>
    );
  };

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Explore Our Top-Rated Services
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Choose from our comprehensive range of Instagram, TikTok, and YouTube growth services.
            All packages include real users, instant delivery, and 24/7 customer support.
          </p>
        </div>

        {/* Instagram Services */}
        <div className="mb-16">
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center gap-3">
              <Instagram className="h-8 w-8 text-pink-600 dark:text-pink-400" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">Instagram Services</h3>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {instagramServices.map((service, index) => (
              <ServiceCard key={index} service={service} platform="instagram" />
            ))}
          </div>
        </div>

        {/* TikTok Services */}
        <div className="mb-16">
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gray-900 dark:bg-gray-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">T</span>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">TikTok Services</h3>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {tiktokServices.map((service, index) => (
              <ServiceCard key={index} service={service} platform="tiktok" />
            ))}
          </div>
        </div>

        {/* YouTube Services */}
        <div className="mb-16">
          <div className="flex items-center justify-center mb-8">
            <div className="flex items-center gap-3">
              <Youtube className="h-8 w-8 text-red-600 dark:text-red-400" />
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white">YouTube Services</h3>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {youtubeServices.map((service, index) => (
              <ServiceCard key={index} service={service} platform="youtube" />
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="mt-16 text-center">
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Need a Custom Package?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6">
              Contact our team to create a personalized growth plan that fits your specific needs and budget.
            </p>
            <Link to="/contact">
              <Button variant="outline" size="lg" className="border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700">
                Contact Sales Team
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesSection;
