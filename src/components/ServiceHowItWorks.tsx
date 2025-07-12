
import React from 'react';
import { ShoppingCart, CreditCard, TrendingUp } from 'lucide-react';

const ServiceHowItWorks = () => {
  const steps = [
    {
      icon: <ShoppingCart className="h-8 w-8" />,
      title: "Choose Package",
      description: "Select the perfect package that fits your needs and budget from our variety of options."
    },
    {
      icon: <CreditCard className="h-8 w-8" />,
      title: "Complete Payment",
      description: "Securely checkout with your preferred payment method. We accept all major cards and PayPal."
    },
    {
      icon: <TrendingUp className="h-8 w-8" />,
      title: "Watch Growth",
      description: "See your engagement grow within 24-48 hours. Track your progress in real-time."
    }
  ];

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            How It Works
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Get started in just 3 simple steps. No technical knowledge required.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-12">
          {steps.map((step, index) => (
            <div key={index} className="text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full text-white text-xl font-bold mb-6 group-hover:scale-110 transition-transform duration-300">
                {index + 1}
              </div>

              <div className="inline-flex items-center justify-center w-20 h-20 bg-gray-50 dark:bg-gray-800 rounded-xl mb-6 group-hover:bg-gray-100 dark:group-hover:bg-gray-700 transition-colors duration-300">
                <div className="text-gray-700 dark:text-gray-300">
                  {step.icon}
                </div>
              </div>

              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {step.title}
              </h3>

              <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ServiceHowItWorks;
