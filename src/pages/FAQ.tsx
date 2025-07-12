
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import FAQSection from '@/components/FAQSection';
import { HelpCircle, Search } from 'lucide-react';

const FAQ = () => {
  const faqCategories = [
    {
      category: "General Questions",
      faqs: [
        {
          question: "What is Likes.IO and how does it work?",
          answer: "Likes.IO is a leading social media growth service that helps you increase your followers, likes, views, and engagement on Instagram, TikTok, and YouTube. We provide real engagement from active users through safe, compliant methods that won't harm your account."
        },
        {
          question: "Are your services safe for my social media accounts?",
          answer: "Absolutely! All our services comply with Instagram, TikTok, and YouTube's terms of service. We use safe, gradual delivery methods and real accounts to ensure your profile remains secure and in good standing."
        },
        {
          question: "How quickly will I see results?",
          answer: "Most customers see results within 24-48 hours of placing their order. We start processing immediately and deliver gradually to maintain natural growth patterns that look organic to both users and platform algorithms."
        }
      ]
    },
    {
      category: "Services & Quality",
      faqs: [
        {
          question: "Do you provide real followers and engagement?",
          answer: "Yes, all our followers, likes, views, and comments come from real, active social media accounts. We never use bots, fake profiles, or automated systems. Every interaction comes from genuine users."
        },
        {
          question: "What platforms do you support?",
          answer: "We currently support Instagram, TikTok, and YouTube. For each platform, we offer followers/subscribers, likes, views, and comments services with various package sizes to fit different needs and budgets."
        },
        {
          question: "Can I choose my target audience?",
          answer: "Yes! We offer targeting options based on demographics, interests, and geographic location. This helps ensure your growth comes from users who are genuinely interested in your content."
        }
      ]
    },
    {
      category: "Ordering & Payment",
      faqs: [
        {
          question: "What payment methods do you accept?",
          answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and various other secure payment methods. All transactions are encrypted and processed through secure payment gateways."
        },
        {
          question: "Do I need to provide my account password?",
          answer: "Never! We only need your username or profile link to deliver our services. We will never ask for your password, login credentials, or any sensitive account information."
        },
        {
          question: "Can I track my order progress?",
          answer: "Yes, you can monitor your progress directly on your social media profiles. We also send email updates with order status and completion notifications. You can also contact our support team for real-time updates."
        }
      ]
    },
    {
      category: "Guarantees & Support",
      faqs: [
        {
          question: "Do you offer refunds or guarantees?",
          answer: "Yes, we offer a 30-day money-back guarantee if you're not satisfied with our service. We also provide refill guarantees for followers and engagement that may drop over time, ensuring long-term value."
        },
        {
          question: "What if my followers drop after delivery?",
          answer: "We provide a refill guarantee for all our services. If you experience any significant drops in followers or engagement within 30 days of delivery, we'll refill them free of charge."
        },
        {
          question: "How can I contact customer support?",
          answer: "Our customer support team is available 24/7 through live chat, email, and our support ticket system. You can reach us anytime with questions, concerns, or assistance needs."
        }
      ]
    },
    {
      category: "Safety & Compliance",
      faqs: [
        {
          question: "Will using your services get my account banned?",
          answer: "No, our services are designed to be completely safe and compliant with platform guidelines. We use gradual, natural delivery methods that mimic organic growth patterns, protecting your account from any potential issues."
        },
        {
          question: "How do you ensure account safety?",
          answer: "We follow strict safety protocols including gradual delivery, using only real accounts, respecting platform rate limits, and constantly monitoring for policy changes to ensure our methods remain compliant."
        },
        {
          question: "What makes Likes.IO different from competitors?",
          answer: "We focus on quality over quantity, provide real engagement from active users, offer 24/7 customer support, maintain strict safety standards, provide money-back guarantees, and have successfully helped over 100,000+ customers grow safely."
        }
      ]
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
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-8">
              Find answers to common questions about our social media growth services. 
              Can't find what you're looking for? Contact our support team anytime.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Search FAQ..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* FAQ Categories */}
          <div className="space-y-12">
            {faqCategories.map((category, index) => (
              <div key={index}>
                <div className="flex items-center gap-3 mb-8">
                  <HelpCircle className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
                    {category.category}
                  </h2>
                </div>
                <FAQSection faqs={category.faqs} title="" />
              </div>
            ))}
          </div>

          {/* Contact CTA */}
          <div className="mt-16">
            <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-center text-white">
              <h2 className="text-3xl font-bold mb-4">
                Still Have Questions?
              </h2>
              <p className="text-xl mb-6 text-purple-100">
                Our support team is available 24/7 to help you with any questions or concerns.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="bg-white text-purple-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                  Start Live Chat
                </button>
                <button className="bg-purple-700 text-white px-6 py-3 rounded-lg font-semibold hover:bg-purple-800 transition-colors border border-purple-500">
                  Contact Support
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default FAQ;
