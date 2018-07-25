import gql from 'graphql-tag';

const postFragment = gql`
  fragment postFragment on Post {
    _id
    title
    text
  }
`;

export default postFragment;
