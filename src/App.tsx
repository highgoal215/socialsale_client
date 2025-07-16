
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";
import { NotificationProvider } from "./contexts/NotificationContext";
import ProtectedRoute from "./components/ProtectedRoute";
import ToastNotification from "./components/ToastNotification";
import LiveChat from "./components/LiveChat";
import Index from "./pages/Index";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Reviews from "./pages/Reviews";
import Checkout from "./pages/Checkout";
import Profile from "./pages/Profile";
import NotFound from "./pages/NotFound";
import Order from "./pages/Order";
import Contact from "./pages/Contact";
import Privacy from "./pages/Privacy";
import Terms from "./pages/Terms";
import LeaveReview from "./pages/LeaveReview";
import Help from "./pages/Help";
import Support from "./pages/Support";
import Tracking from "./pages/Tracking";
import Notifications from "./pages/Notifications";
import InstagramFollowers from "./pages/InstagramFollowers";
import InstagramLikes from "./pages/InstagramLikes";
import InstagramViews from "./pages/InstagramViews";
import InstagramComments from "./pages/InstagramComments";
import TikTokFollowers from "./pages/TikTokFollowers";
import TikTokLikes from "./pages/TikTokLikes";
import TikTokViews from "./pages/TikTokViews";
import TikTokComments from "./pages/TikTokComments";
import YouTubeSubscribes from "./pages/YouTubeSubscribes";
import YouTubeLikes from "./pages/YouTubeLikes";
import YouTubeViews from "./pages/YouTubeViews";
import YouTubeComments from "./pages/YouTubeComments";
import About from "./pages/About";
import HowItWorks from "./pages/HowItWorks";
import LiveChatPage from "./pages/LiveChatPage";
import FAQ from "./pages/FAQ";
import GoogleCallback from "./pages/GoogleCallback";


const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <NotificationProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <ToastNotification />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Index />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<SignUp />} />
              <Route path="/blog" element={<Blog />} />
              <Route path="/blog/:id" element={<BlogPost />} />
              <Route path="/reviews" element={<Reviews />} />
              <Route path="/checkout" element={<Checkout />} />
              <Route path="/order" element={<Order />} />
              <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
              {/* Instagram Service routes */}
              <Route path="/buy-instagram-followers" element={<InstagramFollowers />} />
              <Route path="/buy-instagram-likes" element={<InstagramLikes />} />
              <Route path="/buy-instagram-views" element={<InstagramViews />} />
              <Route path="/buy-instagram-comments" element={<InstagramComments />} />
              {/* TikTok Service routes */}
              <Route path="/buy-tiktok-followers" element={<TikTokFollowers />} />
              <Route path="/buy-tiktok-likes" element={<TikTokLikes />} />
              <Route path="/buy-tiktok-views" element={<TikTokViews />} />
              <Route path="/buy-tiktok-comments" element={<TikTokComments />} />
              {/* YouTube Service routes */}
              <Route path="/buy-youtube-subscribers" element={<YouTubeSubscribes />} />
              <Route path="/buy-youtube-likes" element={<YouTubeLikes />} />
              <Route path="/buy-youtube-views" element={<YouTubeViews />} />
              <Route path="/buy-youtube-comments" element={<YouTubeComments />} />
              <Route path="/order" element={<Order />} />
              {/* New pages */}
              <Route path="/about" element={<About />} />
              <Route path="/how-it-works" element={<HowItWorks />} />
              <Route path="/live-chat" element={<LiveChatPage />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/google-callback" element={<GoogleCallback />} />

              <Route path="/contact" element={<Contact />} />
              <Route path="/privacy" element={<Privacy />} />
              <Route path="/terms" element={<Terms />} />
              <Route path="/leave-review" element={<LeaveReview />} />
              <Route path="/help" element={<Help />} />
              <Route path="/support" element={<Support />} />
              <Route path="/tracking" element={<Tracking />} />
              <Route path="/notifications" element={<ProtectedRoute><Notifications /></ProtectedRoute>} />
              {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
              <Route path="*" element={<NotFound />} />
            </Routes>
            <LiveChat />
          </BrowserRouter>
        </TooltipProvider>
      </NotificationProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
