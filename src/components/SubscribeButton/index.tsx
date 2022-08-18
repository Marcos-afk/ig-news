import { signIn, useSession } from 'next-auth/react';
import { useRouter } from 'next/router';
import { api } from '../../services/api';
import { getStripeJs } from '../../services/stripe-js';
import styles from './styles.module.scss';

export const SubscribeButton = () => {
  const { data: Session } = useSession();
  const router = useRouter();
  const handleSubscribe = async () => {
    if (!Session) {
      signIn('github');
      return;
    }

    if (Session.activeSubscription) {
      router.push('/posts');
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
