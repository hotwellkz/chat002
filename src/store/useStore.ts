import { create } from 'zustand';
import { Message, ChatSession } from '../types';

interface ChatStore {
  currentSession: ChatSession | null;
  sessions: ChatSession[];
  messages: Message[];
  setCurrentSession: (session: ChatSession | null) => void;
  addMessage: (message: Message) => void;
  addSession: (session: ChatSession) => void;
}

export const useStore = create<ChatStore>((set) => ({
  currentSession: null,
  sessions: [],
  messages: [],
  setCurrentSession: (session) => set({ currentSession: session }),
  addMessage: (message) =>
    set((state) => ({ messages: [...state.messages, message] })),
  addSession: (session) =>
    set((state) => ({ sessions: [...state.sessions, session] })),
}));