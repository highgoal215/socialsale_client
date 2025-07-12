import React, { useEffect } from 'react';
import { useToast } from '@/hooks/use-toast';
import { useNotificationContext } from '@/contexts/NotificationContext';
import { Bell, Package, CreditCard, MessageCircle, AlertCircle } from 'lucide-react';

// Helper function to get notification icon
const getNotificationIcon = (type: string) => {
  switch (type) {
    case 'order_update':
      return Package;
    case 'payment':
      return CreditCard;
    case 'support':
      return MessageCircle;
    case 'promo':
      return Bell;
    case 'system':
      return AlertCircle;
    default:
      return Bell;
  }
};

const ToastNotification: React.FC = () => {
  const { toast } = useToast();
  const { notifications } = useNotificationContext();

  useEffect(() => {
    // Show toast for the most recent notification (if it's unread)
    const latestNotification = notifications[0];
    if (latestNotification && !latestNotification.read) {
      const Icon = getNotificationIcon(latestNotification.type);
      
      toast({
        title: latestNotification.title,
        description: latestNotification.message,
        duration: 5000,
        action: (
          <div className="flex items-center gap-2">
            <Icon className="h-4 w-4" />
            <span className="text-xs text-muted-foreground">
              {new Date(latestNotification.createdAt).toLocaleTimeString()}
            </span>
          </div>
        ),
      });
    }
  }, [notifications, toast]);

  return null; // This component doesn't render anything
};

export default ToastNotification; 