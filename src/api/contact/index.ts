import axios from "axios"

// const Backend_URL = import.meta.env.BACKEND_URL || 'http://localhost:5005/api';
const Backend_URL = import.meta.env.BACKEND_URL || 'http://localhost:5005/api';

// Contact form data interface
interface ContactFormData {
  username: string;
  email: string;
  subject: string;
  message: string;
}

// Send Contact Message Function
export const SendContactMessage = async (formData: ContactFormData) => {
  // console.log("Send Contact Message Function:", formData);
  
  try {
    const response = await axios.post(`${Backend_URL}/contact`, {
      username: formData.username,
      email: formData.email,
      subject: formData.subject,
      content: formData.message  // Backend expects 'content' instead of 'message'
    });
    
    // console.log("Contact message sent successfully:", response.data);
    return response.data;
  } catch (error: any) {
    console.error("Send Contact Message Error:", error);
    
    // Handle axios error response
    if (error.response) {
      console.error("Error response data:", error.response.data);
      console.error("Error response status:", error.response.status);
      
      // Try to extract more specific error information
      const errorMessage = error.response.data?.message || 
                         error.response.data?.error || 
                         error.response.data?.detail ||
                         'Failed to send contact message';
      
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
        message: 'An error occurred while sending your message' 
      };
    }
  }
}
