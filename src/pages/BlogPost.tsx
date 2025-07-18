
import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Calendar, User, ArrowLeft, Share2, Loader2 } from 'lucide-react';
import { GetBlogPostById, type BlogPost } from '@/api/blog';
import SEOHead from '@/components/SEOHead';
import { useBlogSEO } from '@/hooks/useSEO';

const BlogPost = () => {
  const { id } = useParams();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Use dynamic SEO for blog post
  const { seoData } = useBlogSEO(post);

  useEffect(() => {
    const fetchBlogPost = async () => {
      if (!id) {
        setError('Blog post ID is required');
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);
        
        const response = await GetBlogPostById(id);
        setPost(response.data);
      } catch (err: any) {
        console.error('Error fetching blog post:', err);
        setError(err.message || 'Failed to load blog post. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchBlogPost();
  }, [id]);

  // Format date
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  // Calculate read time (rough estimate)
  const calculateReadTime = (content: string) => {
    const wordsPerMinute = 200;
    const wordCount = content.split(' ').length;
    const readTime = Math.ceil(wordCount / wordsPerMinute);
    return `${readTime} min read`;
  };

  // Handle share functionality
  const handleShare = async () => {
    if (navigator.share && post) {
      try {
        await navigator.share({
          title: post.title,
          text: post.excerpt || post.content.substring(0, 150),
          url: window.location.href,
        });
      } catch (error) {
        // console.log('Error sharing:', error);
      }
    } else {
      // Fallback: copy URL to clipboard
      try {
        await navigator.clipboard.writeText(window.location.href);
        alert('Link copied to clipboard!');
      } catch (error) {
        // console.log('Error copying to clipboard:', error);
      }
    }
  };

  if (loading) {
    return (
      <>
        <SEOHead seoData={seoData} />
        <div className="min-h-screen bg-white dark:bg-gray-950">
          <Navbar />
          <div className="pt-20 pb-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-purple-600" />
              <p className="text-gray-600 dark:text-gray-300">Loading blog post...</p>
            </div>
          </div>
          <Footer />
        </div>
      </>
    );
  }

  if (error || !post) {
    return (
      <>
        <SEOHead seoData={seoData} />
        <div className="min-h-screen bg-white dark:bg-gray-950">
          <Navbar />
          <div className="pt-20 pb-16">
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
              <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-8">
                <h2 className="text-2xl font-bold text-red-800 dark:text-red-200 mb-4">
                  Error Loading Blog Post
                </h2>
                <p className="text-red-600 dark:text-red-300 mb-6">{error || 'Blog post not found'}</p>
                <Link to="/blog">
                  <Button>Back to Blog</Button>
                </Link>
              </div>
            </div>
          </div>
          <Footer />
        </div>
      </>
    );
  }

  return (
    <>
      <SEOHead seoData={seoData} />
      <div className="min-h-screen bg-white dark:bg-gray-950">
        <Navbar />
        
        <div className="pt-20 pb-16">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Back Button */}
            <Link to="/blog" className="inline-flex items-center text-purple-600 hover:text-purple-700 mb-8">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Blog
            </Link>

            {/* Hero Image */}
            <img 
              src={post.featuredImage || "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=800&h=400&fit=crop"} 
              alt={post.title}
              className="w-full h-96 object-cover rounded-xl mb-8"
            />

            {/* Article Header */}
            <div className="mb-8">
              <div className="flex items-center gap-4 mb-4">
                <span className="inline-block bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 px-3 py-1 rounded-full text-sm font-medium">
                  {post.categoryId || 'General'}
                </span>
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {calculateReadTime(post.content)}
                </span>
              </div>

              <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
                {post.title}
              </h1>

              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                  <User className="h-4 w-4 mr-1" />
                  <span>{post.author}</span>
                  <Calendar className="h-4 w-4 ml-3 mr-1" />
                  <span>{formatDate(post.createdAt)}</span>
                </div>
                <Button variant="outline" size="sm" onClick={handleShare}>
                  <Share2 className="h-4 w-4 mr-2" />
                  Share
                </Button>
              </div>
            </div>

            {/* Article Content */}
            <div 
              className="prose prose-lg max-w-none dark:prose-invert"
              dangerouslySetInnerHTML={{ __html: post.content }}
            />

            {/* Tags */}
            {post.tags && post.tags.length > 0 && (
              <div className="mt-8 pt-8 border-t border-gray-200 dark:border-gray-700">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Tags:</h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag, index) => (
                    <span 
                      key={index}
                      className="inline-block bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 px-3 py-1 rounded-full text-sm"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            )}

            {/* CTA Section */}
            <div className="mt-12 p-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl text-white text-center">
              <h3 className="text-2xl font-bold mb-4">Ready to Grow Your Social Media?</h3>
              <p className="mb-6">Start boosting your followers, likes, and engagement today!</p>
              <Button className="bg-white text-purple-600 hover:bg-gray-100">
                Get Started Now
              </Button>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default BlogPost;
