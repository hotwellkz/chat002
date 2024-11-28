import { useState, useEffect } from 'react';
import { auth } from '../lib/firebase';
import { getCurrentSubscription } from '../services/stripe';

export const useSubscription = () => {
  const [subscription, setSubscription] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      setLoading(false);
      return;
    }

    const loadSubscription = async () => {
      try {
        const sub = await getCurrentSubscription(user.uid);
        setSubscription(sub);
      } catch (error) {
        console.error('Error loading subscription:', error);
      } finally {
        setLoading(false);
      }
    };

    loadSubscription();
  }, []);

  return { subscription, loading };
};