import React, { useState } from 'react';
import { Users, Building, Music } from 'lucide-react';

const UseCaseSection = () => {
  const [activeTab, setActiveTab] = useState('influencers');

  const tabs = [
    { id: 'influencers', label: 'Influencers', icon: Users },
    { id: 'businesses', label: 'Businesses', icon: Building },
    { id: 'artists', label: 'Artists', icon: Music }
  ];

  const content = {
    influencers: {
      title: "Perfect for Aspiring Influencers",
      description: "Build your personal brand and reach thousands of engaged followers who are genuinely interested in your content.",
      features: [
        "Grow your follower base organically",
        "Increase engagement rates",
        "Build social proof for brand partnerships",
        "Reach your target audience effectively"
      ],
      testimonial: {
        name: "Lira Martinez",
        role: "Lifestyle Influencer",
        image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
        metrics: { followers: "125K", engagement: "8.4%", growth: "+340%" },
        quote: "Thanks to Likes.IO, I went from 5K to 125K followers in 6 months. The quality of engagement is incredible!"
      }
    },
    businesses: {
      title: "Grow Your Business Presence",
      description: "Boost your brand awareness and drive real customers to your business with targeted social media growth.",
      features: [
        "Increase brand visibility",
        "Drive traffic to your website",
        "Build customer trust and credibility",
        "Generate leads and sales"
      ],
      testimonial: {
        name: "Tech Solutions Co.",
        role: "B2B Software Company",
        image: "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=200&h=200&fit=crop&crop=face",
        metrics: { followers: "45K", leads: "2.5K", growth: "+180%" },
        quote: "Our LinkedIn and Instagram growth led to 2.5K qualified leads and $500K in new business revenue."
      }
    },
    artists: {
      title: "Amplify Your Creative Work",
      description: "Get your art, music, or creative content in front of the right audience and build a loyal fanbase.",
      features: [
        "Showcase your creative work",
        "Build a dedicated fanbase",
        "Increase streams and sales",
        "Connect with industry professionals"
      ],
      testimonial: {
        name: "Alex Rivera",
        role: "Independent Musician",
        image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=200&h=200&fit=crop&crop=face",
        metrics: { followers: "78K", streams: "1.2M", growth: "+250%" },
        quote: "My music reached 1.2M streams after growing my social media presence. Likes.IO made it possible!"
      }
    }
  };

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            For Everyone with Social Media Growth In Mind
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Whether you're an aspiring influencer, growing business, or creative artist,
            Likes.IO has the perfect solution for your social media growth needs.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex justify-center mb-12">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-2 shadow-sm flex gap-2 flex-wrap justify-center">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-medium transition-all duration-300 ${activeTab === tab.id
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white shadow-md'
                  : 'text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-white'
                  }`}
              >
                <tab.icon className="h-5 w-5 sm:flex hidden" />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
              {content[activeTab as keyof typeof content].title}
            </h3>
            <p className="text-xl text-gray-600 dark:text-gray-300 mb-8">
              {content[activeTab as keyof typeof content].description}
            </p>

            <ul className="space-y-4 mb-8">
              {content[activeTab as keyof typeof content].features.map((feature, index) => (
                <li key={index} className="flex items-center gap-3">
                  <div className="w-6 h-6 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-green-600 dark:bg-green-400 rounded-full"></div>
                  </div>
                  <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>

            <button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105">
              Start Growing Today
            </button>
          </div>

          {/* Featured Testimonial */}
          <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-lg">
            <div className="flex items-center gap-4 mb-6">
              <img
                src={content[activeTab as keyof typeof content].testimonial.image}
                alt={content[activeTab as keyof typeof content].testimonial.name}
                className="w-16 h-16 rounded-full object-cover"
              />
              <div>
                <div className="font-bold text-lg text-gray-900 dark:text-white">
                  {content[activeTab as keyof typeof content].testimonial.name}
                </div>
                <div className="text-gray-600 dark:text-gray-400">
                  {content[activeTab as keyof typeof content].testimonial.role}
                </div>
              </div>
            </div>

            <p className="text-gray-700 dark:text-gray-300 mb-6 italic">
              "{content[activeTab as keyof typeof content].testimonial.quote}"
            </p>

            <div className="grid grid-cols-3 gap-4">
              {Object.entries(content[activeTab as keyof typeof content].testimonial.metrics).map(([key, value]) => (
                <div key={key} className="text-center">
                  <div className="text-2xl font-bold text-purple-600 dark:text-purple-400">{value}</div>
                  <div className="text-sm text-gray-600 dark:text-gray-400 capitalize">{key}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default UseCaseSection;
