import { getStripePayments } from '@stripe/firestore-stripe-payments';
import { app } from './firebase';

export const payments = getStripePayments(app, {
  productsCollection: 'products',
  customersCollection: 'customers',
  subscriptionsCollection: 'subscriptions',
});

// Функции для работы с подписками
export const createSubscription = async (userId: string, priceId: string) => {
  try {
    const subscription = await payments.createSubscription(userId, {
      price: priceId,
      payment_method_types: ['card'],
      metadata: {
        userId,
      },
    });
    return subscription;
  } catch (error) {
    console.error('Error creating subscription:', error);
    throw error;
  }
};

export const cancelSubscription = async (subscriptionId: string) => {
  try {
    await payments.cancelSubscription(subscriptionId);
  } catch (error) {
    console.error('Error canceling subscription:', error);
    throw error;
  }
};