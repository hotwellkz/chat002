import { Handler } from '@netlify/functions';
import Stripe from 'stripe';
import { adminDb } from '../../src/services/firebase-admin';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: '2023-10-16',
});

const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET!;

const handler: Handler = async (event) => {
  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: 'Method not allowed' }),
    };
  }

  const sig = event.headers['stripe-signature']!;

  try {
    const stripeEvent = stripe.webhooks.constructEvent(
      event.body!,
      sig,
      webhookSecret
    );

    switch (stripeEvent.type) {
      case 'checkout.session.completed': {
        const session = stripeEvent.data.object as Stripe.Checkout.Session;
        await handleCheckoutSessionCompleted(session);
        break;
      }
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        const subscription = stripeEvent.data.object as Stripe.Subscription;
        await handleSubscriptionUpdate(subscription);
        break;
      }
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ received: true }),
    };
  } catch (err) {
    console.error('Webhook Error:', err);
    return {
      statusCode: 400,
      body: JSON.stringify({ error: 'Webhook error' }),
    };
  }
};

const handleCheckoutSessionCompleted = async (session: Stripe.Checkout.Session) => {
  if (!session.metadata?.userId) return;

  const userId = session.metadata.userId;
  const subscriptionId = session.subscription as string;

  if (subscriptionId) {
    const subscription = await stripe.subscriptions.retrieve(subscriptionId);
    await updateUserSubscription(userId, subscription);
  }
};

const handleSubscriptionUpdate = async (subscription: Stripe.Subscription) => {
  const userId = subscription.metadata.userId;
  if (!userId) return;

  await updateUserSubscription(userId, subscription);
};

const updateUserSubscription = async (
  userId: string, 
  subscription: Stripe.Subscription
) => {
  const userRef = adminDb.collection('users').doc(userId);
  
  await userRef.set({
    subscription: {
      id: subscription.id,
      status: subscription.status,
      priceId: subscription.items.data[0].price.id,
      cancelAtPeriodEnd: subscription.cancel_at_period_end,
      currentPeriodEnd: subscription.current_period_end,
      currentPeriodStart: subscription.current_period_start,
    }
  }, { merge: true });
};

export { handler };