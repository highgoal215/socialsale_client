
import React, { useState, useEffect, useRef } from 'react';
import { MessageCircle, X, Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { sendMessage, formatConversationHistory, type ChatMessage } from '@/api/chatbot';

const LiveChat = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>(() => {
    // Load messages from localStorage on component mount
    const savedMessages = localStorage.getItem('liveChatMessages');
    if (savedMessages) {
      try {
        return JSON.parse(savedMessages);
      } catch (error) {
        console.error('Error parsing saved messages:', error);
      }
    }
    // Default welcome message
    return [{
      id: '1',
      role: 'assistant',
      content: "Hello! Welcome to Likes.IO support. How can I help you today?",
      timestamp: new Date().toLocaleTimeString()
    }];
  });
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const messagesContainerRef = useRef<HTMLDivElement>(null);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('liveChatMessages', JSON.stringify(messages));
  }, [messages]);

  // Auto-scroll to bottom when new messages are added
  const scrollToBottom = () => {
    if (messagesContainerRef.current) {
      messagesContainerRef.current.scrollTop = messagesContainerRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const generateId = () => {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  };

  const clearChat = () => {
    const welcomeMessage: ChatMessage = {
      id: generateId(),
      role: 'assistant',
      content: "Hello! Welcome to Likes.IO support. How can I help you today?",
      timestamp: new Date().toLocaleTimeString()
    };
    setMessages([welcomeMessage]);
    setError(null);
  };

  const handleSendMessage = async () => {
    if (newMessage.trim() && !isLoading) {
      const userMessage: ChatMessage = {
        id: generateId(),
        role: 'user',
        content: newMessage,
        timestamp: new Date().toLocaleTimeString()
      };
      
      setMessages(prev => [...prev, userMessage]);
      setNewMessage('');
      setIsLoading(true);
      setError(null);
      
      try {
        // Format conversation history for API
        const conversationHistory = formatConversationHistory(messages);
        
        // Send message to chatbot API
        const response = await sendMessage(newMessage, conversationHistory);
    
        if (response.success && response.data) {
          const assistantMessage: ChatMessage = {
            id: generateId(),
            role: 'assistant',
            content: response.data.response,
            timestamp: new Date().toLocaleTimeString()
          };
          setMessages(prev => [...prev, assistantMessage]);
        } else {
          // Fallback response if API fails
          const fallbackMessage: ChatMessage = {
            id: generateId(),
            role: 'assistant',
            content: "I apologize, but I'm having trouble connecting to our support system right now. Please try again in a moment or contact us through our support email.",
            timestamp: new Date().toLocaleTimeString()
          };
          setMessages(prev => [...prev, fallbackMessage]);
          setError(`API connection failed: ${response.error || 'Unknown error'}`);
        }
      } catch (error) {
        console.error('Error sending message:', error);
        const errorMessage: ChatMessage = {
          id: generateId(),
          role: 'assistant',
          content: "Sorry, I encountered an error. Please try again or contact our support team.",
          timestamp: new Date().toLocaleTimeString()
        };
        setMessages(prev => [...prev, errorMessage]);
        setError(`Network error: ${error instanceof Error ? error.message : 'Unknown error'}`);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <>
      {/* Chat Toggle Button */}
      <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="bg-purple-600 hover:bg-purple-700 rounded-full w-14 h-14 sm:w-16 sm:h-16 shadow-lg transition-all duration-200 hover:scale-105"
        >
          {isOpen ? <X className="h-6 w-6 sm:h-7 sm:w-7" /> : <MessageCircle className="h-6 w-6 sm:h-7 sm:w-7" />}
        </Button>
      </div>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 sm:bottom-28 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-80 lg:w-96 h-[500px] max-h-[80vh]">
          <Card className="h-full flex flex-col shadow-2xl border-0">
            <CardHeader className="bg-purple-600 text-white rounded-t-lg p-3 sm:p-4 flex-shrink-0">
              <div className="flex items-center justify-between">
                <CardTitle className="text-base sm:text-lg flex items-center gap-2">
                  <MessageCircle className="h-4 w-4 sm:h-5 sm:w-5" />
                  Live Chat Support
                </CardTitle>
                <Button
                  onClick={clearChat}
                  variant="ghost"
                  size="sm"
                  className="text-purple-100 hover:text-white hover:bg-purple-700 h-8 px-2 text-xs"
                >
                  Clear
                </Button>
              </div>
              <div className="flex items-center gap-2 text-xs sm:text-sm text-purple-100">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
                Online • We typically reply instantly
              </div>
            </CardHeader>
            <CardContent className="flex-1 flex flex-col p-0 min-h-0">
              {/* Error Message */}
              {error && (
                <div className="bg-red-50 dark:bg-red-900/20 border-b border-red-200 dark:border-red-800 p-2 flex-shrink-0">
                  <p className="text-xs text-red-600 dark:text-red-400">{error}</p>
                </div>
              )}
              
              {/* Messages Container with Enhanced Scrollbar */}
              <div 
                ref={messagesContainerRef}
                className="flex-1 overflow-y-auto p-3 sm:p-4 space-y-3 bg-gray-50 dark:bg-gray-900 min-h-0
                          [&::-webkit-scrollbar]:w-2
                          [&::-webkit-scrollbar-track]:bg-gray-100
                          [&::-webkit-scrollbar-track]:rounded-full
                          [&::-webkit-scrollbar-thumb]:bg-gray-300
                          [&::-webkit-scrollbar-thumb]:rounded-full
                          [&::-webkit-scrollbar-thumb]:hover:bg-gray-400
                          dark:[&::-webkit-scrollbar-track]:bg-gray-800
                          dark:[&::-webkit-scrollbar-thumb]:bg-gray-600
                          dark:[&::-webkit-scrollbar-thumb]:hover:bg-gray-500"
                style={{
                  scrollbarWidth: 'thin',
                  scrollbarColor: '#d1d5db #f3f4f6'
                }}
              >
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-[80%] sm:max-w-xs lg:max-w-sm px-3 py-2 rounded-lg text-sm ${
                        message.role === 'user'
                          ? 'bg-purple-600 text-white'
                          : 'bg-white dark:bg-gray-800 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700'
                      }`}
                    >
                      <p className="whitespace-pre-wrap break-words">{message.content}</p>
                      <p className="text-xs opacity-75 mt-1">
                        {message.timestamp}
                      </p>
                    </div>
                  </div>
                ))}
                
                {/* Loading indicator */}
                {isLoading && (
                  <div className="flex justify-start">
                    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 px-3 py-2 rounded-lg">
                      <div className="flex items-center gap-2">
                        <Loader2 className="h-4 w-4 animate-spin text-purple-600" />
                        <span className="text-sm text-gray-600 dark:text-gray-300">Typing...</span>
                      </div>
                    </div>
                  </div>
                )}
                
                <div ref={messagesEndRef} />
              </div>
              
              {/* Message Input */}
              <div className="border-t border-gray-200 dark:border-gray-700 p-3 sm:p-4 bg-white dark:bg-gray-950 flex-shrink-0">
                <div className="flex space-x-2">
                  <Input
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    disabled={isLoading}
                    className="flex-1 text-sm"
                  />
                  <Button
                    onClick={handleSendMessage}
                    disabled={isLoading || !newMessage.trim()}
                    size="sm"
                    className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50"
                  >
                    {isLoading ? (
                      <Loader2 className="h-4 w-4 animate-spin" />
                    ) : (
                      <Send className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </>
  );
};

export default LiveChat;
