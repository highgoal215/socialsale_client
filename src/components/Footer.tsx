
import React from 'react';
import { Instagram, Youtube } from 'lucide-react';
import { Link } from 'react-router-dom';
import DarkLogo from '@/assets/dark-logo.svg';

const Footer = () => {
  const footerSections = [
    {
      title: "Instagram Services",
      links: [
        { name: "Instagram Followers", path: "/buy-instagram-followers" },
        { name: "Instagram Likes", path: "/buy-instagram-likes" },
        { name: "Instagram Views", path: "/buy-instagram-views" },
        { name: "Instagram Comments", path: "/buy-instagram-comments" }
      ]
    },
    {
      title: "TikTok Services",
      links: [
        { name: "TikTok Followers", path: "/buy-tiktok-followers" },
        { name: "TikTok Likes", path: "/buy-tiktok-likes" },
        { name: "TikTok Views", path: "/buy-tiktok-views" },
        { name: "TikTok Comments", path: "/buy-tiktok-comments" }
      ]
    },
    {
      title: "YouTube Services",
      links: [
        { name: "YouTube Subscribers", path: "/buy-youtube-subscribers" },
        { name: "YouTube Likes", path: "/buy-youtube-likes" },
        { name: "YouTube Views", path: "/buy-youtube-views" },
        { name: "YouTube Comments", path: "/buy-youtube-comments" }
      ]
    },
    {
      title: "Company",
      links: [
        { name: "About Us", path: "/about" },
        { name: "How It Works", path: "/how-it-works" },
        // { name: "Pricing", path: "/pricing" },
        { name: "Reviews", path: "/reviews" },
        { name: "Blog", path: "/blog" },
        { name: "Contact", path: "/contact" },
        { name: "Privacy Policy", path: "/privacy" },
        { name: "Terms of Service", path: "/terms" }
      ]
    },
    {
      title: "Support",
      links: [
        { name: "Help Center", path: "/help" },
        { name: "Live Chat", path: "/live-chat" },
        { name: "Contact Support", path: "/support" },
        { name: "FAQ", path: "/faq" },
        { name: "Order Tracking", path: "/tracking" },
        { name: "Leave a Review", path: "/leave-review" }
      ]
    }
  ];

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid lg:grid-cols-6 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <img src={DarkLogo} alt="Likes.IO" className="h-10 w-28 dark:hidden" />
              <p className="text-gray-400 mb-6">
                The fastest and most reliable way to grow your social media presence with real, engaged followers.
              </p>

              {/* Social Media */}
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-purple-600 transition-colors">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-red-600 transition-colors">
                  <Youtube className="h-5 w-5" />
                </a>
              </div>
            </div>

            {/* Footer Links */}
            {footerSections.map((section, index) => (
              <div key={index}>
                <h3 className="font-semibold mb-4">{section.title}</h3>
                <ul className="space-y-2">
                  {section.links.map((link, linkIndex) => (
                    <li key={linkIndex}>
                      <Link 
                        to={link.path} 
                        className="text-gray-400 hover:text-white transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 py-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <div className="text-gray-400">
              © 2025 Likes.IO. All rights reserved.
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
