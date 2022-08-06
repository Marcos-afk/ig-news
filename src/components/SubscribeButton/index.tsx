import { signIn, useSession } from 'next-auth/react';
import { api } from '../../services/api';
import { getStripeJs } from '../../services/stripe-js';
import styles from './styles.module.scss';
import { SubscribeButtonProps } from './types/SubscribeButtonProps';

// eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
export const SubscribeButton = ({ priceId }: SubscribeButtonProps) => {
  const { data: Session } = useSession();
  const handleSubscribe = async () => {
    if (!Session) {
      signIn('github');
      return;
    }

    try {
      const { data } = await api.post('/subscribe');
      const { sessionId } = data;
      const stripe = await getStripeJs();

      await stripe.redirectToCheckout({ sessionId });
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <button type="button" className={styles.subscribeButton} onClick={handleSubscribe}>
      Subscribe now
    </button>
  );
};
