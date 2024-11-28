export interface Message {
  id: string;
  content: string;
  role: 'user' | 'assistant';
  timestamp: number;
}

export interface User {
  id: string;
  email: string;
  name: string;
  photoURL?: string;
  subscription?: {
    status: 'free' | 'basic' | 'premium';
    validUntil: number;
  };
}

export interface ChatSession {
  id: string;
  title: string;
  messages: Message[];
  createdAt: number;
  updatedAt: number;
}