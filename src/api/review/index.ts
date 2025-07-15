import axios from "axios";

const Backend_URL = import.meta.env.BACKEND_URL || 'http://localhost:5005/api';

interface ReviewFormData {
    name: string;
    email: string;
    service: string;
    rating: number;
    title: string;
    review: string;
}

export const SubmitReview = async (formData: ReviewFormData) => {
    console.log("Submit Review Function:", formData);
    
    try {
        const response = await axios.post(`${Backend_URL}/leavereview`, {
            username: formData.name,  // Backend expects 'username' instead of 'name'
            email: formData.email,
            serviceUsed: formData.service,  // Backend expects 'serviceUsed' instead of 'service'
            rating: formData.rating,
            reviewTitle: formData.title,  // Backend expects 'reviewTitle' instead of 'title'
            content: formData.review
        });
        
        console.log("Review submitted successfully:", response.data);
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
    console.log("Get All Reviews Function");
    
    try {
        // Try without authentication first (reviews are typically public)
        const response = await axios.get(`${Backend_URL}/leavereview/public`);
        
        console.log("Reviews fetched successfully:", response.data);
        console.log("------------>",response.data);
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