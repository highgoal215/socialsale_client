import React from 'react';
import { Star } from 'lucide-react';

interface Review {
  id: string;
  username: string;
  rating: number;
  content: string;
  serviceUsed: string;
  platform?: 'instagram' | 'tiktok' | 'youtube' | 'general';
  verified?: boolean;
  date: string;
}

interface ReviewDisplayProps {
  reviews: Review[];
  platform?: 'instagram' | 'tiktok' | 'youtube' | 'general';
  maxReviews?: number;
  showServiceFilter?: boolean;
}

const ReviewDisplay: React.FC<ReviewDisplayProps> = ({
  reviews,
  platform = 'general',
  maxReviews = 6,
  showServiceFilter = false
}) => {
  // Filter reviews by platform if specified
  const filteredReviews = platform === 'general' 
    ? reviews 
    : reviews.filter(review => review.platform === platform || review.platform === 'general');

  // Limit number of reviews
  const displayReviews = filteredReviews.slice(0, maxReviews);

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

  const getPlatformIcon = (platform: string) => {
    switch (platform) {
      case 'instagram':
        return '📸';
      case 'tiktok':
        return '🎵';
      case 'youtube':
        return '📺';
      default:
        return '⭐';
    }
  };

  if (displayReviews.length === 0) {
    return (
      <div className="text-center py-8">
        <p className="text-gray-500">No reviews available for this platform yet.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {showServiceFilter && (
        <div className="flex items-center justify-center gap-4 mb-6">
          <span className="text-sm font-medium text-gray-700">Filter by platform:</span>
          <div className="flex gap-2">
            {['general', 'instagram', 'tiktok', 'youtube'].map((p) => (
              <button
                key={p}
                className={`px-3 py-1 rounded-full text-sm font-medium ${
                  platform === p
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                {p.charAt(0).toUpperCase() + p.slice(1)}
              </button>
            ))}
          </div>
        </div>
      )}

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {displayReviews.map((review) => (
          <div
            key={review.id}
            className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-lg transition-shadow duration-300"
          >
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white font-bold">
                  {review.username.charAt(0).toUpperCase()}
                </div>
                <div className="ml-3">
                  <div className="font-semibold text-gray-900 dark:text-white">{review.username}</div>
                  <div className="text-sm text-gray-500 dark:text-gray-400">
                    {formatDate(review.date)}
                  </div>
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
              <span className="ml-2 text-sm text-gray-500 dark:text-gray-400">
                {review.rating}/5
              </span>
            </div>

            <p className="text-gray-700 dark:text-gray-300 mb-4 line-clamp-3">
              {review.content}
            </p>

            <div className="flex items-center justify-between">
              <span className="bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 px-3 py-1 rounded-full text-sm font-medium">
                {getPlatformIcon(review.platform || 'general')} {review.serviceUsed}
              </span>
            </div>
          </div>
        ))}
      </div>

      {filteredReviews.length > maxReviews && (
        <div className="text-center pt-4">
          <button className="text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300 font-medium underline">
            View All Reviews ({filteredReviews.length})
          </button>
        </div>
      )}
    </div>
  );
};

export default ReviewDisplay; 