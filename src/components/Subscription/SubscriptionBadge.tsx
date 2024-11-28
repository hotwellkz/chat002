import React from 'react';
import { Crown } from 'lucide-react';
import { useSubscription } from '../../hooks/useSubscription';

export const SubscriptionBadge = () => {
  const { subscription, loading } = useSubscription();

  if (loading) return null;

  if (!subscription) return null;

  return (
    <div className="flex items-center space-x-1 px-2 py-1 bg-gradient-to-r from-yellow-400 to-yellow-600 text-white rounded-full text-sm">
      <Crown className="w-4 h-4" />
      <span>{subscription.status === 'premium' ? 'Premium' : 'Basic'}</span>
    </div>
  );
};