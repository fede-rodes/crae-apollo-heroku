import gql from 'graphql-tag';

const userFragment = gql`
  fragment userFragment on User {
    _id
    createdAt
  }
`;

export default userFragment;
