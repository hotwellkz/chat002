import React from 'react';
import { PricingCard } from './PricingCard';
import { subscriptionPlans } from '../../services/stripe';
import { useSearchParams } from 'react-router-dom';

export const PricingSection = () => {
  const [searchParams] = useSearchParams();
  const success = searchParams.get('success');
  const canceled = searchParams.get('canceled');

  return (
    <div className="py-16 px-4 sm:px-6 lg:px-8 bg-gray-50 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {success && (
          <div className="mb-8 p-4 bg-green-100 text-green-700 rounded-lg">
            Спасибо за подписку! Ваш аккаунт успешно активирован.
          </div>
        )}
        
        {canceled && (
          <div className="mb-8 p-4 bg-yellow-100 text-yellow-700 rounded-lg">
            Оплата была отменена. Если у вас возникли вопросы, свяжитесь с поддержкой.
          </div>
        )}

        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Тарифные планы
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            Выберите план, который подходит вашим потребностям
          </p>
        </div>
        
        <div className="mt-16 grid gap-8 lg:grid-cols-2 lg:gap-12 max-w-4xl mx-auto">
          <PricingCard
            name={subscriptionPlans.basic.name}
            price={subscriptionPlans.basic.price}
            features={subscriptionPlans.basic.features}
            priceId={subscriptionPlans.basic.id}
          />
          
          <PricingCard
            name={subscriptionPlans.premium.name}
            price={subscriptionPlans.premium.price}
            features={subscriptionPlans.premium.features}
            priceId={subscriptionPlans.premium.id}
            isPopular
          />
        </div>

        <div className="mt-12 text-center text-sm text-gray-500">
          <p>Все цены указаны в USD и включают НДС</p>
          <p className="mt-2">Отмена подписки возможна в любой момент</p>
        </div>
      </div>
    </div>
  );
};