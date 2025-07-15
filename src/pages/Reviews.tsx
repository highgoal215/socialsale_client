import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Star, Loader2 } from 'lucide-react';
import { GetAllReviews } from '@/api/review';

interface Review {
  id: string;
  username: string;
  email: string;
  serviceUsed: string;
  rating: number;
  reviewTitle: string;
  content: string;
  createdAt: string;
  verified?: boolean;
}

const Reviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        setLoading(true);
        const response = await GetAllReviews();
        
        if (response.success === false) {
          setError(response.message || 'Failed to fetch reviews');
        } else {
          // Handle different response structures
          let reviewsData = response;
          
          // If response has a data property, use that
          if (response.data && Array.isArray(response.data)) {
            reviewsData = response.data;
          }
          // If response is directly an array, use it
          else if (Array.isArray(response)) {
            reviewsData = response;
          }
          // If response has a reviews property, use that
          else if (response.reviews && Array.isArray(response.reviews)) {
            reviewsData = response.reviews;
          }
          // If none of the above, try to find any array in the response
          else if (typeof response === 'object' && response !== null) {
            const arrayKeys = Object.keys(response).filter(key => Array.isArray(response[key]));
            if (arrayKeys.length > 0) {
              reviewsData = response[arrayKeys[0]];
            } else {
              setError('No reviews data found in response');
              return;
            }
          } else {
            setError('Invalid response format from server');
            return;
          }
          
          // Transform the API response to match our component's expected format
          const transformedReviews = reviewsData.map((review: any) => ({
            id: review._id || review.id || Math.random().toString(),
            username: review.username || review.name || 'Anonymous',
            email: review.email || '',
            serviceUsed: review.serviceUsed || review.service || 'Unknown Service',
            rating: review.rating || 5,
            reviewTitle: review.reviewTitle || review.title || '',
            content: review.content || review.review || review.reviewText || '',
            createdAt: review.createdAt || review.date || new Date().toISOString(),
            verified: review.verified !== false // Default to true unless explicitly false
          }));
          
          setReviews(transformedReviews);
        }
      } catch (err) {
        setError('An error occurred while fetching reviews');
        console.error('Error fetching reviews:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  const stats = [
    { label: "Happy Customers", value: "100K+" },
    { label: "Average Rating", value: "4.9/5" },
    { label: "Success Rate", value: "99.2%" },
    { label: "Countries Served", value: "150+" }
  ];

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
      />
    ));
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffTime = Math.abs(now.getTime() - date.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    
    if (diffDays === 1) return '1 day ago';
    if (diffDays < 7) return `${diffDays} days ago`;
    if (diffDays < 30) return `${Math.floor(diffDays / 7)} weeks ago`;
    if (diffDays < 365) return `${Math.floor(diffDays / 30)} months ago`;
    return `${Math.floor(diffDays / 365)} years ago`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950">
        <Navbar />
        <div className="pt-20 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="flex items-center space-x-2">
                <Loader2 className="h-8 w-8 animate-spin text-purple-600" />
                <span className="text-lg text-gray-600 dark:text-gray-300">Loading reviews...</span>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950">
        <Navbar />
        <div className="pt-20 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                What Our Customers Say
              </h1>
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-6">
                <p className="text-red-600 dark:text-red-400">{error}</p>
                <button 
                  onClick={() => window.location.reload()} 
                  className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Try Again
                </button>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Navbar />

      <div className="pt-20 pb-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-16">
            <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
              What Our Customers Say
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
              Join thousands of satisfied customers who have transformed their social media presence with Likes.IO.
            </p>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-3xl lg:text-4xl font-bold text-purple-600 dark:text-purple-400 mb-2">
                  {stat.value}
                </div>
                <div className="text-gray-600 dark:text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>

          {/* Overall Rating */}
          <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white text-center mb-16">
            <div className="flex justify-center items-center mb-4">
              {renderStars(5)}
            </div>
            <h2 className="text-3xl font-bold mb-2">4.9 out of 5 stars</h2>
            <p className="text-white/90">Based on {reviews.length}+ verified reviews</p>
          </div>

          {/* Reviews Grid */}
          {reviews.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {reviews.map((review) => (
                <div key={review.id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                        {review.username.charAt(0).toUpperCase()}
                      </div>
                      <div className="ml-3">
                        <div className="font-semibold text-gray-900 dark:text-white">{review.username}</div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">@{review.username.toLowerCase().replace(/\s+/g, '')}</div>
                      </div>
                    </div>
                    {review.verified && (
                      <span className="bg-green-100 dark:bg-green-900/20 text-green-800 dark:text-green-400 text-xs px-2 py-1 rounded-full">
                        Verified
                      </span>
                    )}
                  </div>

                  <div className="flex items-center mb-3">
                    {renderStars(review.rating)}
                    <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">{formatDate(review.createdAt)}</span>
                  </div>

                  {review.reviewTitle && (
                    <h4 className="font-semibold text-gray-900 dark:text-white mb-2">{review.reviewTitle}</h4>
                  )}

                  <p className="text-gray-700 dark:text-gray-300 mb-4">{review.content}</p>

                  <div className="flex items-center justify-between">
                    <span className="bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 px-3 py-1 rounded-full text-sm font-medium">
                      {review.serviceUsed}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-300 text-lg">No reviews found.</p>
            </div>
          )}

          {/* Trust Badges */}
          <div className="bg-gray-50 dark:bg-gray-800 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-center text-gray-900 dark:text-white mb-8">
              Trusted by Leading Review Platforms
            </h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 items-center">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600 dark:text-green-400 mb-2">4.9/5</div>
                <div className="font-medium text-gray-900 dark:text-white">Trustpilot</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600 dark:text-blue-400 mb-2">4.8/5</div>
                <div className="font-medium text-gray-900 dark:text-white">Google Reviews</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-orange-600 dark:text-orange-400 mb-2">4.9/5</div>
                <div className="font-medium text-gray-900 dark:text-white">Sitejabber</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-purple-600 dark:text-purple-400 mb-2">4.7/5</div>
                <div className="font-medium text-gray-900 dark:text-white">Reviews.io</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Reviews;
