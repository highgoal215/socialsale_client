import { useEffect } from 'react';

const GoogleCallback = () => {
  useEffect(() => {
    const handleOAuthCallback = () => {
      try {
        // Get the access token from URL hash
        const hash = window.location.hash.substring(1);
        const params = new URLSearchParams(hash);
        const accessToken = params.get('access_token');
        const error = params.get('error');
        const errorDescription = params.get('error_description');

        if (error) {
          // Handle error
          const errorMessage = errorDescription || error;
          console.error('OAuth error:', errorMessage);
          
          // Send error message to parent window
          if (window.opener && !window.opener.closed) {
            try {
              window.opener.postMessage({
                type: 'GOOGLE_OAUTH_ERROR',
                error: errorMessage
              }, window.location.origin);
            } catch (e) {
              console.error('Failed to send error message to parent:', e);
            }
          }
        } else if (accessToken) {
          // Send success message to parent window
          if (window.opener && !window.opener.closed) {
            try {
              window.opener.postMessage({
                type: 'GOOGLE_OAUTH_SUCCESS',
                accessToken: accessToken
              }, window.location.origin);
            } catch (e) {
              console.error('Failed to send success message to parent:', e);
            }
          } else {
            console.warn('Parent window not available or closed');
          }
        } else {
          console.error('No access token or error found in URL');
          if (window.opener && !window.opener.closed) {
            try {
              window.opener.postMessage({
                type: 'GOOGLE_OAUTH_ERROR',
                error: 'No access token received'
              }, window.location.origin);
            } catch (e) {
              console.error('Failed to send error message to parent:', e);
            }
          }
        }
      } catch (error) {
        console.error('Error in OAuth callback:', error);
        if (window.opener && !window.opener.closed) {
          try {
            window.opener.postMessage({
              type: 'GOOGLE_OAUTH_ERROR',
              error: 'Unexpected error during OAuth callback'
            }, window.location.origin);
          } catch (e) {
            console.error('Failed to send error message to parent:', e);
          }
        }
      }

      // Close the popup after a short delay to ensure message is sent
      setTimeout(() => {
        try {
          window.close();
        } catch (e) {
          console.error('Failed to close popup:', e);
        }
      }, 1000);
    };

    // Execute the callback handler
    handleOAuthCallback();
  }, []);

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="text-center p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div>
        <p className="mt-4 text-gray-600 dark:text-gray-300">Completing Google login...</p>
        <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">This window will close automatically</p>
      </div>
    </div>
  );
};

export default GoogleCallback; 