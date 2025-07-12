
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const Terms = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <div className="pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">Terms of Service</h1>
          
          <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm space-y-8">
            <section>
              <h2 className="text-2xl font-semibold mb-4">Acceptance of Terms</h2>
              <p className="text-gray-600 dark:text-gray-300">
                By accessing and using Likes.IO, you accept and agree to be bound by the terms and provision of this agreement.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Description of Service</h2>
              <p className="text-gray-600 dark:text-gray-300 mb-4">
                Likes.IO provides social media growth services including but not limited to:
              </p>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
                <li>Instagram followers, likes, views, and comments</li>
                <li>TikTok followers, likes, views, and comments</li>
                <li>YouTube subscribers, likes, views, and comments</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">User Responsibilities</h2>
              <ul className="list-disc list-inside text-gray-600 dark:text-gray-300 space-y-2">
                <li>Provide accurate account information</li>
                <li>Maintain the security of your account</li>
                <li>Use services in compliance with platform terms</li>
                <li>Not engage in fraudulent or illegal activities</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Payment Terms</h2>
              <p className="text-gray-600 dark:text-gray-300">
                All payments are processed securely. Refunds are available within 30 days of purchase if services are not delivered as promised.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Service Delivery</h2>
              <p className="text-gray-600 dark:text-gray-300">
                We strive to deliver all services within the specified timeframe. Delivery times may vary based on order size and platform requirements.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Limitation of Liability</h2>
              <p className="text-gray-600 dark:text-gray-300">
                Likes.IO shall not be liable for any indirect, incidental, special, or consequential damages arising from the use of our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold mb-4">Contact Information</h2>
              <p className="text-gray-600 dark:text-gray-300">
                For questions about these Terms of Service, please contact us at legal@likes.io.
              </p>
            </section>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Terms;
