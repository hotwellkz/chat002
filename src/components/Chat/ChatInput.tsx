import React, { useState } from 'react';
import { Send, Paperclip } from 'lucide-react';
import { useStore } from '../../store/useStore';
import { sendMessageToOpenAI } from '../../services/api';
import { addMessageToSession } from '../../services/chat';
import { auth } from '../../lib/firebase';
import { v4 as uuidv4 } from 'uuid';

export const ChatInput = () => {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { currentSession, addMessage } = useStore();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!message.trim() || isLoading) return;

    const user = auth.currentUser;
    if (!user || !currentSession) return;

    setIsLoading(true);

    try {
      // Сообщение пользователя
      const userMessage = {
        id: uuidv4(),
        content: message,
        role: 'user' as const,
        timestamp: Date.now()
      };

      addMessage(userMessage);
      await addMessageToSession(currentSession.id, userMessage);

      // Получаем ответ от OpenAI
      const response = await sendMessageToOpenAI(message);

      // Ответ ассистента
      const assistantMessage = {
        id: uuidv4(),
        content: response || 'Извините, произошла ошибка',
        role: 'assistant' as const,
        timestamp: Date.now()
      };

      addMessage(assistantMessage);
      await addMessageToSession(currentSession.id, assistantMessage);
    } catch (error) {
      console.error('Error sending message:', error);
    } finally {
      setMessage('');
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="relative w-full">
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Сообщить ChatGPT..."
        className="w-full px-4 py-3 pr-24 rounded-lg bg-gray-50 border border-gray-200 focus:outline-none focus:border-gray-300 focus:ring-1 focus:ring-gray-300"
        disabled={isLoading}
      />
      <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center space-x-1">
        <button type="button" className="p-2 hover:bg-gray-100 rounded-full">
          <Paperclip className="w-5 h-5 text-gray-400" />
        </button>
        <button 
          type="submit" 
          className="p-2 hover:bg-gray-100 rounded-full"
          disabled={isLoading}
        >
          <Send className={`w-5 h-5 ${isLoading ? 'text-gray-300' : 'text-gray-400'}`} />
        </button>
      </div>
    </form>
  );
};