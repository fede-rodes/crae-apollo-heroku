import gql from 'graphql-tag';

const keysFragment = gql`
  fragment keysFragment on Keys {
    auth
    p256dh
  }
`;

export default keysFragment;
