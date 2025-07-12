import React from 'react';
import { TrendingUp, Shield, Users, Zap } from 'lucide-react';

const FeatureHighlights = () => {
  const features = [
    {
      icon: TrendingUp,
      title: "Boost Growth",
      description: "Accelerate your social media growth with our proven strategies and real engagement.",
      color: "purple"
    },
    {
      icon: Shield,
      title: "Social Proof",
      description: "Build credibility and trust with authentic followers and engagement from real users.",
      color: "blue"
    },
    {
      icon: Users,
      title: "100% Real",
      description: "All our followers, likes, and views come from genuine, active social media accounts.",
      color: "green"
    },
    {
      icon: Zap,
      title: "Instant Delivery",
      description: "See results within 24-48 hours. No waiting, no delays - just fast, reliable growth.",
      color: "orange"
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      purple: "bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400",
      blue: "bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400",
      green: "bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400",
      orange: "bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400"
    };
    return colors[color as keyof typeof colors];
  };

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Why Is Likes.IO the Best Instagram & TikTok Growth Service?
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            We've helped over 100,000 creators and businesses achieve their social media goals
            with our industry-leading features and unmatched service quality.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm hover:shadow-lg transition-shadow duration-300 text-center group border border-gray-100 dark:border-gray-700"
            >
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${getColorClasses(feature.color)} mb-6 group-hover:scale-110 transition-transform duration-300`}>
                <feature.icon className="h-8 w-8" />
              </div>

              <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                {feature.title}
              </h3>

              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="mt-16 bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm border border-gray-100 dark:border-gray-700">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-purple-600 dark:text-purple-400 mb-2">100K+</div>
              <div className="text-gray-600 dark:text-gray-300">Happy Customers</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">50M+</div>
              <div className="text-gray-600 dark:text-gray-300">Followers Delivered</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-green-600 dark:text-green-400 mb-2">99.8%</div>
              <div className="text-gray-600 dark:text-gray-300">Success Rate</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-600 dark:text-orange-400 mb-2">24/7</div>
              <div className="text-gray-600 dark:text-gray-300">Customer Support</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeatureHighlights;
