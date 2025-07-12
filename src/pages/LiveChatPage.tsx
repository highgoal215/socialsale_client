
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { MessageCircle, Clock, Users, Headphones, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';

const LiveChatPage = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: "Hello! Welcome to Likes.IO support. How can I help you today?",
      sender: "support",
      timestamp: new Date().toLocaleTimeString()
    }
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const userMessage = {
        id: messages.length + 1,
        text: newMessage,
        sender: "user",
        timestamp: new Date().toLocaleTimeString()
      };
      
      setMessages([...messages, userMessage]);
      setNewMessage('');
      
      // Simulate support response
      setTimeout(() => {
        const supportMessage = {
          id: messages.length + 2,
          text: "Thank you for your message. Our support team will respond shortly. Is there anything specific I can help you with regarding our services?",
          sender: "support",
          timestamp: new Date().toLocaleTimeString()
        };
        setMessages(prev => [...prev, supportMessage]);
      }, 1000);
    }
  };

  const features = [
    {
      icon: <Clock className="h-8 w-8" />,
      title: "24/7 Availability",
      description: "Our support team is available around the clock to help you with any questions or concerns."
    },
    {
      icon: <Users className="h-8 w-8" />,
      title: "Expert Support",
      description: "Get help from our experienced team of social media growth specialists and technical experts."
    },
    {
      icon: <Headphones className="h-8 w-8" />,
      title: "Instant Response",
      description: "Receive immediate assistance with our real-time chat system. No waiting, no delays."
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <div className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              Live Chat Support
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Get instant help from our expert support team. We're here to assist you with orders, 
              questions, and technical support 24/7.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-16 items-start mb-16">
            {/* Left Content */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
                Need Help? We're Here for You
              </h2>
              <p className="text-lg text-gray-600 dark:text-gray-300 mb-6">
                Our live chat support is the fastest way to get assistance with your social media growth needs. 
                Whether you have questions about our services, need help with an order, or want personalized 
                recommendations, our team is ready to help.
              </p>
              
              <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-purple-900/20 dark:to-blue-900/20 rounded-xl p-6 mb-6">
                <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3">
                  Common Questions We Help With:
                </h3>
                <ul className="space-y-2 text-gray-600 dark:text-gray-300">
                  <li>• Service recommendations and package selection</li>
                  <li>• Order status and delivery tracking</li>
                  <li>• Account safety and security questions</li>
                  <li>• Technical support and troubleshooting</li>
                  <li>• Billing and payment assistance</li>
                  <li>• Custom growth strategies</li>
                </ul>
              </div>

              <div className="bg-green-50 dark:bg-green-900/20 rounded-lg p-4 border border-green-200 dark:border-green-800">
                <div className="flex items-center gap-2 text-green-700 dark:text-green-400">
                  <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="font-semibold">Support team is online now</span>
                </div>
                <p className="text-green-600 dark:text-green-300 mt-1">
                  Average response time: Under 30 seconds
                </p>
              </div>
            </div>

            {/* Right - Working Chat Interface */}
            <div className="w-full max-w-2xl">
              <Card className="h-[600px] flex flex-col shadow-lg">
                <CardHeader className="bg-purple-600 text-white rounded-t-lg">
                  <CardTitle className="text-xl flex items-center gap-3">
                    <MessageCircle className="h-6 w-6" />
                    <div>
                      <div className="font-semibold">Live Chat Support</div>
                      <div className="text-sm text-purple-100 font-normal">Online • Typically replies instantly</div>
                    </div>
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex-1 flex flex-col p-0">
                  {/* Messages */}
                  <div className="flex-1 overflow-y-auto p-6 space-y-4">
                    {messages.map((message) => (
                      <div
                        key={message.id}
                        className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                      >
                        <div
                          className={`max-w-xs lg:max-w-sm px-4 py-3 rounded-lg text-sm ${
                            message.sender === 'user'
                              ? 'bg-purple-600 text-white'
                              : 'bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white'
                          }`}
                        >
                          <p className="mb-1">{message.text}</p>
                          <p className="text-xs opacity-75">{message.timestamp}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  {/* Message Input */}
                  <div className="border-t border-gray-200 dark:border-gray-700 p-6">
                    <div className="flex space-x-3">
                      <Input
                        value={newMessage}
                        onChange={(e) => setNewMessage(e.target.value)}
                        placeholder="Type your message..."
                        onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                        className="flex-1"
                      />
                      <Button
                        onClick={handleSendMessage}
                        className="bg-purple-600 hover:bg-purple-700 px-6"
                      >
                        <Send className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Features */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {features.map((feature, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-6 text-center shadow-sm border border-gray-200 dark:border-gray-700">
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

          {/* CTA */}
          <div className="text-center">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white">
              <h2 className="text-3xl font-bold mb-4">
                Chat With Us Above!
              </h2>
              <p className="text-xl mb-6 text-purple-100">
                Use the chat interface above to start a conversation with our support team, or use the floating chat button on any page.
              </p>
              <p className="text-purple-200">
                💬 We're here to help you grow your social media presence!
              </p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default LiveChatPage;
