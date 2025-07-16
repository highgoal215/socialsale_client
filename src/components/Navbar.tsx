
import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ChevronDown, Menu, X, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import NotificationButton from '@/components/NotificationButton';
import LightLogo from '@/assets/light-logo.svg';
import DarkLogo from '@/assets/dark-logo.svg';
import ThemeToggle from './ThemeToggle';

const Navbar = () => {
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const handleDropdownToggle = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const closeDropdown = () => {
    setActiveDropdown(null);
  };

  const handleSignIn = () => {
    navigate('/login');
    closeDropdown();
  };

  const handleSignUp = () => {
    navigate('/signup');
    closeDropdown();
  };

  const handleProfile = () => {
    navigate('/profile');
    closeDropdown();
  };

  const handleLogout = () => {
    logout();
    navigate('/');
    closeDropdown();
  };

  const getInitials = (name: string) => {
    if (!name || typeof name !== 'string') {
      return 'U';
    }
    return name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase();
  };

  const serviceCategories = [
    {
      id: 'instagram',
      name: 'Instagram Services',
      services: [
        { name: 'Instagram Followers', path: '/buy-instagram-followers' },
        { name: 'Instagram Likes', path: '/buy-instagram-likes' },
        { name: 'Instagram Views', path: '/buy-instagram-views' },
        { name: 'Instagram Comments', path: '/buy-instagram-comments' },
      ]
    },
    {
      id: 'tiktok',
      name: 'TikTok Services',
      services: [
        { name: 'TikTok Followers', path: '/buy-tiktok-followers' },
        { name: 'TikTok Likes', path: '/buy-tiktok-likes' },
        { name: 'TikTok Views', path: '/buy-tiktok-views' },
        { name: 'TikTok Comments', path: '/buy-tiktok-comments' },
      ]
    },
    {
      id: 'youtube',
      name: 'YouTube Services',
      services: [
        { name: 'YouTube Subscribers', path: '/buy-youtube-subscribers' },
        { name: 'YouTube Likes', path: '/buy-youtube-likes' },
        { name: 'YouTube Views', path: '/buy-youtube-views' },
        { name: 'YouTube Comments', path: '/buy-youtube-comments' },
      ]
    }
  ];


  return (
    <nav className="bg-white dark:bg-gray-900 shadow-sm border-b border-gray-200 dark:border-gray-700 fixed top-0 left-0 right-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <img src={LightLogo} alt="Likes.IO" className="h-10 w-28 dark:hidden" />
            <img src={DarkLogo} alt="Likes.IO" className="h-10 w-28 hidden dark:block" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {serviceCategories.map((category) => (
              <div key={category.id} className="relative">
                <button
                  onClick={() => handleDropdownToggle(category.id)}
                  className="flex items-center text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors relative"
                >
                  {category.name}
                  <ChevronDown className="ml-1 h-4 w-4" />
                  {/* Purple underline indicator */}
                  {activeDropdown === category.id && (
                    <div className="absolute bottom-[-17px] left-0 right-0 h-0.5 bg-purple-600"></div>
                  )}
                </button>

                {/* Dropdown Menu */}
                {activeDropdown === category.id && (
                  <div className="absolute top-full left-0 mt-2 w-56 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                    <div className="py-2">
                      {category.services.map((service, index) => (
                        <Link
                          key={index}
                          to={service.path}
                          onClick={closeDropdown}
                          className="block px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                        >
                          {service.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}

            <Link
              to="/blog"
              className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
            >
              Blog
            </Link>
            
            

            <Link
              to="/reviews"
              className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
            >
              Reviews
            </Link>
          </div>

          {/* Right side buttons */}
          <div className="hidden md:flex items-center space-x-4">
            <ThemeToggle />
            {isAuthenticated ? (
              <>
                <NotificationButton />
                <div className="relative">
                  <button
                    onClick={() => handleDropdownToggle('user')}
                    className="flex items-center space-x-2 text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                  >
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center text-white text-sm font-bold">
                      {user ? getInitials(user.username) : 'U'}
                    </div>
                    <ChevronDown className="h-4 w-4" />
                  </button>

                  {activeDropdown === 'user' && (
                    <div className="absolute top-full right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 z-50">
                      <div className="py-2">
                        <button
                          onClick={handleProfile}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
                        >
                          Profile
                        </button>
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                        >
                          Logout
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              </>
            ) : (
              <>
                <Button
                  variant="ghost"
                  onClick={handleSignIn}
                  className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400"
                >
                  Sign In
                </Button>
                <Button
                  onClick={handleSignUp}
                  className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white"
                >
                  Sign Up
                </Button>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center space-x-2">
            <ThemeToggle />
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 transition-colors"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-gray-200 dark:border-gray-700">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {serviceCategories.map((category) => (
                <div key={category.id}>
                  <button
                    onClick={() => handleDropdownToggle(category.id)}
                    className="flex items-center justify-between w-full px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors"
                  >
                    {category.name}
                    <ChevronDown className="h-4 w-4" />
                  </button>

                  {activeDropdown === category.id && (
                    <div className="pl-4 space-y-1">
                      {category.services.map((service, index) => (
                        <Link
                          key={index}
                          to={service.path}
                          onClick={() => {
                            closeDropdown();
                            setIsMenuOpen(false);
                          }}
                          className="block px-3 py-2 text-sm text-gray-600 dark:text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors"
                        >
                          {service.name}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}

              <Link
                to="/blog"
                onClick={() => setIsMenuOpen(false)}
                className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors"
              >
                Blog
              </Link>

              <Link
                to="/reviews"
                onClick={() => setIsMenuOpen(false)}
                className="block px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors"
              >
                Reviews
              </Link>

              <div className="pt-4 border-t border-gray-200 dark:border-gray-700">
                {isAuthenticated ? (
                  <div className="space-y-1">
                    <div className="flex items-center px-3 py-2">
                      <NotificationButton />
                      <span className="ml-2 text-sm text-gray-600 dark:text-gray-400">Notifications</span>
                    </div>
                    <button
                      onClick={() => {
                        handleProfile();
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center w-full px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors"
                    >
                      <User className="h-5 w-5 mr-2" />
                      Profile
                    </button>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center w-full px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors"
                    >
                      Logout
                    </button>
                  </div>
                ) : (
                  <div className="space-y-1">
                    <button
                      onClick={() => {
                        handleSignIn();
                        setIsMenuOpen(false);
                      }}
                      className="block w-full text-left px-3 py-2 text-base font-medium text-gray-700 dark:text-gray-300 hover:text-purple-600 dark:hover:text-purple-400 hover:bg-gray-50 dark:hover:bg-gray-800 rounded-md transition-colors"
                    >
                      Sign In
                    </button>
                    <button
                      onClick={() => {
                        handleSignUp();
                        setIsMenuOpen(false);
                      }}
                      className="block w-full text-left px-3 py-2 text-base font-medium text-white bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 rounded-md transition-colors"
                    >
                      Sign Up
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
