import { handleStripeWebhook } from '../src/services/stripe-webhook';

export const config = {
  runtime: 'edge',
};

export default async function handler(req: Request) {
  if (req.method !== 'POST') {
    return new Response('Method not allowed', { status: 405 });
  }

  try {
    return await handleStripeWebhook(req);
  } catch (err) {
    console.error('Stripe webhook error:', err);
    return new Response(
      JSON.stringify({ error: 'Internal server error' }), 
      { status: 500 }
    );
  }
}