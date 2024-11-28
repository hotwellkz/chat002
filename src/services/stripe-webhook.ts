import { db } from '../lib/firebase';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import Stripe from 'stripe';

const stripe = new Stripe(import.meta.env.VITE_STRIPE_SECRET_KEY, {
  apiVersion: '2023-10-16',
});

const webhookSecret = 'whsec_PfMn1ivQbHNOs0Ya4cgiQt3m5hVW1gow';

export const handleStripeWebhook = async (req: Request) => {
  const signature = req.headers.get('stripe-signature');
  
  if (!signature) {
    throw new Error('No signature provided');
  }

  try {
    const event = stripe.webhooks.constructEvent(
      await req.text(),
      signature,
      webhookSecret
    );

    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutSessionCompleted(session);
        break;
      }
      case 'customer.subscription.updated':
      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionUpdate(subscription);
        break;
      }
    }

    return new Response(JSON.stringify({ received: true }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err) {
    console.error('Webhook error:', err);
    return new Response(
      JSON.stringify({ error: 'Webhook handler failed' }), 
      { status: 400 }
    );
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
  const userRef = doc(db, 'users', userId);
  const userDoc = await getDoc(userRef);

  if (!userDoc.exists()) return;

  await setDoc(userRef, {
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