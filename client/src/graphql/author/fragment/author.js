import gql from 'graphql-tag';
import postFragment from '../../post/fragment/post';

const authorFragment = gql`
  fragment authorFragment on Author {
    _id
    firstName
    lastName
    posts {
      ...postFragment
    }
  }
  ${postFragment}
`;

export default authorFragment;
