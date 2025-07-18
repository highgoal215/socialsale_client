import axios from "axios"

const Backend_URL = import.meta.env.BACKEND_URL || 'http://localhost:5005/api';

// Get My Information
export const GetMyInformation = async () => {
    const UserToken = localStorage.getItem('userToken');
    const cleanToken = UserToken?.replace(/^"|"$/g, '');
    
    if (!UserToken) {
        console.warn('No user token found');
        return null;
    }

    try {
        const response = await axios.get(`${Backend_URL}/auth/me`, {
            headers: {
                Authorization: `Bearer ${cleanToken}`,
            },
            withCredentials: true, // only needed if you're using cookies too
        });
        return response.data;
    } catch (error) {
        console.error("Get My information failure : ", error);
        return error;
    }
}

// Sign Up Function
export const SignUp = async (username : string, email : string, password : string) => {
    try {
        const response = await axios.post(`${Backend_URL}/auth/register`, {
            username,
            email,
            password
        });
        return response.data;
    } catch (error) {
        console.error("Sign Up Error : ", error);
        return error;
    }
}

// Sign In Function
export const SignIn = async (email : string, password : string) => {
    try {
        const response = await axios.post(`${Backend_URL}/auth/login`, {
            email,
            password
        });
        return response.data;
    } catch (error) {
        return error;
    }
}

// Google Sign In Function
export const GoogleSignIn = async (accessToken: string) => {
    try {
        const response = await axios.post(`${Backend_URL}/auth/google`, {
            token: accessToken
        });
        return response.data;
    } catch (error: any) {
        console.error("Google Sign In Error : ", error);
        // Handle axios error response
        if (error.response) {
            console.error("Error response data:", error.response.data);
            console.error("Error response status:", error.response.status);
            console.error("Error response headers:", error.response.headers);
            // Try to extract more specific error information
            const errorMessage = error.response.data?.message || 
                               error.response.data?.error || 
                               error.response.data?.detail ||
                               'Google authentication failed';
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
                message: 'An error occurred during Google authentication' 
            };
        }
    }
}

// Update Profile Function
export const UpdateProfile = async (id : string, username : string) => {
    const UserToken = localStorage.getItem('userToken');
    const cleanToken = UserToken?.replace(/^"|"$/g, '');
    
    if (!UserToken) {
        console.warn('No user token found');
        return { success: false, message: 'Authentication required' };
    }

    try {
        const response = await axios.put(`${Backend_URL}/auth/updateprofile`, 
            {
                id,
                username,
            },
            {
                headers: {
                    Authorization: `Bearer ${cleanToken}`,
                },
                withCredentials: true,
            }
        );
        return response.data;
    } catch (error) {
        return error;
    }
}

// Update Password Function
export const UpdatePassword = async (id : string, password : string) => {
    const UserToken = localStorage.getItem('userToken');
    const cleanToken = UserToken?.replace(/^"|"$/g, '');
    
    if (!UserToken) {
        console.warn('No user token found');
        return { success: false, message: 'Authentication required' };
    }

    try {
        const response = await axios.put(`${Backend_URL}/auth/updatepassword`, 
            {
                id,
                password,
            },
            {
                headers: {
                    Authorization: `Bearer ${cleanToken}`,
                },
                withCredentials: true,
            }
        );
        return response.data;
    } catch (error: any) {
        console.error("Update Password Failed : ", error);
        
        // Handle axios error response
        if (error.response) {
            return { 
                success: false, 
                message: error.response.data?.message || 'Failed to update password' 
            };
        } else if (error.request) {
            return { 
                success: false, 
                message: 'Network error. Please check your connection.' 
            };
        } else {
            return { 
                success: false, 
                message: 'An error occurred while updating password' 
            };
        }
    }
}

// Logout Function
export const Logout = async () => {
    try {
        const response = await axios.post(`${Backend_URL}/auth/logout`, {});
        return response.data;
    } catch (error) {
        return error;
    }
}