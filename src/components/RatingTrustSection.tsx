import React from 'react';
import { Star, Shield, Clock, Smile } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const RatingTrustSection = () => {
  const navigate = useNavigate();

  const handleReadReviews = () => {
    navigate('/reviews');
  };

  const trustPoints = [
    {
      icon: Shield,
      title: "Uncompromising Quality",
      description: "Every follower, like, and view comes from real, active accounts. We never use bots or fake profiles.",
      rating: 4.9,
      reviews: "12,000+ reviews"
    },
    {
      icon: Clock,
      title: "Delivery Guarantee",
      description: "We deliver exactly what we promise, when we promise it. 99.8% on-time delivery rate.",
      rating: 4.8,
      reviews: "8,500+ reviews"
    },
    {
      icon: Smile,
      title: "Desirable UX Experience",
      description: "Simple, intuitive platform designed for creators. Easy ordering, tracking, and customer support.",
      rating: 4.9,
      reviews: "15,000+ reviews"
    }
  ];

  const platformLogos = [
    { name: "Trustpilot", rating: "4.9/5" },
    { name: "Google", rating: "4.8/5" },
    { name: "Sitejabber", rating: "4.9/5" },
    { name: "Reviews.io", rating: "4.7/5" }
  ];

  return (
    <section className="py-16 bg-gray-50 dark:bg-gray-900" id="reviews">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4 dark:text-white">
            Why Customers Rate Us #1
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it. See why thousands of customers across multiple
            review platforms consistently rate Likes.IO as the best social media growth service.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8 mb-16">
          {trustPoints.map((point, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm hover:shadow-lg transition-shadow duration-300">
              <div className="flex items-center justify-center w-16 h-16 bg-gradient-to-r from-purple-100 to-blue-100 dark:from-purple-900/20 dark:to-blue-900/20 rounded-full mb-6">
                <point.icon className="h-8 w-8 text-purple-600 dark:text-purple-400" />
              </div>

              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                {point.title}
              </h3>

              <p className="text-gray-600 dark:text-gray-300 mb-6 leading-relaxed">
                {point.description}
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-5 w-5 ${i < Math.floor(point.rating) ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300 dark:text-gray-600'}`}
                      />
                    ))}
                  </div>
                  <span className="font-bold text-gray-900 dark:text-white">{point.rating}</span>
                </div>
                <span className="text-sm text-gray-500 dark:text-gray-400">{point.reviews}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Review Platform Logos */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl p-8 shadow-sm">
          <h3 className="text-center text-xl font-bold text-gray-900 dark:text-white mb-8">
            Trusted Across All Major Review Platforms
          </h3>

          <div className="grid md:grid-cols-4 gap-8">
            {platformLogos.map((platform, index) => (
              <div key={index} className="text-center group">
                <div className="w-20 h-20 bg-gray-100 dark:bg-gray-700 rounded-xl flex items-center justify-center mx-auto mb-4 group-hover:bg-gray-200 dark:group-hover:bg-gray-600 transition-colors">
                  <span className="text-2xl font-bold text-gray-600 dark:text-gray-300">{platform.name[0]}</span>
                </div>
                <div className="font-semibold text-gray-900 dark:text-white mb-1">{platform.name}</div>
                <div className="flex items-center justify-center gap-1">
                  <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium text-gray-600 dark:text-gray-300">{platform.rating}</span>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              Over 25,000 verified reviews across all platforms
            </p>
            <button 
              onClick={handleReadReviews}
              className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium underline"
            >
              Read All Reviews
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RatingTrustSection;
