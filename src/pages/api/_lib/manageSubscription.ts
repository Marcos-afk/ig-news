import { query as q } from 'faunadb';
import { faunadbClient } from '../../../services/faunadbClient';
import { stripe } from '../../../services/stripe';

export async function saveSubscription(subscriptionId: string, customerId: string, createAction = false) {
  const userRef = await faunadbClient.query(
    q.Select('ref', q.Get(q.Match(q.Index('user_by_stripe_customer_id'), customerId))),
  );

  const subscription = await stripe.subscriptions.retrieve(subscriptionId);
  const subscriptionData = {
    id: subscription.id,
    userId: userRef,
    status: subscription.status,
    price_id: subscription.items.data[0].price.id,
  };

  if (createAction) {
    await faunadbClient.query(q.Create(q.Collection('subscriptions'), { data: subscriptionData }));
  } else {
    await faunadbClient.query(
      q.Replace(q.Select('ref', q.Get(q.Match(q.Index('subscription_by_id'), subscriptionId))), {
        data: subscriptionData,
      }),
    );
  }
}
