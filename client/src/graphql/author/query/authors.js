import gql from 'graphql-tag';
import authorFragment from '../fragment/author';

const authorsQuery = gql`
  query {
    authors {
      ...authorFragment
    }
  }
  ${authorFragment}
`;

export default authorsQuery;
