
import React from 'react';
import { Sparkles } from 'lucide-react';

const ClosingCTASection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-purple-600 via-blue-600 to-indigo-700 relative overflow-hidden">
      {/* Background Decorations */}
      <div className="absolute inset-0">
        <div className="absolute top-10 left-10 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute top-32 right-20 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 left-1/4 w-40 h-40 bg-white/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-10 right-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <div className="inline-flex items-center justify-center w-20 h-20 bg-white/20 rounded-full mb-8 backdrop-blur-sm">
          <Sparkles className="h-10 w-10 text-white" />
        </div>

        <h2 className="text-4xl lg:text-6xl font-bold text-white mb-6 leading-tight">
          Supercharge Your Instagram & TikTok Game{' '}
          <span className="bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
            in One Click!
          </span>
        </h2>

        <p className="text-xl lg:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
          Join over 100,000 creators, influencers, and businesses who have already
          transformed their social media presence with Likes.IO's proven growth system.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-8">
          <button className="bg-white text-purple-600 hover:bg-gray-100 px-10 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105 shadow-2xl">
            Start Growing Now
          </button>
          <button className="border-2 border-white text-white hover:bg-white hover:text-purple-600 px-10 py-4 rounded-xl font-bold text-lg transition-all duration-300 hover:scale-105">
            View Pricing
          </button>
        </div>

        {/* Trust indicators */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-8 text-white/80">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span>Instant Delivery</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span>100% Real Users</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span>24/7 Support</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full"></div>
            <span>Money-Back Guarantee</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClosingCTASection;
