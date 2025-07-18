import React, { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Star, Loader2, RefreshCw, ThumbsUp } from 'lucide-react';
import { GetAllReviews, VoteHelpful } from '@/api/review';
import { useToast } from '@/hooks/use-toast';

interface Review {
  _id: string;
  username: string;
  serviceUsed: string;
  rating: number;
  reviewTitle: string;
  content: string;
  createdAt: string;
  isVerified?: boolean;
  helpfulVotes?: number;
  status?: string;
}

const Reviews = () => {
  const { toast } = useToast();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [refreshing, setRefreshing] = useState(false);
  const [votingReviews, setVotingReviews] = useState<Set<string>>(new Set());

  const fetchReviews = async (isRefresh = false) => {
    try {
      if (isRefresh) {
        setRefreshing(true);
      } else {
        setLoading(true);
      }
      setError(null);
      
      const response = await GetAllReviews();
      
      if (response.success === false) {
        setError(response.message || 'Failed to fetch reviews');
        return;
      }
      
      // Handle the API response structure
      let reviewsData: Review[] = [];
      
      if (response.data && Array.isArray(response.data)) {
        reviewsData = response.data;
      } else if (Array.isArray(response)) {
        reviewsData = response;
      } else {
        setError('Invalid response format from server');
        return;
      }
      
      // Filter only approved reviews for public display
      const approvedReviews = reviewsData.filter((review: Review) => 
        review.status === 'approved' || review.status === undefined
      );
      
      setReviews(approvedReviews);
    } catch (err) {
      console.error('Error fetching reviews:', err);
      setError('An error occurred while fetching reviews');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  const handleRefresh = () => {
    fetchReviews(true);
  };

  const handleVoteHelpful = async (reviewId: string) => {
    if (votingReviews.has(reviewId)) return;
    
    setVotingReviews(prev => new Set(prev).add(reviewId));
    
    try {
      const response = await VoteHelpful(reviewId);
      
      if (response.success) {
        // Update the review's helpful votes count
        setReviews(prevReviews => 
          prevReviews.map(review => 
            review._id === reviewId 
              ? { ...review, helpfulVotes: (review.helpfulVotes || 0) + 1 }
              : review
          )
        );
        
        toast({
          title: "Vote recorded!",
          description: "Thank you for your feedback.",
        });
      } else {
        toast({
          title: "Vote failed",
          description: response.message || "Failed to record your vote.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error voting for review:', error);
      toast({
        title: "Vote failed",
        description: "An unexpected error occurred.",
        variant: "destructive"
      });
    } finally {
      setVotingReviews(prev => {
        const newSet = new Set(prev);
        newSet.delete(reviewId);
        return newSet;
      });
    }
  };

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

  // Calculate average rating from actual reviews
  const averageRating = reviews.length > 0 
    ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)
    : "4.9";

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
                  onClick={handleRefresh} 
                  className="mt-4 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors flex items-center mx-auto"
                >
                  <RefreshCw className="h-4 w-4 mr-2" />
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
            <h2 className="text-3xl font-bold mb-2">{averageRating} out of 5 stars</h2>
            <p className="text-white/90">Based on {reviews.length}+ verified reviews</p>
          </div>

          {/* Reviews Grid */}
          {reviews.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {reviews.map((review) => (
                <div key={review._id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300">
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
                    {review.isVerified && (
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
                    <button
                      onClick={() => handleVoteHelpful(review._id)}
                      disabled={votingReviews.has(review._id)}
                      className="flex items-center space-x-1 text-sm text-gray-500 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 transition-colors disabled:opacity-50"
                    >
                      {votingReviews.has(review._id) ? (
                        <Loader2 className="h-3 w-3 animate-spin" />
                      ) : (
                        <ThumbsUp className="h-3 w-3" />
                      )}
                      <span>{review.helpfulVotes || 0} helpful</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-600 dark:text-gray-300 text-lg">No reviews found.</p>
              <button 
                onClick={handleRefresh} 
                className="mt-4 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center mx-auto"
              >
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </button>
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
