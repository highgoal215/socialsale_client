
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, ArrowRight } from 'lucide-react';

const BlogPreviewSection = () => {
  const blogPosts = [
    {
      id: 1,
      image: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=400&h=250&fit=crop",
      title: "10 Proven Strategies to Increase Instagram Engagement in 2024",
      excerpt: "Discover the latest tactics that top influencers use to boost their engagement rates and grow their audience organically.",
      date: "Dec 15, 2024",
      readTime: "5 min read",
      category: "Instagram Tips"
    },
    {
      id: 2,
      image: "https://images.unsplash.com/photo-1611605698335-8b1569810432?w=400&h=250&fit=crop",
      title: "TikTok Algorithm Secrets: How to Get Your Videos on the FYP",
      excerpt: "Learn the insider secrets of the TikTok algorithm and how to optimize your content for maximum reach and visibility.",
      date: "Dec 12, 2024",
      readTime: "7 min read",
      category: "TikTok Growth"
    },
    {
      id: 3,
      image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=250&fit=crop",
      title: "Building Your Personal Brand: A Creator's Complete Guide",
      excerpt: "Step-by-step guide to building a strong personal brand that attracts followers, engages audiences, and drives business results.",
      date: "Dec 10, 2024",
      readTime: "8 min read",
      category: "Personal Branding"
    }
  ];

  return (
    <section className="py-16 bg-white dark:bg-gray-900" id="blog">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Explore Our Latest Social Media Growth Blog
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Stay ahead of the curve with our expert insights, tips, and strategies for
            growing your social media presence organically and effectively.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {blogPosts.map((post, index) => (
            <Link to={`/blog/${post.id}`} key={index}>
              <article className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 overflow-hidden border border-gray-100 dark:border-gray-700 group">
                <div className="relative overflow-hidden">
                  <img
                    src={post.image}
                    alt={post.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-4 left-4">
                    <span className="inline-block bg-purple-600 text-white text-xs px-3 py-1 rounded-full font-medium">
                      {post.category}
                    </span>
                  </div>
                </div>

                <div className="p-6">
                  <div className="flex items-center gap-4 text-sm text-gray-500 dark:text-gray-400 mb-3">
                    <div className="flex items-center gap-1">
                      <Calendar className="h-4 w-4" />
                      {post.date}
                    </div>
                    <span>{post.readTime}</span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 dark:text-white mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                    {post.title}
                  </h3>

                  <p className="text-gray-600 dark:text-gray-300 mb-4 leading-relaxed">
                    {post.excerpt}
                  </p>

                  <div className="flex items-center justify-between">
                    <span className="text-purple-600 dark:text-purple-400 font-medium hover:text-purple-700 dark:hover:text-purple-300 flex items-center gap-2 group/btn">
                      Read More
                      <ArrowRight className="h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                    </span>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* View All Blog Posts CTA */}
        <div className="text-center">
          <Link to="/blog">
            <button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 hover:scale-105">
              View All Blog Posts
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BlogPreviewSection;
