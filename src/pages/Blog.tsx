
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Calendar, User, ArrowRight, Loader2 } from 'lucide-react';
import { GetPublicBlogs, type BlogPost } from '@/api/blog';
import SEOHead from '@/components/SEOHead';
import { useSEO } from '@/hooks/useSEO';

const Blog = () => {
  const { seoData } = useSEO();
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [hasMore, setHasMore] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [categories, setCategories] = useState<string[]>(['All']);
  const postsPerPage = 6;

  // Fetch blog posts
  const fetchBlogPosts = async (category?: string, limit?: number) => {
    try {
      setLoading(true);
      setError(null);
      
      const params: { limit?: number; category?: string } = {};
      if (limit) params.limit = limit;
      if (category && category !== 'All') params.category = category;

      const response = await GetPublicBlogs(params);
      
      setBlogPosts(response.data);
      setHasMore(response.data.length === (limit || postsPerPage));
    } catch (err) {
      console.error('Error fetching blog posts:', err);
      setError('Failed to load blog posts. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  // Fetch all posts to extract categories
  const fetchAllPostsForCategories = async () => {
    try {
      const response = await GetPublicBlogs({ limit: 100 }); // Get more posts to extract categories
      const allPosts = response.data;
      
      // Extract unique categories from posts
      const uniqueCategories = new Set<string>();
      allPosts.forEach(post => {
        if (post.categoryId) {
          uniqueCategories.add(post.categoryId);
        }
      });
      
      // Convert to array and sort alphabetically
      const categoryArray = ['All', ...Array.from(uniqueCategories).sort()];
      setCategories(categoryArray);
    } catch (err) {
      console.error('Error fetching categories:', err);
      // Fallback to default categories if API fails
      setCategories(['All', 'Instagram Growth', 'TikTok Tips', 'Social Media', 'Growth Strategy', 'Content Strategy', 'Monetization']);
    }
  };

  // Load more posts
  const loadMorePosts = async () => {
    try {
      setLoading(true);
      const nextPage = currentPage + 1;
      const limit = nextPage * postsPerPage;
      
      const params: { limit?: number; category?: string } = { limit };
      if (selectedCategory !== 'All') params.category = selectedCategory;

      const response = await GetPublicBlogs(params);
      setBlogPosts(response.data);
      setCurrentPage(nextPage);
      setHasMore(response.data.length === limit);
    } catch (err) {
      console.error('Error loading more posts:', err);
      setError('Failed to load more posts. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle category change
  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    fetchBlogPosts(category, postsPerPage);
  };

  // Initial fetch
  useEffect(() => {
    fetchAllPostsForCategories();
    fetchBlogPosts(selectedCategory, postsPerPage);
  }, []);

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

  return (
    <>
      <SEOHead seoData={seoData} />
      <div className="min-h-screen bg-white dark:bg-gray-950">
        <Navbar />

        <div className="pt-20 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            {/* Header */}
            <div className="text-center mb-16">
              <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 dark:text-white mb-6">
                Social Media Growth Blog
              </h1>
              <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
                Stay ahead of the curve with the latest tips, strategies, and insights for growing your Instagram and TikTok presence.
              </p>
            </div>

            {/* Categories */}
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {categories.map((category, index) => (
                <Button
                  key={index}
                  variant={selectedCategory === category ? "default" : "outline"}
                  className={selectedCategory === category ? "bg-gradient-to-r from-purple-600 to-blue-600" : ""}
                  onClick={() => handleCategoryChange(category)}
                >
                  {category}
                </Button>
              ))}
            </div>

            {/* Blog Posts Grid */}
            {loading && blogPosts.length === 0 ? (
              <div className="text-center py-12">
                <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-purple-600" />
                <p className="text-gray-600 dark:text-gray-300">Loading blog posts...</p>
              </div>
            ) : error ? (
              <div className="text-center py-12">
                <p className="text-red-600 dark:text-red-400 mb-4">{error}</p>
                <Button onClick={() => fetchBlogPosts(selectedCategory, postsPerPage)}>
                  Try Again
                </Button>
              </div>
            ) : blogPosts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 dark:text-gray-300 mb-4">No blog posts found for this category.</p>
                <Button onClick={() => handleCategoryChange('All')}>
                  View All Posts
                </Button>
              </div>
            ) : (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
                  {blogPosts.map((post) => (
                    <article key={post._id} className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300">
                      {/* Featured Image */}
                      <div className="aspect-video overflow-hidden">
                        <img 
                          src={post.featuredImage || "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=600&h=400&fit=crop"} 
                          alt={post.title}
                          className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      {/* Content */}
                      <div className="p-6">
                        {/* Category */}
                        <div className="mb-3">
                          <span className="inline-block bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 px-3 py-1 rounded-full text-sm font-medium">
                            {post.categoryId || 'General'}
                          </span>
                        </div>

                        {/* Title */}
                        <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
                          {post.title}
                        </h2>

                        {/* Excerpt */}
                        <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                          {post.excerpt || post.content.substring(0, 150) + '...'}
                        </p>

                        {/* Meta */}
                        <div className="flex items-center justify-between text-sm text-gray-500 dark:text-gray-400 mb-4">
                          <div className="flex items-center">
                            <User className="h-4 w-4 mr-1" />
                            <span>{post.author}</span>
                          </div>
                          <div className="flex items-center">
                            <Calendar className="h-4 w-4 mr-1" />
                            <span>{formatDate(post.createdAt)}</span>
                          </div>
                        </div>

                        {/* Read Time */}
                        <div className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                          {calculateReadTime(post.content)}
                        </div>

                        {/* Read More Button */}
                        <Link to={`/blog/${post._id}`}>
                          <Button variant="outline" className="w-full group">
                            Read More
                            <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                          </Button>
                        </Link>
                      </div>
                    </article>
                  ))}
                </div>

                {/* Load More Button */}
                {hasMore && (
                  <div className="text-center">
                    <Button 
                      onClick={loadMorePosts} 
                      disabled={loading}
                      className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                    >
                      {loading ? (
                        <>
                          <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                          Loading...
                        </>
                      ) : (
                        'Load More Posts'
                      )}
                    </Button>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Blog;
