import React from 'react';
import { Package, Edit, BarChart3 } from 'lucide-react';

const HowItWorksSection = () => {
  const steps = [
    {
      icon: Package,
      title: "Select Package",
      description: "Choose from our variety of packages tailored to your needs and budget.",
      details: "Browse our Instagram and TikTok services, compare features, and select the perfect package for your growth goals."
    },
    {
      icon: Edit,
      title: "Enter Details",
      description: "Provide your social media profile information safely and securely.",
      details: "Simply enter your username and any specific requirements. We never ask for passwords or sensitive information."
    },
    {
      icon: BarChart3,
      title: "See Results",
      description: "Watch your followers, likes, and views grow within 24-48 hours.",
      details: "Track your progress in real-time and enjoy the boost in engagement and social proof."
    }
  ];

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Grow Your Instagram & TikTok in 3 Easy Steps
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Our streamlined process makes social media growth simple and accessible to everyone.
            No technical expertise required - just follow these three steps.
          </p>
        </div>

        <div className="relative">
          {/* Connection Lines */}
          <div className="hidden lg:block absolute top-32 left-1/2 transform -translate-x-1/2 w-full max-w-4xl">
            <div className="flex justify-between items-center px-32">
              <div className="w-48 h-0.5 bg-gradient-to-r from-purple-300 to-blue-300"></div>
              <div className="w-48 h-0.5 bg-gradient-to-r from-blue-300 to-green-300"></div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-12">
            {steps.map((step, index) => (
              <div key={index} className="text-center group">
                {/* Step Number */}
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full text-white text-xl font-bold mb-6 group-hover:scale-110 transition-transform duration-300">
                  {index + 1}
                </div>

                {/* Icon */}
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-50 dark:bg-gray-800 rounded-xl mb-6 group-hover:bg-gray-100 dark:group-hover:bg-gray-700 transition-colors duration-300">
                  <step.icon className="h-10 w-10 text-gray-700 dark:text-gray-300" />
                </div>

                {/* Content */}
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                  {step.title}
                </h3>

                <p className="text-lg text-gray-600 dark:text-gray-300 mb-4">
                  {step.description}
                </p>

                <p className="text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                  {step.details}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Ready to Get Started?
            </h3>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-2xl mx-auto">
              Join thousands of satisfied customers who have already transformed their social media presence with Likes.IO.
            </p>
            <button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105">
              Start Your Growth Journey
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;
