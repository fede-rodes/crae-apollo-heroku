import gql from 'graphql-tag';

const deleteSubscriptionMutation = gql`
  mutation deleteSubscription($endpoint: String!) {
    deleteSubscription(endpoint: $endpoint) {
      status
    }
  }
`;

export default deleteSubscriptionMutation;
