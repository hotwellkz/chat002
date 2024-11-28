import { loadStripe } from '@stripe/stripe-js';
import { doc, getDoc } from 'firebase/firestore';
import { db } from '../lib/firebase';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export const subscriptionPlans = {
  basic: {
    id: 'prod_RImpgAFN4LKtHp',
    name: 'Basic',
    price: 9.99,
    features: [
      '100 сообщений в день',
      'Доступ к GPT-3.5',
      'Стандартная поддержка',
      'История чатов'
    ]
  },
  premium: {
    id: 'prod_RImqHq6hs3u4qV',
    name: 'Premium',
    price: 19.99,
    features: [
      'Безлимитные сообщения',
      'Доступ к GPT-4',
      'Приоритетная поддержка',
      'Расширенные функции',
      'Экспорт истории',
      'Персональный менеджер'
    ]
  }
};

export const getCurrentSubscription = async (userId: string) => {
  try {
    const userRef = doc(db, 'users', userId);
    const userDoc = await getDoc(userRef);
    
    if (!userDoc.exists()) {
      return null;
    }

    const userData = userDoc.data();
    return userData.subscription || null;
  } catch (error) {
    console.error('Error getting subscription:', error);
    return null;
  }
};

export const createCheckoutSession = async (priceId: string, userId: string) => {
  try {
    const response = await fetch('/.netlify/functions/create-checkout-session', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ priceId, userId }),
    });

    const { sessionId } = await response.json();
    const stripe = await stripePromise;
    
    if (stripe) {
      const { error } = await stripe.redirectToCheckout({ sessionId });
      if (error) {
        throw error;
      }
    }
  } catch (error) {
    console.error('Error creating checkout session:', error);
    throw error;
  }
};