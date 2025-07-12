import { SignIn, SignUp, UpdatePassword, UpdateProfile, GoogleSignIn } from '@/api/auth';
import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// User interface
interface User {
    id: string;
    username : string
    email: string;
    balance: number;
    totalSpent: number;
}

// Auth context interface
interface AuthContextType {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    login: (email: string, password: string) => Promise<{ success: boolean; message: string }>;
    register: (userData: RegisterData) => Promise<{ success: boolean; message: string }>;
    googleLogin: (accessToken: string) => Promise<{ success: boolean; message: string }>;
    logout: () => void;
    updateProfile: (id: string, username: string) => Promise<{ success: boolean; message: string }>;
    updatePassword: (id: string, password: string) => Promise<{ success: boolean; message: string }>;
}

// Register data interface
interface RegisterData {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
}

// Create the context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Auth provider component
export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);

    // Check if user is logged in on mount
    useEffect(() => {
        const savedUser = localStorage.getItem('user');
        const userToken = localStorage.getItem('userToken');
        
        if (savedUser && userToken) {
            try {
                setUser(JSON.parse(savedUser));
            } catch (error) {
                console.error('Error parsing saved user:', error);
                localStorage.removeItem('user');
                localStorage.removeItem('userToken');
            }
        } else if (userToken && !savedUser) {
            // If we have a token but no user data, clear the token
            localStorage.removeItem('userToken');
        }
        setIsLoading(false);
    }, []);

    // Login function
    const login = async (email: string, password: string): Promise<{ success: boolean; message: string }> => {
        setIsLoading(true);

        try {
            // Simulate API delay
            const response = await SignIn(email, password);

            console.log("RESPONSE ==>", response);

            if (response.success === true) {
                localStorage.removeItem("userToken");
                localStorage.removeItem("user");
                localStorage.setItem('userToken', JSON.stringify(response.token));
                localStorage.setItem('user', JSON.stringify(response.user));

                setUser(response.user);

                return { success: true, message: 'Login successful!' };
            } else {
                return { success: false, message: 'Login Failure!' };
            }
        } catch (error) {
            return { success: false, message: 'An error occurred during login. Please try again.' };
        } finally {
            setIsLoading(false);
        }
    };

    // Register function
    const register = async (userData: RegisterData): Promise<{ success: boolean; message: string }> => {
        setIsLoading(true);

        try {
            // Simulate API delay
            await new Promise(resolve => setTimeout(resolve, 1000));

            // Validate passwords match
            if (userData.password !== userData.confirmPassword) {
                return { success: false, message: 'Passwords do not match.' };
            }

            // Validate password strength (basic validation)
            if (userData.password.length < 6) {
                return { success: false, message: 'Password must be at least 6 characters long.' };
            }

            const username = userData.firstName + " " + userData.lastName;
            // Simulate API delay
            const response = await SignUp(username, userData.email, userData.password);

            if (response.success === true) {
                return { success: true, message: 'Registration successful! Welcome to Likes.IO!' };
            } else {
                return { success: false, message: 'Registration Failure! Please try again!' };
            }

        } catch (error) {
            return { success: false, message: 'An error occurred during registration. Please try again.' };
        } finally {
            setIsLoading(false);
        }
    };

    // Logout function
    const logout = () => {
        setUser(null);
        localStorage.removeItem('user');
        localStorage.removeItem('userToken');
    };

    // Update profile function
    const updateProfile = async (id: string, username: string): Promise<{ success: boolean; message: string }> => {
        setIsLoading(true);

        try {
            // Simulate API delay
            const userData = JSON.parse(localStorage.getItem('user'));
            const originUsername = userData.username;
            if (originUsername === username) {
                return {success: false, message: 'No any changes!'}
            } else {
                const response = await UpdateProfile(id, username);
                if (response.success === true) {
                    localStorage.removeItem('user');
                    localStorage.setItem('user', JSON.stringify(response.user));
                    setUser(response.user); // Update the user state
                    return { success: true, message: 'Profile updated successfully!' };
                }
            }

        } catch (error) {
            return { success: false, message: 'An error occurred while updating profile. Please try again.' };
        } finally {
            setIsLoading(false);
        }
    };

    // Google login function
    const googleLogin = async (accessToken: string): Promise<{ success: boolean; message: string }> => {
        setIsLoading(true);

        try {
            const response = await GoogleSignIn(accessToken);

            if (response.success === true || response.token) {
                localStorage.removeItem("userToken");
                localStorage.removeItem("user");
                localStorage.setItem('userToken', JSON.stringify(response.token || response.accessToken));
                
                if (response.user) {
                    localStorage.setItem('user', JSON.stringify(response.user));
                    setUser(response.user);
                }

                return { success: true, message: 'Google login successful!' };
            } else {
                return { success: false, message: response.message || 'Google login failed!' };
            }
        } catch (error) {
            console.error('Google login error:', error);
            return { success: false, message: 'An error occurred during Google login. Please try again.' };
        } finally {
            setIsLoading(false);
        }
    };

    // Update password function
    const updatePassword = async (id: string, password: string): Promise<{ success: boolean; message: string }> => {
        setIsLoading(true);

        try {
            const response = await UpdatePassword(id, password);
            
            if (response && response.success === true) {
                // Only update user data if the response contains user data
                if (response.user) {
                    localStorage.removeItem('user');
                    localStorage.setItem('user', JSON.stringify(response.user));
                    setUser(response.user);
                }
                return { success: true, message: response.message || 'Password updated successfully!' };
            } else {
                // Handle error response
                const errorMessage = response?.message || 'Failed to update password. Please try again.';
                return { success: false, message: errorMessage };
            }

        } catch (error) {
            console.error('Password update error:', error);
            return { success: false, message: 'An error occurred while updating password. Please try again.' };
        } finally {
            setIsLoading(false);
        }
    };

    const value: AuthContextType = {
        user,
        isAuthenticated: !!user,
        isLoading,
        login,
        register,
        googleLogin,
        logout,
        updateProfile,
        updatePassword
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};

// Custom hook to use auth context
export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
}; 