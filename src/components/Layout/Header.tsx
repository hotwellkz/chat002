import React from 'react';
import { ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../../lib/firebase';
import { SubscriptionBadge } from '../Subscription/SubscriptionBadge';

export const Header = () => {
  const [user] = useAuthState(auth);

  return (
    <header className="fixed top-0 left-0 right-0 bg-white border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 h-16 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <button className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-gray-100">
            <span className="font-medium">ChatGPT 4o mini</span>
            <ChevronDown className="h-4 w-4 text-gray-500" />
          </button>
        </div>
        
        <div className="flex items-center space-x-4">
          {user ? (
            <>
              <SubscriptionBadge />
              <button
                onClick={() => auth.signOut()}
                className="px-4 py-2 text-gray-700 hover:text-gray-900"
              >
                Выйти
              </button>
            </>
          ) : (
            <>
              <Link 
                to="/login"
                className="px-4 py-2 text-gray-700 hover:text-gray-900"
              >
                Войти
              </Link>
              <Link
                to="/register"
                className="px-4 py-2 bg-black text-white rounded-full hover:bg-gray-800"
              >
                Зарегистрироваться
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
}