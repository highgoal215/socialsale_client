import React from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ProblemSolutionSection from '@/components/ProblemSolutionSection';
import FeatureHighlights from '@/components/FeatureHighlights';
import HowItWorksSection from '@/components/HowItWorksSection';
import ServicesSection from '@/components/ServicesSection';
import UseCaseSection from '@/components/UseCaseSection';
import RatingTrustSection from '@/components/RatingTrustSection';
import AboutSection from '@/components/AboutSection';
import BlogPreviewSection from '@/components/BlogPreviewSection';
import ClosingCTASection from '@/components/ClosingCTASection';
import Footer from '@/components/Footer';
import FAQSection from '@/components/FAQSection';
import BenefitsSection from '@/components/BenefitsSection';
import ServiceHowItWorks from '@/components/ServiceHowItWorks';
import ServiceTestimonials from '@/components/ServiceTestimonials';
import { Shield, Clock, Users, Star, Zap, TrendingUp } from 'lucide-react';

const Index = () => {

  const mainBenefits = [
    {
      icon: <Shield className="h-6 w-6" />,
      title: "100% Safe & Secure",
      description: "All our services comply with platform terms of service. Your account stays completely safe with our proven methods."
    },
    {
      icon: <Clock className="h-6 w-6" />,
      title: "Instant Results",
      description: "See growth within 24-48 hours. Our fast delivery system ensures you get results when you need them most."
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Real Active Users",
      description: "All followers, likes, and engagement come from genuine, active social media accounts - no bots or fake profiles."
    },
    {
      icon: <Star className="h-6 w-6" />,
      title: "24/7 Support",
      description: "Our dedicated customer support team is available around the clock to help you with any questions or concerns."
    },
    {
      icon: <Zap className="h-6 w-6" />,
      title: "Affordable Pricing",
      description: "Premium social media growth services at competitive prices. Get more value for your investment with our packages."
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Proven Results",
      description: "Join over 100,000+ satisfied customers who have successfully grown their social media presence with us."
    }
  ];

  const mainTestimonials = [
    {
      name: "Sarah Johnson",
      role: "Lifestyle Influencer",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b829?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "Likes.IO completely transformed my Instagram presence! I went from 500 to 10K followers in just 2 months. The engagement is real and my content is reaching so many more people now."
    },
    {
      name: "Mike Chen",
      role: "Content Creator",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "As a TikTok creator, I needed to boost my video views to get noticed. Their service delivered exactly what they promised - real views that helped my videos go viral!"
    },
    {
      name: "Emma Rodriguez",
      role: "Small Business Owner",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      rating: 5,
      text: "Running my boutique's Instagram was challenging until I found Likes.IO. The followers I gained became real customers. My sales increased by 40% in 3 months!"
    }
  ];

  const mainFAQs = [
    {
      question: "Are your services safe for my social media accounts?",
      answer: "Absolutely! All our services comply with Instagram and TikTok's terms of service. We use safe, gradual delivery methods and real accounts to ensure your profile remains secure and in good standing."
    },
    {
      question: "How quickly will I see results?",
      answer: "Most customers see results within 24-48 hours of placing their order. We start processing immediately and deliver gradually to maintain natural growth patterns."
    },
    {
      question: "Do you provide real followers and engagement?",
      answer: "Yes, all our followers, likes, views, and comments come from real, active social media accounts. We never use bots, fake profiles, or automated systems."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards, PayPal, and various other secure payment methods. All transactions are encrypted and processed through secure payment gateways."
    },
    {
      question: "Do you offer refunds or guarantees?",
      answer: "Yes, we offer a 30-day money-back guarantee if you're not satisfied with our service. We also provide refill guarantees for followers and engagement that may drop over time."
    },
    {
      question: "Do I need to provide my account password?",
      answer: "Never! We only need your username or profile link to deliver our services. We will never ask for your password or any sensitive account information."
    },
    {
      question: "Can I track my order progress?",
      answer: "Yes, you can monitor your progress directly on your social media profiles. We also send email updates with order status and completion notifications."
    },
    {
      question: "What makes Likes.IO different from competitors?",
      answer: "We focus on quality over quantity, provide real engagement from active users, offer 24/7 customer support, maintain strict safety standards, and have helped over 100,000+ customers grow successfully."
    }
  ];

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Navbar />
      <HeroSection />
      <ProblemSolutionSection />
      <FeatureHighlights />
      <BenefitsSection
        title="Why Choose Likes.IO?"
        subtitle="Experience the benefits that make us the #1 choice for social media growth"
        benefits={mainBenefits}
      />
      <HowItWorksSection />
      <ServiceHowItWorks />
      <ServicesSection />
      <ServiceTestimonials
        testimonials={mainTestimonials}
        platform="Social Media"
        title="What Our Customers Say"
        subtitle="Join thousands of satisfied customers who have transformed their social media presence"
      />
      <UseCaseSection />
      <RatingTrustSection />
      <AboutSection />
      <FAQSection
        title="Frequently Asked Questions"
        faqs={mainFAQs}
      />
      <BlogPreviewSection />
      <ClosingCTASection />
      <Footer />
    </div>
  );
};

export default Index; 