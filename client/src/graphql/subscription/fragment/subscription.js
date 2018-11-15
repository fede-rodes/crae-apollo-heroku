import gql from 'graphql-tag';
import keysFragment from './keys';

const subscriptionFragment = gql`
  fragment subscriptionFragment on Subscription {
    _id
    createdAt
    userId
    endpoint
    keys {
      ...keysFragment
    }
  }
  ${keysFragment}
`;

export default subscriptionFragment;
