
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Package, Edit, BarChart3, Shield, Clock, Users } from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      icon: <Package className="h-12 w-12" />,
      title: "1. Choose Your Package",
      description: "Browse our variety of packages for Instagram, TikTok, and YouTube. Select the perfect option that fits your needs and budget.",
      details: [
        "Compare different package sizes",
        "Read detailed service descriptions",
        "Check pricing and delivery times",
        "Select your preferred platform"
      ]
    },
    {
      icon: <Edit className="h-12 w-12" />,
      title: "2. Enter Your Details",
      description: "Provide your social media profile information safely and securely. We only need your username - never your password.",
      details: [
        "Enter your username or profile link",
        "Add any specific requirements",
        "Choose your targeting preferences",
        "Complete secure checkout"
      ]
    },
    {
      icon: <BarChart3 className="h-12 w-12" />,
      title: "3. Watch Your Growth",
      description: "See your followers, likes, and views grow within 24-48 hours. Track your progress and enjoy increased engagement.",
      details: [
        "Monitor growth in real-time",
        "Receive email updates",
        "Track engagement improvements",
        "Enjoy boosted social proof"
      ]
    }
  ];

  const features = [
    {
      icon: <Shield className="h-8 w-8" />,
      title: "100% Safe & Secure",
      description: "All services comply with platform guidelines. Your account stays safe with our proven methods."
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: "Fast Delivery",
      description: "See results within 24-48 hours. Our efficient system ensures quick and reliable delivery."
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Real Users Only",
      description: "All engagement comes from genuine, active accounts. No bots or fake profiles ever."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <div className="pt-20">
        {/* Hero Section */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                How Likes.IO Works
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Growing your social media presence is simple with our streamlined 3-step process. 
                No technical expertise required - just follow these easy steps.
              </p>
            </div>
          </div>
        </section>

        {/* Steps Section */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="space-y-16">
              {steps.map((step, index) => (
                <div key={index} className={`grid lg:grid-cols-2 gap-12 items-center ${index % 2 === 1 ? 'lg:grid-flow-col-dense' : ''}`}>
                  <div className={index % 2 === 1 ? 'lg:col-start-2' : ''}>
                    <div className="text-purple-600 dark:text-purple-400 mb-6">
                      {step.icon}
                    </div>
                    <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
                      {step.title}
                    </h2>
                    <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                      {step.description}
                    </p>
                    <ul className="space-y-3">
                      {step.details.map((detail, detailIndex) => (
                        <li key={detailIndex} className="flex items-center gap-3">
                          <div className="w-2 h-2 bg-purple-600 rounded-full"></div>
                          <span className="text-gray-600 dark:text-gray-300">{detail}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <div className={index % 2 === 1 ? 'lg:col-start-1' : ''}>
                    <div className="bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/20 dark:to-blue-900/20 rounded-2xl p-8 text-center">
                      <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full text-white text-2xl font-bold mb-6">
                        {index + 1}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
                        Step {index + 1}
                      </h3>
                      <p className="text-gray-600 dark:text-gray-300">
                        {step.title.replace(/^\d+\.\s/, '')}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Why Our Process Works
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Our proven methodology ensures safe, effective, and lasting social media growth.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 text-center hover:shadow-lg transition-shadow duration-300">
                  <div className="text-purple-600 dark:text-purple-400 mb-4 flex justify-center">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-600">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
              Ready to Get Started?
            </h2>
            <p className="text-xl text-purple-100 mb-8">
              Join thousands of satisfied customers and start growing your social media today.
            </p>
            <button className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300">
              Choose Your Package
            </button>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default HowItWorks;
