import axios from "axios";

const Backend_URL = import.meta.env.BACKEND_URL || 'https://api.likes.io/api';

interface ReviewFormData {
    name: string;
    email: string;
    service: string;
    rating: number;
    title: string;
    review: string;
}

export const SubmitReview = async (formData: ReviewFormData) => {
    try {
        const response = await axios.post(`${Backend_URL}/leavereview`, {
            username: formData.name,  // Backend expects 'username' instead of 'name'
            email: formData.email,
            serviceUsed: formData.service,  // Backend expects 'serviceUsed' instead of 'service'
            rating: formData.rating,
            reviewTitle: formData.title,  // Backend expects 'reviewTitle' instead of 'title'
            content: formData.review
        });
        
        return response.data;
    } catch (error: any) {
        console.error("Submit Review Error:", error);
        
        if (error.response) {
            console.error("Error response data:", error.response.data);
            console.error("Error response status:", error.response.status);
            console.error("Error response headers:", error.response.headers);
            
            const errorMessage = error.response.data?.message || 
                               error.response.data?.error || 
                               error.response.data?.detail ||
                               'Failed to submit review';
            
            return {
                success: false,
                message: errorMessage
            };
        } else if (error.request) {
            return {
                success: false,
                message: 'Network error. Please check your connection.'
            };
        } else {
            return {
                success: false,
                message: 'An error occurred while submitting your review'
            };
        }
    }
}

// Get All Reviews Function
export const GetAllReviews = async () => {
    try {
        // Try without authentication first (reviews are typically public)
        const response = await axios.get(`${Backend_URL}/leavereview/public`);
        
        return response.data;
    } catch (error: any) {
        console.error("Get All Reviews Error:", error);
        
        if (error.response) {
            console.error("Error response data:", error.response.data);
            console.error("Error response status:", error.response.status);
            console.error("Error response headers:", error.response.headers);
            
            const errorMessage = error.response.data?.message || 
                               error.response.data?.error || 
                               error.response.data?.detail ||
                               'Failed to fetch reviews';
            
            return {
                success: false,
                message: errorMessage
            };
        } else if (error.request) {
            return {
                success: false,
                message: 'Network error. Please check your connection.'
            };
        } else {
            return {
                success: false,
                message: 'An error occurred while fetching reviews'
            };
        }
    }
}

// Vote for helpful review
export const VoteHelpful = async (reviewId: string) => {
    try {
        const response = await axios.put(`${Backend_URL}/leavereview/${reviewId}/helpful`);
        
        return response.data;
    } catch (error: any) {
        console.error("Vote Helpful Error:", error);
        
        if (error.response) {
            console.error("Error response data:", error.response.data);
            console.error("Error response status:", error.response.status);
            
            const errorMessage = error.response.data?.message || 
                               error.response.data?.error || 
                               'Failed to vote for review';
            
            return {
                success: false,
                message: errorMessage
            };
        } else if (error.request) {
            return {
                success: false,
                message: 'Network error. Please check your connection.'
            };
        } else {
            return {
                success: false,
                message: 'An error occurred while voting for the review'
            };
        }
    }
}

// Get review statistics (for admin use)
export const GetReviewStats = async () => {
    try {
        const response = await axios.get(`${Backend_URL}/leavereview/stats`);
        
        return response.data;
    } catch (error: any) {
        console.error("Get Review Stats Error:", error);
        
        if (error.response) {
            const errorMessage = error.response.data?.message || 
                               error.response.data?.error || 
                               'Failed to fetch review statistics';
            
            return {
                success: false,
                message: errorMessage
            };
        } else if (error.request) {
            return {
                success: false,
                message: 'Network error. Please check your connection.'
            };
        } else {
            return {
                success: false,
                message: 'An error occurred while fetching review statistics'
            };
        }
    }
} 