import React from 'react';
import { gql, graphql } from 'react-apollo';

const Authors = (props) => {
  console.log(props);
  const { loading, error, authors } = props.data;
  if (loading) {
    return <p>Loading ...</p>;
  }
  if (error) {
    return <p>{error.message}</p>;
  }

  return (
    <div>
      {authors.map(author => (
        <div key={author.id}>
          {author.firstName}, {author.lastName}
        </div>
      ))}
    </div>
  );
};

const authorsQuery = gql`
  query AuthorsQuery {
    authors {
      id
      firstName
      lastName
      posts {
        id
        title
        text
      }
    }
  }
`;

export default graphql(authorsQuery)(Authors);
