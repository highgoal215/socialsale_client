
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Search, HelpCircle, MessageCircle, Clock } from 'lucide-react';

const Help = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const faqCategories = [
    {
      title: "Getting Started",
      questions: [
        {
          question: "How do I place an order?",
          answer: "Simply choose your desired service, enter your social media username/URL, select a package, and complete the payment. Your order will start processing within 24 hours."
        },
        {
          question: "Do I need to provide my password?",
          answer: "No, we never ask for your password. We only need your public username or profile URL to deliver the service."
        },
        {
          question: "Is it safe for my account?",
          answer: "Yes, our services are completely safe. We use organic methods that comply with platform guidelines and never put your account at risk."
        }
      ]
    },
    {
      title: "Orders & Delivery",
      questions: [
        {
          question: "How long does delivery take?",
          answer: "Most orders start within 24 hours. Delivery time varies by service: Followers (1-7 days), Likes (1-24 hours), Views (1-6 hours)."
        },
        {
          question: "Can I track my order?",
          answer: "Yes, you can track your order status in your account dashboard or by visiting our Order Tracking page."
        },
        {
          question: "What if I don't receive my order?",
          answer: "If you don't receive your order within the specified timeframe, contact our support team for immediate assistance."
        }
      ]
    },
    {
      title: "Payment & Refunds",
      questions: [
        {
          question: "What payment methods do you accept?",
          answer: "We accept all major credit cards, PayPal, and various cryptocurrency options for your convenience."
        },
        {
          question: "Can I get a refund?",
          answer: "Yes, we offer refunds within 30 days if the service is not delivered as promised. Contact support for refund requests."
        },
        {
          question: "Is my payment information secure?",
          answer: "Absolutely. We use industry-standard SSL encryption and work with trusted payment processors to ensure your information is secure."
        }
      ]
    }
  ];

  const filteredCategories = faqCategories.map(category => ({
    ...category,
    questions: category.questions.filter(
      q => q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
           q.answer.toLowerCase().includes(searchTerm.toLowerCase())
    )
  })).filter(category => category.questions.length > 0);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <div className="pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Help Center
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              Find answers to common questions and get the help you need.
            </p>
            
            <div className="relative max-w-md mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                placeholder="Search for help..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>

          {/* Quick Links */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <Card className="text-center">
              <CardContent className="p-6">
                <MessageCircle className="h-12 w-12 mx-auto mb-4 text-purple-600" />
                <h3 className="font-semibold mb-2">Live Chat</h3>
                <p className="text-gray-600 dark:text-gray-300">Get instant help from our support team</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <HelpCircle className="h-12 w-12 mx-auto mb-4 text-purple-600" />
                <h3 className="font-semibold mb-2">FAQ</h3>
                <p className="text-gray-600 dark:text-gray-300">Browse frequently asked questions</p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="p-6">
                <Clock className="h-12 w-12 mx-auto mb-4 text-purple-600" />
                <h3 className="font-semibold mb-2">Order Tracking</h3>
                <p className="text-gray-600 dark:text-gray-300">Check the status of your orders</p>
              </CardContent>
            </Card>
          </div>

          {/* FAQ Sections */}
          <div className="space-y-8">
            {filteredCategories.map((category, index) => (
              <Card key={index}>
                <CardHeader>
                  <CardTitle>{category.title}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {category.questions.map((faq, faqIndex) => (
                    <div key={faqIndex} className="border-b border-gray-200 dark:border-gray-700 pb-4 last:border-b-0">
                      <h4 className="font-semibold mb-2 text-gray-900 dark:text-white">{faq.question}</h4>
                      <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
                    </div>
                  ))}
                </CardContent>
              </Card>
            ))}
          </div>

          {searchTerm && filteredCategories.length === 0 && (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-300">No results found for "{searchTerm}". Try a different search term.</p>
            </div>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Help;
