import React from 'react';
import gql from 'graphql-tag';
import { graphql } from 'react-apollo';

const Authors = ({ data }) => {
  const { loading, error, authors } = data;
  if (loading) {
    return (
      <p>
        Loading ...
      </p>
    );
  }
  if (error) {
    return (
      <p>
        {error.message}
      </p>
    );
  }

  return (
    <div>
      {authors.map(author => (
        <div key={author.id}>
          {author.firstName},
          {author.lastName}
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
