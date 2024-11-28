import React from 'react';
import { useNavigate } from 'react-router-dom';
import { GoogleAuth } from './GoogleAuth';

export const RegisterPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-white px-4">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold text-gray-900">Создать аккаунт</h1>
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
          <span className="text-gray-600">Уже есть аккаунт? </span>
          <button 
            onClick={() => navigate('/login')}
            className="text-emerald-600 hover:text-emerald-700"
          >
            Войти
          </button>
        </div>

        <div className="mt-8 text-center text-sm text-gray-500">
          <button onClick={() => navigate('/terms')} className="hover:text-gray-700">
            Условия использования
          </button>
          <span className="mx-2">|</span>
          <button onClick={() => navigate('/privacy')} className="hover:text-gray-700">
            Политика конфиденциальности
          </button>
        </div>
      </div>
    </div>
  );
};