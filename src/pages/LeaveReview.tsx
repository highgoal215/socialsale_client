
import React, { useState } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Star, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { SubmitReview } from '@/api/review';

const LeaveReview = () => {
  const { toast } = useToast();
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    service: '',
    title: '',
    review: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (rating === 0) {
      toast({
        title: "Please select a rating",
        description: "Rating is required to submit your review.",
        variant: "destructive"
      });
      return;
    }

    // Validate all required fields
    if (!formData.name.trim() || !formData.email.trim() || !formData.service.trim() || !formData.title.trim() || !formData.review.trim()) {
      toast({
        title: "Please fill all fields",
        description: "All fields are required to submit your review.",
        variant: "destructive"
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await SubmitReview({
        name: formData.name,
        email: formData.email,
        service: formData.service,
        rating: rating,
        title: formData.title,
        review: formData.review
      });

      if (response.success) {
        toast({
          title: "Review submitted successfully!",
          description: "Thank you for your feedback. Your review will be published after moderation.",
        });
        
        // Reset form
        setFormData({ name: '', email: '', service: '', title: '', review: '' });
        setRating(0);
      } else {
        toast({
          title: "Submission failed",
          description: response.message || "Failed to submit review. Please try again.",
          variant: "destructive"
        });
      }
    } catch (error) {
      console.error('Error submitting review:', error);
      toast({
        title: "Submission failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Navbar />
      
      <div className="pt-20 pb-16">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
              Leave a Review
            </h1>
            <p className="text-xl text-gray-600 dark:text-gray-300">
              Share your experience with our services and help others make informed decisions.
            </p>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Write Your Review</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-4">
                  <Input
                    placeholder="Your Name"
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    required
                    disabled={isSubmitting}
                  />
                  <Input
                    type="email"
                    placeholder="Your Email"
                    value={formData.email}
                    onChange={(e) => setFormData({...formData, email: e.target.value})}
                    required
                    disabled={isSubmitting}
                  />
                </div>
                
                <Input
                  placeholder="Service Used (e.g., Instagram Followers)"
                  value={formData.service}
                  onChange={(e) => setFormData({...formData, service: e.target.value})}
                  required
                  disabled={isSubmitting}
                />

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Rating *
                  </label>
                  <div className="flex space-x-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHoverRating(star)}
                        onMouseLeave={() => setHoverRating(0)}
                        className="p-1 disabled:opacity-50"
                        disabled={isSubmitting}
                      >
                        <Star
                          className={`h-8 w-8 ${
                            star <= (hoverRating || rating)
                              ? 'text-yellow-400 fill-current'
                              : 'text-gray-300'
                          }`}
                        />
                      </button>
                    ))}
                  </div>
                  {rating === 0 && (
                    <p className="text-sm text-red-600 dark:text-red-400 mt-1">
                      Please select a rating
                    </p>
                  )}
                </div>

                <Input
                  placeholder="Review Title"
                  value={formData.title}
                  onChange={(e) => setFormData({...formData, title: e.target.value})}
                  required
                  disabled={isSubmitting}
                />

                <textarea
                  className="w-full p-3 border border-gray-300 rounded-lg dark:border-gray-600 dark:bg-gray-800 disabled:opacity-50"
                  rows={6}
                  placeholder="Tell us about your experience..."
                  value={formData.review}
                  onChange={(e) => setFormData({...formData, review: e.target.value})}
                  required
                  disabled={isSubmitting}
                />

                <Button 
                  type="submit" 
                  className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 disabled:opacity-50"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting Review...
                    </>
                  ) : (
                    'Submit Review'
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default LeaveReview;
