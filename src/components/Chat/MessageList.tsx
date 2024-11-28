import React from 'react';
import { Message } from './Message';
import { useStore } from '../../store/useStore';

export const MessageList = () => {
  const messages = useStore((state) => state.messages);

  return (
    <div className="flex-1 overflow-y-auto">
      {messages.map((message) => (
        <Message key={message.id} message={message} />
      ))}
    </div>
  );
};