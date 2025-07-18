// Types for chatbot messages
export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp?: string;
  id?: string;
}

export interface ChatResponse {
  success: boolean;
  data?: {
    response: string;
    conversationId: string;
    timestamp: string;
  };
  error?: string;
}

// Base API configuration
// const API_BASE_URL = import.meta.env.BACKEND_URL || 'https://api.likes.io/api';
const API_BASE_URL = import.meta.env.BACKEND_URL || 'https://api.likes.io/api';

// Send message to chatbot
export const sendMessage = async (
  prompt: string, 
  conversationHistory: ChatMessage[] = []
): Promise<ChatResponse> => {
  // //console.log('prompt:', prompt);
  // //console.log('Conversation history:', conversationHistory);
    try {
    const response = await fetch(`${API_BASE_URL}/chatbot/send-message`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // Add authorization header if needed
        // 'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify({
        prompt,
        conversationHistory
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error sending message to chatbot:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to send message'
    };
  }
};

// Initialize conversation
export const initializeChat = async (): Promise<ChatResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/chatbot/initialize`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error initializing chat:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to initialize chat'
    };
  }
};

// Get chat history (if implemented)
export const getChatHistory = async (conversationId: string): Promise<ChatResponse> => {
  try {
    const response = await fetch(`${API_BASE_URL}/chatbot/history/${conversationId}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // Add authorization header if needed
        // 'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.error || `HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error fetching chat history:', error);
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Failed to fetch chat history'
    };
  }
};

// Utility function to format conversation history for API
export const formatConversationHistory = (messages: ChatMessage[]): ChatMessage[] => {
  return messages
    .filter(msg => msg.role !== 'system') // Remove system messages from history
    .map(msg => ({
      role: msg.role,
      content: msg.content
    }));
};
