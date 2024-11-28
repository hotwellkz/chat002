import React from 'react';
import { User, MessageSquare } from 'lucide-react';
import { Message as MessageType } from '../../types';

interface MessageProps {
  message: MessageType;
}

export const Message: React.FC<MessageProps> = ({ message }) => {
  const isUser = message.role === 'user';

  return (
    <div className={`py-6 ${isUser ? 'bg-white' : 'bg-gray-50'}`}>
      <div className="max-w-3xl mx-auto flex items-start space-x-4 px-4">
        <div className={`flex-shrink-0 rounded-full p-2 ${isUser ? 'bg-gray-100' : 'bg-emerald-100'}`}>
          {isUser ? (
            <User className="h-5 w-5 text-gray-600" />
          ) : (
            <MessageSquare className="h-5 w-5 text-emerald-600" />
          )}
        </div>
        <div className="flex-1 space-y-2">
          <p className="text-sm text-gray-900">{message.content}</p>
        </div>
      </div>
    </div>
  );
};