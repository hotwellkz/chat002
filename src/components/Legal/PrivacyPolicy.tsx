import React from 'react';
import { Link } from 'react-router-dom';

export const PrivacyPolicy = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Language Selector */}
        <div className="flex justify-end mb-8">
          <select className="px-4 py-2 border border-gray-200 rounded-lg text-sm">
            <option value="ru">Russian</option>
          </select>
        </div>

        {/* Last Updated */}
        <div className="text-center text-sm text-gray-500 mb-8">
          Обновлена: 23 октября 2024 г.
        </div>

        {/* Title */}
        <h1 className="text-4xl font-bold text-center mb-12">
          Политика конфиденциальности
        </h1>

        {/* Content */}
        <div className="space-y-6 text-gray-800">
          <p>
            Мы в ChatGPT 4o mini серьезно относимся к защите ваших персональных данных. Эта политика конфиденциальности описывает, как мы собираем, используем и защищаем вашу информацию.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Какую информацию мы собираем</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Информация, которую вы предоставляете при регистрации (email, имя)</li>
            <li>История ваших диалогов с ChatGPT</li>
            <li>Информация о вашей подписке и платежах</li>
            <li>Технические данные (IP-адрес, тип устройства, браузер)</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">Как мы используем вашу информацию</h2>
          <ul className="list-disc pl-6 space-y-2">
            <li>Для предоставления и улучшения наших услуг</li>
            <li>Для персонализации вашего опыта использования</li>
            <li>Для обработки платежей и управления подписками</li>
            <li>Для обеспечения безопасности вашего аккаунта</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">Защита данных</h2>
          <p>
            Мы используем современные технологии шифрования и безопасности для защиты ваших данных. Вся информация хранится на защищенных серверах с ограниченным доступом.
          </p>

          <h2 className="text-2xl font-bold mt-8 mb-4">Ваши права</h2>
          <p>
            Вы имеете право на:
          </p>
          <ul className="list-disc pl-6 space-y-2">
            <li>Доступ к своим персональным данным</li>
            <li>Исправление неточных данных</li>
            <li>Удаление своих данных</li>
            <li>Отзыв согласия на обработку данных</li>
          </ul>

          <h2 className="text-2xl font-bold mt-8 mb-4">Изменения в политике</h2>
          <p>
            Мы можем обновлять эту политику конфиденциальности по мере необходимости. Мы уведомим вас о любых существенных изменениях через email или уведомление в приложении.
          </p>
        </div>

        <div className="mt-12 text-center">
          <Link to="/terms" className="text-emerald-600 hover:text-emerald-700">
            Условия использования
          </Link>
        </div>
      </div>
    </div>
  );
};