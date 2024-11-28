import React, { useState } from 'react';
import { Image, FileText, Sparkles, MapPin, MoreHorizontal, Code, HelpCircle, MessageCircle, Lightbulb } from 'lucide-react';
import { ChatInput } from './ChatInput';

export const ChatContainer = () => {
  const [showMoreActions, setShowMoreActions] = useState(false);

  const quickActions = [
    { icon: <Image className="w-4 h-4" />, text: 'Создать изображение', prompt: 'Создай изображение...' },
    { icon: <FileText className="w-4 h-4" />, text: 'Кратко изложи текст', prompt: 'Сделай краткое изложение...' },
    { icon: <Sparkles className="w-4 h-4" />, text: 'Удиви меня', prompt: 'Удиви меня чем-нибудь интересным...' },
    { icon: <MapPin className="w-4 h-4" />, text: 'Составь план', prompt: 'Составь план для...' }
  ];

  const moreActions = [
    { icon: <MessageCircle className="w-4 h-4" />, text: 'Помоги мне написать', prompt: 'Помоги написать...' },
    { icon: <Code className="w-4 h-4" />, text: 'Напиши код', prompt: 'Напиши код для...' },
    { icon: <HelpCircle className="w-4 h-4" />, text: 'Получить совет', prompt: 'Мне нужен совет по...' },
    { icon: <Lightbulb className="w-4 h-4" />, text: 'Придумай', prompt: 'Придумай...' }
  ];

  return (
    <div className="flex flex-col min-h-screen pt-16">
      <div className="flex-1 flex flex-col items-center justify-center px-4">
        <h1 className="text-3xl font-semibold mb-8">Чем я могу помочь?</h1>
        
        <div className="w-full max-w-3xl mx-auto">
          <ChatInput />
          
          <div className="mt-6 flex flex-wrap justify-center gap-2">
            {quickActions.map((action, index) => (
              <button
                key={index}
                className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full"
              >
                {action.icon}
                <span>{action.text}</span>
              </button>
            ))}
            <button
              onClick={() => setShowMoreActions(!showMoreActions)}
              className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full"
            >
              <MoreHorizontal className="w-4 h-4" />
              <span>Больше</span>
            </button>
          </div>

          {showMoreActions && (
            <div className="mt-4 flex flex-wrap justify-center gap-2">
              {moreActions.map((action, index) => (
                <button
                  key={index}
                  className="flex items-center space-x-2 px-4 py-2 text-sm text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full"
                >
                  {action.icon}
                  <span>{action.text}</span>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      <footer className="text-center py-4 text-sm text-gray-500">
        Отправляя сообщение ChatGPT, вы соглашаетесь с нашими{' '}
        <a href="#" className="underline hover:text-gray-700">условиями</a>{' '}
        и ознакомились с нашей{' '}
        <a href="#" className="underline hover:text-gray-700">политикой конфиденциальности</a>
      </footer>
    </div>
  );
};