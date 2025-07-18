
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check, Users, Shield, Zap, Star, TrendingUp, Award, Globe } from 'lucide-react';
import SEOHead from '@/components/SEOHead';
import { useSEO } from '@/hooks/useSEO';

const About = () => {
  const { seoData } = useSEO();

  const stats = [
    { icon: <Users className="h-8 w-8" />, number: "100K+", label: "Happy Customers" },
    { icon: <Globe className="h-8 w-8" />, number: "50M+", label: "Services Delivered" },
    { icon: <Star className="h-8 w-8" />, number: "4.9", label: "Average Rating" },
    { icon: <Award className="h-8 w-8" />, number: "5+", label: "Years Experience" }
  ];

  const values = [
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Trust & Security",
      description: "Your account safety is our top priority. We use only safe, compliant methods."
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Speed & Efficiency",
      description: "Fast delivery and instant results. We value your time as much as you do."
    },
    {
      icon: <Star className="h-6 w-6" />,
      title: "Quality Service",
      description: "We never compromise on quality. Every service meets our high standards."
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Continuous Growth",
      description: "We're constantly improving our services and expanding our offerings."
    }
  ];

  const team = [
    {
      name: "Alex Johnson",
      role: "CEO & Founder",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face",
      bio: "Passionate about helping creators and businesses grow their social media presence."
    },
    {
      name: "Sarah Chen",
      role: "Head of Operations",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=200&h=200&fit=crop&crop=face",
      bio: "Ensuring every customer gets the best possible experience and results."
    },
    {
      name: "Mike Rodriguez",
      role: "Technical Lead",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face",
      bio: "Building and maintaining the technology that powers our services."
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
                About Likes.IO
              </h1>
              <p className="text-xl lg:text-2xl text-gray-600 dark:text-gray-300 mb-8 max-w-4xl mx-auto">
                We're the leading social media growth platform, helping creators, influencers, and businesses 
                build authentic online presence across Instagram, TikTok, and YouTube.
              </p>
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="flex justify-center mb-4 text-purple-600">
                    {stat.icon}
                  </div>
                  <div className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 dark:text-gray-400">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Mission Section */}
        <div className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-6">
                  Our Mission
                </h2>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                  At Likes.IO, we believe that everyone deserves to have their voice heard and their content seen. 
                  Our mission is to democratize social media growth by providing accessible, safe, and effective 
                  services that help creators and businesses reach their full potential.
                </p>
                <p className="text-lg text-gray-600 dark:text-gray-300 mb-8">
                  We're committed to maintaining the highest standards of quality, security, and customer service 
                  while helping our clients build authentic, engaged audiences across all major social media platforms.
                </p>
                <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                  Get Started Today
                </Button>
              </div>
              <div className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-lg">
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
                  Why Choose Likes.IO?
                </h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">Proven Track Record</h4>
                      <p className="text-gray-600 dark:text-gray-400">Over 100,000 satisfied customers worldwide</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">Safe & Secure</h4>
                      <p className="text-gray-600 dark:text-gray-400">Your account safety is our top priority</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">24/7 Support</h4>
                      <p className="text-gray-600 dark:text-gray-400">Round-the-clock customer support</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <Check className="h-5 w-5 text-green-500 mr-3 mt-0.5" />
                    <div>
                      <h4 className="font-semibold text-gray-900 dark:text-white">Money-Back Guarantee</h4>
                      <p className="text-gray-600 dark:text-gray-400">30-day guarantee on all services</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Our Values
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                The principles that guide everything we do
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex justify-center mb-4 text-purple-600">
                      {value.icon}
                    </div>
                    <CardTitle className="text-xl">{value.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400">
                      {value.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="py-16 bg-gray-50 dark:bg-gray-900">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
                Meet Our Team
              </h2>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                The passionate people behind Likes.IO
              </p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {team.map((member, index) => (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                    />
                    <CardTitle className="text-xl">{member.name}</CardTitle>
                    <p className="text-purple-600 font-medium">{member.role}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-600 dark:text-gray-400">
                      {member.bio}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="py-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-12 text-center text-white">
              <h2 className="text-3xl lg:text-4xl font-bold mb-6">
                Ready to Grow Your Social Media?
              </h2>
              <p className="text-xl mb-8 opacity-90">
                Join thousands of satisfied customers who have transformed their social media presence with Likes.IO
              </p>
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100">
                Get Started Now
              </Button>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default About;
