import axios from "axios";

const Backend_URL = import.meta.env.BACKEND_URL || 'http://localhost:5005/api';

interface SupportFormData {
    username: string;
    email: string;
    orderNumber: string;
    category: string;
    subject: string;
    message: string;
}

export const SendSupportMessage = async (formData: SupportFormData) => {
    // //console.log("Send Support Message Function:", formData);
    try{
        const response = await axios.post(`${Backend_URL}/support`, {
            username: formData.username,
            email: formData.email,
            ordernumber: formData.orderNumber,  // Backend expects 'ordernumber' instead of 'orderNumber'
            category: formData.category,
            subject: formData.subject,
            content: formData.message
        });
        // //console.log("Support message sent successfully:", response.data);
        return response.data;
    } catch(error: any){
        console.error("Send Support Message Error:", error);
        
        if(error.response){
            console.error("Error response data:", error.response.data);
            console.error("Error response status:", error.response.status);
            console.error("Error response headers:", error.response.headers);
            
            const errorMessage = error.response.data?.message || 
            error.response.data?.error || 
            error.response.data?.detail ||  
            'Failed to send support message';
            
            return {
                success: false,
                message: errorMessage
            };
        } else if(error.request){
            return {
                success: false,
                message: 'Network error. Please check your connection.'
            };
        } else{
            return {
                success: false,
                message: 'An error occurred while sending your message'
            };
        }
    }
}   