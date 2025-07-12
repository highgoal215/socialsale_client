
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Calendar, User, ArrowRight, Loader2 } from 'lucide-react';
import { GetPublicBlogs, type BlogPost } from '@/api/blog';

const Blog = () => {
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

      console.log('Fetching blog posts with params:', params);
      console.log('Selected category:', category);

      const response = await GetPublicBlogs(params);
      console.log('Blog posts response:', response.data);
      console.log('Number of posts received:', response.data.length);
      
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

  // Get featured post (first post)
  const featuredPost = blogPosts.length > 0 ? blogPosts[0] : null;
  const regularPosts = blogPosts.slice(1);

  if (error) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950">
        <Navbar />
        <div className="pt-20 pb-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-8">
              <h2 className="text-2xl font-bold text-red-800 dark:text-red-200 mb-4">
                Error Loading Blog Posts
              </h2>
              <p className="text-red-600 dark:text-red-300 mb-6">{error}</p>
              <Button onClick={() => fetchBlogPosts(selectedCategory, postsPerPage)}>
                Try Again
              </Button>
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

          {loading && blogPosts.length === 0 ? (
            <div className="text-center py-16">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4 text-purple-600" />
              <p className="text-gray-600 dark:text-gray-300">Loading blog posts...</p>
            </div>
          ) : (
            <>
              {/* Featured Post */}
              {featuredPost && (
                <div className="mb-16">
                  <div className="bg-gradient-to-r from-purple-600 to-blue-600 rounded-2xl p-8 text-white">
                    <div className="grid lg:grid-cols-2 gap-8 items-center">
                      <div>
                        <span className="inline-block bg-white/20 text-white px-3 py-1 rounded-full text-sm font-medium mb-4">
                          Featured Post
                        </span>
                        <h2 className="text-3xl font-bold mb-4">
                          {featuredPost.title}
                        </h2>
                        <p className="text-white/90 mb-6">
                          {featuredPost.excerpt || featuredPost.content.substring(0, 150) + '...'}
                        </p>
                        <Link to={`/blog/${featuredPost._id}`}>
                          <Button className="bg-white text-purple-600 hover:bg-gray-100">
                            Read Full Article <ArrowRight className="ml-2 h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                      <div className="bg-white/10 rounded-xl p-4 backdrop-blur-sm">
                        <img 
                          src={featuredPost.featuredImage || "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=250&fit=crop"} 
                          alt={featuredPost.title} 
                          className="w-full h-48 object-cover rounded-lg" 
                        />
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {/* Blog Posts Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {regularPosts.map((post) => (
                  <article key={post._id} className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl overflow-hidden hover:shadow-lg transition-shadow duration-300">
                    <img 
                      src={post.featuredImage || "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=250&fit=crop"} 
                      alt={post.title} 
                      className="w-full h-48 object-cover" 
                    />
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-3">
                        <span className="inline-block bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400 px-3 py-1 rounded-full text-sm font-medium">
                          {post.categoryId || 'General'}
                        </span>
                        <span className="text-sm text-gray-500 dark:text-gray-400">
                          {calculateReadTime(post.content)}
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 line-clamp-2">
                        {post.title}
                      </h3>

                      <p className="text-gray-600 dark:text-gray-300 mb-4 line-clamp-3">
                        {post.excerpt || post.content.substring(0, 120) + '...'}
                      </p>

                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
                          <User className="h-4 w-4 mr-1" />
                          <span>{post.author}</span>
                          <Calendar className="h-4 w-4 ml-3 mr-1" />
                          <span>{formatDate(post.createdAt)}</span>
                        </div>
                        <Link to={`/blog/${post._id}`}>
                          <Button variant="ghost" size="sm">
                            Read More <ArrowRight className="ml-1 h-4 w-4" />
                          </Button>
                        </Link>
                      </div>
                    </div>
                  </article>
                ))}
              </div>

              {/* Load More */}
              {hasMore && (
                <div className="text-center mt-12">
                  <Button 
                    variant="outline" 
                    size="lg" 
                    onClick={loadMorePosts}
                    disabled={loading}
                  >
                    {loading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Loading...
                      </>
                    ) : (
                      'Load More Articles'
                    )}
                  </Button>
                </div>
              )}

              {/* No posts message */}
              {!loading && blogPosts.length === 0 && (
                <div className="text-center py-16">
                  <p className="text-gray-600 dark:text-gray-300 text-lg">
                    No blog posts found for this category.
                  </p>
                </div>
              )}
            </>
          )}
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Blog;
