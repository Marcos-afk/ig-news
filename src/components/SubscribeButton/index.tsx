import styles from './styles.module.scss';
import { SubscribeButtonProps } from './types/SubscribeButtonProps';

export const SubscribeButton = ({ priceId }: SubscribeButtonProps) => {
  // eslint-disable-next-line no-console
  console.log(priceId);
  return (
    <button type="button" className={styles.subscribeButton}>
      Subscribe now
    </button>
  );
};
