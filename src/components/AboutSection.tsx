import React from 'react';
import { Target, Shield, Users, Zap } from 'lucide-react';

const AboutSection = () => {
  const values = [
    {
      icon: Target,
      title: "Mission-Driven",
      description: "Empowering creators and businesses to achieve their social media goals"
    },
    {
      icon: Shield,
      title: "Trustworthy",
      description: "100% safe, secure, and compliant with platform guidelines"
    },
    {
      icon: Users,
      title: "Community-Focused",
      description: "Building a supportive ecosystem for digital growth and success"
    },
    {
      icon: Zap,
      title: "Innovation-Led",
      description: "Constantly evolving our methods to deliver the best results"
    }
  ];

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <div>
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6">
              What is Likes.IO?
            </h2>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              Likes.IO is the world's leading social media growth service, trusted by over 100,000
              creators, influencers, and businesses worldwide. Since 2020, we've been helping people
              amplify their online presence with authentic, high-quality growth solutions.
            </p>

            <p className="text-lg text-gray-600 dark:text-gray-300 mb-8 leading-relaxed">
              Our mission is simple: to democratize social media success by providing affordable,
              effective, and safe growth services that deliver real results. We believe everyone
              deserves the opportunity to reach their full potential on social media platforms.
            </p>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-purple-50 dark:bg-purple-900/30 rounded-lg p-4">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-1">100K+</div>
                <div className="text-gray-700 dark:text-gray-300">Satisfied Customers</div>
              </div>
              <div className="bg-blue-50 dark:bg-blue-900/30 rounded-lg p-4">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-1">50M+</div>
                <div className="text-gray-700 dark:text-gray-300">Growth Delivered</div>
              </div>
            </div>
          </div>

          {/* Right Illustration */}
          <div className="relative">
            <div className="bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/20 dark:to-blue-900/20 rounded-2xl p-8 text-center border border-gray-100 dark:border-gray-700">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full text-white mb-6">
                <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Your Growth Partner
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mb-6">
                We're more than just a service - we're your dedicated partner in social media success.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {values.map((value, index) => (
                  <div key={index} className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-100 dark:border-gray-700">
                    <value.icon className="h-8 w-8 text-purple-600 dark:text-purple-400 mb-2 mx-auto" />
                    <div className="font-semibold text-gray-900 dark:text-white text-sm mb-1">{value.title}</div>
                    <div className="text-xs text-gray-600 dark:text-gray-400">{value.description}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
