import React from 'react';
import { Check } from 'lucide-react';
import { createCheckoutSession } from '../../services/stripe';

interface PricingCardProps {
  name: string;
  price: number;
  features: string[];
  priceId: string;
  isPopular?: boolean;
}

export const PricingCard: React.FC<PricingCardProps> = ({
  name,
  price,
  features,
  priceId,
  isPopular = false,
}) => {
  const handleSubscribe = async () => {
    try {
      await createCheckoutSession(priceId);
    } catch (error) {
      console.error('Error creating checkout session:', error);
    }
  };

  return (
    <div className={`rounded-2xl p-6 ${
      isPopular ? 'bg-blue-50 border-2 border-blue-500' : 'bg-white border border-gray-200'
    }`}>
      {isPopular && (
        <span className="inline-block px-4 py-1 rounded-full text-sm font-semibold text-blue-600 bg-blue-100 mb-4">
          Популярный выбор
        </span>
      )}
      
      <h3 className="text-2xl font-bold">{name}</h3>
      <div className="mt-4 flex items-baseline">
        <span className="text-4xl font-bold">${price}</span>
        <span className="ml-1 text-gray-500">/месяц</span>
      </div>
      
      <ul className="mt-6 space-y-4">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center">
            <Check className="h-5 w-5 text-green-500 mr-2" />
            <span className="text-gray-600">{feature}</span>
          </li>
        ))}
      </ul>
      
      <button
        onClick={handleSubscribe}
        className={`mt-8 w-full py-3 px-6 rounded-lg font-semibold ${
          isPopular
            ? 'bg-blue-600 text-white hover:bg-blue-700'
            : 'bg-gray-900 text-white hover:bg-gray-800'
        }`}
      >
        Подписаться
      </button>
    </div>
  );
};