import axios from "axios";

const Backend_URL = import.meta.env.BACKEND_URL || 'http://localhost:5005/api';

interface BlogPost {
  _id: string;
  title: string;
  content: string;
  excerpt?: string;
  author: string;
  categoryId?: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  tags?: string[];
  featuredImage?: string;
  slug?: string;
}

interface GetPublicBlogsParams {
  limit?: number;
  category?: string;
}

interface GetPublicBlogsResponse {
  success: boolean;
  count: number;
  data: BlogPost[];
}

interface GetBlogPostResponse {
  success: boolean;
  data: BlogPost;
}

const GetPublicBlogs = async (params?: GetPublicBlogsParams): Promise<GetPublicBlogsResponse> => {
  const queryParams = new URLSearchParams();
  
  if (params?.limit) {
    queryParams.append('limit', params.limit.toString());
  }
  
  if (params?.category) {
    // Try both category and categoryId parameters since backend might expect either
    queryParams.append('category', params.category);
    queryParams.append('categoryId', params.category);
    console.log('Adding category filter:', params.category, 'as both category and categoryId');
  }

  try {
    // Based on the backend function name 'getPublishedPosts', try the most likely endpoint
    const url = `${Backend_URL}/blog/published${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
    
    console.log('Fetching blog posts from:', url);
    console.log('Query parameters:', queryParams.toString());
    const response = await axios.get(url);
    
    console.log('Blog posts response:', response.data);
    console.log('Response data length:', response.data.data?.length || response.data.length);
    
    // Log the categories of returned posts for debugging
    if (response.data.data) {
      const categories = [...new Set(response.data.data.map((post: BlogPost) => post.categoryId))];
      console.log('Categories in returned posts:', categories);
    }
    
    return response.data;
  } catch (error: any) {
    console.error('Error fetching public blogs:', error);
    
    // If the first endpoint fails, try alternative endpoints
    if (error.response?.status === 401 || error.response?.status === 404) {
      console.log('Trying alternative endpoints...');
      
      const alternativeEndpoints = [
        // `${Backend_URL}/blog/public`,
        // `${Backend_URL}/blog/posts/public`,
        `${Backend_URL}/blog/posts/published`
      ];

      for (const endpoint of alternativeEndpoints) {
        try {
          const url = `${endpoint}${queryParams.toString() ? `?${queryParams.toString()}` : ''}`;
          console.log('Trying alternative endpoint:', url);
          const response = await axios.get(url);
          console.log('Success with alternative endpoint:', url);
          return response.data;
        } catch (altError: any) {
          console.log('Failed with alternative endpoint:', endpoint, altError.response?.status);
          continue;
        }
      }
    }
    
    throw error;
  }
};

const GetBlogPostById = async (id: string): Promise<GetBlogPostResponse> => {
  try {
    // Since individual post endpoints require authentication, 
    // we'll fetch all published posts and filter for the specific ID
    console.log('Fetching all published posts to find post with ID:', id);
    
    // Try the same endpoints that worked for the blog listing
    const endpoints = [
      `${Backend_URL}/blog/published`,
    //   `${Backend_URL}/blog/public`,
    //   `${Backend_URL}/blog/posts/public`,
    //   `${Backend_URL}/blog/posts/published`
    ];

    for (const endpoint of endpoints) {
      try {
        console.log('Trying to fetch all posts from:', endpoint);
        const response = await axios.get(endpoint);
        console.log('Successfully fetched posts from:', endpoint);
        
        // Find the specific post by ID
        const allPosts = response.data.data || response.data;
        const foundPost = allPosts.find((post: BlogPost) => post._id === id);
        
        if (foundPost) {
          console.log('Found post:', foundPost.title);
          return {
            success: true,
            data: foundPost
          };
        } else {
          console.log('Post not found in the fetched data');
        }
      } catch (error: any) {
        console.log('Failed with endpoint:', endpoint, error.response?.status);
        continue;
      }
    }
    
    throw new Error('Blog post not found');
  } catch (error) {
    console.error('Error fetching blog post:', error);
    throw error;
  }
};

export { GetPublicBlogs, GetBlogPostById, type BlogPost, type GetPublicBlogsParams, type GetPublicBlogsResponse, type GetBlogPostResponse };