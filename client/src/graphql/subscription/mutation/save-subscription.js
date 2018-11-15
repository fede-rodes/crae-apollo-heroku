import gql from 'graphql-tag';

const saveSubscriptionMutation = gql`
  mutation saveSubscription($subscription: SubscriptionInput!) {
    saveSubscription(subscription: $subscription) {
      status
    }
  }
`;

export default saveSubscriptionMutation;
