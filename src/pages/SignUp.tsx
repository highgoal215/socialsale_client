import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Eye, EyeOff } from 'lucide-react';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import LightLogo from '@/assets/light-logo.svg';
import DarkLogo from '@/assets/dark-logo.svg';
import { GoogleSignIn } from '../api/auth';

const SignUp = () => {
  const navigate = useNavigate();
  const { register, isLoading, googleLogin } = useAuth();
  const { toast } = useToast();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const result = await register(formData);

    if (result.success) {
      toast({
        title: "Success!",
        description: result.message,
      });
      navigate('/login');
    } else {
      toast({
        title: "Error",
        description: result.message,
        variant: "destructive",
      });
    }
  };

  const handleGoogleLogin = () => {
    try {
      // Check if client ID is configured
      const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
      console.log("Client ID:", clientId);
      if (!clientId) {
        console.error('Google Client ID not configured');
        toast({
          title: "Error",
          description: "Google login is not configured. Please contact support.",
          variant: "destructive",
        });
        return;
      }
      
      // Build the Google OAuth URL for popup flow
      const redirectUri = `${window.location.origin}/google-callback`;
      console.log("Redirect URI:", redirectUri);
      const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=token&scope=email profile&state=${encodeURIComponent(window.location.pathname)}`;
      
      // Open popup with specific dimensions and features
      const popup = window.open(
        googleAuthUrl,
        'googleAuth',
        'width=500,height=600,scrollbars=yes,resizable=yes,status=yes,location=yes,toolbar=no,menubar=no,centerscreen=yes'
      );
      
      if (!popup) {
        toast({
          title: "Error",
          description: "Please allow popups to use Google login",
          variant: "destructive",
        });
        return;
      }

      // Handle the OAuth response
      const handleMessage = async (event: MessageEvent) => {
        // Check origin for security
        if (event.origin !== window.location.origin) {
          return;
        }
        
        if (event.data.type === 'GOOGLE_OAUTH_SUCCESS') {
          window.removeEventListener('message', handleMessage);
          
          try {
            const result = await googleLogin(event.data.accessToken);
            
            if (result.success) {
              toast({
                title: "Success!",
                description: result.message,
              });
              
              // Navigate to dashboard after successful login
              navigate('/profile');
            } else {
              toast({
                title: "Error",
                description: result.message,
                variant: "destructive",
              });
            }
          } catch (error) {
            console.error('Google login error:', error);
            toast({
              title: "Error",
              description: "An error occurred during Google login",
              variant: "destructive",
            });
          }
        } else if (event.data.type === 'GOOGLE_OAUTH_ERROR') {
          window.removeEventListener('message', handleMessage);
          toast({
            title: "Error",
            description: event.data.error,
            variant: "destructive",
          });
        }
      };

      window.addEventListener('message', handleMessage);

      // Set a timeout to clean up if no response
      setTimeout(() => {
        window.removeEventListener('message', handleMessage);
        try {
          if (popup && !popup.closed) {
            popup.close();
          }
        } catch (e) {
          console.warn('Could not close popup:', e);
        }
      }, 300000); // 5 minutes timeout
      
    } catch (error) {
      console.error('Google login error:', error);
      toast({
        title: "Error",
        description: "An error occurred while initiating Google login",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <Link to="/" className="flex justify-center">
          <img src={LightLogo} alt="Likes.IO" className="h-10 w-28 dark:hidden" />
          <img src={DarkLogo} alt="Likes.IO" className="h-10 w-28 hidden dark:block" />
        </Link>
        <h2 className="mt-6 text-center text-3xl font-bold text-gray-900 dark:text-white">
          Create your account
        </h2>
        <p className="mt-2 text-center text-sm text-gray-600 dark:text-gray-400">
          Or{' '}
          <Link to="/login" className="font-medium text-purple-600 hover:text-purple-500">
            sign in to your existing account
          </Link>
        </p>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white dark:bg-gray-800 py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  First name
                </label>
                <Input
                  id="firstName"
                  name="firstName"
                  type="text"
                  required
                  value={formData.firstName}
                  onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                  className="w-full bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                  Last name
                </label>
                <Input
                  id="lastName"
                  name="lastName"
                  type="text"
                  required
                  value={formData.lastName}
                  onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                  className="w-full bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                />
              </div>
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email address
              </label>
              <Input
                id="email"
                name="email"
                type="email"
                required
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                className="w-full bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Password
              </label>
              <div className="relative">
                <Input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full pr-10 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <div>
              <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Confirm password
              </label>
              <div className="relative">
                <Input
                  id="confirmPassword"
                  name="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  required
                  value={formData.confirmPassword}
                  onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                  className="w-full pr-10 bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white"
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <EyeOff className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Eye className="h-4 w-4 text-gray-400" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center">
              <input
                id="agree-terms"
                name="agree-terms"
                type="checkbox"
                required
                className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 dark:border-gray-600 rounded"
              />
              <label htmlFor="agree-terms" className="ml-2 block text-sm text-gray-900 dark:text-white">
                I agree to the{' '}
                <a href="#" className="text-purple-600 hover:text-purple-500">
                  Terms and Conditions
                </a>{' '}
                and{' '}
                <a href="#" className="text-purple-600 hover:text-purple-500">
                  Privacy Policy
                </a>
              </label>
            </div>

            <Button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
            >
              {isLoading ? 'Creating account...' : 'Create account'}
            </Button>
          </form>

          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300 dark:border-gray-600" />
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">Or continue with</span>
              </div>
            </div>

            <div className="mt-6 grid w-full  gap-3">
              <Button 
                variant="outline" 
                className="w-full border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700"
                onClick={handleGoogleLogin}
              >
                Google
              </Button>
              {/* <Button variant="outline" className="w-full border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white hover:bg-gray-50 dark:hover:bg-gray-700">
                Facebook
              </Button> */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
