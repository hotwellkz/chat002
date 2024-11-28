import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { GoogleAuth } from './GoogleAuth';

export const LoginPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold text-gray-900">С возвращением</h1>
        </div>

        <div className="space-y-4">
          <input
            type="email"
            placeholder="Адрес электронной почты"
            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500"
          />
          
          <button className="w-full py-3 bg-emerald-600 text-white rounded-lg hover:bg-emerald-700 transition-colors">
            Продолжить
          </button>
        </div>

        <div className="my-6 flex items-center justify-center space-x-4">
          <div className="flex-1 h-px bg-gray-200"></div>
          <span className="text-sm text-gray-500">или</span>
          <div className="flex-1 h-px bg-gray-200"></div>
        </div>

        <div className="space-y-3">
          <GoogleAuth />
        </div>

        <div className="mt-6 text-center text-sm">
          <span className="text-gray-600">У вас нет учетной записи? </span>
          <button 
            onClick={() => navigate('/register')}
            className="text-emerald-600 hover:text-emerald-700"
          >
            Зарегистрироваться
          </button>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <Link to="/terms" className="hover:text-gray-700">Условия использования</Link>
          <span className="mx-2">|</span>
          <Link to="/privacy" className="hover:text-gray-700">Политика конфиденциальности</Link>
        </div>
      </div>
    </div>
  );
};