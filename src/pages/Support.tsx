
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageCircle, Mail, Clock, HelpCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { SendSupportMessage } from '@/api/support';

const Support = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    orderNumber: '',
    category: '',
    subject: '',
    message: ''
  });
const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit =async (e: React.FormEvent) => {
    e.preventDefault();
   setIsSubmitting(true);
   try{
    const result=await SendSupportMessage(formData);
    if(result.success !==false){
      toast({
        title: "Support ticket created!",
        description: "We'll respond to your request within 24 hours.",
      });
      setFormData({ username: '', email: '', orderNumber: '', category: '', subject: '', message: '' });
    }else{
      toast({
        title: "Failed to create support ticket",
        description: result.message || "Please try again later.",
        variant: "destructive",
      });
    }
   } catch(error){
    console.error('Support ticket creation error:', error);
    toast({
      title: "Failed to create support ticket",
      description: "Please try again later.",
      variant: "destructive",
    });
   } finally{ 
    setIsSubmitting(false);
   }
  };

  const supportCategories = [
    'Order Issues',
    'Payment Problems',
    'Account Questions',
    'Technical Support',
    'Refund Request',
    'Other'
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <div className="pt-20 pb-16">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Contact Support
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Need help? Our support team is here to assist you 24/7.
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Support Options */}
            <div className="space-y-6">
              <Card>
                <CardContent className="p-6 text-center">
                  <MessageCircle className="h-12 w-12 mx-auto mb-4 text-purple-600" />
                  <h3 className="font-semibold mb-2">Live Chat</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">Get instant help from our support team</p>
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                    Start Chat
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <Mail className="h-12 w-12 mx-auto mb-4 text-purple-600" />
                  <h3 className="font-semibold mb-2">Email Support</h3>
                  <p className="text-gray-600 dark:text-gray-300 mb-4">Send us an email and we'll respond within 24 hours</p>
                  <p className="text-sm text-gray-500">support@likes.io</p>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6 text-center">
                  <Clock className="h-12 w-12 mx-auto mb-4 text-purple-600" />
                  <h3 className="font-semibold mb-2">Response Time</h3>
                  <p className="text-gray-600 dark:text-gray-300">
                    Average response time: 2-4 hours
                  </p>
                  <p className="text-sm text-gray-500 mt-2">Available 24/7</p>
                </CardContent>
              </Card>
            </div>

            {/* Support Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Submit a Support Request</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <Input
                        placeholder="Your Name"
                        value={formData.username}
                        onChange={(e) => setFormData({...formData, username: e.target.value})}
                        required
                      />
                      <Input
                        type="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                        required
                      />
                    </div>
                    
                    <div className="grid md:grid-cols-2 gap-4">
                      <Input
                        placeholder="Order Number (if applicable)"
                        value={formData.orderNumber}
                        onChange={(e) => setFormData({...formData, orderNumber: e.target.value})}
                      />
                      <select
                        className="w-full p-3 border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-800"
                        value={formData.category}
                        onChange={(e) => setFormData({...formData, category: e.target.value})}
                        required
                      >
                        <option value="">Select Category</option>
                        {supportCategories.map((category) => (
                          <option key={category} value={category}>{category}</option>
                        ))}
                      </select>
                    </div>

                    <Input
                      placeholder="Subject"
                      value={formData.subject}
                      onChange={(e) => setFormData({...formData, subject: e.target.value})}
                      required
                    />

                    <textarea
                      className="w-full p-3 border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-800"
                      rows={6}
                      placeholder="Describe your issue in detail..."
                      value={formData.message}
                      onChange={(e) => setFormData({...formData, message: e.target.value})}
                      required
                    />

                    <Button type="submit" className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                      Submit Support Request
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Support;
