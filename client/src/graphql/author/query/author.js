import gql from 'graphql-tag';
import authorFragment from '../fragment/author';

const authorQuery = gql`
  query author(
    $firstName: String,
    $lastName: String,
  ) {
    author(
      firstName: $firstName,
      lastName: $lastName,
    ) {
      ...authorFragment
    }
  }
  ${authorFragment}
`;

export default authorQuery;
