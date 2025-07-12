
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Shield, Users, Zap, Target, Award, Clock } from 'lucide-react';

const About = () => {
  const stats = [
    { number: "100K+", label: "Satisfied Customers" },
    { number: "50M+", label: "Growth Delivered" },
    { number: "99.9%", label: "Success Rate" },
    { number: "24/7", label: "Customer Support" }
  ];

  const values = [
    {
      icon: <Shield className="h-8 w-8" />,
      title: "100% Safe & Secure",
      description: "All our services comply with platform terms of service. Your account stays completely safe with our proven methods."
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Real Active Users",
      description: "All followers, likes, and engagement come from genuine, active social media accounts - no bots or fake profiles."
    },
    {
      icon: <Zap className="h-8 w-8" />,
      title: "Instant Results",
      description: "See growth within 24-48 hours. Our fast delivery system ensures you get results when you need them most."
    },
    {
      icon: <Target className="h-8 w-8" />,
      title: "Targeted Growth",
      description: "We help you reach your specific audience and demographics for maximum engagement and conversion."
    },
    {
      icon: <Award className="h-8 w-8" />,
      title: "Proven Results",
      description: "Join over 100,000+ satisfied customers who have successfully grown their social media presence with us."
    },
    {
      icon: <Clock className="h-8 w-8" />,
      title: "24/7 Support",
      description: "Our dedicated customer support team is available around the clock to help you with any questions or concerns."
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
                About Likes.IO
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                We're the world's leading social media growth service, helping creators and businesses 
                amplify their online presence with authentic, high-quality growth solutions.
              </p>
            </div>

            {/* Stats */}
            <div className="grid md:grid-cols-4 gap-8 mb-16">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl lg:text-4xl font-bold bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 dark:text-gray-300">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                  Our Story
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                  Founded in 2020, Likes.IO was born from a simple observation: talented creators and businesses 
                  were struggling to get the visibility they deserved on social media platforms.
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                  We started with a mission to democratize social media success by providing affordable, 
                  effective, and safe growth services that deliver real results. Today, we've helped over 
                  100,000 creators and businesses achieve their social media goals.
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-300">
                  Our commitment to quality, safety, and customer satisfaction has made us the most 
                  trusted name in social media growth services worldwide.
                </p>
              </div>
              <div className="bg-gradient-to-br from-purple-100 to-blue-100 dark:from-purple-900/20 dark:to-blue-900/20 rounded-2xl p-8">
                <div className="text-center">
                  <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full text-white mb-6">
                    <Target className="h-12 w-12" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                    Our Mission
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    To empower every creator and business with the tools and growth they need to succeed 
                    in the digital world, making social media success accessible to everyone.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Values */}
        <section className="py-16 bg-white dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Why Choose Likes.IO?
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                We're committed to providing the highest quality social media growth services 
                with complete safety and reliability.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {values.map((value, index) => (
                <div key={index} className="bg-gray-50 dark:bg-gray-800 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
                  <div className="text-purple-600 dark:text-purple-400 mb-4">
                    {value.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                    {value.title}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    {value.description}
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
              Ready to Grow Your Social Media?
            </h2>
            <p className="text-xl text-purple-100 mb-8">
              Join thousands of satisfied customers who have transformed their social media presence with Likes.IO.
            </p>
            <button className="bg-white text-purple-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300">
              Start Your Growth Journey
            </button>
          </div>
        </section>
      </div>

      <Footer />
    </div>
  );
};

export default About;
